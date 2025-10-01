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
     const bg = getBackgroundImage("banner")
     return (
          <SiteSection className="flex justify-center items-center relative min-h-screen bg-cover bg-fixed" style={{
               backgroundImage: `url(${bg.webp}), url(${bg.jpg})`
          }} id="banner">
               <div className={cn("max-w-7xl text-center space-y-1", isChristmas() ? "text-white" : "text-black")}>
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold">{title}</h1>
                    {!!description && <p className="text-xl lg:text-2xl">{description}</p>}
                    {(!!link || !!linkText) && (
                         <Button asChild className="mt-3">
                              <Link href={link}>{linkText}</Link>
                         </Button>
                    )}
               </div>
          </SiteSection>
     )
}