import { PATTERNS } from "../constants/tic-tac-toe.game";
import { IMinimaxReturnType } from "../types";

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
const minimax = (board: string[], player: string): IMinimaxReturnType => {
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
export const getBestMove = (board: string[], player: string) => minimax(board,player).index