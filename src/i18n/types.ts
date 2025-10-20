export type LangCodeType = 'en' | 'hy' | 'ru';
export type CountryCodeType = 'us' | 'am' | 'ru';
export interface ILanguage{
     code: LangCodeType,
     countryCode: CountryCodeType,
     label: string
}