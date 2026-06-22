import type { Metadata } from "next";
import { Anton, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "DE SALESVLOER — elke dag scherper",
  description:
    "Dagelijkse sales-intelligence, een playbook van keiharde verkooptechnieken en de methode achter de grootste hustle-marketing ontleed.",
  openGraph: {
    type: "website",
    siteName: "De Salesvloer",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${anton.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body className="grain flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
