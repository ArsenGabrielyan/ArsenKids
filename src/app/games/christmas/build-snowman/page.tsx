import GameBuildSnowman from "@/components/games/christmas/build-snowman";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Պատրաստիր ձնեմարդ"
}

export default function BuildSnowman(){
     return (
          <GameBuildSnowman/>
     )
}