#!/usr/bin/env python3
"""
Auto B-Roll Downloader & Normalizer (Pexels API + Local Fallback)
Fetches vertical 9:16 stock footage from Pexels API based on speech queries,
and formats them for Remotion (1080x1920, H.264, 30fps).
"""

import os
import sys
import json
import argparse
import requests
import subprocess
from pathlib import Path

# Vietnamese semantic translation dictionary for viral stock footage queries
VIETNAMESE_TO_BROLL_PROMPT = {
    "xe đạp": "bicycle riding sunset aesthetic",
    "đạp xe": "person cycling outdoor cinematic",
    "sách": "reading book cozy aesthetic",
    "thói quen": "journaling writing cozy desk",
    "bàn làm việc": "laptop typing workspace coffee",
    "làm việc": "coding computer typing mechanical keyboard",
    "khách hàng": "business meeting discussion smiling",
    "doanh thu": "finance stock market chart growth",
    "quảng cáo": "digital marketing analytics screen",
    "áp lực": "tired frustrated person hands on head",
    "mệt mỏi": "exhausted office worker resting",
    "thời gian": "vintage clock ticking slow motion",
    "thành công": "celebrating business success looking at screen"
}

def load_env_file():
    """Loads .env file if it exists in the repo root."""
    env_path = Path(__file__).resolve().parent.parent / ".env"
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    if k.strip() not in os.environ:
                        os.environ[k.strip()] = v.strip().strip("'\"")

def get_ffmpeg_path():
    venv_ffmpeg = Path(__file__).resolve().parent.parent / "venv" / "bin" / "ffmpeg"
    if venv_ffmpeg.exists():
        return str(venv_ffmpeg)
    return "ffmpeg"

def search_pexels_video(query, api_key, per_page=3):
    headers = {"Authorization": api_key, "User-Agent": "Mozilla/5.0"}
    url = f"https://api.pexels.com/videos/search?query={query}&orientation=portrait&per_page={per_page}"
    try:
        resp = requests.get(url, headers=headers, timeout=12)
        if resp.status_code == 200:
            data = resp.json()
            videos = data.get("videos", [])
            if videos:
                for video in videos:
                    files = video.get("video_files", [])
                    # Prefer HD portrait (height > width and 1080p or 720p)
                    portrait_files = [f for f in files if f.get("height", 0) >= f.get("width", 0)]
                    target_list = portrait_files if portrait_files else files
                    target_list.sort(key=lambda x: (x.get("width", 0) * x.get("height", 0)), reverse=True)
                    for f in target_list:
                        if f.get("link"):
                            return f["link"]
        else:
            print(f"[Pexels API HTTP {resp.status_code}]: {resp.text}")
    except Exception as e:
        print(f"[Pexels API Request Error]: {e}")
    return None

def normalize_video_to_remotion(raw_video_path, output_path, target_duration=3.5):
    ffmpeg = get_ffmpeg_path()
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 9:16 vertical crop, 1080x1920, H.264, 30fps
    filter_complex = (
        "scale=1080:1920:force_original_aspect_ratio=increase,"
        "crop=1080:1920,"
        "fps=30"
    )
    
    cmd = [
        ffmpeg, "-y",
        "-t", str(target_duration),
        "-i", raw_video_path,
        "-vf", filter_complex,
        "-c:v", "libx264",
        "-preset", "fast",
        "-pix_fmt", "yuv420p",
        "-an",
        output_path
    ]
    
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print(f"Normalized B-roll: {output_path} ({target_duration}s, 1080x1920@30fps)")

def create_fallback_still_broll(output_path, query, target_duration=3.5):
    """
    Creates a high-resolution cinematic animated still B-roll using our local library
    if no Pexels API key is configured.
    """
    ffmpeg = get_ffmpeg_path()
    repo_root = Path(__file__).resolve().parent.parent
    
    source_img = repo_root / "media" / "library" / "workspace" / "w1-establishing.jpg"
    if "xe" in query or "quảng cáo" in query or "ads" in query:
        source_img = repo_root / "media" / "library" / "workspace" / "w2-establishing.jpg"
    elif "chiến dịch" in query or "kế hoạch" in query:
        source_img = repo_root / "media" / "library" / "workspace" / "w3-establishing.png"

    # Ken Burns slow zoom from 1.0x to 1.08x
    frames = int(target_duration * 30)
    filter_complex = (
        f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        f"zoompan=z='min(zoom+0.0015,1.08)':d={frames}:s=1080x1920:fps=30"
    )

    cmd = [
        ffmpeg, "-y",
        "-loop", "1",
        "-t", str(target_duration),
        "-i", str(source_img),
        "-vf", filter_complex,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        output_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print(f"Generated local cinematic B-roll clip: {output_path}")

def download_broll_clip(query, output_dir="media/broll_downloads", target_duration=3.5, api_key=None):
    load_env_file()
    os.makedirs(output_dir, exist_ok=True)
    safe_query = query.lower().strip()
    
    # 1. Translate query if in Vietnamese
    search_prompt = safe_query
    for vn, en in VIETNAMESE_TO_BROLL_PROMPT.items():
        if vn in safe_query:
            search_prompt = en
            break

    output_filename = f"{search_prompt.replace(' ', '_')[:30]}.mp4"
    final_output = os.path.join(output_dir, output_filename)
    
    if os.path.exists(final_output):
        print(f"Using cached B-roll: {final_output}")
        return final_output

    print(f"Searching B-roll for: '{query}' -> Prompt: '{search_prompt}'")
    
    video_url = None
    pexels_key = api_key or os.environ.get("PEXELS_API_KEY")
    if pexels_key:
        print("Querying Pexels API for video stock...")
        video_url = search_pexels_video(search_prompt, pexels_key)

    if video_url:
        temp_raw = os.path.join(output_dir, f"temp_{output_filename}")
        print(f"Downloading Pexels clip from: {video_url[:60]}... ...")
        
        r = requests.get(video_url, stream=True, timeout=25, headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code == 200:
            with open(temp_raw, "wb") as f:
                for chunk in r.iter_content(chunk_size=1024 * 1024):
                    if chunk:
                        f.write(chunk)
            normalize_video_to_remotion(temp_raw, final_output, target_duration)
            if os.path.exists(temp_raw):
                os.remove(temp_raw)
            return final_output

    # Fallback to local cinematic animated generation
    print("No Pexels API key provided (or API unavailable). Generating cinematic fallback B-roll...")
    create_fallback_still_broll(final_output, query, target_duration)
    return final_output

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download and normalize B-roll stock footage")
    parser.add_argument("--query", type=str, default="xe đạp", help="Search query (Vietnamese or English)")
    parser.add_argument("--duration", type=float, default=3.0, help="Target duration in seconds")
    parser.add_argument("--outdir", type=str, default="media/broll_downloads", help="Output directory")
    parser.add_argument("--api-key", type=str, default=None, help="Pexels API Key")
    args = parser.parse_args()

    download_broll_clip(args.query, output_dir=args.outdir, target_duration=args.duration, api_key=args.api_key)
