import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Excalibur – Agenzia Familiare di Eventi Ricreativi",
  description:
    "Excalibur è un'agenzia familiare dedicata a creare esperienze indimenticabili per eventi ricreativi, con un approccio personale e accogliente. Sito in costruzione.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="h-full">
      <body className="bg-white text-slate-900 antialiased min-h-full">
        {/* Skip link per accessibilità */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow ring-1 ring-slate-300"
        >
          Salta al contenuto
        </a>

        {/* Navbar globale (fixed) */}
        <Navbar />

        {/* Contenuto */}
        <main id="main" className="pt-16">
          {children}
        </main>

        {/* Footer globale */}
        <ContactSection />

        {/* Footer globale */}
        <Footer />
      </body>
    </html>
  );
}
