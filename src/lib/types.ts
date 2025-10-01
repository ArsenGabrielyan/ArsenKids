type ServiceType = 'about' | "downloads" | "learn" | "alphabet" | "colors" | "games"
export type CardType = "service" | "download"
export type DownloadItemType = "others" | "fruit-veggies" | "animals"
export type DownloadFilters = DownloadItemType | "all"

export type ICard<T extends CardType> = T extends "service" ? {
     title: string,
     desc: string,
     linkText: string,
     link: string,
     type: ServiceType
} : {
     title: string,
     itemType: DownloadItemType
     fileName: string,
     imageName: string
     downloadName: string,
}

export type BgImageVariant = "banner" | "contact"