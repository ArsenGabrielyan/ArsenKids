import { GameMessageType, IGameDifficulty, IGameMessage, OperatorType } from "../types";

export const DIFFICULTIES: IGameDifficulty[] = [
     {id: 1, name: "easy", title: "Հեշտ"},
     {id: 2, name: "medium", title: "Միջին"},
     {id: 3, name: "hard", title: "Բարդ"},
     {id: 4, name: "mixed", title: "Խառը"}
];
export const BASE_ARR: string[] = new Array(9).fill("");
export const SUCCESS_WORDS = ["Ապրե՛ս", "Կեցցե՛ս", "Սու՛պեր", "Բրա՛վո", "Ընտիր է", "Գերազանց", "Կատարյալ է","Հիանալի է","Տպավորիչ է", "Շատ լավ է", "Ֆանտաստիկ է", "Դու հրաշալի ես"];
export const MATH_LINKS: OperatorType[] = ["Գումարում", "Հանում", "Բազմապատկում", "Բաժանում" ];
export const TILE_COUNT = 9, GRID_SIZE = 3, BOARD_SIZE = 320;
export const BUBBLE_CREATION_INTERVAL = 1200;
export const GAME_MESSAGES: Record<Exclude<GameMessageType,"">,IGameMessage> = {
     correct: {
          messages: [...SUCCESS_WORDS, "Ճիշտ է", "Այո", "Ըհըն", "Իհարկե","Դու հանճար ես"],
          className: "bg-rainbow-green/95 text-black"
     },
     wrong: {
          messages: ["Սխալ է", "Ոչ", "Չէ", "Չէ չէ չէ", "Հը ըն", "Նորից փորձիր", "Կրկին փորձիր", "Իհարկե ոչ","Ոչ ոչ ոչ","Ճիշտ չէ","Սխալ պատասխան",],
          className: "bg-destructive/95 text-white"
     }
}