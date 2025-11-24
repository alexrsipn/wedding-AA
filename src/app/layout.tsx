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
      <div className="orientation-blocker">
          <div className="phone-icon-animation">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          </div>
          <p className="mt-6 text-xl font-semibold">Por favor, gira tu dispositivo.</p>
      </div>
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
