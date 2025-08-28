// components/home/ChiSiamo.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

export default function ChiSiamo() {
  return (
    <section className="relative py-20 bg-white">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Testo */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="uppercase tracking-[0.25em] text-slate-500 mb-3">
              Chi siamo
            </p>
            <h2 className="text-3xl/tight md:text-4xl font-semibold text-slate-900">
              Excalibur: intrattenimento con cuore di famiglia
            </h2>
            <p className="mt-4 text-slate-700">
              Siamo un’agenzia familiare di eventi. Uniamo professionalità e
              calore umano per creare esperienze che restino davvero nella memoria:
              matrimoni, feste private ed eventi aziendali.
            </p>

            {/* Pillars */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ["Affidabilità", "Timeline chiara, zero stress."],
                ["Creatività", "Musica, luci ed effetti su misura."],
                ["Vicino a te", "Ascolto, consigli e supporto."],
              ].map(([title, desc]) => (
                <motion.div
                  key={title}
                  className="rounded-2xl border border-slate-200 p-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-sm font-semibold text-slate-900">{title}</div>
                  <div className="text-sm text-slate-600 mt-1">{desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contatto" className="btn-primary">Parla con Noi</a>
            </div>
          </motion.div>

          {/* Immagine / placeholder visual coerente con la estetica actual */}
          <motion.div
            className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 bg-[radial-gradient(ellipse_at_top,rgba(2,6,23,0.08),rgba(2,6,23,0))]"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {/* Si tienes una imagen del team, reemplaza este block con <Image .../> */}
            <Image
              src="/chiSiamoSection.png" // reemplazalo con tu foto
              alt="Excalibur Eventi"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}