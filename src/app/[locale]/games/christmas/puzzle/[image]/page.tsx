import PuzzleGame from "@/components/games/puzzle"
import { CHRISTMAS_PUZZLE_LINKS } from "@/lib/constants/links"
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps{
     params: Promise<{image: string}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {image} = await params;
     if(!CHRISTMAS_PUZZLE_LINKS.find(val=>val===image)) notFound();
     const t = await getTranslations("puzzle")
     return {
          title: t("gameTitle",{title: t(`christmas-games.${image}`)}),
          alternates: {
               canonical: absoluteURL(`/games/christmas/puzzle/${image}`)
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