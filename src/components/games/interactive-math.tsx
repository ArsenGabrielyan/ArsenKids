"use client"
import { randomValue, getSolution } from "@/lib/helpers/math.game";
import { AmazingMathOperator, GameMessageType } from "@/lib/types";
import { useState, useEffect, useCallback, useRef } from "react";
import { MessageBox } from "../ui/game-msg";
import { toast } from "sonner";
import GameWrapper from "../game-wrapper";
import { absoluteURL } from "@/lib/utils";
import { Button } from "../ui/button";
import { MATH_OPERATORS } from "@/lib/constants/games";
import InteractiveMathForm from "../interactive-math.form";
import { IInteractiveMathState } from "@/lib/types/states";
import { INITIAL_MATH_STATE } from "@/lib/constants/states";
import { InteractiveMathType } from "@/schemas/types";
import { AUDIO } from "@/lib/constants/maps";
import { RotateCcw, Share2 } from "lucide-react";

export default function InteractiveMathGame(){
     const [gameState, setGameState] = useState<IInteractiveMathState>(INITIAL_MATH_STATE);
     const inputRef = useRef<HTMLInputElement>(null)
     const updateState = (overrides: Partial<IInteractiveMathState>) =>
          setGameState(prev=>({...prev,...overrides}))
     const [msgType, setMsgType] = useState<GameMessageType>("");
     const [isStarted, setIsStarted] = useState(false)
     const generateQuestion = useCallback(() => {
          let [num1, num2] = [randomValue(1,15),randomValue(1,15)];
          const randomOperator = MATH_OPERATORS[Math.floor(Math.random()*MATH_OPERATORS.length)]
          if(randomOperator==="-" && num2 > num1) [num1,num2] = [num2,num1]
          const solution = getSolution(num1,num2,randomOperator);
          const randomVar = randomValue(1,5);
          updateState({
               num1,
               num2,
               elemIdx: randomVar-1,
               solution,
               operator: randomOperator,
               answer: randomVar===1 ? num1+"" : randomVar===2 ? num2+"" : randomVar===3 ? randomOperator : solution+"",
               operatorQuestion: randomVar===3
          })
     },[])
     const startGame = useCallback(() => {
          setMsgType("");
          setIsStarted(true)
          generateQuestion();
     },[generateQuestion])
     const checkAnswer = (values: InteractiveMathType) => {
          const isCorrect = values.answer===gameState.answer;
          const audio = new Audio(isCorrect ? AUDIO.correct : AUDIO.wrong)
          if(isCorrect) {
               setMsgType("correct")
               audio.play()
          } else if(gameState.operatorQuestion && !MATH_OPERATORS.includes(values.answer as AmazingMathOperator)) {
               toast.error("Խնդրում եմ տեղադրել ճիշտ օպերատոր")
          } else {
               setMsgType("wrong")
               audio.play()
          }
     }
     useEffect(()=>{
          if(msgType!==""){
               const timer = setTimeout(startGame,800);
               return () => clearTimeout(timer);
          }
     },[msgType, startGame]);
     useEffect(() => {
          Object.values(AUDIO).forEach(src => new Audio(src).load());
     }, []);
     useEffect(()=>{
          if(isStarted && inputRef.current) inputRef.current.focus();
     },[gameState.num1, gameState.num2, isStarted])
     const {num1,num2,operator,solution, elemIdx} = gameState
     return (
          <div className="flex justify-center items-center flex-col min-h-screen relative bg-linear-to-tl from-rainbow-blue to-rainbow-purple p-2.5">
               <GameWrapper title="Հրաշագործ Մաթեմատիկա">
                    {isStarted ? (
                         <>
                              <InteractiveMathForm
                                   num1={num1}
                                   num2={num2}
                                   operator={operator}
                                   solution={solution}
                                   index={elemIdx}
                                   onSubmit={checkAnswer}
                                   inputRef={inputRef}
                              />
                              <div className="flex items-center justify-center gap-2 flex-wrap w-full">
                                   <Button type="button" className="flex-1" variant="outline" onClick={startGame} title="Վերսկսել">
                                        <RotateCcw className="size-6"/>
                                   </Button>
                                   <Button type="button" className="flex-1" variant="outline" shareUrl={absoluteURL("/games/amazing-math")} title="Կիսվել">
                                        <Share2 className="size-6"/>
                                   </Button>
                              </div>
                         </>
                    ) : <Button onClick={startGame}>Սկսել</Button>}
               </GameWrapper>
               <MessageBox type={msgType} />
          </div>
     )
}