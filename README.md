# Smaranda & Iliuta Wedding Website

## A Modern, Multilingual Wedding Invitation

[Live Demo](https://wedding.iliutaadrian.com/)

---

## Technologies Used

- **Next.js 14** (App Router)
- **Tailwind CSS** & **Sass**
- **Framer Motion** (for smooth animations)
- **Firebase** (Firestore for guest management & RSVP)
- **Spotify API** (for music suggestions)
- **Sharp** (for image optimization)

---

## Features

This website is designed to provide a seamless and elegant experience for guests, featuring:

- **Interactive Splash Screen**: A beautiful opening experience with a wax-sealed envelope.
- **Countdown Timer**: Real-time countdown to the big day (May 2nd, 2026).
- **Our Story**: A timeline highlighting key milestones in the couple's journey.
- **Wedding Timeline**: Detailed schedule of the wedding day events.
- **Location Details**: Integrated maps and information for the ceremony (Biserica Sfântul Nicolae Domnesc) and venue (Restaurant Kalipso).
- **RSVP System**: Searchable guest list with joint RSVP support for families and couples.
- **Community Playlist**: Guests can search for songs via Spotify/YouTube and add them to the wedding playlist.
- **Multilingual Support**: Fully translated in **English** and **Romanian**.
- **Image Optimization**: High-performance image loading using Next.js `Image` component with static imports for better LCP and zero layout shift.

---

## Installation and Usage

### Prerequisites

- Node.js (v18+)
- Firebase Account (Firestore)
- Spotify Developer Account (for playlist integration)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iliutaadrian/wedding.git
   cd wedding
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```bash
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   # ... other firebase vars

   # Spotify
   SPOTIFY_CLIENT_ID=...
   SPOTIFY_CLIENT_SECRET=...
   SPOTIFY_PLAYLIST_ID=...
   SPOTIFY_REFRESH_TOKEN=...
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## Deployment

The project is ready to be deployed on **Vercel** or any Node.js environment.

```bash
npm run build
```

---

## License

This project is based on a template and is now tailored for the Smaranda & Iliuta wedding. See [LICENSE](LICENSE.md) for details.

---

**Built with ❤️ for a special day.**