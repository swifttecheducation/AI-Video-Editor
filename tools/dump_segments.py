import glob
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

files = [
    'IMG_2722', 'IMG_2725', 'IMG_2728', 'IMG_2729', 
    'IMG_2731', 'IMG_2733', 'IMG_2737', 'IMG_2744', 
    'IMG_2745', 'IMG_2746', 'IMG_2751', 'IMG_2752', 'IMG_2754'
]

for f in files:
    path = f'videos/input-drive/transcripts/{f}.json'
    if os.path.exists(path):
        data = json.load(open(path, encoding='utf-8'))
        print(f"=== {f} ===")
        for s in data.get('segments', []):
            start = s.get('start', 0.0)
            end = s.get('end', 0.0)
            text = s.get('text', '')
            if text:
                print(f"  [{start:.2f}s - {end:.2f}s] {text}")
