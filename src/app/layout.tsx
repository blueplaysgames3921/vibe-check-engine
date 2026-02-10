import type { Metadata } from "next";
import { Archivo_Black, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const instrument = Instrument_Serif({ weight: "400", style: "italic", subsets: ["latin"], variable: "--font-instrument" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VIBE ENGINE",
  description: "High-Retention Content System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${inter.variable} dark`}>
      <body className="bg-[#020202] text-white">
        <div className="fixed inset-0 noise-bg pointer-events-none z-50"></div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
