import subprocess
import json
import os
import sys
from google import genai

sys.stdout.reconfigure(encoding='utf-8')

# Read key from .env
api_key = ""
for line in open('.env', encoding='utf-8').read().splitlines():
    if line.startswith('GEMINI_API_KEY='):
        api_key = line.split('=', 1)[1].strip()

client = genai.Client(api_key=api_key)

master_mp4 = 'videos/life-first-business/master.mp4'
master_wav = 'videos/life-first-business/work/master.wav'

# Extract 16kHz mono audio for transcription
cmd = ['ffmpeg', '-y', '-i', master_mp4, '-ar', '16000', '-ac', '1', master_wav]
subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
print('Master audio extracted.')

prompt = """
You are an expert Vietnamese audio transcriber.
Transcribe this Vietnamese audio verbatim with precise start and end timestamps in seconds for every sentence and key phrase.
Output valid JSON format ONLY:
{
  "duration": 116.32,
  "segments": [
    {
      "start": 0.0,
      "end": 5.6,
      "text": "..."
    }
  ],
  "full_text": "..."
}
Do not use markdown backticks.
"""

print('Uploading master audio to Gemini...')
audio_file = client.files.upload(file=master_wav)
res = client.models.generate_content(
    model='gemini-3.5-flash-lite',
    contents=[audio_file, prompt]
)
text = res.text.strip()
if text.startswith('```json'): text = text[7:]
if text.startswith('```'): text = text[3:]
if text.endswith('```'): text = text[:-3]

try:
    data = json.loads(text.strip())
except Exception as e:
    print('JSON parse error:', e)
    data = {'raw_text': text}

out_path = 'videos/life-first-business/work/master_transcript.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Master transcription saved to:', out_path)
for s in data.get('segments', [])[:10]:
    print(f"  [{s.get('start', 0):.2f}s - {s.get('end', 0):.2f}s] {s.get('text', '')}")
