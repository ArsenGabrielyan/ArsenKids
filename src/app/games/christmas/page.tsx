import ChristmasGamesMenu from "@/components/sections/christmas-games-hub";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Ամանորյա Խաղեր"
}

export default function ChristmasGamesHub(){
     return (
          <ChristmasGamesMenu/>
     )
}