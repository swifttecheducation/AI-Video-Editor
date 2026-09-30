import os
import sys
import time
import subprocess
import imageio_ffmpeg
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
REPO_ROOT = Path(r"C:\Users\Admin\.gemini\antigravity\scratch\claude-youtube-editor")
PROJECT_DIR = REPO_ROOT / "videos" / "my-video"
MEDIA_DIR = REPO_ROOT / "media" / "projects" / "my-video"
WORK_DIR = PROJECT_DIR / "work"
TEMP_DIR = WORK_DIR / "temp_segments_scratch_color"

TEMP_DIR.mkdir(parents=True, exist_ok=True)
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

CUT_LIST = [
    {
        "clip_id": "0142",
        "file": "IMG_0142.MOV",
        "start": 2.05,
        "end": 25.95,
        "title": "Hook & Câu chuyện thực tế"
    },
    {
        "clip_id": "0144",
        "file": "IMG_0144.MOV",
        "start": 2.00,
        "end": 29.20,
        "title": "Thợ dùng tool vs Người làm phân tích"
    },
    {
        "clip_id": "0145",
        "file": "IMG_0145.MOV",
        "start": 8.70,
        "end": 36.25,
        "title": "Bản chất thực sự của nghề BA"
    },
    {
        "clip_id": "0153",
        "file": "IMG_0153.MOV",
        "start": 3.35,
        "end": 22.00,
        "title": "Thời đại AI: Tool dễ học, tư duy khó rèn"
    },
    {
        "clip_id": "0154",
        "file": "IMG_0154.MOV",
        "start": 4.05,
        "end": 40.95,
        "title": "Chương trình Interview Master"
    },
    {
        "clip_id": "0155",
        "file": "IMG_0155.mov",
        "start": 5.90,
        "end": 19.75,
        "title": "Vấn đề học sai trọng tâm"
    },
    {
        "clip_id": "0156",
        "file": "IMG_0156.MOV",
        "start": 4.00,
        "end": 14.10,
        "title": "Kêu gọi hành động (Call To Action)"
    }
]

VF_SCRATCH = (
    "zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709:m=bt709:r=tv,"
    "tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,"
    "eq=contrast=1.06:brightness=0.01:saturation=1.12,unsharp=3:3:0.5"
)

print(f"=== Bắt đầu encode {len(CUT_LIST)} đoạn clip với công thức màu Scratch V10 ===", flush=True)
t_start = time.time()

segment_files = []
concat_manifest = TEMP_DIR / "concat_list.txt"

with open(concat_manifest, "w", encoding="utf-8") as f_manifest:
    for idx, item in enumerate(CUT_LIST):
        src_path = PROJECT_DIR / item["file"]
        dur = item["end"] - item["start"]
        out_seg = TEMP_DIR / f"seg_{idx:02d}_{item['clip_id']}.mp4"
        segment_files.append(out_seg)
        
        # Check if already successfully rendered test_seg_0154
        if item["clip_id"] == "0154" and os.path.exists(r"C:\Users\Admin\.gemini\antigravity\scratch\test_seg_0154.mp4"):
            import shutil
            shutil.copy2(r"C:\Users\Admin\.gemini\antigravity\scratch\test_seg_0154.mp4", str(out_seg))
            print(f"[{idx+1}/{len(CUT_LIST)}] Dùng đoạn đã encode sẵn cho clip {item['clip_id']}!", flush=True)
        else:
            print(f"[{idx+1}/{len(CUT_LIST)}] Cắt & chỉnh màu clip {item['clip_id']} ({item['title']}): {item['start']}s -> {item['end']}s (dài {dur:.2f}s)...", flush=True)
            
            cmd = [
                ffmpeg_exe, "-y",
                "-ss", str(item["start"]),
                "-t", str(dur),
                "-i", str(src_path),
                "-vf", VF_SCRATCH,
                "-c:v", "libx264",
                "-preset", "veryfast",
                "-crf", "18",
                "-c:a", "aac",
                "-b:a", "192k",
                "-ar", "48000",
                str(out_seg)
            ]
            res = subprocess.run(cmd, capture_output=True, text=True)
            if res.returncode != 0:
                print(f"Lỗi khi cắt {item['clip_id']}: {res.stderr}")
                sys.exit(1)
            
        f_manifest.write(f"file '{out_seg.resolve().as_posix()}'\n")

# Ghép toàn bộ các đoạn bằng ffmpeg concat demuxer
master_media = MEDIA_DIR / "master.mp4"
print(f"\n=== Đang ghép các đoạn thành master.mp4: {master_media} ===", flush=True)

concat_cmd = [
    ffmpeg_exe, "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_manifest),
    "-c", "copy",
    str(master_media)
]
res_concat = subprocess.run(concat_cmd, capture_output=True, text=True)
if res_concat.returncode != 0:
    print(f"Lỗi khi ghép video: {res_concat.stderr}")
    sys.exit(1)

total_sec = time.time() - t_start
size_mb = os.path.getsize(master_media) / (1024 * 1024)
print(f"\n✅ ĐÃ TẠO THÀNH CÔNG master.mp4!", flush=True)
print(f"File: {master_media} ({size_mb:.1f} MB, {total_sec:.1f}s)", flush=True)
