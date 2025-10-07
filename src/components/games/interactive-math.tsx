"use client"
import { randomValue, getSolution } from "@/lib/helpers/math.game";
import { AmazingMathOperator, GameMessageType } from "@/lib/types";
import { useRef, useState, FormEvent, useEffect, useCallback } from "react";
import { MessageBox } from "../ui/game-msg";
import { toast } from "sonner";
import GameWrapper from "../game-wrapper";
import { absoluteURL } from "@/lib/utils";
import { Button } from "../ui/button";
import { MATH_OPERATORS } from "@/lib/constants/games";
import InteractiveMathForm from "../interactive-math.form";
import { IInteractiveMathState } from "@/lib/types/states";
import { INITIAL_MATH_STATE } from "@/lib/constants/states";

export default function InteractiveMathGame(){
     const inputRef = useRef<HTMLInputElement | null>(null)
     const [gameState, setGameState] = useState<IInteractiveMathState>(INITIAL_MATH_STATE);
     const updateState = (overrides: Partial<IInteractiveMathState>) =>
          setGameState(prev=>({...prev,...overrides}))
     const [msgType, setMsgType] = useState<GameMessageType>("");
     const [isStarted, setIsStarted] = useState(false)
     const generateQuestion = useCallback(() => {
          let [num1, num2] = [randomValue(1,20),randomValue(1,20)];
          const randomOperator = MATH_OPERATORS[Math.floor(Math.random()*MATH_OPERATORS.length)]
          if(randomOperator==="-" && num2 > num1) [num1,num2] = [num2,num1]
          const solution = getSolution(num1,num2,randomOperator);
          const randomVar = randomValue(1,5);
          updateState({
               num1,
               num2,
               elemIdx: randomVar,
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
     const checkAnswer = (e:FormEvent) => {
          e.preventDefault()
          if(!inputRef.current) return;
          const inputVal = inputRef.current.value;
          if(inputVal && inputVal.trim()!==""){
               const audio = new Audio(`/audio/${inputVal===gameState.answer ? 'correct' : "wrong"}.mp3`)
               if(inputVal===gameState.answer) {
                    setMsgType("correct")
                    audio.play()
               } else if(gameState.operatorQuestion && !MATH_OPERATORS.includes(inputVal as AmazingMathOperator)) {
                    toast.error("Խնդրում եմ տեղադրել ճիշտ օպերատոր")
               } else {
                    setMsgType("wrong")
                    audio.play()
               }
               inputRef.current.value = ""
          } else toast.error("Խնդրում եմ գրել ցանկացած թիվ կամ օպերատոր որպես պատասխան")
     }
     useEffect(()=>{
          if(msgType!==""){
               const timer = setTimeout(startGame,800);
               return () => clearTimeout(timer);
          }
     },[msgType, startGame]);
     const {num1,num2,operator,solution, elemIdx} = gameState
     return (
          <div className="flex justify-center items-center flex-col min-h-screen relative bg-linear-to-tl from-rainbow-blue to-rainbow-purple p-2.5">
               <GameWrapper title="Հրաշագործ Մաթեմատիկա">
                    {isStarted ? <>
                    <InteractiveMathForm
                         num1={num1}
                         num2={num2}
                         operator={operator}
                         solution={solution}
                         index={elemIdx}
                    />
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                         <Button className="flex-1" variant="tertiary" onClick={checkAnswer}>Ստուգել</Button>
                         <Button className="flex-1" variant="tertiary" onClick={startGame}>Վերսկսել</Button>
                    </div>
                    </> : <Button onClick={startGame}>Սկսել</Button>}
                    <Button variant="tertiary" shareUrl={absoluteURL("/games/amazing-math")}>Կիսվել</Button>
               </GameWrapper>
               <MessageBox type={msgType} />
          </div>
     )
}