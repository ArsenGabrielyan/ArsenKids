"use client"
import PageLayout from "@/components/layout";
import GamesSection from "@/components/sections/games";
import HeroSection from "@/components/sections/hero";
import { useTranslations } from "next-intl";

export default function GamesHub(){
     const t = useTranslations("games")
     return (
          <PageLayout>
               <HeroSection
                    title={t("title")}
                    description={t("desc")}
                    link="#main-games"
                    linkText={t("startPlaying")}
               />
               <GamesSection/>
          </PageLayout>
     )
}