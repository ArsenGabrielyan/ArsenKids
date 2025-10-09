import { BG_IMAGE_MAP, GAME_TITLES } from "../constants/maps";
import { snowmanItems } from "../constants/snowman.game";
import { BgImageVariant, IGameTitles, SnowmanType } from "../types";

export function isChristmas(){
     const today = new Date();
     const month = today.getMonth() + 1,day = today.getDate();
     return (month === 12 && day >= 6) || (month === 1 && day <= 10);
}
export function getBackgroundImage(variant: BgImageVariant): React.CSSProperties{
     const bgImage = BG_IMAGE_MAP[variant]
     const jpg = `/backgrounds/${bgImage}.jpg`;
     const webp = `/backgrounds/${bgImage}.webp`;
     return {
          background: `url(${webp}), url(${jpg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          ...((variant==="banner" || variant==="christmas") ? {
               backgroundAttachment: "fixed"
          } : null),
          ...((variant==="contact" || variant==="christmas") ? {
               backgroundPosition: "center"
          } : isChristmas() ? {
               backgroundPosition: "right"
          } : null)
     }
}
export const getGameTitle = (category: keyof IGameTitles,key:string): string => GAME_TITLES[category]?.[key] || ""
export const getSnowmanItems = (type: SnowmanType) => snowmanItems.filter(val=>val.type===type);