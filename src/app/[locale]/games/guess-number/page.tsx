import GuessNumberGame from "@/components/games/guess-number";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("guess-number");
     return {
          title: t("title")
     }
}

export default function GuessNumber(){
     return (
          <GuessNumberGame/>
     )
}