import Container from "./Container";

const testimonials = [
  {
    name: "Alex & Jamie",
    text: "An unforgettable night! Everyone danced till the end.",
  },
  {
    name: "Taylor & Morgan",
    text: "Professional, fun, and stress‑free. 10/10!",
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-slate-50" id="testimonials">
      <Container>
        <div className="text-center mb-10">
          <h2 className="h2">Our Clients</h2>
          <p className="p">What they say about us.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="card">
              <p className="p">“{t.text}”</p>
              <footer className="mt-4 font-semibold">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
