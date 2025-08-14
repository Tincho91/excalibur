import Container from "./Container";

const blocks = [
  {
    title: "The Talent",
    text:
      "Our mission is simple: deliver an unforgettable wedding experience, ignited by incredible music with talented DJs and charismatic MCs.",
  },
  {
    title: "The Service",
    text:
      "Dynamic light shows and special effects synchronized to music, optional live musicians, and custom photo booths for extra fun.",
  },
  {
    title: "The Result",
    text:
      "Premium, luxury-minded service with attention to detail. Great music, great vibes — the best wedding ever.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="section">
      <Container>
        <div className="text-center mb-10">
          <p className="uppercase tracking-widest text-amber-600 font-semibold">Why Choose Us…</p>
          <h2 className="h2">What sets us apart</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.title} className="card">
              <h3 className="h3 mb-2">{b.title}</h3>
              <p className="p">{b.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
