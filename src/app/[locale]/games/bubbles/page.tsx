import BubblesGame from "@/components/games/bubbles";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LocaleLayoutProps } from "../../layout";
import { absoluteURL, getOgImage } from "@/lib/utils";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { createMetaAlternates } from "@/lib/helpers";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     const t = await getTranslations("bubbles");
     const gamesTxt = await getTranslations("games")
     if (!hasLocale(routing.locales, locale)) return notFound()
     return {
          title: t("title"),
          openGraph: {
               title: t("title"),
               url: absoluteURL(`/${locale}/games/bubbles`),
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
          },
          alternates: createMetaAlternates(locale,"/games/bubbles"),
     }
}

export default function Bubbles(){
     return (
          <BubblesGame/>
     )
}