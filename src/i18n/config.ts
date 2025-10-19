import { ILanguage, LangCodeType } from "@/lib/types";

export const languages = [
     {code: "hy", countryCode: "am", label: "Հայերեն"},
     {code: "en", countryCode: "us", label: "English"},
     {code: "ru", countryCode: "ru", label: "Русский"},
] as const satisfies readonly ILanguage[];

export const messages = [
     "common",
     "games",
     "website",
     "words"
] as const

export const locales: LangCodeType[] = languages.map(lang=>lang.code);
export const defaultLocale: LangCodeType = "hy";