import os
import numpy as np
from scipy.io import wavfile

def generate_sfx_library(output_dir):
    """
    Generates high-quality procedural UI & Motion Graphic Sound Effects (WAV format):
    - pop.wav: Crisp bubble pop for labels and toggles
    - whoosh.wav: Airy frequency sweep for card transitions
    - ding.wav: Crystal bell chime for insights and key points
    - bass_thud.wav: Cinematic punch for emphasis and warnings
    - click.wav: Mechanical click for switches
    """
    os.makedirs(output_dir, exist_ok=True)
    sr = 44100

    # 1. Pop (Rapid downward frequency sweep with exponential decay)
    t = np.linspace(0, 0.08, int(sr * 0.08), endpoint=False)
    freq = np.linspace(800, 200, len(t))
    env = np.exp(-t * 60)
    pop = np.sin(2 * np.pi * freq * t) * env
    pop = (pop * 32767).astype(np.int16)
    wavfile.write(os.path.join(output_dir, "pop.wav"), sr, pop)

    # 2. Whoosh (Filtered white noise sweep)
    t = np.linspace(0, 0.28, int(sr * 0.28), endpoint=False)
    noise = np.random.uniform(-1, 1, len(t))
    # bell-shaped amplitude envelope
    env = np.sin(np.pi * (t / 0.28)) ** 2
    # simple sine wave sweep under noise
    sweep = np.sin(2 * np.pi * np.linspace(150, 600, len(t)) * t) * 0.3
    whoosh = (noise * 0.7 + sweep) * env
    whoosh = (whoosh / (np.max(np.abs(whoosh)) + 1e-9) * 28000).astype(np.int16)
    wavfile.write(os.path.join(output_dir, "whoosh.wav"), sr, whoosh)

    # 3. Ding (Pure sine chime with harmonics)
    t = np.linspace(0, 0.6, int(sr * 0.6), endpoint=False)
    f0 = 1760  # A6 note
    chime = (
        np.sin(2 * np.pi * f0 * t) * 0.7 +
        np.sin(2 * np.pi * (f0 * 2) * t) * 0.2 +
        np.sin(2 * np.pi * (f0 * 3) * t) * 0.1
    )
    env = np.exp(-t * 8)
    ding = (chime * env * 30000).astype(np.int16)
    wavfile.write(os.path.join(output_dir, "ding.wav"), sr, ding)

    # 4. Bass Thud (Sub-bass impact for warnings/emphasis)
    t = np.linspace(0, 0.35, int(sr * 0.35), endpoint=False)
    freq = np.linspace(110, 40, len(t))
    thud = np.sin(2 * np.pi * freq * t) * np.exp(-t * 14)
    thud = (thud * 32000).astype(np.int16)
    wavfile.write(os.path.join(output_dir, "bass_thud.wav"), sr, thud)

    # 5. Click (Short micro-impulse)
    t = np.linspace(0, 0.03, int(sr * 0.03), endpoint=False)
    click = np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 200)
    click = (click * 28000).astype(np.int16)
    wavfile.write(os.path.join(output_dir, "click.wav"), sr, click)

    print(f"[SFX Manager] Generated procedural SFX library at: {output_dir}")
    return [
        "pop.wav", "whoosh.wav", "ding.wav", "bass_thud.wav", "click.wav"
    ]

if __name__ == "__main__":
    out = os.path.join(os.path.dirname(__file__), "..", "remotion", "public", "sfx")
    generate_sfx_library(out)
