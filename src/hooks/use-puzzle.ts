import { SUCCESS_WORDS, TILE_COUNT, BOARD_SIZE, GRID_SIZE } from "@/lib/constants/games";
import { AUDIO } from "@/lib/constants/maps";
import { isSolved, shuffle, canSwap, swap } from "@/lib/helpers/puzzle.game";
import { IPuzzleType } from "@/lib/types";
import { useState, useEffect } from "react";
import { useIsMobile } from "./use-mobile";

export default function usePuzzle(type: IPuzzleType){
     const isMobile = useIsMobile("mobile");
     const [rand,setRand] = useState(SUCCESS_WORDS[Math.floor(Math.random()*SUCCESS_WORDS.length)]);
     const [opt,setOpt] = useState({ isStarted:false, showNum:false })
     const [tiles,setTiles] = useState<number[]>(Array.from({length: TILE_COUNT},(_,i)=>i));
     const [boardSize,setBoardSize] = useState(BOARD_SIZE);
     const pieceSize = Math.round(boardSize/GRID_SIZE);
     const isSolvedPuzzle = isSolved(tiles);
     const shuffleTiles = () => {
          setRand(SUCCESS_WORDS[Math.floor(Math.random()*SUCCESS_WORDS.length)]);
          setTiles(shuffle(tiles));
     }
     const swapTiles= (tileI: number) => {
          if(canSwap(tileI,tiles.indexOf(tiles.length-1)))
               setTiles(swap(tiles,tileI,tiles.indexOf(tiles.length-1)))
     }
     const handleStart=()=>{
          shuffleTiles();
          setOpt({...opt,isStarted:true});
     };
     const handleCheckChange = (checked: boolean) => setOpt({...opt,showNum: checked})
     useEffect(()=>{
          const sparkle = new Audio(AUDIO.sparkle);
          if(isSolvedPuzzle && opt.isStarted) sparkle.play();
     },[opt,isSolvedPuzzle])
     useEffect(() => {
          setBoardSize(isMobile ? 250 : BOARD_SIZE)
     },[type, isMobile]);
     return {
          opt,
          isSolvedPuzzle,
          handleCheckChange,
          boardSize,
          tiles,
          pieceSize,
          swapTiles,
          rand,
          handleStart,
          shuffleTiles
     }
}