"use client"
import PageLayout from "@/components/layout";
import AboutSection from "@/components/sections/about";
import ContactSection from "@/components/sections/contact";
import DownloadsSection from "@/components/sections/downloads";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import { isChristmas } from "@/lib/helpers";
import { useTranslations } from "next-intl";

export default function HomePage(){
     const t = useTranslations("index")
     return (
          <PageLayout>
               <HeroSection
                    description={t(isChristmas() ? "mainDescChristmas" : "mainDesc")}
                    linkText={t("learnMore")}
               />
               <AboutSection/>
               <ServicesSection/>
               <DownloadsSection/>
               <ContactSection/>
          </PageLayout>
     )
}