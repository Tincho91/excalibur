// components/MobileMenu.tsx
"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const measureRef = useRef<HTMLDivElement>(null); // medidor oculto

  const [btnSize, setBtnSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [btnFixedW, setBtnFixedW] = useState<number | null>(null);
  const [menuW, setMenuW] = useState<number>(280);
  const [contentH, setContentH] = useState<number>(0);

  const TOTAL = 0.38;
  const STEP = 0.45;
  const DELAY_EXPAND = TOTAL * STEP;

  // Medir botón y ancho objetivo del menú
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setBtnSize({ w: rect.width, h: rect.height });
    setBtnFixedW(rect.width);

    const handleResize = () => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 480;
      const max = Math.min(320, vw - 16);
      setMenuW(Math.max(240, max));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Medición oculta a ancho final (mantener contentH fresco cuando cambie menuW)
  useLayoutEffect(() => {
    const measure = () => {
      if (measureRef.current) setContentH(measureRef.current.scrollHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (measureRef.current) ro.observe(measureRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [menuW]);

  // Cerrar al click fuera
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Variants: 1) baja btnH+10, 2) expande width/height; cierre exacto inverso
  const menuVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: 0,
        width: btnSize.w || 80,
        height: btnSize.h || 40,
        borderRadius: 16,
      },
      animate: {
        opacity: [0, 1, 1],
        y: [0, (btnSize.h || 40) + 10, (btnSize.h || 40) + 10],
        width: [btnSize.w || 80, btnSize.w || 80, menuW],
        height: [btnSize.h || 40, btnSize.h || 40, (contentH || btnSize.h || 40)],
        transition: { duration: TOTAL, times: [0, STEP, 1], ease: "easeOut" },
        transitionEnd: { height: "auto" },
      },
      exit: {
        opacity: [1, 1, 0],
        y: [(btnSize.h || 40) + 10, (btnSize.h || 40) + 10, 0],
        width: [menuW, btnSize.w || 80, btnSize.w || 80],
        height: [(contentH || btnSize.h || 40), btnSize.h || 40, btnSize.h || 40],
        transition: { duration: TOTAL, times: [0, 1 - STEP, 1], ease: "easeIn" },
      },
    }),
    [btnSize.w, btnSize.h, menuW, contentH]
  );

  return (
    <div className="md:hidden relative" ref={wrapRef}>
      <button
        ref={btnRef}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="btn-ghost rounded-xl transition-transform active:scale-95 relative overflow-hidden"
        onClick={() => {
          if (!open && measureRef.current) {
            // Pre-medición sincrónica antes de abrir (evita salto en el primer click)
            setContentH(measureRef.current.scrollHeight);
          }
          setOpen((v) => !v);
        }}
        style={btnFixedW ? { width: btnFixedW } : undefined}
      >
        <span className="inline-flex relative h-5 items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            {!open ? (
              <motion.span
                key="label-menu"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, rotate: -2 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                Menu
              </motion.span>
            ) : (
              <motion.span
                key="label-close"
                initial={{ opacity: 0, rotate: 90, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="block"
                aria-hidden
              >
                ✕
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      {/* Medidor oculto para pre‑calcular contentH a ancho final */}
      <div
        ref={measureRef}
        className="fixed -left-[9999px] -top-[9999px] py-2 px-4"
        style={{ width: menuW, boxSizing: "border-box" }}
      >
        <nav className="flex flex-col gap-1 text-slate-700">
          {[
            ["Home", "#top"],
            ["Weddings", "#what-we-do"],
            ["Photo Booths", "#services"],
            ["Services", "#services"],
            ["Contact", "#contact"],
            ["About", "#why-choose"],
          ].map(([label]) => (
            <span key={label} className="rounded-xl px-4 py-3 text-center text-lg font-medium">
              {label}
            </span>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="absolute top-0 right-0 z-40 overflow-hidden ring-1 ring-slate-200 shadow-lg bg-white max-w-[92vw]"
            style={{ borderRadius: 16, transformOrigin: "top right", boxSizing: "border-box" }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={menuVariants}
          >
            {/* Contenido visible: aparece cuando empieza la expansión */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: DELAY_EXPAND, duration: 0.18, ease: "easeOut" }}
              className="py-2 px-4"
              style={{ width: menuW }}
            >
              <nav className="flex flex-col gap-1 text-slate-700">
                {[
                  ["Home", "#top"],
                  ["Weddings", "#what-we-do"],
                  ["Photo Booths", "#services"],
                  ["Services", "#services"],
                  ["Contact", "#contact"],
                  ["About", "#why-choose"],
                ].map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-center text-lg font-medium hover:bg-slate-100 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}