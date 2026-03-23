import { MetadataRoute } from "next";
import { CHRISTMAS_GAMES_LIST, GAMES_LIST } from "@/lib/constants/card-data";
import { CHRISTMAS_PUZZLE_LINKS, PAIRS_LINKS, PUZZLE_LINKS } from "@/lib/constants";
import { absoluteURL } from "@/lib/utils";
import { locales } from "@/i18n/config";

export default function Sitemap(): MetadataRoute.Sitemap {
     const routes = [
          "/",
          "/games",
          "/games/christmas",
          ...GAMES_LIST.map(val=>`/games${val.link}`),
          ...PUZZLE_LINKS.map(link=>`/games/puzzle/${link}`),
          ...PAIRS_LINKS.map(item=>`/games/memory/${item}`),
          ...CHRISTMAS_GAMES_LIST.map(val=>`/games${val.link}`),
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
                    languages: Object.fromEntries(
                         locales.map((locale) => [
                              locale,
                              absoluteURL(locale === "hy" ? route : `/${locale}${route}`)
                         ])
                    )
               }
          }
     })
}