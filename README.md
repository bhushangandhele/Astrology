# 🌌 CosmicAstrology — Vedic Astrology Platform

A full-stack **Real Vedic Astrology** application built with React + TypeScript (frontend) and Node.js + Express + SQLite (backend). Computes 100% accurate sidereal planetary positions using **Chitra Paksha Lahiri Ayanamsa** — offline, no third-party API needed.

## ✨ Features

- 🔭 **Accurate Ephemeris** — Swiss Ephemeris standard sidereal calculations
- 🗺️ **North Indian D1 Kundali** — Interactive clickable SVG birth chart
- 🪐 **Planet-in-House Interpretations** — Career, Love, and General life predictions per planet
- 📅 **Vimshottari Dasha Timeline** — Full 120-year Mahadasha + Antardasha tree
- 💼 **Career Tab** — 10th house analysis with recommended career fields
- ❤️ **Love & Marriage Tab** — 7th house analysis, spouse traits, Venus position, marriage timing
- 🔮 **Ashtakoot Gun Milan** — 8-koota compatibility matching (36 points)
- 🇮🇳 **Marathi Language** — Full EN / मराठी toggle across all screens
- 💾 **Profile Saving** — SQLite-based local profile storage

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start the App

```bash
# From the root Astro directory
bash start_app.sh
```

Then open: **http://localhost:5173**

- Backend API: `http://localhost:5113`
- Frontend: `http://localhost:5173`

---

## 🏗️ Project Structure

```
Astro/
├── backend/
│   ├── src/
│   │   ├── engine/          # Vedic calculation engines
│   │   │   ├── astronomy.ts   # Planet position calculations
│   │   │   ├── ayanamsa.ts    # Lahiri Ayanamsa correction
│   │   │   ├── chart.ts       # Birth chart computation
│   │   │   ├── dasha.ts       # Vimshottari Dasha periods
│   │   │   └── compatibility.ts # Ashtakoot Gun Milan
│   │   ├── controllers/     # API controllers
│   │   ├── routes/          # Express routes
│   │   └── server.ts        # Entry point (port 5113)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── KundaliChart.tsx      # Interactive D1 SVG chart
│   │   │   ├── DashaViewer.tsx       # Dasha timeline accordion
│   │   │   ├── CompatibilityCard.tsx # Gun Milan scorecard
│   │   │   └── ProfileForm.tsx       # Birth detail input form
│   │   ├── utils/
│   │   │   ├── i18n.ts              # EN/Marathi translations
│   │   │   ├── interpretations.ts   # Planet-in-house data
│   │   │   └── cities.ts            # Offline city geocoding
│   │   └── App.tsx                  # Main app with 6 tabs
│   └── package.json
│
└── start_app.sh   # One-command launcher
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/astrology/chart` | Generate birth chart |
| POST | `/api/astrology/match` | Calculate Gun Milan |
| GET | `/api/profiles` | List saved profiles |
| POST | `/api/profiles` | Save a profile |

---

## 🔬 Vedic Calculation Details

- **Ayanamsa**: Chitra Paksha Lahiri (23.85° approx for 2024)
- **House System**: Whole sign houses (North Indian style)
- **Dasha**: Vimshottari (120-year cycle based on Moon nakshatra)
- **Compatibility**: Ashtakoot — 8 kootas totaling 36 points

---

## 📱 Tabs Available

1. **Life Predictions** — Lagna, Sun, Moon, Nakshatra, Dasha interpretations
2. **Birth Chart** — Interactive North Indian Kundali (click houses for details)
3. **Vimshottari Dasha** — Planet period timeline
4. **💼 Career** — 10th house career analysis
5. **❤️ Love & Marriage** — 7th house romance & spouse analysis
6. **Gun Milan** — Ashtakoot compatibility scoring

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| Database | SQLite (via better-sqlite3) |
| Astronomy | astronomy-engine (offline) |
| Styling | Vanilla CSS (glassmorphism) |

---

*Built with ❤️ for authentic Vedic Astrology*
