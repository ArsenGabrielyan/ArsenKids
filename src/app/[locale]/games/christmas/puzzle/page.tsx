import PuzzleGameMenu from "@/components/games/puzzle/menu"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("puzzle");
     return {
          title: t("christmasTitle")
     }
}

export default function PuzzleMenu(){
     return (
          <PuzzleGameMenu christmas />
     )
}