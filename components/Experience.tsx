"use client";

import Container from "./Container";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section className="section bg-slate-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="aspect-video rounded-2xl bg-slate-200"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="uppercase tracking-widest text-amber-600 font-semibold">What it looks like…</p>
            <h2 className="h2 mb-4">The Experience</h2>
            <p className="p">
              Combine live mixing, tasteful MCing, and the right enhancements for a night your guests won’t forget.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
