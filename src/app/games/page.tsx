import PageLayout from "@/components/layout";
import GamesSection from "@/components/sections/games";
import HeroSection from "@/components/sections/hero";
import { GAME_KEYWORDS, KEYWORDS } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Խաղեր",
  description: "Ինտելեկտուալ և հետաքրքիր խաղեր ArsenKids-ից",
  keywords: [...GAME_KEYWORDS, ...KEYWORDS],
};

export default function Games(){
     return (
          <PageLayout>
               <HeroSection
                    title="Խաղեր ArsenKids-ից"
                    description="Այստեղ դուք կխաղաք հետաքրքիր և ինտելեկտուալ խաղեր"
                    link="#main-games"
                    linkText="Սկսել Խաղալ"
               />
               <GamesSection/>
          </PageLayout>
     )
}