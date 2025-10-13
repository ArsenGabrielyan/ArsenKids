"use client"
import { GameType, SearchFilterType } from "@/lib/types";
import SiteSection from "../ui/site-section";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CHRISTMAS_GAME, GAMES_LIST } from "@/lib/constants/card-data";
import { isChristmas } from "@/lib/helpers";
import Card from "../ui/card";
import { useTranslations } from "next-intl";

type GameFilters = Exclude<SearchFilterType<GameType>,"christmas-game">

const filters: GameFilters[] = ["all", "puzzle", "math", "entertainment"]

export default function GamesSection(){
     const [currSelection, setCurrSelection] = useState<GameFilters>("all")
     const [search, setSearch] = useState("");
     const t = useTranslations("games")
     const getGameTitle = useCallback((gameName: string) => t(`games-list.${gameName}`),[t])
     const allGames = useMemo(()=>{
          const gamesList = isChristmas() ? [CHRISTMAS_GAME,...GAMES_LIST] : GAMES_LIST;
          return gamesList
               .map((game,i)=>({id: i+1,...game}))
               .filter(val=>currSelection==="all" || val.type===currSelection)
               .filter(game=>getGameTitle(game.gameName).toLowerCase().includes(search.toLowerCase()))
     },[currSelection, getGameTitle, search]);
     const renderNoGamesMessage = () => {
          const isSearchingChristmasGame = !isChristmas() && getGameTitle('christmas').toLowerCase().includes(search.toLowerCase())
          return <p className="text-xl text-muted-foreground font-heading">{isSearchingChristmasGame ? t("notFound.christmas") : t("notFound.original")}</p> 
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
                              placeholder={t("search")}
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
                              <Card
                                   key={game.gameName}
                                   title={getGameTitle(game.gameName)}
                                   imageSrc={`/games/${game.imageName}`}
                                   imageAlt={game.gameName}
                                   buttonLink={`/games${game.link}`}
                                   buttonText={t("playBtn")}
                                   variant="game"
                              />
                         )) : renderNoGamesMessage()}
                    </div>
               </div>
          </SiteSection>
     )
}