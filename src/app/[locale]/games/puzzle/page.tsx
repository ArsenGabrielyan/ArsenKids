import PuzzleGameMenu from "@/components/games/puzzle/menu"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async() => {
     const t = await getTranslations("puzzle");
     return {
          title: t("title")
     }
}

export default function PuzzleMenu(){
     return (
          <PuzzleGameMenu/>
     )
}