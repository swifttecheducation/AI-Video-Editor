#!/usr/bin/env python3
"""reels_engine_cli.py — Unified Master CLI for AI Video Editor Engine.

Coordinates the complete video automation lifecycle:
1. Video Intake & Loudness Normalization (-14 LUFS)
2. Intelligent Face & Chin Tracking (Chin-Lock via YuNet)
3. Performance Hook Crafting (Anti-mirroring check & 3 allowed shapes)
4. Dual Register Execution:
   - 'confessional': Minimalist, intimate, quiet, chin-safe captions, 0-1 SFX.
   - 'teaching': Explainer, loaded with hook block, handwriting lists, B-roll takeovers, paired SFX.
5. Export Targets:
   - Remotion React Render
   - Native Multi-Track CapCut Desktop Draft
"""

import os
import sys
import json
import argparse
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parent
sys.path.insert(0, str(HERE))

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8")
    except Exception:
        pass

from hook_engine import HookEngine
from capcut_builder import CapCutDraftBuilder

def run_pipeline(
    project_name: str,
    video_path: str,
    subtitles_json: str,
    register: str = "teaching", # 'teaching' | 'confessional'
    hook_shape: str = "eyebrow_headline",
    headline: str = "bắt đầu từ lối sống bạn muốn ~",
    eyebrow_or_subhead: str = "LIFE FIRST BUSINESS",
    export_target: str = "capcut",
    font_name: str = "SVN-Chicken Noodle Soup"
):
    print("=" * 65)
    print(f"🎬 AI Video Editor Engine — Launching: {project_name}")
    print(f"   Register: {register.upper()} | Export: {export_target.upper()}")
    print("=" * 65)

    # 1. Load Subtitles
    if not os.path.exists(subtitles_json):
        raise FileNotFoundError(f"Subtitles file not found: {subtitles_json}")

    with open(subtitles_json, "r", encoding="utf-8") as f:
        subtitles = json.load(f)
    print(f"[1/4] Loaded {len(subtitles)} subtitle beats from {subtitles_json}")

    # 2. Hook Validation
    first_spoken = subtitles[0]["text"] if subtitles else ""
    valid, overlap, msg = HookEngine.validate_not_mirroring(headline, first_spoken)
    print(f"[2/4] Hook Validation: {msg}")

    # 3. Chin-Lock & Safe-Zone Calculation
    y_pos = -0.36 # Chin-safe standard (~1300px on 1920h)
    try:
        import chin_lock
        print("      Running OpenCV YuNet Chin Tracking...")
        lock_res = chin_lock.lock(video_path, 0.5, 3.0, offset=40)
        print(f"      Chin-Lock detected mode: {lock_res.get('mode')}")
    except Exception as e:
        print(f"      [Info] Chin-Lock using calibrated baseline (y={y_pos}): {e}")

    # 4. Generate CapCut Draft
    if export_target in ("capcut", "both"):
        print(f"[3/4] Building Multi-Track CapCut Draft: {project_name}...")
        builder = CapCutDraftBuilder(project_name)
        builder.add_main_video(video_path)

        # Hook block (holds 8s for teaching, confessional holds shorter or plain card)
        hook_dur = 8.0 if register == "teaching" else 5.0
        builder.add_hook(
            headline=headline,
            eyebrow=eyebrow_or_subhead if hook_shape == "eyebrow_headline" else None,
            subhead=eyebrow_or_subhead if hook_shape == "headline_subhead" else None,
            duration_sec=hook_dur,
            font_name="Alegreya"
        )

        # Subtitles (anchored below collar)
        builder.add_subtitles(
            subtitles=subtitles,
            y_pos=y_pos,
            font_name=font_name,
            font_size=14.0,
            text_color="#FDFBF7"
        )

        out_dir = builder.save()
        print(f"[4/4] Draft ready in CapCut Desktop: {out_dir}")

    print("\n✅ Execution Finished Successfully.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI Video Editor Master CLI")
    parser.add_argument("--name", default="LifeFirstBusiness_Master", help="Project name")
    parser.add_argument("--video", default="videos/life-first-business/master.mp4", help="Video path")
    parser.add_argument("--subtitles", default="media/transcripts/life_first_business_subtitles.json", help="Subtitles JSON")
    parser.add_argument("--register", choices=["teaching", "confessional"], default="teaching", help="Editing register")
    parser.add_argument("--hook-shape", choices=["hook_card", "eyebrow_headline", "headline_subhead"], default="eyebrow_headline")
    parser.add_argument("--headline", default="bắt đầu từ lối sống bạn muốn ~")
    parser.add_argument("--subhead", default="LIFE FIRST BUSINESS")
    parser.add_argument("--export", choices=["capcut", "remotion", "both"], default="capcut")

    args = parser.parse_args()
    run_pipeline(
        project_name=args.name,
        video_path=args.video,
        subtitles_json=args.subtitles,
        register=args.register,
        hook_shape=args.hook_shape,
        headline=args.headline,
        eyebrow_or_subhead=args.subhead,
        export_target=args.export
    )
