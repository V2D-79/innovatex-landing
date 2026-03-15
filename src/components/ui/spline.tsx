import { Suspense, lazy } from "react";

const SplineComponent = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className={`flex items-center justify-center ${className}`}>
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-2 border-primary/30 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border-2 border-accent/30 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "10s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse-glow" />
            </div>
          </div>
        </div>
      }
    >
      <SplineComponent scene={scene} className={className} />
    </Suspense>
  );
}
