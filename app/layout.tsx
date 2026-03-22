import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Jersey_10,
  Jersey_25,
  Archivo,
  Lexend,
} from "next/font/google";
import { LoadingGate } from "@/components/LoadingGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jersey10 = Jersey_10({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jersey10",
});

const jersey25 = Jersey_25({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jersey25",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "ASCENT 2026",
  description: "Change the Ordinary — ASCENT 2026 Techfest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jersey10.variable} ${jersey25.variable} ${archivo.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingGate>{children}</LoadingGate>
      </body>
    </html>
  );
}
