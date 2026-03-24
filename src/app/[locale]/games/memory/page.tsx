import MemoryGameMenu from "@/components/games/memory/menu"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { LocaleLayoutProps } from "../../layout";
import { absoluteURL, getOgImage } from "@/lib/utils";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { createMetaAlternates } from "@/lib/helpers";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) return notFound()
     const t = await getTranslations("memory");
     const gamesTxt = await getTranslations("games")
     return {
          title: t("title"),
          alternates: createMetaAlternates(locale,"/games/memory"),
          openGraph: {
               title: t("title"),
               url: absoluteURL(`/${locale}/games/memory`),
               locale,
               siteName: `ArsenKids ${gamesTxt("metaTitle")}`,
               type: "website",
               images: {
                    url: getOgImage(),
                    width: 1200,
                    height: 630
               }
          },
          twitter: {
               title: t("title"),
               card: "summary_large_image",
               images: [{
                    url: getOgImage(),
                    width: 1200,
                    height: 630
               }]
          }
     }
}

export default function MemoryMenu(){
     return (
          <MemoryGameMenu/>
     )
}