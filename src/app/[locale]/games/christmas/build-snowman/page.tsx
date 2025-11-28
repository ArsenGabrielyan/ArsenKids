import { LocaleLayoutProps } from "@/app/[locale]/layout";
import GameBuildSnowman from "@/components/games/christmas/build-snowman";
import { languages } from "@/i18n/config";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     const t = await getTranslations("build-snowman");
     const gameTxt = await getTranslations("games")
     return {
          title: t("title"),
          openGraph: {
               title: t("title"),
               url: absoluteURL(`/${locale}/games/christmas/build-snowman`),
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
          alternates: {
               languages: Object.fromEntries(languages.map(l => [l.code, `/${l.code}/games/christmas/build-snowman`])),
               canonical: absoluteURL(`/${locale}/games/christmas/build-snowman`),
          }
     }
}

export default function BuildSnowman(){
     return (
          <GameBuildSnowman/>
     )
}