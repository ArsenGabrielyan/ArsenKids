import { BG_IMAGE_MAP } from "../constants/maps";
import { BgImageVariant } from "../types";

export function isChristmas(){
     const today = new Date();
     const month = today.getMonth() + 1,day = today.getDate();
     return (month === 12 && day >= 6) || (month === 1 && day <= 10);
}

export function getBackgroundImage(variant: BgImageVariant): {
     jpg: string,
     webp: string    
}{
     const bgImage = BG_IMAGE_MAP[variant]
     return {
          jpg: `/backgrounds/${bgImage}.jpg`,
          webp: `/backgrounds/${bgImage}.webp`
     }
}