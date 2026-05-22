import type { Metadata } from "next";
import { Libertinus_Serif, Caveat, Inter, Comic_Neue } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const libertinus = Libertinus_Serif({
  variable: "--font-libertinus",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aarik Garg",
  description: "A wish sharing journey for Aarik Garg.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${libertinus.variable} ${caveat.variable} ${inter.variable} ${comicNeue.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
