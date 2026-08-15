"use client";

import { type ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { TopBar } from "@/components/layout/TopBar";
import { ANIMATION_ARCHITECTURE } from "@/lib/constants";

type SiteShellProps = {
  children: ReactNode;
  musicPlayer: ReactNode;
};

export function SiteShell({ children, musicPlayer }: SiteShellProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_10%,#2a1e11_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#09090bcc_0%,#08090b_72%)]" />
        <div className="grain-overlay" />
      </div>

      <TopBar />

      <main
        className="relative z-10 flex min-h-dvh flex-col"
        data-gsap-role={ANIMATION_ARCHITECTURE.gsap}
        data-framer-role={ANIMATION_ARCHITECTURE.framerMotion}
        data-lenis-role={ANIMATION_ARCHITECTURE.lenis}
      >
        {children}
      </main>

      <aside className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-6">
        <div className="pointer-events-auto">{musicPlayer}</div>
      </aside>
    </div>
  );
}
