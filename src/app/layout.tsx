"use client";

import "./globals.css";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-prompt",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="scroll-smooth">{children}</body>
    </html>
  );
}
