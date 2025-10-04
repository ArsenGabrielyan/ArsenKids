"use client"
import { BASE_ARR} from "@/lib/constants/games";
import { AUDIO } from "@/lib/constants/maps";
import { INITIAL_TIC_TAC_TOE_STATE } from "@/lib/constants/states";
import { DIFFICULTY, DIFFICULTIES } from "@/lib/constants/tic-tac-toe.game";
import { getRandomMove, getMediumMove, getBestMove, checkWinner, isDraw } from "@/lib/helpers/tic-tac-toe.game";
import { TicTacToeState, TicTacToeMode, TicTacToeDifficulty } from "@/lib/types";
import { ITicTacToeState } from "@/lib/types/states";
import { absoluteURL, cn, playSound } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../logo";
import { Button } from "../ui/button";
import { SquareXO } from "../ui/game";
import { Menu, RotateCcw, Share2 } from "lucide-react";

export default function GameXO(){
     const [board,setBoard] = useState(BASE_ARR);
     const [player,setPlayer] = useState("O");
     const [isStarted, setIsStarted] = useState(false);
     const [gameState, setGameState] = useState(INITIAL_TIC_TAC_TOE_STATE)
     const handleSquareClick = (index: number) =>{
          if(board[index]!=="" || gameState.state!==TicTacToeState.Ongoing) return;
          setBoard(prev=>prev.map((value,i)=>(i===index ? player : value)));
          setPlayer(prev=>prev==="X" ? "O" : "X");
     }
     const pcMove = () => {
          const move = gameState.difficulty==="easy" ? getRandomMove(board) : gameState.difficulty==="medium" ? getMediumMove(board) : getBestMove(board,player);
          setBoard(prev=>prev.map((val,i)=>i===move ? "O" : val));
          setPlayer(prev=>prev==="O" ? "X" : "O")
     }
     const resetGameState = (overrides: Partial<ITicTacToeState> = {}) => {
          setBoard(BASE_ARR)
          setPlayer("X");
          setGameState(prev=>({
               ...prev,
               ...overrides
          }))
     }
     const startGame = (mode: TicTacToeMode) => {
          setIsStarted(true);
          setGameState(prev=>({
               ...prev,
               mode
          }))
     }
     const restart = () => resetGameState({
          winner: "",
          state: TicTacToeState.Ongoing,
          pattern: []
     })
     const goBackToMenu = () => {
          resetGameState(INITIAL_TIC_TAC_TOE_STATE);
          setIsStarted(false);
     }
     const startGameInDifficulty = (difficulty: TicTacToeDifficulty) => resetGameState({difficulty})
     useEffect(()=>{
          const audio = new Audio()
          let winningPattern: number[] = [];
          if(checkWinner(board,pattern=>winningPattern=pattern)){
               setGameState(prev=>({
                    ...prev,
                    winner: player==="X" ? "O" : "X",
                    state: TicTacToeState.Win,
                    pattern: winningPattern
               }))
               if(gameState.mode==="2-players"){
                    playSound(audio, AUDIO.sparkle)
               } else {
                    playSound(audio, player==="O" ? AUDIO.correct : AUDIO.wrong)
               }
          }
          if(isDraw(board,winningPattern)){
               setGameState(prev=>({
                    ...prev,
                    state: TicTacToeState.Draw,
               }))
               playSound(audio,AUDIO.wrong)
          }
     },[board,player,gameState.mode])
     useEffect(()=>{
          if(gameState.mode==="player-vs-pc" && player!=="X" && gameState.state===TicTacToeState.Ongoing){
               const timer = setTimeout(pcMove,500);
               return () => clearTimeout(timer)
          }
          // eslint-disable-next-line
     },[gameState,player])
     const {state,pattern,winner,mode,difficulty} = gameState
     const stateTxt = state===TicTacToeState.Draw ? "Ոչ ոքի": winner==="X" ? "Իքսիկը հաղթեց" : "Նոլիկը հաղթեց"
     return (
          <div className="w-full h-screen flex justify-center items-center relative flex-col bg-rainbow-blue z-20">
               <div className="flex justify-center items-center flex-col gap-0.5 p-2.5 rounded-md shadow border bg-card text-card-foreground mb-3">
                    <Link href="/game" className="mb-1" title="Վերադառնալ" aria-label="ArsenKids">
                         <Logo src="/arsenkids-black.svg" width={250} height={60}/>
                    </Link>
                    <h1 className="text-[36.5px] relative drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold">
                         <span className="text-[#0da2b3]">Իքսիկ</span>{" "}
                         <span className="text-[#FF5645]">Նոլիկ</span>
                    </h1>
                    {isStarted && (
                         <div className="flex justify-between items-center gap-4 text-center">
                              {(mode==="2-players" || difficulty!=="") ? (
                                   <>
                                        <div className="space-y-0.5">
                                             <h2 className="text-lg md:text-[21px]">Հաջորդը՝ {player}</h2>
                                             {difficulty && (
                                                  <h2 className="text-base">Բարդություն՝ {DIFFICULTY[difficulty]}</h2>
                                             )}
                                        </div>
                                        <div className="flex flex-wrap justify-center items-center gap-2">
                                             <Button variant="primary" className="flex-1" title="Կիսվել" shareUrl={absoluteURL("/tic-tac-toe")} size="icon"><Share2/></Button>
                                             <Button variant="primary" className="flex-1" title="Վերադառնալ մենյու" onClick={goBackToMenu} size="icon"><Menu/></Button>
                                        </div>
                                   </>
                              ) : (
                                   <p className="font-heading text-lg">Ընտրել բարդությունը</p>
                              )}
                         </div>
                    )}
               </div>
               {isStarted ? (
                    (mode==="2-players" || difficulty!=="") ? (
                         <>
                              <div className={cn(
                                   "rounded-lg grid",
                                   "grid-cols-(--tic-tac-toe-grid-xs) grid-rows-(--tic-tac-toe-grid-xs)",
                                   "sm:grid-cols-(--tic-tac-toe-grid-sm) sm:grid-rows-(--tic-tac-toe-grid-sm)",
                                   "md:grid-cols-(--tic-tac-toe-grid) md:grid-rows-(--tic-tac-toe-grid)"
                              )}>
                                   {board.map((val,i)=>(
                                        <SquareXO
                                             key={i}
                                             val={board[i]}
                                             handleSquareClick={()=>handleSquareClick(i)} 
                                             disabled={state!==TicTacToeState.Ongoing || val!=="" || (mode==="player-vs-pc" && player!=="X")}
                                             isPatternEqual={pattern.includes(i)}
                                        />)
                                   )}
                              </div>
                              {state!==TicTacToeState.Ongoing && (
                                   <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center flex-col bg-linear-to-tl from-rainbow-blue/80 to-rainbow-green/80">
                                        <div className="p-2.5 rounded-md shadow border bg-card text-card-foreground max-w-sm space-y-2">
                                             <h2 className={cn("text-[40px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold relative text-center",state===TicTacToeState.Draw ? "text-black": winner==="X" ? "text-[#00A8BB]" : "text-[#FF5645]")}>{stateTxt}</h2>
                                             <div className="flex flex-col gap-2">
                                                  <div className="flex justify-center items-center flex-wrap gap-2">
                                                       <Button className="flex-1" variant="tertiary" onClick={restart} title="Վերսկսել"><RotateCcw className="size-6"/></Button>
                                                       <Button className="flex-1" variant="tertiary" onClick={goBackToMenu} title="Վերադառնալ մենյու"><Menu className="size-6"/></Button>
                                                  </div>
                                                  <Button variant="tertiary" asChild>
                                                       <Link href="/games">Վերադառնալ</Link>
                                                  </Button>
                                             </div>
                                        </div>
                                   </div>
                              )}
                         </>
                    ) : (
                         <div className="flex justify-center items-center flex-col gap-2.5">
                              {DIFFICULTIES.map((val,i)=>(
                                   <Button variant="primary" onClick={()=>startGameInDifficulty(val.difficulty)} key={i} className="w-full">{val.name}</Button>
                              ))}
                              <Button variant="primary" onClick={goBackToMenu} className="w-full">Վերադառնալ մենյու</Button>
                         </div>
                    )
               ) : (
                    <div className="flex justify-center items-center flex-col gap-2.5">
                         <Button variant="primary"onClick={()=>startGame("player-vs-pc")} className="w-full">1 Խաղացող</Button>
                         <Button variant="primary" onClick={()=>startGame("2-players")} className="w-full">2 Խաղացող</Button>
                    </div>
               )}
          </div>
     )
}