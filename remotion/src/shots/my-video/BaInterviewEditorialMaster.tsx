import React from 'react';
import {
  AbsoluteFill,
  Video,
  Img,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';

export const compositionConfig = {
  id: 'BaInterviewEditorialMaster',
  durationInSeconds: 157.62,
  fps: 30,
  width: 1080,
  height: 1920,
};

// 100% Exact word-for-word transcript matching the speaker's actual voice
const SUBTITLES = [
  // Segment 1 (0.16s - 4.30s)
  { s: 0.16, e: 4.30, text: 'Tuần trước mình lại phải từ chối một bạn đã đăng ký chương trình Interview Master của bên mình.' },
  // Segment 2 (4.30s - 15.60s)
  { s: 4.30, e: 9.50, text: 'Không phải vì bạn ấy không cố gắng, ngược lại là bạn ấy học rất là nhiều,' },
  { s: 9.50, e: 15.60, text: 'bạn ấy biết dùng Jira này, biết viết User Story, biết vẽ Flow Chart, rồi cũng có thể viết document theo template tương đối đầy đủ.' },
  // Segment 3 (15.60s - 23.54s)
  { s: 15.60, e: 19.80, text: 'Đó, nhưng mà trong cái lúc mà mình interview bạn ấy chuyên sâu hơn' },
  { s: 19.80, e: 23.54, text: 'thì mình hỏi: "Tại sao trong trường hợp này em lại chọn hỏi câu hỏi đó?" thì bạn bắt đầu lúng túng.' },
  // Segment 4 (24.06s - 32.48s)
  { s: 24.06, e: 28.50, text: 'Và lúc đó là lúc mà mình nhận ra rằng rất nhiều bạn đang học BA theo cái cách:' },
  { s: 28.50, e: 32.48, text: 'biến mình thành một người THỢ DÙNG CÔNG CỤ, chứ không phải là một người thực sự đang LÀM PHÂN TÍCH.' },
  // Segment 5 (32.92s - 42.92s)
  { s: 32.92, e: 38.00, text: 'Nhiều người cứ nghĩ là có thể vẽ flowchart đẹp này, rồi viết user story theo template này,' },
  { s: 38.00, e: 42.92, text: 'dùng Jira, Figma hay là một số các cái tool thật là thành thạo thì bạn có thể trở thành BA.' },
  // Segment 6 (43.26s - 50.74s)
  { s: 43.26, e: 47.00, text: 'Nhưng mà tất cả đó thì nó chỉ là công cụ thôi.' },
  { s: 47.00, e: 50.74, text: 'Nó giống như việc các bạn biết hát, các bạn cầm mic lên không có nghĩa các bạn sẽ trở thành ca sĩ, đúng không?' },
  // Segment 7 (51.26s - 56.68s)
  { s: 51.26, e: 56.68, text: 'Một người thợ ấy thì khi mà làm BA, người ta sẽ ghi lại chính xác những cái gì mà khách hàng yêu cầu này.' },
  // Segment 8 (56.84s - 64.06s)
  { s: 56.84, e: 60.80, text: 'Còn một BA thật sự thì sẽ luôn tự hỏi: Tại sao họ lại cần tính năng này?' },
  { s: 60.80, e: 64.06, text: 'Root cause thật sự là gì? Có cách nào giải quyết cái vấn đề này tốt hơn không?' },
  // Segment 9 (64.34s - 68.56s)
  { s: 64.34, e: 68.56, text: 'Và nếu như mà thay đổi như thế này thì hiện tại cái hệ thống nó sẽ bị ảnh hưởng những cái gì?' },
  // Segment 10 (68.94s - 74.24s)
  { s: 68.94, e: 74.24, text: 'Bản chất của BA ấy, nó chưa bao giờ là cái nghề mà viết document, viết tài liệu hay là vẽ sơ đồ.' },
  // Segment 11 (74.70s - 78.26s)
  { s: 74.70, e: 78.26, text: 'BA là một cái nghề giải quyết cái bài toán kinh doanh bằng công nghệ.' },
  // Segment 12 (78.80s - 86.54s)
  { s: 78.80, e: 86.54, text: 'Có một xu hướng tất yếu mà mình đã quan sát được từ thời điểm trước, và trong thời đại AI thì càng thúc đẩy xu hướng đó hơn.' },
  // Segment 13 (86.54s - 92.23s)
  { s: 86.54, e: 92.23, text: 'Đó là công cụ sẽ càng ngày càng dễ sử dụng hơn, hay việc học tool á, nó có thể chỉ mất vài tuần đến một tháng thôi.' },
  // Segment 14 (92.23s - 96.91s)
  { s: 92.23, e: 96.91, text: 'Nhưng mà cái tư duy phân tích mới là cái thứ cần rất nhiều thời gian để mà có thể mài giũa.' },
  // Segment 15 (97.44s - 102.67s)
  { s: 97.44, e: 102.67, text: 'Và đó cũng là cái lý do mà mình thường nhận rất là ít mỗi năm cho cái chương trình Interview Master.' },
  // Segment 16 (103.02s - 114.16s)
  { s: 103.02, e: 108.50, text: 'Vì thực tế là rất nhiều bạn tự học BA hoặc các bạn có thể học ở những bên khác,' },
  { s: 108.50, e: 114.16, text: 'nhưng không có người định hướng rõ ràng hoặc giải thích nguyên lý phía sau mỗi quyết định, nên khả năng phân tích bị yếu.' },
  // Segment 17 (114.57s - 133.79s)
  { s: 114.57, e: 120.50, text: 'Trong khi đó Interview Master là chương trình duy nhất của chúng mình không dạy lại từ đầu hay truyền đạt kiến thức nền tảng,' },
  { s: 120.50, e: 126.92, text: 'mà sẽ chỉ tập trung vào hỗ trợ ứng tuyển này, mock interview này, rồi cả tối ưu những cái chiến lược tìm việc nữa.' },
  { s: 127.15, e: 133.79, text: 'Nên tụi mình buộc phải yêu cầu đầu vào cao để đảm bảo là các bạn đã có cái nền tảng tư duy BA trước khi tham gia.' },
  // Segment 18 (134.33s - 147.63s)
  { s: 134.33, e: 141.00, text: 'Nếu bạn đã và đang tự học BA hoặc đã học qua một vài khóa BA, nhưng vẫn chưa tìm được một công việc ưng ý nào, thường xuyên bị từ chối,' },
  { s: 141.00, e: 147.63, text: 'thì có thể vấn đề không nằm ở việc bạn chưa đủ cố gắng, mà nằm ở việc là bạn đang học sai trọng tâm rồi.' },
  // Segment 19 (148.19s - 157.61s)
  { s: 148.19, e: 152.80, text: 'Vậy thì hãy comment email để chúng mình hẹn một lịch mock interview,' },
  { s: 152.80, e: 157.61, text: 'cũng như là để đánh giá chi tiết và đưa ra những định hướng, một lộ trình thực chiến phù hợp hơn dành cho bạn nha!' },
];

export const BaInterviewEditorialMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Active Subtitle
  const activeSub = SUBTITLES.find((s) => currentTime >= s.s && currentTime <= s.e);

  // 1. Natural Handheld Camera Drift
  const driftX = Math.sin(frame / 35) * 3;
  const driftY = Math.cos(frame / 45) * 2;
  const driftRotate = Math.sin(frame / 55) * 0.2;

  // 2. Editorial Multi-Cam Punch-Ins (Dynamic focus at key moments)
  let baseZoom = 1.0;
  if (currentTime >= 19.8 && currentTime < 23.54) {
    baseZoom = 1.12; // Spotlight question punch
  } else if (currentTime >= 28.5 && currentTime < 32.48) {
    baseZoom = 1.07; // Core insight
  } else if (currentTime >= 56.8 && currentTime < 64.06) {
    baseZoom = 1.09; // BA really asks Why?
  } else if (currentTime >= 74.7 && currentTime < 78.26) {
    baseZoom = 1.08; // Core definition
  } else if (currentTime >= 141.0 && currentTime < 147.63) {
    baseZoom = 1.08; // Empathy beat
  } else if (currentTime >= 148.19) {
    baseZoom = 1.11; // Direct CTA punch
  }

  const makeSpring = (startFrame: number, damping = 16, stiffness = 140) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping, stiffness, mass: 0.8 },
    });
  };

  // Visual segment triggers
  const showReviewModal = currentTime >= 0.8 && currentTime <= 3.9;
  const showJiraBpmBoard = currentTime >= 9.8 && currentTime <= 15.2;
  const showQuestionCard = currentTime >= 19.8 && currentTime <= 23.5;
  const showThoVsBaCard = currentTime >= 28.2 && currentTime <= 32.5;
  const showToolsChecklist = currentTime >= 34.0 && currentTime <= 41.5;
  const showMicAnalogy = currentTime >= 44.0 && currentTime <= 50.2;
  const showRootCauseCard = currentTime >= 57.0 && currentTime <= 63.8;
  const showImpactAnalysis = currentTime >= 64.5 && currentTime <= 68.5;
  const showDefinitionCard = currentTime >= 74.5 && currentTime <= 78.2;
  const showAiEraCard = currentTime >= 84.0 && currentTime <= 94.0;
  const showMissingLinkCard = currentTime >= 105.0 && currentTime <= 113.5;
  const showInterviewMasterPillars = currentTime >= 115.5 && currentTime <= 126.5;
  const showWrongFocusCard = currentTime >= 139.5 && currentTime <= 147.0;
  const showCtaCard = currentTime >= 148.2 && currentTime <= 157.2;

  // Flash transition detector for major cutaway moments (very subtle, 3 frames)
  const isCutawayEntry =
    (frame >= 24 && frame <= 27) ||
    (frame >= 294 && frame <= 297) ||
    (frame >= 450 && frame <= 453) ||
    (frame >= 1320 && frame <= 1323) ||
    (frame >= 1500 && frame <= 1503);

  return (
    <AbsoluteFill style={{ backgroundColor: '#090D16', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* ─── 1. MASTER VIDEO FOOTAGE WITH CINEMATIC COLOR GRADE ─── */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `translate(${driftX}px, ${driftY}px) scale(${baseZoom}) rotate(${driftRotate}deg)`,
            transformOrigin: 'center 38%',
          }}
        >
          <Video
            src={staticFile('projects/my-video/master.mp4')}
            volume={1.0}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Clean Editorial Ambient Film Vignette */}
          <AbsoluteFill
            style={{
              background:
                'radial-gradient(ellipse at 50% 36%, rgba(255, 235, 200, 0.04) 0%, rgba(10, 15, 25, 0.25) 80%, rgba(4, 7, 14, 0.6) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ─── 2. AUTHENTIC DOCUMENTARY EDITORIAL OVERLAYS & CUTAWAYS ─── */}

      {/* BEAT 1: CANDIDATE APPLICATION REVIEW (0.8s - 3.9s) */}
      {showReviewModal && (() => {
        const spr = makeSpring(24);
        const stampSpr = makeSpring(45);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -30}px) scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 28,
                padding: '28px 32px',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 14 }}>
                <div>
                  <span style={{ fontSize: 14, color: '#38BDF8', fontWeight: 800, letterSpacing: 1.5 }}>HỆ THỐNG TUYỂN CHỌN</span>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', marginTop: 2 }}>Hồ Sơ Ứng Viên: Interview Master</div>
                </div>
                <div style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                  Kỳ Đánh Giá 2026
                </div>
              </div>

              {/* Skills checklist */}
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#CBD5E1' }}>
                  <span>Kỹ năng thao tác Jira & Confluence:</span>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓ Đạt yêu cầu</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#CBD5E1' }}>
                  <span>Viết User Story & Vẽ Flowchart:</span>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓ Đạt yêu cầu</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#CBD5E1' }}>
                  <span>Tư duy phân tích nghiệp vụ thực tế:</span>
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕ Chưa đạt</span>
                </div>
              </div>

              {/* Red Review Stamp */}
              <div
                style={{
                  marginTop: 20,
                  transform: `scale(${interpolate(stampSpr, [0, 1], [1.3, 1.0])}) rotate(-3deg)`,
                  opacity: stampSpr,
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '2.5px solid #EF4444',
                  borderRadius: 16,
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <span style={{ color: '#EF4444', fontSize: 22, fontWeight: 900, letterSpacing: 2, fontFamily: FONT_DISPLAY }}>
                  TỪ CHỐI ĐẦU VÀO • CẦN CỦNG CỐ TƯ DUY
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 2: REAL JIRA KANBAN & BPMN FLOWCHART CUTAWAY (9.8s - 15.2s) */}
      {showJiraBpmBoard && (() => {
        const p = (currentTime - 9.8) / 5.4;
        const bZoom = interpolate(p, [0, 1], [1.0, 1.06]);
        const panY = interpolate(p, [0, 1], [0, -10]);
        const ticketSpr = makeSpring(300);
        return (
          <AbsoluteFill style={{ zIndex: 35 }}>
            {/* Real workspace photographic backdrop */}
            <div style={{ width: '100%', height: '100%', transform: `scale(${bZoom}) translateY(${panY}px)`, overflow: 'hidden' }}>
              <Img
                src={staticFile('library/workspace/w1-establishing.jpg')}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
              />
            </div>

            {/* Ultra-sharp Real UI Mockup */}
            <div
              style={{
                position: 'absolute',
                top: 130,
                left: 40,
                right: 40,
                transform: `scale(${interpolate(ticketSpr, [0, 1], [0.92, 1.0])})`,
                opacity: ticketSpr,
              }}
            >
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.97)',
                  borderRadius: 24,
                  border: '1.5px solid rgba(56, 189, 248, 0.4)',
                  padding: '24px 28px',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
                }}
              >
                {/* Jira Card */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: '#2563EB', color: '#FFFFFF', padding: '4px 10px', borderRadius: 6, fontSize: 13, fontWeight: 900 }}>
                    JIRA TICKET
                  </span>
                  <span style={{ color: '#94A3B8', fontSize: 15, fontWeight: 700 }}>[PROJ-104] Payment Flow Story</span>
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800, marginTop: 8 }}>
                  Viết User Story & Vẽ BPMN Flowchart theo Template
                </div>

                {/* Flowchart Diagram SVG */}
                <div style={{ marginTop: 18, background: 'rgba(30, 41, 59, 0.8)', borderRadius: 16, padding: '16px 20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 13, color: '#38BDF8', fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>
                    BPMN PROCESS FLOW:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ background: '#0284C7', color: '#FFF', padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 700 }}>
                      Khách Hàng Đặt Mua
                    </div>
                    <span style={{ color: '#38BDF8', fontSize: 18, fontWeight: 900 }}>➔</span>
                    <div style={{ background: '#F59E0B', color: '#FFF', padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 700 }}>
                      Kiểm Tra OTP?
                    </div>
                    <span style={{ color: '#38BDF8', fontSize: 18, fontWeight: 900 }}>➔</span>
                    <div style={{ background: '#10B981', color: '#FFF', padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 700 }}>
                      Hoàn Tất Đơn
                    </div>
                  </div>
                </div>

                {/* Footer notes */}
                <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                  <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 700 }}>
                    ✓ Đầy đủ template
                  </span>
                  <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 700 }}>
                    ✓ Sơ đồ mạch lạc
                  </span>
                </div>
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* BEAT 3: THE FATAL QUESTION CARD (19.8s - 23.5s) */}
      {showQuestionCard && (() => {
        const spr = makeSpring(594);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -25}px) scale(${interpolate(spr, [0, 1], [0.9, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 26,
                padding: '28px 36px',
                border: '2px solid rgba(239, 68, 68, 0.65)',
                boxShadow: '0 0 50px rgba(239, 68, 68, 0.4), 0 25px 70px rgba(0, 0, 0, 0.85)',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: '#F87171', letterSpacing: 2, textTransform: 'uppercase' }}>
                CÂU HỎI PHỎNG VẤN CHUYÊN SÂU 🎯
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: '#FFFFFF', marginTop: 10, lineHeight: 1.35 }}>
                "Tại sao trong trường hợp này em lại chọn hỏi câu hỏi đó?"
              </div>
              <div style={{ marginTop: 14, color: '#94A3B8', fontSize: 17, fontStyle: 'italic' }}>
                ➔ Ứng viên lúng túng vì chỉ làm theo thói quen mẫu, thiếu tư duy phản biện.
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 4: THỢ DÙNG TOOL VS NGƯỜI LÀM PHÂN TÍCH (28.2s - 32.5s) */}
      {showThoVsBaCard && (() => {
        const spr = makeSpring(846);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.9, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 30px',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FACC15', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                THỰC TẾ ĐÁNG BÁO ĐỘNG
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                {/* Column 1 */}
                <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1.5px solid rgba(239, 68, 68, 0.4)', borderRadius: 16, padding: '16px 18px' }}>
                  <div style={{ color: '#EF4444', fontWeight: 900, fontSize: 18 }}>THỢ DÙNG TOOL</div>
                  <div style={{ color: '#CBD5E1', fontSize: 15, marginTop: 8, lineHeight: 1.4 }}>
                    • Chỉ bấm nút cơ học<br/>
                    • Điền theo template<br/>
                    • Dễ bị AI thay thế
                  </div>
                </div>
                {/* Column 2 */}
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1.5px solid rgba(16, 185, 129, 0.4)', borderRadius: 16, padding: '16px 18px' }}>
                  <div style={{ color: '#10B981', fontWeight: 900, fontSize: 18 }}>NGƯỜI PHÂN TÍCH</div>
                  <div style={{ color: '#CBD5E1', fontSize: 15, marginTop: 8, lineHeight: 1.4 }}>
                    • Hiểu bản chất bài toán<br/>
                    • Đặt câu hỏi đúng<br/>
                    • Giá trị bền vững
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 5: TOOLS MISCONCEPTION CHIPS (34.0s - 41.5s) */}
      {showToolsChecklist && (() => {
        const spr = makeSpring(1020);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderRadius: 24,
                padding: '24px 32px',
                border: '1.5px solid rgba(56, 189, 248, 0.35)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', letterSpacing: 1.5 }}>
                ẢO TƯỞNG PHỔ BIẾN CỦA NGƯỜI MỚI:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#F1F5F9', padding: '8px 16px', borderRadius: 20, fontSize: 16, fontWeight: 700 }}>
                  Vẽ Flowchart đẹp 📐
                </span>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#F1F5F9', padding: '8px 16px', borderRadius: 20, fontSize: 16, fontWeight: 700 }}>
                  User Story template 📝
                </span>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#F1F5F9', padding: '8px 16px', borderRadius: 20, fontSize: 16, fontWeight: 700 }}>
                  Thạo Jira & Figma ⚙️
                </span>
              </div>
              <div style={{ marginTop: 14, color: '#EF4444', fontSize: 18, fontWeight: 800 }}>
                ≠ Đủ để trở thành một Business Analyst thực thụ!
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 6: SINGER & MICROPHONE METAPHOR (44.0s - 50.2s) */}
      {showMicAnalogy && (() => {
        const spr = makeSpring(1320);
        return (
          <div
            style={{
              position: 'absolute',
              bottom: 240,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * 30}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 26,
                padding: '24px 34px',
                border: '2px solid rgba(250, 204, 21, 0.7)',
                boxShadow: '0 0 50px rgba(250, 204, 21, 0.35), 0 25px 70px rgba(0,0,0,0.85)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#FACC15', fontWeight: 900, fontSize: 16, letterSpacing: 2 }}>
                ẨN DỤ SẮC BÉN 🎙️
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 28, marginTop: 8, fontStyle: 'italic', lineHeight: 1.35 }}>
                "Cầm mic lên không có nghĩa bạn sẽ trở thành ca sĩ!"
              </div>
              <div style={{ color: '#94A3B8', fontSize: 17, marginTop: 8 }}>
                Biết dùng công cụ không có nghĩa bạn đã biết làm phân tích kinh doanh.
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 8: ROOT CAUSE & PROBLEM SOLVER (57.0s - 63.8s) */}
      {showRootCauseCard && (() => {
        const spr = makeSpring(1710);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.9, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 26,
                padding: '26px 34px',
                border: '2px solid #38BDF8',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.4), 0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#38BDF8', fontWeight: 900, fontSize: 16, letterSpacing: 2 }}>
                TƯ DUY BA THỰC THỤ 💡
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 26, marginTop: 10 }}>
                3 Câu Hỏi Cốt Lõi BA Luôn Tự Hỏi:
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, color: '#E2E8F0', fontSize: 18, fontWeight: 700 }}>
                <div>1. Tại sao khách hàng cần tính năng này?</div>
                <div>2. Root cause (nguyên nhân gốc rễ) là gì?</div>
                <div>3. Có giải pháp nào tối ưu hơn không?</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 9: SYSTEM IMPACT ANALYSIS (64.5s - 68.5s) */}
      {showImpactAnalysis && (() => {
        const spr = makeSpring(1935);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderRadius: 24,
                padding: '24px 32px',
                border: '1.5px solid rgba(245, 158, 11, 0.6)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ color: '#F59E0B', fontWeight: 900, fontSize: 16, letterSpacing: 2 }}>
                SYSTEM IMPACT ANALYSIS 🔍
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 24, marginTop: 8 }}>
                Thay đổi này ảnh hưởng gì đến toàn hệ thống?
              </div>
              <div style={{ marginTop: 10, color: '#94A3B8', fontSize: 16 }}>
                Database • API tích hợp • Luồng người dùng • Hiệu năng
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 10 & 11: DEFINITION OF BA (74.5s - 78.2s) */}
      {showDefinitionCard && (() => {
        const spr = makeSpring(2235);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.9, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 26,
                padding: '26px 36px',
                border: '2px solid #10B981',
                boxShadow: '0 0 50px rgba(16, 185, 129, 0.4), 0 25px 70px rgba(0,0,0,0.85)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#10B981', fontWeight: 900, fontSize: 16, letterSpacing: 2 }}>
                BẢN CHẤT CỐT LÕI CỦA NGHỀ BA
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 30, marginTop: 10, lineHeight: 1.35 }}>
                "Giải quyết bài toán kinh doanh bằng công nghệ"
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 12-14: THE AI ERA & TOOLS VS MINDSET (84.0s - 94.0s) */}
      {showAiEraCard && (() => {
        const spr = makeSpring(2520);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 26,
                padding: '26px 32px',
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#38BDF8', fontWeight: 900, fontSize: 15, letterSpacing: 1.5 }}>
                THỜI ĐẠI AI & XU HƯỚNG TẤT YẾU 🤖
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '12px 18px' }}>
                  <span style={{ color: '#FACC15', fontWeight: 800, fontSize: 16 }}>Học Tool:</span>
                  <span style={{ color: '#E2E8F0', fontSize: 16, marginLeft: 8 }}>Chỉ mất vài tuần đến 1 tháng (Dễ bị AI thay thế)</span>
                </div>
                <div style={{ background: 'rgba(56, 189, 248, 0.12)', borderRadius: 14, padding: '12px 18px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  <span style={{ color: '#38BDF8', fontWeight: 800, fontSize: 16 }}>Tư Duy Phân Tích:</span>
                  <span style={{ color: '#FFFFFF', fontSize: 16, marginLeft: 8 }}>Cần rất nhiều thời gian mài giũa thực tế!</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 16: THE MISSING LINK OF SELF-TAUGHT BA (105.0s - 113.5s) */}
      {showMissingLinkCard && (() => {
        const spr = makeSpring(3150);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.9, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 26,
                padding: '26px 34px',
                border: '1.5px solid rgba(239, 68, 68, 0.5)',
                boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#EF4444', fontWeight: 900, fontSize: 15, letterSpacing: 2 }}>
                LỖ HỔNG CỦA VIỆC TỰ HỌC ⚠️
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 24, marginTop: 8 }}>
                Thiếu người giải thích cơ chế & nguyên lý phía sau mỗi quyết định
              </div>
              <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 8 }}>
                ➔ Dẫn đến khả năng phân tích bị yếu khi đối diện phỏng vấn chuyên sâu.
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 17: INTERVIEW MASTER 3 PILLARS (115.5s - 126.5s) */}
      {showInterviewMasterPillars && (() => {
        const spr = makeSpring(3465);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 30px',
                border: '2px solid rgba(56, 189, 248, 0.5)',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.35), 0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#38BDF8', fontWeight: 900, fontSize: 15, letterSpacing: 2 }}>
                CHƯƠNG TRÌNH INTERVIEW MASTER 🎯
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                  <span style={{ color: '#10B981' }}>✓</span> Mock Interview 1-1 phản biện chuyên sâu
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                  <span style={{ color: '#10B981' }}>✓</span> Tối ưu hồ sơ ứng tuyển & Portfolio thực chiến
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                  <span style={{ color: '#10B981' }}>✓</span> Chiến lược tìm việc & chinh phục nhà tuyển dụng
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 18: WRONG FOCUS REALIZATION (139.5s - 147.0s) */}
      {showWrongFocusCard && (() => {
        const spr = makeSpring(4185);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.9, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 26,
                padding: '26px 36px',
                border: '2px solid rgba(250, 204, 21, 0.8)',
                boxShadow: '0 0 50px rgba(250, 204, 21, 0.35), 0 25px 70px rgba(0,0,0,0.85)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#FACC15', fontWeight: 900, fontSize: 16, letterSpacing: 2 }}>
                NHÌN LẠI BẢN THÂN
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 28, marginTop: 10, lineHeight: 1.35 }}>
                "Không phải bạn chưa đủ cố gắng, mà là bạn đang HỌC SAI TRỌNG TÂM!"
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 19: EXACT SPOKEN CTA - COMMENT EMAIL (148.2s - 157.2s) */}
      {showCtaCard && (() => {
        const spr = makeSpring(4446);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.9, 1.0])})`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 28,
                padding: '28px 40px',
                border: '2.5px solid #38BDF8',
                boxShadow: '0 0 60px rgba(56, 189, 248, 0.5), 0 25px 80px rgba(0, 0, 0, 0.9)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: '#38BDF8', letterSpacing: 2, textTransform: 'uppercase' }}>
                HÀNH ĐỘNG NGAY HÔM NAY 🚀
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                COMMENT "EMAIL" DƯỚI VIDEO NÀY
              </div>
              <div style={{ color: '#94A3B8', fontSize: 18, marginTop: 8 }}>
                Để hẹn lịch Mock Interview & Đánh giá chi tiết lộ trình BA phù hợp nhất dành cho bạn!
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── 3. SUBTLE CINEMATIC FLASH TRANSITION (Only at major visual cutaways) ─── */}
      {isCutawayEntry && (
        <AbsoluteFill
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.22)',
            zIndex: 45,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ─── 4. SUBTLE & NATURAL AUDIO PIPELINE ─── */}
      {/* Gentle Ambient Lofi BGM (Kept soft so voice is crisp) */}
      <Audio src={staticFile('library/music/clips/lofi-warm.mp3')} volume={0.05} loop />

      {/* Organic, Subtle Documentary Sound Effects (Gentle volumes: 0.15 - 0.22) */}
      {/* Beat 1: Review Modal */}
      <Sequence from={24} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.20} /></Sequence>
      <Sequence from={45} durationInFrames={30}><Audio src={staticFile('sfx/impact-soft.wav')} volume={0.22} /></Sequence>

      {/* Beat 2: Jira Board & BPMN */}
      <Sequence from={294} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-soft.wav')} volume={0.16} /></Sequence>
      <Sequence from={300} durationInFrames={60}><Audio src={staticFile('sfx/keys-typing-soft.wav')} volume={0.18} /></Sequence>

      {/* Beat 3: The Fatal Question */}
      <Sequence from={594} durationInFrames={30}><Audio src={staticFile('sfx/impact-soft.wav')} volume={0.20} /></Sequence>

      {/* Beat 4: Comparison Card */}
      <Sequence from={846} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.18} /></Sequence>

      {/* Beat 6: Mic Analogy */}
      <Sequence from={1320} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>

      {/* Beat 8: Root Cause */}
      <Sequence from={1710} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.20} /></Sequence>

      {/* Beat 10: Definition of BA */}
      <Sequence from={2235} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.20} /></Sequence>

      {/* Beat 12: AI Era */}
      <Sequence from={2520} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.16} /></Sequence>

      {/* Beat 17: Interview Master Pillars */}
      <Sequence from={3465} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>

      {/* Beat 19: CTA */}
      <Sequence from={4446} durationInFrames={30}><Audio src={staticFile('sfx/sparkle-soft.wav')} volume={0.22} /></Sequence>

      {/* ─── 5. KINETIC WORD-BY-WORD POP SUBTITLE PILL (100% ACCURATE TO SPEECH) ─── */}
      {activeSub && (() => {
        const subDuration = Math.max(0.1, activeSub.e - activeSub.s);
        const progress = Math.max(0, Math.min(1, (currentTime - activeSub.s) / subDuration));
        const words = activeSub.text.split(' ');
        const activeWordIndex = Math.min(words.length - 1, Math.floor(progress * words.length));

        return (
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              left: 40,
              right: 40,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                background: 'rgba(11, 17, 33, 0.95)',
                padding: '18px 28px',
                borderRadius: 24,
                border: '1px solid rgba(255, 255, 255, 0.16)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.75)',
                textAlign: 'center',
                maxWidth: 980,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '8px 12px',
              }}
            >
              {words.map((w, idx) => {
                const isCurrent = idx === activeWordIndex;
                const isPast = idx < activeWordIndex;
                return (
                  <span
                    key={idx}
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 32,
                      fontWeight: isCurrent ? 900 : 700,
                      color: isCurrent ? '#38BDF8' : isPast ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                      transform: isCurrent ? 'scale(1.14)' : 'scale(1.0)',
                      textShadow: isCurrent ? '0 0 16px rgba(56, 189, 248, 0.8)' : 'none',
                      display: 'inline-block',
                    }}
                  >
                    {w}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};

export default BaInterviewEditorialMaster;
