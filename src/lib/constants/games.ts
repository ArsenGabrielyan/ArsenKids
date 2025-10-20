import { AmazingMathOperator, GameMessageType, IGameDifficulty, ISnowmanItem, OperatorType, TicTacToeBoard } from "../types";
import { SnowmanItems, TicTacToeDifficulties } from "../types/enums";
import { generateMessagesForTranslation } from "../utils";
import { SNOWMAN_MAP } from "./maps";

export const DIFFICULTIES: IGameDifficulty[] = [
     {id: 1, name: "easy",},
     {id: 2, name: "medium"},
     {id: 3, name: "hard",},
     {id: 4, name: "mixed",}
];
export const BASE_ARR: TicTacToeBoard[] = new Array(9).fill("");
export const SUCCESS_WORDS = generateMessagesForTranslation(12)
export const MATH_LINKS: OperatorType[] = ["addition", "subtraction", "multiplication", "division"];
export const MATH_OPERATORS: AmazingMathOperator[] = ["+","-","*"];
export const TILE_COUNT = 9, GRID_SIZE = 3, BOARD_SIZE = 320;
export const BUBBLE_CREATION_INTERVAL = 1200;
export const GAME_MESSAGE_STYLE: Record<Exclude<GameMessageType,"">,string> = {
     correct: "bg-rainbow-green/95 text-black",
     wrong: "bg-destructive/95 text-white"
}

// Tic Tac Toe
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
export const TIC_TAC_TOE_DIFFICULTIES = Object.values(TicTacToeDifficulties)

// Snowman
export const snowmanItems: ISnowmanItem[] = Object.entries(SNOWMAN_MAP).flatMap(([k,v])=>
     v.map(name=>({
          name,
          type: k as SnowmanItems
     })))
export const snowmanSidebarItems = Object.values(SnowmanItems)