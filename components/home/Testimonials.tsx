// components/home/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Pista sempre piena e gestione perfetta dei momenti: dal taglio torta al party finale, tutto impeccabile.",
    name: "Giulia & Marco",
    role: "Matrimonio",
  },
  {
    quote:
      "DJ e Vocalist super: energia, empatia e selezione musicale su misura. Gli ospiti ci scrivono ancora!",
    name: "Alessandra",
    role: "Evento Privato – Compleanno",
  },
  {
    quote:
      "Coordinamento con location e fornitori perfetto. Zero stress, risultato top anche a livello audio/luci.",
    name: "Francesco",
    role: "Cena Aziendale",
  },
  {
    quote:
      "Effetti speciali e luci hanno trasformato la sala: atmosfera elegante e momenti wow senza eccessi.",
    name: "Sara & Luca",
    role: "Matrimonio",
  },
  {
    quote:
      "Tempistiche rispettate al minuto, introduzioni microfoniche discrete e sempre al servizio dell’evento.",
    name: "Chiara",
    role: "Laurea – Festa con amici",
  },
  {
    quote:
      "Playlist ragionata, remix al momento e lettura della sala pazzesca: nessuno voleva andare a casa.",
    name: "Davide",
    role: "Evento Privato",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-white">
      {/* Fondo leggero per distinguere la sezione senza appesantire */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(100% 60% at 80% 0%, rgba(2,6,23,0.05), rgba(2,6,23,0))",
        }}
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="uppercase tracking-[0.25em] text-slate-500 mb-3">Recensioni</p>
          <h2 className="text-3xl/tight md:text-4xl font-semibold text-slate-900">
            Dicono di noi
          </h2>
          <p className="mt-4 text-slate-700">
            Qualche parola da chi ha già vissuto un evento con Excalibur. Cura dei
            dettagli, energia giusta e un flusso che fa la differenza.
          </p>
        </motion.div>

        {/* Griglia con animazione a “stagger” */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="h-full rounded-3xl border border-slate-200 bg-white p-6"
            >
              {/* Stars semplici */}
              <div className="flex items-center gap-1 text-slate-900">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} aria-hidden>★</span>
                ))}
                <span className="sr-only">5 su 5</span>
              </div>

              <blockquote className="mt-3 text-slate-800">
                “{t.quote}”
              </blockquote>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">{t.name}</div>
                  {t.role && (
                    <div className="text-sm text-slate-600">{t.role}</div>
                  )}
                </div>

                {/* Badge sottile */}
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                  Evento reale
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA discreta sotto le recensioni */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 justify-center"
        >
          <a href="/contatto" className="btn-primary">Richiedi Preventivo</a>
          <a href="/wedding" className="btn-secondary">Vedi il Wedding</a>
        </motion.div>
      </Container>
    </section>
  );
}