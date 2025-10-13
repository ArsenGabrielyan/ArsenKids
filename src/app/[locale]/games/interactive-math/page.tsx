import InteractiveMathGame from "@/components/games/interactive-math";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("interactive-math");
     return {
          title: t("title")
     }
}

export default function InteractiveMath(){
     return (
          <InteractiveMathGame/>
     )
}