#!/usr/bin/env python3
"""capcut_builder.py — Commercial Native Multi-Track CapCut Draft Builder.

Directly generates fully editable CapCut Desktop projects on Windows/macOS.
Uses VectCutAPI / pyJianYingDraft:
  - Video Track 1: Talking-head footage (normalized to -14 LUFS)
  - Video Track 2: B-Roll Cutaways (contextual scenes)
  - Text Track 1: Hook Title (Eyebrow + Headline or Headline + Subhead)
  - Text Track 2: Chin-Safe Subtitles (2-4 words per beat, anchored below collar)
  - Text Track 3: Staggered Handwriting Lists / Thought Callouts
  - Audio Track 1: Master Voiceover
  - Audio Track 2: Matched SFX (Pops, Clicks, Whooshes)
  - Audio Track 3: Ambient Music Bed
"""

import os
import sys
import json
import uuid
import time
import shutil
from pathlib import Path
from typing import List, Dict, Any, Optional

HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parent
VECTCUT_DIR = HERE / "vectcut"
sys.path.insert(0, str(VECTCUT_DIR))
sys.path.insert(0, str(HERE))

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8")
    except Exception:
        pass

from create_draft import create_draft, get_or_create_draft
from draft_cache import DRAFT_CACHE
from add_video_track import add_video_track
from add_text_impl import add_text_impl
from add_audio_track import add_audio_track
import draft_safety

class CapCutDraftBuilder:
    def __init__(self, project_name: str, drafts_dir: Optional[str] = None):
        self.project_name = project_name
        
        # Locate CapCut Drafts Directory on Windows / macOS
        if drafts_dir:
            self.drafts_root = Path(drafts_dir)
        else:
            if os.name == "nt":
                local_app_data = os.environ.get("LOCALAPPDATA", r"C:\Users\Admin\AppData\Local")
                self.drafts_root = Path(local_app_data) / "CapCut" / "User Data" / "Projects" / "com.lveditor.draft"
                if not self.drafts_root.exists() and Path("D:/CapCut Drafts").exists():
                    self.drafts_root = Path("D:/CapCut Drafts")
            else:
                self.drafts_root = Path.home() / "Movies" / "CapCut" / "User Data" / "Projects" / "com.lveditor.draft"

        self.drafts_root.mkdir(parents=True, exist_ok=True)
        self.project_dir = self.drafts_root / self.project_name
        self.project_dir.mkdir(parents=True, exist_ok=True)

        self.width = 1080
        self.height = 1920
        self.draft_id, self.script = get_or_create_draft(width=self.width, height=self.height)

    def add_main_video(self, video_path: str, duration_sec: Optional[float] = None):
        """Adds main talking-head video clip to the base video track."""
        abs_path = os.path.abspath(video_path).replace("\\", "/")
        add_video_track(
            video_url=abs_path,
            draft_folder=str(self.drafts_root).replace("\\", "/"),
            draft_id=self.draft_id,
            start=0,
            duration=duration_sec,
            track_name="main_video",
            relative_index=0
        )
        print(f"  [+] Added Main Video: {os.path.basename(video_path)}")

    def add_broll_cutaway(self, broll_path: str, start_sec: float, duration_sec: float):
        """Adds contextual B-roll cutaway overlay."""
        abs_path = os.path.abspath(broll_path).replace("\\", "/")
        add_video_track(
            video_url=abs_path,
            draft_folder=str(self.drafts_root).replace("\\", "/"),
            draft_id=self.draft_id,
            start=0,
            target_start=start_sec,
            duration=duration_sec,
            track_name="broll_overlays",
            relative_index=1
        )
        print(f"  [+] Added B-Roll: {os.path.basename(broll_path)} at {start_sec:.1f}s ({duration_sec:.1f}s)")

    def add_hook(
        self,
        headline: str,
        eyebrow: Optional[str] = None,
        subhead: Optional[str] = None,
        duration_sec: float = 8.0,
        font_name: Optional[str] = "Alegreya"
    ):
        """
        Adds performance Hook block at top safe zone (y ~ 0.65).
        """
        # Headline
        add_text_impl(
            text=headline,
            start=0,
            end=duration_sec,
            draft_id=self.draft_id,
            transform_y=0.62,
            font_size=18.0,
            font_color="#FDFBF7",
            font=font_name,
            track_name="hook_headline"
        )

        # Eyebrow (above headline)
        if eyebrow:
            add_text_impl(
                text=eyebrow.upper(),
                start=0,
                end=duration_sec,
                draft_id=self.draft_id,
                transform_y=0.72,
                font_size=10.0,
                font_color="#631B27",
                font=font_name,
                track_name="hook_eyebrow"
            )

        # Subhead (below headline)
        if subhead:
            add_text_impl(
                text=subhead,
                start=0,
                end=duration_sec,
                draft_id=self.draft_id,
                transform_y=0.54,
                font_size=12.0,
                font_color="#FDFBF7",
                font=font_name,
                track_name="hook_subhead"
            )
        print(f"  [+] Added Hook: '{headline}' (duration: {duration_sec}s)")

    def add_subtitles(
        self,
        subtitles: List[Dict[str, Any]],
        y_pos: float = -0.36, # chin-safe: -0.36 (~1300px on 1920h)
        font_name: Optional[str] = "SVN-Chicken Noodle Soup",
        font_size: float = 14.0,
        text_color: str = "#FDFBF7"
    ):
        """
        Adds chin-safe subtitles (2-4 words per beat).
        """
        count = 0
        for sub in subtitles:
            s = float(sub["s"])
            e = float(sub["e"])
            txt = sub["text"]
            if e <= s:
                continue

            add_text_impl(
                text=txt,
                start=s,
                end=e,
                draft_id=self.draft_id,
                transform_y=y_pos,
                font_size=font_size,
                font_color=text_color,
                font=font_name,
                track_name="subtitles"
            )
            count += 1
        print(f"  [+] Added {count} Chin-Safe Subtitles (anchored at y={y_pos})")

    def add_sfx(self, sfx_path: str, start_sec: float, volume: float = 0.5):
        """Adds synchronized sound design cues."""
        abs_path = os.path.abspath(sfx_path).replace("\\", "/")
        add_audio_track(
            audio_url=abs_path,
            draft_folder=str(self.drafts_root).replace("\\", "/"),
            draft_id=self.draft_id,
            target_start=start_sec,
            volume=volume,
            track_name="sfx_track"
        )

    def save(self):
        """
        Dumps the draft files into the CapCut project folder and registers in CapCut metadata.
        """
        timeline_filename = draft_safety.draft_json_name(str(self.project_dir))
        target_json = self.project_dir / timeline_filename

        self.script.dump(str(target_json))
        print(f"\n[OK] CapCut Draft Timeline written to: {target_json}")

        # Update root_meta_info.json
        meta_info_path = self.drafts_root / "root_meta_info.json"
        try:
            meta = {}
            if meta_info_path.exists():
                with open(meta_info_path, "r", encoding="utf-8") as f:
                    meta = json.load(f)
            
            draft_store = meta.get("all_draft_store", [])
            entry = next((d for d in draft_store if d.get("draft_name") == self.project_name), None)
            now_ms = int(time.time() * 1000)
            
            if not entry:
                entry = {
                    "draft_id": str(uuid.uuid4()),
                    "draft_name": self.project_name,
                    "draft_root_path": str(self.drafts_root).replace("/", "\\"),
                    "draft_json_file": str(target_json).replace("/", "\\"),
                    "draft_create_time": now_ms,
                    "draft_modify_time": now_ms,
                    "draft_is_deleted": False,
                    "draft_version": "1.0"
                }
                draft_store.insert(0, entry)
            else:
                entry["draft_modify_time"] = now_ms
                entry["draft_json_file"] = str(target_json).replace("/", "\\")

            meta["all_draft_store"] = draft_store
            with open(meta_info_path, "w", encoding="utf-8") as f:
                json.dump(meta, f, indent=2, ensure_ascii=False)
            print(f"[OK] Registered draft in CapCut manager: {meta_info_path}")
        except Exception as e:
            print(f"[Warning] Could not update root_meta_info.json: {e}")

        return str(self.project_dir)
