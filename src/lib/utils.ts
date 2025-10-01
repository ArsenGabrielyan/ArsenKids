import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteURL(path?: string){
  const baseURL = process.env.NODE_ENV === "production" ? "https://arsenkids.vercel.app" : "localhost:3000"
  return !path ? baseURL : `${baseURL}${path}`
}