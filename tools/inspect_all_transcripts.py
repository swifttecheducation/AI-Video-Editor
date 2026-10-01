import glob
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

transcripts = {}
files = sorted(glob.glob('videos/input-drive/transcripts/*.json'))

for f in files:
    clip_id = os.path.splitext(os.path.basename(f))[0]
    with open(f, 'r', encoding='utf-8') as jf:
        data = json.load(jf)
        transcripts[clip_id] = data
        text = data.get('full_text', '') or data.get('text', '')
        print(f"[{clip_id}] ({len(text)} chars):\n  {text}\n")

with open('videos/input-drive/all_transcripts.json', 'w', encoding='utf-8') as out:
    json.dump(transcripts, out, ensure_ascii=False, indent=2)
