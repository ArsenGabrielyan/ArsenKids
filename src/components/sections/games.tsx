"use client"
import { ICard, SearchFilterType } from "@/lib/types";
import { GameType } from "@/lib/types/games";
import SiteSection from "../ui/site-section";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CHRISTMAS_GAME } from "@/lib/constants/card-data";
import { isChristmas } from "@/lib/helpers";
import { GameCard } from "../ui/card";
import { useLocale, useTranslations } from "next-intl";

type GameFilters = Exclude<SearchFilterType<GameType>,"christmas-game">

const filters: GameFilters[] = ["all", "puzzle", "math", "entertainment"]

interface GamesSectionProps{
     games: ICard<"game">[]
}
export default function GamesSection({games}: GamesSectionProps){
     const locale = useLocale();
     const [currSelection, setCurrSelection] = useState<GameFilters>("all")
     const [search, setSearch] = useState("");
     const t = useTranslations("games")
     const allGames = useMemo(()=>{
          const gamesList = isChristmas() ? [CHRISTMAS_GAME,...games] : games;
          return gamesList
               .map((game,i)=>({id: i+1,...game}))
               .filter(val=>currSelection==="all" || val.type===currSelection)
               .filter(game=>game.title[locale].toLowerCase().includes(search.toLowerCase()))
     },[currSelection, locale, search]);
     const searchTxt = useTranslations("search")
     const renderNoGamesMessage = () => {
          const isSearchingChristmasGame = !isChristmas() && CHRISTMAS_GAME.title[locale].toLowerCase().includes(search.toLowerCase())
          return <p className="text-xl text-muted-foreground font-heading">{searchTxt(isSearchingChristmasGame ? "christmasGames" : "noResults")}</p> 
     }
     return (
          <SiteSection id="main-games">
               <div className="relative w-full flex items-center justify-center flex-col">
                    <h2 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mb-5 border-b border-blue-700 w-fit text-center">{t("allGames")}</h2>
                    <div className="mb-5 flex justify-center items-center gap-2 w-full">
                         <Input
                              value={search}
                              onChange={e=>setSearch(e.target.value)}
                              className="w-full max-w-lg"
                              placeholder={searchTxt("placeholder")}
                         />
                         {search!=="" && (
                              <Button variant="ghost" size="icon" onClick={()=>setSearch("")}>
                                   <X className="size-6"/>
                              </Button>
                         )}
                    </div>
                    <ul className="flex justify-center flex-wrap gap-2">
                         {filters.map(filter=>(
                              <li
                                   className={cn(currSelection===filter ? "bg-rainbow-green" : "bg-rainbow-blue","py-2 px-6 tracking-wide transition-all text-center font-heading cursor-pointer hover:bg-rainbow-yellow")}
                                   key={filter}
                                   onClick={()=>setCurrSelection(filter)}
                              >
                                   {t(`filters.${filter}`)}
                              </li>
                         ))}
                    </ul>
                    <div className="flex justify-center items-center flex-row-reverse flex-wrap mt-10 gap-3 lg:gap-5 p-3">
                         {allGames.length>0 ? allGames.map(game=>(
                              <GameCard
                                   key={game.gameName}
                                   data={game}
                              />
                         )) : renderNoGamesMessage()}
                    </div>
               </div>
          </SiteSection>
     )
}