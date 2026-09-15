"use client"
import PageLayout from "@/components/layout";
import AboutSection from "@/components/sections/about";
import ContactSection from "@/components/sections/contact";
import DownloadsSection from "@/components/sections/downloads";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import { isChristmas } from "@/lib/helpers";
import { ICard } from "@/lib/types";
import { useTranslations } from "next-intl";

interface HomePageProps{
     downloads: ICard<"download">[]
}
export default function HomePage({downloads}: HomePageProps){
     const t = useTranslations("index");
     const buttonText = useTranslations("buttons")
     return (
          <PageLayout>
               <HeroSection
                    description={t(isChristmas() ? "mainDescChristmas" : "mainDesc")}
                    linkText={buttonText("learnMore")}
               />
               <AboutSection/>
               <ServicesSection/>
               <DownloadsSection data={downloads}/>
               <ContactSection/>
          </PageLayout>
     )
}