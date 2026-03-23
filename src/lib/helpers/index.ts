import { BG_IMAGE_MAP } from "../constants/maps";
import { snowmanItems } from "../constants/games";
import { BgImageVariant  } from "../types";
import { SnowmanItems } from "../types/enums";
import { GameMessageType } from "../types/games";
import { LangCodeType, TFunction } from "@/i18n/types";
import { MetadataRoute } from "next";
import { absoluteURL } from "@/lib/utils";
import { locales } from "@/i18n/config";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";

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
export const getSnowmanItems = (type: SnowmanItems) => snowmanItems.filter(val=>val.type===type);
export function getRandomMessage(type: GameMessageType, t: TFunction<"game-messages">, limit?: number): string{
     const messages: string[] = type!=="" ? t(type).split("; ").slice(0,limit) : [];
     return messages[Math.floor(Math.random()*messages.length)];
}