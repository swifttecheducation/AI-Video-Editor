import os
import glob
import json
import subprocess
from faster_whisper import WhisperModel

os.makedirs("media/audio", exist_ok=True)
os.makedirs("media/transcripts", exist_ok=True)

ffmpeg = "./venv/bin/ffmpeg"
clips = sorted(glob.glob("media/raw_clips/*.MOV"))
print(f"Found {len(clips)} raw clips.")

# 1. Extract audio
for clip in clips:
    base = os.path.basename(clip).replace(".MOV", "")
    wav = f"media/audio/{base}.wav"
    if not os.path.exists(wav):
        cmd = [ffmpeg, "-y", "-i", clip, "-ac", "1", "-ar", "16000", "-vn", wav]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

print("All audio extracted.")

# 2. Transcribe with faster-whisper
print("Loading Whisper model (small)...")
model = WhisperModel("small", device="cpu", compute_type="int8")

all_transcripts = {}
for clip in clips:
    base = os.path.basename(clip).replace(".MOV", "")
    wav = f"media/audio/{base}.wav"
    json_path = f"media/transcripts/{base}.json"
    
    segments, info = model.transcribe(wav, language="vi", word_timestamps=True)
    seg_list = []
    full_text = []
    for s in segments:
        words = []
        if s.words:
            for w in s.words:
                words.append({
                    "word": w.word,
                    "start": round(w.start, 2),
                    "end": round(w.end, 2),
                    "prob": round(w.probability, 2)
                })
        seg_list.append({
            "start": round(s.start, 2),
            "end": round(s.end, 2),
            "text": s.text.strip(),
            "words": words
        })
        full_text.append(s.text.strip())
        
    text_content = " ".join(full_text)
    res = {
        "clip_id": base,
        "duration": round(info.duration, 2),
        "text": text_content,
        "segments": seg_list
    }
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(res, f, ensure_ascii=False, indent=2)
    print(f"[{base}] ({info.duration:.1f}s): {text_content}")
    all_transcripts[base] = res

with open("media/all_transcripts.json", "w", encoding="utf-8") as f:
    json.dump(all_transcripts, f, ensure_ascii=False, indent=2)

print("\nTranscription complete!")
