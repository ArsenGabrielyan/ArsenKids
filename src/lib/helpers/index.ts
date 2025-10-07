import { BG_IMAGE_MAP, GAME_TITLES, WORDS_BY_DIFFICULTY } from "../constants/maps";
import { BgImageVariant, GameDifficulty, IGameTitles } from "../types";

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
export const generateRandomNumber = (length: number) =>
     Math.floor(Math.random()*Math.pow(10,length)).toString().padStart(length,"0");
export const getDifficultyLength = (diff: GameDifficulty) => {
     const randomLength = Math.floor(Math.random() * 3) + 2;
     return diff === "easy" ? 2 : diff === "medium" ? 3 : diff === "hard" ? 4 : randomLength;
}

export function getBackgroundImage(variant: BgImageVariant): React.CSSProperties{
     const bgImage = BG_IMAGE_MAP[variant]
     const jpg = `/backgrounds/${bgImage}.jpg`;
     const webp = `/backgrounds/${bgImage}.webp`;
     return {
          background: `url(${webp}), url(${jpg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          ...(variant==="banner" ? {
               backgroundAttachment: "fixed"
          } : null),
          ...(variant==="contact" ? {
               backgroundPosition: "center"
          } : isChristmas() ? {
               backgroundPosition: "right"
          } : null)
     }
}
export const getGameTitle = (category: keyof IGameTitles,key:string): string => GAME_TITLES[category]?.[key] || ""