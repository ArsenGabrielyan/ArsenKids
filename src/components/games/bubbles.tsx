"use client"
import { BUBBLE_CREATION_INTERVAL } from "@/lib/constants/games";
import { AUDIO } from "@/lib/constants/maps";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
import GameWrapper from "../game-wrapper";
import { absoluteURL, cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

export default function BubblesGame(){
     const [isStarted, setIsStarted] = useState(false);
     const [bubblesPopped, setBubblesPopped] = useState(0);
     const bubblesRef = useRef<HTMLDivElement | null>(null);
     const createBubbleElement = useCallback(()=>{
          const bubble = document.createElement("div");
          const randomDeg = Math.floor(Math.random()*360)+1;
          const left = Math.abs(Math.floor(Math.random()*window.innerWidth)-150);
          const sizes = ["size-28", "size-32", "size-40", "size-36", "size-44", "size-48"]
          bubble.className = cn("absolute bottom-0 z-10 bg-[url('https://arsengabrielyan.github.io/ArsenKids/images/bubble.png')] bg-no-repeat bg-center bg-cover",sizes[Math.floor(Math.random()*sizes.length)]);
          bubble.style.left = `${left}px`
          bubble.style.filter = `hue-rotate(${randomDeg}deg)`
          return bubble
     },[])
     const popBubble = useCallback((elem: HTMLElement) => {
          elem.remove();
          setBubblesPopped(prev=>prev+1);
          new Audio(AUDIO.bubblePop).play()
     },[])
     const animateBubble = useCallback((bubble: HTMLElement) => {
          let pos = 0;
          const speed = Math.floor(Math.random()*6-3);
          const interval = setInterval(()=>{
               const windowHeight = window.innerHeight;
               if(pos>=windowHeight+150){
                    clearInterval(interval);
                    bubble.remove();
               } else {
                    pos++;
                    bubble.style.top = `${windowHeight-pos}px`
               }
          },Math.floor(bubblesPopped/10)+speed)
     },[bubblesPopped])
     const createBubble = useCallback(() => {
          const bubble = createBubbleElement();
          bubble.addEventListener("click",()=>popBubble(bubble))
          bubblesRef.current?.append(bubble)
          animateBubble(bubble);
     },[animateBubble,createBubbleElement,popBubble])
     useEffect(()=>{
          if(isStarted){
               const interval = setInterval(createBubble,BUBBLE_CREATION_INTERVAL);
               return () => clearInterval(interval);
          }
     },[isStarted,createBubble])
     const startGame = () => {
          setBubblesPopped(0);
          setIsStarted(true)
     }
     return (
          <div className="flex justify-center items-center flex-col min-h-screen bg-linear-to-tr from-blue-600 to-rainbow-blue overflow-hidden relative" ref={bubblesRef}>
               {!isStarted ? <GameWrapper title="Պղպջակներ">
                    <Button variant="tertiary" onClick={startGame}>Սկսել</Button>
               </GameWrapper> : <div className="fixed bottom-0 left-0 text-2xl p-3.5 z-20 w-full bg-card/90 text-card-foreground text-center flex justify-center items-center flex-col gap-2.5 font-heading">
                    <p>Դուք պայթեցրել եք {bubblesPopped} պղպջակ</p>
                    <div className="flex text-lg justify-center items-center gap-2 flex-wrap">
                         <Button variant="tertiary" className="flex-1" asChild>
                              <Link href="/games">Վերադառնալ</Link>
                         </Button>
                         <Button variant="tertiary" className="flex-1" shareUrl={absoluteURL("/bubbles")} size="iconMd"><Share2/></Button>
                    </div>
               </div>}
          </div>
     )
}