import { AUDIO, BG_IMAGE_MAP } from "../constants/maps";
import { ChristmasGame, Downloads, Games, Services } from "./enums";
import { GameType } from "./games";

// General
export type CardType = "service" | "download" | "game"
export type DownloadItemType = "others" | "fruit-veggies" | "animals"
export type SearchFilterType<T> = T | "all"
export type BgImageVariant = keyof typeof BG_IMAGE_MAP;
export interface IPosition{ 
     x: number;
     y: number;
};
export interface IMatrixPosition{
     row: number;
     col: number;
}
export interface IMusicData{
     title: string,
     artist: string
}

// Card
export type GamesType = Games | ChristmasGame;
export type ICard<T extends CardType> = T extends "service" ? {
     link: string,
     type: Services
} : T extends "download" ? {
     itemType: DownloadItemType
     fileName: string,
     imageName: string
     downloadName: Downloads,
} : {
     imageName: string,
     gameName: GamesType
     link: string,
     type: GameType,
     hasLocale: boolean
}

// Audio Types
export type AudioType = typeof AUDIO;
export type AudioKey = keyof AudioType