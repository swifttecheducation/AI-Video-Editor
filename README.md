# 🎬 AI Video Editor & Reels Automation Engine v3.0 (Hybrid Edition)

> **Commercial-Grade Autonomous Video Editing Engine**  
> Direct integration with **CapCut Desktop** (Native Multi-Track Projects) & **Remotion React Studio** (60fps GPU Graphics), powered by **Computer-Vision Chin-Lock**, **Performance Hook Engineering**, and **Broadcast-Standard Audio (EBU R128 -14 LUFS)**.

[![GitHub](https://img.shields.io/badge/GitHub-swifttecheducation%2FAI--Video--Editor-blue?logo=github)](https://github.com/swifttecheducation/AI-Video-Editor)
[![Remotion](https://img.shields.io/badge/Powered%20By-Remotion%204-red)](https://remotion.dev)
[![Python](https://img.shields.io/badge/Python-3.10%2B-yellow)](https://python.org)
[![CapCut](https://img.shields.io/badge/CapCut-Desktop%20Native-00C4CC)](https://www.capcut.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🌟 Architecture Overview (Hybrid Super-Engine)

Unlike generic web AI tools that only export flattened, uneditable single-track MP4s, this engine is a **Local Autonomous Editing Engine** that manipulates CapCut Desktop timeline data natively while providing a high-performance React graphics rendering pipeline.

```
                         ┌─────────────────────────────┐
                         │   DIRECTOR (Bạn ra lệnh)    │
                         └──────────────┬──────────────┘
                                        │
                               [ inbox/ (Video thô) ]
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
  ┌───────────────────────────────────┐   ┌───────────────────────────────────┐
  │   1. AUDIO & ROUGH CUT PASS       │   │    2. VISUAL & COMPOSITION PASS   │
  │ • WhisperX (large-v3, GPU RTX)    │   │ • OpenCV YuNet Chin-Lock          │
  │ • Auto-cắt dead air & flubs       │   │ • Semantic B-Roll Matcher (AI)    │
  │ • EBU R128 (-14 LUFS) Audio Norm  │   │ • Cover / Thumbnail Detector      │
  └─────────────────┬─────────────────┘   └─────────────────┬─────────────────┘
                    └───────────────────┬───────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
  ┌───────────────────────────────────┐   ┌───────────────────────────────────┐
  │    3. NATIVE VECTCUT CAPCUT       │   │ 4. REMOTION REACT GRAPHICS STUDIO │
  │ • Local Server (Port 9001)        │   │ • 60fps GPU-Accelerated React     │
  │ • Sinh project CapCut rời lớp     │   │ • Handheld Sway & Zoom Punch-In   │
  │ • File: draft_content.json        │   │ • Web Dashboard xem Blueprint     │
  └─────────────────┬─────────────────┘   └─────────────────┬─────────────────┘
                    └───────────────────┬───────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
         [ CapCut Desktop Draft ]                [ Production Render MP4 ]
         (Dự án mở, sửa từng chữ)                (Chuẩn 4K/1080p đăng ngay)
```

---

## 🚀 7 Core Innovations on v3.0

1. **Dual-Output Architecture**: Programmatic 60fps rendering in Remotion OR 1-click generation of fully editable, multi-track **CapCut Desktop** drafts.
2. **AI Chin-Lock Subtitle System**: Uses OpenCV YuNet (`media/models/face_detection_yunet_2023mar.onnx`) to dynamically lock subtitles below the presenter's collar line (`top: 1300px` / `y: -0.36`), completely preventing face/mouth overlap.
3. **Performance Hook Engine**: Data-backed hook formulation enforcing 3 allowed shapes (`hook_card`, `eyebrow_headline`, `headline_subhead`) with anti-mirroring lexical validation.
4. **Dual Register Editing**: Automatically scales visual intensity between **Confessional** (intimate, authentic, quiet) and **Teaching/Explainer** (loaded cards, B-roll takeovers, handwriting lists, paired SFX).
5. **Interactive Web Dashboard (`web/`)**: Real-time synchronized video player, scene breakdown (*Visual Blueprint*), and per-scene B-roll vs text-only toggles.
6. **Broadcast Audio Standards (EBU R128 -14 LUFS)**: 2-pass `loudnorm` filter guaranteeing punchy, clear speech that never gets compressed or penalized by TikTok/Reels algorithms.
7. **Vietnamese Native Typography Engine**: Pre-configured with premium fonts (`SVN-Chicken Noodle Soup`, `Alegreya`, `Be Vietnam Pro`) with intelligent diacritic line-wrapping.

---

## 📖 Master Documentation

Detailed operation guides, command tables, and technical specs are documented in:
* **[Master Engine Manual (Vietnamese Full Guide)](docs/MASTER_ENGINE_MANUAL.md)**
* **[Commercial Template Package Guide](templates/reels-automation-engine/MANUAL.md)**

---

## ⚡ Quick Start

### 1. Requirements
* Windows 10/11 or macOS
* Python 3.10+
* Node.js 18+
* FFmpeg on system PATH
* CapCut Desktop (International or Jianying)

### 2. Run End-to-End Master Pipeline (CLI)
```bash
# Execute master automated reel build and export directly to CapCut Desktop
python engine/reels_engine_cli.py \
  --name "LifeFirst_Commercial_Project" \
  --video "videos/life-first-business/master.mp4" \
  --subtitles "data/subtitles_life_first_business.json" \
  --register "teaching" \
  --hook-shape "eyebrow_headline" \
  --headline "bắt đầu từ lối sống bạn muốn ~" \
  --subhead "LIFE FIRST BUSINESS" \
  --export "capcut"
```
The draft is immediately created and visible on your CapCut Desktop home screen!

### 3. Launch Local CapCut Draft Server (Port 9001)
Double-click `start_capcut_server.bat` or run:
```bash
python engine/vectcut/capcut_server.py
```

### 4. Interactive Live Preview in Remotion Studio
```bash
cd remotion
npm install
npm run studio
```
Open `http://localhost:3000/ReelsTemplateMaster` in your browser.

---

## 📦 Commercial Distribution Package

The turnkey commercial distribution package is available in:
```text
templates/reels-automation-engine/
├── config/              # Token-driven brand guide (colors, fonts, safe zones)
├── engine/              # Core VectCut, Chin-Lock, and Hook modules
├── media/               # CC0 sound design library & YuNet AI models
├── src/                 # Reusable Remotion components
├── start_capcut_server.bat # 1-click startup script
├── MANUAL.md            # Complete user & developer manual
└── README.md            # Quickstart guide
```

---

## 📜 License
MIT License. Commercial packaging rights reserved.
