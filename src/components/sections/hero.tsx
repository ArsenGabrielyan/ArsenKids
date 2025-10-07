"use client"
import { Button } from "@/components/ui/button";
import SiteSection from "@/components/ui/site-section";
import { getBackgroundImage, isChristmas } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroSectionProps{
     title?: string,
     description?: string,
     link?: string,
     linkText?: string
}
export default function HeroSection({
     title = "ArsenKids",
     description = "Ամենալավ կրթությունը տանում է դեպի ամենալավ ապագա",
     link = "/#about",
     linkText = "Իմանալ Ավելին"
}: HeroSectionProps){
     const bgStyle = getBackgroundImage("banner")
     return (
          <SiteSection className="flex justify-center items-center relative min-h-screen" style={bgStyle} id="banner">
               <div className="max-w-7xl text-center space-y-1">
                    <h1 className={cn("text-5xl md:text-6xl lg:text-8xl font-semibold",isChristmas() ? "text-white" : "text-black")}>{title}</h1>
                    {!!description && <p className={cn("text-xl lg:text-2xl",isChristmas() ? "text-white" : "text-black")}>{description}</p>}
                    {(!!link || !!linkText) && (
                         <Button asChild className="mt-3">
                              <Link href={link}>{linkText}</Link>
                         </Button>
                    )}
               </div>
          </SiteSection>
     )
}