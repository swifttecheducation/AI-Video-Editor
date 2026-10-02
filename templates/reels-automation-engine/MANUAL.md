# 🎬 MASTER MANUAL: REELS EDITING ENGINE v2.0
> **Hệ thống Tự động hóa Video Độc quyền (Local Autonomous Editing Engine)**  
> *Dành cho Creator Economy, Solopreneur và Agency Sản xuất Video Ngắn Chuyên Nghiệp*

---

## PHẦN 1: BÊN TRONG ENGINE NÀY CÓ NHỮNG GÌ? (KIẾN TRÚC HỆ THỐNG)

Khác với các công cụ web AI đóng gói sẵn (chỉ cho phép xuất video MP4 cứng), Reels Editing Engine là một **hệ thống tự động hóa cục bộ (Local Autonomous Editing Engine)** can thiệp trực tiếp vào cấu trúc timeline của **CapCut Desktop** và tích hợp trình render đồ họa động chuyên nghiệp.

```
                         ┌─────────────────────────────┐
                         │   DIRECTOR (Bạn ra lệnh)    │
                         └──────────────┬──────────────┘
                                        │
                               [ inbox/ (Video thô) ]
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
  ┌───────────────────────────────────┐   ┌───────────────────────────────────┐
  │   1. AUDIO & ROUGH CUT PASS       │   │    2. VISUAL & COMPOSITION PASS   │
  │ • WhisperX (large-v3, GPU)        │   │ • OpenCV Chin-Lock (Safe Zone)    │
  │ • Auto-cắt dead air & flubs       │   │ • Cover / Thumbnail Detector      │
  │ • Audio Ducking & Volume Norm     │   │ • B-Roll Cut-Grid Alignment       │
  └─────────────────┬─────────────────┘   └─────────────────┬─────────────────┘
                    └───────────────────┬───────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
  ┌───────────────────────────────────┐   ┌───────────────────────────────────┐
  │     3. VECTCUT CAPCUT ENGINE      │   │ 4. HYPERFRAMES / REMOTION ENGINE  │
  │ • Local Server (Port 9001)        │   │ • Chrome Headless 60fps           │
  │ • Sinh project CapCut rời lớp     │   │ • Animated Typography             │
  │ • File: draft_content.json        │   │ • Full-screen Takeover / Cards    │
  └─────────────────┬─────────────────┘   └─────────────────┬─────────────────┘
                    └───────────────────┬───────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
         [ CapCut Draft ]                        [ Final Render MP4 ]
         (Chỉnh sửa tự do)                       (Đăng ngay 100%)
```

### Các module công nghệ cốt lõi:

1. **WhisperX + PyTorch (GPU / CPU Transcription)** (`tools/transcribe.py`, `engine/clean_cut.py`):
   - Nhận diện giọng nói chính xác từng mili-giây.
   - **Cơ chế lọc thông minh**: Nếu bạn nói vấp một câu 2–3 lần, nó sẽ tự động nhận diện và chỉ giữ lại take cuối cùng, tự động cắt bỏ mọi đoạn im lặng thừa (*dead air*).

2. **OpenCV Facial Detection** (`engine/chin_lock.py` & `engine/subject_guard.py`):
   - Theo dõi khuôn mặt và cằm bằng model YuNet để tự động căn chỉnh khung hình dọc 9:16.
   - Đảm bảo mắt và mặt luôn nằm ở "vùng an toàn" (*Safe Zone*), không bị che bởi nút Like, Comment hay tên tài khoản của TikTok/Instagram.

3. **VectCut API Engine** (`engine/vectcut/` & `engine/capcut_builder.py`):
   - **Vũ khí bí mật của engine**: Máy chủ Python cục bộ điều khiển cấu trúc dữ liệu của CapCut (`pyJianYingDraft`).
   - Thay vì nung (bake) chữ vào video, nó tạo ra một **dự án CapCut đầy đủ lớp (Tracks)**: video gốc, video B-roll, các track chữ riêng, track sticker riêng, track hiệu ứng âm thanh (SFX) riêng. Bạn có thể mở CapCut lên và bấm vào từng chữ để sửa!

4. **HyperFrames & Remotion Motion Graphics Renderer** (`remotion/`):
   - Sử dụng React và Headless Chrome để render các thẻ đồ họa chuyển động 60fps, số nhảy (count-up), chữ xếp lớp (takeover) với tiêu chuẩn thẩm mỹ cao.

5. **Creative Vault & Style Packs** (`engine/vault/` & `config/brand.default.json`):
   - Tích hợp sẵn thư viện SFX đồng bộ (tiếng click, pop, whoosh, type-writer, ding).
   - 3 phong cách định hình thương hiệu chuẩn: **Butter** (nhẹ nhàng, ấm áp), **Editorial** (tạp chí, sang trọng), **Playful** (năng động, vui tươi), và **LifeFirst-Brand** độc quyền.

---

## PHẦN 2: 3 ĐỊNH DẠNG VIDEO CHÍNH (FORMATS)

Khi bắt đầu một video, bạn chọn 1 trong các định dạng sau:

| Định dạng | Mô tả chuyên môn | Khi nào nên dùng? |
|---|---|---|
| **Yap** | Video nói trực diện camera (Talking-head). Tự động chia làm 2 cấp độ:<br>• **Confessional**: Tâm sự mộc mạc, tiết chế tối đa đồ họa.<br>• **Teaching/Explainer**: Nhiều sticker, thẻ số liệu, b-roll cắt xen, SFX dày. | Chia sẻ kiến thức, tâm sự, xây dựng nhân hiệu cá nhân. |
| **Voiceover** | Video không lộ mặt nói (Faceless/Cinematic). Engine dùng thuật toán `vo_cutgrid.py` ghép giọng đọc của bạn với kho B-roll theo nhịp điệu cảm xúc. | Kể chuyện, vlog phong cách sống, du lịch, quote truyền cảm hứng. |
| **Animation** | Video đồ họa động hoàn toàn không cần quay phim. Chỉ cần kịch bản chữ, engine sẽ biến thành typography chuyển động, thẻ đồ họa và hiệu ứng thị giác. | Giới thiệu tính năng, tips nhanh, thông báo, video thuần chữ. |
| **B-Roll Reels** | Đưa vào 1 thư mục chứa nhiều clip B-roll, engine sẽ tự cắt và sản xuất hàng loạt video dạng quote/hook ngắn để đăng dần. | Đăng bài số lượng lớn (batch content). |

---

## PHẦN 3: ĐỘ HOÀN THIỆN CỦA BẢN DỰNG (DONENESS)

Bạn quyết định mình muốn can thiệp bao nhiêu vào sản phẩm:

* **Raw**: Engine chỉ cắt gọt thô, gỡ tạp âm/đoạn thừa, tạo phụ đề text cơ bản trong CapCut. Dành cho editor muốn tự tay múa hiệu ứng trong CapCut.
* **Medium (Khuyên dùng)**: Tạo ra timeline CapCut đã phân tầng đầy đủ các layer thiết kế, sticker, SFX, text. Bạn có thể kéo thả, bật/tắt hoặc chỉnh sửa bất kỳ layer nào.
* **Well-done**: Engine render hoàn chỉnh thành file `.final.mp4` sẵn sàng đăng ngay mà không cần mở CapCut.
* **Hands-off**: Chế độ rảnh tay: đưa video vào, AI tự chọn toàn bộ phong cách và trả về video thành phẩm.

---

## PHẦN 4: BẢNG LỆNH ĐIỀU KHIỂN DÀNH CHO MASTER EDITOR

Engine này hoạt động theo nguyên lý **BẠN LÀ ĐẠO DIỄN (DIRECTOR), AI LÀ KỸ THUẬT DỰNG (EDITOR)**. Dưới đây là các câu lệnh bạn chỉ cần gõ vào chat:

### 1. Lệnh khởi chạy & Định dạng
* `edit this reel`: Yêu cầu engine dựng clip mới nhất vừa bỏ vào thư mục `inbox/`.
* `edit this video: [đường dẫn file]`: Chỉ định một file video cụ thể ở bất kỳ đâu trên máy.
* `let's make a Yap`: Chọn dựng kiểu Talking-head.
* `make my voiceover reel`: Chọn dựng kiểu Voiceover lồng B-roll.
* `make an animation reel`: Dựng video đồ họa động từ script.
* `make b-roll reels`: Batch tạo video từ kho B-roll.
* `keep it raw` / `make it medium` / `make it well-done` / `do it hands-off`: Chọn mức độ hoàn thiện.

### 2. Lệnh kiểm soát Phụ đề (Captions)
Bạn có thể kết hợp nhiều kiểu phụ đề trong cùng một video:
* `make these single-word captions`: Hiện từng từ một thật to ở chính giữa (kiểu Alex Hormozi/MrBeast).
* `make this karaoke`: Hiện cả câu trên màn hình, từng từ sáng đèn (highlight) theo nhịp đọc.
* `make this a takeover`: Toàn bộ màn hình phủ kín chữ xếp tầng, nhấn mạnh từ khóa chính vào thời điểm bùng nổ.
* `I'll do captions in CapCut`: Bỏ qua tạo caption của engine để bạn tự dùng Auto-captions trong CapCut.

### 3. Lệnh đồ họa & Điểm nhấn thị giác (Visual Extras)
* `put the hook here`: Đặt thẻ tiêu đề giật tít ở 3 giây đầu video.
* `put the hook behind me`: Tự động tách nền và đẩy tiêu đề ra phía sau lưng nhân vật.
* `add a thought bubble that says [nội dung]`: Thêm một bong bóng suy nghĩ viết tay bay cạnh đầu.
* `make that a count-up`: Biến con số bạn nói thành hiệu ứng số nhảy (ví dụ: nhảy từ $0 đến $500).
* `add a breakaway card here`: Ngắt khung hình người nói bằng một thẻ đồ họa thiết kế toàn màn hình.
* `cut away to b-roll on this line`: Cắt chuyển sang video B-roll trong khi giọng nói vẫn tiếp tục.
* `cut me out over this`: Tách người bạn ra khỏi nền và ghép lên nền card/ảnh khác.
* `drop my star doodle on this word`: Thả hình vẽ doodle/sticker vào đúng từ được nhấn mạnh.

### 4. Lệnh góc máy, Chuyển động & Âm thanh (Motion & Sound)
* `start with a slow zoom`: Mở đầu video bằng một cú đẩy khung hình (push-in) từ từ để cuốn người xem.
* `punch in on that word`: Giật zoom nhanh (punch-in) vào một từ mang tính điểm nhấn.
* `add matched sound effects`: Tự động gắn âm thanh SFX (click, pop, whoosh) khớp chính xác với từng sticker hay chữ xuất hiện.
* `study my CapCut draft called [tên dự án]`: Chỉ định một project CapCut mẫu chứa các âm thanh SFX bạn thích để engine học thói quen dùng âm thanh của bạn.
* `add a music bed` / `skip the music`: Thêm hoặc bỏ nhạc nền lofi/ambient nhẹ bên dưới giọng nói.
* `make my cover`: AI quét các khung hình đẹp nhất của khuôn mặt bạn, đưa ra các phương án thumbnail và chèn text bìa để hiển thị trên Instagram Grid.

---

## PHẦN 5: BỘ LỆNH TINH CHỈNH CHUYÊN SÂU (`/studio`)

Khi cần tinh chỉnh vi mô cho từng yếu tố hiển thị trên màn hình:

| Lệnh Studio | Tác dụng |
|---|---|
| `/studio hush [tên yếu tố]` | Thu nhỏ lại hoặc làm mờ bớt một chi tiết (sticker/text/âm thanh). |
| `/studio punch [tên yếu tố]` | Phóng to, làm đậm và nổi bật hẳn một chi tiết. |
| `/studio font` | Tự động cân đối lại kích thước chữ và bẻ dòng (line-wrap) cho chuẩn mắt. |
| `/studio tidy` | Căn chỉnh lề, khoảng cách giữa các layer về đúng Safe Zone. |
| `/studio accent` | Đổi màu nhấn của chữ nếu màu hiện tại bị chìm so với video. |
| `/studio vibe` | Thêm một chút nét thẩm mỹ tinh tế (doodle nhẹ, bóng mờ). |
| `/studio ultra vibe` | Bật toàn bộ các hiệu ứng thẩm mỹ đỉnh nhất của style pack (tối đa visual). |
| `/studio recipe` | Mở trình hướng dẫn tạo riêng một Style Pack độc quyền (Font + 2 Màu thương hiệu của bạn). |
| `/studio glow` | Chạy lượt kiểm tra và tút lại độ bóng bẩy cuối cùng trước khi xuất file. |

---

## PHẦN 6: 2 TUYỆT CHIÊU CỦA MASTER EDITOR

### Tuyệt chiêu 1: Đạo diễn ngay trong lúc quay (Direct in Footage)
Bạn không cần phải nhớ ghi chú ra giấy. **Khi đang quay video trên điện thoại, bạn có thể nói thẳng câu lệnh vào máy:**
> *"Đây là tiêu đề giật tít... Chỗ này hãy làm hiệu ứng karaoke... Đây là bảng đếm tiền lên 5 triệu đồng... Chỗ này chuyển sang màn hình takeover..."*

Khi bạn ném video thô này vào `inbox/`, module [`engine/spoken_cues.py`](engine/spoken_cues.py) sẽ **nghe thấy các từ khóa đó** và tự động gắn đúng hiệu ứng vào đúng giây bạn yêu cầu mà bạn không cần phải chat lại một câu nào!

### Tuyệt chiêu 2: Dạy engine học phong cách cá nhân (Self-Learning)
* `learn my pattern for the next reel`: Bắt engine ghi nhớ thay đổi bạn vừa chỉnh sửa để biến nó thành mặc định cho tất cả các reel sau.
* `remember this` hoặc `always do it this way`: Khóa cứng một sở thích biên tập vào [`engine/learned.py`](engine/learned.py).
* `add [từ] to my word list`: Dạy engine các từ ngữ chuyên ngành, tiếng lóng, tên riêng để bộ nhận diện giọng nói không bao giờ gõ sai phụ đề.

---

## 💻 CLI LỆNH THỰC THI NHANH QUA DÒNG LỆNH

```bash
# 1. Chạy Master Engine dựng video và xuất sang CapCut
python engine/reels_engine_cli.py \
  --name "MyReel_Master" \
  --video "inbox/master.mp4" \
  --subtitles "data/subtitles_life_first_business.json" \
  --register "teaching" \
  --hook-shape "eyebrow_headline" \
  --headline "bắt đầu từ lối sống bạn muốn ~" \
  --subhead "LIFE FIRST BUSINESS" \
  --export "capcut"

# 2. Bật Server CapCut Desktop
start_capcut_server.bat
```
