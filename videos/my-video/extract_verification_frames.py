import os
import subprocess
import imageio_ffmpeg

def main():
    exe = imageio_ffmpeg.get_ffmpeg_exe()
    src = r"C:\Users\Admin\.gemini\antigravity\scratch\claude-youtube-editor\videos\my-video\output\BaInterviewMaster_Final.mp4"
    out_dir = r"C:\Users\Admin\.gemini\antigravity\brain\a0ebf5b2-bee4-4c96-8ee5-a1ed6c7542b3"
    
    timestamps = [
        ("17.5", "verify_beat3_neutral.jpg"),
        ("20.0", "verify_beat3_question.jpg"),
        ("22.8", "verify_beat3_warning.jpg"),
        ("25.5", "verify_beat4_neutral.jpg"),
        ("28.5", "verify_beat4_tool.jpg"),
        ("30.5", "verify_beat4_analysis.jpg"),
        ("48.0", "verify_beat9_cta.jpg"),
    ]
    
    for ss, name in timestamps:
        out_path = os.path.join(out_dir, name)
        cmd = [
            exe, "-y", "-ss", ss, "-i", src,
            "-vframes", "1", "-q:v", "2",
            out_path
        ]
        subprocess.run(cmd, check=True)
        print(f"Extracted {name} at {ss}s")

if __name__ == "__main__":
    main()
