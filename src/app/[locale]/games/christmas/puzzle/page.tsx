import { LocaleLayoutProps } from "@/app/[locale]/layout";
import PuzzleGameMenu from "@/components/games/puzzle/menu"
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     const t = await getTranslations("puzzle");
     return {
          title: t("christmasTitle"),
          openGraph: {
               title: t("title"),
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
               title: t("title"),
               card: "summary_large_image",
               images: [{
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }]
          }
     }
}

export default function PuzzleMenu(){
     return (
          <PuzzleGameMenu christmas />
     )
}