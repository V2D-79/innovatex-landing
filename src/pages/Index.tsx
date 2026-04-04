import { lazy, Suspense, useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ScrollProgress, FloatingParticles } from "@/components/ScrollProgress";
import { Loader } from "@/components/Loader";

const ObjectivesSection = lazy(() => import("@/components/ObjectivesSection").then(m => ({ default: m.ObjectivesSection })));
const AboutSection = lazy(() => import("@/components/AboutSection").then(m => ({ default: m.AboutSection })));
const DomainsSection = lazy(() => import("@/components/DomainsSection").then(m => ({ default: m.DomainsSection })));
const EventFlowSection = lazy(() => import("@/components/EventFlowSection").then(m => ({ default: m.EventFlowSection })));
const EvaluationSection = lazy(() => import("@/components/EvaluationSection").then(m => ({ default: m.EvaluationSection })));
const RulesSection = lazy(() => import("@/components/RulesSection").then(m => ({ default: m.RulesSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure the loader stays on screen long enough to show the animation and load UI components
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian font-sans">
      {isLoading && <Loader />}
      <ScrollProgress />
      <FloatingParticles />
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-obsidian"><div className="w-8 h-8 rounded-full border-t-2 border-primary animate-spin" /></div>}>
          <ObjectivesSection />
          <AboutSection />
          <DomainsSection />
          <EventFlowSection />
          <EvaluationSection />
          <RulesSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-64 bg-obsidian" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
