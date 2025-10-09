"use client"
import GameWrapper from "@/components/game-wrapper";
import { Spinner } from "@/components/shadcn-ui/spinner";
import { SnowmanMusicList, SnowmanSidebarItem, Snowman } from "@/components/snowman.game";
import { Button } from "@/components/ui/button";
import useAudio from "@/hooks/use-audio";
import { snowmanSidebarItems } from "@/lib/constants/snowman.game";
import { getBackgroundImage } from "@/lib/helpers";
import { ISnowman, ISnowmanItem, SnowmanType } from "@/lib/types";
import { absoluteURL, cn } from "@/lib/utils";
import { Download, MoreHorizontalIcon, Music, Pause, Play, Share2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import html2canvas from "html2canvas-pro"
import download from "downloadjs";
import { ScrollArea, ScrollBar } from "@/components/shadcn-ui/scroll-area";
import { ButtonGroup } from "@/components/shadcn-ui/button-group";

export default function GameBuildSnowman(){
     const [isStarted, setIsStarted] = useState(false);
     const [isChangingMusic, setIsChangingMusic] = useState(false);
     const [isPending, startTransition] = useTransition();
     const [snowMan, setSnowman] = useState<ISnowman>({eye: 0,nose: 0,mouth: 0,hat: 0,hand: 0,button: 0})
     const {togglePlayPause,isMusicOn,setMusic: changeMusic} = useAudio(isStarted);
     const snowmanRef = useRef<HTMLDivElement>(null)
     const handleNextItem = (arr: ISnowmanItem[], type: SnowmanType) => {
          const index = snowMan[type];
          setSnowman({...snowMan,[type]: (index+1)%arr.length})
     }
     const handlePrevItem = (arr: ISnowmanItem[], type: SnowmanType) => {
          const index = snowMan[type];
          setSnowman({...snowMan,[type]: (index-1+arr.length) % arr.length})
     }
     const handleDownload = () => {
          startTransition(async()=>{
               if(!snowmanRef.current) return;
               try{
                    const snowman = await html2canvas(snowmanRef.current,{backgroundColor: null});
                    const dataUrl = snowman.toDataURL("image/png");
                    download(dataUrl,`snowman-${Date.now()}`,"image/png");
                    toast.success("Պատրաստած ձնեմարդը ներբեռնվեց։ Շնորհավոր Ամանոր և Սուրբ Ծնունդ։")
               } catch (err: unknown) {
                    console.error(err);
                    toast.error("Ձնեմարդի ներբեռնումը չստացվեց: Խնդրում ենք փորձել ավելի ուշ:")
               }
          })
     }
     const bgStyle = getBackgroundImage("christmas");
     return (
          <section style={bgStyle} className="backdrop-blur-[5px] w-full">
               <div className="absolute inset-0 bg-linear-to-b from-transparent to-white opacity-70 -z-00"/>
               <div className="relative z-10 text-foreground flex justify-center items-center flex-col w-full">
                    <div className={cn("flex items-center flex-col min-h-screen relative w-full",isStarted ? "justify-between" : "justify-center p-4 md:p-5")}>
                         {!isStarted ? (
                              <GameWrapper title="Պատրաստիր ձնեմարդ">
                                   <div className="flex justify-center items-center flex-wrap gap-2.5">
                                        <Button className="flex-1" variant="tertiary" onClick={()=>setIsStarted(true)}>Սկսել</Button>
                                        <Button variant="outline" asChild className="flex-1">
                                             <Link href="/games/christmas">Վերադառնալ</Link>
                                        </Button>
                                   </div>
                              </GameWrapper>
                         ) : (
                              <>
                                   <ScrollArea className="bg-white shadow-lg w-full block lg:flex justify-center items-center flex-col p-2.5 lg:p-1.5 scroll-smooth">
                                        <div className="flex justify-center items-center min-w-32 gap-2.5">
                                             {snowmanSidebarItems.map((item,i)=>(
                                                  <SnowmanSidebarItem
                                                       key={i}
                                                       title={item.title}
                                                       type={item.type}
                                                       handleNext={handleNextItem}
                                                       handlePrev={handlePrevItem}
                                                       snowman={snowMan}
                                                  />
                                             ))}
                                        </div>
                                        <ScrollBar orientation="horizontal"/>
                                   </ScrollArea>
                                   <Snowman
                                        data={snowMan}
                                        snowmanRef={snowmanRef}
                                   />
                                   <div className="flex flex-col md:flex-row justify-center md:justify-between items-center flex-wrap gap-2.5 bg-background shadow-md w-full p-4">
                                        <div className="flex justify-center items-center gap-2.5 flex-wrap">
                                             <Button variant="tertiary" id="sidebar-btn" className="flex-1" onClick={handleDownload} disabled={isPending}>
                                                  {isPending ? <Spinner className="size-5"/> : <Download className="size-5"/>}
                                                  {isPending ? "Ներբեռնվում է․․․" : "Ներբեռնել"}
                                             </Button>
                                             <Button variant="tertiary" shareUrl={absoluteURL("/games/christmas/build-snowman")} size="iconMd" title="Կիսվել">
                                                  <Share2 className="size-5"/>
                                             </Button>
                                             <ButtonGroup>
                                                  <Button variant="tertiary" id="sidebar-btn" onClick={togglePlayPause} title={`${isMusicOn ? "Անջատել" : "Միացնել"} Երաժշտությունը`} size="iconMd">
                                                       {isMusicOn ? <Pause className="size-5"/> : <Play className="size-5"/>}
                                                  </Button>
                                                  {isMusicOn && (
                                                       <SnowmanMusicList isChangingMusic={isChangingMusic} setIsChangingMusic={setIsChangingMusic} onChangeMusic={changeMusic}>
                                                            <Button variant="outline" id="sidebar-btn" onClick={()=>setIsChangingMusic(true)} title="Փոխել Երաժշտությունը" size="iconMd">
                                                                 <MoreHorizontalIcon className="size-5"/>
                                                            </Button>
                                                       </SnowmanMusicList>
                                                  )}
                                             </ButtonGroup>
                                        </div>
                                        <Button variant="tertiary" id="sidebar-btn" onClick={()=>setIsStarted(false)}>
                                             Վերադառնալ
                                        </Button>
                                   </div>
                              </>
                         )}
                    </div>
               </div>
          </section>
     )
}