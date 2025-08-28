import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <Container className="py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white" />
            <span className="font-semibold">Excalibur</span>
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-4 text-white/80">
            <Link href="/wedding" className="hover:text-white">Wedding</Link>
            <Link href="/servizi" className="hover:text-white">Servizi</Link>
            <Link href="/eventi" className="hover:text-white">Eventi</Link>
            <Link href="#contatto" className="hover:text-white">Contatto</Link>
            <Link href="#" className="hover:text-white">Termini</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
          </nav>

          {/* Copyright */}
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Excalibur
          </div>
        </div>
      </Container>
    </footer>
  );
}
