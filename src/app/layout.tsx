import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import { KEYWORDS } from "@/lib/constants";
import { absoluteURL } from "@/lib/utils";
import { Toaster } from "@/components/shadcn-ui/sonner";

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

// TODO: Add OG, Twitter, and alternates (languages) metadata
export const metadata: Metadata = {
  metadataBase: new URL(absoluteURL()),
  title: {
    absolute: "Բարի Գալուստ ArsenKids!",
    template: "%s | ArsenKids"
  },
  description: "Ամենալավ կրթությունը տանում է դեպի ամենալավ ապագա։",
  keywords: KEYWORDS,
  authors: {
    name: "ArsenKids",
    url: "https://youtube.com/@ArsenKids"
  },
  applicationName: "ArsenKids",
  alternates: {
    canonical: absoluteURL(),
  },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kamar.variable} ${raleway.variable} antialiased`}
      >
        {children}
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          duration={2500}
          
        />
      </body>
    </html>
  );
}
