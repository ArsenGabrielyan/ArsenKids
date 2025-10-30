import { AmazingMathOperator, GameDifficulty, GameMessageType, IMemoryCard, TicTacToeMode, TicTacToeState } from ".";
import { TicTacToeDifficulties } from "./enums";

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
     timeLeft: number | null,
     timerCount: number
}
export interface IMemoryGameState{
     turns: number,
     score: number,
     firstChoice: IMemoryCard | null,
     secondChoice: IMemoryCard | null,
     disabled: boolean,
     isStarted: boolean
}
export interface ITicTacToeState{
     winner: string,
     state: TicTacToeState,
     mode: TicTacToeMode,
     pattern: number[],
     difficulty: TicTacToeDifficulties | "",
     boardDisabled: boolean
}
export interface IInteractiveMathState{
     num1: number,
     num2: number,
     operator: AmazingMathOperator | "",
     solution: number,
     elemIdx: number,
     answer: string,
     operatorQuestion: boolean
}
export interface IPuzzleState{
     isStarted: boolean,
     showNum: boolean,
     randomWinText: string,
     tiles: number[],
     boardSize: number,
}