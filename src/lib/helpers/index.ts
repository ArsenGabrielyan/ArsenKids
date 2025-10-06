import { BG_IMAGE_MAP, WORDS_BY_DIFFICULTY } from "../constants/maps";
import { BgImageVariant, GameDifficulty } from "../types";

export function isChristmas(){
     const today = new Date();
     const month = today.getMonth() + 1,day = today.getDate();
     return (month === 12 && day >= 6) || (month === 1 && day <= 10);
}

export const getWords = (difficulty: GameDifficulty) =>
     difficulty === "" ? [] :
     difficulty==="mixed"
          ? WORDS_BY_DIFFICULTY.default
          : WORDS_BY_DIFFICULTY[difficulty]
          
export const makeScrambled = (word: string) => word.split("").sort(()=>0.5-Math.random()).join("")

export function getBackgroundImage(variant: BgImageVariant): {
     jpg: string,
     webp: string
}{
     const bgImage = BG_IMAGE_MAP[variant]
     return {
          jpg: `/backgrounds/${bgImage}.jpg`,
          webp: `/backgrounds/${bgImage}.webp`
     }
}