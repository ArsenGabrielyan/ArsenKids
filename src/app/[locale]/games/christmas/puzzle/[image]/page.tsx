import PuzzleGame from "@/components/games/puzzle"
import { CHRISTMAS_PUZZLE_LINKS } from "@/lib/constants/links"
import { getGameTitle } from "@/lib/helpers";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { notFound } from "next/navigation";

interface PageProps{
     params: Promise<{image: string}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {image} = await params;
     const allPages = CHRISTMAS_PUZZLE_LINKS.map(val=>val.name);
     if(!allPages.find(val=>val===image)) notFound();
     const title = getGameTitle("christmas",image);
     return {
          title: `Փազլ «${title}»`,
          alternates: {
               canonical: absoluteURL(`/games/christmas/puzzle/${image}`)
          }
     }
}

export default async function Puzzle({params}: PageProps){
     const {image} = await params;
     const allPages = CHRISTMAS_PUZZLE_LINKS.map(val=>val.name);
     if(!allPages.find(val=>val===image)) notFound();
     const title = getGameTitle("christmas",image);
     return (
          <PuzzleGame
               title={title}
               shape={image}
               christmas
          />
     )
}