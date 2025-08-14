import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barr Entertainment – Layout Clone (Demo)",
  description: "Landing base using Next.js + Tailwind + Framer Motion"
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
