import type { ReactNode } from "react";

type HeroMusicPlayerProps = {
  children: ReactNode;
};

export function HeroMusicPlayer({ children }: HeroMusicPlayerProps) {
  return (
    <div
      data-hero-player
      className="mx-auto w-full max-w-[min(94vw,760px)] translate-y-10 opacity-0"
    >
      {children}
    </div>
  );
}
