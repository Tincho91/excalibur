"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "../layout/Container"

export default function Hero() {
  // Config
  const CUT_H = 96; // alto del triángulo de corte (px)
  const SWORD_W = 56; // tamaño de /public/excaliburMobileMenu.png
  const SWORD_H = 56;

  // Ajustes finos
  const ROTATE_OFFSET_DEG = 0; // ajuste de rotación si tu PNG tiene leve sesgo
  const Y_FINE_TUNE = -14; // + baja / - sube (px)
  const CENTER_OFFSET_Y = -SWORD_H / 2 + Y_FINE_TUNE;
  const CENTER_OFFSET_X = -55; // por si necesitás afinar en X

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Medición de la franja del corte
  const [stripW, setStripW] = useState(0);
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const measure = () => setStripW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Rotación para PNG que apunta hacia abajo: alinear eje vertical con la diagonal
  const rotateDeg =
    90 - (Math.atan2(CUT_H, stripW || 1) * 180) / Math.PI + ROTATE_OFFSET_DEG;

  // Progreso de scroll del hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Recorrido: derecha → izquierda (75% del ancho); Y acompaña la pendiente exacta
  const slope = CUT_H / (stripW || 1);
  const run = 0.75 * (stripW || 1);

  const x = useTransform(scrollYProgress, [0, 1], [CENTER_OFFSET_X, CENTER_OFFSET_X - run]);
  const y = useTransform(scrollYProgress, [0, 1], [CENTER_OFFSET_Y, CENTER_OFFSET_Y + slope * run]);

  return (
    <section
      ref={sectionRef}
      className="relative z-[200] h-[80vh] min-h-[520px] w-full"
    >
      {/* Fondo */}
      <Image
        src="/hero.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 overlay-gradient" />

      {/* Contenido */}
      <Container className="relative flex h-full items-end pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-white"
        >
          <p className="uppercase tracking-[0.25em] text-white/80 mb-3">
            Great music & a packed dance floor
          </p>
          <h1 className="h1 text-white">BEST. WEDDING. EVER.</h1>
          <div className="mt-8 flex gap-4">
            <a href="#contact" className="btn-primary">Get Pricing</a>
            <a href="#what-we-do" className="btn-ghost">What we do</a>
          </div>
        </motion.div>
      </Container>

      {/* Corte inferior en ángulo (no tapa la espada) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full z-10"
        style={{ height: CUT_H }}
      >
        <div
          className="h-full w-full bg-white"
          style={{ clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)" }}
        />
      </div>

      {/* Banda del corte: la espada se mueve dentro de esta franja.
          Importante: el section YA NO usa overflow-hidden, así la espada puede sobresalir.
          También elevamos z para que nada la tape. */}
      <div
        ref={stripRef}
        className="absolute bottom-0 left-0 w-full pointer-events-none z-[300]"
        style={{ height: CUT_H }}
      >
        {stripW > 0 && (
          <motion.div
            aria-hidden
            className="absolute z-[310] will-change-transform"
            style={{ top: 0, right: 0, rotate: rotateDeg, x, y }}
          >
            <Image
              src="/excaliburMobileMenu.png"
              alt=""
              width={SWORD_W}
              height={SWORD_H}
              priority
              className="select-none"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}