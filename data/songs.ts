export type Song = {
  id: string;
  title: string;
  artist: string;
  audioSrc: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
};

const audioFiles = [
  "100 Million.mp3", "7.7 Magnitude.mp3", "ANTIDOTE.mp3", "Boyfriend.mp3", "Daytona.mp3",
  "Flip-Side (Sandys Interlude).mp3", "For A Reason.mp3", "HIM..mp3", "Hisaab.mp3",
  "I Really Do....mp3", "IDK HOW.mp3", "Ima Do My Thiiing.mp3", "MF Gabhru!.mp3",
  "Nothing Lasts.mp3", "P-POP CULTURE.mp3", "Softly.mp3", "Straight Ballin.mp3", "Tareefan.mp3",
  "Top Class Overseas.mp3", "WHO THEY.mp3", "Wavy.mp3", "Y.D.G.mp3", "Yaad.mp3", "Youre U Tho.mp3",
] as const;

function titleFromFilename(filename: string) {
  return filename.replace(/\.mp3$/i, "").replace(/\.{2,}$/, ".");
}

function idFromFilename(filename: string) {
  return filename.replace(/\.mp3$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const songs: Song[] = audioFiles.map((filename) => ({
  id: idFromFilename(filename),
  title: titleFromFilename(filename),
  artist: "Karan Aujla",
  audioSrc: `/audio/${encodeURIComponent(filename)}`,
}));
