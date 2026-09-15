import { cache } from "react";
import { ICard } from "../types";
import { absoluteCDN } from "../utils";

export const getLearningSheets = cache(async (): Promise<ICard<"download">[]> => {
     try {
          const res = await fetch(absoluteCDN("data","/learning-sheets.json"));
          if(!res.ok) return []
          const data: ICard<"download">[] = await res.json();
          return data.filter((sheet): sheet is ICard<"download"> => sheet !== null);
     } catch {
          return []
     }
})
export const getGames = cache(async (type: "christmas" | "original" = "original"): Promise<ICard<"game">[]> => {
     try {
          const res = await fetch(absoluteCDN("data",type==="christmas" ? "/christmas-games.json" : "/games.json"));
          if(!res.ok) return []
          const data: ICard<"game">[] = await res.json();
          return data.filter((game): game is ICard<"game"> => game !== null);
     } catch {
          return []
     }
})