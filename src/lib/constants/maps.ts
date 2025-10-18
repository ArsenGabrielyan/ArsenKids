import { isChristmas } from "../helpers";
import { IMusicData } from "../types";
import { absoluteCDN } from "../utils";

export const BG_IMAGE_MAP = {
     banner: isChristmas() ? "christmas" : "clouds",
     contact: isChristmas() ? "gifts" : "toys",
     christmas: "christmas-background"
}
// Enums
export enum OPERATORS {
     "addition" = "+",
     "subtraction" = "-",
     "multiplication" = "×",
     "division" = "÷",
}

// Constants
export const MATH_OPTIONS: [string, string, string] = [
     "bg-[#A52431] hover:text-[#A52431]",
     "bg-[#604080] hover:text-[#604080]",
     "bg-[#166528] hover:text-[#166528]",
]
export const AUDIO = {
     correct: absoluteCDN("sounds","/correct.mp3"),
     wrong: absoluteCDN("sounds","/wrong.mp3"),
     sparkle: absoluteCDN("sounds","/winner.mp3"),
     tick: absoluteCDN("sounds","/tick.mp3"),
     start: absoluteCDN("sounds","/start.mp3"),
     bubblePop: absoluteCDN("sounds","/bubbles.mp3")
}
export const CHRISTMAS_MUSIC: IMusicData[] = [
     {title: "12 Days Of Christmas", artist: "Jingle Punks"},
     {title: "Christmas Village", artist: "Aaron Kenny"},
     {title: "Deck The Halls", artist: "Jingle Punks"},
     {title: "Jingle Bells", artist: "Jingle Punks"},
     {title: "O Christmas Tree", artist: "Jingle Punks"},
     {title: "We Wish You a Merry Christmas", artist: "Jingle Punks"}
]