import GameBuildSnowman from "@/components/games/christmas/build-snowman";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("build-snowman");
     return {
          title: t("title")
     }
}

export default function BuildSnowman(){
     return (
          <GameBuildSnowman/>
     )
}