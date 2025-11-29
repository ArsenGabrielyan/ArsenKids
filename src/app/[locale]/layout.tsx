import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local"
import "../globals.css";
import { KEYWORDS } from "@/lib/constants";
import { absoluteURL, getOgImage } from "@/lib/utils";
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

export type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export const generateMetadata = async({params}: LocaleLayoutProps): Promise<Metadata> => {
  const {locale} = await params;
  const t = await getTranslations("index");
  return {
    metadataBase: new URL(absoluteURL()),
    title: {
      absolute: t("mainTitle"),
      template: "%s | ArsenKids"
    },
    description: t("mainDesc"),
    alternates: {
      languages: Object.fromEntries(languages.map(l => [l.code, `/${l.code}`])),
      canonical: absoluteURL(`/${locale}`)
    },
    authors: {
      name: "ArsenKids",
      url: "https://youtube.com/@ArsenKids"
    },
    applicationName: "ArsenKids",
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon"},
        { url: "/apple-icon.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/apple-icon.png"
    },
    keywords: KEYWORDS,
    openGraph: {
      title: t("mainTitle"),
      description: t("mainDesc"),
      url: absoluteURL(`/${locale}`),
      locale,
      siteName: "ArsenKids",
      type: "website",
      images: {
        url: getOgImage(),
        width: 1200,
        height: 630
      }
    },
    twitter: {
      title: t("mainTitle"),
      description: t("mainDesc"),
      card: "summary_large_image",
      images: [{
        url: getOgImage(),
        width: 1200,
        height: 630
      }]
    },
    verification: {
      google: "bVrBx7_N7HVVVrC3gk9CwfbykFwxjjIUSM_Je6SEfkE" 
    }
  }
};

export const viewport: Viewport = {
  themeColor: "#82b6ff"
}

export default async function RootLayout({children, params}: LocaleLayoutProps) {
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
