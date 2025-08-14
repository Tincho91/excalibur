"use client";

import { motion } from "framer-motion";
import Container from "./Container";

const items = [
  {
    title: "Wedding DJs+MCs",
    text: "Talented professionals that pack dance floors.",
  },
  {
    title: "Special Effects",
    text: "Breathtaking visual spectacles that will dazzle.",
  },
  {
    title: "Photo Booths",
    text: "Entertainment both on and off the dance floor.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="section">
      <Container>
        <div className="text-center mb-10">
          <p className="uppercase tracking-widest text-amber-600 font-semibold">What we do</p>
          <h2 className="h2">Services at a glance</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="card"
            >
              <div className="h-40 w-full rounded-xl bg-slate-100 mb-4" />
              <h3 className="h3 mb-2">{item.title}</h3>
              <p className="p">{item.text}</p>
              <div className="mt-4">
                <a href="#services" className="text-amber-600 font-semibold">Learn More →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
