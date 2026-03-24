import { LocaleLayoutProps } from "@/app/[locale]/layout";
import MemoryGame from "@/components/games/memory";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { createMetaAlternates } from "@/lib/helpers";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) return notFound()
     const t = await getTranslations("memory");
     const gameTxt = await getTranslations("games")
     return {
          title: t("gameTitle",{title: t("pairs.christmas")}),
          openGraph: {
               title: t("gameTitle",{title: t("pairs.christmas")}),
               url: absoluteURL(`/${locale}/games/christmas/memory-game`),
               locale,
               siteName: `ArsenKids ${gameTxt("metaTitle")}`,
               type: "website",
               images: {
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }
          },
          twitter: {
               title: t("gameTitle",{title: t("pairs.christmas")}),
               card: "summary_large_image",
               images: [{
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }]
          },
          alternates: createMetaAlternates(locale,"/games/christmas/memory-game"),
     }
}

export default async function ChristmasMemory(){
     const t = await getTranslations("memory");
     return (
          <MemoryGame
               type="christmas"
               title={t("pairs.christmas")}
          />
     )
}