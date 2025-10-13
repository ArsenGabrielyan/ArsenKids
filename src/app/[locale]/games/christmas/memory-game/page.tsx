import MemoryGame from "@/components/games/memory";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("memory");
     return {
          title: t("gameTitle",{title: t("pairs.christmas")})
     }
}

export default async function ChristmasMemory(){
     const t = await getTranslations("memory");
     return (
          <MemoryGame
               type="christmas"
               title={t("pairs.christmas")}
          />
     )
}