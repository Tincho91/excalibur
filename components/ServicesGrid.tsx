import Image from "next/image";
import Container from "./Container";

const services = [
  { title: "Sparklers", img: "/service-1.jpg" },
  { title: "Live Musicians", img: "/service-2.jpg" },
  { title: "Dancing on the Clouds", img: "/service-3.jpg" },
  { title: "Lighting", img: "/service-4.jpg" },
  { title: "Robot", img: "/service-1.jpg" },
  { title: "CO₂ Blasters", img: "/service-2.jpg" },
  { title: "Hedge Wall", img: "/service-3.jpg" },
  { title: "Strings", img: "/service-4.jpg" },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="section">
      <Container>
        <div className="text-center mb-10">
          <h2 className="h2">Services</h2>
          <p className="p">Enhancements to elevate your celebration.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <figure key={s.title} className="group overflow-hidden rounded-2xl ring-1 ring-slate-200/70 bg-white">
              <div className="relative aspect-[4/3]">
                <Image src={s.img} alt={s.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <figcaption className="p-4 font-semibold">{s.title}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
