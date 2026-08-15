"use client";

import { useMemo, useState } from "react";
import type { Song } from "@/data/songs";
import { PlaybackControls } from "@/components/music/PlaybackControls";
import { TrackArtwork } from "@/components/music/TrackArtwork";
import { PlatformLink } from "@/components/ui/PlatformLink";
import { PLATFORM_LINKS } from "@/lib/constants";

type MusicPlayerProps = {
  songs: Song[];
  initialTrack?: Song;
};

export function MusicPlayer({ songs, initialTrack }: MusicPlayerProps) {
  const safeSongs = useMemo(() => (songs.length > 0 ? songs : [fallbackTrack]), [songs]);

  const initialIndex = initialTrack
    ? Math.max(
        0,
        safeSongs.findIndex((song) => song.id === initialTrack.id),
      )
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(22);

  const currentSong = safeSongs[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((index) => (index - 1 + safeSongs.length) % safeSongs.length);
  };

  const handleNext = () => {
    setCurrentIndex((index) => (index + 1) % safeSongs.length);
  };

  return (
    <div className="surface-panel mx-auto flex w-full max-w-180 flex-col gap-2 border border-(--border) px-3 py-3 shadow-[0_18px_60px_-34px_#000000] sm:gap-3 sm:px-4">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <TrackArtwork title={currentSong.title} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-(length:--text-ui-lg) font-medium text-foreground">
            {currentSong.title}
          </p>
          <p className="truncate text-(length:--text-ui-md) text-muted">{currentSong.artist}</p>
        </div>

        <PlaybackControls
          isPlaying={isPlaying}
          onPrev={handlePrev}
          onPlayToggle={() => setIsPlaying((value) => !value)}
          onNext={handleNext}
        />
      </div>

      <label className="sr-only" htmlFor="player-progress">
        Playback progress
      </label>
      <input
        id="player-progress"
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(event) => setProgress(Number(event.target.value))}
        className="h-1 w-full accent-(--accent)"
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="text-(length:--text-ui-sm) text-muted">Player shell only. No audio hosted.</p>
        <div className="flex items-center gap-4">
          <PlatformLink
            href={currentSong.spotifyUrl ?? PLATFORM_LINKS.spotify}
            label="Spotify"
            compact
          />
          <PlatformLink
            href={currentSong.youtubeUrl ?? PLATFORM_LINKS.youtube}
            label="YouTube"
            compact
          />
        </div>
      </div>
    </div>
  );
}

const fallbackTrack: Song = {
  id: "fallback",
  title: "Track Placeholder",
  artist: "Karan Aujla",
};
