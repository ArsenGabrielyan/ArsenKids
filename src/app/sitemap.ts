import { MetadataRoute } from "next";
import { CHRISTMAS_PUZZLE_LINKS, PAIRS_LINKS, PUZZLE_LINKS } from "@/lib/constants";
import { absoluteLink, absoluteURL } from "@/lib/utils";
import { locales } from "@/i18n/config";
import { getGames } from "@/lib/helpers/data";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
     const [games, christmasGames] = await Promise.all([
          getGames(),
          getGames("christmas")
     ])
     const routes = [
          "/",
          "/games",
          "/games/christmas",
          ...games.map(val=>`/games${val.link}`),
          ...PUZZLE_LINKS.map(link=>`/games/puzzle/${link}`),
          ...PAIRS_LINKS.map(item=>`/games/memory/${item}`),
          ...christmasGames.map(val=>`/games${val.link}`),
          ...CHRISTMAS_PUZZLE_LINKS.map(link=>`/games/christmas/puzzle/${link}`)
     ]
     return routes.map(route=>{
          const priority = route === "/"
               ? 1 : route==="/games" || route==="/games/christmas"
               ? 0.8 : 0.7;
          return {
               url: absoluteURL(route),
               lastModified: new Date(),
               changeFrequency: "weekly",
               priority,
               alternates: {
                    languages: {
                        "x-default": absoluteURL(route),
                         ...Object.fromEntries(locales.map((locale) => [
                              locale,
                              absoluteLink(locale,route)
                         ])
                   )}
               }
          }
     })
}