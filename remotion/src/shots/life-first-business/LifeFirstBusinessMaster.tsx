import React from 'react';
import {
  AbsoluteFill,
  Video,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { FONT_DISPLAY, FONT_BODY, FONT_HANDWRITING } from '../../fonts';

export const compositionConfig = {
  id: 'LifeFirstBusinessMaster',
  durationInSeconds: 116.32,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Brand Guide Palette
const BRAND = {
  wine: '#720000',
  wineDark: '#38060A',
  wineDeep: '#200204',
  olive: '#798466',
  oliveDark: '#4D583F',
  oliveLight: '#94A080',
  ivory: '#F8F5F2',
  beige: '#D4CABE',
  beigeSoft: '#EBE5DC',
  gold: '#C29B38',
  white: '#FFFFFF',
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

export interface LifeFirstBusinessMasterProps {
  enableBRoll?: boolean;
  visualMode?: 'broll' | 'text_only' | 'pip';
  activeBRollIds?: number[];
  enableSFX?: boolean;
  enableBGM?: boolean;
}

export const LifeFirstBusinessMaster: React.FC<LifeFirstBusinessMasterProps> = ({
  enableBRoll = false,
  visualMode = 'text_only',
  enableSFX = true,
  enableBGM = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Active Subtitle
  const activeSub = SUBTITLES.find((s) => currentTime >= s.s && currentTime <= s.e);

  // 1. Organic Natural Handheld Drift
  const driftX = Math.sin(frame / 42) * 2.5;
  const driftY = Math.cos(frame / 52) * 1.8;
  const driftRotate = Math.sin(frame / 65) * 0.12;

  // 2. Punch-Ins on storytelling turns
  let baseZoom = 1.0;
  if (currentTime >= 0.0 && currentTime < 5.6) {
    baseZoom = 1.05; // Hook punch
  } else if (currentTime >= 20.74 && currentTime < 24.58) {
    baseZoom = 1.08; // Question punch
  } else if (currentTime >= 62.06 && currentTime < 65.5) {
    baseZoom = 1.07; // Honest pivot
  } else if (currentTime >= 88.94 && currentTime < 94.94) {
    baseZoom = 1.08; // Advice punch
  } else if (currentTime >= 111.44) {
    baseZoom = 1.10; // Final CTA punch
  }

  const makeSpring = (startFrame: number, damping = 16, stiffness = 140) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping, stiffness, mass: 0.8 },
    });
  };

  // 13 Beat Timings mapped exactly to speech and hand gestures
  const showHookCard = currentTime >= 0.6 && currentTime <= 5.2;
  const showBioPill = currentTime >= 6.2 && currentTime <= 11.2;
  const showEp3Banner = currentTime >= 12.2 && currentTime <= 17.0;
  const showQuestionCard = currentTime >= 19.2 && currentTime <= 24.5;
  const showMethod1 = currentTime >= 25.8 && currentTime <= 32.5;
  const showMethod2 = currentTime >= 33.6 && currentTime <= 39.8;
  const showMethod3 = currentTime >= 40.5 && currentTime <= 47.8;
  const showMethod4 = currentTime >= 49.2 && currentTime <= 60.8;
  const showPivotCard = currentTime >= 62.2 && currentTime <= 65.5;
  const showRemoteCard = currentTime >= 66.8 && currentTime <= 80.5;
  const showParentAdvice = currentTime >= 83.0 && currentTime <= 94.8;
  const showValidationRule = currentTime >= 96.5 && currentTime <= 104.0;
  const showCtaFollow = currentTime >= 106.0 && currentTime <= 116.0;

  // Flash transition at beat shifts
  const isFlash =
    (frame >= 18 && frame <= 20) ||
    (frame >= 366 && frame <= 368) ||
    (frame >= 775 && frame <= 777) ||
    (frame >= 1010 && frame <= 1012) ||
    (frame >= 1475 && frame <= 1477) ||
    (frame >= 1866 && frame <= 1868) ||
    (frame >= 3180 && frame <= 3182);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.wineDark, overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* ─── 1. MASTER VIDEO FOOTAGE (100% TALKING HEAD FOR YAPPING) ─── */}
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

          {/* Vignette & Soft Gradient for Text Readability without Darkening Skin */}
          <AbsoluteFill
            style={{
              background:
                'linear-gradient(to top, rgba(32, 2, 4, 0.75) 0%, rgba(32, 2, 4, 0) 30%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ─── 2. 13 GESTURE-SYNCED BRAND GRAPHIC OVERLAYS ─── */}

      {/* BEAT 1: HOOK (0.6s - 5.2s) — Hai bàn tay cân bằng */}
      {showHookCard && (() => {
        const spr = makeSpring(18);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -25}px) scale(${interpolate(spr, [0, 1], [0.94, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: BRAND.ivory,
                borderRadius: 28,
                padding: '26px 32px',
                border: `2px solid ${BRAND.wine}`,
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    background: BRAND.wine,
                    color: BRAND.ivory,
                    padding: '4px 14px',
                    borderRadius: 20,
                    fontFamily: FONT_BODY,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                  }}
                >
                  LIFE-FIRST BUSINESS 🌿
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.olive, fontSize: 24, fontWeight: 700 }}>
                  bài toán cân bằng ~
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.wine,
                  fontSize: 27,
                  fontWeight: 800,
                  marginTop: 10,
                  lineHeight: 1.3,
                }}
              >
                Kiếm tiền từ kinh doanh ≠ Nuốt mất cuộc sống
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                <span
                  style={{
                    background: 'rgba(114, 0, 0, 0.10)',
                    color: BRAND.wine,
                    border: `1px solid ${BRAND.wine}`,
                    padding: '6px 14px',
                    borderRadius: 16,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  ✕ Kiệt sức & Mất thời gian
                </span>
                <span
                  style={{
                    background: BRAND.olive,
                    color: BRAND.ivory,
                    padding: '6px 14px',
                    borderRadius: 16,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  ✓ Tự do & Bền vững
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 2: BIO PILL (6.2s - 11.2s) — Giới thiệu bản thân */}
      {showBioPill && (() => {
        const spr = makeSpring(186);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 45,
              transform: `translateX(${(1 - spr) * -40}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: BRAND.ivory,
                borderRadius: 24,
                padding: '16px 26px',
                border: `2px solid ${BRAND.olive}`,
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${BRAND.wine} 0%, ${BRAND.olive} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: BRAND.ivory,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 24,
                  boxShadow: `0 4px 14px rgba(114, 0, 0, 0.4)`,
                }}
              >
                S
              </div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, color: BRAND.wine, fontWeight: 800, fontSize: 22 }}>
                  Sia • Solo Business Founder
                </div>
                <div style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 20, marginTop: 2, fontWeight: 700 }}>
                  Mẹ nhóc 2 tuổi & sống chậm ✨
                </div>
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
              top: 130,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.93, 1.0])})`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: BRAND.wine,
                borderRadius: 26,
                padding: '24px 30px',
                border: `2px solid ${BRAND.gold}`,
                boxShadow: `0 0 40px rgba(194, 155, 56, 0.35), 0 20px 50px rgba(0,0,0,0.65)`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.gold, fontWeight: 800, fontSize: 13, letterSpacing: 2 }}>
                  SERIES: LIFE-FIRST BUSINESS
                </span>
                <span
                  style={{
                    background: BRAND.gold,
                    color: BRAND.wineDark,
                    padding: '3px 10px',
                    borderRadius: 12,
                    fontWeight: 900,
                    fontSize: 12,
                  }}
                >
                  TẬP 03
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.ivory,
                  fontSize: 25,
                  fontWeight: 800,
                  marginTop: 8,
                  lineHeight: 1.35,
                }}
              >
                Xây dựng mô hình từ cuộc sống mong muốn trước!
              </div>
              <div style={{ fontFamily: FONT_HANDWRITING, color: BRAND.beigeSoft, fontSize: 22, marginTop: 6 }}>
                ~ Bắt đầu từ lối sống, không phải ngược lại ~
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 4: PRACTICAL QUESTION (19.2s - 24.5s) — Nghiêng đầu, đặt câu hỏi */}
      {showQuestionCard && (() => {
        const spr = makeSpring(576);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: BRAND.ivory,
                borderRadius: 26,
                padding: '26px 34px',
                border: `2px solid ${BRAND.wine}`,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.wine, fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>
                  BÀI TOÁN THỰC TẾ 💡
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.olive, fontSize: 22 }}>
                  nói chuyện thực tế nhé...
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.wineDark,
                  fontWeight: 800,
                  fontSize: 26,
                  marginTop: 8,
                  lineHeight: 1.35,
                }}
              >
                "Kiếm tiền từ chuyên môn của bản thân bằng những cách nào?"
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 5: METHOD 1 — TƯ VẤN 1-1 (25.8s - 32.5s) — Giơ 1 ngón tay ☝️ */}
      {showMethod1 && (() => {
        const spr = makeSpring(775);
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
                background: BRAND.ivory,
                borderRadius: 26,
                padding: '24px 30px',
                border: `2px solid ${BRAND.wine}`,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      background: BRAND.wine,
                      color: BRAND.ivory,
                      padding: '4px 12px',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    CÁCH 01
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wine, fontSize: 22, fontWeight: 800 }}>
                    TƯ VẤN 1:1
                  </span>
                </div>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 22, fontWeight: 700 }}>
                  cách nhanh nhất ⚡
                </span>
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ color: BRAND.wineDark, fontSize: 17, fontWeight: 700 }}>
                  <span style={{ color: BRAND.olive, fontWeight: 900 }}>✓</span> Chuyên môn đủ sâu giải quyết 1 vấn đề cụ thể
                </div>
                <div style={{ color: BRAND.wineDark, fontSize: 17, fontWeight: 700 }}>
                  <span style={{ color: BRAND.olive, fontWeight: 900 }}>✓</span> Kiểm chứng nhu cầu thị trường nhanh nhất
                </div>
              </div>
              <div
                style={{
                  marginTop: 12,
                  background: 'rgba(121, 132, 102, 0.15)',
                  borderRadius: 12,
                  padding: '8px 14px',
                  color: BRAND.oliveDark,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Phù hợp: Chuyên gia, mentor, cố vấn chiến lược
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 6: METHOD 2 — DỊCH VỤ ĐÓNG GÓI (33.6s - 39.8s) — Giơ 2 ngón tay ✌️ */}
      {showMethod2 && (() => {
        const spr = makeSpring(1008);
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
                background: BRAND.ivory,
                borderRadius: 26,
                padding: '24px 30px',
                border: `2px solid ${BRAND.olive}`,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      background: BRAND.olive,
                      color: BRAND.ivory,
                      padding: '4px 12px',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    CÁCH 02
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wineDark, fontSize: 22, fontWeight: 800 }}>
                    DỊCH VỤ ĐÓNG GÓI
                  </span>
                </div>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.wine, fontSize: 22, fontWeight: 700 }}>
                  Productized Service ~
                </span>
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '8px 14px', borderRadius: 12, fontWeight: 700, fontSize: 15 }}>
                  1 Vấn Đề Rõ
                </span>
                <span style={{ alignSelf: 'center', color: BRAND.olive, fontWeight: 900 }}>➔</span>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '8px 14px', borderRadius: 12, fontWeight: 700, fontSize: 15 }}>
                  1 Phạm Vi Rõ
                </span>
                <span style={{ alignSelf: 'center', color: BRAND.olive, fontWeight: 900 }}>➔</span>
                <span style={{ background: BRAND.wine, color: BRAND.ivory, padding: '8px 14px', borderRadius: 12, fontWeight: 800, fontSize: 15 }}>
                  Bàn Giao & Kết Thúc!
                </span>
              </div>
              <div
                style={{
                  marginTop: 12,
                  textAlign: 'center',
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.oliveDark,
                  fontSize: 20,
                }}
              >
                Tránh bẫy làm thêm việc không tên, bảo vệ quỹ thời gian gia đình
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 7: METHOD 3 — LỚP HỌC NHỎ / WORKSHOP (40.5s - 47.8s) — Giơ 3 ngón tay 🤟 */}
      {showMethod3 && (() => {
        const spr = makeSpring(1215);
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
                background: BRAND.ivory,
                borderRadius: 26,
                padding: '24px 30px',
                border: `2px solid ${BRAND.gold}`,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      background: BRAND.gold,
                      color: BRAND.wineDark,
                      padding: '4px 12px',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    CÁCH 03
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wineDark, fontSize: 22, fontWeight: 800 }}>
                    WORKSHOP / LỚP HỌC NHỎ
                  </span>
                </div>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 22 }}>
                  micro-cohort ~
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.wine,
                  fontSize: 20,
                  fontWeight: 700,
                  marginTop: 12,
                  lineHeight: 1.35,
                }}
              >
                Đóng gói điều bạn thường xuyên phải giải thích cho khách hàng & bạn bè!
              </div>
              <div style={{ color: BRAND.oliveDark, fontSize: 15, marginTop: 8, fontWeight: 600 }}>
                ➔ Trở thành buổi học chuyên sâu có nhiều người sẵn sàng trả phí.
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 8: METHOD 4 — SẢN PHẨM SỐ (49.2s - 60.8s) — Giơ 4 ngón tay ✋ */}
      {showMethod4 && (() => {
        const spr = makeSpring(1476);
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
                background: BRAND.ivory,
                borderRadius: 26,
                padding: '24px 30px',
                border: `2px solid ${BRAND.wine}`,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      background: BRAND.wine,
                      color: BRAND.ivory,
                      padding: '4px 12px',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    CÁCH 04
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wine, fontSize: 22, fontWeight: 800 }}>
                    SẢN PHẨM SỐ (Digital Products)
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 14px', borderRadius: 14, fontSize: 14, fontWeight: 700 }}>
                  📄 Templates
                </span>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 14px', borderRadius: 14, fontSize: 14, fontWeight: 700 }}>
                  📚 Ebooks
                </span>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 14px', borderRadius: 14, fontSize: 14, fontWeight: 700 }}>
                  🛠️ Bộ Hướng Dẫn
                </span>
              </div>
              <div
                style={{
                  marginTop: 14,
                  background: BRAND.wine,
                  borderRadius: 14,
                  padding: '10px 16px',
                  color: BRAND.ivory,
                  fontSize: 16,
                  fontWeight: 800,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>💡 ĐÓNG GÓI 1 LẦN ➔ BÁN NHIỀU LẦN</span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.gold, fontSize: 22 }}>
                  thu nhập thụ động ✨
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 9: HONEST PIVOT (62.2s - 65.5s) — Lắc tay nhẹ */}
      {showPivotCard && (() => {
        const spr = makeSpring(1866);
        return (
          <div
            style={{
              position: 'absolute',
              top: 145,
              left: 45,
              right: 45,
              transform: `translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: BRAND.ivory,
                borderRadius: 24,
                padding: '24px 32px',
                border: `2px solid ${BRAND.olive}`,
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 24, fontWeight: 700 }}>
                nhưng thật ra ấy...
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.wine,
                  fontWeight: 800,
                  fontSize: 26,
                  marginTop: 6,
                }}
              >
                "Bạn không nhất thiết phải mở business ngay!"
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 10: ALTERNATIVE STEPPING STONES (66.8s - 80.5s) — 2 tay mở rộng */}
      {showRemoteCard && (() => {
        const spr = makeSpring(2004);
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
                background: BRAND.ivory,
                borderRadius: 26,
                padding: '24px 30px',
                border: `2px solid ${BRAND.olive}`,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.oliveDark, fontWeight: 800, fontSize: 13, letterSpacing: 2 }}>
                  BƯỚC ĐỆM BỀN VỮNG
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.wine, fontSize: 22 }}>
                  linh hoạt tự chủ ~
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.wine,
                  fontWeight: 800,
                  fontSize: 23,
                  marginTop: 6,
                }}
              >
                Remote Work • Freelance • Online Part-Time
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, color: BRAND.wineDark, fontSize: 16 }}>
                <div>• Chỉ cần công việc cho bạn <strong>nhiều quyền chủ động hơn</strong></div>
                <div>• Đã là bước chuyển dịch lớn để tiến gần tới <strong>Life-First Business</strong>!</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 11: ADVICE FOR BUSY PARENTS (83.0s - 94.8s) — Tay chụm lại nhấn mạnh */}
      {showParentAdvice && (() => {
        const spr = makeSpring(2490);
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
                background: BRAND.ivory,
                borderRadius: 26,
                padding: '24px 32px',
                border: `2px solid ${BRAND.wine}`,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.wine, fontWeight: 800, fontSize: 13, letterSpacing: 1.5 }}>
                  DÀNH CHO NGƯỜI CÓ CON NHỎ & ÍT THỜI GIAN 👶
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.wineDark,
                  fontWeight: 800,
                  fontSize: 26,
                  marginTop: 8,
                }}
              >
                Hãy bắt đầu từ việc NHỎ NHẤT!
              </div>
              <div style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 24, marginTop: 6 }}>
                "Một việc đủ nhỏ để kỹ năng hiện tại làm được ngay, không gây quá tải."
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 12: MARKET VALIDATION (96.5s - 104.0s) — Chỉ ngón tay đếm 2 điều */}
      {showValidationRule && (() => {
        const spr = makeSpring(2895);
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
                background: BRAND.wine,
                borderRadius: 26,
                padding: '24px 32px',
                border: `2px solid ${BRAND.gold}`,
                boxShadow: '0 25px 60px rgba(0,0,0,0.65)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.gold, fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>
                  2 TIÊU CHÍ KIỂM CHỨNG THỰC TẾ ⚖️
                </span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 16px', color: BRAND.ivory, fontSize: 16, fontWeight: 700 }}>
                  1. Có ai thực sự trả tiền không? (Nhu cầu thật)
                </div>
                <div style={{ background: BRAND.gold, borderRadius: 12, padding: '10px 16px', color: BRAND.wineDark, fontSize: 16, fontWeight: 800 }}>
                  2. Cách làm đó có FIT với cuộc sống của bạn không?
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 13: CALL TO ACTION (106.0s - 116.0s) — Cười & vẫy tay chào */}
      {showCtaFollow && (() => {
        const spr = makeSpring(3180);
        return (
          <div
            style={{
              position: 'absolute',
              top: 125,
              left: 45,
              right: 45,
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: BRAND.ivory,
                borderRadius: 28,
                padding: '28px 36px',
                border: `2.5px solid ${BRAND.wine}`,
                boxShadow: `0 0 50px rgba(114, 0, 0, 0.35), 0 25px 70px rgba(0,0,0,0.55)`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: BRAND.olive, letterSpacing: 2, textTransform: 'uppercase' }}>
                ĐỒNG HÀNH CÙNG SIA 🌿
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 32,
                  fontWeight: 900,
                  color: BRAND.wine,
                  marginTop: 8,
                }}
              >
                FOLLOW ĐỂ THEO DÕI HÀNH TRÌNH
              </div>
              <div style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 24, marginTop: 8 }}>
                Ghi lại hành trình tìm kiếm & chia sẻ cùng bạn nha ✨
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── 3. FLASH TRANSITION AT MAJOR TURNS ─── */}
      {isFlash && (
        <AbsoluteFill
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            zIndex: 45,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ─── 4. NATURAL SFX & LOFI BGM ─── */}
      {enableBGM && (
        <Audio src={staticFile('library/music/clips/lofi-warm.mp3')} volume={0.05} loop />
      )}

      {enableSFX && (
        <>
          <Sequence from={18} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.20} /></Sequence>
          <Sequence from={186} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
          <Sequence from={366} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
          <Sequence from={576} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.18} /></Sequence>
          <Sequence from={775} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.18} /></Sequence>
          <Sequence from={1008} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.18} /></Sequence>
          <Sequence from={1215} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
          <Sequence from={1476} durationInFrames={30}><Audio src={staticFile('sfx/sparkle-soft.wav')} volume={0.20} /></Sequence>
          <Sequence from={1866} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
          <Sequence from={2004} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-soft.wav')} volume={0.16} /></Sequence>
          <Sequence from={2490} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
          <Sequence from={2895} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
          <Sequence from={3180} durationInFrames={30}><Audio src={staticFile('sfx/sparkle-soft.wav')} volume={0.22} /></Sequence>
        </>
      )}

      {/* ─── 5. WARM EDITORIAL SUBTITLE PILL (100% ACCURATE SYNC) ─── */}
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
                background: 'rgba(248, 245, 242, 0.96)',
                padding: '18px 28px',
                borderRadius: 24,
                border: `1.5px solid ${BRAND.wine}`,
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.45)',
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
                      color: isCurrent ? BRAND.wine : isPast ? '#1E293B' : 'rgba(30, 41, 59, 0.55)',
                      transform: isCurrent ? 'scale(1.12)' : 'scale(1.0)',
                      backgroundColor: isCurrent ? 'rgba(114, 0, 0, 0.12)' : 'transparent',
                      padding: isCurrent ? '2px 8px' : '2px 0',
                      borderRadius: 8,
                      display: 'inline-block',
                      transition: 'all 0.1s ease',
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
