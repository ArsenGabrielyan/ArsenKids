import { MemoryGameLinks, Operators, SnowmanItems } from "./enums";

// General
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
export type AmazingMathOperator = "+" | "-" | "*";
export type OperatorType = keyof typeof Operators

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

// Memory Game
export type MemoryCardParams = MemoryGameLinks | "christmas"
export type MemoryCardType<T> = Record<MemoryCardParams,T>
export interface IMemoryGameCard{
     img: string,
     matched: false
}
export interface IMemoryCard extends IMemoryGameCard{
     id: number
}

// Snowman
export interface ISnowmanItem{
     name: string,
     type: SnowmanItems
}
export type SnowmanType = Record<SnowmanItems,number>
export type SnowmanItemsType = `${SnowmanItems}s`