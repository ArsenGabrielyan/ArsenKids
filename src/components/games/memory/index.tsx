"use client"
import GameWrapper from "@/components/game-wrapper";
import { Button } from "@/components/ui/button";
import { MemoryCard } from "@/components/ui/game";
import useMemoryGame from "@/hooks/use-memory-game"
import { MemoryCardParams } from "@/lib/types";
import { absoluteURL, cn } from "@/lib/utils";
import { RotateCcw, Share2 } from "lucide-react";
import Link from "next/link";

interface MemoryGameProps{
     type: MemoryCardParams;
     title: string;
}
export default function MemoryGame({type, title}: MemoryGameProps){
     const {shuffle,handleChoice,cards,gameState} = useMemoryGame(type)
     const {score,turns,isStarted,disabled,firstChoice,secondChoice} = gameState
     return (
          <div className={cn("grid place-items-center relative bg-linear-to-tr from-rainbow-green to-rainbow-blue p-5 gap-2 min-h-screen",isStarted ? "grid-cols-1 md:grid-cols-[1fr_2fr]" : "grid-cols-1")}>
               <GameWrapper title="Զույգեր" className="w-full max-w-lg">
                    <h2 className="text-lg font-semibold text-blue-800">Թեմա՝ {title}</h2>
                    {!isStarted ? (
                         <Button onClick={shuffle}>
                              Սկսել
                         </Button>
                    ) : (
                         <>
                         <div className="flex justify-between items-center text-2xl w-full gap-2">
                              <span>Միավոր՝ {score}</span>
                              <span>Պտույտներ՝ {turns}</span>
                         </div>
                         <span className="flex justify-between items-center w-full gap-2">
                              <div className="flex items-center gap-2">
                                   <Button title="Վերսկսել" variant="outline" size="iconMd" onClick={shuffle}>
                                        <RotateCcw className="size-6"/>
                                   </Button>
                                   <Button title="Կիսվել" variant="outline" size="iconMd" shareUrl={absoluteURL(`/games/memory/${type}`)}>
                                        <Share2 className="size-6"/>
                                   </Button>
                              </div>
                              <Button variant="tertiary" asChild>
                                   <Link href="/games/memory">Վերադառնալ</Link>
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
                              />
                         ))}
                    </section>
               )}
          </div>
     )
}