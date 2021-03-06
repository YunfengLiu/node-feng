import { decorate, injectable } from 'inversify';
import { IoClientConfig, IoClientMetaData, IoMessageMetaDataSet, IoClientMetaStore } from './server-io.models';

export function ioClient(config: IoClientConfig): ClassDecorator {
    // tslint:disable-next-line:ban-types
    return (clazz: any): void => {
        decorate(injectable(), clazz);
        const metadata: IoClientMetaData = {
            config,
            clazz,
        };
        if (!Reflect.hasMetadata('LYF:IOCLIENTMETASTORE', Reflect)) {
            Reflect.defineMetadata('LYF:IOCLIENTMETASTORE', {}, Reflect);
        }
        const metaDataStore: IoClientMetaStore = Reflect.getMetadata('LYF:IOCLIENTMETASTORE', Reflect);
        metaDataStore[config.namespace] = metadata;
    };
}

export function ioMessage(event: string): MethodDecorator {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {

        if (!Reflect.hasMetadata('LYF:IOCLIENT:IOMESSAGEMETADATASET', target.constructor)) {
            Reflect.defineMetadata('LYF:IOCLIENT:IOMESSAGEMETADATASET', {}, target.constructor);
        }
        const metaDataSet: IoMessageMetaDataSet = Reflect.getMetadata('LYF:IOCLIENT:IOMESSAGEMETADATASET', target.constructor);
        metaDataSet[event] = {
            method: propertyKey,
        };
    };
}

// tslint:disable-next-line:ban-types
export function ioAuthenicate(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    if (Reflect.hasMetadata('LYF:IOCLIENT:IOAUTHENTICATE', target.constructor)) {
        const existed = Reflect.getMetadata('LYF:IOCLIENT:IOAUTHENTICATE', target.constructor);
        throw new Error(`DUPLICATE IOAUTHENTICATE: ${target.constructor.name}, defined(${existed}), new(${propertyKey})`);
    }
    Reflect.defineMetadata('LYF:IOCLIENT:IOAUTHENTICATE', propertyKey, target.constructor);

}

// tslint:disable-next-line:ban-types
export function ioError(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    if (Reflect.hasMetadata('LYF:IOCLIENT:IOERROR', target.constructor)) {
        const existed = Reflect.getMetadata('LYF:IOCLIENT:IOERROR', target.constructor);
        throw new Error(`DUPLICATE IOERROR: ${target.constructor.name}, defined(${existed}), new(${propertyKey})`);
    }
    Reflect.defineMetadata('LYF:IOCLIENT:IOERROR', propertyKey, target.constructor);
}

// tslint:disable-next-line:ban-types
export function ioDisconnect(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    if (Reflect.hasMetadata('LYF:IOCLIENT:IODISCONNECT', target.constructor)) {
        const existed = Reflect.getMetadata('LYF:IOCLIENT:IODISCONNECT', target.constructor);
        throw new Error(`DUPLICATE IODISCONNECT: ${target.constructor.name}, defined(${existed}), new(${propertyKey})`);
    }
    Reflect.defineMetadata('LYF:IOCLIENT:IODISCONNECT', propertyKey, target.constructor);
}