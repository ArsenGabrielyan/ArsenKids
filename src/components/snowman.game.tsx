import { CHRISTMAS_MUSIC } from "@/lib/constants/maps";
import { getSnowmanItems } from "@/lib/helpers";
import { ISnowmanItem, SnowmanType, SnowmanItemsType } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { absoluteCDN, cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./shadcn-ui/drawer";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./shadcn-ui/dialog";
import { useTranslations } from "next-intl";
import { SnowmanItems } from "@/lib/types/enums";

interface SnowmanSidebarItemProps{
     handlePrev: (arr: ISnowmanItem[],type:SnowmanItems) => void;
     handleNext: (arr: ISnowmanItem[],type:SnowmanItems) => void;
     snowman: SnowmanType,
     type: SnowmanItems,
     title: string
}
   
export function SnowmanSidebarItem({handlePrev,handleNext,snowman,type,title}: SnowmanSidebarItemProps){
     const items = getSnowmanItems(type);
     const isTablet = useIsMobile();
     const btnSize = isTablet ? "icon" : "iconMd"
     return (
          <div className="flex justify-center items-center flex-col my-2.5 gap-2.5 min-w-40">
               <h3>{title}</h3>
               <div className="grid grid-cols-3 place-items-center gap-4">
                    <Button variant="tertiary" size={btnSize} onClick={()=>handlePrev(items,type)}>
                         <ChevronLeft className="size-6"/>
                    </Button>
                    {items.map((val,i)=>i===snowman[type] && (
                         <div key={i} className="flex justify-center items-center size-[70px]">
                         {val.name!=="" && (
                              <Image
                                   width={85}
                                   height={85}
                                   src={absoluteCDN("images",`/snowman/${val.name}.png`)}
                                   alt={val.type}
                                   className="object-contain aspect-square"   
                              />
                         )}
                    </div>
                    ))}
                    <Button variant="tertiary" size={btnSize} onClick={()=>handleNext(items,type)}>
                         <ChevronRight className="size-6"/>
                    </Button>
               </div>
          </div>
     )
}

interface SnowmanProps{
     data: SnowmanType,
     snowmanRef?: React.Ref<HTMLDivElement>
}
export function Snowman({data, snowmanRef}: SnowmanProps){
     const snowman: Record<SnowmanItemsType,ISnowmanItem[]> = {
          eyes: getSnowmanItems("eye" as SnowmanItems),
          noses: getSnowmanItems("nose" as SnowmanItems),
          mouths: getSnowmanItems("mouth" as SnowmanItems),
          hats: getSnowmanItems("hat" as SnowmanItems),
          hands: getSnowmanItems("hand" as SnowmanItems),
          buttons: getSnowmanItems("button" as SnowmanItems),
     }
     const renderItem = (type: SnowmanItemsType, index: number, className: string, height: number, width: number, style?: React.CSSProperties) => {
          if (index === 0) return null;
          const item = snowman[type][index];
          return item ? (
               <Image
                    src={absoluteCDN("images",`/snowman/${item.name}.png`)}
                    alt={type}
                    className={cn("object-contain",className)}
                    width={width}
                    height={height}
                    crossOrigin="anonymous"
                    style={style}
               />
          ) : null
     };
     const hatStyle = {
          marginRight: snowman.hats[data.hat]?.name === "santa" || snowman.hats[data.hat]?.name === "elf" ? "25px" : "0"
     };
     return <div className="bg-transparent w-full max-w-lg my-[15] lg:my-5 flex justify-center items-center flex-col" ref={snowmanRef}>
          {renderItem("hats", data.hat, "-mb-[15px] z-30 object-contain", 100, 100, hatStyle)}
          <div className="bg-white border-2 border-gray-300 rounded-full relative -mb-[15px] size-[100px] z-20">
               {renderItem("eyes", data.eye, "absolute left-1/2 -translate-x-1/2 top-[15px]", 24,85)}
               {renderItem("noses", data.nose, "absolute left-1/2 -translate-x-1/2 top-1/2", 12,35)}
               {renderItem("mouths", data.mouth, "absolute left-1/2 -translate-x-1/2 bottom-2.5", 20,66)}
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-full relative -mb-[15px] size-[150px] z-10">
               {data.hand !== 0 && (
                    <div className="relative">
                         {renderItem("hands", data.hand, "absolute top-[50px] -left-[75px] sm:-left-[90px] md:-left-[100px]", 25,110,{
                              transform: "rotate(166deg)"
                         })}
                         {renderItem("hands", data.hand, "absolute top-[50px] -right-[75px] sm:-right-[90px] md:-right-[100px]", 25,110,{
                              transform: "scaleX(-1) rotate(166deg)"
                         })}
                    </div>
               )}
               {renderItem("buttons", data.button, "absolute top-1/2 left-1/2 -translate-1/2", 90,27)}
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-full relative big size-[200px]"></div>
     </div>
}

interface SnowmanMusicListProps{
     setIsChangingMusic: (isChanging: boolean) => void,
     isChangingMusic: boolean
     children: React.ReactNode,
     onChangeMusic: (i: number) => void
}
export function SnowmanMusicList({children, isChangingMusic, setIsChangingMusic, onChangeMusic}: SnowmanMusicListProps){
     const isTablet = useIsMobile();
     const listElem = (
          <ul className="flex flex-col items-center justify-center gap-2 w-full">
               {CHRISTMAS_MUSIC.map((music,i)=>(
                    <li key={i} className="w-full">
                         <Button
                              variant="ghost"
                              onClick={()=>{
                                   setIsChangingMusic(false)
                                   onChangeMusic(i)
                              }}
                              size="sm"
                              className="w-full"
                         >
                              {music.title}
                         </Button>
                    </li>
               ))}
          </ul>
     )
     const t = useTranslations("build-snowman")
     const buttonText = useTranslations("buttons")
     return isTablet ? (
          <Drawer open={isChangingMusic} onOpenChange={setIsChangingMusic}>
               <DrawerTrigger asChild>
                    {children}
               </DrawerTrigger>
               <DrawerContent>
                    <DrawerHeader>
                         <DrawerTitle>{t("music.title")}</DrawerTitle>
                         <DrawerDescription>{t("music.desc")}</DrawerDescription>
                    </DrawerHeader>
                    {listElem}
                    <DrawerFooter>
                         <DrawerClose asChild>
                              <Button variant="outlineSecondary">
                                   {buttonText("close")}
                              </Button>
                         </DrawerClose>
                    </DrawerFooter>
               </DrawerContent>
          </Drawer>
     ) : (
          <Dialog open={isChangingMusic} onOpenChange={setIsChangingMusic}>
               <DialogTrigger asChild>
                    {children}
               </DialogTrigger>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>{t("music.title")}</DialogTitle>
                         <DialogDescription>{t("music.desc")}</DialogDescription>
                    </DialogHeader>
                    {listElem}
                    <DialogFooter>
                         <DialogClose asChild>
                              <Button variant="outlineSecondary">
                                   {buttonText("close")}
                              </Button>
                         </DialogClose>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}