"use client"
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { PUZZLE_LINKS } from "@/lib/constants/links";
import { absoluteCDN } from "@/lib/utils";
import Logo from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PuzzleGameMenu(){
     const [search,setSearch] = useState("");
     const allLinks = useMemo(()=>PUZZLE_LINKS.filter(val=>val.title.toLowerCase().includes(search.toLowerCase())),[search])
     return (
          <section className="min-h-screen flex justify-start items-center flex-col p-4 relative bg-linear-to-tr from-rainbow-green to-rainbow-blue gap-2">
               <Link href="/games"  title="Վերադառնալ" aria-label="ArsenKids">
                    <Logo src="/arsenkids-black.svg" width={250} height={60}/>
               </Link>
               <div className="h-full w-full bg-rainbow-blue/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-border/15 p-4 md:p-5 shadow-lg shadow-blue-900/35 space-y-3 text-center">
                    <h1 className="text-[30px] md:text-[40px] font-semibold mb-0">Փազլ «Պատկերներ»</h1>
                    <h2 className="text-lg sm:text-xl md:text-2xl">Ընտրեք երկրաչափական մարմին</h2>
                    <div className="flex justify-center items-center gap-2">
                         <Input
                              placeholder="Որոնում․․․"
                              aria-label="search"
                              value={search}
                              onChange={(e)=>setSearch(e.target.value)}
                              className="bg-background"
                         />
                         {search!=="" && (
                              <Button variant="ghost" size="icon" onClick={()=>setSearch("")}>
                                   <X className="size-6"/>
                              </Button>
                         )}
                    </div>
                    <div className="flex justify-center items-center flex-wrap gap-3">
                         {allLinks.length > 0 ? allLinks.map((link,i)=><div className="w-full max-w-44 flex justify-center items-center flex-col gap-1.5" key={i}>
                              <Image
                                   src={absoluteCDN("images",`/shapes/${link.name}.webp`)}
                                   alt="shape"
                                   width={200}
                                   height={200}
                                   priority
                                   className="w-full h-full rounded-[10px_10px_0_0]"
                              />
                              <Button variant="primary" asChild className="w-full rounded-[0_0_10px_10px] text-base">
                                   <Link href={`/games/puzzle/${link.name}`}>{link.title}</Link>
                              </Button>
                         </div>) : <p className="text-xl text-gray-600 font-heading">Որոնման արդյունքներ չեն գտնվել:</p> }
                    </div> 
               </div> 
          </section>
     )
}