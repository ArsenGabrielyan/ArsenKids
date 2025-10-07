import { CardType, ICard } from "../types"

export const SERVICES: ICard<"service">[] = [
     {
          title: "Մեր Մասին",
          desc: "Ի՞նչ է ArsenKids-ը։ Իմանալ Ավելին սեղմելով այս կոճակը",
          linkText: "Իմանալ Ավելին",
          link: "/#about",
          type: "about"
     },
     {
          title: "Ներբեռնումներ",
          desc: "Ներբեռնեք ArsenKids-ի ուսուցողական թերթերը: Ուսուցողական և զվարճալի ներբեռնումներ երեխաների համար: ",
          linkText: "Ներբեռնումներ",
          link: "/#downloads",
          type: "downloads"
     },
     {
          title: "Եկեք Սովորենք",
          desc: "Եկեք Սովորենք Թվեր Հաշվել, Այբուբեն, Պատկերներ, Կենդանիներ և Այլն",
          linkText: "Դիտել",
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAubvK3veTw5YXlEtw3empLU",
          type: "learn"
     },
     {
          title: "Սովորում ենք Այբուբենը",
          desc: "Եկեք Սովորենք Այբուբենը (Արևելահայերեն և Արևմտահայերեն)",
          linkText: "Դիտել",
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAs0xR-TEy6NACHCn17-r5S-",
          type: "alphabet"
     },
     {
          title: "Սովորում ենք Գույները",
          desc: "Սովորում Ենք Գույները ArsenKids-ի հետ միասին",
          linkText: "Դիտել",
          link: "https://youtube.com/playlist?list=PLL4l-dEWVYAuLeJ_FQIfTA_NzGHOgaG8q",
          type: "colors"
     },
     {
          title: "Խաղեր ArsenKids-ից",
          desc: "Ինտելեկտուալ, ժամանցային և հետաքրքիր խաղեր ArsenKids-ից երեխաների համար :-)",
          linkText: "Խաղալ",
          link: "/games",
          type: "games"
     },
]

export const DOWNLOADS: ICard<"download">[] = [
     {
          title: "Ուսուցողական թերթ «Գույներ»",
          fileName: "colors.pdf",
          imageName: "colors.webp",
          itemType: "others",
          downloadName: "colors"
     },
     {
          title: "Ուսուցողական թերթ «Երկրաչափական Մարմիններ»",
          fileName: "shapes.pdf",
          imageName: "shapes.webp",
          itemType: "others",
          downloadName: "shapes"
     },
     {
          title: "Ուսուցողական թերթ «Մրգեր»",
          fileName: "fruit.pdf",
          imageName: "fruit.webp",
          itemType: "fruit-veggies",
          downloadName: "fruit"
     },
     {
          title: "Ուսուցողական թերթ «Բանջարեղեն»",
          fileName: "vegetables.pdf",
          imageName: "vegies.webp",
          itemType: "fruit-veggies",
          downloadName: "vegetables"
     },
     {
          title: "Ուսուցողական թերթ «Ընտանի Կենդանիներ»",
          fileName: "domestic-animals.pdf",
          imageName: "domestic.webp",
          itemType: "animals",
          downloadName: "domestic-animals"
     },
     {
          title: "Ուսուցողական թերթ «Տրանսպորտային Միջոցներ»",
          fileName: "transportation.pdf",
          imageName: "transportation.webp",
          itemType: "others",
          downloadName: "transportation"
     },
     {
          title: "Ուսուցողական թերթ «Վայրի Կենդանիներ»",
          fileName: "wild-animals.pdf",
          imageName: "wild.webp",
          itemType: "animals",
          downloadName: "wild-animals"
     },
     {
          title: "Ուսուցողական թերթ «Թվեր»",
          fileName: "numbers.pdf",
          imageName: "numbers.webp",
          itemType: "others",
          downloadName: "numbers"
     },
     {
          title: "Ուսուցողական թերթ «Թռչուններ»",
          fileName: "birds.pdf",
          imageName: "birds.webp",
          itemType: "animals",
          downloadName: "birds"
     },
     {
          title: "Ուսուցողական թերթ «Միջատներ»",
          fileName: "insects.pdf",
          imageName: "insects.webp",
          itemType: "animals",
          downloadName: "insects"
     },
     {
          title: "Ուսուցողական թերթ «Անտառային Կենդանիներ»",
          fileName: "forest.pdf",
          imageName: "forest.webp",
          itemType: "animals",
          downloadName: "forest-animals"
     },
     {
          title: "Ուսուցողական թերթ «Արեգակնային համակարգ»",
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
          title: "Զույգեր",
          link: "/memory",
          type: "puzzle"
     },
     {
          imageName: "xo.webp",
          gameName: "tic-tac-toe",
          title: "Իքսիկ Նոլիկ",
          link: "/tic-tac-toe",
          type: "entertainment"
     },
     {
          imageName: "words.webp",
          gameName: "words",
          title: "Գուշակիր բառը",
          link: "/guess-word",
          type: "puzzle"
     },
     {
          imageName: "math.webp",
          gameName: "math",
          title:"Մաթեմատիկա",
          link: "/math",
          type: "math"
     },
     {
          imageName: "numbers.webp",
          gameName: "number",
          title:"Հիշիր թվանշանները",
          link: "/guess-number",
          type: "math"
     },
     {
          imageName: "puzzle.webp",
          gameName: "puzzle",
          title:"Փազլ «Պատկերներ»",
          link: "/puzzle",
          type: "puzzle"
     },
     {
          imageName: "interactive-math.webp",
          gameName: "interactive-math",
          title: "Հրաշագործ Մաթեմատիկա",
          link: "/interactive-math",
          type: "math"
     },
     {
          imageName: "bubbles.webp",
          gameName: "bubbles",
          title: "Պղպջակներ",
          link: "/bubbles",
          type: "entertainment"
     },
];
export const CHRISTMAS_GAMES_LIST: ICard<"game">[] = [
     {
          imageName: "christmas-pairs.webp",
          gameName: "memory-christmas",
          title: "Զույգեր",
          link: "/christmas/memory-game",
          type: "christmas-game"
     },
     {
          imageName: "christmas-puzzle.webp",
          gameName: "puzzle-christmas",
          title: "Փազլ «Ամանոր»",
          link: "/christmas/puzzle",
          type: "christmas-game"
     },
     {
          imageName: "christmas-snowman.webp",
          gameName: "build-snowman",
          title: "Պատրաստիր ձնեմարդ",
          link: "/christmas/build-snowman",
          type: "christmas-game"
     }
]
export const CHRISTMAS_GAME: ICard<"game"> = {
     imageName: "christmas.webp",
     gameName: "christmas",
     title: "Ամանորյա խաղեր",
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