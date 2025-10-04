import { ITicTacToeDifficulty, TicTacToeDifficulty } from "../types";

export const PATTERNS: number[][] = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
];
export const DIFFICULTIES: ITicTacToeDifficulty[] = [
     {name: "Հեշտ", difficulty: "easy"},
     {name: "Միջին", difficulty: "medium"},
     {name: "Բարդ", difficulty: "hard"}
]
export const DIFFICULTY: Record<TicTacToeDifficulty, string> = {
     easy: "Հեշտ",
     medium: "Միջին",
     hard: "Բարդ",
     "": ""
}