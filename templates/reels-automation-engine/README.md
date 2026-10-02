# 🎬 Aesthetic Reels & Shorts Video Automation Engine (Remotion + CapCut)

> **Commercial-Grade Video Production Engine** designed for Creator Economy, Solopreneurs, and Video Agencies to generate high-converting, brand-compliant 9:16 vertical short-form videos with automated subtitles, camera dynamics, editorial overlays, and seamless CapCut Desktop integration.

---

## 🌟 Why This Engine?

Most video automation tools produce rigid, generic, or low-quality subtitles in bulky text boxes that cover the speaker's face. 

This engine is built on **cinematic editorial principles** modeled after top creator aesthetic reels (e.g. Bree, Life-First Business):
1. **Zero Clutter**: No suffocating rectangular text boxes. Organic, airy typography with subtle cinema drop shadows.
2. **True Speech Sync**: Subtitles auto-chunked into 2–4 words per slice following natural speech cadence.
3. **Ergonomic Safe Zones**: Subtitles placed gracefully on the chest below the collar line, keeping the presenter's face, neck, and hand gestures completely unobstructed.
4. **Cinematic Multi-Cam Dynamics**: Handheld camera sway + programmatic zoom punch-ins (1.04x–1.10x) on key emotional/logical inflection beats.
5. **Brand-Locked Design System**: 100% token-driven configuration for palette, fonts, spacing, and series identification.
6. **Dual Workflow (Code + CapCut)**: Programmatic 4K/1080p rendering via Remotion OR 1-click export to native **CapCut Desktop** drafts for creators who want manual finishing touches.

---

## 📐 Visual Architecture (9:16 Grid)

```
┌────────────────────────────────────────────────────────┐
│ [TOP BAR: Y = 100-160px]                               │
│ • Series Title & Episode Badge (e.g. TẬP 03)           │
├────────────────────────────────────────────────────────┤
│ [UPPER STORY ZONE: Y = 180-600px] (From Forehead Up)   │
│ • High-Impact 3-Tier Spring Hook                       │
│ • Staggered Progressive Lists (Handwriting + Pop SFX)  │
│ • Question Cards / Value Propositions                  │
├────────────────────────────────────────────────────────┤
│ [TALKING HEAD ZONE: Y = 600-1250px]                    │
│ • Natural Handheld Camera Sway (Pan/Tilt)              │
│ • Multi-Cam Punch-In Dynamic Zooms                     │
├────────────────────────────────────────────────────────┤
│ [SUBTITLE ZONE: Y = 1280-1380px] (Chest / Below Collar)│
│ • 2-4 Words/Slice (SVN-Chicken Noodle Soup / Sans)     │
│ • Warm Ivory (#F8F5F2) + High-Contrast Cinema Shadow   │
├────────────────────────────────────────────────────────┤
│ [PLATFORM UI SAFE ZONE: Y = 1600-1920px]               │
│ • Kept clear of text to avoid TikTok/Reels captions    │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone https://github.com/swifttecheducation/AI-Video-Editor.git
cd AI-Video-Editor/remotion
npm install
```

### 2. Live Interactive Preview in Remotion Studio
```bash
npm run studio
```
Navigate to `http://localhost:3000/ReelsTemplateMaster` to scrub through frames, test subtitle timings, and preview camera drift in real-time.

### 3. Production Render (Automated)
```bash
# Render master video with safe concurrency
node scripts/render_life_first.mjs

# Normalize audio to -14 LUFS (EBU R128) and distribute
python ../tools/postprocess_life_first.py
```

### 4. Export Native CapCut Desktop Draft
```bash
python ../tools/export_for_capcut.py
```
This generates a ready-to-open CapCut Desktop project inside `D:/CapCut Drafts/LifeFirstBusiness` complete with:
- Timeline video footage
- Normalized audio (-14 LUFS)
- Matching `.srt` subtitle file
- Font files (`SVN-Chicken Noodle Soup.otf`)
- Curated B-roll assets

---

## 🎨 Brand Configuration (`brand.default.json`)

To rebrand the engine for any creator or client, simply edit `config/brand.default.json`:

```json
{
  "name": "Your Brand Name",
  "palette": {
    "primaryText": "#F8F5F2",
    "secondaryText": "#D4CABE",
    "accentPrimary": "#B91C1C",
    "accentSecondary": "#9BAA83",
    "background": "#07090E"
  },
  "typography": {
    "headingFont": "Alegreya, serif",
    "subtitleFont": "'SVN-Chicken Noodle Soup', 'Be Vietnam Pro', sans-serif",
    "handwritingFont": "'SVN-Chicken Noodle Soup', cursive",
    "bodyFont": "'Be Vietnam Pro', sans-serif"
  },
  "subtitles": {
    "positionY": 1300,
    "fontSize": 66,
    "fontWeight": 700,
    "maxWidth": 860,
    "lineHeight": 1.25,
    "textShadow": "0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)"
  },
  "header": {
    "seriesTitle": "SERIES: YOUR SHOW NAME",
    "episodeLabel": "EPISODE 01"
  }
}
```

---

## 💼 Commercial & Monetization Guide

You can package and monetize this engine in multiple formats:

### 1. "Productized Video Editing as a Service" (Agency Model)
- Target: Solopreneurs, coaches, course creators, LinkedIn/TikTok influencers.
- Value Proposition: *"Send us your raw 2-minute phone recording. Our automated engine delivers a fully branded, cinema-graded, speech-synced Reel in under 15 minutes."*
- Price point: $300 – $1,200/month retainer per creator.

### 2. "Creator Video Engine Kit" (Digital Product)
- Sell the complete engine template + CapCut exporter + typography presets on Gumroad, Whop, or Etsy.
- Target: Video editors, content creators using Remotion or CapCut.
- Price point: $49 – $149 one-time purchase.

### 3. "Automated Social Video SaaS" (Software Product)
- Deploy with Remotion Lambda or server-side Node.js worker.
- Users upload raw video + transcript $\to$ SaaS auto-generates branded shorts with downloadable CapCut drafts.
- Price point: $29 – $99/month subscription.

---

## 🛠 Project Structure

```
templates/reels-automation-engine/
├── config/
│   └── brand.default.json         # Brand colors, typography, subtitle offsets
├── src/
│   ├── ReelsEngine.tsx            # Main generic Remotion composition
│   ├── types.ts                   # TypeScript interfaces
│   └── components/
│       ├── SubtitleTrack.tsx      # Speech-synced subtitle renderer
│       ├── EditorialHook.tsx      # 3-tier Spring physics title hook
│       ├── SeriesBadge.tsx        # Top series & episode identifier
│       ├── StaggeredList.tsx      # Progressive handwriting list animator
│       └── HandheldDrift.tsx      # Organic camera sway & multi-cam zoom
├── scripts/
│   ├── render_life_first.mjs      # Fast, crash-resilient Remotion renderer
│   └── export_for_capcut.py       # CapCut Desktop project exporter
└── README.md                      # Commercial documentation
```

---

## 📜 License & Distribution
Developed as part of the **AI Video Editor** ecosystem. Ready for commercial white-labeling and customization.
