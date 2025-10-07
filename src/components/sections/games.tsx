"use client"
import { GameType, SearchFilterType } from "@/lib/types";
import SiteSection from "../ui/site-section";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CHRISTMAS_GAME, GAMES_LIST } from "@/lib/constants/card-data";
import { isChristmas } from "@/lib/helpers";
import Card from "../ui/card";

type GameFilters = Exclude<SearchFilterType<GameType>,"christmas-game">

const filters: Record<GameFilters, string> = {
     all: "Բոլորը",
     puzzle: "Տրամաբանական",
     math: "Մաթեմատիկական",
     entertainment: "Ժամանցային",
}

export default function GamesSection(){
     const [currSelection, setCurrSelection] = useState<GameFilters>("all")
     const [search, setSearch] = useState("");
     const allGames = useMemo(()=>{
          const gamesList = isChristmas() ? [CHRISTMAS_GAME,...GAMES_LIST] : GAMES_LIST;
          return gamesList
               .map((game,i)=>({id: i+1,...game}))
               .filter(val=>currSelection==="all" || val.type===currSelection)
               .filter(game=>game.title.toLowerCase().includes(search.toLowerCase()))
     },[currSelection,search]);
     const renderNoGamesMessage = () => {
          const isSearchingChristmasGame = !isChristmas() && search.toLowerCase().includes("Ամանոր".toLowerCase());
          return <p className="text-xl text-muted-foreground font-heading">{isSearchingChristmasGame ? "Ամանորյա խաղերը հասանելի են միայն Նոր Տարվա և Սուրբ Ծննդյան սեզոնին։" : "Որոնման արդյունքներ չեն գտնվել:"}</p> 
     }
     return (
          <SiteSection id="main-games">
               <div className="relative w-full flex items-center justify-center flex-col">
                    <h2 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mb-5 border-b border-blue-700 w-fit text-center">Բոլոր խաղերը</h2>
                    <div className="mb-5 flex justify-center items-center gap-2 w-full">
                         <Input
                              value={search}
                              onChange={e=>setSearch(e.target.value)}
                              className="w-full max-w-lg"
                              placeholder="Որոնում․․․"
                         />
                         {search!=="" && (
                              <Button variant="ghost" size="icon" onClick={()=>setSearch("")}>
                                   <X className="size-6"/>
                              </Button>
                         )}
                    </div>
                    <ul className="flex justify-center flex-wrap gap-2">
                         {Object.entries(filters).map(([key, value])=>(
                              <li
                                   className={cn(currSelection===key ? "bg-rainbow-green" : "bg-rainbow-blue","py-2 px-6 tracking-wide transition-all text-center font-heading cursor-pointer hover:bg-rainbow-yellow")}
                                   key={key}
                                   onClick={()=>setCurrSelection(key as GameFilters)}
                              >
                                   {value}
                              </li>
                         ))}
                    </ul>
                    <div className="flex justify-center flex-row-reverse flex-wrap mt-10 gap-3 lg:gap-5 p-3">
                         {allGames.length>0 ? allGames.map(game=>(
                              <Card
                                   key={game.gameName}
                                   title={game.title}
                                   imageSrc={`/games/${game.imageName}`}
                                   imageAlt={game.gameName}
                                   buttonLink={`/games${game.link}`}
                                   buttonText="Խաղալ"
                                   variant="game"
                              />
                         )) : renderNoGamesMessage()}
                    </div>
               </div>
          </SiteSection>
     )
}