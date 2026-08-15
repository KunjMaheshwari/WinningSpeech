import { HeroSection } from "@/components/hero/HeroSection";
import { HeroMusicPlayer } from "@/components/hero/HeroMusicPlayer";
import { SiteShell } from "@/components/layout/SiteShell";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { songs } from "@/data/songs";

export default function Home() {
  const initialTrack = songs[0];

  return (
    <SiteShell
      musicPlayer={(
        <HeroMusicPlayer>
          <MusicPlayer songs={songs} initialTrack={initialTrack} />
        </HeroMusicPlayer>
      )}
    >
      <HeroSection />
    </SiteShell>
  );
}
