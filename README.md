# WinningSpeech — Karan Aujla Music Experience

> A cinematic, responsive music experience built with Next.js, React and TypeScript, featuring a custom local-audio player and playlist architecture.

![Status](https://img.shields.io/badge/status-active%20development-111827)
![Next.js](https://img.shields.io/badge/Next.js-React-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)

<p align="center">
  <img
    src="./public/images/hero/applicationUI.png"
    alt="WinningSpeech — Application UI"
    width="100%"
  />
</p>

<p align="center">
  <strong>🎵 Experience the website live</strong>
</p>

<p align="center">
  <a href="https://kunjgymplaylist.vercel.app/">Live Demo →</a>
</p>

---

## Overview

**WinningSpeech** is an independent, music-focused web experience inspired by the visual language of contemporary Punjabi music culture.

The project combines an immersive cinematic interface with a custom browser-based music player. It is designed to evolve from an artist-inspired landing page into a richer music experience with playlists, search, favorites, shuffle/repeat, visualizers, release pages and other features.

> **Important:** This is an independent project and should not be represented as an official Karan Aujla website without authorization. Only use music, artwork, photographs, trademarks and other copyrighted material that you are legally permitted to use.

## ✨ Features

### 🎵 Custom Music Player

The application includes a custom music player designed to integrate naturally with the site's visual identity.

- Play / Pause
- Previous / Next
- Automatic next-track playback
- Progress tracking
- Seeking / scrubbing
- Volume control
- Mute / unmute
- Current-track metadata
- Local MP3 playback

### 📜 Playlist

Audio files stored in `public/audio/` can be exposed through the application's playlist.

The playlist supports:

- Direct song selection
- Current-track highlighting
- Track switching
- Artist/title metadata
- Multiple songs
- Desktop interaction
- Touch/mobile interaction

### 🎨 Cinematic UI

The interface focuses on an immersive, minimal, dark aesthetic with:

- Full-screen hero artwork
- Layered typography
- Atmospheric visual treatment
- Responsive positioning
- Minimal navigation
- Integrated bottom music-player experience

### 📱 Responsive Experience

Designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Interactive controls are designed to remain accessible and touch-friendly on smaller screens.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js** | React application framework |
| **React** | UI and component architecture |
| **TypeScript** | Type-safe development |
| **CSS** | Styling and responsive design |
| **HTML5 Audio API** | Local music playback |
| **Node.js** | Runtime and development environment |
| **npm** | Package management |
| **Vercel** | Deployment |

Exact dependency versions are defined in `package.json`.

---

## 📁 Project Structure

```text
WinningSpeech/
├── app/
│   ├── components/
│   │   └── hero/
│   │       ├── hero.tsx
│   │       ├── hero-section.tsx
│   │       ├── hero-scene.tsx
│   │       ├── hero-typography.tsx
│   │       ├── hero-navigation.tsx
│   │       └── hero-music-player.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│   ├── audio/
│   │   ├── *.mp3
│   │   └── ...
│   │
│   └── images/
│       └── hero/
│           ├── applicationUI.png
│           └── master-reference.png
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.*
└── README.md
```

> The repository structure may evolve as new features are added.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm, yarn, pnpm or Bun
- A modern browser

Check your environment:

```bash
node --version
npm --version
```

### Installation

```bash
git clone https://github.com/KunjMaheshwari/WinningSpeech.git
cd WinningSpeech
npm install
```

### Development

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🎧 Adding Audio

Place legally obtained/licensed audio files inside:

```text
public/audio/
```

Example:

```text
public/audio/
├── softly.mp3
├── wavy.mp3
├── winning-speech.mp3
├── 100-million.mp3
└── ...
```

A public asset can then be referenced by the application as:

```text
/audio/softly.mp3
```

### Audio Recommendations

For maintainability:

- Prefer readable filenames
- Avoid unnecessary special characters
- Keep one audio file per track
- Use consistent naming conventions
- Keep playlist metadata separate from UI components

The application should safely handle filenames containing spaces and other normal characters.

### Copyright & Licensing

Only host audio that you have the legal right to distribute.

This project does not provide or endorse unauthorized downloading, copying, or redistribution of commercial music.

---

## 🧠 Music Architecture

The player is designed around a single source of truth for playlist state and one persistent `HTMLAudioElement`.

```text
Playlist
   │
   ├── Current Track
   ├── Previous
   ├── Next
   └── Selected Track
          │
          ▼
   HTMLAudioElement
          │
          ├── play()
          ├── pause()
          ├── currentTime
          ├── duration
          ├── volume
          └── muted
```

Example playlist entry:

```ts
{
  id: "softly",
  title: "Softly",
  artist: "Karan Aujla",
  src: "/audio/softly.mp3"
}
```

Keeping playlist metadata separate from UI components makes the player easier to extend with features such as search, shuffle, repeat, favorites and queues.

---

## 🧪 Testing

Music functionality should be verified in a real browser rather than only through static code inspection.

### Functional Checklist

- [ ] Application starts successfully
- [ ] Hero UI renders correctly
- [ ] Playlist opens
- [ ] All expected songs appear
- [ ] Selecting a song changes the current track
- [ ] Audio actually starts
- [ ] `audio.currentTime` increases while playing
- [ ] Pause works
- [ ] Resume works
- [ ] Next works
- [ ] Previous works
- [ ] Auto-next works
- [ ] Progress updates
- [ ] Seeking works
- [ ] Volume works
- [ ] Mute works
- [ ] Missing audio does not crash the application
- [ ] No unexpected browser-console errors
- [ ] No failed audio requests
- [ ] Mobile/touch interaction works

Run the scripts available in `package.json`:

```bash
npm run lint
npm run build
```

If available:

```bash
npm test
npm run typecheck
```

---

## 🎯 Development Principles

### Preserve the Visual Identity

When extending functionality:

- Reuse existing components
- Preserve typography and spacing
- Preserve the cinematic aesthetic
- Avoid unrelated redesigns
- Keep animations subtle
- Maintain responsive behavior

### Component Architecture

Prefer focused responsibilities:

```text
Hero
 ├── HeroNavigation
 ├── HeroScene
 ├── HeroTypography
 └── MusicPlayer
      ├── PlayerControls
      ├── Playlist
      └── ProgressControl
```

Avoid creating competing audio instances when changing tracks.

---

## 🗺️ Roadmap

### Phase 1 — Core Player

- [x] Custom music player foundation
- [x] Local audio support
- [x] Playlist audio assets
- [ ] Playlist UI
- [ ] Song selection
- [ ] Robust next/previous behavior
- [ ] Auto-next
- [ ] Search
- [ ] Shuffle
- [ ] Repeat

### Phase 2 — Personalization

- [ ] Favorite songs
- [ ] Recently played
- [ ] Persistent player state
- [ ] User-created playlists
- [ ] Listening statistics

### Phase 3 — Immersive Experience

- [ ] Dynamic album artwork
- [ ] Audio visualizer
- [ ] Full-screen player
- [ ] Animated track transitions
- [ ] Properly licensed synchronized lyrics

### Phase 4 — Artist / Release Experience

- [ ] Album/release pages
- [ ] Latest releases
- [ ] Official music-video links
- [ ] Gallery
- [ ] Official social links
- [ ] Artist information

### Phase 5 — Platform Infrastructure

- [ ] Authentication
- [ ] User profiles
- [ ] Cloud playlists
- [ ] Backend API
- [ ] Database integration
- [ ] Analytics
- [ ] Production monitoring

---

## 🌐 Deployment

The application is deployed using Vercel.

### Production Build

```bash
npm install
npm run lint
npm run build
npm start
```

### Live Application

The latest production deployment is available at:

**https://kunjgymplaylist.vercel.app/**

For larger media libraries, consider object storage and a CDN rather than placing a large collection of audio directly inside the application deployment.

---

## 🔐 Security & Production Considerations

Before production deployment:

- Keep secrets in environment variables.
- Never expose private API keys in client-side code.
- Validate external API responses.
- Protect authenticated endpoints.
- Add rate limiting to public APIs where appropriate.
- Monitor failed media requests.
- Review copyright and licensing requirements for every asset.
- Use object storage/CDN infrastructure for large media libraries.

---

## 📈 Scalability

A future production architecture could separate application traffic from media delivery:

```text
Browser
   │
   ▼
Next.js Application
   │
   ├── API
   ├── Authentication
   └── Database
          │
          ▼
       User Data

Audio Files
   │
   ▼
Object Storage
   │
   ▼
CDN
   │
   ▼
Browser
```

This allows the application and media-delivery layers to scale independently.

---

## 🤝 Contributing

For collaborative development:

```bash
git checkout -b feature/your-feature
```

Make focused changes, test locally, and run the project's validation checks.

Example:

```bash
git commit -m "feat: add playlist search"
```

Pull requests should describe:

- What changed
- Why it changed
- How it was tested
- Known limitations

---

## 📄 License

Unless a separate license file is provided, this project should be treated as private/proprietary.

Third-party assets, music, photographs, logos, trademarks, and other media may have their own licenses and usage restrictions.

Do not assume that an asset is free to redistribute simply because it is available online.

---

## 👨‍💻 Author

**Kunj Maheshwari**

Software Engineer | QA Automation | Full-Stack Development | AI & LLM Engineering

GitHub: https://github.com/KunjMaheshwari

---

## ⭐ Project Vision

The long-term goal of **WinningSpeech** is to combine the visual impact of a cinematic artist website with the interaction model of a modern music application.

```text
Cinematic Design
       +
Custom Music Player
       +
Playlist Experience
       +
Immersive Visuals
       +
Scalable Architecture
       =
   WinningSpeech
```

---

<p align="center">
  Built with Next.js, React, TypeScript, and a passion for great music experiences.
</p>
