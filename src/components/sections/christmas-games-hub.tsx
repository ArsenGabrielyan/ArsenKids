import GameWrapper from "@/components/game-wrapper";
import { CHRISTMAS_GAMES_LIST } from "@/lib/constants/card-data";
import Card from "@/components/ui/card";
import { getBackgroundImage } from "@/lib/helpers";

export default function ChristmasGamesMenu(){
     const bgStyle = getBackgroundImage("christmas");
     return (
          <div className="min-h-screen p-4 relative flex justify-center items-center flex-col w-full" style={bgStyle}>
               <div className="absolute inset-0 bg-linear-to-b from-transparent to-white to-70% opacity-70 -z-00"/>
               <div className="relative z-10 text-foreground flex justify-center items-center flex-col w-full">
                    <GameWrapper title="Ամանորյա խաղեր">
                         <h2>Ընտրեք ցանկացած խաղ</h2>
                    </GameWrapper>
                    <div className="flex justify-center items-center flex-row-reverse flex-wrap gap-3 lg:gap-5 p-4 w-full">
                         {CHRISTMAS_GAMES_LIST.map(game=>(
                              <Card
                                   key={game.gameName}
                                   title={game.title}
                                   imageSrc={`/games/${game.imageName}`}
                                   imageAlt={game.gameName}
                                   buttonLink={`/games${game.link}`}
                                   buttonText="Խաղալ"
                                   variant="game"
                              />
                         ))}
                    </div>
               </div>
          </div>
     )
}