import { LocaleLayoutProps } from "@/app/[locale]/layout";
import MemoryGame from "@/components/games/memory"
import { languages } from "@/i18n/config";
import { PAIRS_LINKS } from "@/lib/constants";
import { MemoryCardParams } from "@/lib/types";
import { MemoryGameLinks } from "@/lib/types/enums";
import { absoluteURL, getOgImage } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps{
     params: LocaleLayoutProps["params"] & Promise<{game: MemoryGameLinks}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {game, locale} = await params;
     if(!PAIRS_LINKS.find(val=>val===game)) notFound();
     const t = await getTranslations("memory")
     const gamesTxt = await getTranslations("games")
     return {
          title: t("gameTitle",{title: t(`pairs.${game}`)}),
          alternates: {
               languages: Object.fromEntries(languages.map(l => [l.code, `/${l.code}/games/memory/${game}`])),
               canonical: absoluteURL(`/games/memory/${game}`)
          },
          openGraph: {
               title: t("gameTitle",{title: t(`pairs.${game}`)}),
               url: absoluteURL(`/${locale}/games/memory/${game}`),
               locale,
               siteName: `ArsenKids ${gamesTxt("metaTitle")}`,
               type: "website",
               images: {
                    url: getOgImage(),
                    width: 1200,
                    height: 630
               }
          },
          twitter: {
               title: t("gameTitle",{title: t(`pairs.${game}`)}),
               card: "summary_large_image",
               images: [{
                    url: getOgImage(),
                    width: 1200,
                    height: 630
               }]
          }
     }
}

export default async function Memory({params}: PageProps){
     const {game} = await params;
     if(!PAIRS_LINKS.find(val=>val===game)) notFound();
     const t = await getTranslations("memory")
     return (
          <MemoryGame
               type={game as MemoryCardParams}
               title={t(`pairs.${game}`)}
          />
     )
}