import { AUDIO, BG_IMAGE_MAP } from "../constants/maps";
import { ChristmasGame, Downloads, Games, MemoryGameLinks, Operators, Services, SnowmanItems } from "./enums";

// General Types
export type CardType = "service" | "download" | "game"
export type DownloadItemType = "others" | "fruit-veggies" | "animals"
export type SearchFilterType<T> = T | "all"
export type BgImageVariant = keyof typeof BG_IMAGE_MAP;
export type OperatorType = keyof typeof Operators
export interface IPosition{ 
     x: number;
     y: number;
};
export interface IMatrixPosition{
     row: number;
     col: number;
}
export type AmazingMathOperator = "+" | "-" | "*";
export interface IMusicData{
     title: string,
     artist: string
}

// Game Types
export type GameType = "puzzle" | "entertainment" | "math" | "christmas-game";
export type GameDifficulty = "" | "easy" | "medium" | "hard" | "mixed";
export interface IGameType{
     type: GameType,
     name: string
}
export interface IGameDifficulty{
     id: number,
     name: GameDifficulty
}
export type GameMessageType = "" | "correct" | "wrong"
export interface IPuzzleType{
     txt: string,
     img: string
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

// Tic Tac Toe
export enum TicTacToeState{
     Ongoing = "ongoing",
     Win = "win",
     Draw = "draw"
}
export type TicTacToeMode = "" | "2-players" | "player-vs-pc"
export interface IMinimaxReturnType{
     index: number,
     score: number
}
export type TicTacToePlayer = "X" | "O"
export type TicTacToeBoard = TicTacToePlayer | ""

// Memory Game Types
export type MemoryCardParams = MemoryGameLinks | "christmas"
export type MemoryCardType<T> = Record<MemoryCardParams,T>
export interface IMemoryGameCard{
     img: string,
     matched: false
}
export interface IMemoryCard extends IMemoryGameCard{
     id: number
}

// Snowman Game Types
export interface ISnowmanItem{
     name: string,
     type: SnowmanItems
}
export type SnowmanType = Record<SnowmanItems,number>
export type SnowmanItemsType = `${SnowmanItems}s`

// Audio Types
export type AudioType = typeof AUDIO;
export type AudioKey = keyof AudioType