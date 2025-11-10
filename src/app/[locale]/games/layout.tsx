import { GAME_KEYWORDS, KEYWORDS } from "@/lib/constants";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { languages } from "@/i18n/config";
import { absoluteURL, getOgImage } from "@/lib/utils";
import { LocaleLayoutProps } from "../layout";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params;
     const t = await getTranslations("games")
     return {
          title: t("metaTitle"),
          description: t("metaDesc"),
          keywords: [...GAME_KEYWORDS, ...KEYWORDS],
          alternates: {
               languages: Object.fromEntries(languages.map(l => [l.code, `/${l.code}/games`])),
               canonical: absoluteURL(`/${locale}/games`)
          },
          openGraph: {
               title: t("title"),
               description: t("metaDesc"),
               url: absoluteURL(`/${locale}/games`),
               locale,
               siteName: `ArsenKids ${t("metaTitle")}`,
               type: "website",
               images: {
                    url: getOgImage(),
                    width: 1200,
                    height: 630
               }
          },
          twitter: {
               title: t("title"),
               description: t("metaDesc"),
               card: "summary_large_image",
               images: [{
                    url: getOgImage(),
                    width: 1200,
                    height: 630
               }]
          }
     }
};

export default function RootLayout({children}: LocaleLayoutProps){
     return children
}