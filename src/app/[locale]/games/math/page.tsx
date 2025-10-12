import MathGame from "@/components/games/math";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Մաթեմատիկա"
}

export default function Math(){
     return (
          <MathGame/>
     )
}