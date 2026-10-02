#!/usr/bin/env python3
"""hook_engine.py — Performance-engineered Hook System for AI Video Editor.

Based on measured retention performance across thousands of short-form videos.

Rules:
1. NEVER mirror the spoken opener. Repeating audio on screen buys no stop.
2. The hook card must open a category/tension loop that the spoken audio takes time to explore.
3. Only THREE allowed hook shapes (all occupy top safe zone: y 270px - 600px):
   - 'hook_card': Single powerful line.
   - 'eyebrow_headline': Small framing line above, dominant headline below.
   - 'headline_subhead': Dominant tension headline first, quieter subhead below.
4. Holds ~8s by default, or the whole reel if persist=True.
5. NEVER add a separate persistent category chip/bar at the top — two text systems never compete.
"""

import re
from typing import Dict, Any, Optional, Tuple

class HookEngine:
    def __init__(self):
        self.top_safe_zone_min = 270  # pixels from top (IG/TikTok status bar)
        self.top_safe_zone_max = 620  # upper chest boundary

    @staticmethod
    def validate_not_mirroring(hook_text: str, spoken_first_sentence: str) -> Tuple[bool, float, str]:
        """
        Calculates lexical overlap between hook and spoken opener.
        Returns (is_valid, overlap_ratio, reason).
        """
        if not spoken_first_sentence:
            return True, 0.0, "No spoken text to compare against."

        def tokenize(text: str):
            clean = re.sub(r'[^\w\s]', '', text.lower())
            return set(clean.split())

        hook_tokens = tokenize(hook_text)
        spoken_tokens = tokenize(spoken_first_sentence)

        if not hook_tokens:
            return False, 0.0, "Hook text cannot be empty."

        overlap = hook_tokens.intersection(spoken_tokens)
        ratio = len(overlap) / len(hook_tokens)

        # If > 70% of hook words are simply what the speaker said in first breath -> REJECT
        if ratio >= 0.70:
            return False, ratio, (
                f"Hook mirrors spoken opener ({ratio*100:.0f}% word overlap: {overlap}). "
                "The hook must name the tension or category, NOT repeat the audio words."
            )
        return True, ratio, f"Valid non-mirroring hook ({ratio*100:.0f}% overlap)."

    @staticmethod
    def format_hook(
        shape: str, # 'hook_card' | 'eyebrow_headline' | 'headline_subhead'
        headline: str,
        subhead_or_eyebrow: Optional[str] = None,
        duration: float = 8.0,
        persist: bool = False
    ) -> Dict[str, Any]:
        """
        Structures the hook according to the 3 permitted performance shapes.
        """
        if shape not in ("hook_card", "eyebrow_headline", "headline_subhead"):
            raise ValueError(f"Invalid hook shape: {shape}. Allowed: hook_card, eyebrow_headline, headline_subhead")

        if shape == "hook_card":
            return {
                "shape": "hook_card",
                "headline": headline.strip(),
                "eyebrow": None,
                "subhead": None,
                "duration": 999.0 if persist else duration,
                "persist": persist,
                "emphasis": "first"
            }
        elif shape == "eyebrow_headline":
            return {
                "shape": "eyebrow_headline",
                "eyebrow": (subhead_or_eyebrow or "").strip(),
                "headline": headline.strip(),
                "subhead": None,
                "duration": 999.0 if persist else duration,
                "persist": persist,
                "emphasis": "second"
            }
        else: # headline_subhead
            return {
                "shape": "headline_subhead",
                "headline": headline.strip(),
                "subhead": (subhead_or_eyebrow or "").strip(),
                "eyebrow": None,
                "duration": 999.0 if persist else duration,
                "persist": persist,
                "emphasis": "first"
            }
