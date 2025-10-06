"use client"
import { GAME_MESSAGES, MESSAGE_CLASSNAMES } from "@/lib/constants/games";
import { GameMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface MessageBoxProps{
     type: GameMessageType
}
export const MessageBox = ({type}: MessageBoxProps) => {
     if(type==="") return null;
     const messages = GAME_MESSAGES[type]
     const messageClass = MESSAGE_CLASSNAMES[type];
     const message = messages[Math.floor(Math.random()*messages.length)]
     return (
          <div className={cn("p-5 fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center flex-col font-heading",messageClass)}>
               {type==="correct" ? <Check className="size-32"/> : <X className="size-32"/>}
               <p className="text-5xl font-bold">{message}</p>
          </div>
     )
}