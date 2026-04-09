import { FadeIn } from "@/components/FadeIn";
import { Phone, MapPin, GraduationCap, User } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const students = [
  { name: "Pranav Shinde", phone: "+91 95526 28641" },
  { name: "Pranit Wadakar", phone: "+91 70206 33019" },
  { name: "Omkar Maldikar", phone: "+91 91302 42442" },
  { name: "Bhumi Chavan", phone: "+91 831 723 5683" },

];

const facultyHead = {
  name: "Dr. Lingaraj A. Hadimani",
  role: "Faculty Head",
};

const faculty = {
  name: "Er. Shubhada Sawakhande",
  role: "ISTE CSE Department Head",
  phone: "+91 97302 78477",
};

const venue = {
  name: "K.I.T. College of Engineering",
  address: "Kolhapur, Maharashtra",
  mapsUrl: "https://maps.google.com/?q=KIT+College+of+Engineering+Kolhapur",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.4545676336024!2d74.25991927493017!3d16.654121284113344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0ffb509926fa9%3A0x9af43eb75ec2804!2sKIT%27s%20College%20of%20Engineering%20Kolhapur%20(Empowered%20Autonomous)!5e0!3m2!1sen!2sin!4v1773845184567!5m2!1sen!2sin",
};

// ─── Sub-components ────────────────────────────────────────────────────────────
interface SectionLabelProps {
  icon: React.ElementType;
  label: string;
  colorClass?: string;
}
function SectionLabel({ icon: Icon, label, colorClass = "text-accent" }: SectionLabelProps) {
  return (
    <h3 className={`flex items-center gap-gr-sm font-mono text-gr-xs tracking-widest uppercase mb-gr-md ${colorClass}`}>
      <Icon size={13} />
      {label}
    </h3>
  );
}

interface StudentCardProps {
  student: { name: string; phone: string };
  delay: number;
}
function StudentCard({ student, delay }: StudentCardProps) {
  return (
    <FadeIn
      direction="up"
      delay={delay}
      className="glass-card rounded-gr-lg border p-gr-lg group hover:border-primary/30 hover:shadow-premium-hover transition-all duration-300"
    >
      <div className="flex items-center gap-gr-md">
        <div className="w-[42px] h-[42px] rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <User size={17} className="text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-gr-sm truncate">{student.name}</p>
          <a
            href={`tel:${student.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-gr-xs mt-gr-xs text-gr-xs text-muted-foreground hover:text-accent transition-colors"
          >
            <Phone size={11} />
            <span className="font-mono">{student.phone}</span>
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

interface FacultyCardProps {
  name: string;
  role: string;
  phone?: string;
  accentClass: string;
  borderClass: string;
  bgClass: string;
}
function FacultyCard({ name, role, phone, accentClass, borderClass, bgClass }: FacultyCardProps) {
  return (
    <div className={`glass-card rounded-gr-lg border ${borderClass} p-gr-lg h-full hover:shadow-premium-hover transition-all duration-300`}>
      <div className="flex items-center gap-gr-md mb-gr-md">
        <div className={`w-[46px] h-[46px] rounded-full ${bgClass} flex items-center justify-center shrink-0`}>
          <GraduationCap size={20} className={accentClass} />
        </div>
        <div>
          <p className="font-bold text-foreground text-gr-sm">{name}</p>
          <p className={`text-gr-xs font-mono mt-gr-xs ${accentClass}`}>{role}</p>
        </div>
      </div>
      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="flex items-center gap-gr-sm text-gr-xs text-muted-foreground hover:text-accent transition-colors"
        >
          <Phone size={12} />
          <span className="font-mono">{phone}</span>
        </a>
      )}
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-obsidian relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto space-y-gr-2xl">

        {/* 1. Heading */}
        <FadeIn direction="up" className="text-center">
          <span className="font-mono text-gr-xs text-accent tracking-widest uppercase">Reach Out</span>
          <h2 className="mt-gr-md text-gr-xl md:text-gr-xl font-black tracking-tight">
            <span className="text-foreground">Contact </span>
            <span className="text-gradient-violet">Us</span>
          </h2>
          <p className="mt-gr-md text-muted-foreground">Have questions? We're here to help.</p>
        </FadeIn>

        {/* 2. Faculty — Head + Coordinator side by side */}
        <FadeIn direction="up" delay={100}>
          <SectionLabel icon={GraduationCap} label="Faculty" colorClass="text-primary" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gr-lg">
            <FacultyCard
              name={facultyHead.name}
              role={facultyHead.role}
              accentClass="text-primary"
              borderClass="border-primary/30"
              bgClass="bg-primary/15"
            />
            <FacultyCard
              name={faculty.name}
              role={faculty.role}
              phone={faculty.phone}
              accentClass="text-accent"
              borderClass="border-accent/20"
              bgClass="bg-accent/10"
            />
          </div>
        </FadeIn>

        {/* 3. Student Coordinators */}
        <FadeIn direction="left" delay={100}>
          <SectionLabel icon={GraduationCap} label="Student Coordinators" colorClass="text-accent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gr-md">
            {students.map((student, i) => (
              <StudentCard key={student.name} student={student} delay={i * 80} />
            ))}
          </div>
        </FadeIn>

        {/* 4. Venue + Embedded Google Map */}
        <FadeIn direction="up" delay={150}>
          <SectionLabel icon={MapPin} label="Venue" colorClass="text-accent" />
          <div className="glass-card rounded-gr-lg border overflow-hidden hover:border-secondary/30 hover:shadow-premium-hover transition-all duration-300">
            {/* Golden Ratio grid: 1fr : 1.618fr for info:map */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.618fr]">

              {/* Info panel */}
              <div className="p-gr-lg flex flex-col justify-between gap-gr-lg border-b md:border-b-0 md:border-r border-border">
                <div className="flex items-start gap-gr-md">
                  <div className="w-[42px] h-[42px] rounded-gr bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-gr-sm">{venue.name}</p>
                    <p className="text-gr-xs text-muted-foreground mt-gr-xs font-mono">{venue.address}</p>
                  </div>
                </div>
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gr-xs text-secondary hover:text-accent transition-colors font-mono"
                >
                  Open in Google Maps →
                </a>
              </div>

              {/* Embedded map — φ-proportioned height */}
              <div className="h-64 md:h-[300px]">
                <iframe
                  title="K.I.T. College of Engineering, Kolhapur"
                  src={venue.embedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}