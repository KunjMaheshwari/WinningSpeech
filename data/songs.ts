export type Song = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  artwork?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
};

// Placeholder data only. Real metadata should be added from verified official sources.
export const songs: Song[] = [
  {
    id: "placeholder-track",
    title: "Track Placeholder",
    artist: "Karan Aujla",
  },
];
