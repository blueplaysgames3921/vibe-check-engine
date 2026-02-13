import type { Metadata } from "next";
import { Archivo_Black, Instrument_Serif } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-archivo",
  display: 'swap',
});

const instrument = Instrument_Serif({ 
  weight: "400", 
  style: "italic", 
  subsets: ["latin"], 
  variable: "--font-instrument",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "VIBE ENGINE",
  description: "Elite Content Gen",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} dark`}>
      <body className="bg-black text-white antialiased">
        <div className="fixed inset-0 z-0 bg-black" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
