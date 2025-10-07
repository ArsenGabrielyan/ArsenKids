"use client"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { PAIRS_LINKS } from "@/lib/constants/links"
import Link from "next/link"

export default function MemoryGameMenu(){
     return (
          <div className="min-h-screen p-4 md:p-5 flex justify-center items-center flex-col gap-2.5 bg-linear-[135deg,var(--rainbow-red),var(--rainbow-orange),var(--rainbow-yellow),var(--rainbow-green),var(--rainbow-blue),var(--rainbow-purple)]" id="memory-game">
               <Link href="/games" title="Վերադառնալ" aria-label="ArsenKids" className="logo">
                    <Logo src="/arsenkids-black.svg" width={250} height={60}/>
               </Link>
               <div className="w-full max-w-sm bg-rainbow-blue/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-border/15 p-4 md:p-5 shadow-lg shadow-blue-900/35 space-y-3 text-center">
                    <h1 className="text-[40px] font-semibold mb-0">Զույգեր</h1>
                    <h2 className="text-lg font-semibold">Ընտրեք թեմա</h2>
                    <div className="flex flex-col gap-2.5">
                         {PAIRS_LINKS.map(item=>(
                              <Button key={item.name} variant="primary" asChild className="text-xs sm:text-sm md:text-base">
                                   <Link href={`/games/memory/${item.name}`}>{item.title}</Link>
                              </Button>
                         ))}
                    </div> 
               </div>    
          </div>
     )
}