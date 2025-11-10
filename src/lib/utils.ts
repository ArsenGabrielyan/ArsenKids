import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import type {AudioType, AudioKey} from "./types"
import { isChristmas } from "./helpers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function playSound(src: string, errMsg?: string, volume?: number) {
  if (!src) return console.warn("Invalid audio src");
  try {
    const audio = new Audio(src);
    audio.volume = volume || 1;
    await audio.play();
  } catch (err: unknown){
    console.error(err);
    toast.error(errMsg || "Failed to load sound")
  }
}
export function preloadAudio(sources: AudioType, ...audioFiles: AudioKey[]) {
  const set: Set<AudioKey> = new Set(audioFiles);
  const arr = audioFiles.length<=0
    ? Object.values(sources)
    : Object.entries(sources)
      .filter(([key])=>set.has(key as AudioKey))
      .map((entries)=>entries[1]);
  arr.forEach(src => {
    const audio = new Audio(src);
    audio.load();
  });
}
export function absoluteURL(path?: string){
  const baseURL = process.env.NODE_ENV === "production" ? "https://arsenkids.vercel.app" : "http://localhost:3000"
  return !path ? baseURL : `${baseURL}${path}`
}
export function absoluteCDN(type: "sounds" | "pdf" | "images" | "music", path: `/${string}`){
  if(!type) throw new Error("Specify the resource type")
  const baseURL = `https://arsengabrielyan.github.io/ArsenKids/${type}`;
  return `${baseURL}${path}`
}
/**
 * Returns the Default OpenGraph Image of ArsenKids site
 */
export const getOgImage = () => {
  if(isChristmas()) return absoluteURL("/og/og-christmas.png")
  const date = new Date();
  const isEarthDay = date.getMonth() === 3 && date.getDate() === 22;
  return absoluteURL(`/og/${isEarthDay ? "og-earth-day" : "og-standard"}.png`)
}