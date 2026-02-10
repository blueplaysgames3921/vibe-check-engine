import type { Metadata } from "next";
import { Archivo_Black, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo" 
});

const instrument = Instrument_Serif({ 
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument" 
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VIBE ENGINE | Viral AI",
  description: "Elite content generation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${inter.variable} dark`}>
      <body className="bg-black text-white min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
        <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="fixed inset-0 z-0 bg-black">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/5 blur-[120px]"></div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
