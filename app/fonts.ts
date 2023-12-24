import { Inter, Roboto } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
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

  