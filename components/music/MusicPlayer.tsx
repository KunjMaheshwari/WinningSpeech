"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
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
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const shouldAutoPlayRef = useRef(false);

  const currentSong = safeSongs[currentIndex];

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setError(null);

    if (shouldAutoPlayRef.current) {
      void audio.play().catch(() => {
        shouldAutoPlayRef.current = false;
        setIsPlaying(false);
        setError("Unable to start playback. Please try again.");
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) setPlaylistOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlaylistOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const selectTrack = (nextIndex: number, autoplay = true) => {
    shouldAutoPlayRef.current = autoplay;
    setCurrentIndex((nextIndex + safeSongs.length) % safeSongs.length);
  };

  const handlePlayToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        shouldAutoPlayRef.current = true;
        await audio.play();
        setIsPlaying(true);
        setError(null);
      } catch {
        setIsPlaying(false);
        setError("Unable to start playback. Please try again.");
      }
    } else {
      audio.pause();
      shouldAutoPlayRef.current = false;
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration)) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    audio.muted = false;
    setVolume(value);
    setMuted(false);
  };

  const handleMuteToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div ref={playerRef} className="surface-panel relative mx-auto flex w-full max-w-180 flex-col gap-2 border border-(--border) px-3 py-3 shadow-[0_18px_60px_-34px_#000000] sm:gap-3 sm:px-4">
      <audio
        ref={audioRef}
        src={currentSong.audioSrc}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          selectTrack(currentIndex + 1, true);
        }}
        onVolumeChange={(event) => {
          setVolume(event.currentTarget.volume);
          setMuted(event.currentTarget.muted);
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
          onPlaylistToggle={() => setPlaylistOpen((open) => !open)}
          playlistOpen={playlistOpen}
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
        <div className="flex items-center gap-3">
          <p className="text-(length:--text-ui-sm) text-muted" aria-live="polite">
            {error ?? `${formatTime(currentTime)} / ${formatTime(duration)}`}
          </p>
          <div className="flex items-center gap-2 text-muted">
            <button type="button" onClick={handleMuteToggle} aria-label={muted ? "Unmute" : "Mute"} className="transition-colors hover:text-accent">
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <label className="sr-only" htmlFor="player-volume">Volume</label>
            <input
              id="player-volume"
              type="range"
              min={0}
              max={1}
              step="0.05"
              value={volume}
              onChange={(event) => handleVolumeChange(Number(event.target.value))}
              className="h-1 w-20 accent-(--accent)"
            />
          </div>
        </div>
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

      {playlistOpen && (
        <div className="absolute inset-x-0 bottom-[calc(100%+0.75rem)] z-50 max-h-[min(65svh,32rem)] overflow-y-auto border border-(--border) bg-(--surface-solid) p-2 shadow-[0_18px_60px_-24px_#000000]" aria-label="Playlist">
          <div className="mb-1 flex items-center justify-between px-2 py-1.5 text-(length:--text-ui-sm) uppercase tracking-[0.12em] text-muted">
            <span>Playlist</span>
            <span>{safeSongs.length} tracks</span>
          </div>
          {safeSongs.map((song, index) => {
            const active = index === currentIndex;
            return (
              <button
                key={song.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  selectTrack(index, true);
                  setPlaylistOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-2 py-2.5 text-left transition-colors ${active ? "bg-(--accent)/10 text-(--accent)" : "text-foreground hover:bg-white/5"}`}
              >
                <span className="w-5 text-right text-(length:--text-ui-sm) tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-(length:--text-ui-md)">{song.title}</span>
                  <span className="block truncate text-(length:--text-ui-sm) text-muted">{song.artist}</span>
                </span>
                {active && <span className="text-(length:--text-ui-sm)" aria-label={isPlaying ? "Now playing" : "Current track"}>{isPlaying ? "Playing" : "Selected"}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const fallbackTrack: Song = {
  id: "fallback",
  title: "No tracks available",
  artist: "Karan Aujla",
  audioSrc: "",
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const rounded = Math.floor(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}
