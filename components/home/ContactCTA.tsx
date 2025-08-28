import Container from "../layout/Container";

export default function ContactCTA() {
  return (
    <section id="contact" className="section">
      <Container>
        <div className="rounded-2xl bg-slate-900 text-white p-10 md:p-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="h2 text-white">Pricing & Availability</h2>
              <p className="p text-white/80 mt-2">Limited availability for upcoming dates. Now booking next season.</p>
            </div>
            <div className="flex md:justify-end gap-4">
              <a href="#" className="btn-primary">Schedule a Meeting</a>
              <a href="mailto:hello@example.com" className="btn-ghost">Email Us</a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
