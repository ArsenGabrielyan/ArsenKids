import GamesHub from "@/components/pages/games-hub";
import { GAME_KEYWORDS, KEYWORDS } from "@/lib/constants";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("games")
     return {
          title: t("metaTitle"),
          description: t("metaDesc"),
          keywords: [...GAME_KEYWORDS, ...KEYWORDS],
     }
};

export default function Games(){
     return (
          <GamesHub/>
     )
}