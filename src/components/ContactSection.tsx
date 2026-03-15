import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MapPin, GraduationCap, User } from "lucide-react";

const students = [
  { name: "Pranav Shinde", phone: "+91 95526 28641" },
  { name: "Pranit Wadakar", phone: "+91 70206 33019" },
  { name: "Omkar Maldikar", phone: "+91 91302 42442" },
  { name: "Bhumi Chavan", phone: "+91 831 723 5683" },
];

const faculty = {
  name: "Er Shubhada Sawakhande",
  role: "ISTE CSE Department Head",
  phone: "+91 97302 78477",
};

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-obsidian relative overflow-hidden">
      <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Reach Out</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">Contact </span>
            <span className="text-gradient-violet">Us</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Have questions? We're here to help.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Students */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="flex items-center gap-2 font-mono text-xs text-accent tracking-widest uppercase mb-6">
              <GraduationCap size={14} />
              Student Coordinators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {students.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass-card rounded-2xl border p-5 group hover:border-primary/30 hover:shadow-glow-violet transition-all duration-400"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{s.name}</p>
                      <a
                        href={`tel:${s.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Phone size={12} />
                        <span className="font-mono">{s.phone}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Faculty + Location */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Faculty */}
            <div>
              <h3 className="flex items-center gap-2 font-mono text-xs text-accent tracking-widest uppercase mb-4">
                <GraduationCap size={14} />
                Faculty Coordinator
              </h3>
              <div className="glass-card rounded-2xl border p-6 hover:border-accent/30 hover:shadow-glow-cyan transition-all duration-400">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{faculty.name}</p>
                    <p className="text-xs text-accent font-mono mt-0.5">{faculty.role}</p>
                  </div>
                </div>
                <a
                  href={`tel:${faculty.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                >
                  <Phone size={13} />
                  <span className="font-mono">{faculty.phone}</span>
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="flex items-center gap-2 font-mono text-xs text-accent tracking-widest uppercase mb-4">
                <MapPin size={14} />
                Venue
              </h3>
              <div className="glass-card rounded-2xl border p-6 hover:border-secondary/30 hover:shadow-glow-blue transition-all duration-400">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">K.I.T. College of Engineering</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">Kolhapur, Maharashtra</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs text-secondary hover:text-accent transition-colors font-mono"
                    >
                      View on Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
