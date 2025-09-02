import type { Metadata } from "next";
/*import { Geist, Geist_Mono } from "next/font/google";*/
import {Cinzel, Montserrat, Geist_Mono} from "next/font/google";
import {JSX, Suspense} from "react";
import "./globals.css";
import {AudioProvider} from "@/context/AudioContext";
import {GuestProvider} from "@/context/GuestContext";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});*/
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-sans"
})

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-serif"
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrea & Alexis",
  description: "Boda de Andrea & Alexis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${cinzel.variable} ${geistMono.variable} antialiased`}
      >
      <Suspense fallback={<div>Cargando...</div>}>
          <AudioProvider>
              <GuestProvider>{children}</GuestProvider>
          </AudioProvider>
      </Suspense>
      </body>
    </html>
  );
}
