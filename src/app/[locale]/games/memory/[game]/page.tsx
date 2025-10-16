import MemoryGame from "@/components/games/memory"
import { PAIRS_LINKS } from "@/lib/constants/links";
import { MemoryCardParams } from "@/lib/types";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps{
     params: Promise<{game: string}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {game} = await params;
     if(!PAIRS_LINKS.find(val=>val===game)) notFound();
     const t = await getTranslations("memory")
     return {
          title: t("gameTitle",{title: t(`pairs.${game}`)}),
          alternates: {
               canonical: absoluteURL(`/games/memory/${game}`)
          }
     }
}

export default async function Memory({params}: PageProps){
     const {game} = await params;
     if(!PAIRS_LINKS.find(val=>val===game)) notFound();
     const t = await getTranslations("memory")
     return (
          <MemoryGame
               type={game as MemoryCardParams}
               title={t(`pairs.${game}`)}
          />
     )
}