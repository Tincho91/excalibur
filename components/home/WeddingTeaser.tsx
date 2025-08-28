// components/home/WeddingHeroTeaser.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

export default function WeddingHeroTeaser() {
  return (
    <section id="wedding" className="relative py-28 bg-white">
      <Container>
        <div className="grid gap-10 md:gap-12 md:grid-cols-12 md:items-center">
          {/* VISUAL DOMINANTE */}
          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="relative md:col-span-7"
          >
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden ring-1 ring-slate-200">
              {/* Reemplaza /wedding-hero.jpg por tu imagen */}
              <Image
                src="/hero.jpg"
                alt="Excalibur Wedding – energia in pista"
                fill
                className="object-cover"
                priority
              />
              {/* Layer estetico */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 via-transparent to-transparent" />
            </div>

            {/* Etiquetas superpuestas */}
            <div className="pointer-events-none absolute left-4 bottom-4 sm:left-6 sm:bottom-6 flex flex-wrap gap-2">
              {["DJ & Vocalist", "Pista sempre piena", "Effetti & Luci"].map((t) => (
                <span
                  key={t}
                  className="pointer-events-auto rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-medium text-slate-900 ring-1 ring-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.figure>

          {/* CONTENUTO + CTA ENFATIZZATO */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="md:col-span-5"
          >
            <p className="uppercase tracking-[0.25em] text-slate-500 mb-3">Wedding</p>

            <h2 className="text-4xl/tight md:text-5xl font-semibold text-slate-900">
              La colonna sonora
              <br className="hidden sm:block" />
              del vostro sì
            </h2>

            <p className="mt-4 text-slate-700">
              Dalla cerimonia al party: musica, voce ed effetti che seguono il ritmo del vostro
              matrimonio. Coordinamento con location e fornitori per una timeline senza stress.
            </p>

            {/* Micro-punti rapidi */}
            <ul className="mt-6 space-y-2">
              {[
                "Playlist su misura, momenti curati al minuto",
                "DJ & Vocalist in sinergia costante",
                "Fontane fredde, nuvole basse, uplight, monogrammi, schermi 4K",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-slate-900" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA ENFATIZZATO */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link href="/wedding" className="btn-primary text-base px-6 py-3">
                Scopri di più
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}