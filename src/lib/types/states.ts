import { GameDifficulty, TicTacToeDifficulty, TicTacToeMode, TicTacToeState } from ".";

export interface IGuessWordState{
     val: string;
     correct: string;
     scrambled: string;
     isPlay: boolean;
     isOver: boolean;
     showHint: boolean;
     msg: string;
     hintCount: number;
     correctCount: number;
     choseDifficulty: boolean;
}
export interface IGuessNumberState{
     isStarted: boolean,
     showNum: boolean,
     showSquare: boolean,
     num: string,
     msg: string,
     difficulty: GameDifficulty,
     numInput: string,
     timeLeft: number | null,
     timerCount: number
}
export interface IMemoryGameState{
     turns: number,
     score: number,
}
export interface ITicTacToeState{
     winner: string,
     state: TicTacToeState,
     mode: TicTacToeMode,
     pattern: number[],
     difficulty: TicTacToeDifficulty
}