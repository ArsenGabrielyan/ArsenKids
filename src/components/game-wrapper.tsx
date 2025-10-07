"use client"
import Link from "next/link";
import Logo from "./logo";
import React from "react";
import { cn } from "@/lib/utils";

interface GameWrapperProps{
     children: React.ReactNode,
     title?: string,
     className?: string
}
export default function GameWrapper({children,title,className}: GameWrapperProps){
     return (
          <div className={cn("flex justify-center items-center flex-col gap-2.5 p-3 rounded-md shadow-lg border bg-card text-card-foreground font-heading relative",className)}>
               <Link href="/games" title="Վերադառնալ" aria-label="ArsenKids">
                    <Logo src="/arsenkids-black.svg" width={250} height={60}/>
               </Link>
               {!!title && (
                    <h1 className="text-lg md:text-[21px] font-semibold text-center">{title}</h1>
               )}
               {children}
          </div>
     )
}