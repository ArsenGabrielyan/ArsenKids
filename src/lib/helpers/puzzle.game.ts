import { GRID_SIZE, TILE_COUNT } from "../constants/games";
import { IMatrixPosition, IPosition } from "../types";

export function isSolvable(tiles: number[]): boolean {
     let product = 1;
     for (let i = 1, l = TILE_COUNT - 1; i <= l; i++) 
          for (let j = i + 1, m = l + 1; j <= m; j++) 
               product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
     return Math.round(product) === 1;
}
export function isSolved(tiles: number[]): boolean {
     for (let i = 0, l = tiles.length; i < l; i++) 
          if (tiles[i] !== i) return false;
     return true;
}
export const getMatrixPosition = (index: number): IMatrixPosition => ({
     row: Math.floor(index / GRID_SIZE),
     col: index % GRID_SIZE,
});
export const getVisualPosition = (row: number,col: number,width: number,height: number): IPosition => ({
     x: col * width,
     y: row * height,
});
export function shuffle(tiles: number[]): number[] {
     const shuffledTiles = [
          ...tiles.filter((t) => t !== tiles.length - 1).sort(() => Math.random() - 0.5),
          tiles.length - 1,
     ];
     return isSolvable(shuffledTiles) && !isSolved(shuffledTiles) ? shuffledTiles : shuffle(shuffledTiles);
}
export function canSwap(srcI: number, destI: number): boolean {
     const src = getMatrixPosition(srcI);
     const dest = getMatrixPosition(destI);
     return Math.abs(src.row - dest.row) + Math.abs(src.col - dest.col) === 1;
}
export function swap(tiles: number[], src: number, dest: number): number[] {
     const tilesResult = [...tiles];
     [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
     return tilesResult;
}