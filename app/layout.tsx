import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./wayang.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wayang Jawi — Panggung Wayang Kulit Digital Interaktif",
  description:
    "Menghidupkan seni wayang kulit lewat panggung digital interaktif, pelacakan gestur dalang AI, dan dialog kreasi sastra nusantara.",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/wayang-gunungan-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0b0604] text-[#f4e7cd] antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
