"use client"
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function NotFoundContent(){
     const [pos,setPos] = useState({x:0,y:0});
     const changePos = (newX: number, newY: number) => setPos({x:-(newX/5),y:-(newY/5)})
     return (
          <section className="relative h-screen overflow-hidden flex justify-center items-center bg-linear-to-tl from-rainbow-green to-rainbow-blue">
               <div className="absolute top-[10%] left-[5%] md:left-[10%] right-[5%] md:right-[10%] bottom-[10%] rounded-xl flex justify-center items-center shadow-lg" style={{
                    background: "url(/backgrounds/p404.webp),#201c29",
                    backgroundPositionX: `${pos.x}px`,
                    backgroundPositionY: `${pos.y}px`
               }} onMouseMove={e=>changePos(e.clientX,e.clientY)}>
                    <div className="max-w-full md:max-w-[600px] text-center flex items-center justify-center flex-col px-2.5">
                         <div className="flex flex-col-reverse text-center items-center justify-center">
                              <h1 className="relative text-lg sm:text-xl lg:text-2xl text-black bg-white font-light py-2.5 px-5 inline-block w-fit mb-5 mt-1" style={{lineHeight: "1em"}}>Վայ, էջը չի գտնվել</h1>
                              <h2 className="text-7xl sm:text-8xl lg:text-[14em] text-white font-semibold" style={{lineHeight: "1em"}}>404</h2>
                         </div>
                         <p className="max-w-80 lg:max-w-full text-white text-base lg:text-xl font-heading">Այս էջը, որ փնտրում եք, չի գտնվել: Հնարավոր է սխալ մուտքագրել հասցեն, էջը տեղափոխվել է, կամ գոյություն չունի</p>
                         <Button asChild variant="secondary" className="text-xs sm:text-sm mt-5 w-full md:w-fit">
                              <Link href="/" aria-label="homepage">Վերադառնալ Գլխավոր էջ</Link>
                         </Button>
                    </div>
                    
               </div>
          </section>
     )
}