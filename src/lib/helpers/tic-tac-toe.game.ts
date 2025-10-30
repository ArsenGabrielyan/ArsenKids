import { PATTERNS } from "../constants/games";
import { IMinimaxReturnType, TicTacToePlayer } from "../types";
import { playSound, absoluteCDN } from "../utils";

export const checkWinner = (board: string[],callback: (pattern: number[]) => void)=>{
     for(const pattern of PATTERNS){
          const [a,b,c] = pattern;
          if(board[a] && board[a]===board[b] && board[a]===board[c]){
               if(callback) callback(pattern);
               return true;
          }
     }
     return false
}
const getEmptySquares = (board: string[]) => board.map((val,i)=>val==="" ? i : null).filter(i=>i!==null)
export const isDraw = (board: string[],pattern?: number[]) => {
     const emptySquares = getEmptySquares(board);
     return emptySquares.length===0 && pattern?.length===0
}
export const getRandomMove = (board: string[]) => {
     const emptySquares = getEmptySquares(board);
     const randomMove = Math.floor(Math.random()*emptySquares.length);
     return emptySquares[randomMove]
}
const findBlockingMove = (board: string[]) => {
     for(const pattern of PATTERNS){
          const values = pattern.map(i=>board[i]);
          if(values.filter(v=>v==="X").length===2 && values.includes(""))
               return pattern[values.indexOf("")];
     }
     return null;
}
export const getMediumMove = (board: string[]) => findBlockingMove(board) ?? getRandomMove(board)
const minimax = (board: string[], player: TicTacToePlayer): IMinimaxReturnType => {
     const emptySquares = getEmptySquares(board);
     let winningPattern: number[] = [];
     if(checkWinner(board,pattern=>winningPattern=pattern))
          return {index: -1, score: player==="O" ? -10 : 10};
     if(isDraw(board,winningPattern))
          return {index: -1, score: 0};
     const moves: IMinimaxReturnType[] = [];
     for(const move of emptySquares){
          board[move] = player;
          const result = minimax(board,player==="O" ? "X" : "O");
          moves.push({index: move, score: result.score});
          board[move] = ""
     }
     if(player==="O"){
          const bestMove = moves.reduce<IMinimaxReturnType>((prev,curr)=>curr.score>prev.score ? curr : prev,moves[0]);
          return bestMove
     } else {
          const bestMove = moves.reduce<IMinimaxReturnType>((prev,curr)=>curr.score<prev.score ? curr : prev,moves[0]);
          return bestMove
     }
}
export const getBestMove = (board: string[], player: TicTacToePlayer) => minimax(board,player).index
export const playTicTacToeSound = (player: TicTacToePlayer, errorMessage?: string) => {
     const randomNum = Math.floor(Math.random() * 3) + 1;
     playSound(absoluteCDN("sounds",`/tic-tac-toe/${player.toLowerCase()}-${randomNum}.mp3`),errorMessage)
}
export const preloadTicTacToeSounds = () => {
     const sounds = 3, length = sounds*2;
     for(let i=0;i<length;i++){
          const path = `tic-tac-toe/${i<sounds ? "x" : "o"}-${(i%3)+1}.mp3`
          const audio = new Audio(absoluteCDN("sounds",`/${path}`));
          audio.load()
          if(process.env.NODE_ENV==="development") console.info(`The Sound "${path}" loaded`)
     }
}