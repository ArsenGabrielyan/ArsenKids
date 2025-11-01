"use client"
import { DIFFICULTIES } from "@/lib/constants/games";
import { AUDIO } from "@/lib/constants/maps";
import { INITIAL_GUESS_NUMBER_STATE } from "@/lib/constants/states";
import { GameDifficulty } from "@/lib/types";
import { IGuessNumberState } from "@/lib/types/states";
import { absoluteURL, cn, playSound, preloadAudio } from "@/lib/utils";
import { useState, useCallback, useEffect } from "react";
import { MessageBox } from "../ui/game-msg";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { NumberGuesserType } from "@/schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getNumberGuesserSchema } from "@/schemas";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../shadcn-ui/form";
import GameWrapper from "../game-wrapper";
import { Input } from "../ui/input";
import { Menu, RotateCcw, Share2 } from "lucide-react";
import { generateRandomNumber, getDifficultyLength } from "@/lib/helpers/guesser.game";
import { useTranslations } from "next-intl";

export default function GuessNumber(){
     const [gameState, setGameState] = useState<IGuessNumberState>(INITIAL_GUESS_NUMBER_STATE)
     const validationMessages = useTranslations("validation");
     const t = useTranslations("guess-number");
     const buttonText = useTranslations("buttons");
     const diffTxt = useTranslations("difficulties")
     const updateState = (overrides: Partial<IGuessNumberState>) => 
          setGameState(prev=>({...prev,...overrides}));
     const form = useForm<NumberGuesserType>({
          resolver: zodResolver(getNumberGuesserSchema(validationMessages)),
          defaultValues: {guess: ""}
     })
     const startGame = useCallback((diff: GameDifficulty) =>{
          const len = getDifficultyLength(diff);
          updateState({
               ...INITIAL_GUESS_NUMBER_STATE,
               num: generateRandomNumber(len),
               difficulty: diff,
               timeLeft: 6,
               isStarted: true
          })
     },[])
     const handleEnter = (values: NumberGuesserType) =>{
          const validatedFields = getNumberGuesserSchema(validationMessages).safeParse(values);
          if(!validatedFields.success){
               toast.error(validationMessages("invalidField"));
               return;
          }
          if(!validatedFields.data || Number.isNaN(validatedFields.data.guess)) return;
          const {guess} = validatedFields.data
          const isCorrect = guess===gameState.num;
          updateState({msgType: isCorrect ? "correct" : "wrong"})
          playSound(isCorrect ? AUDIO.correct : AUDIO.wrong,validationMessages("soundError"))
     }
     const goBackToMenu = () => updateState({...INITIAL_GUESS_NUMBER_STATE, isStarted: true});
     useEffect(()=>{
          if(!gameState.timeLeft) return;
          const timer = setInterval(()=>{
               const prev = Object.assign({},gameState)
               if(gameState.timeLeft! > 1) {
                    playSound(AUDIO.tick,validationMessages("soundError"))
                    updateState({
                         timeLeft:prev.timeLeft && prev.timeLeft-1,
                         timerCount:prev.timerCount-1,
                         showSquare:false,
                         showNum:true
                    })
               } else {
                    clearInterval(timer);
                    playSound(AUDIO.start,validationMessages("soundError"))
                    updateState({
                         timeLeft:null,
                         timerCount:0,
                         showSquare:true,
                         showNum:false
                    })
                    form.reset()
               }
          },1000);
          return ()=>clearInterval(timer);
     },[gameState,form,validationMessages])
     useEffect(()=>{
          if(gameState.msgType!==""){
               const timer = setTimeout(()=>startGame(gameState.difficulty),800);
               return () => clearTimeout(timer);
          }
     },[gameState.difficulty, gameState.msgType, startGame]);
     useEffect(()=>{
          preloadAudio(AUDIO,"correct","wrong","tick","start")
     },[])
     const numInput = form.watch("guess")
     const {isStarted,difficulty,showNum,showSquare,timeLeft,timerCount,num,msgType} = gameState
     return (
          <div className="min-h-screen flex justify-center items-center bg-linear-to-tr from-rainbow-red via-rainbow-orange to-rainbow-yellow text-center p-4 md:p-5">
               <GameWrapper title={t("title")}>
                    {!isStarted ? <Button onClick={()=>updateState({isStarted:true})}>{buttonText("start")}</Button> : difficulty==="" ? <>
                         <p>{diffTxt("title")}</p>
                         <div className="flex justify-center items-center flex-col w-full gap-2">{DIFFICULTIES.map((btn,i)=>btn.name!=="" && (
                              <Button
                                   key={i}
                                   variant="tertiary"
                                   onClick={()=>startGame(btn.name)}
                                   className="w-full"
                              >
                                   {diffTxt(btn.name)}
                              </Button>
                         ))}</div>
                    </>:<>
                         {showNum && (
                              <span className={cn("absolute -top-20 text-6xl h-fit px-4 pt-2 bg-card text-card-foreground border rounded-xl shadow-md",timeLeft && timeLeft>=4 ? "text-blue-800" : "text-destructive")}>{timerCount}</span>
                         )}
                         {showSquare ? <>
                              <div className="w-full h-full flex justify-center items-center gap-1 flex-wrap">
                                   {num.split("").map((el,i)=>(
                                        <span
                                             key={`${el}_${i}`}
                                             className="bg-[#3C254D]/70 size-12 text-white flex justify-center items-center text-3xl rounded-sm"
                                        >
                                             {(numInput ? numInput.toString() : "")[i]}
                                        </span>
                                   ))}
                              </div>
                              <Form {...form}>
                                   <form className="w-full flex justify-center items-center flex-col gap-2.5" onSubmit={form.handleSubmit(handleEnter)}>
                                        <FormField
                                             control={form.control}
                                             name="guess"
                                             render={({field})=>(
                                                  <FormItem>
                                                       <FormControl>
                                                            <Input
                                                                 type="number"
                                                                 variant="guesser"
                                                                 {...field}
                                                                 autoFocus
                                                                 minLength={gameState.num.length}
                                                            />
                                                       </FormControl>
                                                       <FormMessage/>
                                                  </FormItem>
                                             )}
                                        />
                                        <div className="flex items-center justify-center flex-col gap-2 w-full">
                                             <Button className="w-full" variant="tertiary" type="submit">{buttonText("check")}</Button>
                                             <div className="flex justify-center items-center gap-2 flex-wrap w-full">
                                                  <Button className="flex-1" variant="outline" title={buttonText("restart")} type="button" onClick={()=>startGame(gameState.difficulty)}><RotateCcw className="size-6"/></Button>
                                                  <Button className="flex-1" variant="outline" title={buttonText("backToMenu")} type="button" onClick={goBackToMenu}><Menu className="size-6"/></Button>
                                                  <Button className="flex-1" variant="outline" title={buttonText("share")} type="button" shareUrl={absoluteURL("/games/guess-number")}><Share2/></Button>
                                             </div>
                                        </div>
                                   </form>
                              </Form>
                         </> : <span className="tracking-[1.5px] text-6xl text-blue-500 mt-3">{num}</span>}
                    </>}
               </GameWrapper>
               <MessageBox type={msgType}/>
          </div>
     )
}