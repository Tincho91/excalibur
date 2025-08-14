import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <Container className="py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white" />
            <span className="font-semibold">YourBrand</span>
          </div>
          <nav className="flex flex-wrap gap-4 text-white/80">
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </nav>
          <div className="text-sm text-white/60">© {new Date().getFullYear()} YourBrand</div>
        </div>
      </Container>
    </footer>
  );
}
