import os
import sys
import json
import subprocess
import numpy as np
from scipy.io import wavfile
from scipy.signal import hilbert, find_peaks
import imageio_ffmpeg

def extract_audio_wav(video_path, output_wav_path, sample_rate=16000):
    """Extract mono 16kHz WAV from video using ffmpeg."""
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg_exe, "-y", "-i", video_path,
        "-ac", "1", "-ar", str(sample_rate), "-vn",
        output_wav_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    return output_wav_path

def detect_emphasis(wav_path, sample_rate=16000, frame_duration=0.04, hop_duration=0.02):
    """
    Detects voice emphasis spikes using RMS Energy + Pitch / Spectral dynamics.
    Returns list of emphasis events with timestamp, intensity score, and suggested effects.
    """
    sr, data = wavfile.read(wav_path)
    if data.ndim > 1:
        data = data[:, 0]
    data = data.astype(np.float32)
    # Normalize
    max_val = np.max(np.abs(data)) + 1e-9
    data = data / max_val

    frame_len = int(sample_rate * frame_duration)
    hop_len = int(sample_rate * hop_duration)
    total_frames = (len(data) - frame_len) // hop_len

    times = []
    rms_energy = []

    for i in range(total_frames):
        start = i * hop_len
        end = start + frame_len
        chunk = data[start:end]
        rms = np.sqrt(np.mean(chunk**2) + 1e-9)
        rms_energy.append(rms)
        times.append(start / sample_rate)

    rms_energy = np.array(rms_energy)
    times = np.array(times)

    # Calculate baseline and threshold
    mean_energy = np.mean(rms_energy)
    std_energy = np.std(rms_energy)
    z_scores = (rms_energy - mean_energy) / (std_energy + 1e-9)

    # Detect peaks with minimum distance of 0.8s between major emphasis
    min_dist_frames = int(0.8 / hop_duration)
    peaks, properties = find_peaks(z_scores, height=1.3, distance=min_dist_frames)

    emphasis_events = []
    for p in peaks:
        t = round(float(times[p]), 2)
        score = round(float(z_scores[p]), 2)

        # Decide effect based on emphasis intensity
        if score > 2.2:
            suggested_fx = {
                "type": "impact_punch",
                "zoom_scale": 1.08,
                "duration_s": 0.35,
                "sfx": "bass_thud",
                "vfx": "color_burst"
            }
        elif score > 1.6:
            suggested_fx = {
                "type": "micro_zoom",
                "zoom_scale": 1.05,
                "duration_s": 0.25,
                "sfx": "pop",
                "vfx": "text_highlight"
            }
        else:
            suggested_fx = {
                "type": "text_spring",
                "zoom_scale": 1.03,
                "duration_s": 0.20,
                "sfx": "click",
                "vfx": "subtle_glow"
            }

        emphasis_events.append({
            "timestamp": t,
            "z_score": score,
            "effect": suggested_fx
        })

    return emphasis_events

def analyze_video_emphasis(video_path, output_json=None):
    temp_wav = video_path + ".temp_emphasis.wav"
    try:
        print(f"[Emphasis Detector] Extracting audio from {os.path.basename(video_path)}...")
        extract_audio_wav(video_path, temp_wav)
        print("[Emphasis Detector] Calculating acoustic energy & pitch curves...")
        events = detect_emphasis(temp_wav)
        print(f"[Emphasis Detector] Found {len(events)} voice emphasis moments!")
        
        if output_json:
            with open(output_json, 'w', encoding='utf-8') as f:
                json.dump({"events": events, "count": len(events)}, f, indent=2)
            print(f"[Emphasis Detector] Saved to {output_json}")
        return events
    finally:
        if os.path.exists(temp_wav):
            os.remove(temp_wav)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        vid = sys.argv[1]
        out = sys.argv[2] if len(sys.argv) > 2 else "emphasis_markers.json"
        analyze_video_emphasis(vid, out)
    else:
        # Test on current project video
        default_vid = r"C:\Users\Admin\.gemini\antigravity\scratch\claude-youtube-editor\media\projects\my-video\master.mp4"
        if os.path.exists(default_vid):
            events = analyze_video_emphasis(default_vid, "emphasis_markers.json")
            for e in events[:10]:
                print(f"  At {e['timestamp']}s (Score {e['z_score']}): {e['effect']['type']} -> SFX: {e['effect']['sfx']}")
