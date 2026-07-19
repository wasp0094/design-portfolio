import type { Metadata } from "next";
import { Bricolage_Grotesque, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const body = Archivo({
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
  title: "Aditi Agarwal — Product & UI/UX Designer",
  description:
    "Product & UI/UX designer in New Delhi taking B2B and healthtech products from research to shipped, high-fidelity UI. Selected work: Formi, Conqr.ai, Autumn.",
  openGraph: {
    title: "Aditi Agarwal — Product & UI/UX Designer",
    description:
      "Turning ambiguous problems into interfaces people actually use. Design systems, two-sided products, and calm healthtech UI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
