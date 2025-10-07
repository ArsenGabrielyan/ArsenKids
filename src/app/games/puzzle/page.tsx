import PuzzleGameMenu from "@/components/games/puzzle/menu"
import { Metadata } from "next"

export const metadata: Metadata = {
     title: "Փազլ «Պատկերներ»"
}

export default function PuzzleMenu(){
     return (
          <PuzzleGameMenu/>
     )
}