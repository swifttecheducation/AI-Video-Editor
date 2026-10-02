---
name: reel-layout-rules
description: Layout standards, safe zones, typography hierarchy, and squint-test rules for 9:16 short-form video reels.
---

# Reel Layout Rules & Safe Zones

Hard constraints derived from platform UI (Instagram Reels, TikTok, YouTube Shorts) and editorial best practices.

## 🛑 Platform Safe Zones (1080 x 1920)
1. **Top Safe Band**: `y: 0 - 270px`
   - Reserved for platform header, account name, close buttons, and audio icons.
   - Meaning-bearing text MUST start below `y: 270px`.
2. **Bottom Safe Band**: `y: 1600 - 1920px`
   - Reserved for audio ticker, native caption toggles, like/comment sidebar.
   - Captions and callouts MUST stay above `y: 1600px`.
3. **Horizontal Safe Margin**: `x: 120px - 960px`
   - Leave 120px padding on left and right to prevent truncation on different device aspect ratios.

## 👑 Typography Hierarchy
- **Headline / Hook**: `size: ~60-70px` (or normalized `18.0`), prominent, high contrast.
- **Eyebrow / Subhead**: `size: ~28-36px`, clearly subordinate to the headline.
- **Subtitles**: `size: ~66-72px` (SVN-Chicken Noodle Soup) or `48-52px` (sans-serif), anchored at `top: 1300px` (below collar).
- **Legibility Floor**: Soft drop shadow `0 3px 14px rgba(0,0,0,0.72)` is mandatory for light text over moving video backgrounds.

## 🔍 The Squint Test
- When you blur the frame, the **Hook Headline** must catch the eye first, followed by the **Speaker's Face**, and lastly the **Subtitles**.
- If the eye lands on decorative clutter first, the layout fails.
