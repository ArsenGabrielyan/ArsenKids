import { isChristmas } from "../helpers";
import { BgImageVariant } from "../types";

export const BG_IMAGE_MAP: Record<BgImageVariant, string> = {
     banner: isChristmas() ? "christmas" : "clouds",
     contact: isChristmas() ? "gifts" : "toys"
}