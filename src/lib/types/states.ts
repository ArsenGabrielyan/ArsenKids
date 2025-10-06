import { GameDifficulty, GameMessageType, TicTacToeDifficulty, TicTacToeMode, TicTacToeState } from ".";

export interface IGuessWordState{
     correct: string;
     scrambled: string;
     isPlay: boolean;
     isOver: boolean;
     showHint: boolean;
     msgType: GameMessageType;
     hintCount: number;
     correctCount: number;
     difficulty: GameDifficulty
}
export interface IGuessNumberState{
     isStarted: boolean,
     showNum: boolean,
     showSquare: boolean,
     num: string,
     msgType: GameMessageType;
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