import { cache } from "react";
import { CDN_BASE_URL } from "../constants";
import { ICard } from "../types";

export const getLearningSheets = cache(async (): Promise<ICard<"download">[]> => {
     try {
          const res = await fetch(`${CDN_BASE_URL}/learning-sheets.json`);
          if(!res.ok) return []
          const data: ICard<"download">[] = await res.json();
          return data.filter((sheet): sheet is ICard<"download"> => sheet !== null);
     } catch {
          return []
     }
})