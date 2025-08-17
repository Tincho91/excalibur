// components/MobileMenu.tsx
"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // <- para secuenciar la salida de la espada
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const measureRef = useRef<HTMLDivElement>(null); // medidor oculto

  const [btnSize, setBtnSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [btnFixedW, setBtnFixedW] = useState<number | null>(null);
  const [menuW, setMenuW] = useState<number>(280);
  const [contentH, setContentH] = useState<number>(0);

  // timings
  const DROP_DUR = 0.28;       // caída de la espada (rebote)
  const EXPAND_DUR = 0.28;     // expansión/contracción del panel
  const dropOffset = (btnSize.h || 40) + 10; // distancia que cae la espada

  // espada
  const SWORD_W = 56;
  const SWORD_H = 56;

  // medir botón + ancho objetivo
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

  // medición oculta (a ancho final)
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

  // cerrar al click fuera
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        if (open) {
          // secuenciar cierre: primero menú, luego espada
          setIsClosing(true);
          setOpen(false);
          setTimeout(() => setIsClosing(false), EXPAND_DUR * 1000);
        }
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  // panel: sin desplazarse (ya nace a la altura de la espada), solo expande width/height tras el drop
  const menuVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: dropOffset,
        width: btnSize.w || 80,
        height: btnSize.h || 40,
      },
      animate: {
        opacity: 1,
        y: dropOffset,
        width: [btnSize.w || 80, menuW],
        height: [btnSize.h || 40, contentH || (btnSize.h || 40)],
        transition: {
          delay: DROP_DUR, // esperar a que la espada caiga
          duration: EXPAND_DUR,
          ease: "easeOut",
        },
        transitionEnd: { height: "auto" },
      },
      exit: {
        opacity: [1, 0.9, 0],
        y: dropOffset,
        width: [menuW, btnSize.w || 80],
        height: [contentH || (btnSize.h || 40), btnSize.h || 40],
        transition: {
          duration: EXPAND_DUR, // el panel se va primero
          ease: "easeIn",
        },
      },
    }),
    [btnSize.w, btnSize.h, menuW, contentH, dropOffset]
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
          if (!open) {
            if (measureRef.current) setContentH(measureRef.current.scrollHeight); // premedición
            setOpen(true);
          } else {
            // al cerrar: primero el menú, luego la espada
            setIsClosing(true);
            setOpen(false);
            setTimeout(() => setIsClosing(false), EXPAND_DUR * 1000);
          }
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

      {/* Medidor oculto para pre-calcular contentH a ancho final */}
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

      {/* ESPADA: cae y rebota; el panel aparece detrás. Mantenerla visible durante cierre con `isClosing`. */}
      <AnimatePresence>
        {(open || isClosing) && (
          <motion.div
            key="sword"
            className="absolute top-0 right-0 z-50 pointer-events-none"
            initial={{ y: 0, opacity: 0, rotate: -2 }}
            animate={{ y: dropOffset, opacity: 1, rotate: 0 }}
            exit={{ y: 0, opacity: 0, rotate: -2 }}
            transition={{
              // Al abrir: rebote inmediato; al cerrar: retrasar salida hasta que termine el panel
              type: open ? "spring" : "tween",
              stiffness: open ? 520 : undefined,
              damping: open ? 22 : undefined,
              mass: open ? 0.6 : undefined,
              duration: open ? DROP_DUR : DROP_DUR,
              delay: open ? 0 : EXPAND_DUR, // <- sale DESPUÉS del panel
              ease: open ? undefined : "easeInOut",
            }}
          >
            <Image
              src="/excaliburMobileMenu.png"
              alt="Excalibur"
              width={SWORD_W}
              height={SWORD_H}
              priority
              className="select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="absolute top-0 right-0 z-40 overflow-hidden ring-1 ring-slate-200 shadow-lg bg-white max-w-[92vw] rounded-l-2xl rounded-br-2xl"
            style={{
              transformOrigin: "right center",          // <- centro vertical del borde derecho
              boxSizing: "border-box",
              right: SWORD_W / 2,                       // <- alinear borde derecho del panel con el centro vertical de la espada
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={menuVariants}
          >
            {/* Contenido visible: aparece cuando empieza la expansión (tras la caída) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: DROP_DUR, duration: 0.18, ease: "easeOut" }}
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
                    onClick={() => {
                      // mismo patrón: primero panel, luego espada
                      setIsClosing(true);
                      setOpen(false);
                      setTimeout(() => setIsClosing(false), EXPAND_DUR * 1000);
                    }}
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