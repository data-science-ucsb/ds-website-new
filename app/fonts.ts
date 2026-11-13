import { Inter, Roboto, Newsreader, JetBrains_Mono } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const roboto = Roboto({
    weight: "400",
    style: "normal",
    display: "swap",
    variable: "--font-space-roboto",
    preload: true,
    fallback: ["sans-serif"],
    adjustFontFallback: true,
    subsets: ["latin"],
  });
