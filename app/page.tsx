import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WeddingTeaser";
import ChiSiamo from "@/components/home/ChiSiamo";
import ServiziTeaser from "@/components/home/ServiziTeaser";
import Eventi from "@/components/home/Eventi";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";

export default function Page() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <ServiziTeaser />
      <Eventi />
      <Testimonials />
      <ChiSiamo />
      <ContactCTA />
    </>
  );
}
