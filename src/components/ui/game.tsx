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