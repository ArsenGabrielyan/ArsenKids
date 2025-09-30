import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import { KEYWORDS } from "@/lib/constants";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["cyrillic","latin","cyrillic-ext","latin-ext"],
  display: 'swap'
})

const kamar = localFont({
  src: "./fonts/kamar.ttf",
  variable: "--font-kamar",
  display: "swap",
  preload: true
})

// TODO: Add base URL, OG, Twitter, and alternates (languages, canonical) metadata
export const metadata: Metadata = {
  title: {
    absolute: "Բարի Գալուստ ArsenKids!",
    template: "%s | ArsenKids"
  },
  description: "ArsenKids-ը նախատեսված է երեխաներին, փոքրիկներին և ընտանիքներին ներգրավելու համար կրթական տեսանյութերի միջոցով (օրինակ՝ Սովորենք հաշվել, սովորենք այբուբենը, սովորենք գույներ) և ստոպ կադր կրթական անիմացիաների միջոցով: Այն մշակվել է երեխաների համար, բայց նաև սիրում են ծնողները:",
  keywords: KEYWORDS,
  authors: {
    name: "ArsenKids",
    url: "https://youtube.com/@ArsenKids"
  },
  applicationName: "ArsenKids",
  icons: {
    icon: "/favicon.ico",
    apple: "/public/apple-icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#82b6ff"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kamar.variable} ${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
