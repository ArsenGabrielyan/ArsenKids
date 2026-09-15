"use client"
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CardType, ICard } from "@/lib/types";
import { Download, Share2 } from "lucide-react";
import { IMAGE_SIZES } from "@/lib/constants/maps";
import { absoluteCDN, absoluteURL } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";
import { Services } from "@/lib/types/enums";

interface CardProps<T extends CardType>{
     data: ICard<T>
}
export function DownloadCard({data}: CardProps<"download">){
     const buttonTxt = useTranslations("buttons")
     const locale = useLocale()
     const t = useTranslations("downloads")
     return (
          <div className="min-w-66 w-full max-w-80 border rounded-md shadow-lg bg-card text-card-foreground p-2 flex flex-col justify-between">
               <div className="relative min-h-[440px]">
                    <Image
                         src={`/downloads/${locale}/${data.imageName}`}
                         alt={data.downloadName}
                         width={IMAGE_SIZES.download.width}
                         height={IMAGE_SIZES.download.height}
                         className="object-cover w-full h-full aspect-square"
                    />
               </div>
               <div className="py-2 lg:py-4 space-y-4 w-full h-full">
                    <h3 id="title" className="font-semibold text-lg">
                         {t(`downloadTitle`,{
                              itemName: data.title[locale]
                         })}
                    </h3>
               </div>
               <div className="pb-2 w-full">
                    <Button variant="primary" asChild className="text-base w-full">
                         <Link href={absoluteCDN("pdf",`/${locale}/${data.fileName}`)} download={data.downloadName}><Download/> {buttonTxt("download.original")}</Link>
                    </Button>
               </div>
          </div>
     );
}
export function GameCard({data}: CardProps<"game">){
     const buttonTxt = useTranslations("buttons")
     const locale = useLocale()
     return (
          <div className="min-w-66 w-full max-w-80 border rounded-md shadow-lg bg-card text-card-foreground p-2 flex flex-col justify-between">
               <div className="relative w-full">
                    <Image
                         src={data.hasLocale ? `/games/${data.imageName}/${locale}.webp` : `/games/${data.imageName}.webp`}
                         alt={data.gameName}
                         width={IMAGE_SIZES.game.width}
                         height={IMAGE_SIZES.game.height}
                         className="object-cover w-full h-full aspect-square"
                    />
               </div>
               <div className="py-2 lg:py-4 space-y-4 w-full h-full">
                    <h3 id="title" className="font-semibold text-xl text-center">
                         {data.title[locale]}
                    </h3>
               </div>
               <div className="pb-2 w-full flex items-center justify-center gap-2 flex-wrap">
                    <Button variant="primary" asChild className="text-base flex-1">
                         <Link href={`/games${data.link}`}>{buttonTxt("playGame")}</Link>
                    </Button>
                    <Button variant="primary" title={buttonTxt("shareGame",{title: data.title[locale]})} size="icon" shareUrl={absoluteURL(`/games${data.link}`)}>
                         <Share2/>
                    </Button>
               </div>
          </div>
     );
}
export function ServiceCard({data}: CardProps<"service">){
     const buttonText = useTranslations("buttons")
     const t = useTranslations("services");
     const cardButtonText = useCallback((serviceType: Services)=>
               serviceType==="about" ? buttonText("learnMore") :
               serviceType==="downloads" ? t("downloads.title"):
               serviceType==="games" ? buttonText("playGameAlt") : buttonText("watch")
          ,[buttonText,t])
     return (
          <div className="min-w-66 w-full max-w-80 border rounded-md shadow-lg bg-card text-card-foreground p-2 flex flex-col justify-between">
               <div className="relative h-[250px]">
                    <Image
                         src={`/cols/col-${data.type}.webp`}
                         alt={data.type}
                         width={IMAGE_SIZES.service.width}
                         height={IMAGE_SIZES.service.height}
                         className="object-cover w-full h-full aspect-square"
                    />
               </div>
               <div className="py-2 lg:py-4 space-y-4 w-full h-full">
                    <h3 id="title" className="font-semibold text-2xl text-center">
                         {t(`${data.type}.title`)}
                    </h3>
                    <p>{t(`${data.type}.desc`)}</p>
               </div>
               <div className="pb-2 w-full">
                    <Button variant="primary" asChild className="text-base w-full">
                         <Link href={data.link}>{cardButtonText(data.type)}</Link>
                    </Button>
               </div>
          </div>
     );
}