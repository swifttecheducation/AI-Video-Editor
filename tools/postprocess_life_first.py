import os
import subprocess
import shutil
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = Path(__file__).resolve().parent.parent
REMOTION_OUT = REPO_ROOT / "remotion" / "out" / "LifeFirstBusinessMaster_Graded.mp4"
FINAL_PROJECT_OUT = REPO_ROOT / "videos" / "life-first-business" / "output" / "LifeFirstBusinessMaster_Final.mp4"
WEB_PREVIEW = REPO_ROOT / "web" / "preview.mp4"

FINAL_PROJECT_OUT.parent.mkdir(parents=True, exist_ok=True)
WEB_PREVIEW.parent.mkdir(parents=True, exist_ok=True)

if not REMOTION_OUT.exists():
    print(f"Error: {REMOTION_OUT} does not exist.")
    sys.exit(1)

print(f"=== Chuẩn hóa âm thanh (EBU R128 -14 LUFS) và xuất bản phẩm ===")
norm_tmp = REPO_ROOT / "remotion" / "out" / "LifeFirstBusinessMaster_Normalized.mp4"

cmd_norm = [
    "ffmpeg", "-y",
    "-loglevel", "error",
    "-i", str(REMOTION_OUT),
    "-af", "loudnorm=I=-14:LRA=7:TP=-1.0",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    str(norm_tmp)
]
subprocess.run(cmd_norm, check=True)

# Copy to final destinations
shutil.copyfile(norm_tmp, FINAL_PROJECT_OUT)
shutil.copyfile(norm_tmp, WEB_PREVIEW)

desktop_path = Path("C:/Users/Admin/OneDrive/Desktop/LifeFirstBusiness_Final.mp4")
downloads_path = Path("C:/Users/Admin/Downloads/LifeFirstBusiness_Final.mp4")
try:
    shutil.copyfile(norm_tmp, desktop_path)
    print(f"- Desktop Copy: {desktop_path}")
except Exception as e:
    print(f"Warning Desktop copy: {e}")

try:
    shutil.copyfile(norm_tmp, downloads_path)
    print(f"- Downloads Copy: {downloads_path}")
except Exception as e:
    print(f"Warning Downloads copy: {e}")

# Get stats
dur_cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(FINAL_PROJECT_OUT)]
dur = float(subprocess.run(dur_cmd, capture_output=True, text=True).stdout.strip())
size_mb = FINAL_PROJECT_OUT.stat().st_size / (1024 * 1024)

print(f"\n Xuất bản thành công:")
print(f"- Output Master: {FINAL_PROJECT_OUT} ({size_mb:.2f} MB, {dur:.2f}s)")
print(f"- Web Preview: http://localhost:8080/preview.mp4")
