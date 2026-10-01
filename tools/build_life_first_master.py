import os
import subprocess
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = Path(__file__).resolve().parent.parent
PROJECT_DIR = REPO_ROOT / "videos" / "life-first-business"
WORK_DIR = PROJECT_DIR / "work"
TEMP_DIR = WORK_DIR / "temp_segments"
OUTPUT_DIR = PROJECT_DIR / "output"
MEDIA_PROJECT_DIR = REPO_ROOT / "media" / "projects" / "life-first-business"

PROJECT_DIR.mkdir(parents=True, exist_ok=True)
WORK_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
MEDIA_PROJECT_DIR.mkdir(parents=True, exist_ok=True)

INPUT_DIR = REPO_ROOT / "videos" / "input-drive"

# Exact cut segments removing long pauses for a tight, engaging YouTube rhythm
SEGMENTS = [
    # 1. Hook
    {"file": INPUT_DIR / "IMG_2722.MOV", "start": 0.40, "end": 6.00, "label": "Hook"},
    # 2. Intro
    {"file": INPUT_DIR / "IMG_2725.MOV", "start": 0.50, "end": 6.10, "label": "Sia Intro"},
    # 3. Series Episode
    {"file": INPUT_DIR / "IMG_2728.MOV", "start": 0.50, "end": 7.10, "label": "Ep 3 Intro"},
    # 4. Question
    {"file": INPUT_DIR / "IMG_2729.MOV", "start": 0.20, "end": 2.70, "label": "Thực tế hơn nhé"},
    {"file": INPUT_DIR / "IMG_2729.MOV", "start": 4.50, "end": 9.10, "label": "Kiếm tiền cách nào"},
    # 5. Method 1: Tư vấn 1-1
    {"file": INPUT_DIR / "IMG_2731.MOV", "start": 0.30, "end": 8.30, "label": "1. Tư vấn 1-1"},
    # 6. Method 2: Dịch vụ đóng gói
    {"file": INPUT_DIR / "IMG_2733.MOV", "start": 0.90, "end": 7.90, "label": "2. Dịch vụ đóng gói"},
    # 7. Method 3: Lớp học nhỏ
    {"file": INPUT_DIR / "IMG_2737.MOV", "start": 1.40, "end": 9.60, "label": "3. Lớp học nhỏ"},
    # 8. Method 4: Sản phẩm số
    {"file": INPUT_DIR / "IMG_2744.MOV", "start": 0.30, "end": 13.80, "label": "4. Sản phẩm số"},
    # 9. Realization: Không nhất thiết mở business ngay
    {"file": INPUT_DIR / "IMG_2745.mov", "start": 0.30, "end": 4.00, "label": "Không cần mở business ngay"},
    # 10. Alternative: Remote work & Freelance
    {"file": INPUT_DIR / "IMG_2746.mov", "start": 2.30, "end": 6.90, "label": "Remote freelance part-time"},
    {"file": INPUT_DIR / "IMG_2746.mov", "start": 8.40, "end": 10.70, "label": "Cũng là để bắt đầu"},
    {"file": INPUT_DIR / "IMG_2746.mov", "start": 13.70, "end": 17.90, "label": "Nhiều quyền chủ động hơn"},
    {"file": INPUT_DIR / "IMG_2746.mov", "start": 20.70, "end": 24.80, "label": "Tiến gần Life-First Business"},
    # 11. Advice for busy parents
    {"file": INPUT_DIR / "IMG_2751.MOV", "start": 0.90, "end": 4.80, "label": "Không cần làm tất cả"},
    {"file": INPUT_DIR / "IMG_2751.MOV", "start": 6.90, "end": 10.60, "label": "Có con nhỏ ít thời gian"},
    {"file": INPUT_DIR / "IMG_2751.MOV", "start": 13.10, "end": 15.20, "label": "Bắt đầu nhỏ nhất thôi"},
    {"file": INPUT_DIR / "IMG_2751.MOV", "start": 18.00, "end": 22.40, "label": "Kỹ năng hiện tại làm được"},
    # 12. Market validation
    {"file": INPUT_DIR / "IMG_2752.MOV", "start": 0.30, "end": 9.10, "label": "Xem ai trả tiền & fit cuộc sống"},
    # 13. CTA
    {"file": INPUT_DIR / "IMG_2754.MOV", "start": 0.20, "end": 3.90, "label": "Nếu bạn đang tìm cách kiếm tiền"},
    {"file": INPUT_DIR / "IMG_2754.MOV", "start": 5.60, "end": 8.90, "label": "Không muốn cuộc sống xoay quanh CV"},
    {"file": INPUT_DIR / "IMG_2754.MOV", "start": 9.70, "end": 15.60, "label": "Follow mình chia sẻ hành trình"}
]

print(f"=== Bắt đầu cắt và chuẩn hóa {len(SEGMENTS)} đoạn clip ===")

segment_files = []
concat_manifest = TEMP_DIR / "concat_list.txt"

with open(concat_manifest, "w", encoding="utf-8") as f_manifest:
    for idx, item in enumerate(SEGMENTS):
        src_path = item["file"]
        dur = item["end"] - item["start"]
        out_seg = TEMP_DIR / f"seg_{idx:02d}.mp4"
        segment_files.append(out_seg)
        
        print(f"[{idx+1}/{len(SEGMENTS)}] Cắt ({item['label']}): {item['start']}s -> {item['end']}s (dài {dur:.2f}s)...")
        
        # Trim and encode to clean 1080x1920 CFR 30fps H264
        # vf="scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2"
        cmd = [
            "ffmpeg", "-y",
            "-loglevel", "error",
            "-ss", str(item["start"]),
            "-i", str(src_path),
            "-t", str(dur),
            "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "18",
            "-r", "30",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "192k",
            "-ar", "48000",
            str(out_seg)
        ]
        res = subprocess.run(cmd)
        if res.returncode != 0:
            print(f"Lỗi khi cắt đoạn {idx}: {src_path}")
            sys.exit(1)
            
        f_manifest.write(f"file '{out_seg.as_posix()}'\n")

print("\n=== Nối các đoạn thành Master Video ===")
master_mp4 = PROJECT_DIR / "master.mp4"
cmd_concat = [
    "ffmpeg", "-y",
    "-loglevel", "error",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_manifest),
    "-c", "copy",
    str(master_mp4)
]
subprocess.run(cmd_concat, check=True)

# Copy to media/projects/life-first-business/master.mp4 for Remotion
media_master = MEDIA_PROJECT_DIR / "master.mp4"
import shutil
shutil.copyfile(master_mp4, media_master)

# Get final duration
dur_cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(master_mp4)]
master_dur = float(subprocess.run(dur_cmd, capture_output=True, text=True).stdout.strip())

print(f"\n Master Video hoàn tất: {master_mp4}")
print(f" Đã copy sang media: {media_master}")
print(f" Tổng thời lượng: {master_dur:.2f}s ({master_dur/60:.2f} phút)")
