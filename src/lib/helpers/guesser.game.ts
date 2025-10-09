import { WORDS_BY_DIFFICULTY } from "../constants/maps";
import { GameDifficulty } from "../types";

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