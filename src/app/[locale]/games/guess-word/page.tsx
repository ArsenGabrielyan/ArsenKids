import GuessWordGame from "@/components/games/guess-word";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("guess-word");
     return {
          title: t("title")
     }
}

export default function GuessWord(){
     return (
          <GuessWordGame/>
     )
}