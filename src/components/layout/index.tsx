"use client"
import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

interface PageLayoutProps{
     children: React.ReactNode
}
export default function PageLayout({children}: PageLayoutProps){
     const [scrollBtnExists, showScrollBtn] = useState(false);
     useEffect(() => {
          const onScroll = () => showScrollBtn(window.scrollY > 100)
          window.addEventListener("scroll", onScroll)
          return () => window.removeEventListener("scroll", onScroll)
     }, [])
     return (
          <>
               <Header/>
               {children}
               <Footer/>
               <Button variant="tertiary" onClick={()=>window.scrollTo({ top:0, left:0, behavior:"smooth" })} size="icon" className={cn("transition-all fixed right-5 z-10",scrollBtnExists ? "bottom-10 visible" : "bottom-0 invisible opacity-0")} title="Scroll to top">
                    <ChevronUp className="size-6"/>
               </Button>
          </>
     )
}