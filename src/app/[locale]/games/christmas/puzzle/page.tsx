import PuzzleGameMenu from "@/components/games/puzzle/menu"
import { Metadata } from "next"

export const metadata: Metadata = {
     title: "Փազլ «Ամանոր»"
}

export default function PuzzleMenu(){
     return (
          <PuzzleGameMenu christmas />
     )
}