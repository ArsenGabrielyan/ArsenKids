import MemoryGame from "@/components/games/memory"
import { PAIRS_LINKS } from "@/lib/constants/links";
import { getGameTitle } from "@/lib/helpers";
import { MemoryCardParams } from "@/lib/types";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { notFound } from "next/navigation";

interface PageProps{
     params: Promise<{game: string}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {game} = await params;
     const allPages = PAIRS_LINKS.map(val=>val.name);
     if(!allPages.find(val=>val===game)) notFound();
     const title = getGameTitle("pairs",game);
     return {
          title: `${title} - Զույգեր`,
          alternates: {
               canonical: absoluteURL(`/games/memory/${game}`)
          }
     }
}

export default async function Memory({params}: PageProps){
     const {game} = await params;
     const allPages = PAIRS_LINKS.map(val=>val.name);
     if(!allPages.find(val=>val===game)) notFound();
     const title = getGameTitle("pairs",game);
     return (
          <MemoryGame
               type={game as MemoryCardParams}
               title={title}
          />
     )
}