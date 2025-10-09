import MemoryGame from "@/components/games/memory";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Ամանոր - Զույգեր"
}


export default function ChristmasMemory(){
     return (
          <MemoryGame
               type="christmas"
               title="Ամանոր"
          />
     )
}