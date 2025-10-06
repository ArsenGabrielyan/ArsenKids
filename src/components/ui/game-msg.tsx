"use client"
import { GAME_MESSAGES } from "@/lib/constants/games";
import { GameMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface MessageBoxProps{
     type: GameMessageType
}
export const MessageBox = ({type}: MessageBoxProps) => {
     if(type==="") return null;
     const msg = GAME_MESSAGES[type]
     const message = msg.messages[Math.floor(Math.random()*msg.messages.length)]
     return (
          <div className={cn("p-5 fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center flex-col font-heading",msg.className)}>
               {type==="correct" ? <Check className="size-32"/> : <X className="size-32"/>}
               <p className="text-3xl md:text-4xl lg:text-[40px] font-bold text-center">{message}</p>
          </div>
     )
}