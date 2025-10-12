"use client"
import Image from "next/image"
import SiteSection from "../ui/site-section"
import { isChristmas } from "@/lib/helpers"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTranslations } from "next-intl"

export default function AboutSection(){
     const isMobile = useIsMobile();
     const t = useTranslations("about")
     return (
          <SiteSection id="about">
               <div className="relative w-full flex justify-between items-center flex-col lg:flex-row">
                    <div className="relative w-full lg:w-1/2 space-y-2.5">
                         <h2 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mb-2 border-b border-blue-700 w-fit">{t("title")}</h2>
                         <p>{t.rich("description.line1",{
                              bold: (chunks) => <span className="font-medium">{chunks}</span>
                         })}</p>
                         <p>{t.rich("description.line2",{
                              bold: (chunks) => <span className="font-medium">{chunks}</span>
                         })}</p>
                         <p>{t.rich("description.line3",{
                              bold: (chunks) => <span className="font-medium">{chunks}</span>
                         })}</p>
                    </div>
                    <div className="relative w-full lg:w-1/2">
                         <div className="relative w-full flex justify-center items-center min-h-80">
                              <Image src={`/logos/${isChristmas() ? "logo-christmas" : "logo"}.webp`} alt="ArsenKids" width={isMobile ? 300 : 256} height={isMobile ? 300 : 256} id="arsenkids-logo" className="rounded-md object-cover"/>
                         </div>
                    </div>
               </div>
          </SiteSection>
     )
}