import GameXO from "@/components/games/tic-tac-toe";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Իքսիկ Նոլիկ"
}

export default function TicTacToe(){
     return (
          <GameXO/>
     )
}