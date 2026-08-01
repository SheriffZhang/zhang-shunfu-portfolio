import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./glass.css";
import "../src/styles/fonts.css";
import "../src/styles/theme.css";
import "../src/styles/interaction.css";
import "../src/styles/portfolio.css";
import "../src/styles/typography-system.css";
import "../src/styles/ui-balance.css";
import "../src/styles/project-breakdown.css";
import "../src/styles/contact-polish.css";
import "../src/styles/spell-motion.css";
import "../src/styles/work-compact.css";
import "../src/styles/detail-fixes.css";
import "../src/styles/about-polish.css";
import "../src/styles/capabilities.css";
import "../src/styles/capabilities-final.css";
import "../src/styles/contact-final.css";
import "../src/styles/navigation-final.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zhang-shunfu-portfolio.netlify.app"),
  title: "张顺富｜视觉设计师 · AI 设计师 · 品牌设计师",
  description: "张顺富个人作品集，聚焦品牌视觉、AI 创意与跨媒介视觉设计。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "张顺富｜视觉 / AI / 品牌设计师",
    description: "以理性建立系统，以感性创造记忆。浏览张顺富的品牌、视觉与 AI 概念作品。",
    type: "website",
    locale: "zh_CN",
    siteName: "张顺富个人作品集",
    images: [{
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "张顺富｜视觉 / AI / 品牌设计师",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "张顺富｜视觉 / AI / 品牌设计师",
    description: "品牌视觉、AI 创意与跨媒介视觉设计作品集。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
