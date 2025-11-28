import GuessNumberGame from "@/components/games/guess-number";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LocaleLayoutProps } from "../../layout";
import { absoluteURL, getOgImage } from "@/lib/utils";
import { languages } from "@/i18n/config";

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
     const {locale} = await params
     const t = await getTranslations("guess-number");
     const gamesTxt = await getTranslations("games")
     return {
          title: t("title"),
          alternates: {
               languages: Object.fromEntries(languages.map(l => [l.code, `/${l.code}/games/guess-number`])),
               canonical: absoluteURL(`/${locale}/games/guess-number`),
          },
          openGraph: {
               title: t("title"),
               url: absoluteURL(`/${locale}/games/guess-number`),
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
               title: t("title"),
               card: "summary_large_image",
               images: [{
                    url: getOgImage(),
                    width: 1200,
                    height: 630
               }]
          }
     }
}

export default function GuessNumber(){
     return (
          <GuessNumberGame/>
     )
}