# 🎬 AI Video Editor — Automated Viral Short-Form & Editorial Studio

> **Transform raw talking-head footage into high-retention, viral short-form videos with AI-driven editorial intelligence, acoustic voice-emphasis detection, and programmatic Remotion visual motion.**

[![GitHub](https://img.shields.io/badge/GitHub-swifttecheducation%2FAI--Video--Editor-blue?logo=github)](https://github.com/swifttecheducation/AI-Video-Editor)
[![Remotion](https://img.shields.io/badge/Powered%20By-Remotion%204-red)](https://remotion.dev)
[![Python](https://img.shields.io/badge/Python-3.10%2B-yellow)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🌟 Key Features

### 1. 🎛️ Feature Toggles (User-Controlled Customization)
Every aspect of the production pipeline can be enabled or disabled via configuration or the interactive web UI:
- **`auto_rough_cut`**: AI detects repeated takes, stumbles, and filler words, keeping only the best delivery.
- **`silence_trimmer`**: Eliminates dead pauses (>0.4s) to create punchy, high-retention pacing.
- **`voice_emphasis_fx`**: **Acoustic AI detects when the speaker stresses words/syllables and triggers punchy micro-zooms, spring text pops, and visual sweeps.**
- **`auto_sfx_sync`**: Procedurally syncs sound effects (pops, whooshes, dings, bass thuds) down to the exact millisecond.
- **`smart_bgm`**: Background music selection with intelligent voice-ducking (-22dB under speech).
- **`cinema_color`**: Film-grade skin-tone grading and BT.709 Hable tonemapping.
- **`loudnorm_ebu_r128`**: Broadcast-standard loudness normalization (-14 LUFS, -1.0 dB True Peak).
- **`export_capcut_draft`**: Generates a native CapCut desktop project draft for optional manual tweaking.

---

### 2. ⚡ Acoustic Voice-Emphasis Detection Engine
Generic tools only do basic text subtitles. Our engine uses **Acoustic Signal Processing (`scipy` / `librosa`)** coupled with word-level speech boundaries:
```
Audio Signal (.wav)
       │
       ├─────────────────────────────────────────┐
       ▼                                         ▼
[RMS Energy Dynamics]                  [F0 Pitch Tracking]
- Computes sliding envelope            - Autocorrelation / spectral peaks
- Detects energy spikes (Z > 1.3)      - Detects sudden pitch inflections
       │                                         │
       └────────────────────┬────────────────────┘
                            ▼
           [Emphasis Score Calculation]
           - Identifies emphatic syllable boundaries
                            ▼
    [Automated Micro-Effects Triggered at Exact Millisecond]
    💥 Micro-Zoom Punch-in (1.0 -> 1.06 -> 1.0 in 6 frames)
    ✨ Kinetic Spring Pop & Glowing Neon Highlight
    🔊 Synchronized Micro-SFX (Pop, Whoosh, Bass Thud)
```

---

### 3. 🖥️ Interactive Review Widget (`web/index.html`)
A sleek, standalone web interface inspired by modern creator workflows:
- **Sentence Pacing Tracker:** Displays duration for each line to identify dragging points.
- **Action Controls per Sentence:**
  - 🗑️ **Delete:** Discard bloopers or awkward sentences.
  - 📎 **Attach Asset:** Link custom screenshots, diagrams, or b-roll at exact timestamps.
  - 📝 **AI Note:** Direct Claude/Gemini on how to style a specific moment without prompt engineering.
  - 🎨 **Layout Selector:** Choose between Checklist Card, Versus Contrast (A vs B), Fatal Question + Warning, or Full-screen Takeover.

---

### 4. 🎨 Studio-Grade Remotion Motion Graphics
All graphic elements are authored in **React (Remotion)** with spring physics, glassmorphism, dynamic glowing borders, and word-synchronized states:
- **No Premature Reveals:** Elements remain neutral while introductory speech is delivered, activating only when the specific trigger word is spoken.
- **Brand Home Base:** Configurable primary colors, accent colors, typography, and default CTAs (e.g., "Comment IM").

---

## 🚀 Quickstart

### Prerequisites
- **Python 3.10+** (with `scipy`, `numpy`, `imageio-ffmpeg`)
- **Node.js 18+** & `npm`
- **FFmpeg** on system PATH

### Installation

```bash
# Clone the repository
git clone https://github.com/swifttecheducation/AI-Video-Editor.git
cd AI-Video-Editor

# Install Python dependencies
pip install -r requirements.txt

# Install Remotion dependencies
cd remotion
npm install
npm run gen
cd ..
```

### Running the Pipeline

```bash
# Execute end-to-end video processing with default toggles
python pipeline.py --video path/to/your/raw_video.mp4 --context "Topic context or CTA prompt"

# Launch the interactive web review dashboard
python -m http.server 8080 --directory web
# Open http://localhost:8080 in your browser
```

---

## 📁 Project Structure

```
AI-Video-Editor/
├── pipeline.py                 # Unified master pipeline orchestrator
├── web/
│   └── index.html             # Interactive Review Widget & Toggle Studio
├── tools/
│   ├── voice_emphasis_detector.py # Acoustic energy & pitch inflection detector
│   ├── sfx_manager.py         # Procedural sound effect synthesizer & manager
│   ├── build_master.py        # FFmpeg assembly, color grading & audio mastering
│   └── transcribe_clips.py    # Word-level speech alignment & transcript extraction
├── remotion/
│   ├── src/
│   │   ├── shots/             # React Remotion motion graphic templates
│   │   │   └── my-video/      # Custom card templates (Checklist, Versus, Fatal Q)
│   │   └── index.ts           # Root video compositions
│   └── public/sfx/            # Generated procedural UI sound effects
└── media/projects/            # Project directories & master cuts
```

---

## 🤝 Contributing & License
Contributions, feedback, and pull requests are welcome!
Licensed under the [MIT License](LICENSE).
