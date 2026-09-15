import { ICard } from "../types"
import { Games, Services } from "../types/enums";

export const SERVICES: ICard<"service">[] = [
     {
          link: "/#about",
          type: Services.About
     },
     {
          link: "/#downloads",
          type: Services.Downloads
     },
     {
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAubvK3veTw5YXlEtw3empLU",
          type: Services.Learn
     },
     {
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAs0xR-TEy6NACHCn17-r5S-",
          type: Services.Alphabet
     },
     {
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAuLeJ_FQIfTA_NzGHOgaG8q",
          type: Services.Colors
     },
     {
          link: "/games#main-games",
          type: Services.Games
     },
]
export const CHRISTMAS_GAME: ICard<"game"> = {
     title: {
          hy: "Ամանորյա խաղեր",
          en: "Christmas Games",
          ru: "Новогодние игры"
     },
     imageName: "christmas",
     gameName: Games.Christmas,
     link: "/christmas",
     type: "entertainment",
     hasLocale: false
}