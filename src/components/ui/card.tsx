"use client"
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CardType, ICard } from "@/lib/types";
import { Download, Share2 } from "lucide-react";
import { IMAGE_SIZES } from "@/lib/constants/maps";
import { absoluteCDN, absoluteURL, cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

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
interface UniversalCardProps {
     title: string;
     imageSrc: string;
     imageAlt: string;
     buttonText: string;
     buttonLink: string;
     description?: string;
     variant: Exclude<CardType,"download">;
}

export default function Card({
     title,
     imageSrc,
     imageAlt,
     buttonText,
     buttonLink,
     description,
     variant = "service",
}: UniversalCardProps) {
     const buttonTxt = useTranslations("buttons")
     return (
          <div className="min-w-66 w-full max-w-80 border rounded-md shadow-lg bg-card text-card-foreground p-2 flex flex-col justify-between">
               <div className={cn("relative",variant==="game" ? "w-full" : "h-[250px]")}>
                    <Image
                         src={imageSrc}
                         alt={imageAlt}
                         width={IMAGE_SIZES[variant].width}
                         height={IMAGE_SIZES[variant].height}
                         className="object-cover w-full h-full aspect-square"
                    />
               </div>
               <div className="py-2 lg:py-4 space-y-4 w-full h-full">
                    <h3 id="title" className={`font-semibold ${variant==="game" ? "text-xl text-center" : "text-2xl text-center"}`}>
                         {title}
                    </h3>
                    {description && <p>{description}</p>}
               </div>
               <div className={cn("pb-2 w-full",variant==="game" && "flex items-center justify-center gap-2 flex-wrap")}>
                    {variant==="game" ? (
                         <>
                         <Button variant="primary" asChild className="text-base flex-1">
                              <Link href={buttonLink}>{buttonText}</Link>
                         </Button>
                         <Button variant="primary" title={buttonTxt("shareGame",{title})} size="icon" shareUrl={absoluteURL(buttonLink)}>
                              <Share2/>
                         </Button>
                         </>
                    ) : (
                         <Button variant="primary" asChild className="text-base w-full">
                              <Link href={buttonLink}>{buttonText}</Link>
                         </Button>
                    )}
               </div>
          </div>
     );
}