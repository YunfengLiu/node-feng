import { ContainerModule, Container, AsyncContainerModule } from 'inversify';
import { Application } from 'express';
import bodyParser from 'body-parser';

import { InversifyExpressServer } from 'inversify-express-utils';
import { ModuleFactory } from '../module.loader';
import { createServer, Server as HTTPServer } from 'http';
import SocketIO from 'socket.io';
import { Server as IOServer } from 'socket.io';
import { DI as ServerDI, ServerEnv } from './server.models';
import { DI as EnvDI, EnvLoader } from '../env/env.models';
import { ClassType } from 'class-transformer/ClassTransformer';
import { DI, IoContext, IoClientMetaData, IoClientConfig, IoMessageMetaDataSet } from './server.models';
import { bind } from '../../utils';
import { DI as DILog } from '../log/log.models';
import Logger from 'bunyan';

export function defineOnConnectContext(container: Container, ioServer: IOServer) {
    const log = container.get<Logger>(DILog.Logger);
    log.info({ioServer}, 'Initializing Server Module');
    const ioClientMetaData: IoClientMetaData = Reflect.getMetadata('LYF:IOCLIENTMETADATA', Reflect);
    const ioClientConstructor = ioClientMetaData.clazz;
    const ioClientConfig = ioClientMetaData.config;
    const ioClientAuthMethod: string = Reflect.getMetadata('LYF:IOCLIENT:IOAUTHENTICATE', ioClientConstructor);
    container.bind(DI.IoClient).to(ioClientConstructor);
    container.bind<IoClientConfig>(DI.IoClientConfig).toConstantValue(ioClientConfig);
    const ioMessageMetaDataSet: IoMessageMetaDataSet = Reflect.getMetadata('LYF:IOCLIENT:IOMESSAGEMETADATASET', ioClientConstructor);
    ioServer.on('connection', async (socket) => {
        // tslint:disable-next-line:no-console
        log.info({socket}, defineOnConnectContext.name);

        const context: IoContext = {
            socket,
        };
        // Reflect.defineMetadata('LYF:IOCLIENT:IOCONTEXT', context, socket);
        const childContainer = container.createChild();
        childContainer.bind<IoContext>(DI.IoContext).toConstantValue(context);
        const ioClient = childContainer.get<any>(DI.IoClient);
        if (ioClientAuthMethod != null) {
            // tslint:disable-next-line:ban-types
            const fn = bind(ioClient[ioClientAuthMethod], ioClient);
            let authenticated = false;
            try {
                if (fn.constructor.name === 'AsyncFunction') {
                    authenticated = await fn();
                } else {
                    authenticated = fn();
                }
                if (authenticated !== true) {
                    socket.emit('authenticated', false);
                    socket.disconnect(true);
                } else {
                    socket.emit('authenticated', true);
                }
            } catch (err) {
                socket.emit('authenticated', false, err);
                socket.disconnect(true);
                // tslint:disable-next-line:no-console
                console.log('exception: ', err);
                log.error({err});
            }
        }
        // tslint:disable-next-line:forin
        for (const key in ioMessageMetaDataSet) {
            const method = ioMessageMetaDataSet[key].method;
            socket.on(key, bind(ioClient[method], ioClient));
        }
    });

}

const factory: ModuleFactory = <T extends ServerEnv>(envClazz: ClassType<T>, envFileName: string) => {
    return async (projectRoot: string, container: Container): Promise<ContainerModule> => {
        const appName = container.get<string>('appName');
        const loadEnv = container.get<EnvLoader<T>>(EnvDI.EnvLoaderType);
        const env = await loadEnv(envClazz, `${projectRoot}/envs/${appName}/${envFileName}.env`);
        container.bind<T>(ServerDI.ServerEnv).toConstantValue(env);
        const appServer = new InversifyExpressServer(container);
        appServer.setConfig(_app => {
            // _app.use(compression);
            _app.use(bodyParser.json());
            _app.use(bodyParser.urlencoded({ extended: true }));
        });
        const app = appServer.build();
        container.bind<Application>(ServerDI.Application).toConstantValue(app);
        const server = createServer(app);
        container.bind<HTTPServer>(ServerDI.HTTPServer).toConstantValue(server);
        const ioServer = SocketIO(server, {
            path: env.ENDPOINT_PATH,
            serveClient: false,
        });
        container.bind<IOServer>(ServerDI.IOServer).toConstantValue(ioServer);
        defineOnConnectContext(container, ioServer);
        return new ContainerModule(() => {
        });
    };
};

export * from './server.models';
export * from './server.decorators';
export default factory;