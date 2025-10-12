import BubblesGame from "@/components/games/bubbles";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Պղպջակներ"
}

export default function Bubbles(){
     return (
          <BubblesGame/>
     )
}