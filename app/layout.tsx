import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./glass.css";
import "../src/styles/fonts.css";
import "../src/styles/theme.css";
import "../src/styles/interaction.css";
import "../src/styles/portfolio.css";
import "../src/styles/capabilities.css";
import "../src/styles/typography-system.css";
import "../src/styles/ui-balance.css";
import "../src/styles/project-breakdown.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "张顺富｜视觉设计师 · AI设计师 · 品牌设计师",
  description: "张顺富个人作品集，专注视觉设计、AI创意与品牌设计。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
