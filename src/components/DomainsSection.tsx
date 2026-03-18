import { motion } from "framer-motion";
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

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Explore</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">Hackathon </span>
            <span className="text-gradient-violet">Domains</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Choose your battlefield. Three cutting-edge domains await your innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`glass-card rounded-2xl border overflow-hidden group cursor-default ${domain.borderColor} ${domain.glowColor} transition-all duration-500 hover:scale-[1.02]`}
              >
                {/* Top gradient bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, hsl(var(--${domain.color.replace("text-", "")})), transparent)` }}
                />

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${domain.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className={domain.color} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-black ${domain.color} mb-1`}>{domain.name}</h3>
                  <p className="font-mono text-xs text-muted-foreground mb-6">{domain.subtitle}</p>

                  {/* Items */}
                  <ul className="space-y-3">
                    {domain.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: `hsl(var(--${domain.color.replace("text-", "")}))` }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
