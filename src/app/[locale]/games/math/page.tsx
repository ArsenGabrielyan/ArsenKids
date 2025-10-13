import MathGame from "@/components/games/math";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("math");
     return {
          title: t("title")
     }
}

export default function Math(){
     return (
          <MathGame/>
     )
}