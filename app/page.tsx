import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Experience from "@/components/Experience";
import WhyChoose from "@/components/WhyChoose";
import Benefits from "@/components/Benefits";
import ServicesGrid from "@/components/ServicesGrid";
import Venues from "@/components/Venues";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <Experience />
        <WhyChoose />
        <Benefits />
        <ServicesGrid />
        <Venues />
        <FAQ />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
