"use client"
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CardType } from "@/lib/types";
import { Download, Share2 } from "lucide-react";
import { IMAGE_SIZES } from "@/lib/constants/maps";
import { absoluteURL, cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CardProps {
     title: string;
     imageSrc: string;
     imageAlt: string;
     buttonText: string;
     buttonLink: string;
     description?: string;
     variant: CardType;
}

export default function Card({
     title,
     imageSrc,
     imageAlt,
     buttonText,
     buttonLink,
     description,
     variant = "service",
}: CardProps) {
     const buttonTxt = useTranslations("buttons")
     return (
          <div className="min-w-66 w-full max-w-80 border rounded-md shadow-lg bg-card text-card-foreground p-2 flex flex-col justify-between">
               <div className={cn("relative",variant==="game" ? "w-full" : variant==="download" ? "min-h-[440px]" : "h-[250px]")}>
                    <Image
                         src={imageSrc}
                         alt={imageAlt}
                         width={IMAGE_SIZES[variant].width}
                         height={IMAGE_SIZES[variant].height}
                         className="object-cover w-full h-full aspect-square"
                    />
               </div>
               <div className="py-2 lg:py-4 space-y-4 w-full h-full">
                    <h3 id="title" className={`font-semibold ${variant === "download" ? "text-lg" : variant==="game" ? "text-xl text-center" : "text-2xl text-center"}`}>
                         {title}
                    </h3>
                    {description && <p>{description}</p>}
               </div>
               <div className={cn("pb-2 w-full",variant==="game" && "flex items-center justify-center gap-2 flex-wrap")}>
                    {variant==="download" ? (
                         <Button variant="primary" asChild className="text-base w-full">
                              <Link href={buttonLink} download={imageAlt}><Download/> {buttonText}</Link>
                         </Button>
                    ) : variant==="game" ? (
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