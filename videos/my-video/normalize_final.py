import os
import subprocess
import imageio_ffmpeg

def main():
    exe = imageio_ffmpeg.get_ffmpeg_exe()
    src = r"C:\Users\Admin\.gemini\antigravity\scratch\claude-youtube-editor\remotion\out\BaInterviewMaster.mp4"
    dst = r"C:\Users\Admin\.gemini\antigravity\scratch\claude-youtube-editor\videos\my-video\output\BaInterviewMaster_Final.mp4"
    temp_dst = r"C:\Users\Admin\.gemini\antigravity\scratch\claude-youtube-editor\videos\my-video\output\BaInterviewMaster_Final_norm.mp4"
    
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    
    cmd = [
        exe, "-y", "-i", src,
        "-c:v", "copy",
        "-af", "loudnorm=I=-14:TP=-1.0:LRA=11",
        "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        temp_dst
    ]
    print("Running ffmpeg loudnorm...")
    subprocess.run(cmd, check=True)
    if os.path.exists(dst):
        os.remove(dst)
    os.replace(temp_dst, dst)
    print("Normalization complete! Saved to:", dst)

if __name__ == "__main__":
    main()
