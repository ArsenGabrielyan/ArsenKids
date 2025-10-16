"use client"
import { MATH_LINKS } from "@/lib/constants/games";
import { AUDIO, MATH_OPTIONS, OPERATORS } from "@/lib/constants/maps";
import { generateEquation, checkAnswer } from "@/lib/helpers/math.game";
import Link from "next/link"
import { useState, useEffect } from "react";
import { absoluteURL, cn } from "@/lib/utils"
import { MessageBox } from "../ui/game-msg";
import { Button } from "../ui/button";
import { GameMessageType, OperatorType } from "@/lib/types";
import Logo from "../logo";
import { Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MathGame(){
     const t = useTranslations("math");
     const buttonText = useTranslations("buttons")
     const [mode,setMode] = useState<OperatorType>("addition");
     const [state,setState] = useState({q1:0,q2:0,answers:[0,0,0]});
     const [msgType, setMsgType] = useState<GameMessageType>("");
     const handleChangeMode = (newMode: OperatorType) => {
          setMode(newMode);
          setState(generateEquation(newMode));
          setMsgType("");
     }
     const handleAnswerClick = (selected: number) => {
          const {q1,q2} = state;
          const isCorrect = checkAnswer(mode,q1,q2,selected);
          setMsgType(isCorrect ? "correct" : "wrong");
          new Audio(isCorrect ? AUDIO.correct : AUDIO.wrong).play();
          setTimeout(()=>{
               if(isCorrect) setState(generateEquation(mode));
               setMsgType("");
          },800)
     }
     useEffect(()=>{
          setState(generateEquation("addition"))
          Object.values(AUDIO).forEach(src => new Audio(src).load());
     },[])
     const {q1,q2,answers} = state;
     const operator = OPERATORS[mode];
     return <>
     <header>
          <div className="p-5 overflow-hidden bg-blue-800 w-full flex justify-between items-center flex-col lg:flex-row">
               <div className="w-full max-w-[200px] flex justify-center items-center flex-col">
                    <Link href="/games" aria-label="ArsenKids" title={buttonText("goBack")}>
                         <Logo src="/arsenkids.svg" width={200} height={50}/>
                    </Link>
                    <h1 className="text-xl text-white">{t("title")}</h1>
               </div>
               <ul className="text-base md:text-[21px] flex gap-2 items-center font-heading wrap justify-center flex-col md:flex-row mt-2.5 md:mt-0">
                    {MATH_LINKS.map((link,i)=>(
                         <li key={i} className={cn("py-2 px-4 text-center text-white transition-all cursor-pointer border-b-2 border-transparent hover:border-b-white w-full md:w-fit",link===mode && "bg-white text-blue-800 rounded-md")} onClick={()=>handleChangeMode(link)}>{t(link)}</li>
                    ))}
               </ul>
          </div>
     </header>
     <div className="grid place-content-start p-2.5 grid-cols-1 lg:grid-cols-[75%_25%] min-h-[50vh]">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl rounded-sm bg-gray-700 text-center py-[15%]">
               <h2 className="inline p-0.5 sm:p-2.5 text-rainbow-green">{q1>q2 || mode!=="division" ? q1 : q2}</h2>
               <h2 className="inline p-0.5 sm:p-2.5 text-rainbow-orange">{operator}</h2>
               <h2 className="inline p-0.5 sm:p-2.5 text-rainbow-yellow">{q1>q2 || mode!=="division" ? q2 : q1}</h2>
               <h2 className="inline p-0.5 sm:p-2.5 text-rainbow-orange">=</h2>
               <h2 className="inline p-0.5 sm:p-2.5 text-white">?</h2>
          </div>
          <div className="text-6xl px-2.5 lg:px-0 pt-2.5 lg:pt-0 lg:pb-2.5 lg:pl-2.5 space-y-2.5">
               {answers.map((answer,i)=>(
                    <h2 key={i} className={cn("flex justify-center items-center transition-all text-white hover:bg-white cursor-pointer text-center w-full rounded-sm",MATH_OPTIONS[i])} onClick={()=>handleAnswerClick(answer)}>
                         <span>
                              {isNaN(answer) ? "∅" : Number.isInteger(answer) ? answer : answer.toFixed(2)}
                         </span>
                    </h2>
               ))}
               <Button variant="tertiary" className="w-full" shareUrl={absoluteURL("/games/math")}><Share2/> {buttonText("share")}</Button>
          </div>
     </div>
     <MessageBox type={msgType}/>
     </>
}