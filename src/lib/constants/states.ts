import { TicTacToeState } from "../types"
import { IGuessNumberState, IGuessWordState, IInteractiveMathState, IMemoryGameState, IPuzzleState, ITicTacToeState } from "../types/states"
import { BOARD_SIZE, SUCCESS_WORDS, TILE_COUNT } from "./games"

export const INITIAL_GUESS_WORD_STATE: IGuessWordState = {
     correct:"",
     scrambled:"",
     isPlay: false,
     isOver: false,
     showHint: false,
     msgType: "",
     hintCount: 3,
     correctCount: 0,
     difficulty: ""
}
export const INITIAL_GUESS_NUMBER_STATE: IGuessNumberState = {
     isStarted:false,
     showNum:false,
     showSquare:false,
     num:"",
     msgType: "",
     difficulty:"",
     timeLeft: null,
     timerCount: 6
}
export const INITIAL_MATH_STATE: IInteractiveMathState = {
     num1: 0,
     num2: 0,
     operator: "",
     solution: 0,
     elemIdx: 0,
     answer: "",
     operatorQuestion: false
} 
export const INITIAL_TIC_TAC_TOE_STATE: ITicTacToeState = {
     winner: "",
     state: TicTacToeState.Ongoing,
     mode: "",
     pattern: [],
     difficulty: ""
}
export const INITIAL_PAIRS_STATE: IMemoryGameState = {
     turns: 0,
     score: 0,
     firstChoice: null,
     secondChoice: null,
     disabled: false,
     isStarted: false
}
export const INITIAL_PUZZLE_STATE: IPuzzleState = {
     isStarted: false,
     showNum: false,
     randomWinText: SUCCESS_WORDS[Math.floor(Math.random()*SUCCESS_WORDS.length)],
     tiles: Array.from({length: TILE_COUNT},(_,i)=>i),
     boardSize: BOARD_SIZE
}