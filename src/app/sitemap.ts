import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { absoluteURL } from "@/lib/utils";
import { CHRISTMAS_GAMES_LIST, GAMES_LIST } from "@/lib/constants/card-data";
import { CHRISTMAS_PUZZLE_LINKS, PAIRS_LINKS, PUZZLE_LINKS } from "@/lib/constants";

function generateSitemapItem(absoluteUrl: string, priority: 1 | 0.8 | 0.7): MetadataRoute.Sitemap[number]{
     return {
          url: absoluteURL(absoluteUrl),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority
     }
}

export default function Sitemap(): MetadataRoute.Sitemap {
     const routes = [
          "/",
          "/games",
          ...GAMES_LIST.map(val=>`/games${val.link}`),
          ...PUZZLE_LINKS.map(link=>`/games/puzzle/${link}`),
          ...PAIRS_LINKS.map(item=>`/games/memory/${item}`),
          "/games/christmas",
          ...CHRISTMAS_GAMES_LIST.map(val=>`/games${val.link}`),
          ...CHRISTMAS_PUZZLE_LINKS.map(link=>`/games/christmas/puzzle/${link}`)
     ]
     return routes.flatMap(route=>{
          const priority = route === "/"
               ? 1 : route==="/games" || route==="/games/christmas"
               ? 0.8 : 0.7;
          return [
               generateSitemapItem(`${route === "/" ? "" : route}`,priority),
               ...locales.map(locale=>generateSitemapItem(`/${locale}${route === "/" ? "" : route}`,priority))
          ]
     })
}