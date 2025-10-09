import { CHRISTMAS_MUSIC } from "@/lib/constants/maps";
import { absoluteCDN } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function useAudio(isStarted: boolean){
     const [isMusicOn, setIsMusicOn] = useState(false);
     const [currMusic, setCurrMusic] = useState("")
     const audioRef = useRef<HTMLAudioElement | null>(null);
     const setMusic = (i: number) => {
          const currMusic = CHRISTMAS_MUSIC[i];
          if(audioRef.current){
               setCurrMusic(`${currMusic.artist} - ${currMusic.title}`)
               audioRef.current.src = absoluteCDN("music",`/${encodeURI(`${currMusic.title.toLowerCase()}.mp3`)}`);
               audioRef.current.load();
               audioRef.current.play();
               setIsMusicOn(true);
          }
     }
     useEffect(()=>{
          if(!audioRef.current) audioRef.current = new Audio();
          const handleEnded = () => {
               const randomIndex = Math.floor(Math.random() * CHRISTMAS_MUSIC.length);
               setMusic(randomIndex)
          }
          if (isStarted) {
               const randomIndex = Math.floor(Math.random() * CHRISTMAS_MUSIC.length);
               setMusic(randomIndex);
          }
          audioRef.current?.addEventListener("ended", handleEnded);
          return () => {
               audioRef.current?.removeEventListener("ended", handleEnded);
               audioRef.current?.pause();
               audioRef.current = null;
          };
     },[isStarted]);
     useEffect(()=>{
          if(currMusic!=="") toast.info(`Երաժշտություն՝ ${currMusic}`);
     },[currMusic])
     const togglePlayPause = () => {
          if(audioRef.current){
               if(isMusicOn){
                    audioRef.current.pause();
                    setIsMusicOn(false)
               } else {
                    audioRef.current.play();
                    setIsMusicOn(true);
               }
          }
     }
     return {togglePlayPause,setMusic,isMusicOn}
}