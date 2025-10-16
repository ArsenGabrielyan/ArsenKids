import { AmazingMathOperator, GameMessageType, IGameDifficulty, IGameMessage, OperatorType } from "../types";
import { generateMessagesForTranslation } from "../utils";

export const DIFFICULTIES: IGameDifficulty[] = [
     {id: 1, name: "easy",},
     {id: 2, name: "medium"},
     {id: 3, name: "hard",},
     {id: 4, name: "mixed",}
];
export const BASE_ARR: string[] = new Array(9).fill("");
export const SUCCESS_WORDS = generateMessagesForTranslation(12)
export const MATH_LINKS: OperatorType[] = ["addition", "subtraction", "multiplication", "division"];
export const MATH_OPERATORS: AmazingMathOperator[] = ["+","-","*"];
export const TILE_COUNT = 9, GRID_SIZE = 3, BOARD_SIZE = 320;
export const BUBBLE_CREATION_INTERVAL = 1200;
export const GAME_MESSAGES: Record<Exclude<GameMessageType,"">,IGameMessage> = {
     correct: {
          messages: generateMessagesForTranslation(17),
          className: "bg-rainbow-green/95 text-black"
     },
     wrong: {
          messages: generateMessagesForTranslation(12),
          className: "bg-destructive/95 text-white"
     }
}