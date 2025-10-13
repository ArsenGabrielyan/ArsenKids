import BubblesGame from "@/components/games/bubbles";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("bubbles");
     return {
          title: t("title")
     }
}

export default function Bubbles(){
     return (
          <BubblesGame/>
     )
}