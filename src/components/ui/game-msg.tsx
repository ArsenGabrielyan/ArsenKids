"use client"
import { GAME_MESSAGE_STYLE } from "@/lib/constants/games";
import { getRandomMessage } from "@/lib/helpers";
import { GameMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface MessageBoxProps{
     type: GameMessageType
}
export const MessageBox = ({type}: MessageBoxProps) => {
     const t = useTranslations("game-messages");
     if(type==="") return null;
     const msgClassName = GAME_MESSAGE_STYLE[type]
     const message = getRandomMessage(type,t)
     return (
          <div className={cn("p-5 fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center flex-col font-heading",msgClassName)}>
               {type==="correct" ? <Check className="size-32"/> : <X className="size-32"/>}
               <p className="text-3xl md:text-4xl lg:text-[40px] text-center, font-medium">{message}</p>
          </div>
     )
}