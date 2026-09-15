import GameWrapper from "@/components/game-wrapper";
import { GameCard } from "@/components/ui/card";
import { getBackgroundImage } from "@/lib/helpers";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../language-switcher";
import { ICard } from "@/lib/types";

interface ChristmasGamesHubProps{
     games: ICard<"game">[]
}
export default function ChristmasGamesHub({games}: ChristmasGamesHubProps){
     const bgStyle = getBackgroundImage("christmas");
     const t = useTranslations("christmas-games")
     return (
          <div className="min-h-screen p-4 relative flex justify-center items-center flex-col w-full" style={bgStyle}>
               <div className="absolute inset-0 bg-linear-to-b from-transparent to-white to-70% opacity-70 -z-00"/>
               <div className="relative z-10 text-foreground flex justify-center items-center flex-col w-full">
                    <GameWrapper title={t("title")}>
                         <h2>{t("desc")}</h2>
                         <LanguageSwitcher/>
                    </GameWrapper>
                    <div className="flex justify-center items-center flex-row-reverse flex-wrap gap-3 lg:gap-5 p-4 w-full">
                         {games.map(game=>(
                              <GameCard
                                   key={game.gameName}
                                   data={game}
                              />
                         ))}
                    </div>
               </div>
          </div>
     )
}