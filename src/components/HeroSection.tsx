import { useState, useLayoutEffect, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown, Zap } from "lucide-react";

// ── Lazy-load heavy modules so they never block first paint ──
const SplineScene = lazy(() =>
  import("@/components/ui/spline").then((m) => ({ default: m.SplineScene }))
);

/* ─────────────────────────────────────────────
   Mobile Three.js 3D Background — REDESIGNED
   Morphing polyhedron + particle field + aurora warp grid
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
      : (setTimeout(init, 100) as unknown as number);

    function init() {
      import("three").then((THREE) => {
        if (!container) return;

        const W = container.clientWidth;
        const H = container.clientHeight;

        // ── Renderer ──
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(W, H);
        renderer.setClearColor(0x030308, 1);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030308, 0.035);

        const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
        cam.position.set(0, 0, 8);

        // ── Lights ──
        scene.add(new THREE.AmbientLight(0x0a0620, 1.5));

        // 3 orbiting φ-ratio lights
        const lights = [
          new THREE.PointLight(0x8b5cf6, 80, 35),
          new THREE.PointLight(0x3b82f6, 60, 35),
          new THREE.PointLight(0x06b6d4, 50, 30),
        ];
        lights.forEach((l) => scene.add(l));

        // ── 1. Central Morphing Polyhedron ──
        const icoGeo = new THREE.IcosahedronGeometry(1.8, 2);
        const icoPositions = icoGeo.getAttribute("position");
        // Store original positions for morphing
        const origPositions = new Float32Array(icoPositions.array);

        // Wireframe material — emissive violet
        const icoWireMat = new THREE.MeshStandardMaterial({
          color: 0x8b5cf6,
          emissive: 0x5b21b6,
          emissiveIntensity: 0.6,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
          roughness: 0.1,
          metalness: 0.9,
        });
        // Solid inner glow
        const icoSolidMat = new THREE.MeshStandardMaterial({
          color: 0x3b1f8a,
          emissive: 0x4c1d95,
          emissiveIntensity: 0.35,
          transparent: true,
          opacity: 0.15,
          roughness: 0.2,
          metalness: 0.8,
        });

        const icoWire = new THREE.Mesh(icoGeo, icoWireMat);
        const icoSolid = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.75, 2),
          icoSolidMat
        );
        scene.add(icoWire);
        scene.add(icoSolid);

        // ── 2. Instanced Particle Field (200 particles) ──
        const pCount = 200;
        const pGeo = new THREE.SphereGeometry(0.025, 6, 6);
        const pMat = new THREE.MeshStandardMaterial({
          color: 0xa78bfa,
          emissive: 0x7c3aed,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.7,
        });
        const instancedParticles = new THREE.InstancedMesh(pGeo, pMat, pCount);
        const dummy = new THREE.Object3D();
        const pData: { x: number; y: number; z: number; speed: number; phase: number }[] = [];

        for (let i = 0; i < pCount; i++) {
          const x = (Math.random() - 0.5) * 22;
          const y = (Math.random() - 0.5) * 16;
          const z = (Math.random() - 0.5) * 14 - 2;
          pData.push({
            x, y, z,
            speed: 0.2 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
          });
          dummy.position.set(x, y, z);
          const s = 0.5 + Math.random() * 1.5;
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          instancedParticles.setMatrixAt(i, dummy.matrix);
        }
        instancedParticles.instanceMatrix.needsUpdate = true;
        scene.add(instancedParticles);

        // ── 3. Warp Grid Plane ──
        const gridGeo = new THREE.PlaneGeometry(30, 20, 30, 20);
        const gridMat = new THREE.MeshBasicMaterial({
          color: 0x2a0a5e,
          wireframe: true,
          transparent: true,
          opacity: 0.07,
        });
        const grid = new THREE.Mesh(gridGeo, gridMat);
        grid.position.z = -7;
        scene.add(grid);
        const gridOrigPositions = new Float32Array(
          gridGeo.getAttribute("position").array
        );

        // ── 4. Secondary floating accents ──
        const accentGeometries = [
          new THREE.OctahedronGeometry(0.35, 0),
          new THREE.TetrahedronGeometry(0.3, 0),
          new THREE.OctahedronGeometry(0.25, 0),
        ];
        const accentMaterials = [
          new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0e7490, emissiveIntensity: 0.5, wireframe: true, transparent: true, opacity: 0.4 }),
          new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1d4ed8, emissiveIntensity: 0.4, wireframe: true, transparent: true, opacity: 0.35 }),
          new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x5b21b6, emissiveIntensity: 0.5, wireframe: true, transparent: true, opacity: 0.35 }),
        ];
        const accentPositions = [
          { x: 3.8, y: 2.2, z: -2 },
          { x: -4.2, y: -1.5, z: -1 },
          { x: -2.5, y: 3.0, z: -3 },
        ];
        const accents = accentGeometries.map((geo, i) => {
          const mesh = new THREE.Mesh(geo, accentMaterials[i]);
          mesh.position.set(accentPositions[i].x, accentPositions[i].y, accentPositions[i].z);
          scene.add(mesh);
          return mesh;
        });

        // ── Device orientation (gyroscope) ──
        let gx = 0, gy = 0, tgx = 0, tgy = 0;
        const onOrientation = (e: DeviceOrientationEvent) => {
          gx = ((e.gamma ?? 0) / 90) * 0.5;
          gy = ((e.beta ?? 0) / 90 - 0.5) * 0.5;
        };
        window.addEventListener("deviceorientation", onOrientation, { passive: true } as AddEventListenerOptions);

        // ── Touch parallax (fallback) ──
        let mx = 0, my = 0, tmx = 0, tmy = 0;
        const onTouch = (cx: number, cy: number) => {
          const rect = container.getBoundingClientRect();
          mx = ((cx - rect.left) / rect.width - 0.5) * 2;
          my = -((cy - rect.top) / rect.height - 0.5) * 2;
        };
        container.addEventListener(
          "touchmove",
          (e) => {
            if (e.touches[0]) onTouch(e.touches[0].clientX, e.touches[0].clientY);
          },
          { passive: true }
        );

        // ── Resize ──
        const onResize = () => {
          const nW = container.clientWidth;
          const nH = container.clientHeight;
          renderer!.setSize(nW, nH);
          cam.aspect = nW / nH;
          cam.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize);

        // ── Animation Loop ──
        let t = 0;
        const animate = () => {
          rafId = requestAnimationFrame(animate);
          t += 0.008;

          // Smooth camera from touch + gyroscope
          tmx += (mx - tmx) * 0.04;
          tmy += (my - tmy) * 0.04;
          tgx += (gx - tgx) * 0.03;
          tgy += (gy - tgy) * 0.03;
          cam.position.x = (tmx + tgx) * 0.8;
          cam.position.y = (tmy + tgy) * 0.5;
          cam.lookAt(0, 0, 0);

          // 1. Morph icosahedron vertices
          const positions = icoGeo.getAttribute("position");
          for (let i = 0; i < positions.count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
            const morph = Math.sin(t * 1.2 + dist * 2.0 + i * 0.3) * 0.12;
            positions.setXYZ(
              i,
              ox + (ox / dist) * morph,
              oy + (oy / dist) * morph,
              oz + (oz / dist) * morph
            );
          }
          positions.needsUpdate = true;
          icoGeo.computeVertexNormals();
          icoWire.rotation.y = t * 0.15;
          icoWire.rotation.x = t * 0.08;
          icoSolid.rotation.y = t * 0.15;
          icoSolid.rotation.x = t * 0.08;

          // 2. Orbit lights in φ-ratio ellipses
          const phi = 1.618;
          lights[0].position.set(Math.sin(t * 0.3) * 5 * phi, Math.cos(t * 0.25) * 3, Math.sin(t * 0.2) * 4);
          lights[1].position.set(Math.cos(t * 0.28) * 4, Math.sin(t * 0.35) * 5, Math.cos(t * 0.18) * 3 * phi);
          lights[2].position.set(Math.sin(t * 0.22) * 3, Math.cos(t * 0.3) * 2 * phi, Math.sin(t * 0.28) * 5);

          // 3. Animate instanced particles
          for (let i = 0; i < pCount; i++) {
            const p = pData[i];
            dummy.position.set(
              p.x + Math.sin(t * p.speed + p.phase) * 0.25,
              p.y + Math.cos(t * p.speed * 0.8 + p.phase) * 0.3,
              p.z + Math.sin(t * p.speed * 0.5 + p.phase * 2) * 0.15
            );
            const pulse = 0.6 + Math.sin(t * 2 + p.phase) * 0.4;
            dummy.scale.setScalar(pulse);
            dummy.updateMatrix();
            instancedParticles.setMatrixAt(i, dummy.matrix);
          }
          instancedParticles.instanceMatrix.needsUpdate = true;

          // 4. Warp grid
          const gridPos = gridGeo.getAttribute("position");
          for (let i = 0; i < gridPos.count; i++) {
            const ox = gridOrigPositions[i * 3];
            const oy = gridOrigPositions[i * 3 + 1];
            const warp = Math.sin(ox * 0.3 + t * 0.5) * Math.cos(oy * 0.3 + t * 0.4) * 0.6;
            gridPos.setZ(i, gridOrigPositions[i * 3 + 2] + warp);
          }
          gridPos.needsUpdate = true;

          // 5. Rotate accent shapes
          accents.forEach((m, i) => {
            m.rotation.x += 0.003 * (i + 1);
            m.rotation.y += 0.005 * (i + 1);
            m.position.y = accentPositions[i].y + Math.sin(t * 0.6 + i * 1.5) * 0.4;
          });

          renderer!.render(scene, cam);
        };

        animate();

        (container as any).__threeCleanup = () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("deviceorientation", onOrientation);
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
    <section className="relative min-h-screen flex items-center bg-obsidian" style={{ overflowX: 'clip', overflowY: 'visible' }}>

      {/* Background gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
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
          <div className="absolute inset-0 bg-obsidian/30" />
        </div>
      )}

      {/* Content — Golden Ratio proportions */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6">

        {/* flex-[1.618] : flex-[1] for Golden Ratio text/visual split */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-gr-xl lg:min-h-screen pt-20 lg:pt-0 pb-6 lg:pb-0">

          {/* TEXT BLOCK — φ dominant */}
          <div className="flex-[1.618] w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-gr-md lg:gap-gr-lg lg:pt-20">

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
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-gr-md text-sm text-muted-foreground w-full"
            >
              <div className="flex items-center gap-2 glass-card px-4 py-[var(--gr-space-md)] rounded-gr-lg w-full sm:w-auto justify-center">
                <Calendar size={15} className="text-accent flex-shrink-0" />
                <span className="font-mono text-sm">04 April 2026</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-[var(--gr-space-md)] rounded-gr-lg w-full sm:w-auto justify-center">
                <MapPin size={15} className="text-primary flex-shrink-0" />
                <span className="font-mono text-sm">K.I.T. College, Kolhapur</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-gr-md w-full sm:w-auto"
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
              className="hidden lg:flex flex-col items-start gap-2 text-muted-foreground hover:text-foreground transition-colors mt-gr-lg"
            >
              <span className="font-mono text-xs tracking-wider">SCROLL</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>
          </div>

          {/* Desktop: Spline panel — flex-[1] (smaller side of φ ratio)
              overflow-visible so the robot's hands are never clipped */}
          {isDesktop && (
            <div className="flex-[1] relative w-full h-[500px] lg:h-[600px] xl:h-[700px]" style={{ overflow: 'visible' }}>
              <div className="absolute -inset-16" style={{ overflow: 'visible' }}>
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
          border-radius: 13px; /* Golden Ratio radius */
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