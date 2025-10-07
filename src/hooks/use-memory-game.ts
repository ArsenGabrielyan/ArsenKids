import { AUDIO } from "@/lib/constants/maps";
import { pairsCards } from "@/lib/constants/pairs.game";
import { INITIAL_PAIRS_STATE } from "@/lib/constants/states";
import { IMemoryCard, MemoryCardParams } from "@/lib/types";
import { IMemoryGameState } from "@/lib/types/states";
import { playSound } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export default function useMemoryGame(game: MemoryCardParams){
     const [gameState, setGameState] = useState(INITIAL_PAIRS_STATE);
     const updateState = (overrides: Partial<IMemoryGameState>) =>
          setGameState(prev=>({...prev,...overrides}))
     const [cards,setCards] = useState<IMemoryCard[]>([]);
     const shuffle = ()=>{
          const pairCard = pairsCards[game];
          const shuffled: IMemoryCard[] = [...pairCard, ...pairCard].sort(()=>Math.random()-0.5).map(card=>({...card,id: Math.random()}))
          updateState({
               firstChoice: null,
               secondChoice: null,
               turns: 0,
               score: 0,
               isStarted: true
          })
          setCards(shuffled);
     }
     const handleChoice = (card: IMemoryCard) =>
          gameState.firstChoice ?
               updateState({secondChoice: card}) :
               updateState({firstChoice: card})
     const reset = useCallback(()=>updateState({
          firstChoice: null,
          secondChoice: null,
          disabled: false
     }),[])
     useEffect(() => {
          const audio = new Audio();
          if(gameState.firstChoice && gameState.secondChoice){
               updateState({disabled: true});
               if(gameState.firstChoice.img === gameState.secondChoice.img){
                    setCards(prev=>prev.map(card=>(card.img === gameState.firstChoice?.img ? ({...card, matched: true}): card) as IMemoryCard))
                    setGameState(prev=>({
                         ...prev,
                         turns: prev.turns+1,
                         score: prev.score+1
                    }))
                    playSound(audio, AUDIO.correct);
                    reset();
               } else {
                    playSound(audio, AUDIO.wrong);
                    setTimeout(()=>{
                         setGameState(prev=>({
                              ...prev,
                              turns: prev.turns+1,
                         }))
                         reset();
                    },1000)
               }
          }
     },[gameState.firstChoice, gameState.secondChoice, reset]);
     return {shuffle,handleChoice,cards,gameState};
}