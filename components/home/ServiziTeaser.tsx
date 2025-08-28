// components/home/ServiziTeaser.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";

type Service = {
  key: string;
  title: string;
  desc: string;
  img?: string;
};

const services: Service[] = [
  { key: "dj",       title: "DJ",               desc: "Selezione musicale dinamica e lettura della sala.",          img: "/serviziDJ.png" },
  { key: "vocalist", title: "Vocalist",         desc: "Voce, conduzione e coinvolgimento del pubblico.",            img: "/serviziVocalist.png" },
  { key: "effetti",  title: "Effetti Speciali", desc: "Fontane fredde, nuvole basse, CO₂, sparkular.",              img: "/serviziEffetti.png" },
  { key: "luci",     title: "Luci & Visual",    desc: "Uplight, monogrammi, schermi 4K, scenografie.",              img: "/serviziLuciVisual.png" },
  { key: "live",     title: "Musicisti Live",   desc: "Sax, violino, band e voce femminile con il DJ set.",         img: "/serviziMusicisti.png" },
];

const MAX_W = 1280;
const AUTO_MS = 6000;
const BP_MD = 1024;

// Potencia del swipe: más estable que sólo offset
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * Math.abs(velocity);
const SWIPE_CONFIDENCE = 4500;

export default function ServiziTeaser() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoKey, setAutoKey] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const go = useCallback((d: number) => {
    setIndex((i) => (i + d + services.length) % services.length);
  }, []);

  const paginate = (delta: number) => {
    setDir(delta);
    go(delta);
    setAutoKey((k) => k + 1); // reinicia auto-slide al interactuar
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => paginate(1), AUTO_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoKey, paused]);

  const dragEnabled = w > 0 && w <= BP_MD;

  const variants = useMemo(
    () => ({
      enter: (d: number) => ({ x: d > 0 ? w : -w, opacity: 0.6, scale: 0.98 }),
      center: { x: 0, opacity: 1, scale: 1 },
      exit: (d: number) => ({ x: d < 0 ? w : -w, opacity: 0.6, scale: 0.98 }),
    }),
    [w]
  );

  // teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="servizi" className="relative bg-white">
      <Container className="pt-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.25em] text-slate-500 mb-3">Servizi</p>
          <h2 className="text-3xl/tight md:text-4xl font-semibold text-slate-900">
            Moduli flessibili, setup su misura
          </h2>
          <p className="mt-3 text-slate-700">
            Scorri tra i servizi principali. Auto-slide attivo, swipe su dispositivi touch.
          </p>
        </div>
      </Container>

      <div className="relative mx-auto mt-8 w-full" style={{ maxWidth: MAX_W }}>
        <div
          ref={wrapRef}
          className="relative mx-auto w-full h-[80vh] min-h-[540px] overflow-hidden rounded-none md:rounded-3xl border-0 md:border border-slate-200"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.article
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Slide service={services[index]} />
            </motion.article>
          </AnimatePresence>

          {/* Drag layer: sólo md- y abajo, con snap al origen y touch-action correcta */}
          <motion.div
            className="absolute inset-0"
            style={{ touchAction: "pan-y", pointerEvents: dragEnabled ? "auto" : "none" }}
            drag={dragEnabled ? "x" : false}
            dragElastic={0.12}
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0 }}        // <- vuelve al origen
            dragSnapToOrigin                                // <- asegura snap
            onDragEnd={(_, info) => {
              const power = swipePower(info.offset.x, info.velocity.x);
              if (info.offset.x < 0 && power > SWIPE_CONFIDENCE) paginate(1);
              else if (info.offset.x > 0 && power > SWIPE_CONFIDENCE) paginate(-1);
            }}
          />

          {/* Flechas grandes */}
          <button
            aria-label="Slide precedente"
            onClick={() => paginate(-1)}
            className="group absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur px-4 py-4 ring-1 ring-slate-300 hover:bg-white shadow-md z-10"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" className="text-slate-900">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            aria-label="Slide successiva"
            onClick={() => paginate(1)}
            className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur px-4 py-4 ring-1 ring-slate-300 hover:bg-white shadow-md z-10"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" className="text-slate-900">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 z-10">
            {services.map((_, i) => (
              <button
                key={i}
                aria-label={`Vai a slide ${i + 1}`}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                  setAutoKey((k) => k + 1);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-slate-900" : "w-3 bg-white/85 ring-1 ring-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ service }: { service: Service }) {
  return (
    <div className="relative h-full w-full">
      {/* media */}
      <div className="absolute inset-0">
        {service.img ? (
          <Image
            src={service.img}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,rgba(2,6,23,0.12),rgba(2,6,23,0))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      </div>

      {/* panel */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <div className="mx-auto w-full max-w-[720px] rounded-2xl bg-white/85 backdrop-blur ring-1 ring-slate-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-medium tracking-wide uppercase text-slate-600">Servizio</div>
              <h3 className="text-2xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-1.5 text-slate-700">{service.desc}</p>
            </div>
            <div className="shrink-0 hidden sm:flex gap-2">
              <Link href={`/servizi#${service.key}`} className="btn-secondary px-4 py-2 text-sm">Dettagli</Link>
              <Link href="#contatto" className="btn-primary px-4 py-2 text-sm">Preventivo</Link>
            </div>
          </div>
          <div className="mt-4 sm:hidden flex gap-2">
            <Link href={`/servizi#${service.key}`} className="btn-secondary w-full">Dettagli</Link>
            <Link href="#contatto" className="btn-primary w-full">Preventivo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}