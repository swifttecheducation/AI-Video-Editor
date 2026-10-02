# 🎬 REELS EDITING ENGINE v3.0 (HYBRID SUPER-ENGINE)
# CẨM NANG TOÀN DIỆN & TÀI LIỆU KỸ THUẬT VẬN HÀNH DÀNH CHO MASTER EDITOR

> **Phiên bản**: v3.0 Commercial Hybrid Edition  
> **Kiến trúc**: Local Autonomous Editing Engine (CapCut Native + Remotion React Studio + Web UI)  
> **Hỗ trợ tối ưu**: Windows & macOS | 100% Tiếng Việt có dấu & Quốc tế | Phát thanh EBU R128 -14 LUFS

---

## 📑 MỤC LỤC
1. [PHẦN 1: BÊN TRONG ENGINE CÓ NHỮNG GÌ? (KIẾN TRÚC HỆ THỐNG HYBRID)](#phần-1-bên-trong-engine-có-những-gì-kiến-trúc-hệ-thống-hybrid)
2. [PHẦN 2: 7 ĐỘT PHÁ CẢI TIẾN ĐỘC QUYỀN TRÊN BẢN v3.0](#phần-2-7-đột-phá-cải-tiến-độc-quyền-trên-bản-v30)
3. [PHẦN 3: 4 ĐỊNH DẠNG VIDEO CHÍNH (FORMATS)](#phần-3-4-định-dạng-video-chính-formats)
4. [PHẦN 4: 4 MỨC ĐỘ HOÀN THIỆN CỦA BẢN DỰNG (DONENESS)](#phần-4-4-mức-độ-hoàn-thiện-của-bản-dựng-doneness)
5. [PHẦN 5: BẢNG LỆNH ĐIỀU KHIỂN DÀNH CHO MASTER EDITOR (CHAT COMMANDS)](#phần-5-bảng-lệnh-điều-khiển-dành-cho-master-editor-chat-commands)
6. [PHẦN 6: BỘ LỆNH TINH CHỈNH CHUYÊN SÂU (`/studio`)](#phần-6-bộ-lệnh-tinh-chỉnh-chuyên-sâu-studio)
7. [PHẦN 7: 2 TUYỆT CHIÊU CỦA MASTER EDITOR (DIRECT IN FOOTAGE & SELF-LEARNING)](#phần-7-2-tuyệt-chiêu-của-master-editor)
8. [PHẦN 8: HƯỚNG DẪN DÒNG LỆNH THỰC THI (CLI & QUICK START)](#phần-8-hướng-dẫn-dòng-lệnh-thực-thi-cli--quick-start)

---

## PHẦN 1: BÊN TRONG ENGINE CÓ NHỮNG GÌ? (KIẾN TRÚC HỆ THỐNG HYBRID)

Khác với các công cụ web AI đóng gói sẵn (chỉ cho phép xuất video MP4 cứng một track), **Reels Editing Engine v3.0** là một **hệ thống tự động hóa cục bộ (Local Autonomous Editing Engine)** can thiệp trực tiếp vào cấu trúc timeline của **CapCut Desktop** và tích hợp đồng thời trình render đồ họa động chuyên nghiệp **Remotion React Engine**.

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
  │ • WhisperX (large-v3, GPU RTX)    │   │ • OpenCV YuNet Chin-Lock          │
  │ • Auto-cắt dead air & flubs       │   │ • Semantic B-Roll Matcher (AI)    │
  │ • EBU R128 (-14 LUFS) Audio Norm  │   │ • Cover / Thumbnail Detector      │
  └─────────────────┬─────────────────┘   └─────────────────┬─────────────────┘
                    └───────────────────┬───────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
  ┌───────────────────────────────────┐   ┌───────────────────────────────────┐
  │    3. NATIVE VECTCUT CAPCUT       │   │ 4. REMOTION REACT GRAPHICS STUDIO │
  │ • Local Server (Port 9001)        │   │ • 60fps GPU-Accelerated React     │
  │ • Sinh project CapCut rời lớp     │   │ • Handheld Sway & Zoom Punch-In   │
  │ • File: draft_content.json        │   │ • Web Dashboard xem Blueprint     │
  └─────────────────┬─────────────────┘   └─────────────────┬─────────────────┘
                    └───────────────────┬───────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
         [ CapCut Desktop Draft ]                [ Production Render MP4 ]
         (Dự án mở, sửa từng chữ)                (Chuẩn 4K/1080p đăng ngay)
```

### Các module công nghệ cốt lõi:

1. **WhisperX + PyTorch GPU Engine** (`tools/transcribe.py`, `engine/clean_cut.py`):
   - Nhận diện giọng nói chính xác từng mili-giây.
   - **Cơ chế lọc thông minh**: Nếu người nói vấp một câu 2–3 lần, hệ thống tự động nhận diện và chỉ giữ lại take nói tốt cuối cùng, tự động cắt sạch mọi đoạn im lặng thừa (*dead air*).
2. **OpenCV Facial Detection & Chin-Lock** (`engine/chin_lock.py` & `engine/subject_guard.py`):
   - Sử dụng model AI YuNet (`media/models/face_detection_yunet_2023mar.onnx`) để theo dõi chuyển động khuôn mặt và cằm theo từng frame.
   - Giữ phụ đề luôn ở vị trí an toàn **ngay dưới cổ áo** (`y = chin + 40px` / `top: 1300px`), không bao giờ bị che miệng, cằm hay trang phục.
3. **VectCut API Engine** (`engine/vectcut/` & `engine/capcut_builder.py`):
   - Điều khiển trực tiếp cấu trúc dữ liệu của CapCut Desktop (`pyJianYingDraft`).
   - Tạo ra dự án CapCut đa timeline hoàn chỉnh: Track video chính, track B-roll, track Hook, track phụ đề, track danh sách viết tay và track SFX.
4. **Remotion React Graphics Engine** (`remotion/`):
   - Dựng hoạt họa động học 60fps bằng React, tạo hiệu ứng chuyển động rung lắc cầm tay chân thực (*Handheld Drift*) và giật zoom nhấn điểm (*Punch-In*).
5. **Creative Vault & Style Packs** (`engine/vault/` & `config/brand.default.json`):
   - Thư viện âm thanh CC0 thương mại đồng bộ.
   - Hệ thống font chữ phân định rõ ràng theo vai trò: Tiêu đề (*Headline*), Suy nghĩ/Phụ đề (*Thought/Caption*), Nhãn phân loại (*Chrome*).

---

## PHẦN 2: 7 ĐỘT PHÁ CẢI TIẾN ĐỘC QUYỀN TRÊN BẢN v3.0

So với bộ engine gốc chỉ chạy tốt trên Mac dòng lệnh, phiên bản v3.0 tích hợp các cải tiến độc quyền:

### 1. Kiến trúc kép "Dual-Output" (CapCut Desktop + Remotion Studio)
* Người dùng không bị bó buộc vào 1 phần mềm. Vừa có thể mở file dự án trong **CapCut Desktop** để biên tập thủ công, vừa có thể bật **Remotion React Studio** trên trình duyệt để preview trực tiếp từng frame và xuất video tự động bằng code.

### 2. Web UI Dashboard Trực Quan (`web/`)
* Cung cấp giao diện web hiện đại:
  * Trình phát video preview đồng bộ timeline.
  * **Visual Blueprint**: Bảng phân rã kịch bản chi tiết từng phân cảnh (*scene breakdown*).
  * Nút chuyển đổi nhanh chế độ B-Roll hoặc Text-Only cho từng câu thoại.

### 3. Bộ giải thuật Phụ đề tối ưu 100% Tiếng Việt (Vietnamese Typography Engine)
* Tích hợp và cấu hình sẵn các bộ font thương mại Việt hóa đẳng cấp: **`SVN-Chicken Noodle Soup`**, **`Alegreya`**, **`Be Vietnam Pro`**.
* Thuật toán bẻ dòng (*line-wrap*) thông minh theo cụm ngữ nghĩa 2–4 từ tiếng Việt, triệt tiêu hoàn toàn lỗi rớt từ mồ côi (*orphan word*) và lỗi font có dấu (`ư, ơ, ê, dấu hỏi, dấu ngã`).

### 4. Tương thích tuyệt đối với Windows & CapCut Quốc tế
* Tự động xử lý bảng mã `UTF-8` toàn diện (loại bỏ hoàn toàn lỗi crash mã hóa `cp1252` trên Windows).
* Cơ chế **Resilient Font Fallback**: Khi CapCut thiếu font nội bộ, hệ thống tự động ánh xạ sang font tương thích gần nhất mà không làm dừng tiến trình.
* Hỗ trợ lưu trữ linh hoạt cả ổ đĩa `C:` (`%LOCALAPPDATA%`) lẫn ổ đĩa `D:` (`D:\CapCut Drafts`).

### 5. Tiêu chuẩn Âm thanh Phát thanh Quốc tế (EBU R128 -14 LUFS)
* Tự động chạy thuật toán lọc âm 2-pass qua FFmpeg `loudnorm`:
  * `Integrated Loudness`: `-14 LUFS` (Chuẩn vàng của TikTok, Instagram Reels, YouTube Shorts).
  * `Loudness Range (LRA)`: `7 LU`.
  * `True Peak`: `-1.0 dB`.
  * Giúp giọng nói luôn trong trẻo, to rõ và không bao giờ bị nền tảng bóp âm lượng.

### 6. AI Semantic B-Roll Matcher (Khớp B-Roll theo ngữ nghĩa)
* Không cắt B-roll ngẫu nhiên. Module `tools/semantic_broll_matcher.py` đọc ngữ nghĩa câu thoại từ Whisper để tự động chọn đúng cảnh B-roll tương ứng (ví dụ: đoạn nói về tài chính ghép cảnh bàn bạc/hợp đồng, đoạn nói về con cái ghép cảnh mẹ con).

### 7. Gói thương mại độc lập Turn-Key (`templates/reels-automation-engine/`)
* Đóng gói sạch sẽ, độc lập, có thể mang đi chuyển giao, cài đặt cho đối tác hoặc kinh doanh dịch vụ video tự động hóa. Kèm script khởi động 1-click `start_capcut_server.bat`.

---

## PHẦN 3: 4 ĐỊNH DẠNG VIDEO CHÍNH (FORMATS)

Khi bắt đầu một video, đạo diễn chọn 1 trong 4 định dạng:

| Định dạng | Mô tả chuyên môn | Ứng dụng thực tế |
|---|---|---|
| **Yap** | Video nói trực diện camera (Talking-head). Tự động chia làm 2 cấp độ:<br>• **Confessional**: Tâm sự mộc mạc, tiết chế đồ họa, chân thực.<br>• **Teaching/Explainer**: Đồ họa dày, thẻ số liệu, b-roll cắt xen, SFX sinh động. | Chia sẻ kiến thức, tâm sự, xây dựng nhân hiệu cá nhân. |
| **Voiceover** | Video không lộ mặt nói (Faceless/Cinematic). Thuật toán `vo_cutgrid.py` ghép giọng đọc của bạn với kho B-roll theo nhịp điệu cảm xúc. | Kể chuyện, vlog phong cách sống, du lịch, quote truyền cảm hứng. |
| **Animation** | Video đồ họa động hoàn toàn không cần quay phim. Chỉ cần kịch bản chữ, engine sẽ biến thành typography chuyển động và thẻ đồ họa. | Giới thiệu tính năng, tips nhanh, thông báo, video thuần chữ. |
| **B-Roll Reels** | Đưa vào 1 thư mục chứa nhiều clip B-roll, engine sẽ tự động cắt và sản xuất hàng loạt video dạng quote/hook ngắn để đăng dần. | Đăng bài số lượng lớn (batch content automation). |

---

## PHẦN 4: 4 MỨC ĐỘ HOÀN THIỆN CỦA BẢN DỰNG (DONENESS)

Người dùng quyết định mức độ can thiệp vào sản phẩm:

* **Raw**: Engine chỉ cắt gọt thô, gỡ tạp âm/đoạn thừa, tạo phụ đề text cơ bản trong CapCut. Dành cho editor muốn tự tay múa hiệu ứng trong CapCut.
* **Medium (Khuyên dùng)**: Tạo ra timeline CapCut đã phân tầng đầy đủ các layer thiết kế, sticker, SFX, text. Bạn có thể kéo thả, bật/tắt hoặc chỉnh sửa bất kỳ layer nào.
* **Well-done**: Engine render hoàn chỉnh thành file `.final.mp4` sẵn sàng đăng ngay mà không cần mở CapCut.
* **Hands-off**: Chế độ rảnh tay: đưa video vào, AI tự chọn toàn bộ phong cách và trả về video thành phẩm hoàn chỉnh.

---

## PHẦN 5: BẢNG LỆNH ĐIỀU KHIỂN DÀNH CHO MASTER EDITOR (CHAT COMMANDS)

Engine hoạt động theo tôn chỉ: **BẠN LÀ ĐẠO DIỄN (DIRECTOR), AI LÀ KỸ THUẬT DỰNG (EDITOR)**. Dưới đây là các câu lệnh bạn chỉ cần gõ vào chat:

### 1. Lệnh Khởi Chạy & Định Dạng
* `edit this reel`: Yêu cầu engine dựng clip mới nhất vừa bỏ vào thư mục `inbox/`.
* `edit this video: [đường dẫn file]`: Chỉ định một file video cụ thể ở bất kỳ đâu trên máy.
* `let's make a Yap`: Chọn dựng kiểu Talking-head.
* `make my voiceover reel`: Chọn dựng kiểu Voiceover lồng B-roll.
* `make an animation reel`: Dựng video đồ họa động từ kịch bản script.
* `make b-roll reels`: Batch tạo video từ kho clip B-roll.
* `keep it raw` / `make it medium` / `make it well-done` / `do it hands-off`: Chọn mức độ hoàn thiện.

### 2. Lệnh Kiểm Soát Phụ Đề (Captions)
* `make these single-word captions`: Hiện từng từ một thật to ở chính giữa (kiểu Alex Hormozi/MrBeast).
* `make this karaoke`: Hiện cả câu trên màn hình, từng từ sáng đèn (highlight) theo nhịp đọc.
* `make this a takeover`: Toàn bộ màn hình phủ kín chữ xếp tầng, nhấn mạnh từ khóa chính vào thời điểm bùng nổ.
* `I'll do captions in CapCut`: Bỏ qua tạo caption của engine để bạn tự dùng Auto-captions trong CapCut.

### 3. Lệnh Đồ Họa & Điểm Nhấn Thị Giác (Visual Extras)
* `put the hook here`: Đặt thẻ tiêu đề giật tít ở 3 giây đầu video.
* `put the hook behind me`: Tự động tách nền và đẩy tiêu đề ra phía sau lưng nhân vật.
* `add a thought bubble that says [nội dung]`: Thêm một bong bóng suy nghĩ viết tay bay cạnh đầu.
* `make that a count-up`: Biến con số bạn nói thành hiệu ứng số nhảy (ví dụ: nhảy từ $0 đến $500).
* `add a breakaway card here`: Ngắt khung hình người nói bằng một thẻ đồ họa thiết kế toàn màn hình.
* `cut away to b-roll on this line`: Cắt chuyển sang video B-roll trong khi giọng nói vẫn tiếp tục.
* `cut me out over this`: Tách người bạn ra khỏi nền và ghép lên nền card/ảnh khác.
* `drop my star doodle on this word`: Thả hình vẽ doodle/sticker vào đúng từ được nhấn mạnh.

### 4. Lệnh Góc Máy, Chuyển Động & Âm Thanh (Motion & Sound)
* `start with a slow zoom`: Mở đầu video bằng một cú đẩy khung hình (push-in) từ từ để cuốn người xem.
* `punch in on that word`: Giật zoom nhanh (punch-in 110%) vào một từ mang tính điểm nhấn.
* `add matched sound effects`: Tự động gắn âm thanh SFX (click, pop, whoosh) khớp chính xác với từng sticker hay chữ xuất hiện.
* `study my CapCut draft called [tên dự án]`: Chỉ định một project CapCut mẫu chứa các âm thanh SFX bạn thích để engine học thói quen dùng âm thanh của bạn.
* `add a music bed` / `skip the music`: Thêm hoặc bỏ nhạc nền lofi/ambient nhẹ bên dưới giọng nói.
* `make my cover`: AI quét các khung hình đẹp nhất của khuôn mặt bạn, đưa ra các phương án thumbnail và chèn text bìa để hiển thị trên Instagram Grid.

---

## PHẦN 6: BỘ LỆNH TINH CHỈNH CHUYÊN SÂU (`/studio`)

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

## PHẦN 7: 2 TUYỆT CHIÊU CỦA MASTER EDITOR

### Tuyệt chiêu 1: Đạo diễn ngay trong lúc quay (Direct in Footage)
Bạn không cần phải nhớ ghi chú ra giấy. **Khi đang quay video trên điện thoại, bạn có thể nói thẳng câu lệnh vào máy:**
> *"Đây là tiêu đề giật tít... Chỗ này hãy làm hiệu ứng karaoke... Đây là bảng đếm tiền lên 5 triệu đồng... Chỗ này chuyển sang màn hình takeover..."*

Khi bạn ném video thô này vào `inbox/`, module `engine/spoken_cues.py` sẽ **nghe thấy các từ khóa đó** và tự động gắn đúng hiệu ứng vào đúng giây bạn yêu cầu mà bạn không cần phải chat lại một câu nào!

### Tuyệt chiêu 2: Dạy engine học phong cách cá nhân (Self-Learning)
* `learn my pattern for the next reel`: Bắt engine ghi nhớ thay đổi bạn vừa chỉnh sửa để biến nó thành mặc định cho tất cả các reel sau.
* `remember this` hoặc `always do it this way`: Khóa cứng một sở thích biên tập vào `engine/learned.py`.
* `add [từ] to my word list`: Dạy engine các từ ngữ chuyên ngành, tiếng lóng, tên riêng để bộ nhận diện giọng nói không bao giờ gõ sai phụ đề.

---

## PHẦN 8: HƯỚNG DẪN DÒNG LỆNH THỰC THI (CLI & QUICK START)

### 1. Lệnh Dựng Video Nhanh Sang CapCut Desktop (Master CLI)
```bash
python engine/reels_engine_cli.py \
  --name "LifeFirst_Commercial_Project" \
  --video "videos/life-first-business/master.mp4" \
  --subtitles "data/subtitles_life_first_business.json" \
  --register "teaching" \
  --hook-shape "eyebrow_headline" \
  --headline "bắt đầu từ lối sống bạn muốn ~" \
  --subhead "LIFE FIRST BUSINESS" \
  --export "capcut"
```

### 2. Khởi Động Server CapCut Cục Bộ (Port 9001)
* Nhấp đúp chuột vào file: `start_capcut_server.bat`
* Hoặc chạy lệnh:
  ```bash
  python engine/vectcut/capcut_server.py
  ```

### 3. Mở Trình Xem Remotion React Studio
```bash
cd remotion
npm run studio
```
Truy cập: `http://localhost:3000/ReelsTemplateMaster` để xem trước trực tiếp trên web.

### 4. Render Video Hoàn Chỉnh (EBU R128 Audio Norm)
```bash
cd remotion
node scripts/render_life_first.mjs
python ../tools/postprocess_life_first.py
```
File hoàn chỉnh sẽ xuất hiện tại thư mục `out/` và trên Desktop của bạn!
