import os
import json
import sys
from pathlib import Path
from google import genai

sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = Path(__file__).resolve().parent.parent
PROJECT_DIR = REPO_ROOT / "videos" / "my-video"
PKG_DIR = PROJECT_DIR / "packaging"
PKG_DIR.mkdir(parents=True, exist_ok=True)

with open(PROJECT_DIR / "work" / "edited-transcript.json", "r", encoding="utf-8") as f:
    transcript_data = json.load(f)

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", ""))

prompt = f"""
You are a top-tier YouTube strategist specializing in high-CTR, high-retention video packaging.
Here is the transcript and summary of a video about Business Analysis (BA) career advice:

Video Duration: 2 phút 37 giây
Key points:
- Từ chối một ứng viên đã học BA 1 năm, biết dùng Jira, User Story, Flowchart, Document.
- Lý do: Khi hỏi "Tại sao chọn câu hỏi đó?", bạn ấy lúng túng vì chỉ là "thợ dùng tool", chưa có tư duy phân tích (Why vs How).
- Cầm mic không có nghĩa là ca sĩ; biết tool không có nghĩa là làm được BA.
- 3 câu hỏi cốt lõi của BA: Tại sao cần? Bản chất vấn đề là gì? Ảnh hưởng gì đến hệ thống?
- Thời đại AI: Tool học vài tuần là xong, nhưng tư duy phân tích cần nhiều năm mài giũa.
- Giới thiệu chương trình Interview Master và kêu gọi comment email.

Generate a comprehensive YouTube Packaging Plan in JSON format with:
1. "locked_title": One punchy, high-CTR, curiosity-driven title (Vietnamese).
2. "alternative_titles": 4 alternative titles (for testing).
3. "thumbnail_bets": An array of 3 distinct thumbnail bets for YouTube A/B/C testing:
   - "bet_name": (e.g. "Bet A: Pain / Shock", "Bet B: Contrast / Truth", "Bet C: AI Era Threat")
   - "concept": visual description of what should be on the thumbnail
   - "text_overlay": max 3-5 bold words in Vietnamese
   - "hook_rationale": why this drives clicks
4. "description": A value-forward YouTube description with timestamps and call to action.
5. "tags": Array of 15 targeted YouTube tags.

Return ONLY raw JSON, no markdown code blocks.
"""

print("Generating packaging with Gemini...")
res = client.models.generate_content(
    model='gemini-3.5-flash-lite',
    contents=prompt
)

text = res.text.strip()
if text.startswith('```json'):
    text = text[7:]
if text.startswith('```'):
    text = text[3:]
if text.endswith('```'):
    text = text[:-3]

data = json.loads(text.strip())

with open(PKG_DIR / "packaging.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Packaging generated successfully in videos/my-video/packaging/packaging.json!")
