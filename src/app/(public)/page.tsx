import Hero from "@/components/home/Hero";
import SystemPreview from "@/components/home/SystemPreview";
import Stats from "@/components/home/Stats";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";
import LogoStrip from "@/components/home/LogoStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip/>
      <SystemPreview />
      <Stats />
      <Features />
      <CTA />
    </>
  );
}
