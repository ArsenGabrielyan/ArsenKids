import MemoryGameMenu from "@/components/games/memory/menu"
import { Metadata } from "next"

export const metadata: Metadata = {
     title: "Զույգեր"
}

export default function MemoryMenu(){
     return (
          <MemoryGameMenu/>
     )
}