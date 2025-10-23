import { locales, messages } from "@/i18n/config";
import { Messages } from "@/i18n/types";
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const exclusions = new Set<Messages>(["words"]);

const messagePaths = locales.flatMap(locale=>messages.filter(val=>!exclusions.has(val)).map(msg=>
  `./i18n/${locale}/${msg}.json`
))

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: messagePaths
  }
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://arsengabrielyan.github.io/ArsenKids/images/**")
    ]
  }
};

export default withNextIntl(nextConfig);