import { LocaleLayoutProps } from "@/app/[locale]/layout";
import PuzzleGameMenu from "@/components/games/puzzle/menu"
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { createMetaAlternates } from "@/lib/helpers";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) return notFound()
     const t = await getTranslations("puzzle");
     return {
          title: t("christmasTitle"),
          openGraph: {
               title: t("christmasTitle"),
               url: absoluteURL(`/${locale}/games/christmas/puzzle`),
               locale,
               siteName: "ArsenKids Games",
               type: "website",
               images: {
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }
          },
          twitter: {
               title: t("christmasTitle"),
               card: "summary_large_image",
               images: [{
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }]
          },
          alternates: createMetaAlternates(locale,"/games/christmas/puzzle"),
     }
}

export default function PuzzleMenu(){
     return (
          <PuzzleGameMenu christmas />
     )
}