// components/home/EventiTeaser.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

export default function EventiTeaser() {
  return (
    <section id="eventi" className="relative py-24 bg-slate-50">
      <Container>
        <div className="grid gap-10 md:gap-12 md:grid-cols-12 md:items-center">
          {/* Contenuto */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <p className="uppercase tracking-[0.25em] text-slate-500 mb-3">
              Eventi
            </p>

            <h2 className="text-3xl/tight md:text-4xl font-semibold text-slate-900">
              Non solo matrimoni:
              <br className="hidden sm:block" />
              feste ed eventi unici
            </h2>

            <p className="mt-4 text-slate-700">
              Compleanni, lauree, cene aziendali o party privati: portiamo
              la stessa energia dei nostri matrimoni anche nei tuoi eventi,
              con format flessibili e pacchetti personalizzabili.
            </p>

            <ul className="mt-6 space-y-2">
              {[
                "DJ set e vocalist per ogni tipo di evento",
                "Animazione e conduzione microfonica",
                "Effetti scenici e luci ad alto impatto",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-slate-900" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link href="/eventi" className="btn-primary text-base px-6 py-3">
                Scopri gli Eventi
              </Link>
              <Link href="/contatto" className="btn-secondary text-base px-6 py-3">
                Richiedi Preventivo
              </Link>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="relative md:col-span-7"
          >
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden ring-1 ring-slate-200">
              <Image
                src="/eventiSection.png" // reemplazalo con tu foto
                alt="Excalibur Eventi"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 via-transparent to-transparent" />
            </div>
          </motion.figure>
        </div>
      </Container>
    </section>
  );
}
