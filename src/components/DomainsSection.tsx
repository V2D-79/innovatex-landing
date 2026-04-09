import { FadeIn } from "@/components/FadeIn";
import { Brain, Wifi, Cpu } from "lucide-react";

const domains = [
  {
    icon: Brain,
    name: "GenNext AI",
    subtitle: "Artificial Intelligence",
    color: "text-primary",
    borderColor: "hover:border-primary/40",
    glowColor: "hover:shadow-glow-violet",
    bg: "bg-primary/10",
    items: ["AI Chatbots", "Image Generation", "Prediction Systems", "Recommendation Systems"],
  },
  {
    icon: Wifi,
    name: "Smart IoT",
    subtitle: "Internet of Things",
    color: "text-accent",
    borderColor: "hover:border-accent/40",
    glowColor: "hover:shadow-glow-cyan",
    bg: "bg-accent/10",
    items: ["Sensors", "Automation", "Smart Homes", "Smart Agriculture", "Smart Cities"],
  },
  {
    icon: Cpu,
    name: "FutureTech",
    subtitle: "Emerging Technologies",
    color: "text-secondary",
    borderColor: "hover:border-secondary/40",
    glowColor: "hover:shadow-glow-blue",
    bg: "bg-secondary/10",
    items: ["Robotics", "Intelligent Automation", "Smart Infrastructure", "Digital Solutions"],
  },
];

export function DomainsSection() {
  return (
    <section id="domains" className="section-padding bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none" />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-gr-2xl">
          <span className="font-mono text-gr-xs text-accent tracking-widest uppercase">Explore</span>
          <h2 className="mt-gr-md text-gr-xl md:text-gr-xl font-black tracking-tight">
            <span className="text-foreground">Hackathon </span>
            <span className="text-gradient-violet">Domains</span>
          </h2>
          <p className="mt-gr-md text-muted-foreground max-w-xl mx-auto">
            Choose your battlefield. Three cutting-edge domains await your innovation.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gr-lg">
          {domains.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <FadeIn
                key={i}
                direction="up"
                delay={i * 100}
                className={`glass-card rounded-gr-lg border overflow-hidden group cursor-default ${domain.borderColor} ${domain.glowColor} hover:shadow-premium-hover transition-all duration-500 hover:scale-[1.02]`}
              >
                {/* Top gradient bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, hsl(var(--${domain.color.replace("text-", "")})), transparent)` }}
                />

                <div className="p-gr-xl">
                  {/* φ-proportioned icon container: 55×34 ≈ 1.618 */}
                  <div className={`w-[55px] h-[34px] rounded-gr ${domain.bg} flex items-center justify-center mb-gr-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className={domain.color} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-gr-lg font-black ${domain.color} mb-gr-xs`}>{domain.name}</h3>
                  <p className="font-mono text-gr-xs text-muted-foreground mb-gr-lg">{domain.subtitle}</p>

                  {/* Items */}
                  <ul className="space-y-gr-md">
                    {domain.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-gr-md text-gr-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: `hsl(var(--${domain.color.replace("text-", "")}))` }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
