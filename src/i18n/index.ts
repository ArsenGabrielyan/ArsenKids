import { LangCodeType } from "@/lib/types";
import { messages } from "./config";

export async function loadMessages(locale: LangCodeType){
     const [common, games, website, words] = await Promise.all(
          messages.map(msg=>
               import(`../../i18n/${locale}/${msg}.json`).then(m=>m.default)
          )
     );
     return {
          ...common,
          ...games,
          ...website,
          ...words
     }
}