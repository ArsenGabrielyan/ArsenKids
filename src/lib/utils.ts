import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function playSound(src: string, errMsg?: string) {
  if (!src) return console.warn("Invalid audio src");
  try {
    const audio = new Audio(src);
    audio.volume = 1;
    await audio.play();
  } catch (err: unknown){
    console.error(err);
    toast.error(errMsg || "Failed to load sound")
  }
}
export function preloadAudio(sources: Record<string, string>) {
  Object.values(sources).forEach(src => {
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
export const generateMessagesForTranslation = (length: number): (`msg${number}`)[] => Array(length).fill("").map((_,i)=>`msg${i+1}` as `msg${number}`)