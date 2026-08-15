import { Disc3 } from "lucide-react";

type TrackArtworkProps = {
  title: string;
};

export function TrackArtwork({ title }: TrackArtworkProps) {
  return (
    <div
      className="relative grid h-14 w-14 place-items-center border border-(--border) bg-[linear-gradient(140deg,#1d1f23_0%,#101113_100%)] sm:h-16 sm:w-16"
      aria-label={`Artwork placeholder for ${title}`}
    >
      <Disc3 size={20} className="text-(--muted-text)" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#00000066_100%)]" />
    </div>
  );
}
