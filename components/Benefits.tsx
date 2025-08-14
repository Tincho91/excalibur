import Container from "./Container";

const left = [
  "Liability Insurance",
  "Online Wedding Planner",
  "Transparent Pricing",
];
const right = [
  "Customizable Playlists",
  "Backup Talent & Equipment",
  "5‑Star Premium Service",
];

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">✓</span><span className="p">{children}</span></li>
  );
}

export default function Benefits() {
  return (
    <section className="section bg-slate-50">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="h2 mb-6">Benefits.</h2>
            <ul className="space-y-3">
              {left.map((t) => (<Check key={t}>{t}</Check>))}
            </ul>
          </div>
          <div className="md:pl-6">
            <ul className="space-y-3">
              {right.map((t) => (<Check key={t}>{t}</Check>))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
