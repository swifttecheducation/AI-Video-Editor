import glob
import json
import subprocess
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

clips = [
    'IMG_2722', 'IMG_2725', 'IMG_2728', 'IMG_2729', 
    'IMG_2731', 'IMG_2733', 'IMG_2737', 'IMG_2744', 
    'IMG_2745', 'IMG_2746', 'IMG_2751', 'IMG_2752', 'IMG_2754'
]

results = []

for c in clips:
    path = f'videos/input-drive/{c}.MOV'
    if not os.path.exists(path):
        path = f'videos/input-drive/{c}.mov'
    
    # get duration
    dur_cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', path]
    dur = float(subprocess.run(dur_cmd, capture_output=True, text=True).stdout.strip())
    
    # run silencedetect
    cmd = ['ffmpeg', '-i', path, '-af', 'silencedetect=noise=-30dB:d=0.25', '-f', 'null', '-']
    res = subprocess.run(cmd, capture_output=True, text=True)
    silences = []
    for line in res.stderr.splitlines():
        if 'silence_start:' in line:
            start_val = float(line.split('silence_start:')[1].strip().split()[0])
            silences.append(('start', start_val))
        elif 'silence_end:' in line:
            parts = line.split('silence_end:')[1].strip().split()
            try:
                end_val = float(parts[0])
                silences.append(('end', end_val))
            except Exception:
                pass

    # initial speech start estimation
    first_speech = 0.0
    if silences and silences[0][0] == 'end' and silences[0][1] < 3.0:
        first_speech = silences[0][1]

    # transcript
    tr_path = f'videos/input-drive/transcripts/{c}.json'
    text = ""
    segments = []
    if os.path.exists(tr_path):
        with open(tr_path, encoding='utf-8') as jf:
            tr_data = json.load(jf)
            text = tr_data.get('full_text', '') or tr_data.get('text', '')
            segments = tr_data.get('segments', [])

    info = {
        'clip_id': c,
        'path': path,
        'duration': round(dur, 2),
        'silences': silences,
        'text': text,
        'segments': segments
    }
    results.append(info)
    print(f"[{c}] dur={dur:.2f}s | text: {text}")

with open('videos/input-drive/clip_analysis.json', 'w', encoding='utf-8') as out:
    json.dump(results, out, ensure_ascii=False, indent=2)
