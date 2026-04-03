import { useState, useLayoutEffect, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown, Zap } from "lucide-react";

// ── Lazy-load heavy modules so they never block first paint ──
const SplineScene = lazy(() =>
  import("@/components/ui/spline").then((m) => ({ default: m.SplineScene }))
);

/* ─────────────────────────────────────────────
   Mobile Three.js 3D Background
   Lazy-loaded + deferred so it never blocks LCP
───────────────────────────────────────────── */
function MobileThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let rafId: number;
    let renderer: import("three").WebGLRenderer | null = null;

    const initId = requestIdleCallback
      ? requestIdleCallback(init, { timeout: 2000 })
      : setTimeout(init, 100) as unknown as number;

    function init() {
      import("three").then((THREE) => {
        if (!container) return;

        const W = container.clientWidth;
        const H = container.clientHeight;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x050510, 1);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050510, 0.045);

        const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
        cam.position.set(0, 0, 8);

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

        type ShapeEntry = {
          mesh: import("three").Mesh;
          ox: number; oy: number;
          speed: number; phase: number;
          rx: number; ry: number; rz: number;
        };
        const shapes: ShapeEntry[] = [];

        function mk(
          geo: import("three").BufferGeometry,
          mat: import("three").Material,
          x: number, y: number, z: number,
          sx = 1, sy = 1, sz = 1,
        ) {
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(x, y, z);
          mesh.scale.set(sx, sy, sz);
          scene.add(mesh);
          shapes.push({
            mesh, ox: x, oy: y,
            speed: 0.3 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            rx: (Math.random() - 0.5) * 0.008,
            ry: (Math.random() - 0.5) * 0.012,
            rz: (Math.random() - 0.5) * 0.006,
          });
        }

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

        const gridMat = new THREE.MeshBasicMaterial({
          color: 0x4c1d95, wireframe: true, transparent: true, opacity: 0.08,
        });
        const grid = new THREE.Mesh(new THREE.PlaneGeometry(28, 16, 20, 12), gridMat);
        grid.position.z = -8;
        scene.add(grid);

        let mx = 0, my = 0, tmx = 0, tmy = 0;
        const onTouch = (cx: number, cy: number) => {
          const rect = container.getBoundingClientRect();
          mx = ((cx - rect.left) / rect.width - 0.5) * 2;
          my = -((cy - rect.top) / rect.height - 0.5) * 2;
        };
        container.addEventListener("touchmove", (e) => {
          if (e.touches[0]) onTouch(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        const onResize = () => {
          const nW = container.clientWidth;
          const nH = container.clientHeight;
          renderer!.setSize(nW, nH);
          cam.aspect = nW / nH;
          cam.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize);

        let t = 0;
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
          renderer!.render(scene, cam);
        };

        animate();

        (container as any).__threeCleanup = () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("resize", onResize);
          renderer!.dispose();
          if (container.contains(renderer!.domElement)) {
            container.removeChild(renderer!.domElement);
          }
        };
      });
    }

    return () => {
      if (requestIdleCallback) {
        cancelIdleCallback(initId as unknown as number);
      } else {
        clearTimeout(initId as unknown as ReturnType<typeof setTimeout>);
      }
      cancelAnimationFrame(rafId);
      const cleanup = (container as any).__threeCleanup;
      if (cleanup) cleanup();
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

export function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [threeReady, setThreeReady] = useState(false);

  useLayoutEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);

    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    const id = setTimeout(() => setThreeReady(true), 300);
    return () => clearTimeout(id);
  }, [isDesktop]);

  const scrollToAbout = useCallback(() => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToDomains = useCallback(() => {
    document.querySelector("#domains")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">

      {/* Background gradient */}
      <div className="absolute inset-0 z-0" aria-hidden>
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
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Mobile Three.js background */}
      {!isDesktop && threeReady && (
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="w-full h-full opacity-100">
            <MobileThreeBackground />
          </div>
          <div className="absolute inset-0 bg-obsidian/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 lg:min-h-screen pt-20 lg:pt-0 pb-6 lg:pb-0">

          {/* TEXT BLOCK */}
          <div className="flex-1 w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-5 lg:gap-8 lg:pt-20">

            <h1
              className="text-7xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none hero-title-fade"
            >
              <span className="text-foreground">INNO</span>
              <span className="text-gradient-violet">VEX</span>
            </h1>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl font-light text-muted-foreground tracking-widest uppercase font-mono"
            >
              Innovate. Create. Elevate.
            </motion.p>

            {/* Event Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 w-full sm:w-auto"
            >
              {/* ── Register Now — btn-12 style ── */}
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-12 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                <span>Register Now</span>
              </a>

              {/* ── View Domains — ui-btn style ── */}
              <button
                onClick={scrollToDomains}
                className="ui-btn w-full sm:w-auto"
              >
                <span>View Domains</span>
              </button>
            </motion.div>

            {/* Scroll indicator — desktop only */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              onClick={scrollToAbout}
              className="hidden lg:flex flex-col items-start gap-2 text-muted-foreground hover:text-foreground transition-colors mt-4"
            >
              <span className="font-mono text-xs tracking-wider">SCROLL</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>
          </div>

          {/* Desktop: Spline panel */}
          {isDesktop && (
            <div className="flex-1 relative w-full h-[500px] lg:h-[600px] xl:h-[700px]">
              <div className="absolute inset-0">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center opacity-20">
                    <div className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                }>
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </Suspense>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={scrollToAbout}
          className="flex lg:hidden flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto pb-4"
        >
          <span className="font-mono text-xs tracking-wider">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>

      </div>

      <style>{`
        /* ── LCP h1 fade-in ── */
        @keyframes heroTitleFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-title-fade {
          animation: heroTitleFade 0.5s ease-out both;
        }

        /* ════════════════════════════════════════
           ui-btn  —  View Domains button
        ════════════════════════════════════════ */
        .ui-btn {
          --btn-default-bg: rgb(41, 41, 41);
          --btn-padding: 15px 20px;
          --btn-hover-bg: rgb(51, 51, 51);
          --btn-transition: .3s;
          --btn-letter-spacing: .1rem;
          --btn-animation-duration: 1.2s;
          --btn-shadow-color: rgba(0, 0, 0, 0.137);
          --btn-shadow: 0 2px 10px 0 var(--btn-shadow-color);
          --hover-btn-color: #2596be;
          --default-btn-color: #fff;
          --font-size: 16px;
          --font-weight: 600;
          --font-family: Menlo, Roboto Mono, monospace;
        }
        .ui-btn {
          box-sizing: border-box;
          padding: var(--btn-padding);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--default-btn-color);
          font: var(--font-weight) var(--font-size) var(--font-family);
          background: var(--btn-default-bg);
          border: none;
          cursor: pointer;
          transition: var(--btn-transition);
          overflow: hidden;
          box-shadow: var(--btn-shadow);
          border-radius: 0.75rem;
        }
        .ui-btn span {
          letter-spacing: var(--btn-letter-spacing);
          transition: var(--btn-transition);
          box-sizing: border-box;
          position: relative;
          background: inherit;
        }
        .ui-btn span::before {
          box-sizing: border-box;
          position: absolute;
          content: "";
          background: inherit;
        }
        .ui-btn:hover,
        .ui-btn:focus {
          background: var(--btn-hover-bg);
        }
        .ui-btn:hover span,
        .ui-btn:focus span {
          color: var(--hover-btn-color);
        }
        .ui-btn:hover span::before,
        .ui-btn:focus span::before {
          animation: chitchat linear both var(--btn-animation-duration);
        }
        @keyframes chitchat {
          0%   { content: "#"; }
          5%   { content: "."; }
          10%  { content: "^{"; }
          15%  { content: "-!"; }
          20%  { content: "#$_"; }
          25%  { content: "№:0"; }
          30%  { content: "#{+."; }
          35%  { content: "@}-?"; }
          40%  { content: "?{4@%"; }
          45%  { content: "=.,^!"; }
          50%  { content: "?2@%"; }
          55%  { content: "\\;1}]"; }
          60%  { content: "?{%:%"; right: 0; }
          65%  { content: "|{f[4"; right: 0; }
          70%  { content: "{4%0%"; right: 0; }
          75%  { content: "'1_0<"; right: 0; }
          80%  { content: "{0%";  right: 0; }
          85%  { content: "]>'";  right: 0; }
          90%  { content: "4";    right: 0; }
          95%  { content: "2";    right: 0; }
          100% { content: "";     right: 0; }
        }

        /* ════════════════════════════════════════
           btn-12  —  Register Now button
        ════════════════════════════════════════ */
        .btn-12,
        .btn-12 *,
        .btn-12 :after,
        .btn-12 :before,
        .btn-12:after,
        .btn-12:before {
          border: 0 solid;
          box-sizing: border-box;
        }
        .btn-12 {
          -webkit-tap-highlight-color: transparent;
          -webkit-appearance: button;
          background-color: #000;
          background-image: none;
          color: #fff;
          cursor: pointer;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
            Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
          font-size: 100%;
          font-weight: 900;
          line-height: 1.5;
          margin: 0;
          -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
          padding: 0;
          text-transform: uppercase;
          text-decoration: none;
        }
        .btn-12:disabled { cursor: default; }
        .btn-12:-moz-focusring { outline: auto; }
        .btn-12 svg { display: block; vertical-align: middle; }
        .btn-12 [hidden] { display: none; }
        .btn-12 {
          border-radius: 99rem;
          border-width: 2px;
          overflow: hidden;
          padding: 0.8rem 3rem;
          position: relative;
        }
        .btn-12 span {
          mix-blend-mode: difference;
        }
        .btn-12:after,
        .btn-12:before {
          background: linear-gradient(
            90deg,
            #fff 25%,
            transparent 0,
            transparent 50%,
            #fff 0,
            #fff 75%,
            transparent 0
          );
          content: "";
          inset: 0;
          position: absolute;
          transform: translateY(var(--progress, 100%));
          transition: transform 0.2s ease;
        }
        .btn-12:after {
          --progress: -100%;
          background: linear-gradient(
            90deg,
            transparent 0,
            transparent 25%,
            #fff 0,
            #fff 50%,
            transparent 0,
            transparent 75%,
            #fff 0
          );
          z-index: -1;
        }
        .btn-12:hover:after,
        .btn-12:hover:before {
          --progress: 0;
        }
      `}</style>
    </section>
  );
}