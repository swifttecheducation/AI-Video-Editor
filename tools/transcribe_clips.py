import os
import glob
import json
import time
import sys
from google import genai

sys.stdout.reconfigure(encoding='utf-8')

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", ""))
wav_files = sorted(glob.glob('videos/my-video/work/audio/*.wav'))

os.makedirs('videos/my-video/work/transcripts', exist_ok=True)
all_transcripts = {}

prompt = """
You are an expert audio transcriber.
Transcribe this Vietnamese audio verbatim with exact timestamps for each sentence or phrase.
Return JSON format with the following structure:
{
  "segments": [
    {
      "start": 0.0,
      "end": 2.5,
      "text": "..."
    }
  ],
  "full_text": "..."
}
Only output valid JSON, no markdown backticks.
"""

for wav in wav_files:
    clip_id = os.path.basename(wav).replace('.wav', '')
    out_json = f'videos/my-video/work/transcripts/{clip_id}.json'
    
    print(f'Transcribing clip {clip_id}...')
    try:
        audio_file = client.files.upload(file=wav)
        res = client.models.generate_content(
            model='gemini-3.5-flash-lite',
            contents=[audio_file, prompt]
        )
        text = res.text.strip()
        if text.startswith('```json'):
            text = text[7:]
        if text.startswith('```'):
            text = text[3:]
        if text.endswith('```'):
            text = text[:-3]
        data = json.loads(text.strip())
        data['clip_id'] = clip_id
        
        with open(out_json, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        print(f'-> {clip_id}: {data.get("full_text", "")[:80]}...')
        all_transcripts[clip_id] = data
    except Exception as e:
        print(f'Error on {clip_id}: {e}')
    time.sleep(1)

with open('videos/my-video/work/all_transcripts.json', 'w', encoding='utf-8') as f:
    json.dump(all_transcripts, f, ensure_ascii=False, indent=2)

print('All clips transcribed successfully!')
