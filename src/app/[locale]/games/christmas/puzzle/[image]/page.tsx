import { LocaleLayoutProps } from "@/app/[locale]/layout";
import PuzzleGame from "@/components/games/puzzle"
import { CHRISTMAS_PUZZLE_LINKS } from "@/lib/constants"
import { ChristmasPuzzleLinks } from "@/lib/types/enums";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { createMetaAlternates } from "@/lib/helpers";

interface PageProps{
     params: LocaleLayoutProps["params"] & Promise<{image: ChristmasPuzzleLinks}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {image,locale} = await params;
     if(!CHRISTMAS_PUZZLE_LINKS.find(val=>val===image) || !hasLocale(routing.locales, locale)) return notFound();
     const t = await getTranslations("puzzle")
     const gameTxt = await getTranslations("games")
     return {
          title: t("gameTitle",{title: t(`christmas-games.${image}`)}),
          alternates: createMetaAlternates(locale,`/games/christmas/puzzle/${image}`),
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