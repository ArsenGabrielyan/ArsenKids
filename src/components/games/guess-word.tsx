"use client"
import { DIFFICULTIES } from "@/lib/constants/games";
import { AUDIO } from "@/lib/constants/maps";
import { INITIAL_GUESS_WORD_STATE } from "@/lib/constants/states";
import { GameDifficulty } from "@/lib/types";
import { IGuessWordState } from "@/lib/types/states";
import { useState, useEffect, useCallback } from "react";
import { MessageBox } from "../ui/game-msg";
import { getWords, makeScrambled } from "@/lib/helpers";
import { Lightbulb, RotateCcw, Share2 } from "lucide-react";
import { absoluteURL, cn } from "@/lib/utils";
import { Button } from "../ui/button";
import GameWrapper from "../game-wrapper";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { WordGuesserType } from "@/schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { WordGuesserSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../shadcn-ui/form";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

export default function GuessWordGame(){
     const [gameState,setGameState] = useState<IGuessWordState>(INITIAL_GUESS_WORD_STATE);
     const updateState = (overrides: Partial<IGuessWordState>) => 
          setGameState(prev=>({...prev,...overrides}));
     const form = useForm<WordGuesserType>({
          resolver: zodResolver(WordGuesserSchema),
          defaultValues: {guess: ""}
     })
     const handleEnter = (values: WordGuesserType) => {
          const validatedFields = WordGuesserSchema.safeParse(values);
          if(!validatedFields.success){
               toast.error("Դաշտը վավերացված չէ");
               return;
          }
          if(!validatedFields.data || validatedFields.data.guess==="") return;
          const {guess} = validatedFields.data
          const isCorrect = gameState.correct.toLowerCase() === guess.toLowerCase();
          new Audio(isCorrect ? AUDIO.correct : AUDIO.wrong).play();
          if(isCorrect) form.reset()
          const prev = Object.assign({},gameState)
          updateState({
               msgType: isCorrect ? "correct" : "wrong",
               correctCount: isCorrect && prev.hintCount <= 2 ? prev.correctCount + 1 : prev.correctCount
          })
     }
     const start = useCallback((difficulty: GameDifficulty)=>{
          const words = getWords(difficulty)
          const word = words[Math.floor(Math.random()*words.length)];
          if(gameState.correctCount===10) new Audio(AUDIO.start).play();
          const prev = Object.assign({}, gameState)
          updateState({
               msgType: "",
               isPlay: true,difficulty,
               correct: word.toLowerCase(),
               scrambled: makeScrambled(word),
               correctCount: prev.correctCount===10 ? 0 : prev.correctCount,
               hintCount: prev.correctCount===10 ? prev.hintCount+1 : prev.hintCount
          })
          form.reset();
     },[gameState,form])
     const getHint = ()=>{
          if(gameState.hintCount<=0) return;
          new Audio(AUDIO.sparkle).play();
          const prev = Object.assign({}, gameState)
          updateState({
               showHint:true,
               hintCount: prev.hintCount-1
          })
          setTimeout(()=>updateState({
               showHint:false
          }),1000);
     }
     const returnToMainMenu = () => updateState({
          difficulty:"",
          correctCount:0,
          hintCount:3
     })
     useEffect(()=>{
          if(gameState.msgType){
               const timer = setTimeout(()=>{
                    if(gameState.msgType==="correct") start(gameState.difficulty);
                    updateState({msgType: ""})
               },800);
               return () => clearTimeout(timer)
          }
     },[gameState.difficulty, gameState.msgType, start])
     const val = form.watch("guess")
     const {isPlay,difficulty,correct,hintCount,showHint,msgType,scrambled} = gameState
     return (
          <>
          <div className="flex justify-center items-center flex-col min-h-screen bg-rainbow-yellow p-2.5">
               <GameWrapper title="Գուշակիր բառը">
                    {isPlay && (
                         difficulty!=="" ? (
                              <>
                                   <div className="w-full h-full flex justify-center items-center gap-1 flex-wrap">
                                        {correct.split("").map((el,i)=>(
                                             <span
                                                  key={`${el}_${i}`} className="bg-[#3C254D]/70 size-10 text-white flex justify-center items-center text-2xl rounded-sm"
                                             >{val[i]}</span>
                                        ))}
                                   </div>
                                   <p className="text-2xl tracking-[5px]">{scrambled}</p>
                                   {showHint && (
                                        <p className="text-3xl absolute -top-18 bg-card shadow-md border rounded-md p-3 text-blue-600">{correct}</p>
                                   )}
                                   <Form {...form}>
                                        <form onSubmit={form.handleSubmit(handleEnter)} className="flex items-center justify-between gap-3 w-full flex-col md:flex-row">
                                             <FormField
                                                  control={form.control}
                                                  name="guess"
                                                  render={({field})=>(
                                                       <FormItem className="w-full md:w-fit">
                                                            <FormControl>
                                                                 <Input
                                                                      variant="guesser"
                                                                      {...field}
                                                                      autoFocus
                                                                      className="w-full md:w-fit"
                                                                      onChange={e=>{
                                                                           const regex = /[\u0561-\u0587\u0531-\u0556]+/;
                                                                           if(e.target.value==="" || regex.test(e.target.value))
                                                                                field.onChange(e)
                                                                      }}
                                                                      maxLength={correct.split("").length}
                                                                 />
                                                            </FormControl>
                                                            <FormMessage/>
                                                       </FormItem>
                                                  )}
                                             />
                                             <Button variant="primaryAlt" className="w-full md:w-fit" type="submit" size="sm">Ստուգել</Button>
                                        </form>
                                   </Form>
                              </>
                         ) : <>
                              <p>Ընտրել բարդությունը</p>
                              <div className="flex justify-center items-center flex-col w-full gap-2">
                                   {DIFFICULTIES.map(btn=>(
                                        <Button
                                             key={btn.id}
                                             variant="tertiary"
                                             className="w-full"
                                             onClick={()=>start(btn.name)}
                                        >
                                             {btn.title}
                                        </Button>
                                   ))}
                              </div>
                         </>
                    )}
                    {(isPlay && difficulty!=="") && (
                         <>
                              <div className="flex items-center justify-between gap-2 w-full">
                                   <div className={cn("flex items-center gap-3",difficulty!=="easy" && "mt-2")}>
                                        {difficulty==="easy" ? (
                                             <Button
                                                  variant="tertiary"
                                                  className="w-full"
                                                  onClick={()=>start(difficulty)}
                                             >
                                                  <RotateCcw className="size-6"/>
                                                  Վերսկսել
                                             </Button>
                                        ) : (
                                             <>
                                                  <div className={cn("relative w-full",hintCount<=0 && "select-none pointer-events-none opacity-50")}>
                                                       <Badge className="absolute -top-3 -right-2 z-10" variant="defaultOutline">{hintCount}</Badge>
                                                       <Button
                                                            title="Հուշում"
                                                            variant="outline"
                                                            onClick={getHint}
                                                            size="iconLg"
                                                       >
                                                            <Lightbulb className="size-6"/>
                                                       </Button>
                                                  </div>
                                                  <Button
                                                       variant="tertiary"
                                                       title="Վերսկսել"
                                                       size="iconLg"
                                                       onClick={()=>start(difficulty)}
                                                  >
                                                       <RotateCcw className="size-6"/>
                                                  </Button>
                                             </>
                                        )}
                                   </div>
                                   <Button
                                        shareUrl={absoluteURL("/guess-word")}
                                        title="Կիսվել"
                                        variant="tertiary"
                                        size="iconMd"
                                   >
                                        <Share2/>
                                   </Button>
                              </div>
                              <Button
                                   type="button"
                                   className="w-full"
                                   onClick={returnToMainMenu}
                              >Վերադառնալ</Button>
                         </>
                    )}
                    {!isPlay && (
                         <Button
                              type="button"
                              className="w-full"
                              onClick={()=>updateState({isPlay: true})}
                         >Սկսել</Button>
                    )}
               </GameWrapper>
          </div>
          <MessageBox type={msgType} />
          </>
     )
}