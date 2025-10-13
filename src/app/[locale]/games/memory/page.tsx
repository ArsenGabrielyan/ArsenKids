import MemoryGameMenu from "@/components/games/memory/menu"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("memory");
     return {
          title: t("title")
     }
}

export default function MemoryMenu(){
     return (
          <MemoryGameMenu/>
     )
}