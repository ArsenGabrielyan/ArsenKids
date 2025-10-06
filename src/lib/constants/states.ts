import { TicTacToeState } from "../types"
import { IGuessNumberState, IGuessWordState, IMemoryGameState, ITicTacToeState } from "../types/states"

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
     numInput:"",
     timeLeft: null,
     timerCount: 6
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