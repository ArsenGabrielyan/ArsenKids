import ChristmasGamesHub from "@/components/pages/christmas-games-hub";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("christmas-games");
     return {
          title: t("title")
     }
}

export default function ChristmasGames(){
     return (
          <ChristmasGamesHub/>
     )
}