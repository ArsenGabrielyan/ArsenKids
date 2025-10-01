type ServiceType = 'about' | "downloads" | "learn" | "alphabet" | "colors" | "games"
export type CardType = "service" | "download" | "game"
export type DownloadItemType = "others" | "fruit-veggies" | "animals"

export type GameType = "puzzle" | "entertainment" | "math" | "christmas-game";
export type GameDifficulty = "" | "easy" | "medium" | "hard" | "mixed";

export type SearchFilterType<T> = T | "all"

export type ICard<T extends CardType> = T extends "service" ? {
     title: string,
     desc: string,
     linkText: string,
     link: string,
     type: ServiceType
} : T extends "download" ? {
     title: string,
     itemType: DownloadItemType
     fileName: string,
     imageName: string
     downloadName: string,
} : {
     title: string,
     imageName: string,
     gameName: string,
     link: string,
     type: GameType
}

export type BgImageVariant = "banner" | "contact";