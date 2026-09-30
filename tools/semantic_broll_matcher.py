#!/usr/bin/env python3
"""
Semantic B-Roll Matcher
Automatically identifies semantic concepts from speech transcripts
and schedules contextual B-roll cutaways with smooth Ken Burns motion and foley SFX.
"""

import os
import json
import glob
import re

SEMANTIC_RULES = [
    {
        "concept": "ad_expense_friction",
        "keywords": ["quảng cáo", "chạy ads", "tốn kém", "chi phí", "ngân sách"],
        "media_src": "library/workspace/w2-establishing.jpg",
        "label": "Chi phí tiếp thị & Quảng cáo",
        "sfx": "library/sfx/clips/whoosh-soft.mp3",
        "preferred_duration": 2.5
    },
    {
        "concept": "audience_database",
        "keywords": ["tài sản", "khách hàng", "dữ liệu", "data", "database", "có sẵn"],
        "media_src": "library/workspace/w1-establishing.jpg",
        "label": "Tài sản cốt lõi: Tệp khách hàng & Data",
        "sfx": "library/sfx/clips/keys-typing-soft.mp3",
        "preferred_duration": 3.0
    },
    {
        "concept": "strategy_framework",
        "keywords": ["chiến dịch", "cash campaign", "kế hoạch", "bước", "quy trình"],
        "media_src": "library/workspace/w3-establishing.png",
        "label": "Khung chiến dịch: Cash Campaign",
        "sfx": "library/sfx/clips/pencil-scribble.mp3",
        "preferred_duration": 2.8
    },
    {
        "concept": "execution_focus",
        "keywords": ["lời đề nghị", "offer", "sản phẩm", "giá trị", "đóng gói"],
        "media_src": "library/workspace/w1-establishing.jpg",
        "label": "Đóng gói Lời đề nghị (Irresistible Offer)",
        "sfx": "library/sfx/clips/pop-reveal.mp3",
        "preferred_duration": 2.5
    },
    {
        "concept": "urgency_window",
        "keywords": ["thời hạn", "48 giờ", "giới hạn", "khan hiếm", "hạn chót"],
        "media_src": "library/workspace/w2-establishing.jpg",
        "label": "Tạo tính cấp bách: 48 Giờ",
        "sfx": "library/sfx/clips/clock-tick-soft.mp3",
        "preferred_duration": 2.5
    }
]

def analyze_transcript(transcript_path="media/master_words.json", output_path="media/semantic_broll_schedule.json"):
    if not os.path.exists(transcript_path):
        print(f"File {transcript_path} not found.")
        return

    with open(transcript_path, "r", encoding="utf-8") as f:
        words = json.load(f)

    print(f"Loaded {len(words)} words from master transcript.")

    # Convert words to sliding window text
    full_text = " ".join([w["word"] for w in words]).lower()

    broll_events = []
    last_end = 0.0
    min_gap_between_brolls = 5.0  # At least 5 seconds of talking head between B-rolls

    for i, w in enumerate(words):
        current_time = w["start"]
        if current_time < 3.0: # Keep hook talking head clean
            continue
        if current_time - last_end < min_gap_between_brolls:
            continue

        # Check a window of 8 upcoming words
        window_words = [words[j]["word"].lower() for j in range(i, min(len(words), i + 8))]
        window_str = " ".join(window_words)

        matched_rule = None
        for rule in SEMANTIC_RULES:
            for kw in rule["keywords"]:
                if kw in window_str:
                    matched_rule = rule
                    break
            if matched_rule:
                break

        if matched_rule:
            start_t = round(current_time, 2)
            end_t = round(start_t + matched_rule["preferred_duration"], 2)
            broll_events.append({
                "concept": matched_rule["concept"],
                "start": start_t,
                "end": end_t,
                "duration": matched_rule["preferred_duration"],
                "media_src": matched_rule["media_src"],
                "label": matched_rule["label"],
                "sfx": matched_rule["sfx"]
            })
            last_end = end_t

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(broll_events, f, ensure_ascii=False, indent=2)

    print(f"Generated {len(broll_events)} semantic B-roll events -> {output_path}")
    for ev in broll_events:
        print(f"  [{ev['start']}s - {ev['end']}s] {ev['label']} ({ev['media_src']})")

if __name__ == "__main__":
    analyze_transcript()
