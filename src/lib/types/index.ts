import { OPERATORS } from "../constants/maps";

// General Types
type ServiceType = 'about' | "downloads" | "learn" | "alphabet" | "colors" | "games"
export type CardType = "service" | "download" | "game"
export type DownloadItemType = "others" | "fruit-veggies" | "animals"
export type SearchFilterType<T> = T | "all"
export type BgImageVariant = "banner" | "contact";
export type OperatorType = keyof typeof OPERATORS
export interface IPosition{ 
     x: number;
     y: number;
};
export interface IMatrixPosition{
     row: number;
     col: number;
}
export type AmazingMathOperator = "+" | "-" | "*";

// Game Types
export type GameType = "puzzle" | "entertainment" | "math" | "christmas-game";
export type GameDifficulty = "" | "easy" | "medium" | "hard" | "mixed";
export interface IGameType{
     type: GameType,
     name: string
}
export interface IGameDifficulty{
     id: number,
     name: GameDifficulty,
     title: string
}
export interface IGameTitles{
     puzzles: Record<string,string>,
     pairs: Record<string,string>,
     christmas: Record<string,string>
}
export type GameMessageType = "" | "correct" | "wrong"
export interface IGameMessage {
     messages: string[],
     className: string
}
export interface IPuzzleType{
     txt: string,
     img: string
}
export interface IGameParamLink{
     name: string,
     title: string
}

// Card
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

// Tic Tac Toe
export enum TicTacToeState{
     Ongoing = "ongoing",
     Win = "win",
     Draw = "draw"
}
export type TicTacToeMode = "" | "2-players" | "player-vs-pc"
export type TicTacToeDifficulty = Exclude<GameDifficulty,"mixed">
export interface ITicTacToeDifficulty{
     name: string,
     difficulty: TicTacToeDifficulty
}
export interface IMinimaxReturnType{
     index: number,
     score: number
}

// Memory Game Types
export interface IMemoryGameCards{
     birds: IMemoryGameCard[]
     domesticAnimals: IMemoryGameCard[]
     wildAnimals: IMemoryGameCard[]
     fruit: IMemoryGameCard[]
     vegetables: IMemoryGameCard[]
     colors: IMemoryGameCard[]
     transportation: IMemoryGameCard[]
     insects: IMemoryGameCard[]
     forestAnimals: IMemoryGameCard[]
     solarSystem: IMemoryGameCard[]
     christmas: IMemoryGameCard[]
}
export type MemoryCardParams = keyof IMemoryGameCards
export interface IMemoryGameCard{
     img: string,
     matched: false
}
export interface IMemoryCard extends IMemoryGameCard{
     id: number
}