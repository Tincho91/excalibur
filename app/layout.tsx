import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Excalibur – Agenzia Familiare di Eventi Ricreativi",
  description:
    "Excalibur è un'agenzia familiare dedicata a creare esperienze indimenticabili per eventi ricreativi, con un approccio personale e accogliente. Sito in costruzione.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
