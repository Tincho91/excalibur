"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import MobileMenu from "./MobileMenu";
import Container from "./Container";

export default function Navbar() {
  const { scrollY } = useScroll();

  // Opacidad del fondo: sólida arriba (1) → se desvanece al bajar
  const alpha = useTransform(scrollY, [0, 60, 120, 200], [1, 0.95, 0.90, 0.85]);
  const backgroundColor = useMotionTemplate`rgba(2, 6, 23, ${alpha})`;

  // Blur/Glass y sombra aumentan ligeramente al hacer scroll
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(6px)"]);
  const shadow = useTransform(scrollY, [0, 120], ["0 0 0 0 rgba(0,0,0,0)", "0 8px 24px 0 rgba(2,6,23,0.25)"]);

  return (
    <motion.header
      id="top"
      style={{
        backgroundColor,
        backdropFilter: blur as any,
        WebkitBackdropFilter: blur as any,
        boxShadow: shadow as any,
      }}
      className="fixed inset-x-0 top-0 z-[999] will-change-[background-color,backdrop-filter,box-shadow]"
    >
      <Container className="flex h-16 items-center justify-between transition-[height] duration-300">
        <Link href="#top" className="flex items-center gap-2 text-white">
          <div className="h-8 w-8 rounded-full bg-white" />
          <span className="font-bold tracking-wide">Excalibur</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-white/90">
          <Link href="#what-we-do" className="hover:text-white transition-colors">Weddings</Link>
          <Link href="#services" className="hover:text-white transition-colors">Photo Booths</Link>
          <Link href="#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="#why-choose" className="hover:text-white transition-colors">About</Link>
          <Link href="#contact" className="btn-ghost">Get Pricing</Link>
        </nav>

        <MobileMenu />
      </Container>
    </motion.header>
  );
}
