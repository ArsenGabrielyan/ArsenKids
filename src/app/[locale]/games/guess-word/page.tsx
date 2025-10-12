import GuessWordGame from "@/components/games/guess-word";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Գուշակիր բառը"
}

export default function GuessWord(){
     return (
          <GuessWordGame/>
     )
}