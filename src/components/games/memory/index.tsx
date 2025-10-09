"use client"
import GameWrapper from "@/components/game-wrapper";
import { Button } from "@/components/ui/button";
import { MemoryCard } from "@/components/ui/game";
import { AUDIO } from "@/lib/constants/maps";
import { pairsCards } from "@/lib/constants/pairs.game";
import { INITIAL_PAIRS_STATE } from "@/lib/constants/states";
import { IMemoryCard, MemoryCardParams } from "@/lib/types";
import { IMemoryGameState } from "@/lib/types/states";
import { playSound } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { absoluteURL, cn } from "@/lib/utils";
import { RotateCcw, Share2 } from "lucide-react";
import Link from "next/link";

interface MemoryGameProps{
     type: MemoryCardParams;
     title: string;
}
export default function MemoryGame({type, title}: MemoryGameProps){
     const [gameState, setGameState] = useState(INITIAL_PAIRS_STATE);
     const updateState = (overrides: Partial<IMemoryGameState>) =>
          setGameState(prev=>({...prev,...overrides}))
     const [cards,setCards] = useState<IMemoryCard[]>([]);
     const shuffle = ()=>{
          const pairCard = pairsCards[type];
          const shuffled: IMemoryCard[] = [...pairCard, ...pairCard].sort(()=>Math.random()-0.5).map(card=>({...card,id: Math.random()}))
          updateState({
               firstChoice: null,
               secondChoice: null,
               turns: 0,
               score: 0,
               isStarted: true
          })
          setCards(shuffled);
     }
     const handleChoice = (card: IMemoryCard) =>
          gameState.firstChoice ?
               updateState({secondChoice: card}) :
               updateState({firstChoice: card})
     const reset = useCallback(()=>updateState({
          firstChoice: null,
          secondChoice: null,
          disabled: false
     }),[])
     useEffect(() => {
          const audio = new Audio();
          if(gameState.firstChoice && gameState.secondChoice){
               updateState({disabled: true});
               if(gameState.firstChoice.img === gameState.secondChoice.img){
                    setCards(prev=>prev.map(card=>(card.img === gameState.firstChoice?.img ? ({...card, matched: true}): card) as IMemoryCard))
                    setGameState(prev=>({
                         ...prev,
                         turns: prev.turns+1,
                         score: prev.score+1
                    }))
                    playSound(audio, AUDIO.correct);
                    reset();
               } else {
                    playSound(audio, AUDIO.wrong);
                    setTimeout(()=>{
                         setGameState(prev=>({
                              ...prev,
                              turns: prev.turns+1,
                         }))
                         reset();
                    },1000)
               }
          }
     },[gameState.firstChoice, gameState.secondChoice, reset]);
     useEffect(()=>{
          Object.values(AUDIO).forEach(src => new Audio(src).load());
     },[])
     const {score,turns,isStarted,disabled,firstChoice,secondChoice} = gameState
     return (
          <div className={cn("grid place-items-center relative p-4 md:p-5 gap-2 min-h-screen bg-linear-to-tr from-rainbow-green",isStarted ? "grid-cols-1 md:grid-cols-[1fr_2fr]" : "grid-cols-1",type==="christmas" ? "to-destructive/70" : "to-rainbow-blue")}>
               <GameWrapper title="Զույգեր" className="w-full max-w-lg">
                    <h2 className="text-lg font-semibold text-blue-800 text-center">Թեմա՝ {title}</h2>
                    {!isStarted ? (
                         <Button onClick={shuffle}>
                              Սկսել
                         </Button>
                    ) : (
                         <>
                         <div className="flex flex-col md:flex-row justify-between items-center text-2xl w-full gap-2">
                              <span>Միավոր՝ {score}</span>
                              <span>Պտույտներ՝ {turns}</span>
                         </div>
                         <span className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                              <div className="flex items-center gap-2">
                                   <Button title="Վերսկսել" variant="outline" size="iconMd" onClick={shuffle}>
                                        <RotateCcw className="size-6"/>
                                   </Button>
                                   <Button title="Կիսվել" variant="outline" size="iconMd" shareUrl={absoluteURL(`/games/memory/${type}`)}>
                                        <Share2 className="size-6"/>
                                   </Button>
                              </div>
                              <Button variant="tertiary" asChild>
                                   <Link href={type==="christmas" ? "/games/christmas" : "/games/memory"}>Վերադառնալ</Link>
                              </Button>
                         </span>
                        </> 
                    )}
               </GameWrapper>
               {isStarted && (
                    <section className="w-full max-w-4xl flex flex-wrap justify-center items-center perspective-[1000px] gap-[5px]">
                         {cards.map(card=>(
                              <MemoryCard
                                   key={card.id}
                                   card={card}
                                   choice={handleChoice}
                                   flipped={
                                        card === firstChoice ||
                                        card === secondChoice ||
                                        card.matched
                                   }
                                   disabled={disabled}
                                   isChristmas={type==="christmas"}
                              />
                         ))}
                    </section>
               )}
          </div>
     )
}