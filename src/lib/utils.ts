import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const playSound = (audio: HTMLAudioElement, src: string) => {
  try{
    if(!audio || !src) throw new Error("Invalid Audio or Audio Src");
    audio.src = src;
    audio.play();
  } catch(err){
    console.error("Audio Error:",err)
    toast.error("Չստացվեց նվագել ձայնը")
  }
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