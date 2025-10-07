import PuzzleGame from "@/components/games/puzzle"
import { PUZZLE_LINKS } from "@/lib/constants/links"
import { getGameTitle } from "@/lib/helpers";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { notFound } from "next/navigation";

interface PageProps{
     params: Promise<{shape: string}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {shape} = await params;
     const allPages = PUZZLE_LINKS.map(val=>val.name);
     if(!allPages.find(val=>val===shape)) notFound();
     const title = getGameTitle("puzzles",shape);
     return {
          title: `Փազլ «${title}»`,
          alternates: {
               canonical: absoluteURL(`/games/puzzle/${shape}`)
          }
     }
}

export default async function Puzzle({params}: PageProps){
     const {shape} = await params;
     const allPages = PUZZLE_LINKS.map(val=>val.name);
     if(!allPages.find(val=>val===shape)) notFound();
     const title = getGameTitle("puzzles",shape);
     return (
          <PuzzleGame
               title={title}
               shape={shape}
          />
     )
}