import InteractiveMathGame from "@/components/games/interactive-math";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Հրաշագործ Մաթեմատիկա"
}

export default function InteractiveMath(){
     return (
          <InteractiveMathGame/>
     )
}