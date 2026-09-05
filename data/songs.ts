export type Song = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  artwork?: string;
  audioSrc?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
};

export const songs: Song[] = [
  {
    id: "track-1",
    title: "Track 01",
    artist: "Karan Aujla",
    audioSrc: "/audio/track1.mp3",
  },
  {
    id: "track-2",
    title: "Track 02",
    artist: "Karan Aujla",
    audioSrc: "/audio/track2.mp3",
  },
];
