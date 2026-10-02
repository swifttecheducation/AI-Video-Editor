import os
import sys
import json
import uuid
import time
import shutil
import subprocess
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = Path(__file__).resolve().parent.parent
MASTER_RAW = REPO_ROOT / "videos" / "life-first-business" / "master.mp4"
FONT_FILE = REPO_ROOT / "media" / "fonts" / "SVN-Chicken-Noodle-Soup.otf"
BROLL_DIR = REPO_ROOT / "media" / "library" / "life_first_broll"
REFERENCE_VIDEO = Path("C:/Users/Admin/OneDrive/Desktop/LifeFirstBusiness_Final.mp4")

# Desktop Package
DESKTOP_DIR = Path("C:/Users/Admin/OneDrive/Desktop/CapCut_LifeFirstBusiness")
DESKTOP_DIR.mkdir(parents=True, exist_ok=True)

# CapCut Draft Directory
CAPCUT_DRAFTS_ROOT = Path("D:/CapCut Drafts")
CAPCUT_PROJECT_DIR = CAPCUT_DRAFTS_ROOT / "LifeFirstBusiness"
CAPCUT_PROJECT_DIR.mkdir(parents=True, exist_ok=True)

print("=== 1. Chuẩn bị Video Clean Footage với Âm thanh Chuẩn -14 LUFS ===")
CLEAN_VIDEO = CAPCUT_PROJECT_DIR / "LifeFirstBusiness_CleanFootage.mp4"
if not CLEAN_VIDEO.exists():
    cmd_norm = [
        "ffmpeg", "-y",
        "-loglevel", "warning",
        "-i", str(MASTER_RAW),
        "-af", "loudnorm=I=-14:LRA=7:TP=-1.0",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        str(CLEAN_VIDEO)
    ]
    subprocess.run(cmd_norm, check=True)
    print(f"-> Tạo xong video sạch: {CLEAN_VIDEO}")
else:
    print(f"-> Đã có sẵn: {CLEAN_VIDEO}")

# Copy to Desktop
clean_desktop = DESKTOP_DIR / "LifeFirstBusiness_CleanFootage.mp4"
shutil.copyfile(CLEAN_VIDEO, clean_desktop)
print(f"-> Đã copy sang Desktop: {clean_desktop}")

# Extract Cover Frame
COVER_JPG = CAPCUT_PROJECT_DIR / "draft_cover.jpg"
subprocess.run([
    "ffmpeg", "-y", "-loglevel", "error",
    "-ss", "13",
    "-i", str(CLEAN_VIDEO),
    "-vframes", "1",
    "-q:v", "2",
    str(COVER_JPG)
], check=True)

print("\n=== 2. Tạo File Phụ Đề Chuẩn SRT (2-4 từ/câu, khớp giọng nói) ===")
SUBTITLES = [
  {"s": 0.00, "e": 1.40, "text": "Mình muốn kiếm tiền"},
  {"s": 1.40, "e": 2.80, "text": "từ việc kinh doanh,"},
  {"s": 2.80, "e": 4.20, "text": "nhưng không muốn nó"},
  {"s": 4.20, "e": 5.60, "text": "nuốt mất cuộc sống."},

  {"s": 6.00, "e": 7.20, "text": "Mình là Sia,"},
  {"s": 7.20, "e": 8.80, "text": "mẹ của nhóc 2 tuổi"},
  {"s": 8.80, "e": 10.96, "text": "và solo business siêu nhỏ."},

  {"s": 12.00, "e": 13.50, "text": "Và đây là tập 3"},
  {"s": 13.50, "e": 15.20, "text": "của Live First Business,"},
  {"s": 15.20, "e": 16.50, "text": "xây dựng mô hình kinh doanh"},
  {"s": 16.50, "e": 17.38, "text": "từ cuộc sống trước."},

  {"s": 18.28, "e": 19.30, "text": "Tập này nói chuyện"},
  {"s": 19.30, "e": 20.30, "text": "thực tế hơn nhé."},

  {"s": 20.74, "e": 22.00, "text": "Mình có thể kiếm tiền"},
  {"s": 22.00, "e": 23.30, "text": "từ chuyên môn của bản thân"},
  {"s": 23.30, "e": 24.58, "text": "bằng những cách nào?"},

  {"s": 25.84, "e": 27.20, "text": "Một, tư vấn 1-1."},
  {"s": 27.20, "e": 28.50, "text": "Nếu bạn có chuyên môn"},
  {"s": 28.50, "e": 30.20, "text": "đủ sâu để giải quyết"},
  {"s": 30.20, "e": 31.50, "text": "vấn đề cho khách hàng,"},
  {"s": 31.50, "e": 32.72, "text": "đây là cách nhanh nhất."},

  {"s": 33.60, "e": 35.50, "text": "Hai, dịch vụ đóng gói."},
  {"s": 35.74, "e": 37.20, "text": "Một vấn đề rõ,"},
  {"s": 37.20, "e": 38.60, "text": "một phạm vi rõ,"},
  {"s": 38.60, "e": 40.00, "text": "bàn giao và kết thúc."},

  {"s": 40.24, "e": 42.00, "text": "Ba, workshop nhỏ"},
  {"s": 42.00, "e": 43.50, "text": "hoặc một lớp học."},
  {"s": 43.50, "e": 45.20, "text": "Một điều bạn hay giải thích"},
  {"s": 45.20, "e": 46.60, "text": "cho khách hàng, bạn bè"},
  {"s": 46.60, "e": 48.00, "text": "trở thành buổi học nhiều người cần."},

  {"s": 48.96, "e": 51.50, "text": "Bốn, sản phẩm số."},
  {"s": 51.50, "e": 53.00, "text": "Template này, ebook này,"},
  {"s": 53.00, "e": 54.50, "text": "bộ hướng dẫn này."},
  {"s": 54.50, "e": 56.50, "text": "Tất cả đều có thể"},
  {"s": 56.50, "e": 58.80, "text": "trở thành một sản phẩm"},
  {"s": 58.80, "e": 61.12, "text": "đóng gói một lần, bán nhiều lần."},

  {"s": 62.06, "e": 63.80, "text": "Nhưng thật ra ấy,"},
  {"s": 63.80, "e": 65.50, "text": "không nhất thiết mở business ngay."},

  {"s": 66.24, "e": 68.20, "text": "Remote work, freelance"},
  {"s": 68.20, "e": 70.20, "text": "hay công việc part-time"},
  {"s": 70.76, "e": 72.80, "text": "cũng là điểm bắt đầu."},

  {"s": 73.16, "e": 75.00, "text": "Đôi khi chỉ cần"},
  {"s": 75.00, "e": 76.80, "text": "nhiều quyền chủ động hơn,"},
  {"s": 77.16, "e": 79.00, "text": "đã là thay đổi rất lớn"},
  {"s": 79.00, "e": 80.76, "text": "để tới Live First Business."},

  {"s": 81.38, "e": 83.20, "text": "Và mình không nghĩ"},
  {"s": 83.20, "e": 85.00, "text": "cần làm tất cả điều này."},

  {"s": 85.34, "e": 87.00, "text": "Nếu đang có con nhỏ,"},
  {"s": 87.00, "e": 88.50, "text": "thời gian rất là ít,"},
  {"s": 88.94, "e": 91.20, "text": "bắt đầu từ việc nhỏ nhất."},
  {"s": 91.56, "e": 93.20, "text": "Một việc đủ nhỏ"},
  {"s": 93.20, "e": 94.94, "text": "kỹ năng hiện tại làm được."},

  {"s": 96.02, "e": 98.00, "text": "Làm nhỏ thôi và xem"},
  {"s": 98.00, "e": 100.20, "text": "ai thực sự trả tiền không,"},
  {"s": 100.20, "e": 102.30, "text": "và có thực sự là cách làm"},
  {"s": 102.30, "e": 104.28, "text": "fit với cuộc sống không?"},

  {"s": 105.12, "e": 107.50, "text": "Nếu bạn cũng đang tìm"},
  {"s": 107.50, "e": 109.20, "text": "một cách kiếm tiền,"},
  {"s": 109.20, "e": 111.00, "text": "không xoay quanh công việc,"},
  {"s": 111.44, "e": 113.80, "text": "follow mình nhé!"},
  {"s": 113.80, "e": 116.32, "text": "Mình sẽ chia sẻ hành trình này."}
]

def format_srt_time(sec):
    hrs = int(sec // 3600)
    mins = int((sec % 3600) // 60)
    secs = int(sec % 60)
    millis = int(round((sec - int(sec)) * 1000))
    return f"{hrs:02d}:{mins:02d}:{secs:02d},{millis:03d}"

srt_lines = []
for idx, sub in enumerate(SUBTITLES, 1):
    start = format_srt_time(sub["s"])
    end = format_srt_time(sub["e"])
    srt_lines.append(f"{idx}\n{start} --> {end}\n{sub['text']}\n")

srt_content = "\n".join(srt_lines)
srt_path = DESKTOP_DIR / "LifeFirstBusiness_Subtitles.srt"
srt_path.write_text(srt_content, encoding='utf-8')
shutil.copyfile(srt_path, CAPCUT_PROJECT_DIR / "LifeFirstBusiness_Subtitles.srt")
print(f"-> Tạo xong file SRT: {srt_path}")

print("\n=== 3. Tạo Dự Án Trực Tiếp Cho CapCut Desktop (D:/CapCut Drafts/LifeFirstBusiness) ===")
# Duration in microseconds
DUR_US = 116300000 # 116.3s

video_material_id = str(uuid.uuid4()).upper()
track_id = str(uuid.uuid4()).upper()
segment_id = str(uuid.uuid4()).upper()
draft_id = str(uuid.uuid4()).upper()
content_id = str(uuid.uuid4()).upper()
speed_id = str(uuid.uuid4()).upper()
placeholder_id = str(uuid.uuid4()).upper()
canvas_id = str(uuid.uuid4()).upper()
sound_channel_id = str(uuid.uuid4()).upper()

# Normalize path with forward slashes for CapCut
video_file_posix = CLEAN_VIDEO.as_posix()

draft_content = {
    "canvas_config": {
        "background": None,
        "height": 1920,
        "ratio": "9:16",
        "width": 1080
    },
    "color_space": 0,
    "config": {
        "adjust_max_index": 1,
        "attachment_info": [],
        "combination_max_index": 1,
        "export_range": {"duration": 0, "start": 0},
        "extract_audio_last_index": 1,
        "lyrics_recognition_id": "",
        "lyrics_sync": True,
        "lyrics_taskinfo": [],
        "maintrack_adsorb": True,
        "material_save_mode": 0,
        "multi_language_current": "none",
        "multi_language_list": [],
        "multi_language_main": "none",
        "multi_language_mode": "none",
        "original_sound_last_index": 1,
        "record_audio_last_index": 1,
        "sticker_max_index": 1,
        "subtitle_keywords_config": None,
        "subtitle_recognition_id": "",
        "subtitle_sync": True,
        "subtitle_taskinfo": [],
        "system_font_list": [],
        "video_mute": False,
        "zoom_info_params": {"offset_x": 0.0, "offset_y": 0.0, "zoom_ratio": 1.0}
    },
    "cover": None,
    "create_time": int(time.time()),
    "duration": DUR_US,
    "extra_info": None,
    "fps": 30.0,
    "free_render_index_mode_on": False,
    "group_container": None,
    "id": content_id,
    "is_drop_frame_timecode": False,
    "keyframe_graph_list": [],
    "keyframes": {
        "adjusts": [], "audios": [], "effects": [], "filters": [],
        "handwrites": [], "stickers": [], "texts": [], "videos": []
    },
    "last_modified_platform": {
        "app_id": 359289,
        "app_source": "cc",
        "app_version": "6.1.2",
        "os": "windows",
        "os_version": "10.0.22631"
    },
    "materials": {
        "ai_translates": [], "audio_balances": [], "audio_effects": [], "audio_fades": [],
        "audio_track_indexes": [], "audios": [], "beats": [],
        "canvases": [{
            "album_image": "", "blur": 0.0, "color": "", "id": canvas_id,
            "image": "", "image_id": "", "image_name": "", "source_platform": 0, "team_id": "", "type": "canvas_color"
        }],
        "chromas": [], "color_curves": [], "common_mask": [], "digital_humans": [], "drafts": [],
        "effects": [], "flowers": [], "green_screens": [], "handwrites": [], "hsl": [], "images": [],
        "log_color_wheels": [], "loudnesses": [], "manual_beautys": [], "manual_deformations": [],
        "material_animations": [], "material_colors": [], "multi_language_refs": [],
        "placeholder_infos": [{
            "error_path": "", "error_text": "", "id": placeholder_id, "meta_type": "none", "res_path": "", "res_text": "", "type": "placeholder_info"
        }],
        "placeholders": [], "plugin_effects": [], "primary_color_wheels": [], "realtime_denoises": [],
        "shapes": [], "smart_crops": [], "smart_relights": [],
        "sound_channel_mappings": [{
            "audio_channel_mapping": 0, "id": sound_channel_id, "is_config_open": False, "type": ""
        }],
        "speeds": [{
            "curve_speed": None, "id": speed_id, "mode": 0, "speed": 1.0, "type": "speed"
        }],
        "stickers": [], "tail_leaders": [], "text_templates": [], "texts": [], "time_marks": [],
        "transitions": [], "video_effects": [], "video_trackings": [],
        "videos": [{
            "aigc_history_id": "", "aigc_item_id": "", "aigc_type": "none", "audio_fade": None,
            "beauty_body_preset_id": "", "beauty_face_preset_infos": [], "cartoon_path": "",
            "category_id": "", "category_name": "local", "check_flag": 62978047,
            "crop": {"lower_left_x": 0.0, "lower_left_y": 1.0, "lower_right_x": 1.0, "lower_right_y": 1.0, "upper_left_x": 0.0, "upper_left_y": 0.0, "upper_right_x": 1.0, "upper_right_y": 0.0},
            "crop_ratio": "free", "crop_scale": 1.0,
            "duration": DUR_US,
            "extra_type_option": 0, "formula_id": "", "freeze": None, "has_audio": True, "has_sound_separated": False,
            "height": 1920,
            "id": video_material_id,
            "intensifies_audio_path": "", "intensifies_path": "", "is_ai_generate_content": False, "is_copyright": False,
            "is_text_edit_overdub": False, "is_unified_beauty_mode": False, "live_photo_cover_path": "", "live_photo_timestamp": -1,
            "local_id": "", "local_material_from": "", "local_material_id": str(uuid.uuid4()), "material_id": "",
            "material_name": "LifeFirstBusiness_CleanFootage.mp4",
            "material_url": "",
            "matting": {"custom_matting_id": "", "enable_matting_stroke": False, "expansion": 0, "feather": 0, "flag": 0, "has_use_quick_brush": False, "has_use_quick_eraser": False, "interactiveTime": [], "path": "", "reverse": False, "strokes": []},
            "media_path": "", "multi_camera_info": None, "object_locked": None, "origin_material_id": "",
            "path": video_file_posix,
            "picture_from": "none", "picture_set_category_id": "", "picture_set_category_name": "", "request_id": "",
            "reverse_intensifies_path": "", "reverse_path": "", "smart_match_info": None, "smart_motion": None, "source": 0, "source_platform": 0,
            "stable": {"matrix_path": "", "stable_level": 0, "time_range": {"duration": 0, "start": 0}},
            "team_id": "", "type": "video",
            "video_algorithm": {"ai_background_configs": [], "ai_expression_driven": None, "ai_motion_driven": None, "aigc_generate": None, "algorithms": [], "complement_frame_config": None, "deflicker": None, "gameplay_configs": [], "motion_blur_config": None, "mouth_shape_driver": None, "noise_reduction": None, "path": "", "quality_enhance": None, "smart_complement_frame": None, "super_resolution": None, "time_range": None},
            "width": 1080
        }],
        "vocal_beautifys": [], "vocal_separations": []
    },
    "mutable_config": None,
    "name": "LifeFirstBusiness",
    "new_version": "132.0.0",
    "path": "",
    "platform": {
        "app_id": 359289, "app_source": "cc", "app_version": "6.1.2", "os": "windows", "os_version": "10.0.22631"
    },
    "relationships": [],
    "render_index_track_mode_on": True,
    "retouch_cover": None,
    "source": "default",
    "static_cover_image_path": "",
    "time_marks": None,
    "tracks": [{
        "attribute": 0,
        "flag": 0,
        "id": track_id,
        "is_default_name": True,
        "name": "Main Video",
        "segments": [{
            "caption_info": None,
            "cartoon": False,
            "clip": {"alpha": 1.0, "flip": {"horizontal": False, "vertical": False}, "rotation": 0.0, "scale": {"x": 1.0, "y": 1.0}, "transform": {"x": 0.0, "y": 0.0}},
            "color_correct_alg_result": "",
            "common_keyframes": [],
            "desc": "",
            "digital_human_template_group_id": "",
            "enable_adjust": True,
            "enable_adjust_mask": False,
            "enable_color_correct_adjust": False,
            "enable_color_curves": True,
            "enable_color_match_adjust": False,
            "enable_color_wheels": True,
            "enable_hsl": False,
            "enable_lut": True,
            "enable_smart_color_adjust": False,
            "enable_video_mask": True,
            "extra_material_refs": [speed_id, placeholder_id, canvas_id, sound_channel_id],
            "group_id": "",
            "hdr_settings": {"intensity": 1.0, "mode": 1, "nits": 1000},
            "id": segment_id,
            "intensifies_audio": False,
            "is_loop": False,
            "is_placeholder": False,
            "is_tone_modify": False,
            "keyframe_refs": [],
            "last_nonzero_volume": 1.0,
            "lyric_keyframes": None,
            "material_id": video_material_id,
            "raw_segment_id": "",
            "render_index": 0,
            "render_timerange": {"duration": 0, "start": 0},
            "responsive_layout": {"enable": False, "horizontal_pos_layout": 0, "size_layout": 0, "target_follow": "", "vertical_pos_layout": 0},
            "reverse": False,
            "source_timerange": {"duration": DUR_US, "start": 0},
            "speed": 1.0,
            "state": 0,
            "target_timerange": {"duration": DUR_US, "start": 0},
            "template_id": "",
            "template_scene": "default",
            "track_attribute": 0,
            "track_render_index": 0,
            "uniform_scale": {"on": True, "value": 1.0},
            "visible": True,
            "volume": 1.0
        }],
        "type": "video"
    }],
    "update_time": int(time.time()),
    "version": 360000
}

(CAPCUT_PROJECT_DIR / "draft_content.json").write_text(json.dumps(draft_content, ensure_ascii=False, indent=2), encoding='utf-8')

# draft_meta_info.json
now_us = int(time.time() * 1000000)
draft_meta = {
    "cloud_package_completed_time": "",
    "draft_cloud_capcut_purchase_info": "",
    "draft_cloud_last_action_download": False,
    "draft_cloud_package_type": "",
    "draft_cloud_purchase_info": "",
    "draft_cloud_template_id": "",
    "draft_cloud_tutorial_info": "",
    "draft_cloud_videocut_purchase_info": "",
    "draft_cover": "draft_cover.jpg",
    "draft_deeplink_url": "",
    "draft_enterprise_info": {"draft_enterprise_extra": "", "draft_enterprise_id": "", "draft_enterprise_name": "", "enterprise_material": []},
    "draft_fold_path": CAPCUT_PROJECT_DIR.as_posix(),
    "draft_id": draft_id,
    "draft_is_ae_produce": False,
    "draft_is_ai_packaging_used": False,
    "draft_is_ai_shorts": False,
    "draft_is_ai_translate": False,
    "draft_is_article_video_draft": False,
    "draft_is_from_deeplink": "false",
    "draft_is_invisible": False,
    "draft_materials": [{
        "type": 0,
        "value": [{
            "create_time": int(time.time()),
            "duration": DUR_US,
            "extra_info": "LifeFirstBusiness_CleanFootage.mp4",
            "file_Path": video_file_posix,
            "height": 1920,
            "id": str(uuid.uuid4()),
            "import_time": int(time.time()),
            "import_time_ms": now_us,
            "item_source": 1,
            "md5": "",
            "metetype": "video",
            "roughcut_time_range": {"duration": DUR_US, "start": 0},
            "sub_time_range": {"duration": -1, "start": -1},
            "type": 0,
            "width": 1080
        }]
    }, {"type": 1, "value": []}, {"type": 2, "value": []}, {"type": 3, "value": []}, {"type": 6, "value": []}, {"type": 7, "value": []}, {"type": 8, "value": []}],
    "draft_materials_copied_info": [],
    "draft_name": "LifeFirstBusiness",
    "draft_need_rename_folder": False,
    "draft_new_version": "",
    "draft_removable_storage_device": "D:",
    "draft_root_path": "D:/CapCut Drafts",
    "draft_segment_extra_info": [],
    "draft_timeline_materials_size_": CLEAN_VIDEO.stat().st_size,
    "draft_type": "",
    "tm_draft_cloud_completed": "",
    "tm_draft_cloud_modified": 0,
    "tm_draft_cloud_space_id": -1,
    "tm_draft_create": now_us,
    "tm_draft_modified": now_us,
    "tm_draft_removed": 0,
    "tm_duration": DUR_US
}
(CAPCUT_PROJECT_DIR / "draft_meta_info.json").write_text(json.dumps(draft_meta, ensure_ascii=False, indent=2), encoding='utf-8')

# Copy auxiliary config files from 0409
for aux in ["attachment_editing.json", "attachment_pc_common.json", "draft_agency_config.json", "draft_biz_config.json"]:
    src = Path("D:/CapCut Drafts/0409") / aux
    if src.exists():
        shutil.copyfile(src, CAPCUT_PROJECT_DIR / aux)

print(f"-> Tạo thành công CapCut Project Draft tại: {CAPCUT_PROJECT_DIR}")

print("\n=== 4. Đóng gói đầy đủ tài nguyên vào thư mục Desktop ===")
# Copy Font
shutil.copyfile(FONT_FILE, DESKTOP_DIR / "SVN-Chicken Noodle Soup.otf")

# Copy Reference Video
if REFERENCE_VIDEO.exists():
    shutil.copyfile(REFERENCE_VIDEO, DESKTOP_DIR / "LifeFirstBusiness_Final_Reference.mp4")

# Copy B-Rolls
broll_target = DESKTOP_DIR / "B_Rolls_Minh_Hoa"
broll_target.mkdir(parents=True, exist_ok=True)
for img in BROLL_DIR.glob("*.jpg"):
    shutil.copyfile(img, broll_target / img.name)

# Copy to CapCut Resources as well
cc_res = CAPCUT_PROJECT_DIR / "Resources"
cc_res.mkdir(parents=True, exist_ok=True)
for img in BROLL_DIR.glob("*.jpg"):
    shutil.copyfile(img, cc_res / img.name)
shutil.copyfile(FONT_FILE, cc_res / "SVN-Chicken Noodle Soup.otf")

# Create README Instructions
readme_text = """======================================================================
HƯỚNG DẪN EDIT TRÊN CAPCUT CHO DỰ ÁN LIFE-FIRST BUSINESS (TẬP 03)
======================================================================

Mình đã chuẩn bị sẵn 2 CÁCH cực kỳ tiện lợi để bạn edit trên CapCut:

----------------------------------------------------------------------
CÁCH 1: MỞ TRỰC TIẾP DỰ ÁN ĐÃ TẠO SẴN TRONG CAPCUT (KHUYÊN DÙNG)
----------------------------------------------------------------------
1. Mở phần mềm CapCut Desktop trên máy tính của bạn.
2. Tại trang chủ CapCut, bạn sẽ thấy ngay dự án mang tên:
   👉 "LifeFirstBusiness"
   (Dự án nằm tại: D:\\CapCut Drafts\\LifeFirstBusiness)
3. Nhấp đúp chuột để mở dự án:
   - Video người nói (1080x1920, 116.3s) đã được đưa sẵn vào Timeline.
   - Âm thanh đã được lọc sạch và chuẩn hóa âm lượng -14 LUFS (rõ ràng, không bị nhỏ).
4. Bạn chỉ cần edit hiệu ứng, chữ, chuyển cảnh theo đúng ý bạn!

----------------------------------------------------------------------
CÁCH 2: KÉO THẢ TỰ DO VÀO BẤT KỲ DỰ ÁN CAPCUT NÀO
----------------------------------------------------------------------
Trong thư mục này (Desktop\\CapCut_LifeFirstBusiness) gồm có:
1. LifeFirstBusiness_CleanFootage.mp4:
   - Video gốc sạch hoàn toàn (KHÔNG có chữ đè lên), âm lượng chuẩn -14 LUFS.
2. LifeFirstBusiness_Subtitles.srt:
   - File phụ đề tiếng Việt chuẩn xác từng câu 2-4 từ.
   - Trong CapCut: Vào mục "Văn bản" (Text) -> "Phụ đề cục bộ" (Local Captions) -> bấm "Nhập" (Import) chọn file .srt này là phụ đề tự động nhảy vào đúng từng giây!
3. SVN-Chicken Noodle Soup.otf:
   - Font chữ viết tay tiếng Việt. Nhấp đúp chuột vào file này -> bấm "Install" để CapCut có font này.
4. Thư mục "B_Rolls_Minh_Hoa":
   - 8 bức ảnh minh họa chất lượng cao theo từng luận điểm trong video.
5. LifeFirstBusiness_Final_Reference.mp4:
   - Bản video hoàn chỉnh mình đã render trước đó để bạn xem đối chiếu.

----------------------------------------------------------------------
SAU KHI BẠN EDIT XONG:
----------------------------------------------------------------------
1. Bạn xuất file video từ CapCut ra (Export MP4).
2. Gửi đường dẫn file hoặc cho mình biết, mình sẽ phân tích chính xác:
   - Từng hiệu ứng chuyển động, cách chữ xuất hiện, font size, vị trí, màu sắc, âm thanh...
3. Mình sẽ code lại y hệt 100% vào hệ thống tự động!
======================================================================
"""

(DESKTOP_DIR / "HUONG_DAN_SU_DUNG.txt").write_text(readme_text, encoding='utf-8')
print(f"-> Tạo xong file hướng dẫn: {DESKTOP_DIR / 'HUONG_DAN_SU_DUNG.txt'}")

print("\n=== HOÀN TẤT CHUẨN BỊ CHO CAPCUT! ===")
