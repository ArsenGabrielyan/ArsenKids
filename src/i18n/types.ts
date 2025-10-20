import hyCommon from "../../i18n/hy/common.json";
import hyGames from "../../i18n/hy/games.json"
import hyWebsite from "../../i18n/hy/website.json"
import hyWords from "../../i18n/hy/words.json"

export type MessageSchema = (
     typeof hyCommon &
     typeof hyGames &
     typeof hyWebsite &
     typeof hyWords
)

export type LangCodeType = 'en' | 'hy' | 'ru';
export type CountryCodeType = 'us' | 'am' | 'ru';
export interface ILanguage{
     code: LangCodeType,
     countryCode: CountryCodeType,
     label: string
}