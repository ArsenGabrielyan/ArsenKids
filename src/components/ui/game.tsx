import { GRID_SIZE, TILE_COUNT } from "@/lib/constants/games";
import { BACK_FACE_IMAGES } from "@/lib/constants/pairs.game";
import { getMatrixPosition, getVisualPosition } from "@/lib/helpers/puzzle.game";
import { IMemoryCard, TicTacToePlayer, TicTacToeBoard } from "@/lib/types";
import { absoluteCDN, cn } from "@/lib/utils";
import Image from "next/image";

interface SquareXOProps{
     val: TicTacToeBoard,
     handleSquareClick: () => void,
     disabled: boolean,
     isPatternEqual: boolean
}

const ticTacToeIcons: Record<Lowercase<TicTacToePlayer>,string> = {
     x: absoluteCDN("images","/tic-tac-toe/x.svg"),
     o: absoluteCDN("images","/tic-tac-toe/o.svg"),
}

export function SquareXO({val,handleSquareClick,disabled,isPatternEqual}: SquareXOProps){
     const iconSrc = val ? ticTacToeIcons[val.toLowerCase() as Lowercase<TicTacToePlayer>] : "";
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

interface MemoryCardProps{
     card: IMemoryCard,
     choice: (card: IMemoryCard) => void
     flipped: boolean,
     disabled: boolean,
     isChristmas?: boolean
}
export function MemoryCard({card,choice,flipped,disabled,isChristmas=false}: MemoryCardProps){
     const backfaceSrc = isChristmas ? BACK_FACE_IMAGES.christmas : BACK_FACE_IMAGES.default;
     const handleClick = () => {
          if(!disabled) choice(card)
     }
     return <div className={cn("w-[calc(32%_-_10px)] sm:w-[calc(25%_-_10px)] md:w-[calc(16.5%_-_10px)] aspect-square relative scale-[1] transform-3d transition-[transform] cursor-pointer shadow-md shadow-blue-900/35 active:scale[0.97]",flipped && "rotate-y-180")} key={card.id}>
          <Image width={110} height={110} className="w-full h-full p-3 absolute bg-rainbow-blue backface-hidden rotate-y-180" src={card.img} alt="Front" priority/>
          <Image width={110} height={110} className="w-full h-full p-3 absolute bg-rainbow-blue backface-hidden" src={backfaceSrc} alt="Back" onClick={handleClick} priority/>
     </div>
}