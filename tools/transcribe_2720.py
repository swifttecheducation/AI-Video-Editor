import os
import json
import sys
from google import genai

sys.stdout.reconfigure(encoding='utf-8')

api_key = ""
for line in open('.env', encoding='utf-8').read().splitlines():
    if line.startswith('GEMINI_API_KEY='):
        api_key = line.split('=', 1)[1].strip()

client = genai.Client(api_key=api_key)
audio_file = client.files.upload(file='videos/input-drive/audio/IMG_2720.wav')
res = client.models.generate_content(
    model='gemini-3.5-flash-lite',
    contents=[audio_file, "Transcribe this Vietnamese audio verbatim. Respond with a JSON object: {\"full_text\": \"...\", \"segments\": [{\"start\": 0.0, \"end\": 5.0, \"text\": \"...\"}]}"]
)
text = res.text.strip()
if text.startswith('```json'): text = text[7:]
if text.startswith('```'): text = text[3:]
if text.endswith('```'): text = text[:-3]

try:
    data = json.loads(text.strip())
except Exception as e:
    data = {'full_text': text.strip(), 'segments': [{'start': 0.0, 'end': 6.0, 'text': text.strip()}]}

data['clip_id'] = 'IMG_2720'
with open('videos/input-drive/transcripts/IMG_2720.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("IMG_2720 transcribed:", data.get('full_text', ''))
