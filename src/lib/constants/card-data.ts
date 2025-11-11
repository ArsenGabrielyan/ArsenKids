import { ICard } from "../types"
import { ChristmasGame, Downloads, Games, Services } from "../types/enums";

export const SERVICES: ICard<"service">[] = [
     { link: "/#about", type: Services.About },
     { link: "/#downloads", type: Services.Downloads },
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
     { link: "/games#main-games", type: Services.Games },
]

export const DOWNLOADS: ICard<"download">[] = [
     {
          fileName: "colors.pdf",
          imageName: "colors.webp",
          itemType: "others",
          downloadName: Downloads.Colors
     },
     {
          fileName: "shapes.pdf",
          imageName: "shapes.webp",
          itemType: "others",
          downloadName: Downloads.Shapes
     },
     {
          fileName: "fruit.pdf",
          imageName: "fruit.webp",
          itemType: "fruit-veggies",
          downloadName: Downloads.Fruit
     },
     {
          fileName: "vegetables.pdf",
          imageName: "vegies.webp",
          itemType: "fruit-veggies",
          downloadName: Downloads.Vegetables
     },
     {
          fileName: "domestic-animals.pdf",
          imageName: "domestic.webp",
          itemType: "animals",
          downloadName: Downloads.DomesticAnimals
     },
     {
          fileName: "transportation.pdf",
          imageName: "transportation.webp",
          itemType: "others",
          downloadName: Downloads.Transportation
     },
     {
          fileName: "wild-animals.pdf",
          imageName: "wild.webp",
          itemType: "animals",
          downloadName: Downloads.WildAnimals
     },
     {
          fileName: "numbers.pdf",
          imageName: "numbers.webp",
          itemType: "others",
          downloadName: Downloads.Numbers
     },
     {
          fileName: "birds.pdf",
          imageName: "birds.webp",
          itemType: "animals",
          downloadName: Downloads.Birds
     },
     {
          fileName: "insects.pdf",
          imageName: "insects.webp",
          itemType: "animals",
          downloadName: Downloads.Insects
     },
     {
          fileName: "forest.pdf",
          imageName: "forest.webp",
          itemType: "animals",
          downloadName: Downloads.ForestAnimals
     },
     {
          fileName: "solar-system.pdf",
          imageName: "solar.webp",
          itemType: "others",
          downloadName: Downloads.SolarSystem
     },
]

export const GAMES_LIST: ICard<"game">[] = [
     {
          imageName: "pairs",
          gameName: Games.Memory,
          link: "/memory",
          type: "puzzle",
          hasLocale: false,
     },
     {
          imageName: "xo",
          gameName: Games.TicTacToe,
          link: "/tic-tac-toe",
          type: "entertainment",
          hasLocale: false,
     },
     {
          imageName: "words",
          gameName: Games.GuessWord,
          link: "/guess-word",
          type: "puzzle",
          hasLocale: true
     },
     {
          imageName: "math",
          gameName: Games.Maths,
          link: "/math",
          type: "math",
          hasLocale: false
     },
     {
          imageName: "numbers",
          gameName: Games.MemorizeNum,
          link: "/guess-number",
          type: "math",
          hasLocale: true
     },
     {
          imageName: "puzzle",
          gameName: Games.Puzzle,
          link: "/puzzle",
          type: "puzzle",
          hasLocale: true
     },
     {
          imageName: "interactive-math",
          gameName: Games.InteractiveMath,
          link: "/interactive-math",
          type: "math",
          hasLocale: true
     },
     {
          imageName: "bubbles",
          gameName: Games.Bubbles,
          link: "/bubbles",
          type: "entertainment",
          hasLocale: false,
     },
];
export const CHRISTMAS_GAMES_LIST: ICard<"game">[] = [
     {
          imageName: "christmas-pairs",
          gameName: ChristmasGame.Memory,
          link: "/christmas/memory-game",
          type: "christmas-game",
          hasLocale: false
     },
     {
          imageName: "christmas-puzzle",
          gameName: ChristmasGame.Puzzle,
          link: "/christmas/puzzle",
          type: "christmas-game",
          hasLocale: true
     },
     {
          imageName: "christmas-snowman",
          gameName: ChristmasGame.Snowman,
          link: "/christmas/build-snowman",
          type: "christmas-game",
          hasLocale: false
     }
]
export const CHRISTMAS_GAME: ICard<"game"> = {
     imageName: "christmas",
     gameName: Games.Christmas,
     link: "/christmas",
     type: "entertainment",
     hasLocale: false
}