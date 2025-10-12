import GuessNumberGame from "@/components/games/guess-number";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Հիշիր թվանշանները"
}

export default function GuessNumber(){
     return (
          <GuessNumberGame/>
     )
}