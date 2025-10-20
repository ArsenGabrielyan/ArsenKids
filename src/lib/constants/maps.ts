import { isChristmas } from "../helpers";
import { CardType, IMusicData } from "../types";
import { SnowmanItems } from "../types/enums";
import { absoluteCDN } from "../utils";

export const BG_IMAGE_MAP = {
     banner: isChristmas() ? "christmas" : "clouds",
     contact: isChristmas() ? "gifts" : "toys",
     christmas: "christmas-background"
}
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
export const IMAGE_SIZES: Record<CardType,{width: number, height: number}> = {
     game: { width: 300, height: 300 },
     service: { width: 495, height: 385 },
     download: { width: 720, height: 1020 }
}
export const SNOWMAN_MAP: Record<SnowmanItems,string[]> = {
     eye: ["","eye-1","eye-2","eye-3","eye-4","eye-5","eye-6"],
     nose: ["","nose-1","nose-2"],
     mouth: ["","mouth-1","mouth-2","mouth-3"],
     hat: ["","beanie","boater","bucket","cap","cowboy","elf","santa","top"],
     hand: ["","stick-1","stick-2","stick-3","mitten"],
     button: ["","buttons-1","buttons-2","buttons-3","buttons-4","buttons-5","buttons-6","buttons-7"]
}