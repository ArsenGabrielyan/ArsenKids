import { useTranslations } from "next-intl";
import { GameDifficulty } from "../types";

const getWordList = (t: ReturnType<typeof useTranslations>, difficulty: GameDifficulty): string[] => 
     t(`${difficulty}-words`).split(",").map(w => w.trim()).filter(Boolean);

export const getWords = (difficulty: GameDifficulty, t: ReturnType<typeof useTranslations>) => {
     if(!difficulty) return [];
     if(difficulty==="mixed"){
          const difficulties: GameDifficulty[] = ["easy", "medium", "hard"]
          return difficulties.flatMap(diff => getWordList(t, diff))
     }
     return getWordList(t, difficulty)
}

export const makeScrambled = (word: string) => word.split("").sort(()=>0.5-Math.random()).join("")

export const generateRandomNumber = (length: number) =>
     Math.floor(Math.random()*Math.pow(10,length)).toString().padStart(length,"0");

export const getDifficultyLength = (diff: GameDifficulty) => {
     const randomLength = Math.floor(Math.random() * 3) + 2;
     return diff === "easy" ? 2 : diff === "medium" ? 3 : diff === "hard" ? 4 : randomLength;
}