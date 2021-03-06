export interface TranslationPhrase {
    'af'?: string;
    'sq'?: string;
    'ar-sa'?: string;
    'ar-iq'?: string;
    'ar-eg'?: string;
    'ar-lf'?: string;
    'ar-dz'?: string;
    'ar-ma'?: string;
    'ar-tn'?: string;
    'ar-om'?: string;
    'ar-ye'?: string;
    'ar-sy'?: string;
    'ar-jo'?: string;
    'ar-lb'?: string;
    'ar-kw'?: string;
    'ar-ae'?: string;
    'ar-bh'?: string;
    'ar-qa'?: string;
    'eu'?: string;
    'bg'?: string;
    'be'?: string;
    'ca'?: string;
    'zh-tw'?: string;
    'zh-cn'?: string;
    'zh-hk'?: string;
    'zh-sg'?: string;
    'hr'?: string;
    'cs'?: string;
    'da'?: string;
    'nl'?: string;
    'nl-be'?: string;
    'en'?: string;
    'en-us'?: string;
    'en-eg'?: string;
    'en-au'?: string;
    'en-gb'?: string;
    'en-ca'?: string;
    'en-nz'?: string;
    'en-ie'?: string;
    'en-za'?: string;
    'en-jm'?: string;
    'en-bz'?: string;
    'en-tt'?: string;
    'et'?: string;
    'fo'?: string;
    'fa'?: string;
    'fi'?: string;
    'fr'?: string;
    'fr-be'?: string;
    'fr-ca'?: string;
    'fr-ch'?: string;
    'fr-lu'?: string;
    'gd'?: string;
    'gd-ie'?: string;
    'de'?: string;
    'de-ch'?: string;
    'de-at'?: string;
    'de-lu'?: string;
    'de-li'?: string;
    'el'?: string;
    'he'?: string;
    'hi'?: string;
    'hu'?: string;
    'is'?: string;
    'id'?: string;
    'it'?: string;
    'it-CH'?: string;
    'ja'?: string;
    'ko'?: string;
    'lv'?: string;
    'lt'?: string;
    'mk'?: string;
    'mt'?: string;
    'no'?: string;
    'pl'?: string;
    'pt-br'?: string;
    'pt'?: string;
    'rm'?: string;
    'ro'?: string;
    'ro-mo'?: string;
    'ru'?: string;
    'ru-mi'?: string;
    'sz'?: string;
    'sr'?: string;
    'sk'?: string;
    'sl'?: string;
    'sb'?: string;
    'es'?: string;
    'es-ar'?: string;
    'es-gt'?: string;
    'es-cr'?: string;
    'es-pa'?: string;
    'es-do'?: string;
    'es-mx'?: string;
    'es-ve'?: string;
    'es-co'?: string;
    'es-pe'?: string;
    'es-ec'?: string;
    'es-cl'?: string;
    'es-uy'?: string;
    'es-py'?: string;
    'es-bo'?: string;
    'es-sv'?: string;
    'es-hn'?: string;
    'es-ni'?: string;
    'es-pr'?: string;
    'sx'?: string;
    'sv'?: string;
    'sv-fi'?: string;
    'th'?: string;
    'ts'?: string;
    'tn'?: string;
    'tr'?: string;
    'uk'?: string;
    'ur'?: string;
    've'?: string;
    'vi'?: string;
    'xh'?: string;
    'ji'?: string;
    'zu'?: string;
}

export interface Translations {
    [Phrase: string]: TranslationPhrase;
}

export interface TranslationsConfig {
    defaultLang: string;
    translations?: Translations;
}