import os
import sys
import json
import argparse
import subprocess
import imageio_ffmpeg

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from tools.voice_emphasis_detector import analyze_video_emphasis
from tools.sfx_manager import generate_sfx_library

DEFAULT_CONFIG = {
    "toggles": {
        "auto_rough_cut": True,
        "silence_trimmer": True,
        "voice_emphasis_fx": True,
        "auto_sfx_sync": True,
        "smart_bgm": False,
        "cinema_color": True,
        "loudnorm_ebu_r128": True,
        "export_capcut_draft": True
    },
    "brand": {
        "primary_color": "#720000",       # Wine
        "accent_color": "#798466",        # Olive
        "bg_color": "#F8F5F2",            # Warm Ivory
        "border_color": "#D4CABE",        # Soft Beige
        "heading_font": "Alegreya",
        "body_font": "Be Vietnam Pro",
        "cta_text": "Comment IM để nhận lịch Mock Interview 1-1"
    }
}

def run_pipeline(video_path, context=None, config_path=None):
    print("=" * 60)
    print("STARTING AI VIDEO EDITOR - EDITORIAL & VIRAL PIPELINE")
    print("=" * 60)

    # 1. Load Config
    config = DEFAULT_CONFIG.copy()
    if config_path and os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as f:
            config.update(json.load(f))
    print(f"[Pipeline] Active Toggles: {json.dumps(config['toggles'], indent=2)}")

    # 2. Procedural SFX Library
    sfx_dir = os.path.join(os.path.dirname(__file__), "remotion", "public", "sfx")
    generate_sfx_library(sfx_dir)

    # 3. Voice Emphasis Detection
    if config["toggles"].get("voice_emphasis_fx"):
        print("\n[Pipeline] Step 1: Scanning audio track for Voice Emphasis Spikes...")
        markers_path = os.path.join(os.path.dirname(video_path), "emphasis_markers.json")
        events = analyze_video_emphasis(video_path, markers_path)
        print(f"[Pipeline] -> Identified {len(events)} emphasis moments for Micro-Zoom & Punch SFX.")

    # 4. Color Grading & Audio Loudnorm Check
    print("\n[Pipeline] Step 2: Preparing Video Render Engine...")
    print(f"[Pipeline] -> Video source: {video_path}")
    print(f"[Pipeline] -> Cinema Tone Mapping: {config['toggles']['cinema_color']}")
    print(f"[Pipeline] -> Broadcast EBU R128 (-14 LUFS): {config['toggles']['loudnorm_ebu_r128']}")

    print("\n[Pipeline] Pipeline successfully initialized and ready!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI Video Editor Unified Pipeline")
    parser.add_argument("--video", type=str, help="Path to input raw video")
    parser.add_argument("--context", type=str, default="", help="Context / Topic prompt")
    parser.add_argument("--config", type=str, default=None, help="Path to config.json")
    args = parser.parse_args()

    default_video = r"C:\Users\Admin\.gemini\antigravity\scratch\claude-youtube-editor\media\projects\my-video\master.mp4"
    target_video = args.video if args.video else default_video
    run_pipeline(target_video, args.context, args.config)
