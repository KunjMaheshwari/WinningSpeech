"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ListMusic, Pause, Play, SkipBack, SkipForward } from "lucide-react";

type PlaybackControlsProps = {
  isPlaying: boolean;
  onPrev: () => void;
  onPlayToggle: () => void;
  onNext: () => void;
  onPlaylistToggle: () => void;
  playlistOpen: boolean;
};

export function PlaybackControls({
  isPlaying,
  onPrev,
  onPlayToggle,
  onNext,
  onPlaylistToggle,
  playlistOpen,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <ControlButton label="Previous" onClick={onPrev}>
        <SkipBack size={16} />
      </ControlButton>

      <ControlButton label={isPlaying ? "Pause" : "Play"} onClick={onPlayToggle} highlighted>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </ControlButton>

      <ControlButton label="Next" onClick={onNext}>
        <SkipForward size={16} />
      </ControlButton>

      <ControlButton label={playlistOpen ? "Close playlist" : "Open playlist"} onClick={onPlaylistToggle}>
        <ListMusic size={16} />
      </ControlButton>
    </div>
  );
}

type ControlButtonProps = {
  label: string;
  onClick: () => void;
  highlighted?: boolean;
  children: ReactNode;
};

function ControlButton({ label, onClick, highlighted = false, children }: ControlButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={onClick}
      aria-label={label}
      className={
        highlighted
          ? "grid h-9 w-9 place-items-center border border-(--accent) text-(--accent) transition-colors hover:bg-(--accent)/10"
          : "grid h-9 w-9 place-items-center border border-(--border) text-foreground transition-colors hover:text-(--accent)"
      }
    >
      {children}
    </motion.button>
  );
}
