import { CardType, ICard } from "../types"

export const SERVICES: ICard<"service">[] = [
     {
          link: "/#about",
          type: "about"
     },
     {
          link: "/#downloads",
          type: "downloads"
     },
     {
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAubvK3veTw5YXlEtw3empLU",
          type: "learn"
     },
     {
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAs0xR-TEy6NACHCn17-r5S-",
          type: "alphabet"
     },
     {
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAuLeJ_FQIfTA_NzGHOgaG8q",
          type: "colors"
     },
     {
          link: "/games#main-games",
          type: "games"
     },
]

export const DOWNLOADS: ICard<"download">[] = [
     {
          fileName: "colors.pdf",
          imageName: "colors.webp",
          itemType: "others",
          downloadName: "colors"
     },
     {
          fileName: "shapes.pdf",
          imageName: "shapes.webp",
          itemType: "others",
          downloadName: "shapes"
     },
     {
          fileName: "fruit.pdf",
          imageName: "fruit.webp",
          itemType: "fruit-veggies",
          downloadName: "fruit"
     },
     {
          fileName: "vegetables.pdf",
          imageName: "vegies.webp",
          itemType: "fruit-veggies",
          downloadName: "vegetables"
     },
     {
          fileName: "domestic-animals.pdf",
          imageName: "domestic.webp",
          itemType: "animals",
          downloadName: "domestic-animals"
     },
     {
          fileName: "transportation.pdf",
          imageName: "transportation.webp",
          itemType: "others",
          downloadName: "transportation"
     },
     {
          fileName: "wild-animals.pdf",
          imageName: "wild.webp",
          itemType: "animals",
          downloadName: "wild-animals"
     },
     {
          fileName: "numbers.pdf",
          imageName: "numbers.webp",
          itemType: "others",
          downloadName: "numbers"
     },
     {
          fileName: "birds.pdf",
          imageName: "birds.webp",
          itemType: "animals",
          downloadName: "birds"
     },
     {
          fileName: "insects.pdf",
          imageName: "insects.webp",
          itemType: "animals",
          downloadName: "insects"
     },
     {
          fileName: "forest.pdf",
          imageName: "forest.webp",
          itemType: "animals",
          downloadName: "forest-animals"
     },
     {
          fileName: "solar-system.pdf",
          imageName: "solar.webp",
          itemType: "others",
          downloadName: "solar-system"
     },
]

export const GAMES_LIST: ICard<"game">[] = [
     {
          imageName: "pairs.webp",
          gameName: "memory",
          link: "/memory",
          type: "puzzle"
     },
     {
          imageName: "xo.webp",
          gameName: "tic-tac-toe",
          link: "/tic-tac-toe",
          type: "entertainment"
     },
     {
          imageName: "words.webp",
          gameName: "words",
          link: "/guess-word",
          type: "puzzle"
     },
     {
          imageName: "math.webp",
          gameName: "math",
          link: "/math",
          type: "math"
     },
     {
          imageName: "numbers.webp",
          gameName: "number",
          link: "/guess-number",
          type: "math"
     },
     {
          imageName: "puzzle.webp",
          gameName: "puzzle",
          link: "/puzzle",
          type: "puzzle"
     },
     {
          imageName: "interactive-math.webp",
          gameName: "interactive-math",
          link: "/interactive-math",
          type: "math"
     },
     {
          imageName: "bubbles.webp",
          gameName: "bubbles",
          link: "/bubbles",
          type: "entertainment"
     },
];
export const CHRISTMAS_GAMES_LIST: ICard<"game">[] = [
     {
          imageName: "christmas-pairs.webp",
          gameName: "memory-christmas",
          link: "/christmas/memory-game",
          type: "christmas-game"
     },
     {
          imageName: "christmas-puzzle.webp",
          gameName: "puzzle-christmas",
          link: "/christmas/puzzle",
          type: "christmas-game"
     },
     {
          imageName: "christmas-snowman.webp",
          gameName: "build-snowman",
          link: "/christmas/build-snowman",
          type: "christmas-game"
     }
]
export const CHRISTMAS_GAME: ICard<"game"> = {
     imageName: "christmas.webp",
     gameName: "christmas",
     link: "/christmas",
     type: "entertainment"
}
export const IMAGE_SIZES: Record<CardType,{width: number, height: number}> = {
     game: {
          width: 300,
          height: 300
     },
     service: {
          width: 495,
          height: 385
     },
     download: {
          width: 720,
          height: 1020
     }
}