import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "신시내티 미술관전 · 작품 목록",
  description:
    "우에노노모리 미술관 「신시내티 미술관전 — 미국으로 건너간 유럽의 보물」(2026.10.10–2027.1.10) 출품작 84점 한국어 작품 목록",
  openGraph: {
    title: "신시내티 미술관전 · 한국어 작품 목록",
    description: "미국으로 건너간 유럽의 보물 — 우에노노모리 미술관",
    images: ["/img/poster.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141414",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
