import { LocaleLayoutProps } from "@/app/[locale]/layout";
import PuzzleGame from "@/components/games/puzzle"
import { languages } from "@/i18n/config";
import { CHRISTMAS_PUZZLE_LINKS } from "@/lib/constants"
import { ChristmasPuzzleLinks } from "@/lib/types/enums";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps{
     params: LocaleLayoutProps["params"] & Promise<{image: ChristmasPuzzleLinks}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {image,locale} = await params;
     if(!CHRISTMAS_PUZZLE_LINKS.find(val=>val===image)) notFound();
     const t = await getTranslations("puzzle")
     const gameTxt = await getTranslations("games")
     return {
          title: t("gameTitle",{title: t(`christmas-games.${image}`)}),
          alternates: {
               languages: Object.fromEntries(languages.map(l => [l.code, `/${l.code}/games/christmas/puzzle/${image}`])),
               canonical: absoluteURL(`/games/christmas/puzzle/${image}`)
          },
          openGraph: {
               title: t("gameTitle",{title: t(`christmas-games.${image}`)}),
               url: absoluteURL(`/${locale}/games/christmas/puzzle/${image}`),
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
               title: t("gameTitle",{title: t(`christmas-games.${image}`)}),
               card: "summary_large_image",
               images: [{
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }]
          }
     }
     return {
     }
}

export default async function Puzzle({params}: PageProps){
     const {image} = await params;
     if(!CHRISTMAS_PUZZLE_LINKS.find(val=>val===image)) notFound();
     const t = await getTranslations("puzzle")
     return (
          <PuzzleGame
               title={t(`christmas-games.${image}`)}
               shape={image}
               christmas
          />
     )
}