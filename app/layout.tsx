import type { Metadata } from "next";
import { Schibsted_Grotesk, Cabin, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/sections/Nav";
import { SITE } from "./sitemap";

const display = Schibsted_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Cabin({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Aditi Agarwal — Product Designer & Design Engineer",
  description:
    "Product designer and design engineer in New Delhi taking B2B and healthtech products from research to shipped, high-fidelity UI. Selected work: FourCore, Formi, Conqr.ai.",
  openGraph: {
    title: "Aditi Agarwal — Product Designer & Design Engineer",
    description:
      "I research, design and build digital products: product design, design engineering, visual design and brand identity.",
    type: "website",
    url: SITE,
    siteName: "Aditi Agarwal",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
