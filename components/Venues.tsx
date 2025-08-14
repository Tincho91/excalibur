import Image from "next/image";
import Container from "./Container";

const venues = [
  { name: "Venue One", img: "/venue-1.jpg" },
  { name: "Venue Two", img: "/venue-2.jpg" },
  { name: "Venue Three", img: "/venue-3.jpg" },
];

export default function Venues() {
  return (
    <section className="section bg-slate-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="h2">Venues</h2>
          <p className="p">We recently rocked weddings at…</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {venues.map((v) => (
            <figure key={v.name} className="overflow-hidden rounded-2xl ring-1 ring-slate-200/70 bg-white">
              <div className="relative aspect-[4/3]">
                <Image src={v.img} alt={v.name} fill className="object-cover" />
              </div>
              <figcaption className="p-4 font-semibold">{v.name}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
