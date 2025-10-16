"use client"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { PAIRS_LINKS } from "@/lib/constants/links"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function MemoryGameMenu(){
     const t = useTranslations("memory");
     const buttonText = useTranslations("buttons")
     return (
          <div className="min-h-screen p-4 md:p-5 flex justify-center items-center flex-col gap-2.5 bg-linear-[135deg,var(--rainbow-red),var(--rainbow-orange),var(--rainbow-yellow),var(--rainbow-green),var(--rainbow-blue),var(--rainbow-purple)]" id="memory-game">
               <Link href="/games" title={buttonText("goBack")} aria-label="ArsenKids" className="logo">
                    <Logo src="/arsenkids-black.svg" width={250} height={60}/>
               </Link>
               <div className="w-full max-w-md bg-rainbow-blue/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-border/15 p-4 md:p-5 shadow-lg shadow-blue-900/35 space-y-3 text-center">
                    <h1 className="text-[40px] font-semibold mb-0">{t("title")}</h1>
                    <h2 className="text-lg font-semibold">{t("chooseTopic")}</h2>
                    <div className="flex flex-col gap-2.5">
                         {PAIRS_LINKS.map(item=>(
                              <Button key={item} variant="primary" asChild className="text-xs sm:text-sm md:text-base">
                                   <Link href={`/games/memory/${item}`}>{t(`pairs.${item}`)}</Link>
                              </Button>
                         ))}
                    </div> 
               </div>    
          </div>
     )
}