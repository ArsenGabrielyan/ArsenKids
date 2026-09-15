"use client"
import PageLayout from "@/components/layout";
import GamesSection from "@/components/sections/games";
import HeroSection from "@/components/sections/hero";
import { ICard } from "@/lib/types";
import { useTranslations } from "next-intl";

interface GamesHubProps{
     games: ICard<"game">[]
}
export default function GamesHub({games}: GamesHubProps){
     const t = useTranslations("games")
     return (
          <PageLayout>
               <HeroSection
                    title={t("title")}
                    description={t("desc")}
                    link="#main-games"
                    linkText={t("startPlaying")}
               />
               <GamesSection games={games}/>
          </PageLayout>
     )
}