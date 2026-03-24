import { LocaleLayoutProps } from "@/app/[locale]/layout";
import MemoryGame from "@/components/games/memory"
import { PAIRS_LINKS } from "@/lib/constants";
import { MemoryCardParams } from "@/lib/types/games";
import { MemoryGameLinks } from "@/lib/types/enums";
import { absoluteURL, getOgImage } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { createMetaAlternates } from "@/lib/helpers";

interface PageProps{
     params: LocaleLayoutProps["params"] & Promise<{game: MemoryGameLinks}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {game, locale} = await params;
     if(!PAIRS_LINKS.find(val=>val===game) || !hasLocale(routing.locales, locale)) return notFound();
     const t = await getTranslations("memory")
     const gamesTxt = await getTranslations("games")
     return {
          title: t("gameTitle",{title: t(`pairs.${game}`)}),
          alternates: createMetaAlternates(locale,`/games/memory/${game}`),
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