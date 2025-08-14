"use client";
import { useState } from "react";
import Container from "./Container";

const faqs = [
  {
    q: "Pricing?",
    a: "Wedding packages begin at $2,650 (example text). Enhancements are à la carte.",
  },
  {
    q: "Do you speak Spanish?",
    a: "Sí, bilingual DJ+MC available (placeholder).",
  },
  {
    q: "What's your DJ style?",
    a: "High energy, classy, modern, elegant (placeholder).",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" id="faq">
      <Container>
        <div className="text-center mb-10">
          <h2 className="h2">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl ring-1 ring-slate-200 bg-white">
          {faqs.map((f, idx) => (
            <details key={f.q} className="group p-6" open={open === idx} onToggle={(e) => e.currentTarget.open && setOpen(idx)}>
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="font-semibold">{f.q}</span>
                <span className="ml-4 select-none text-slate-400 group-open:rotate-180 transition">⌄</span>
              </summary>
              <p className="p mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
