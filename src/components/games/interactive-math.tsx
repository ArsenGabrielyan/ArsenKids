"use client"
import { randomValue, getSolution } from "@/lib/helpers/math.game";
import { AmazingMathOperator, GameMessageType } from "@/lib/types";
import { useState, useEffect, useCallback, useRef } from "react";
import { MessageBox } from "../ui/game-msg";
import { toast } from "sonner";
import GameWrapper from "../game-wrapper";
import { absoluteURL, playSound, preloadAudio } from "@/lib/utils";
import { Button } from "../ui/button";
import { MATH_OPERATORS } from "@/lib/constants/games";
import InteractiveMathForm from "../interactive-math.form";
import { IInteractiveMathState } from "@/lib/types/states";
import { INITIAL_MATH_STATE } from "@/lib/constants/states";
import { InteractiveMathType } from "@/schemas/types";
import { AUDIO } from "@/lib/constants/maps";
import { RotateCcw, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function InteractiveMathGame(){
     const [gameState, setGameState] = useState<IInteractiveMathState>(INITIAL_MATH_STATE);
     const inputRef = useRef<HTMLInputElement>(null);
     const validationMessages = useTranslations("validation");
     const t = useTranslations("interactive-math");
     const buttonText = useTranslations("buttons");
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
          if(isCorrect) {
               setMsgType("correct")
               playSound(AUDIO.correct,validationMessages("soundError"))
          } else if(gameState.operatorQuestion && !MATH_OPERATORS.includes(values.answer as AmazingMathOperator)) {
               toast.error(validationMessages("answer.correctOperator"))
          } else {
               setMsgType("wrong")
               playSound(AUDIO.wrong,validationMessages("soundError"))
          }
     }
     useEffect(()=>{
          if(msgType!==""){
               const timer = setTimeout(startGame,800);
               return () => clearTimeout(timer);
          }
     },[msgType, startGame]);
     useEffect(() => {
          preloadAudio(AUDIO,"correct","wrong")
     }, []);
     useEffect(()=>{
          if(isStarted && inputRef.current) inputRef.current.focus();
     },[gameState.num1, gameState.num2, isStarted])
     const {num1,num2,operator,solution, elemIdx} = gameState
     return (
          <div className="flex justify-center items-center flex-col min-h-screen relative bg-linear-to-tl from-rainbow-blue to-rainbow-purple p-4 md:p-5">
               <GameWrapper title={t("title")}>
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
                                   <Button type="button" className="flex-1" variant="outline" onClick={startGame} title={buttonText("restart")}>
                                        <RotateCcw className="size-6"/>
                                   </Button>
                                   <Button type="button" className="flex-1" variant="outline" shareUrl={absoluteURL("/games/amazing-math")} title={buttonText("share")}>
                                        <Share2 className="size-6"/>
                                   </Button>
                              </div>
                         </>
                    ) : <Button onClick={startGame}>{buttonText("start")}</Button>}
               </GameWrapper>
               <MessageBox type={msgType} />
          </div>
     )
}