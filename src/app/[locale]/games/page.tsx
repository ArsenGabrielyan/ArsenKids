import GamesHub from "@/components/pages/games-hub";
import { getGames } from "@/lib/helpers/data";

export default async function Games(){
     const games = await getGames()
     return (
          <GamesHub games={games}/>
     )
}