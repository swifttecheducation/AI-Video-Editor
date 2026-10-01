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
  id: 'LifeFirstBusinessMaster',
  durationInSeconds: 116.32,
  fps: 30,
  width: 1080,
  height: 1920,
};

// 100% Exact word-for-word transcript from master audio
const SUBTITLES = [
  // 1. Hook (0.00s - 5.60s)
  { s: 0.00, e: 5.60, text: 'Mình muốn kiếm tiền từ việc kinh doanh, nhưng mình không muốn việc kinh doanh nuốt mất cái cuộc sống của mình.' },
  
  // 2. Intro (6.00s - 10.96s)
  { s: 6.00, e: 10.96, text: 'Mình là Sia, mẹ của một nhóc 2 tuổi và đang có một cái solo business siêu nhỏ.' },
  
  // 3. Series Intro (12.00s - 17.38s)
  { s: 12.00, e: 17.38, text: 'Và đây là tập 3 của Live First Business xây dựng một cái mô hình kinh doanh từ cuộc sống mà mình mong muốn trước.' },
  
  // 4. Practical Question (18.28s - 24.58s)
  { s: 18.28, e: 20.30, text: 'Tập này nói chuyện thực tế hơn nhé.' },
  { s: 20.74, e: 24.58, text: 'Mình có thể kiếm tiền từ chuyên môn của bản thân bằng những cách nào?' },
  
  // 5. Method 1: Tư vấn 1-1 (25.84s - 32.72s)
  { s: 25.84, e: 28.50, text: 'Một, tư vấn 1-1.' },
  { s: 28.50, e: 32.72, text: 'Nếu bạn đã có chuyên môn đủ sâu để có thể giải quyết một vấn đề cụ thể cho khách hàng thì đây có lẽ là cách nhanh nhất.' },
  
  // 6. Method 2: Dịch vụ đóng gói (33.60s - 40.00s)
  { s: 33.60, e: 35.50, text: 'Hai, dịch vụ đóng gói.' },
  { s: 35.74, e: 40.00, text: 'Một vấn đề rõ, một phạm vi rõ, làm xong thì bàn giao và kết thúc.' },
  
  // 7. Method 3: Lớp học nhỏ / Workshop (40.24s - 48.00s)
  { s: 40.24, e: 43.50, text: 'Ba, workshop hoặc là một cái lớp học nhỏ.' },
  { s: 43.50, e: 48.00, text: 'Một cái điều mà bạn thường xuyên phải giải thích cho khách hàng, cho bạn bè có thể sẽ trở thành buổi học mà rất nhiều người muốn học từ bạn.' },
  
  // 8. Method 4: Sản phẩm số (48.96s - 61.12s)
  { s: 48.96, e: 51.50, text: 'Bốn, sản phẩm số.' },
  { s: 51.50, e: 56.00, text: 'Template này, ebook này, bộ hướng dẫn này.' },
  { s: 56.00, e: 61.12, text: 'Tất cả đều có thể trở thành một sản phẩm mà bạn đóng gói một lần và bán nhiều lần.' },
  
  // 9. Realization (62.06s - 65.50s)
  { s: 62.06, e: 65.50, text: 'Nhưng thật ra ấy, bạn cũng không nhất thiết phải mở business ngay.' },
  
  // 10. Alternative (66.24s - 80.76s)
  { s: 66.24, e: 70.20, text: 'Remote work, freelance hay là công việc online part-time.' },
  { s: 70.76, e: 72.80, text: 'Cũng có thể là điểm bắt đầu.' },
  { s: 73.16, e: 76.80, text: 'Đôi khi chỉ cần một công việc mà cho bạn nhiều cái quyền chủ động hơn,' },
  { s: 77.16, e: 80.76, text: 'đã là một cái thay đổi rất lớn để tiến gần tới với Live First Business rồi.' },
  
  // 11. Advice for Busy Parents (81.38s - 94.94s)
  { s: 81.38, e: 85.00, text: 'Và mình không nghĩ là các bạn sẽ cần phải làm tất cả những cái điều này.' },
  { s: 85.34, e: 88.50, text: 'Nếu đang có con nhỏ và cái quỹ thời gian của các bạn rất là ít,' },
  { s: 88.94, e: 91.20, text: 'hãy bắt đầu từ cái việc nhỏ nhất thôi.' },
  { s: 91.56, e: 94.94, text: 'Một việc đủ nhỏ để cái skill hay cái kỹ năng của bạn hiện tại có thể làm được.' },
  
  // 12. Market Validation (96.02s - 104.28s)
  { s: 96.02, e: 104.28, text: 'Làm thì nhỏ thôi và xem xem là có ai thực sự trả tiền và có thực sự là cái cách làm để nó fit với các cái cuộc sống của bạn không?' },
  
  // 13. Call To Action (105.12s - 116.32s)
  { s: 105.12, e: 107.50, text: 'Nếu bạn cũng đang tìm một cách kiếm tiền,' },
  { s: 108.06, e: 111.00, text: 'mà không muốn cả cuộc sống phải xoay quanh công việc,' },
  { s: 111.44, e: 116.32, text: 'follow mình nhé, mình sẽ ghi lại cái hành trình mình tìm kiếm cũng như là chia sẻ lại với mọi người nha!' },
];

// 8 Formal, Highly Relevant Illustrative B-Roll Scenes (No Robots, Pure Editorial Lifestyle/Business)
interface BRollClip {
  s: number; // start in seconds
  e: number; // end in seconds
  src: string;
  tag: string;
  headline: string;
}

const BROLL_CLIPS: BRollClip[] = [
  // 1. Hook: Overwhelmed at desk vs freedom
  {
    s: 1.0,
    e: 5.2,
    src: 'library/life_first_broll/broll_life_overwhelm.jpg',
    tag: 'ÁP LỰC CÔNG VIỆC',
    headline: 'Không để kinh doanh nuốt trọn cuộc sống',
  },
  // 2. Intro: Asian mother entrepreneur at sunlit home desk
  {
    s: 6.2,
    e: 11.0,
    src: 'library/life_first_broll/broll_mom_entrepreneur.jpg',
    tag: 'SOLO BUSINESS FOUNDER',
    headline: 'Mẹ nhóc 2 tuổi • Tự do thời gian',
  },
  // 3. Method 1: 1-on-1 strategy video consultation
  {
    s: 26.5,
    e: 32.5,
    src: 'library/life_first_broll/broll_consulting_1on1.jpg',
    tag: 'MÔ HÌNH 01',
    headline: 'Tư vấn 1-1 chuyên sâu cho khách hàng',
  },
  // 4. Method 2: Productized service scope & deliverables
  {
    s: 34.5,
    e: 39.8,
    src: 'library/life_first_broll/broll_productized_service.jpg',
    tag: 'MÔ HÌNH 02',
    headline: 'Dịch vụ đóng gói • 1 phạm vi rõ ràng',
  },
  // 5. Method 3: Micro-workshop / cohort class
  {
    s: 41.5,
    e: 47.8,
    src: 'library/life_first_broll/broll_micro_workshop.jpg',
    tag: 'MÔ HÌNH 03',
    headline: 'Micro-Workshop • Lớp học chuyên sâu nhỏ',
  },
  // 6. Method 4: Digital products (Templates, Notion, Ebooks)
  {
    s: 50.5,
    e: 59.5,
    src: 'library/life_first_broll/broll_digital_products.jpg',
    tag: 'MÔ HÌNH 04',
    headline: 'Sản phẩm số • Đóng gói 1 lần, bán nhiều lần',
  },
  // 7. Alternative: Flexible remote work & cafe terrace
  {
    s: 67.5,
    e: 76.5,
    src: 'library/life_first_broll/broll_remote_work.jpg',
    tag: 'BƯỚC ĐỆM',
    headline: 'Remote Work • Freelance linh hoạt tự chủ',
  },
  // 8. Advice: Minimalist desk, small steps & tea
  {
    s: 85.5,
    e: 93.5,
    src: 'library/life_first_broll/broll_small_steps.jpg',
    tag: 'LỜI KHUYÊN',
    headline: 'Bắt đầu từ việc nhỏ nhất vừa sức',
  },
];

export const LifeFirstBusinessMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Active Subtitle
  const activeSub = SUBTITLES.find((s) => currentTime >= s.s && currentTime <= s.e);

  // 1. Natural Handheld Camera Drift
  const driftX = Math.sin(frame / 38) * 3;
  const driftY = Math.cos(frame / 48) * 2;
  const driftRotate = Math.sin(frame / 60) * 0.15;

  // 2. Editorial Multi-Cam Punch-Ins (Dynamic zoom at key storytelling beats)
  let baseZoom = 1.0;
  if (currentTime >= 0.0 && currentTime < 5.6) {
    baseZoom = 1.06; // Hook punch
  } else if (currentTime >= 20.74 && currentTime < 24.58) {
    baseZoom = 1.10; // Question punch
  } else if (currentTime >= 62.06 && currentTime < 65.5) {
    baseZoom = 1.08; // Honest pivot
  } else if (currentTime >= 88.94 && currentTime < 94.94) {
    baseZoom = 1.09; // Advice punch
  } else if (currentTime >= 111.44) {
    baseZoom = 1.12; // Final CTA punch
  }

  const makeSpring = (startFrame: number, damping = 16, stiffness = 140) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping, stiffness, mass: 0.8 },
    });
  };

  // Triggers for Formal & Lively Illustrative Editorial Overlays
  const showHookCard = currentTime >= 0.6 && currentTime <= 5.2;
  const showBioPill = currentTime >= 6.2 && currentTime <= 11.2;
  const showEp3Banner = currentTime >= 12.2 && currentTime <= 17.0;
  const showQuestionCard = currentTime >= 19.5 && currentTime <= 24.5;
  const showMethod1 = currentTime >= 26.0 && currentTime <= 32.5;
  const showMethod2 = currentTime >= 34.0 && currentTime <= 39.8;
  const showMethod3 = currentTime >= 41.0 && currentTime <= 47.8;
  const showMethod4 = currentTime >= 49.5 && currentTime <= 60.8;
  const showPivotCard = currentTime >= 62.2 && currentTime <= 65.5;
  const showRemoteCard = currentTime >= 67.0 && currentTime <= 80.5;
  const showParentAdvice = currentTime >= 83.0 && currentTime <= 94.8;
  const showValidationRule = currentTime >= 96.5 && currentTime <= 104.0;
  const showCtaFollow = currentTime >= 106.0 && currentTime <= 116.0;

  // Very subtle white flash entry on major shifts
  const isCutawayEntry =
    (frame >= 18 && frame <= 21) ||
    (frame >= 360 && frame <= 363) ||
    (frame >= 780 && frame <= 783) ||
    (frame >= 1485 && frame <= 1488) ||
    (frame >= 1860 && frame <= 1863) ||
    (frame >= 3180 && frame <= 3183);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B1120', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* ─── 1. MASTER VIDEO FOOTAGE (PROPERLY TONEMAPPED & NATURALLY GRADED) ─── */}
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
            src={staticFile('projects/life-first-business/master.mp4')}
            volume={1.0}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Clean subtle bottom gradient for subtitle legibility without darkening face */}
          <AbsoluteFill
            style={{
              background:
                'linear-gradient(to top, rgba(11, 17, 32, 0.70) 0%, rgba(11, 17, 32, 0) 28%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ─── 1.5 DYNAMIC FORMAL B-ROLL CUTAWAYS (LIVELY EDITORIAL B-ROLL) ─── */}
      {BROLL_CLIPS.map((clip, idx) => {
        const startFrame = Math.round(clip.s * fps);
        const endFrame = Math.round(clip.e * fps);
        if (frame < startFrame || frame > endFrame) return null;

        const dur = endFrame - startFrame;
        const progress = (frame - startFrame) / Math.max(1, dur);

        // Smooth crossfade entry and exit
        const opacity = interpolate(
          frame,
          [startFrame, startFrame + 6, endFrame - 6, endFrame],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        // Subtle Ken Burns slow push-in
        const scale = interpolate(progress, [0, 1], [1.0, 1.08]);
        const translateY = interpolate(progress, [0, 1], [0, -12]);

        return (
          <AbsoluteFill
            key={idx}
            style={{
              zIndex: 20,
              opacity,
              overflow: 'hidden',
              backgroundColor: '#0B1120',
            }}
          >
            {/* The B-Roll Image */}
            <Img
              src={staticFile(clip.src)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: 'center center',
              }}
            />

            {/* Cinematic gradient overlays for badges and subtitles */}
            <AbsoluteFill
              style={{
                background:
                  'linear-gradient(to bottom, rgba(11, 17, 32, 0.80) 0%, rgba(11, 17, 32, 0) 22%, rgba(11, 17, 32, 0) 65%, rgba(11, 17, 32, 0.85) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Formal Editorial B-Roll Tag */}
            <div
              style={{
                position: 'absolute',
                top: 75,
                left: 50,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 20,
                padding: '8px 18px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 10px #10B981',
                }}
              />
              <span
                style={{
                  color: '#CBD5E1',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                MINH HỌA • {clip.tag}
              </span>
            </div>
          </AbsoluteFill>
        );
      })}

      {/* ─── 2. FORMAL & LIVELY ILLUSTRATIVE EDITORIAL OVERLAYS ─── */}

      {/* BEAT 1: THE CORE HOOK CONTRAST (0.6s - 5.2s) */}
      {showHookCard && (() => {
        const spr = makeSpring(18);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -25}px) scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 28,
                padding: '26px 32px',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 800, letterSpacing: 1.5 }}>
                  TRIẾT LÝ LIFE-FIRST 🌿
                </span>
                <span style={{ color: '#94A3B8', fontSize: 14, fontWeight: 700 }}>BÀI TOÁN CÂN BẰNG</span>
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 900, marginTop: 10, lineHeight: 1.35 }}>
                Kiếm tiền từ kinh doanh — Nhưng KHÔNG để kinh doanh nuốt chửng cuộc sống!
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', padding: '6px 14px', borderRadius: 16, fontSize: 14, fontWeight: 700 }}>
                  ✕ Kiệt sức & Mất thời gian
                </span>
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '6px 14px', borderRadius: 16, fontSize: 14, fontWeight: 700 }}>
                  ✓ Tự do & Bền vững
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 2: SIA SPEAKER BIO PILL (6.2s - 11.2s) */}
      {showBioPill && (() => {
        const spr = makeSpring(186);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 50,
              transform: `translateX(${(1 - spr) * -50}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderRadius: 24,
                padding: '16px 26px',
                border: '1.5px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981 0%, #0284C7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: 20,
                  boxShadow: '0 0 16px rgba(16, 185, 129, 0.5)',
                }}
              >
                S
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 20 }}>Sia • Solo Business Founder</div>
                <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 2, fontWeight: 600 }}>Mẹ nhóc 2 tuổi • Tự do thời gian</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 3: SERIES EPISODE BADGE (12.2s - 17.0s) */}
      {showEp3Banner && (() => {
        const spr = makeSpring(366);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 26,
                padding: '24px 30px',
                border: '1.5px solid #F59E0B',
                boxShadow: '0 0 50px rgba(245, 158, 11, 0.35), 0 20px 60px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#F59E0B', fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>
                SERIES: LIFE-FIRST BUSINESS • TẬP 03
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 24, marginTop: 8 }}>
                Xây dựng mô hình kinh doanh từ cuộc sống mong muốn trước
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 15, marginTop: 8 }}>
                ➔ Định hình phong cách sống trước, chọn mô hình công việc sau.
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 4: QUESTION SPOTLIGHT (19.5s - 24.5s) */}
      {showQuestionCard && (() => {
        const spr = makeSpring(585);
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
                padding: '26px 34px',
                border: '2px solid rgba(56, 189, 248, 0.65)',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.4), 0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#38BDF8', fontWeight: 900, fontSize: 15, letterSpacing: 2 }}>
                BÀI TOÁN THỰC TẾ 💡
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 28, marginTop: 8, lineHeight: 1.35 }}>
                "Kiếm tiền từ chuyên môn của bản thân bằng những cách nào?"
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 5: METHOD 1 - TƯ VẤN 1-1 (26.0s - 32.5s) */}
      {showMethod1 && (() => {
        const spr = makeSpring(780);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 30px',
                border: '1.5px solid #38BDF8',
                boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: '#0284C7', color: '#FFF', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 900 }}>
                  CÁCH 01
                </span>
                <span style={{ color: '#38BDF8', fontSize: 18, fontWeight: 900 }}>TƯ VẤN 1-1 (1-on-1 Consulting)</span>
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#F1F5F9', fontSize: 17, fontWeight: 700 }}>
                  <span style={{ color: '#10B981' }}>✓</span> Chuyên môn đủ sâu giải quyết 1 vấn đề cụ thể
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#F1F5F9', fontSize: 17, fontWeight: 700 }}>
                  <span style={{ color: '#10B981' }}>✓</span> Cách tạo ra doanh thu và kiểm chứng NHANH NHẤT
                </div>
              </div>
              <div style={{ marginTop: 12, background: 'rgba(56, 189, 248, 0.12)', borderRadius: 12, padding: '8px 14px', color: '#93C5FD', fontSize: 14 }}>
                Phù hợp: Chuyên gia, mentor, cố vấn chiến lược
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 6: METHOD 2 - DỊCH VỤ ĐÓNG GÓI (34.0s - 39.8s) */}
      {showMethod2 && (() => {
        const spr = makeSpring(1020);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 30px',
                border: '1.5px solid #10B981',
                boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: '#059669', color: '#FFF', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 900 }}>
                  CÁCH 02
                </span>
                <span style={{ color: '#10B981', fontSize: 18, fontWeight: 900 }}>DỊCH VỤ ĐÓNG GÓI (Productized Service)</span>
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#F1F5F9', fontSize: 17, fontWeight: 700 }}>
                  <span style={{ color: '#10B981' }}>✓</span> 1 Vấn đề rõ ràng • 1 Phạm vi (Scope) xác định
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#F1F5F9', fontSize: 17, fontWeight: 700 }}>
                  <span style={{ color: '#10B981' }}>✓</span> Làm xong là BÀN GIAO & KẾT THÚC (Không kéo dài)
                </div>
              </div>
              <div style={{ marginTop: 12, background: 'rgba(16, 185, 129, 0.12)', borderRadius: 12, padding: '8px 14px', color: '#6EE7B7', fontSize: 14 }}>
                Tránh bẫy làm thêm việc không tên, kiểm soát 100% thời gian
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 7: METHOD 3 - LỚP HỌC NHỎ / WORKSHOP (41.0s - 47.8s) */}
      {showMethod3 && (() => {
        const spr = makeSpring(1230);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 30px',
                border: '1.5px solid #F59E0B',
                boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: '#D97706', color: '#FFF', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 900 }}>
                  CÁCH 03
                </span>
                <span style={{ color: '#F59E0B', fontSize: 18, fontWeight: 900 }}>MICRO-WORKSHOP / LỚP HỌC NHỎ</span>
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 800, marginTop: 12 }}>
                Đóng gói kiến thức bạn thường xuyên phải giải thích
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 16, marginTop: 8, lineHeight: 1.4 }}>
                ➔ Biến những câu hỏi lặp đi lặp lại từ khách hàng/bạn bè thành buổi học chuyên sâu có nhiều người sẵn sàng trả phí!
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 8: METHOD 4 - SẢN PHẨM SỐ (49.5s - 60.8s) */}
      {showMethod4 && (() => {
        const spr = makeSpring(1485);
        return (
          <div
            style={{
              position: 'absolute',
              top: 125,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 30px',
                border: '1.5px solid #A855F7',
                boxShadow: '0 0 50px rgba(168, 85, 247, 0.35), 0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: '#7C3AED', color: '#FFF', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 900 }}>
                  CÁCH 04
                </span>
                <span style={{ color: '#A855F7', fontSize: 18, fontWeight: 900 }}>SẢN PHẨM SỐ (Digital Products)</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#F1F5F9', padding: '6px 14px', borderRadius: 16, fontSize: 15, fontWeight: 700 }}>
                  📄 Templates
                </span>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#F1F5F9', padding: '6px 14px', borderRadius: 16, fontSize: 15, fontWeight: 700 }}>
                  📚 Ebooks
                </span>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#F1F5F9', padding: '6px 14px', borderRadius: 16, fontSize: 15, fontWeight: 700 }}>
                  🛠️ Bộ Hướng Dẫn Thực Chiến
                </span>
              </div>
              <div style={{ marginTop: 14, background: 'rgba(168, 85, 247, 0.15)', borderRadius: 14, padding: '10px 16px', color: '#E9D5FF', fontSize: 16, fontWeight: 800 }}>
                💡 ĐÓNG GÓI 1 LẦN ➔ BÁN NHIỀU LẦN (Khả năng mở rộng không giới hạn)
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 9: HONEST PIVOT (62.2s - 65.5s) */}
      {showPivotCard && (() => {
        const spr = makeSpring(1866);
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
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 24,
                padding: '24px 32px',
                border: '1.5px solid rgba(250, 204, 21, 0.7)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#FACC15', fontWeight: 900, fontSize: 15, letterSpacing: 2 }}>
                LỜI KHUYÊN GIẢM ÁP LỰC 💡
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 26, marginTop: 8 }}>
                "Bạn không nhất thiết phải mở business ngay!"
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 10: ALTERNATIVE STEPPING STONES (67.0s - 80.5s) */}
      {showRemoteCard && (() => {
        const spr = makeSpring(2010);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 30px',
                border: '1.5px solid #38BDF8',
                boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#38BDF8', fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>
                BƯỚC ĐỆM BỀN VỮNG
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 22, marginTop: 6 }}>
                Remote Work • Freelance • Online Part-Time
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10, color: '#E2E8F0', fontSize: 16 }}>
                <div>• Chỉ cần công việc cho bạn <strong>nhiều quyền chủ động hơn</strong></div>
                <div>• Đã là bước chuyển dịch lớn để tiến tới <strong>Life-First Business</strong>!</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 11: ADVICE FOR BUSY PARENTS (83.0s - 94.8s) */}
      {showParentAdvice && (() => {
        const spr = makeSpring(2490);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 32px',
                border: '1.5px solid #10B981',
                boxShadow: '0 0 50px rgba(16, 185, 129, 0.35), 0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#10B981', fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>
                LỜI KHUYÊN CHO NGƯỜI CÓ CON NHỎ & ÍT THỜI GIAN 👶
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 24, marginTop: 8 }}>
                Hãy bắt đầu từ việc NHỎ NHẤT!
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 16, marginTop: 8, lineHeight: 1.4 }}>
                Một việc đủ nhỏ để kỹ năng hiện tại làm được, không ôm đồm, không gây kiệt sức.
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 12: MARKET VALIDATION RULE (96.5s - 104.0s) */}
      {showValidationRule && (() => {
        const spr = makeSpring(2895);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                borderRadius: 26,
                padding: '24px 32px',
                border: '2px solid #F59E0B',
                boxShadow: '0 0 50px rgba(245, 158, 11, 0.35), 0 25px 70px rgba(0,0,0,0.85)',
              }}
            >
              <div style={{ color: '#F59E0B', fontWeight: 900, fontSize: 15, letterSpacing: 2 }}>
                2 TIÊU CHÍ KIỂM CHỨNG THỰC TẾ ⚖️
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 16px', color: '#FFFFFF', fontSize: 16, fontWeight: 700 }}>
                  1. Có ai thực sự trả tiền không? (Nhu cầu thị trường)
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', borderRadius: 12, padding: '10px 16px', color: '#10B981', fontSize: 16, fontWeight: 800 }}>
                  2. Cách làm đó có FIT với cuộc sống của bạn không?
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 13: CALL TO ACTION (106.0s - 116.0s) */}
      {showCtaFollow && (() => {
        const spr = makeSpring(3180);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.98)',
                borderRadius: 28,
                padding: '28px 36px',
                border: '2.5px solid #10B981',
                boxShadow: '0 0 60px rgba(16, 185, 129, 0.5), 0 25px 80px rgba(0, 0, 0, 0.9)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 900, color: '#10B981', letterSpacing: 2, textTransform: 'uppercase' }}>
                ĐỒNG HÀNH CÙNG SIA 🌿
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                FOLLOW ĐỂ THEO DÕI HÀNH TRÌNH
              </div>
              <div style={{ color: '#94A3B8', fontSize: 17, marginTop: 8 }}>
                Cùng nhau tìm kiếm và xây dựng mô hình Life-First Business bền vững!
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── 3. SUBTLE FLASH TRANSITION AT MAJOR BEATS ─── */}
      {isCutawayEntry && (
        <AbsoluteFill
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.20)',
            zIndex: 45,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ─── 4. NATURAL & SUBTLE AUDIO PIPELINE ─── */}
      {/* Warm Ambient Lofi Background Music */}
      <Audio src={staticFile('library/music/clips/lofi-warm.mp3')} volume={0.05} loop />

      {/* Gentle & Organic SFX at Section Entries (Volume 0.16 - 0.20) */}
      <Sequence from={18} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.20} /></Sequence>
      <Sequence from={186} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
      <Sequence from={366} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
      <Sequence from={585} durationInFrames={30}><Audio src={staticFile('sfx/impact-soft.wav')} volume={0.18} /></Sequence>
      <Sequence from={780} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.18} /></Sequence>
      <Sequence from={1020} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.18} /></Sequence>
      <Sequence from={1230} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
      <Sequence from={1485} durationInFrames={30}><Audio src={staticFile('sfx/sparkle-soft.wav')} volume={0.20} /></Sequence>
      <Sequence from={1866} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
      <Sequence from={2010} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-soft.wav')} volume={0.16} /></Sequence>
      <Sequence from={2490} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
      <Sequence from={2895} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
      <Sequence from={3180} durationInFrames={30}><Audio src={staticFile('sfx/sparkle-soft.wav')} volume={0.22} /></Sequence>

      {/* ─── 5. KINETIC WORD-BY-WORD POP SUBTITLE PILL (100% ACCURATE) ─── */}
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
                      color: isCurrent ? '#10B981' : isPast ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                      transform: isCurrent ? 'scale(1.14)' : 'scale(1.0)',
                      textShadow: isCurrent ? '0 0 16px rgba(16, 185, 129, 0.8)' : 'none',
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

export default LifeFirstBusinessMaster;
