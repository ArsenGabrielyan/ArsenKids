import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const playSound = async(audio: HTMLAudioElement, src: string) => {
  if(!audio || !src) throw new Error("Invalid Audio Src");
  audio.src = src;
  await audio.play();
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