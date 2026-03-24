import { GAME_KEYWORDS, KEYWORDS } from "@/lib/constants";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { absoluteURL, getOgImage } from "@/lib/utils";
import { LocaleLayoutProps } from "../layout";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { createMetaAlternates } from "@/lib/helpers";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params;
     if (!hasLocale(routing.locales, locale)) return notFound()
     const t = await getTranslations("games")
     return {
          title: t("metaTitle"),
          description: t("metaDesc"),
          keywords: [...GAME_KEYWORDS, ...KEYWORDS],
          alternates: createMetaAlternates(locale,"/games"),
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