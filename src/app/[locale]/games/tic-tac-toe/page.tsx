import GameXO from "@/components/games/tic-tac-toe";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("tic-tac-toe");
     return {
          title: t("title")
     }
}

export default function TicTacToe(){
     return (
          <GameXO/>
     )
}