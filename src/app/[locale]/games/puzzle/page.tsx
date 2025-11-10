import PuzzleGameMenu from "@/components/games/puzzle/menu"
import { getTranslations } from "next-intl/server"
import { LocaleLayoutProps } from "../../layout";
import { Metadata } from "next";
import { absoluteURL, getOgImage } from "@/lib/utils";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     const t = await getTranslations("puzzle");
     const gamesTxt = await getTranslations("games")
     return {
          title: t("title"),
          openGraph: {
               title: t("title"),
               url: absoluteURL(`/${locale}/games/puzzle`),
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

export default function PuzzleMenu(){
     return (
          <PuzzleGameMenu/>
     )
}