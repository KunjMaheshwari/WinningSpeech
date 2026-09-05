"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlayingRef = useRef(isPlaying);

  const currentSong = safeSongs[currentIndex];

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setError(null);

    if (isPlayingRef.current) {
      void audio.play().catch(() => {
        setIsPlaying(false);
        setError("Unable to start playback. Please try again.");
      });
    }
  }, [currentIndex]);

  const selectTrack = (nextIndex: number) => {
    setCurrentIndex((nextIndex + safeSongs.length) % safeSongs.length);
  };

  const handlePlayToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setError(null);
      } catch {
        setIsPlaying(false);
        setError("Unable to start playback. Please try again.");
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration)) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="surface-panel mx-auto flex w-full max-w-180 flex-col gap-2 border border-(--border) px-3 py-3 shadow-[0_18px_60px_-34px_#000000] sm:gap-3 sm:px-4">
      <audio
        ref={audioRef}
        src={currentSong.audioSrc}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          isPlayingRef.current = true;
          setIsPlaying(true);
          selectTrack(currentIndex + 1);
        }}
        onError={() => setError("This track could not be loaded.")}
      />
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
          onPrev={() => selectTrack(currentIndex - 1)}
          onPlayToggle={handlePlayToggle}
          onNext={() => selectTrack(currentIndex + 1)}
        />
      </div>

      <label className="sr-only" htmlFor="player-progress">
        Playback progress
      </label>
      <input
        id="player-progress"
        type="range"
        min={0}
        max={duration || 0}
        step="0.1"
        value={Math.min(currentTime, duration || 0)}
        onChange={(event) => handleSeek(Number(event.target.value))}
        className="h-1 w-full accent-(--accent)"
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="text-(length:--text-ui-sm) text-muted" aria-live="polite">
          {error ?? `${formatTime(currentTime)} / ${formatTime(duration)}`}
        </p>
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
  title: "No tracks available",
  artist: "Karan Aujla",
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const rounded = Math.floor(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}
