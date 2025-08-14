"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./Container";

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[520px] w-full">
      <Image 
        src="/hero.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 overlay-gradient" />
      <Container className="relative flex h-full items-end pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-white"
        >
          <p className="uppercase tracking-[0.25em] text-white/80 mb-3">Great music & a packed dance floor</p>
          <h1 className="h1 text-white">BEST. WEDDING. EVER.</h1>
          <div className="mt-8 flex gap-4">
            <a href="#contact" className="btn-primary">Get Pricing</a>
            <a href="#what-we-do" className="btn-ghost">What we do</a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
