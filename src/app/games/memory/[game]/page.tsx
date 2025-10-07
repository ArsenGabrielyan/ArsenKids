import MemoryGame from "@/components/games/memory"
import { Metadata } from "next"

export const metadata: Metadata = {
     title: "[game] - Զույգեր"
}

export default function Memory(){
     return (
          <MemoryGame/>
     )
}