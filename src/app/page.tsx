"use client";

import CTA from "@/components/cta";
import DemoPreview from "@/components/demo-preview";
import Features from "@/components/features";
import Footer from "@/components/footer";
import GsapExample from "@/components/gsap-example";
import Hero from "@/components/hero";
import MotionExample from "@/components/motion-example";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <DemoPreview />
      <Pricing />
      <Testimonials />
      <CTA />
      <MotionExample />
      <GsapExample />
      <Footer />
    </main>
  );
}
