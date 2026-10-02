# 🎬 Commercial Reels Automation Engine v2.0 (Remotion + Native CapCut)

> **Commercial-Grade Video Production Engine** designed for Creator Economy, Solopreneurs, and Video Agencies to generate high-converting, brand-compliant 9:16 vertical short-form videos with automated subtitles, camera dynamics, editorial overlays, computer-vision chin tracking, and seamless **CapCut Desktop** draft generation.

---

## 🌟 Core Engine Architecture & Innovations

This engine incorporates the gold-standard engineering practices from top commercial Reels editing engines:

### 1. 🎭 Dual Register Editing (Confessional vs. Teaching)
Driven automatically by video register:
- **Confessional Mode**: Intimate, vulnerable, minimal graphics. One held hook, chin-locked subtitles, and 0–1 subtle sound cues. Retains raw authenticity.
- **Teaching / Explainer Mode**: Full editorial treatment. Hook block (Eyebrow + Headline), animated stat cards, staggered handwriting checklists (`StaggeredList`), B-roll cutaway takeovers, and matched SFX.

### 2. 🎯 Computer-Vision Chin-Lock Subtitle Tracking
- Uses OpenCV **YuNet** (`face_detection_yunet_2023mar.onnx`) for real-time face & chin coordinate extraction.
- Keeps subtitles dynamically anchored **below the collar** (`y = chin + 40px` or `top: 1300px` on 1080x1920).
- Subtitles never collide with or obscure the speaker's mouth, neck, or hand gestures, even when leaning or walking.

### 3. 🎣 Performance Hook Formulation (Data-Backed)
- **Anti-Mirroring Guard**: Never writes what the speaker says in the first breath. Repeating spoken audio buys no stop; the hook names the tension or category while the audio delivers the slow burn.
- **3 Approved Hook Shapes**:
  1. `Hook Card`: Single punchy headline.
  2. `Eyebrow + Headline`: Contextual badge above, dominant headline below (`emphasis: second`).
  3. `Headline + Subhead`: Dominant tension headline first, supporting knife-turn subhead below (`emphasis: first`).
- Holds ~8s by default or persists for full video. Never competes with redundant category chips.

### 4. 🎛️ Native Multi-Track CapCut Desktop Generator (`VectCutAPI` + `pyJianYingDraft`)
- Generates 100% editable, non-destructive CapCut Desktop drafts with dedicated tracks:
  - `Video Track 1`: Talking-head footage (EBU R128 loudness normalized to -14 LUFS)
  - `Video Track 2`: B-Roll Cutaways at semantic context moments
  - `Text Track 1`: Hook Headline & Eyebrow
  - `Text Track 2`: Chin-Locked Kinetic Subtitles (2-4 words per beat)
  - `Text Track 3`: Staggered Handwriting Lists & Thought Callouts
  - `Audio Track 1`: Clean Master Voiceover
  - `Audio Track 2`: Matched SFX (Pops, Clicks, Whooshes)
- Automatically updates `root_meta_info.json` so the draft appears immediately on CapCut Desktop's home screen.

### 5. 🔊 Sound Design Matching Doctrine
- Sound strictly follows deliberate visual animation:
  - Title/Hook bounce → `pop.wav` / `click.wav`
  - Handwriting reveals → `pencil-scribble.wav` / `typing.wav`
  - B-roll swipe/takeover → `whoosh.wav`
- Confessional videos remain near-silent (0–2 sounds); teaching videos receive the full soundscape.

---

## 📐 Visual Architecture (9:16 Canvas)

```
┌────────────────────────────────────────────────────────┐
│ [TOP SAFE ZONE: Y = 0 - 270px]                         │
│ • Reserved for platform UI (Instagram/TikTok headers)  │
├────────────────────────────────────────────────────────┤
│ [UPPER STORY & HOOK ZONE: Y = 270 - 620px]             │
│ • Eyebrow + Headline Hook Block                        │
│ • Staggered Progressive Lists (Handwriting + Pop SFX)  │
├────────────────────────────────────────────────────────┤
│ [PRESENTER / TALKING HEAD: Y = 620 - 1200px]           │
│ • Handheld Camera Sway (Pan/Tilt)                      │
│ • Multi-Cam Punch-In Dynamic Zooms (1.04x - 1.10x)     │
├────────────────────────────────────────────────────────┤
│ [CHIN-LOCK SUBTITLE ZONE: Y = 1280 - 1380px]           │
│ • Anchored below collar on chest (y = -0.36)           │
│ • 2-4 Words/Slice (SVN-Chicken Noodle Soup / Alegreya) │
│ • Warm Ivory (#FDFBF7) + Soft Cinema Shadow            │
├────────────────────────────────────────────────────────┤
│ [BOTTOM SAFE ZONE: Y = 1600 - 1920px]                  │
│ • Kept clear of text to avoid Reels captions & actions │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### 1. Launch CapCut Local Draft Server (Optional for HTTP/MCP API)
Double-click `start_capcut_server.bat` or run:
```bash
python engine/vectcut/capcut_server.py
```
Runs a local API server on `http://localhost:9001` compatible with CapCut Desktop.

### 2. Run Engine CLI (Native Multi-Track Draft)
```bash
python engine/reels_engine_cli.py \
  --name "My_Commercial_Reel" \
  --video "videos/life-first-business/master.mp4" \
  --subtitles "data/subtitles_life_first_business.json" \
  --register "teaching" \
  --hook-shape "eyebrow_headline" \
  --headline "bắt đầu từ lối sống bạn muốn ~" \
  --subhead "LIFE FIRST BUSINESS" \
  --export "capcut"
```
The draft is generated in seconds and opens directly in CapCut Desktop!

### 3. Remotion Studio Live Preview & Rendering
```bash
cd remotion
npm run studio
# Or render directly:
node scripts/render_life_first.mjs
```

---

## 🎨 Style Packs & Brand Guide Tokens

Configured in `config/brand.default.json` and `engine/config/style_packs/style-packs.json`:
- **Palette**:
  - `primary`: `#FDFBF7` (Warm Ivory)
  - `accentWine`: `#631B27` (Deep Wine)
  - `accentOlive`: `#5B6E4E` (Muted Olive)
  - `surface`: `#EFE9DF` (Soft Beige)
- **Typography by Role**:
  - `headline`: `Alegreya` (Editorial Serif)
  - `thought / subtitles`: `SVN-Chicken Noodle Soup` (Handwritten Organic)
  - `captions / chrome`: `Be Vietnam Pro` (Modern Geometric Sans)
