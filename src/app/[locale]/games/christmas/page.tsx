import ChristmasGamesHub from "@/components/pages/christmas-games-hub";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LocaleLayoutProps } from "../../layout";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { createMetaAlternates } from "@/lib/helpers";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) return notFound()
     const t = await getTranslations("christmas-games");
     const gameTxt = await getTranslations("games")
     return {
          title: t("title"),
          openGraph: {
               title: t("title"),
               url: absoluteURL(`/${locale}/games/christmas`),
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
               title: t("title"),
               card: "summary_large_image",
               images: [{
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }]
          },
          alternates: createMetaAlternates(locale,"/games/christmas"),
     }
}

export default function ChristmasGames(){
     return (
          <ChristmasGamesHub/>
     )
}