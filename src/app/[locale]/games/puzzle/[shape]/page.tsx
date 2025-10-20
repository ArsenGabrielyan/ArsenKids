import PuzzleGame from "@/components/games/puzzle"
import { PUZZLE_LINKS } from "@/lib/constants"
import { PuzzleLinks } from "@/lib/types/enums";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps{
     params: Promise<{shape: PuzzleLinks}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {shape} = await params;
     if(!PUZZLE_LINKS.find(val=>val===shape)) notFound();
     const t = await getTranslations("puzzle")
     return {
          title: t("gameTitle",{title: t(`games.${shape}`)}),
          alternates: {
               canonical: absoluteURL(`/games/puzzle/${shape}`)
          }
     }
}

export default async function Puzzle({params}: PageProps){
     const {shape} = await params;
     if(!PUZZLE_LINKS.find(val=>val===shape)) notFound();
     const t = await getTranslations("puzzle")
     return (
          <PuzzleGame
               title={t(`games.${shape}`)}
               shape={shape}
          />
     )
}