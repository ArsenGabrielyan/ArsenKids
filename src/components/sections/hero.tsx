"use client"
import { Button } from "@/components/ui/button";
import SiteSection from "@/components/ui/site-section";
import { getBackgroundImage } from "@/lib/utils";
import Link from "next/link";

export default function HeroSection(){
     const {banner} = getBackgroundImage()
     return (
          <SiteSection className="flex justify-center items-center relative min-h-screen bg-cover bg-fixed" style={{
               backgroundImage: `url(${banner.webp}), url(${banner.jpg})`
          }} id="banner">
               <div className="max-w-7xl text-center space-y-1">
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold">ArsenKids</h1>
                    <p className="text-xl lg:text-2xl">Ամենալավ կրթությունը տանում է դեպի ամենալավ ապագա</p>
                    <Button asChild className="mt-3">
                         <Link href="/#about">Իմանալ Ավելին</Link>
                    </Button>
               </div>
          </SiteSection>
     )
}