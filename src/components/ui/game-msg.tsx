"use client"
import { Message, MESSAGE_CLASSNAMES } from "@/lib/constants/maps";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface MessageBoxProps{
     message: string,
}
export const MessageBox = ({message}: MessageBoxProps) => {
     const styleType = message === Message.Correct ? "correct" : "wrong";
     const messageClass = MESSAGE_CLASSNAMES[styleType];
     return !!message ? (
          <div className={cn("p-5 fixed top-0 left-0 w-full h-full flex justify-center items-center flex-col font-heading",messageClass)}>
               {styleType==="correct" ? <Check className="size-32"/> : <X className="size-32"/>}
               <p className="text-5xl font-bold">{message}</p>
          </div>
     ) : null
}