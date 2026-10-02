---
name: chin-lock
description: Frame-by-frame face and chin tracking to guarantee subtitles sit safely below the speaker's collar and mouth without overlapping face or UI.
---

# Chin-Lock Skill

The Chin-Lock skill detects the exact chin and face bounding box of the speaker across footage to guarantee that subtitles, callouts, and lower-third graphics sit naturally **below the collar** (at `y = chin + 40px` or `top: 1300px` on 1080x1920).

## 🎯 When to Use
- Whenever positioning subtitles on talking-head footage.
- When the speaker moves, leans in, or walks during the video.
- To prevent subtitles from riding up onto the chin, lips, or collar.

## 📐 Safe Coordinate Math
- Standard 9:16 Canvas: `1080 x 1920 px`.
- YuNet Face Detector (`media/models/face_detection_yunet_2023mar.onnx`):
  - Normalized y coordinate: `-0.36` (CapCut coordinate space where `0.0` is center, `+1.0` is top, `-1.0` is bottom).
  - Pixel top position: `~1280px - 1320px` (Remotion / CSS space).

## 🚀 Usage in Engine
```bash
python -c "
import sys; sys.path.insert(0, 'engine')
import chin_lock
res = chin_lock.lock('path/to/video.mp4', t0=0.0, t1=5.0, offset=40)
print(res)
"
```
Mode is `'hold'` when the speaker is steady (single stable Y value), or `'follow'` when the speaker moves.
