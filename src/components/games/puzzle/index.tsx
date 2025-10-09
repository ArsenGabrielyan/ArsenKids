"use client"
import GameWrapper from "@/components/game-wrapper"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { PuzzleTile } from "@/components/ui/game"
import usePuzzle from "@/hooks/use-puzzle"
import { absoluteCDN, absoluteURL } from "@/lib/utils"
import Link from "next/link"
import { RotateCcw, Share2 } from "lucide-react"
import { getBackgroundImage } from "@/lib/helpers"

interface PuzzleGameProps{
     title: string,
     shape: string,
     christmas?: boolean
}
export default function PuzzleGame({title, shape, christmas}: PuzzleGameProps){
     const {isSolvedPuzzle,opt,handleCheckChange,boardSize,tiles,pieceSize,swapTiles,rand,handleStart,shuffleTiles} = usePuzzle({
          txt: title,
          img: shape
     })
     const bgStyle = getBackgroundImage("christmas");
     const wrapper = (elem: React.JSX.Element) => christmas ? (
          <section style={bgStyle}>
               <div className="absolute inset-0 bg-linear-to-b from-transparent to-white to-70% opacity-70 -z-00"/>
               <div className="relative z-10 text-foreground flex justify-center items-center flex-col min-h-screen gap-4 p-4 md:p-5">
                    {elem}
               </div>
          </section>
     ) : (
          <section className="flex justify-center items-center flex-col min-h-screen gap-4 p-4 md:p-5 bg-rainbow-blue">
               {elem}
          </section>
     )
     return wrapper(
          <>
               <GameWrapper title={`Փազլ «${christmas ? "Ամանոր" : "Պատկերներ"}»`}>
                    <h2 className="text-lg md:text-xl font-semibold text-blue-800 text-center">{title}</h2>
                    {isSolvedPuzzle && opt.isStarted ? (
                         <h2 className="text-emerald-700 text-[27px] font-semibold">{rand}</h2>
                    ) : (
                         <div className="flex items-center justify-center gap-3">
                              <Switch
                                   checked={opt.showNum}
                                   onCheckedChange={handleCheckChange}
                                   isChristmas={christmas}
                              />
                              <p>Ցույց տալ թվերը</p>
                         </div>
                    )}
                    <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                         {!opt.isStarted || (isSolvedPuzzle && opt.isStarted) ? (
                              <Button className="flex-1" variant="tertiary" onClick={handleStart}>Սկսել</Button>
                         ) : (
                              <Button className="flex-1" variant="tertiary" onClick={shuffleTiles}>
                                   <RotateCcw/> Վերսկսել
                              </Button>
                         )}
                         <Button variant="tertiary" title="Կիսվել" size="iconMd" shareUrl={absoluteURL(`/games/puzzle/${shape}`)}>
                              <Share2 className="size-6"/>
                         </Button>
                    </div>
               </GameWrapper>
               <ul style={{maxWidth:`${boardSize}px`,height:`${boardSize}px`}} className="relative p-0 flex w-full">
                    {tiles.map((t,i)=>(
                         <PuzzleTile
                              key={`tile-${i}`}
                              index={i}
                              tile={t}
                              size={pieceSize}
                              tileClick={()=>swapTiles(i)}
                              checkIsSolved={isSolvedPuzzle && opt.isStarted}
                              imgSrc={absoluteCDN("images",`/puzzle-card-bg/${shape}.jpg`)}
                              boardSize={boardSize}
                              opt={opt}
                         />
                    ))}
               </ul>
               <Button variant={christmas ? "tertiary" : "primary"} asChild>
                    <Link href={`/games/${christmas ? "christmas/" : ""}puzzle`}>Վերադառնալ</Link>
               </Button>
          </>
     )
}