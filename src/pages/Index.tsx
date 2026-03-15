import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import { AboutSection } from "@/components/AboutSection";
import { DomainsSection } from "@/components/DomainsSection";
import { EventFlowSection } from "@/components/EventFlowSection";
import { EvaluationSection } from "@/components/EvaluationSection";
import { RulesSection } from "@/components/RulesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollProgress, FloatingParticles } from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-obsidian font-sans">
      <ScrollProgress />
      <FloatingParticles />
      <Navbar />
      <main>
        <HeroSection />
        <ObjectivesSection />
        <AboutSection />
        <DomainsSection />
        <EventFlowSection />
        <EvaluationSection />
        <RulesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
