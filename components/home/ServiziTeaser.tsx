// components/home/ServiziTeaser.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

type Service = {
  key: string;
  title: string;
  desc: string;
  img?: string;
};

const services: Service[] = [
  {
    key: "dj",
    title: "DJ",
    desc: "Selezione musicale dinamica e lettura della sala.",
    img: "/dj.jpg",
  },
  {
    key: "vocalist",
    title: "Vocalist",
    desc: "Voce, conduzione e coinvolgimento del pubblico.",
    img: "/vocalist.jpg",
  },
  {
    key: "effetti",
    title: "Effetti Speciali",
    desc: "Fontane fredde, nuvole basse, CO₂, sparkular.",
    img: "/effetti.jpg",
  },
  {
    key: "luci",
    title: "Luci & Visual",
    desc: "Uplight, monogrammi, schermi 4K, scenografie.",
    img: "/luci.jpg",
  },
  {
    key: "live",
    title: "Musicisti Live",
    desc: "Sax, violino, band e voce femminile con il DJ set.",
    img: "/live.jpg",
  },
];

export default function ServiziTeaser() {
  return (
    <section id="servizi" className="relative py-24">
      {/* Fondo distintivo: banda diagonale molto leggera */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(12deg, rgba(2,6,23,0.035) 0%, rgba(2,6,23,0.0) 38%), radial-gradient(120% 80% at 80% 0%, rgba(2,6,23,0.05), rgba(2,6,23,0))",
        }}
      />

      <Container>
        {/* Header centrato con “accent bar” */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="uppercase tracking-[0.25em] text-slate-500 mb-3">Servizi</p>
          <h2 className="text-3xl/tight md:text-4xl font-semibold text-slate-900">
            Moduli flessibili, setup su misura
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-slate-900/80" />
          <p className="mt-4 text-slate-700">
            Componiamo il tuo evento con i blocchi giusti: musica, voce, effetti e visual
            che lavorano insieme senza appesantire l’esperienza.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="rounded-full bg-white ring-1 ring-slate-200 px-3 py-1">Pacchetti personalizzabili</span>
            <span className="rounded-full bg-white ring-1 ring-slate-200 px-3 py-1">Setup scalabile</span>
            <span className="rounded-full bg-white ring-1 ring-slate-200 px-3 py-1">Coordinamento con la location</span>
          </div>
        </motion.div>

        {/* Layout distintivo:
            - Primo card “featured” wide (col-span-2)
            - Sotto, righe con mosaic responsivo
            - Mobile: slider orizzontale soft (scroll-snap) */}
        <div className="mt-12 hidden md:grid grid-cols-12 gap-6">
          {/* Featured wide */}
          <CardFeatured service={services[0]} className="col-span-12 lg:col-span-8" />
          {/* Stack laterale */}
          <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6">
            <Card service={services[1]} />
            <Card service={services[2]} />
          </div>

          {/* Riga inferiore a 3 */}
          <div className="col-span-12 grid md:grid-cols-3 gap-6">
            <Card service={services[3]} />
            <Card service={services[4]} />
            {/* CTA tile */}
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Non sai da dove iniziare?</h3>
                <p className="mt-2 text-slate-600">
                  Ti guidiamo noi nella scelta. Poche domande, risposta veloce e proposta chiara.
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href="/servizi" className="btn-secondary">Vedi tutti</Link>
                <Link href="/contatto" className="btn-primary">Richiedi Preventivo</Link>
              </div>
            </motion.article>
          </div>
        </div>

        {/* Mobile: carousel orizzontale con snap */}
        <div className="mt-10 md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[services[0], services[1], services[2], services[3], services[4]].map((s, i) =>
              i === 0 ? (
                <CardFeatured key={s.key} service={s} className="snap-start min-w-[85%]" />
              ) : (
                <Card key={s.key} service={s} className="snap-start min-w-[75%]" />
              )
            )}
            {/* CTA tile */}
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="snap-start min-w-[75%] relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Serve una mano?</h3>
                <p className="mt-1.5 text-slate-600">
                  Ti consigliamo il setup migliore in base all’evento.
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="/servizi" className="btn-secondary px-3 py-2 text-sm">Vedi tutti</Link>
                <Link href="/contatto" className="btn-primary px-3 py-2 text-sm">Preventivo</Link>
              </div>
            </motion.article>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Card({
  service,
  className = "",
}: {
  service: Service;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white ${className}`}
    >
      <div className="relative aspect-[4/3]">
        {service.img ? (
          <Image
            src={service.img}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,rgba(2,6,23,0.12),rgba(2,6,23,0))]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
        <p className="mt-1.5 text-sm text-slate-600">{service.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <Link href={`/servizi#${service.key}`} className="text-sm font-medium text-slate-900 hover:underline">
            Dettagli
          </Link>
          <Link href="/contatto" className="btn-secondary px-3 py-1.5 text-sm">
            Preventivo
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function CardFeatured({
  service,
  className = "",
}: {
  service: Service;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white ${className}`}
    >
      <div className="relative aspect-[21/9]">
        {service.img ? (
          <Image
            src={service.img}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,rgba(2,6,23,0.12),rgba(2,6,23,0))]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Badge + contenuto su barra flottante */}
      <div className="absolute left-5 right-5 bottom-5">
        <div className="backdrop-blur-sm bg-white/80 ring-1 ring-slate-200 rounded-2xl px-5 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium tracking-wide uppercase text-slate-500">Featured</div>
            <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{service.desc}</p>
          </div>
          <div className="shrink-0 flex gap-2">
            <Link href={`/servizi#${service.key}`} className="btn-secondary px-4 py-2 text-sm">
              Dettagli
            </Link>
            <Link href="/contatto" className="btn-primary px-4 py-2 text-sm">
              Preventivo
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}