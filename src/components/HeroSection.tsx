import { useState, useLayoutEffect, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown, Zap } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Mobile Three.js 3D Background
   Only mounted when !isDesktop
───────────────────────────────────────────── */
function MobileThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x050510, 1);
    container.appendChild(renderer.domElement);

    /* Scene & Camera */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.045);

    const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    cam.position.set(0, 0, 8);

    /* Lights */
    scene.add(new THREE.AmbientLight(0x1a0a2e, 2));

    const vLight = new THREE.PointLight(0x8b5cf6, 60, 30);
    vLight.position.set(-4, 3, 2);
    scene.add(vLight);

    const bLight = new THREE.PointLight(0x3b82f6, 50, 30);
    bLight.position.set(4, -2, 3);
    scene.add(bLight);

    const cLight = new THREE.PointLight(0x06b6d4, 40, 25);
    cLight.position.set(0, 4, -2);
    scene.add(cLight);

    /* Materials */
    const matV = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6, emissive: 0x5b21b6, emissiveIntensity: 0.6,
      roughness: 0.2, metalness: 0.9, transparent: true, opacity: 0.82,
    });
    const matB = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, emissive: 0x1d4ed8, emissiveIntensity: 0.5,
      roughness: 0.15, metalness: 0.9, transparent: true, opacity: 0.78,
    });
    const matC = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, emissive: 0x0e7490, emissiveIntensity: 0.55,
      roughness: 0.1, metalness: 0.85, transparent: true, opacity: 0.75,
    });
    const matW = new THREE.MeshStandardMaterial({
      color: 0xc4b5fd, emissive: 0x7c3aed, emissiveIntensity: 0.3,
      roughness: 0.3, metalness: 0.7, wireframe: true,
      transparent: true, opacity: 0.35,
    });

    /* Shape helper */
    type ShapeEntry = {
      mesh: THREE.Mesh;
      ox: number; oy: number;
      speed: number; phase: number;
      rx: number; ry: number; rz: number;
    };
    const shapes: ShapeEntry[] = [];

    function mk(
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number, y: number, z: number,
      sx = 1, sy = 1, sz = 1,
    ) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      scene.add(mesh);
      shapes.push({
        mesh,
        ox: x, oy: y,
        speed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        rx: (Math.random() - 0.5) * 0.008,
        ry: (Math.random() - 0.5) * 0.012,
        rz: (Math.random() - 0.5) * 0.006,
      });
    }

    /* Shapes */
    mk(new THREE.SphereGeometry(1.1, 32, 32), matV, -3.5, 1.2, -1);
    mk(new THREE.SphereGeometry(0.65, 24, 24), matC, 3.2, -0.8, 0.5);
    mk(new THREE.SphereGeometry(0.42, 20, 20), matB, 1.4, 2.2, -2);
    mk(new THREE.TorusGeometry(1.2, 0.22, 16, 64), matB, 2.8, 1.5, -1.5);
    mk(new THREE.TorusGeometry(0.7, 0.14, 12, 48), matV, -2.2, -1.6, 0.8);
    mk(new THREE.TorusGeometry(0.5, 0.1, 10, 40), matC, 0.6, -2.4, -1);
    mk(new THREE.BoxGeometry(1.0, 1.0, 1.0), matW, -1.2, 0.5, -0.5);
    mk(new THREE.BoxGeometry(0.7, 0.7, 0.7), matB, 3.8, -1.8, -1);
    mk(new THREE.BoxGeometry(0.55, 0.55, 0.55), matC, -3.8, -0.5, 0.2);
    mk(new THREE.OctahedronGeometry(0.7), matV, 1.8, -1.2, 1.2);
    mk(new THREE.OctahedronGeometry(0.5), matC, -0.8, 2.5, -0.8);
    mk(new THREE.IcosahedronGeometry(0.55, 0), matB, -4.5, 2.0, -2);
    mk(new THREE.TorusGeometry(1.8, 0.08, 8, 80), matW, 0, 0, -3, 1, 1, 0.3);

    /* Particles */
    const pCount = 280;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xa78bfa, size: 0.045, transparent: true, opacity: 0.65,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* Faint grid plane */
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x4c1d95, wireframe: true, transparent: true, opacity: 0.08,
    });
    const grid = new THREE.Mesh(new THREE.PlaneGeometry(28, 16, 20, 12), gridMat);
    grid.position.z = -8;
    scene.add(grid);

    /* Touch parallax */
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onTouch = (cx: number, cy: number) => {
      const rect = container.getBoundingClientRect();
      mx = ((cx - rect.left) / rect.width - 0.5) * 2;
      my = -((cy - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener("touchmove", (e) => {
      if (e.touches[0]) onTouch(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    /* Resize */
    const onResize = () => {
      const nW = container.clientWidth;
      const nH = container.clientHeight;
      renderer.setSize(nW, nH);
      cam.aspect = nW / nH;
      cam.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* Animation loop */
    let t = 0;
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.012;

      tmx += (mx - tmx) * 0.04;
      tmy += (my - tmy) * 0.04;
      cam.position.x = tmx * 0.6;
      cam.position.y = tmy * 0.4;
      cam.lookAt(0, 0, 0);

      shapes.forEach((s) => {
        s.mesh.position.y = s.oy + Math.sin(t * s.speed + s.phase) * 0.32;
        s.mesh.position.x = s.ox + Math.cos(t * s.speed * 0.7 + s.phase) * 0.18;
        s.mesh.rotation.x += s.rx;
        s.mesh.rotation.y += s.ry;
        s.mesh.rotation.z += s.rz;
      });

      particles.rotation.y = t * 0.008;
      particles.rotation.x = t * 0.004;

      vLight.position.x = Math.sin(t * 0.4) * 5;
      vLight.position.y = Math.cos(t * 0.3) * 3;
      bLight.position.x = Math.cos(t * 0.35) * 5;
      bLight.position.z = Math.sin(t * 0.25) * 4;

      renderer.render(scene, cam);
    };

    animate();

    /* Cleanup */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

/* ─────────────────────────────────────────────
   HeroSection
───────────────────────────────────────────── */
export function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const scrollToAbout = useCallback(() => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToDomains = useCallback(() => {
    document.querySelector("#domains")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">

      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── MOBILE ONLY: Three.js 3D background ── */}
      {!isDesktop && (
        <div className="absolute inset-0 z-0">
          {/* Three.js canvas — full opacity layer */}
          <div className="w-full h-full opacity-30">
            <MobileThreeBackground />
          </div>
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-obsidian/65" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 lg:min-h-screen pt-20 lg:pt-0 pb-6 lg:pb-0">

          {/* TEXT BLOCK */}
          <div className="flex-1 w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-5 lg:gap-8 lg:pt-20">

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-7xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none"
            >
              <span className="text-foreground">INNO</span>
              <span className="text-gradient-violet">VEX</span>
            </motion.h1>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                Mini Hackathon 2026
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl font-light text-muted-foreground tracking-widest uppercase font-mono"
            >
              Innovate. Create. Elevate.
            </motion.p>

            {/* Event Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 text-sm text-muted-foreground w-full"
            >
              <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl w-full sm:w-auto justify-center">
                <Calendar size={15} className="text-accent flex-shrink-0" />
                <span className="font-mono text-sm">04 April 2026</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl w-full sm:w-auto justify-center">
                <MapPin size={15} className="text-primary flex-shrink-0" />
                <span className="font-mono text-sm">K.I.T. College, Kolhapur</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-violet font-bold text-foreground shadow-glow-violet hover:shadow-glow-blue transition-all duration-300 hover:scale-105 overflow-hidden active:scale-[0.98] text-base"
              >
                <Zap size={16} className="relative z-10" />
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <button
                onClick={scrollToDomains}
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card border font-semibold text-foreground hover:border-primary/50 hover:shadow-glow-violet transition-all duration-300 hover:scale-105 active:scale-[0.98] text-base"
              >
                View Domains
              </button>
            </motion.div>

            {/* Scroll indicator — desktop only */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={scrollToAbout}
              className="hidden lg:flex flex-col items-start gap-2 text-muted-foreground hover:text-foreground transition-colors mt-4"
            >
              <span className="font-mono text-xs tracking-wider">SCROLL</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>
          </div>

          {/* ── DESKTOP ONLY: Spline panel — unchanged ── */}
          {isDesktop && (
            <div className="flex-1 relative w-full h-[500px] lg:h-[600px] xl:h-[700px]">
              <div className="absolute inset-0">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollToAbout}
          className="flex lg:hidden flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto pb-4"
        >
          <span className="font-mono text-xs tracking-wider">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>

      </div>
    </section>
  );
}