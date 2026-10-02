---
name: capcut-draft-builder
description: Programmatically builds native, unbaked, multi-track CapCut Desktop drafts with video, B-roll, subtitles, hook text, and SFX.
---

# CapCut Draft Builder Skill

Creates native CapCut Desktop drafts with fully editable layers, tracks, keyframes, and timing.

## 🎛️ Multi-Track Structure
1. `main_video`: Normalized footage (-14 LUFS, 1080x1920 9:16).
2. `broll_overlays`: Picture-in-picture / cutaway B-roll layers.
3. `hook_headline` / `hook_eyebrow` / `hook_subhead`: Top-zone typography.
4. `subtitles`: Chin-locked kinetic text (2-4 words per beat) anchored below the collar (`y: -0.36`).
5. `sfx_track`: Matched sound cues (pops, clicks, whooshes).

## 🚀 Execution Example
```python
import sys
sys.path.insert(0, "engine")
from capcut_builder import CapCutDraftBuilder

builder = CapCutDraftBuilder("MyReelProject")
builder.add_main_video("path/to/clean_video.mp4")
builder.add_hook(
    headline="bắt đầu từ lối sống bạn muốn ~",
    eyebrow="LIFE FIRST BUSINESS",
    subhead="chứ không phải công việc",
    duration_sec=8.0
)
builder.add_subtitles(subtitles_list, y_pos=-0.36)
builder.save()
```
The output draft is immediately visible in CapCut Desktop's project list.
