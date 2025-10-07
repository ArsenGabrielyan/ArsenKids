import { GRID_SIZE, TILE_COUNT } from "@/lib/constants/games";
import { getMatrixPosition, getVisualPosition } from "@/lib/helpers/puzzle.game";
import { absoluteCDN, cn } from "@/lib/utils";
import Image from "next/image";

interface SquareXOProps{
     val: string,
     handleSquareClick: () => void,
     disabled: boolean,
     isPatternEqual: boolean
}

const ticTacToeIcons: Record<"x" | "o",string> = {
     x: absoluteCDN("images","/tic-tac-toe/x.svg"),
     o: absoluteCDN("images","/tic-tac-toe/o.svg"),
}

export function SquareXO({val,handleSquareClick,disabled,isPatternEqual}: SquareXOProps){
     const iconSrc = val ? ticTacToeIcons[val.toLowerCase() as "x" | "o"] : "";
     return <div className={cn(
          "border border-blue-800 cursor-pointer flex justify-center items-center active:bg-rainbow-yellow",
          disabled && "select-none pointer-events-none",
          isPatternEqual ? "bg-rainbow-yellow" : "bg-rainbow-green"
     )} onClick={handleSquareClick}>
          {val !== "" && (
               <Image
                    src={iconSrc}
                    alt="tic-tac-toe"
                    width={70}
                    height={90}
                    className={cn(
                         "max-w-[50px] max-h-[50px]",
                         "sm:max-w-[65px] sm:max-h-[65px]",
                         "md:max-w-[90px] md:max-h-[90px]"
                    )}
               />
          )}
     </div>
}

interface PuzzleTileProps{
     index: number,
     tile: number,
     size: number,
     tileClick: () => void,
     checkIsSolved: boolean,
     imgSrc: string,
     boardSize: number,
     opt: { isStarted:boolean, showNum:boolean }
}

function calculateTileStyle(index: number, size: number){
     const {row,col}=getMatrixPosition(index);
     const visualPos=getVisualPosition(row,col,size,size);
     return {
          width: `calc(100% / ${GRID_SIZE})`,
          height: `calc(100% / ${GRID_SIZE})`,
          transform: `translate(${visualPos.x}px, ${visualPos.y}px)`,
     }
}

export function PuzzleTile({index,tile,size,tileClick,checkIsSolved,imgSrc,boardSize,opt}: PuzzleTileProps){
     const tileStyle= calculateTileStyle(index,size);
     const isHidden = tile===TILE_COUNT-1 && (opt.isStarted && !checkIsSolved)
     return (
          <li
               style={{
                    ...tileStyle,
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: `${boardSize}px`,
                    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * Math.floor(tile / GRID_SIZE)}%`,
               }}
               className={cn(
                    "absolute grid place-items-start text-2xl cursor-pointer",
                    (checkIsSolved || !opt.isStarted) && "select-none pointer-events-none",
                    isHidden ? "hidden" : "grid"
               )}
               onClick={tileClick}
          >
               {opt.showNum && (
                    <span className="p-[5px] text-[21px] rounded-br-[10px] bg-[#3C254D]/50 text-white font-heading">{tile+1}</span>
               )}
          </li>
     )
}