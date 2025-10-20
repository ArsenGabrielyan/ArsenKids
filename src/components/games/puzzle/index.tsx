"use client"
import GameWrapper from "@/components/game-wrapper"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { PuzzleTile } from "@/components/ui/game"
import { absoluteCDN, absoluteURL, playSound, preloadAudio } from "@/lib/utils"
import Link from "next/link"
import { RotateCcw, Share2 } from "lucide-react"
import { getBackgroundImage, getRandomMessage } from "@/lib/helpers"
import { useIsMobile } from "@/hooks/use-mobile"
import { GRID_SIZE, BOARD_SIZE } from "@/lib/constants/games"
import { AUDIO } from "@/lib/constants/maps"
import { INITIAL_PUZZLE_STATE } from "@/lib/constants/states"
import { isSolved, shuffle, canSwap, swap } from "@/lib/helpers/puzzle.game"
import { IPuzzleState } from "@/lib/types/states"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { ChristmasPuzzleLinks, PuzzleLinks } from "@/lib/types/enums"

interface PuzzleGameProps{
     title: string,
     shape: PuzzleLinks | ChristmasPuzzleLinks,
     christmas?: boolean
}
export default function PuzzleGame({title, shape, christmas}: PuzzleGameProps){
     const isMobile = useIsMobile("mobile");
     const [gameState, setGameState] = useState(INITIAL_PUZZLE_STATE);
     const t = useTranslations("puzzle");
     const buttonTxt = useTranslations("buttons");
     const gameMsg = useTranslations("game-messages");
     const validationMessages = useTranslations("validation");
     const updateState = (overrides: Partial<IPuzzleState>) =>
          setGameState(prev=>({...prev,...overrides}))
     const pieceSize = Math.round(gameState.boardSize/GRID_SIZE);
     const isSolvedPuzzle = isSolved(gameState.tiles);
     const shuffleTiles = () => {
          const prev = Object.assign({},gameState)
          updateState({
               tiles: shuffle(prev.tiles),
               randomWinText: getRandomMessage("correct",gameMsg)
          })
     }
     const swapTiles= (tileI: number) => {
          if(canSwap(tileI,gameState.tiles.indexOf(gameState.tiles.length-1))){
               const prev = Object.assign({},gameState)
               updateState({
                    tiles: swap(prev.tiles,tileI,prev.tiles.indexOf(prev.tiles.length-1))
               })
          }
     }
     const handleStart=()=>{
          shuffleTiles();
          updateState({isStarted:true})
     };
     const handleCheckChange = (checked: boolean) => updateState({showNum: checked})
     useEffect(()=>{
          if(isSolvedPuzzle && gameState.isStarted) playSound(AUDIO.sparkle,validationMessages("soundError"))
     },[gameState.isStarted,isSolvedPuzzle,validationMessages])
     useEffect(() => updateState({
          boardSize: isMobile ? 250 : BOARD_SIZE
     }),[shape, isMobile]);
     useEffect(()=>{
          preloadAudio(AUDIO)
     },[])
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
     const {isStarted, showNum, randomWinText, boardSize, tiles} = gameState
     return wrapper(
          <>
               <GameWrapper title={t(christmas ? "christmasTitle" : "title")}>
                    <h2 className="text-lg md:text-xl font-semibold text-blue-800 text-center">{title}</h2>
                    {isSolvedPuzzle && isStarted ? (
                         <h2 className="text-emerald-700 text-[27px] font-semibold">{randomWinText}</h2>
                    ) : (
                         <div className="flex items-center justify-center gap-3">
                              <Switch
                                   checked={showNum}
                                   onCheckedChange={handleCheckChange}
                                   isChristmas={christmas}
                              />
                              <p>{t("showNum")}</p>
                         </div>
                    )}
                    <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                         {!isStarted || (isSolvedPuzzle && isStarted) ? (
                              <Button className="flex-1" variant="tertiary" onClick={handleStart}>{buttonTxt("start")}</Button>
                         ) : (
                              <Button className="flex-1" variant="tertiary" onClick={shuffleTiles}>
                                   <RotateCcw/> {buttonTxt("restart")}
                              </Button>
                         )}
                         <Button variant="tertiary" title={buttonTxt("share")} size="iconMd" shareUrl={absoluteURL(`/games/puzzle/${shape}`)}>
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
                              checkIsSolved={isSolvedPuzzle && isStarted}
                              imgSrc={absoluteCDN("images",`/puzzle-card-bg/${shape}.jpg`)}
                              boardSize={boardSize}
                              opt={{isStarted, showNum}}
                         />
                    ))}
               </ul>
               <Button variant={christmas ? "tertiary" : "primary"} asChild>
                    <Link href={`/games/${christmas ? "christmas/" : ""}puzzle`}>{buttonTxt("goBack")}</Link>
               </Button>
          </>
     )
}