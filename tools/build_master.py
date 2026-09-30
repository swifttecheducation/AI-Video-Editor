import os
import subprocess
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = Path(__file__).resolve().parent.parent
PROJECT_DIR = REPO_ROOT / "videos" / "my-video"
OUTPUT_DIR = PROJECT_DIR / "output"
WORK_DIR = PROJECT_DIR / "work"
TEMP_DIR = WORK_DIR / "temp_segments"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

# 7 storytelling clips with their precise cut points (removing dead air & false pauses)
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

print(f"=== Bắt đầu cắt và chuẩn hóa {len(CUT_LIST)} đoạn clip ===")

segment_files = []
concat_manifest = TEMP_DIR / "concat_list.txt"

with open(concat_manifest, "w", encoding="utf-8") as f_manifest:
    for idx, item in enumerate(CUT_LIST):
        src_path = PROJECT_DIR / item["file"]
        dur = item["end"] - item["start"]
        out_seg = TEMP_DIR / f"seg_{idx:02d}_{item['clip_id']}.mp4"
        segment_files.append(out_seg)
        
        print(f"[{idx+1}/{len(CUT_LIST)}] Cắt clip {item['clip_id']} ({item['title']}): {item['start']}s -> {item['end']}s (dài {dur:.2f}s)...")
        
        # Trim and encode to clean 1080x1920 CFR 30fps H264
        cmd = [
            "ffmpeg", "-y",
            "-loglevel", "error",
            "-ss", str(item["start"]),
            "-i", str(src_path),
            "-t", str(dur),
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
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Lỗi khi cắt {item['clip_id']}: {res.stderr}")
            exit(1)
            
        f_manifest.write(f"file '{out_seg.resolve().as_posix()}'\n")

# Ghép toàn bộ các đoạn bằng ffmpeg concat demuxer
master_output = OUTPUT_DIR / "master_clean_cut.mp4"
print(f"\n=== Đang ghép các đoạn thành video Master: {master_output.name} ===")

concat_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_manifest),
    "-c", "copy",
    str(master_output)
]
res_concat = subprocess.run(concat_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
if res_concat.returncode != 0:
    print(f"Lỗi khi ghép video: {res_concat.stderr}")
    exit(1)

# Kiểm tra thời lượng file master
probe_cmd = [
    "ffprobe", "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    str(master_output)
]
probe_res = subprocess.run(probe_cmd, capture_output=True, text=True)
total_master_duration = float(probe_res.stdout.strip())

print(f"\n✅ ĐÃ GHÉP THÀNH CÔNG!")
print(f"File đầu ra: {master_output}")
print(f"Tổng thời lượng video: {total_master_duration:.2f} giây ({total_master_duration/60:.2f} phút)")

# Tạo file edited-transcript.json tổng hợp
timeline_master = []
current_time_offset = 0.0

with open(WORK_DIR / "all_transcripts.json", "r", encoding="utf-8") as f:
    all_raw = json.load(f)

for item in CUT_LIST:
    cid = item["clip_id"]
    dur = item["end"] - item["start"]
    raw_segs = all_raw[cid]["segments"]
    for seg in raw_segs:
        # Check if segment falls within cut range
        if seg["end"] >= item["start"] and seg["start"] <= item["end"]:
            seg_s = max(0.0, seg["start"] - item["start"]) + current_time_offset
            seg_e = min(dur, seg["end"] - item["start"]) + current_time_offset
            timeline_master.append({
                "clip_id": cid,
                "text": seg["text"],
                "start": round(seg_s, 2),
                "end": round(seg_e, 2)
            })
    current_time_offset += dur

with open(WORK_DIR / "edited-transcript.json", "w", encoding="utf-8") as f:
    json.dump({
        "video_title": "Tại sao nhiều bạn học BA mãi không xin được việc? (Thợ Tool vs BA thực chiến)",
        "duration": round(total_master_duration, 2),
        "resolution": "1080x1920",
        "fps": 30,
        "segments": timeline_master
    }, f, ensure_ascii=False, indent=2)

print(f"Đã cập nhật edited-transcript.json sẵn sàng cho Remotion!")
