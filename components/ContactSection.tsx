// components/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

export default function ContactSection() {
  return (
    <section id="contatto" className="relative py-24 bg-white">
      <Container>
        <div className="grid gap-10 md:gap-12 md:grid-cols-12 md:items-start">
          {/* Testo / Info diretta */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5"
          >
            <p className="uppercase tracking-[0.25em] text-slate-500 mb-3">Contatto</p>
            <h2 className="text-3xl/tight md:text-4xl font-semibold text-slate-900">
              Parliamone senza impegno
            </h2>
            <p className="mt-3 text-slate-700">
              Raccontaci evento, data e location: ti rispondiamo velocemente con una proposta chiara.
            </p>

            <div className="mt-6 space-y-3 text-slate-800">
              <div>
                <div className="text-sm text-slate-500">Email</div>
                <a href="mailto:ciao@excalibur.it" className="font-medium hover:underline">
                  ciao@excalibur.it
                </a>
              </div>
              <div>
                <div className="text-sm text-slate-500">Telefono / WhatsApp</div>
                <a href="tel:+39000000000" className="font-medium hover:underline">
                  +39 000 000 0000
                </a>
              </div>
              <div>
                <div className="text-sm text-slate-500">Social</div>
                <div className="flex gap-4">
                  <a href="#" className="hover:underline">Instagram</a>
                  <a href="#" className="hover:underline">TikTok</a>
                  <a href="#" className="hover:underline">YouTube</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="md:col-span-7 rounded-3xl border border-slate-200 p-5 md:p-6 bg-white"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="col-span-1">
                <label className="block text-sm text-slate-600 mb-1">Nome</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm text-slate-600 mb-1">Telefono</label>
                <input
                  type="tel"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm text-slate-600 mb-1">Tipo di evento</label>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                  defaultValue="wedding"
                >
                  <option value="wedding">Matrimonio</option>
                  <option value="party">Festa privata</option>
                  <option value="corporate">Evento aziendale</option>
                  <option value="altro">Altro</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">Messaggio</label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="Data, location, atmosfera desiderata…"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">Invia richiesta</button>
              <a href="mailto:ciao@excalibur.it" className="btn-secondary">Scrivi via email</a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Compilando il modulo accetti il trattamento dei dati per rispondere alla tua richiesta.
            </p>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
