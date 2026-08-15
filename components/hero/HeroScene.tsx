import { HeroAtmosphereLayer } from "@/components/hero/HeroAtmosphereLayer";
import { HeroEnvironmentLayer } from "@/components/hero/HeroEnvironmentLayer";
import { HeroForegroundLayer } from "@/components/hero/HeroForegroundLayer";
import { HeroMidgroundLayer } from "@/components/hero/HeroMidgroundLayer";
import { HeroSkyLayer } from "@/components/hero/HeroSkyLayer";
import { HeroTypography } from "@/components/hero/HeroTypography";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function HeroScene() {
  return (
    <div data-hero-scene className="sticky top-0 isolate min-h-svh overflow-hidden">
      <HeroSkyLayer />
      <HeroEnvironmentLayer />
      <HeroMidgroundLayer />
      <HeroForegroundLayer />
      <HeroAtmosphereLayer />

      <div className="relative z-20 mx-auto flex min-h-svh w-full max-w-[min(94vw,1500px)] flex-col justify-center px-3 pb-52 pt-30 sm:px-8 sm:pb-60 sm:pt-34">
        <HeroTypography title={SITE_NAME} subtitle={SITE_TAGLINE} />
      </div>
    </div>
  );
}
