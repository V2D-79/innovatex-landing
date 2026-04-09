import { FadeIn } from "@/components/FadeIn";
import { ShieldCheck } from "lucide-react";

const rules = [
  "Each team must consist of 3 to 4 members.",
  "College ID Card is compulsory for all participants.",
  "Teams must register before the deadline.",
  "Teams must submit their idea & abstract before shortlisting.",
  "Only 15 teams will be shortlisted for the hackathon.",
  "Shortlisted teams must participate in the full 6-hour hackathon.",
  "All team members must attend the final presentation.",
  "The judges' decision will be final and binding.",
];

export function RulesSection() {
  return (
    <section id="rules" className="section-padding bg-obsidian relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none -translate-y-1/2" />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-4xl mx-auto">
        <FadeIn direction="up" className="text-center mb-gr-2xl">
          <span className="font-mono text-gr-xs text-accent tracking-widest uppercase">Guidelines</span>
          <h2 className="mt-gr-md text-gr-xl md:text-gr-xl font-black tracking-tight">
            <span className="text-foreground">Rules & </span>
            <span className="text-gradient-violet">Regulations</span>
          </h2>
        </FadeIn>

        <FadeIn
          direction="up"
          className="glass-card rounded-gr-xl border p-gr-xl md:p-gr-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gr-md">
            {rules.map((rule, i) => (
              <FadeIn
                key={i}
                direction="left"
                delay={i * 40}
                className="flex items-start gap-gr-md p-gr-md rounded-gr hover:bg-muted/30 transition-colors duration-300 group"
              >
                <div className="w-[34px] h-[34px] rounded-gr bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                  <ShieldCheck size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <span className="font-mono text-gr-xs text-primary mr-2">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-gr-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {rule}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
