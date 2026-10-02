---
name: hook-craft
description: Performance-backed hook engineering rules, anti-mirroring validation, and 3 approved hook shapes for viral retention.
---

# Hook Craft Skill

A hook is the single most critical element predicting reel completion rate. This skill enforces measured hook structures that stop scrolling.

## 🚫 Rule #1: Never Mirror the Spoken Opener
- **Defect**: Writing what the speaker says in the first 3 seconds on screen.
- **Why it fails**: Repeating spoken audio provides zero new information. The viewer gets no curiosity gap and scrolls away.
- **Correct approach**: The on-screen text **names the category or tension** early, allowing the spoken audio to be an authentic slow burn.

## 📐 The 3 Permitted Hook Shapes
Only ONE text block at the top of the frame. Exactly 3 shapes are allowed:

| Shape | Structure | How to Use |
|---|---|---|
| **Hook Card** | 1 Line Headline | Shortest, punchiest, high tension. |
| **Eyebrow + Headline** | Small Eyebrow above, Big Headline below | Small line frames context, big line delivers the punch (`emphasis: "second"`). |
| **Headline + Subhead** | Big Headline above, Quieter Subhead below | Big line hooks tension, subhead turns the knife or identifies audience (`emphasis: "first"`). |

## ⏱️ Duration & Persistence
- Default: holds for **~8 seconds** (`duration: 8.0`).
- Persistent: holds for the **entire reel** (`hook_persist: true`) when it serves as the core premise anchor.
- **NEVER** add a separate persistent category banner/chip that competes with the hook block.
