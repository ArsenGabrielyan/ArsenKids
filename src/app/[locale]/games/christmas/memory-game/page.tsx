import { LocaleLayoutProps } from "@/app/[locale]/layout";
import MemoryGame from "@/components/games/memory";
import { absoluteURL } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     const t = await getTranslations("memory");
     const gameTxt = await getTranslations("games")
     return {
          title: t("pairs.christmas"),
          openGraph: {
               title: t("pairs.christmas"),
               url: absoluteURL(`/${locale}/games/christmas/memory-game`),
               locale,
               siteName: `ArsenKids ${gameTxt("metaTitle")}`,
               type: "website",
               images: {
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }
          },
          twitter: {
               title: t("pairs.christmas"),
               card: "summary_large_image",
               images: [{
                    url: absoluteURL("/og/og-christmas.png"),
                    width: 1200,
                    height: 630
               }]
          }
     }
}

export default async function ChristmasMemory(){
     const t = await getTranslations("memory");
     return (
          <MemoryGame
               type="christmas"
               title={t("pairs.christmas")}
          />
     )
}