"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "@/components/hero/HeroScene";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canUsePointerParallax = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let removePointerListeners: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const topBarElement = document.querySelector<HTMLElement>("[data-topbar]");
      const playerElement = document.querySelector<HTMLElement>("[data-hero-player]");

      gsap.set("[data-hero-sky], [data-hero-environment], [data-hero-midground], [data-hero-foreground]", {
        autoAlpha: 0,
      });
      gsap.set("[data-hero-atmosphere], [data-hero-title], [data-hero-gurmukhi]", {
        autoAlpha: 0,
      });
      if (topBarElement) gsap.set(topBarElement, { autoAlpha: 0, y: -10 });
      gsap.set("[data-hero-title]", { yPercent: 16 });
      gsap.set("[data-hero-gurmukhi]", { yPercent: 12 });
      if (playerElement) gsap.set(playerElement, { y: 124, autoAlpha: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro.to("[data-hero-sky]", { autoAlpha: 1, duration: 0.7 }, 0.3);
      intro.to(
        "[data-hero-environment], [data-hero-midground], [data-hero-foreground]",
        { autoAlpha: 1, duration: 0.62, stagger: 0.08 },
        0.48,
      );
      intro.to("[data-hero-atmosphere]", { autoAlpha: 1, duration: 0.56 }, 0.9);
      intro.to("[data-hero-title]", { autoAlpha: 1, yPercent: 0, duration: 0.85 }, 1.1);
      intro.to("[data-hero-gurmukhi]", { autoAlpha: 1, yPercent: 0, duration: 0.58 }, 1.5);
      if (topBarElement) {
        intro.to(topBarElement, { autoAlpha: 0.9, y: 0, duration: 0.52 }, 1.8);
      }
      if (playerElement) {
        intro.to(
          playerElement,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.92,
            ease: "back.out(1.08)",
          },
          2,
        );
      }

      if (!prefersReducedMotion) {
        gsap.to("[data-drift='sky']", {
          xPercent: 2,
          yPercent: 1.4,
          duration: 18,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to("[data-drift='haze']", {
          xPercent: -2.4,
          yPercent: -1,
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        scrollTimeline.to("[data-hero-environment]", { yPercent: -7 }, 0);
        scrollTimeline.to("[data-hero-midground]", { yPercent: -10 }, 0);
        scrollTimeline.to("[data-hero-foreground]", { yPercent: -14 }, 0);
        scrollTimeline.to("[data-hero-title], [data-hero-gurmukhi]", { yPercent: -14, autoAlpha: 0.32 }, 0);
        scrollTimeline.to("[data-hero-atmosphere]", { autoAlpha: 0.26 }, 0);
      } else {
        if (topBarElement) gsap.to(topBarElement, { autoAlpha: 0.9, duration: 0.24 });
        if (playerElement) gsap.to(playerElement, { autoAlpha: 1, y: 0, duration: 0.36 });
      }

      if (canUsePointerParallax && !prefersReducedMotion) {
        const skyX = gsap.quickTo("[data-parallax-layer='sky']", "x", {
          duration: 0.8,
          ease: "power3.out",
        });
        const skyY = gsap.quickTo("[data-parallax-layer='sky']", "y", {
          duration: 0.8,
          ease: "power3.out",
        });

        const environmentX = gsap.quickTo("[data-parallax-layer='environment']", "x", {
          duration: 0.72,
          ease: "power3.out",
        });
        const environmentY = gsap.quickTo("[data-parallax-layer='environment']", "y", {
          duration: 0.72,
          ease: "power3.out",
        });

        const midX = gsap.quickTo("[data-parallax-layer='midground']", "x", {
          duration: 0.66,
          ease: "power3.out",
        });
        const midY = gsap.quickTo("[data-parallax-layer='midground']", "y", {
          duration: 0.66,
          ease: "power3.out",
        });

        const foregroundX = gsap.quickTo("[data-parallax-layer='foreground']", "x", {
          duration: 0.54,
          ease: "power3.out",
        });
        const foregroundY = gsap.quickTo("[data-parallax-layer='foreground']", "y", {
          duration: 0.54,
          ease: "power3.out",
        });

        const typeX = gsap.quickTo("[data-parallax-layer='typography']", "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const typeY = gsap.quickTo("[data-parallax-layer='typography']", "y", {
          duration: 0.9,
          ease: "power3.out",
        });

        const onMove = (event: PointerEvent) => {
          const x = (event.clientX / window.innerWidth - 0.5) * 2;
          const y = (event.clientY / window.innerHeight - 0.5) * 2;

          skyX(x * 4);
          skyY(y * 4);
          environmentX(x * 7);
          environmentY(y * 7);
          midX(x * 12);
          midY(y * 12);
          foregroundX(x * 19);
          foregroundY(y * 19);
          typeX(x * 3);
          typeY(y * 3);
        };

        const onLeave = () => {
          skyX(0);
          skyY(0);
          environmentX(0);
          environmentY(0);
          midX(0);
          midY(0);
          foregroundX(0);
          foregroundY(0);
          typeX(0);
          typeY(0);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);

        removePointerListeners = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerleave", onLeave);
        };
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      removePointerListeners?.();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[165svh]">
      <HeroScene />
    </section>
  );
}
