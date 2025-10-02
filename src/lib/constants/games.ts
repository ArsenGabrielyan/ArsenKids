import { IGameDifficulty, OperatorType } from "../types";

export const DIFFICULTIES: IGameDifficulty[] = [
     {id: 1, name: "easy", title: "Հեշտ"},
     {id: 2, name: "medium", title: "Միջին"},
     {id: 3, name: "hard", title: "Բարդ"},
     {id: 4, name: "mixed", title: "Խառը"}
];
export const BASE_ARR: string[] = new Array(9).fill("");
export const SUCCESS_WORDS = ["Ապրե՛ս", "Կեցցե՛ս", "Սու՛պեր", "Բրա՛վո", "Ընտիր է", "Գերազանց", "Կատարյալ է"];
export const MATH_LINKS: OperatorType[] = ["Գումարում", "Հանում", "Բազմապատկում", "Բաժանում" ];
export const TILE_COUNT = 9, GRID_SIZE = 3, BOARD_SIZE = 320;
export const BUBBLE_CREATION_INTERVAL = 1200;