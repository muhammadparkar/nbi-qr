import type { Metadata } from "next";
import { Archivo, Lora } from "next/font/google";
import { SiteNav, SiteFooter } from "./ui";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NBI (PVT) LTD — New Badriya Industries | Authentic Sri Lankan Spices Since 1987",
  description:
    "New Badriya Industries — premium manufacturer & exporter of authentic Sri Lankan spices since 1987. Curry powders, masalas, Ceylon tea and customized spice blends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FBFAF7] text-nbidark font-sans">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
