import type { Metadata } from "next";
import {Cinzel, Montserrat} from "next/font/google";
import {JSX, Suspense} from "react";
import "./globals.css";
import {AudioProvider} from "@/context/AudioContext";
import {GuestProvider} from "@/context/GuestContext";
import {SmoothScrollProvider} from "@/components/SmoothScrollProvider";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-sans"
});

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-serif"
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
    <html lang="es">
      <body
        className={`${montserrat.variable} ${cinzel.variable} antialiased`}
      >
      <Suspense fallback={<div>Cargando...</div>}>
          <AudioProvider>
              <GuestProvider>
                  <SmoothScrollProvider>{children}</SmoothScrollProvider>
              </GuestProvider>
          </AudioProvider>
      </Suspense>
      </body>
    </html>
  );
}
