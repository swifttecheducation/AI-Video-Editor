import subprocess
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# The 13 clips in sequence with carefully determined speech start and end times
CLIPS_PLAN = [
    {
        "clip_id": "IMG_2722",
        "file": "videos/input-drive/IMG_2722.MOV",
        "start": 0.40,
        "end": 6.10,
        "title": "Hook: Muốn kiếm tiền nhưng không muốn bị nuốt chửng cuộc sống"
    },
    {
        "clip_id": "IMG_2725",
        "file": "videos/input-drive/IMG_2725.MOV",
        "start": 0.50,
        "end": 6.20,
        "title": "Giới thiệu: Sia, mẹ nhóc 2 tuổi & solo business"
    },
    {
        "clip_id": "IMG_2728",
        "file": "videos/input-drive/IMG_2728.MOV",
        "start": 0.50,
        "end": 7.20,
        "title": "Tập 3: Xây dựng mô hình kinh doanh từ cuộc sống mong muốn"
    },
    {
        "clip_id": "IMG_2729",
        "file": "videos/input-drive/IMG_2729.MOV",
        "start": 0.30,
        "end": 9.20,
        "title": "Câu hỏi thực tế: Kiếm tiền từ chuyên môn bằng những cách nào?"
    },
    {
        "clip_id": "IMG_2731",
        "file": "videos/input-drive/IMG_2731.MOV",
        "start": 0.30,
        "end": 8.40,
        "title": "Cách 1: Tư vấn 1-1 giải quyết vấn đề cụ thể"
    },
    {
        "clip_id": "IMG_2733",
        "file": "videos/input-drive/IMG_2733.MOV",
        "start": 0.90,
        "end": 8.00,
        "title": "Cách 2: Dịch vụ đóng gói (Scope rõ, bàn giao xong)"
    },
    {
        "clip_id": "IMG_2737",
        "file": "videos/input-drive/IMG_2737.MOV",
        "start": 1.40,
        "end": 9.60,
        "title": "Cách 3: Lớp học nhỏ (Micro-class từ điều bạn hay giải thích)"
    },
    {
        "clip_id": "IMG_2744",
        "file": "videos/input-drive/IMG_2744.MOV",
        "start": 0.30,
        "end": 13.90,
        "title": "Cách 4: Sản phẩm số (Template, Ebook, bộ hướng dẫn)"
    },
    {
        "clip_id": "IMG_2745",
        "file": "videos/input-drive/IMG_2745.mov",
        "start": 0.30,
        "end": 4.10,
        "title": "Nhưng thật ra không nhất thiết phải mở business ngay"
    },
    {
        "clip_id": "IMG_2746",
        "file": "videos/input-drive/IMG_2746.mov",
        "start": 2.20,
        "end": 25.00,
        "title": "Remote work, freelance, online part-time để có quyền chủ động"
    },
    {
        "clip_id": "IMG_2751",
        "file": "videos/input-drive/IMG_2751.MOV",
        "start": 0.80,
        "end": 22.80,
        "title": "Lời khuyên: Bắt đầu từ việc nhỏ nhất phù hợp kỹ năng"
    },
    {
        "clip_id": "IMG_2752",
        "file": "videos/input-drive/IMG_2752.MOV",
        "start": 0.30,
        "end": 9.20,
        "title": "Kiểm chứng: Xem ai trả tiền & xem có fit cuộc sống không"
    },
    {
        "clip_id": "IMG_2754",
        "file": "videos/input-drive/IMG_2754.MOV",
        "start": 0.30,
        "end": 15.60,
        "title": "CTA: Follow Sia để đồng hành trên hành trình Life First"
    }
]

total_dur = sum(c["end"] - c["start"] for c in CLIPS_PLAN)
print(f"Total planned duration: {total_dur:.2f}s ({total_dur/60:.2f} mins)")
for i, c in enumerate(CLIPS_PLAN):
    dur = c["end"] - c["start"]
    print(f"[{i+1}/{len(CLIPS_PLAN)}] {c['clip_id']} ({dur:.2f}s): {c['title']}")
