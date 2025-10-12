import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local"
import "../globals.css";
import { KEYWORDS } from "@/lib/constants";
import { absoluteURL } from "@/lib/utils";
import { Toaster } from "@/components/shadcn-ui/sonner";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { getTranslations } from "next-intl/server";
import { languages } from "@/i18n/config";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["cyrillic","latin","cyrillic-ext","latin-ext"],
  display: 'swap'
})

const kamar = localFont({
  src: "../fonts/kamar.ttf",
  variable: "--font-kamar",
  display: "swap",
  preload: true
})

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

// TODO: Add OG and Twitter metadata on here and on every page
export const generateMetadata = async({params}: Props): Promise<Metadata> => {
  const {locale} = await params;
  const t = await getTranslations("index");
  return {
    metadataBase: new URL(absoluteURL()),
    title: {
      absolute: t("mainTitle"),
      template: "%s | ArsenKids"
    },
    description: t("mainDesc"),
    keywords: KEYWORDS,
    authors: {
      name: "ArsenKids",
      url: "https://youtube.com/@ArsenKids"
    },
    applicationName: "ArsenKids",
    alternates: {
      languages: Object.fromEntries(languages.map(l => [l.code, `/${l.code}`])),
      canonical: absoluteURL(`/${locale}`)
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png"
    }
  }
};

export const viewport: Viewport = {
  themeColor: "#82b6ff"
}

export default async function RootLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kamar.variable} ${raleway.variable} antialiased`}
      >
        <NextIntlClientProvider>
          {children}
          <Toaster
            position="bottom-center"
            richColors
            closeButton
            duration={2500}
            
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
