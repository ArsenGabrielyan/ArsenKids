import { TicTacToeState } from "../types"
import { IGuessNumberState, IGuessWordState, IInteractiveMathState, IMemoryGameState, ITicTacToeState } from "../types/states"

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
export const INITIAL_PAIRS_STATE: IMemoryGameState = {
     turns: 0,
     score: 0,
}
export const INITIAL_TIC_TAC_TOE_STATE: ITicTacToeState = {
     winner: "",
     state: TicTacToeState.Ongoing,
     mode: "",
     pattern: [],
     difficulty: ""
}