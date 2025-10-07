import PuzzleGame from "@/components/games/puzzle"
import { Metadata } from "next"

export const metadata: Metadata = {
     title: "Փազլ «[title]»"
}

export default function Puzzle(){
     return (
          <PuzzleGame/>
     )
}