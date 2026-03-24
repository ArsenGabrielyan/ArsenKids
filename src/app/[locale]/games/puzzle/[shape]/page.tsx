import { LocaleLayoutProps } from "@/app/[locale]/layout";
import PuzzleGame from "@/components/games/puzzle"
import { PUZZLE_LINKS } from "@/lib/constants"
import { PuzzleLinks } from "@/lib/types/enums";
import { absoluteURL, getOgImage } from "@/lib/utils";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { createMetaAlternates } from "@/lib/helpers";

interface PageProps{
     params: LocaleLayoutProps["params"] & Promise<{shape: PuzzleLinks}>,
}

export const generateMetadata = async({params}: PageProps): Promise<Metadata> => {
     const {shape, locale} = await params;
     if(!PUZZLE_LINKS.find(val=>val===shape) || !hasLocale(routing.locales, locale)) return notFound();
     const t = await getTranslations("puzzle");
     const gamesTxt = await getTranslations("games")
     return {
          title: t("gameTitle",{title: t(`games.${shape}`)}),
          alternates: createMetaAlternates(locale,`/games/puzzle/${shape}`),
          openGraph: {
               title: t("gameTitle",{title: t(`games.${shape}`)}),
               url: absoluteURL(`/${locale}/games/puzzle/${shape}`),
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
               title: t("gameTitle",{title: t(`games.${shape}`)}),
               card: "summary_large_image",
               images: [{
                    url: getOgImage(),
                    width: 1200,
                    height: 630
               }]
          }
     }
}

export default async function Puzzle({params}: PageProps){
     const {shape} = await params;
     if(!PUZZLE_LINKS.find(val=>val===shape)) notFound();
     const t = await getTranslations("puzzle")
     return (
          <PuzzleGame
               title={t(`games.${shape}`)}
               shape={shape}
          />
     )
}