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

// 100% Exact Brand Guide Palette (Warm Ivory, Soft Beige, Wine, Olive)
const BRAND = {
  wine: '#720000',
  wineBright: '#B91C1C', // Wine for dark background contrast
  wineGlow: '#DC2626',
  olive: '#798466',
  oliveLight: '#9BAA83', // Olive for text contrast
  ivory: '#F8F5F2', // Warm Ivory - primary text
  beige: '#D4CABE', // Soft Beige - secondary text & accents
  charcoal: '#1F1616',
  white: '#FFFFFF',
};

// 2-4 word subtitle chunks (at collar/chest level, 3/4 width, Be Vietnam Pro font per Brand Guide)
const SUBTITLES = [
  // 0.0 - 5.6s
  { s: 0.00, e: 1.40, text: 'Mình muốn kiếm tiền' },
  { s: 1.40, e: 2.80, text: 'từ việc kinh doanh,' },
  { s: 2.80, e: 4.20, text: 'nhưng không muốn nó' },
  { s: 4.20, e: 5.60, text: 'nuốt mất cuộc sống.' },

  // 6.0 - 11.0s
  { s: 6.00, e: 7.20, text: 'Mình là Sia,' },
  { s: 7.20, e: 8.80, text: 'mẹ của nhóc 2 tuổi' },
  { s: 8.80, e: 10.96, text: 'và solo business siêu nhỏ.' },

  // 12.0 - 17.4s
  { s: 12.00, e: 13.50, text: 'Và đây là tập 3' },
  { s: 13.50, e: 15.20, text: 'của Live First Business,' },
  { s: 15.20, e: 16.50, text: 'xây dựng mô hình kinh doanh' },
  { s: 16.50, e: 17.38, text: 'từ cuộc sống trước.' },

  // 18.28 - 20.30s
  { s: 18.28, e: 19.30, text: 'Tập này nói chuyện' },
  { s: 19.30, e: 20.30, text: 'thực tế hơn nhé.' },

  // 20.74 - 24.58s
  { s: 20.74, e: 22.00, text: 'Mình có thể kiếm tiền' },
  { s: 22.00, e: 23.30, text: 'từ chuyên môn của bản thân' },
  { s: 23.30, e: 24.58, text: 'bằng những cách nào?' },

  // 25.84 - 32.72s (Cách 1)
  { s: 25.84, e: 27.20, text: 'Một, tư vấn 1-1.' },
  { s: 27.20, e: 28.50, text: 'Nếu bạn có chuyên môn' },
  { s: 28.50, e: 30.20, text: 'đủ sâu để giải quyết' },
  { s: 30.20, e: 31.50, text: 'vấn đề cho khách hàng,' },
  { s: 31.50, e: 32.72, text: 'đây là cách nhanh nhất.' },

  // 33.60 - 40.00s (Cách 2)
  { s: 33.60, e: 35.50, text: 'Hai, dịch vụ đóng gói.' },
  { s: 35.74, e: 37.20, text: 'Một vấn đề rõ,' },
  { s: 37.20, e: 38.60, text: 'một phạm vi rõ,' },
  { s: 38.60, e: 40.00, text: 'bàn giao và kết thúc.' },

  // 40.24 - 48.00s (Cách 3)
  { s: 40.24, e: 42.00, text: 'Ba, workshop nhỏ' },
  { s: 42.00, e: 43.50, text: 'hoặc một lớp học.' },
  { s: 43.50, e: 45.20, text: 'Một điều bạn hay giải thích' },
  { s: 45.20, e: 46.60, text: 'cho khách hàng, bạn bè' },
  { s: 46.60, e: 48.00, text: 'trở thành buổi học nhiều người cần.' },

  // 48.96 - 61.12s (Cách 4)
  { s: 48.96, e: 51.50, text: 'Bốn, sản phẩm số.' },
  { s: 51.50, e: 53.00, text: 'Template này, ebook này,' },
  { s: 53.00, e: 54.50, text: 'bộ hướng dẫn này.' },
  { s: 54.50, e: 56.50, text: 'Tất cả đều có thể' },
  { s: 56.50, e: 58.80, text: 'trở thành một sản phẩm' },
  { s: 58.80, e: 61.12, text: 'đóng gói một lần, bán nhiều lần.' },

  // 62.06 - 65.50s
  { s: 62.06, e: 63.80, text: 'Nhưng thật ra ấy,' },
  { s: 63.80, e: 65.50, text: 'không nhất thiết mở business ngay.' },

  // 66.24 - 72.80s
  { s: 66.24, e: 68.20, text: 'Remote work, freelance' },
  { s: 68.20, e: 70.20, text: 'hay công việc part-time' },
  { s: 70.76, e: 72.80, text: 'cũng là điểm bắt đầu.' },

  // 73.16 - 80.76s
  { s: 73.16, e: 75.00, text: 'Đôi khi chỉ cần' },
  { s: 75.00, e: 76.80, text: 'nhiều quyền chủ động hơn,' },
  { s: 77.16, e: 79.00, text: 'đã là thay đổi rất lớn' },
  { s: 79.00, e: 80.76, text: 'để tới Live First Business.' },

  // 81.38 - 85.00s
  { s: 81.38, e: 83.20, text: 'Và mình không nghĩ' },
  { s: 83.20, e: 85.00, text: 'cần làm tất cả điều này.' },

  // 85.34 - 94.94s
  { s: 85.34, e: 87.00, text: 'Nếu đang có con nhỏ,' },
  { s: 87.00, e: 88.50, text: 'thời gian rất là ít,' },
  { s: 88.94, e: 91.20, text: 'bắt đầu từ việc nhỏ nhất.' },
  { s: 91.56, e: 93.20, text: 'Một việc đủ nhỏ' },
  { s: 93.20, e: 94.94, text: 'kỹ năng hiện tại làm được.' },

  // 96.02 - 104.28s
  { s: 96.02, e: 98.00, text: 'Làm nhỏ thôi và xem' },
  { s: 98.00, e: 100.20, text: 'ai thực sự trả tiền không,' },
  { s: 100.20, e: 102.30, text: 'và có thực sự là cách làm' },
  { s: 102.30, e: 104.28, text: 'fit với cuộc sống không?' },

  // 105.12 - 116.32s
  { s: 105.12, e: 107.50, text: 'Nếu bạn cũng đang tìm' },
  { s: 107.50, e: 109.20, text: 'một cách kiếm tiền,' },
  { s: 109.20, e: 111.00, text: 'không xoay quanh công việc,' },
  { s: 111.44, e: 113.80, text: 'follow mình nhé!' },
  { s: 113.80, e: 116.32, text: 'Mình sẽ chia sẻ hành trình này.' },
];

export const LifeFirstBusinessMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Active Subtitle
  const activeSub = SUBTITLES.find((s) => currentTime >= s.s && currentTime <= s.e);

  // 1. Organic Handheld Camera Drift
  const driftX = Math.sin(frame / 42) * 2.0;
  const driftY = Math.cos(frame / 52) * 1.5;
  const driftRotate = Math.sin(frame / 65) * 0.08;

  // 2. Punch-Ins on storytelling beats
  let baseZoom = 1.0;
  if (currentTime >= 0.0 && currentTime < 5.6) {
    baseZoom = 1.04;
  } else if (currentTime >= 18.28 && currentTime < 24.58) {
    baseZoom = 1.08;
  } else if (currentTime >= 62.06 && currentTime < 65.5) {
    baseZoom = 1.07;
  } else if (currentTime >= 88.94 && currentTime < 94.94) {
    baseZoom = 1.08;
  } else if (currentTime >= 111.44) {
    baseZoom = 1.10;
  }

  const makeSpring = (startFrame: number, damping = 14, stiffness = 120) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping, stiffness, mass: 0.7 },
    });
  };

  const waveFloat = (offset = 0) => Math.sin((frame + offset) / 16) * 3.5;

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* ─── 1. MASTER VIDEO FOOTAGE ─── */}
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

          {/* Gentle cinematic gradient for contrast */}
          <AbsoluteFill
            style={{
              background:
                'linear-gradient(to bottom, rgba(10, 5, 6, 0.55) 0%, rgba(10, 5, 6, 0.15) 28%, rgba(10, 5, 6, 0.10) 65%, rgba(10, 5, 6, 0.75) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ─── 2. UPPER HIGHLIGHT (FROM FOREHEAD UP) - 100% BRAND GUIDE ─── */}

      {/* BEAT 1 (0.0s - 5.6s): NEW HOOK
          "cách thực tế để kiếm thêm thu nhập tại nhà từ chuyên môn"
          Font: Alegreya (Heading), Colors: Wine (#B91C1C / #720000) & Warm Ivory (#F8F5F2) */}
      {currentTime >= 0.3 && currentTime <= 5.8 && (() => {
        const spr1 = makeSpring(8);
        const spr2 = makeSpring(25);
        const spr3 = makeSpring(45);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Line 1: cách thực tế (Wine) */}
            <div
              style={{
                transform: `scale(${spr1}) translateY(${waveFloat(0)}px)`,
                opacity: spr1,
                fontFamily: FONT_DISPLAY,
                fontSize: 66,
                fontWeight: 800,
                color: BRAND.ivory,
                lineHeight: 1.15,
                textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
                letterSpacing: 1,
              }}
            >
              cách thực tế
            </div>

            {/* Line 2: để kiếm thêm thu nhập (Italic Warm Ivory) */}
            <div
              style={{
                transform: `scale(${spr2}) translateY(${waveFloat(8)}px)`,
                opacity: spr2,
                fontFamily: FONT_DISPLAY,
                fontSize: 62,
                fontStyle: 'italic',
                fontWeight: 600,
                color: BRAND.ivory,
                lineHeight: 1.15,
                marginTop: 4,
                textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
              }}
            >
              để kiếm thêm thu nhập
            </div>

            {/* Line 3: tại nhà từ chuyên môn (Olive Light & Warm Ivory) */}
            <div
              style={{
                transform: `scale(${spr3}) translateY(${waveFloat(16)}px)`,
                opacity: spr3,
                fontFamily: FONT_DISPLAY,
                fontSize: 68,
                fontWeight: 900,
                color: BRAND.ivory,
                lineHeight: 1.15,
                marginTop: 6,
                textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
              }}
            >
              <span style={{ color: BRAND.oliveLight }}>tại nhà</span>{' '}
              <span style={{ fontStyle: 'italic', color: BRAND.beige, fontWeight: 700 }}>từ chuyên môn</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 2 & 3 (6.0s - 11.0s):
          Sia • Mẹ của nhóc 2 tuổi (Alegreya bold, Wine + Ivory)
          Điều hành một business nhỏ (Alegreya italic slender, Soft Beige) */}
      {currentTime >= 6.0 && currentTime <= 11.0 && (() => {
        const sprTop = makeSpring(180);
        const sprSub = makeSpring(240);
        return (
          <div
            style={{
              position: 'absolute',
              top: 220,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Dòng trên to hơn */}
            <div
              style={{
                transform: `scale(${sprTop}) translateY(${waveFloat(0)}px)`,
                opacity: sprTop,
                fontFamily: FONT_DISPLAY,
                fontSize: 58,
                fontWeight: 900,
                color: BRAND.ivory,
                textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <span style={{ color: BRAND.ivory }}>Sia</span>
              <span style={{ color: BRAND.oliveLight, fontSize: 36 }}>•</span>
              <span>Mẹ của nhóc 2 tuổi</span>
            </div>

            {/* Dòng dưới in nghiêng, mảnh hơn */}
            <div
              style={{
                transform: `scale(${sprSub}) translateY(${waveFloat(10)}px)`,
                opacity: sprSub,
                fontFamily: FONT_DISPLAY,
                fontSize: 44,
                fontStyle: 'italic',
                fontWeight: 500,
                color: BRAND.beige,
                marginTop: 10,
                textShadow: '0 2px 16px rgba(0,0,0,0.95)',
              }}
            >
              Điều hành một business nhỏ ~ ✨
            </div>
          </div>
        );
      })()}

      {/* BEAT 4 & 5 (11.8s - 17.4s):
          SERIES: LIFE-FIRST BUSINESS • TẬP 03
          Cuộc sống trước ➔ Business sau */}
      {currentTime >= 11.8 && currentTime <= 17.4 && (() => {
        const sprTitle = makeSpring(355);
        const sprMain = makeSpring(410);
        return (
          <div
            style={{
              position: 'absolute',
              top: 200,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${interpolate(sprTitle, [0, 1], [0.94, 1.0])})`,
              opacity: sprTitle,
            }}
          >
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 20,
                fontWeight: 800,
                color: BRAND.oliveLight,
                letterSpacing: 4,
                textTransform: 'uppercase',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span>SERIES: LIFE-FIRST BUSINESS</span>
              <span style={{ background: BRAND.wineBright, color: BRAND.ivory, padding: '3px 12px', borderRadius: 8, fontSize: 14, fontWeight: 900 }}>TẬP 03</span>
            </div>

            <div
              style={{
                transform: `scale(${sprMain}) translateY(${waveFloat(6)}px)`,
                opacity: sprMain,
                fontFamily: FONT_DISPLAY,
                fontSize: 54,
                fontWeight: 900,
                color: BRAND.ivory,
                marginTop: 12,
                textShadow: '0 3px 20px rgba(0,0,0,0.98)',
              }}
            >
              <span style={{ color: BRAND.oliveLight, fontStyle: 'italic' }}>CUỘC SỐNG TRƯỚC</span>
              <span style={{ margin: '0 16px', color: BRAND.beige, fontSize: 44 }}>➔</span>
              <span>BUSINESS SAU</span>
            </div>

            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.beige,
                fontSize: 40,
                marginTop: 8,
                transform: `rotate(-2deg) translateY(${waveFloat(12)}px)`,
                textShadow: '0 2px 14px rgba(0,0,0,0.95)',
              }}
            >
              bắt đầu từ lối sống bạn muốn ~
            </div>
          </div>
        );
      })()}

      {/* BEAT 7 (20.5s - 24.8s): CHUYÊN MÔN ➔ KIẾM TIỀN BẰNG CÁCH NÀO? */}
      {currentTime >= 20.5 && currentTime <= 24.8 && (() => {
        const spr = makeSpring(615);
        return (
          <div
            style={{
              position: 'absolute',
              top: 200,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              transform: `translateY(${(1 - spr) * -20}px) translateY(${waveFloat(0)}px)`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.oliveLight,
                fontSize: 42,
                fontWeight: 700,
                transform: 'rotate(-4deg)',
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
                marginBottom: 8,
              }}
            >
              thực tế hơn nhé... ☕
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 54,
                fontWeight: 900,
                lineHeight: 1.25,
                textShadow: '0 3px 22px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.85)',
              }}
            >
              Kiếm tiền từ chuyên môn của bạn
              <br />
              <span style={{ color: BRAND.wineBright, fontStyle: 'italic', fontSize: 58 }}>
                bằng những cách nào?
              </span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 8, 9, 10 (25.8s - 32.7s): 01 • TƯ VẤN 1:1 */}
      {currentTime >= 25.8 && currentTime <= 32.7 && (() => {
        const sprHeader = makeSpring(775);
        const sprItem1 = makeSpring(840);
        const sprItem2 = makeSpring(900);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 50,
              right: 50,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                transform: `scale(${sprHeader}) translateY(${waveFloat(0)}px)`,
                opacity: sprHeader,
                fontFamily: FONT_DISPLAY,
                fontSize: 56,
                fontWeight: 900,
                color: BRAND.ivory,
                textShadow: '0 3px 20px rgba(0,0,0,0.98)',
              }}
            >
              <span style={{ color: BRAND.oliveLight }}>💡 01 •</span> TƯ VẤN 1:1
            </div>

            <div
              style={{
                transform: `scale(${sprItem1}) translateY(${waveFloat(8)}px)`,
                opacity: sprItem1,
                fontFamily: FONT_HANDWRITING,
                color: BRAND.ivory,
                fontSize: 44,
                fontWeight: 700,
                marginTop: 12,
                textShadow: '0 2px 16px rgba(0,0,0,0.95)',
              }}
            >
              "cách bắt đầu nhanh nhất để có dòng tiền ⚡"
            </div>

            {currentTime >= 28.5 && (
              <div
                style={{
                  transform: `scale(${sprItem2}) translateY(${waveFloat(14)}px)`,
                  opacity: sprItem2,
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.oliveLight,
                  fontSize: 42,
                  fontWeight: 700,
                  marginTop: 10,
                  textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                }}
              >
                • Giải quyết 1 vấn đề cụ thể cho khách hàng
              </div>
            )}
          </div>
        );
      })()}

      {/* BEAT 11, 12, 13 (33.6s - 40.0s): 02 • DỊCH VỤ ĐÓNG GÓI */}
      {currentTime >= 33.6 && currentTime <= 40.0 && (() => {
        const sprHeader = makeSpring(1008);
        const sprStep1 = makeSpring(1065);
        const sprStep2 = makeSpring(1115);
        const sprStep3 = makeSpring(1155);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 50,
              right: 50,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                transform: `scale(${sprHeader}) translateY(${waveFloat(0)}px)`,
                opacity: sprHeader,
                fontFamily: FONT_DISPLAY,
                fontSize: 56,
                fontWeight: 900,
                color: BRAND.oliveLight,
                textShadow: '0 3px 20px rgba(0,0,0,0.98)',
              }}
            >
              📦 02 • DỊCH VỤ ĐÓNG GÓI
            </div>

            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <div
                style={{
                  transform: `scale(${sprStep1})`,
                  opacity: sprStep1,
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.ivory,
                  fontSize: 42,
                  fontWeight: 700,
                  textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                }}
              >
                • 1 Vấn đề rõ
              </div>

              {currentTime >= 36.8 && (
                <div
                  style={{
                    transform: `scale(${sprStep2})`,
                    opacity: sprStep2,
                    fontFamily: FONT_HANDWRITING,
                    color: BRAND.ivory,
                    fontSize: 42,
                    fontWeight: 700,
                    textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                  }}
                >
                  • 1 Phạm vi rõ
                </div>
              )}

              {currentTime >= 38.2 && (
                <div
                  style={{
                    transform: `scale(${sprStep3}) rotate(-4deg)`,
                    opacity: sprStep3,
                    fontFamily: FONT_HANDWRITING,
                    color: BRAND.wineBright,
                    fontSize: 46,
                    fontWeight: 700,
                    textShadow: '0 2px 16px rgba(0,0,0,0.95)',
                  }}
                >
                  ✓ Bàn giao và kết thúc! (Xong gọn gàng)
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* BEAT 14, 15, 16 (40.2s - 48.0s): 03 • WORKSHOP NHỎ */}
      {currentTime >= 40.2 && currentTime <= 48.0 && (() => {
        const sprHeader = makeSpring(1206);
        const sprItem1 = makeSpring(1280);
        const sprItem2 = makeSpring(1350);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 50,
              right: 50,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                transform: `scale(${sprHeader}) translateY(${waveFloat(0)}px)`,
                opacity: sprHeader,
                fontFamily: FONT_DISPLAY,
                fontSize: 56,
                fontWeight: 900,
                color: BRAND.oliveLight,
                textShadow: '0 3px 20px rgba(0,0,0,0.98)',
              }}
            >
              🌱 03 • WORKSHOP NHỎ
            </div>

            <div
              style={{
                transform: `scale(${sprItem1}) translateY(${waveFloat(6)}px)`,
                opacity: sprItem1,
                fontFamily: FONT_HANDWRITING,
                color: BRAND.ivory,
                fontSize: 44,
                fontWeight: 700,
                marginTop: 12,
                textShadow: '0 2px 16px rgba(0,0,0,0.95)',
              }}
            >
              "điều bạn hay giải thích cho người khác ~"
            </div>

            {currentTime >= 44.5 && (
              <div
                style={{
                  transform: `scale(${sprItem2}) translateY(${waveFloat(12)}px)`,
                  opacity: sprItem2,
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.wineBright,
                  fontSize: 44,
                  fontWeight: 700,
                  marginTop: 10,
                  textShadow: '0 2px 16px rgba(0,0,0,0.95)',
                }}
              >
                • Biến thành buổi học nhiều người muốn học ✨
              </div>
            )}
          </div>
        );
      })()}

      {/* BEAT 17, 18, 19 (48.9s - 61.1s): 04 • SẢN PHẨM SỐ */}
      {currentTime >= 48.9 && currentTime <= 61.1 && (() => {
        const sprHeader = makeSpring(1467);
        const sprPill = makeSpring(1540);
        const sprPassive = makeSpring(1680);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 50,
              right: 50,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                transform: `scale(${sprHeader}) translateY(${waveFloat(0)}px)`,
                opacity: sprHeader,
                fontFamily: FONT_DISPLAY,
                fontSize: 56,
                fontWeight: 900,
                color: BRAND.ivory,
                textShadow: '0 3px 20px rgba(0,0,0,0.98)',
              }}
            >
              <span style={{ color: BRAND.oliveLight }}>✨ 04 •</span> SẢN PHẨM SỐ
            </div>

            <div
              style={{
                transform: `scale(${sprPill})`,
                opacity: sprPill,
                marginTop: 14,
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: BRAND.ivory, fontFamily: FONT_HANDWRITING, fontSize: 38, fontWeight: 700, textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}>
                "Template"
              </span>
              <span style={{ color: BRAND.oliveLight, fontSize: 28 }}>•</span>
              <span style={{ color: BRAND.ivory, fontFamily: FONT_HANDWRITING, fontSize: 38, fontWeight: 700, textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}>
                "Ebook"
              </span>
              <span style={{ color: BRAND.oliveLight, fontSize: 28 }}>•</span>
              <span style={{ color: BRAND.ivory, fontFamily: FONT_HANDWRITING, fontSize: 38, fontWeight: 700, textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}>
                "Bộ Hướng Dẫn"
              </span>
            </div>

            {currentTime >= 54.5 && (
              <div
                style={{
                  transform: `scale(${sprPassive}) translateY(${waveFloat(8)}px)`,
                  opacity: sprPassive,
                  marginTop: 14,
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.oliveLight,
                  fontSize: 46,
                  fontWeight: 700,
                  textShadow: '0 2px 16px rgba(0,0,0,0.95)',
                }}
              >
                💡 Đóng gói 1 lần ➔ Bán nhiều lần ✨
              </div>
            )}
          </div>
        );
      })()}

      {/* BEAT 20 (62.0s - 65.5s): Không nhất thiết phải mở business ngay */}
      {currentTime >= 62.0 && currentTime <= 65.5 && (() => {
        const spr = makeSpring(1860);
        return (
          <div
            style={{
              position: 'absolute',
              top: 200,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              transform: `translateY(${(1 - spr) * -20}px) translateY(${waveFloat(6)}px)`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.oliveLight,
                fontSize: 42,
                fontWeight: 700,
                transform: 'rotate(-4deg)',
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
                marginBottom: 8,
              }}
            >
              nhưng thật ra ấy...
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 52,
                fontWeight: 900,
                textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.85)',
              }}
            >
              "Bạn không nhất thiết phải mở business ngay!"
            </div>
          </div>
        );
      })()}

      {/* BEAT 21, 22, 23 (66.2s - 80.8s): BƯỚC ĐỆM LINH HOẠT */}
      {currentTime >= 66.2 && currentTime <= 80.8 && (() => {
        const sprTitle = makeSpring(1986);
        const spr1 = makeSpring(2000);
        const spr2 = makeSpring(2050);
        const spr3 = makeSpring(2100);
        const sprUnlock = makeSpring(2190);
        return (
          <div
            style={{
              position: 'absolute',
              top: 175,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                transform: `scale(${sprTitle})`,
                opacity: sprTitle,
                fontFamily: FONT_DISPLAY,
                color: BRAND.oliveLight,
                fontSize: 52,
                fontWeight: 900,
                textShadow: '0 3px 18px rgba(0,0,0,0.95)',
              }}
            >
              🌿 BƯỚC ĐỆM LINH HOẠT
            </div>

            <div style={{ marginTop: 12, width: '100%', maxWidth: 700 }}>
              <div
                style={{
                  transform: `scale(${spr1}) translateY(${waveFloat(0)}px)`,
                  opacity: spr1,
                  textAlign: 'left',
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.ivory,
                  fontSize: 48,
                  fontWeight: 700,
                  textShadow: '0 3px 18px rgba(0,0,0,0.98), 0 6px 30px rgba(0,0,0,0.90)',
                }}
              >
                "remote work"
              </div>

              {currentTime >= 68.0 && (
                <div
                  style={{
                    transform: `scale(${spr2}) translateY(${waveFloat(8)}px)`,
                    opacity: spr2,
                    textAlign: 'right',
                    fontFamily: FONT_HANDWRITING,
                    color: BRAND.beige,
                    fontSize: 50,
                    fontWeight: 700,
                    marginTop: 4,
                    textShadow: '0 3px 18px rgba(0,0,0,0.98), 0 6px 30px rgba(0,0,0,0.90)',
                  }}
                >
                  "freelance"
                </div>
              )}

              {currentTime >= 69.5 && (
                <div
                  style={{
                    transform: `scale(${spr3}) translateY(${waveFloat(14)}px)`,
                    opacity: spr3,
                    textAlign: 'center',
                    fontFamily: FONT_HANDWRITING,
                    color: BRAND.oliveLight,
                    fontSize: 48,
                    fontWeight: 700,
                    marginTop: 4,
                    textShadow: '0 3px 18px rgba(0,0,0,0.98), 0 6px 30px rgba(0,0,0,0.90)',
                  }}
                >
                  "online part-time"
                </div>
              )}
            </div>

            {currentTime >= 73.5 && (
              <div
                style={{
                  transform: `scale(${sprUnlock}) translateY(${waveFloat(10)}px)`,
                  opacity: sprUnlock,
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.wineBright,
                  fontSize: 44,
                  fontWeight: 700,
                  marginTop: 12,
                  textShadow: '0 2px 16px rgba(0,0,0,0.95)',
                }}
              >
                🔓 Chỉ cần cho bạn nhiều quyền chủ động hơn!
              </div>
            )}
          </div>
        );
      })()}

      {/* BEAT 25, 26, 27, 28 (81.4s - 94.9s): BẮT ĐẦU TỪ VIỆC NHỎ NHẤT */}
      {currentTime >= 81.4 && currentTime <= 94.9 && (() => {
        const spr = makeSpring(2442);
        const sprHand = makeSpring(2668);
        return (
          <div
            style={{
              position: 'absolute',
              top: 185,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              transform: `scale(${interpolate(spr, [0, 1], [0.92, 1.0])})`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_BODY,
                color: BRAND.oliveLight,
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: 'uppercase',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}
            >
              DÀNH CHO NGƯỜI CÓ CON NHỎ & ÍT THỜI GIAN 👶
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 56,
                fontWeight: 900,
                marginTop: 10,
                textShadow: '0 3px 20px rgba(0,0,0,0.98)',
              }}
            >
              Hãy bắt đầu từ việc <span style={{ color: BRAND.wineBright, textDecoration: 'underline' }}>NHỎ NHẤT</span>!
            </div>

            <div
              style={{
                transform: `rotate(-3deg) translateY(${waveFloat(10)}px)`,
                opacity: sprHand,
                fontFamily: FONT_HANDWRITING,
                color: BRAND.beige,
                fontSize: 44,
                fontWeight: 700,
                marginTop: 12,
                textShadow: '0 2px 14px rgba(0,0,0,0.95)',
              }}
            >
              "Một việc đủ nhỏ để kỹ năng hiện tại đã làm được ngay 🌱"
            </div>
          </div>
        );
      })()}

      {/* BEAT 29, 30, 31 (96.0s - 104.3s): 2 TIÊU CHÍ TEST */}
      {currentTime >= 96.0 && currentTime <= 104.3 && (() => {
        const spr = makeSpring(2880);
        const spr1 = makeSpring(2950);
        const spr2 = makeSpring(3030);
        return (
          <div
            style={{
              position: 'absolute',
              top: 185,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${interpolate(spr, [0, 1], [0.93, 1.0])})`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.oliveLight,
                fontSize: 54,
                fontWeight: 900,
                textShadow: '0 3px 18px rgba(0,0,0,0.95)',
              }}
            >
              ⚖️ 2 BÀI TEST THỰC TẾ
            </div>

            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <div
                style={{
                  transform: `scale(${spr1})`,
                  opacity: spr1,
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.ivory,
                  fontSize: 44,
                  fontWeight: 700,
                  textShadow: '0 2px 16px rgba(0,0,0,0.95)',
                }}
              >
                • Có ai thực sự trả tiền không?
              </div>

              {currentTime >= 99.8 && (
                <div
                  style={{
                    transform: `scale(${spr2}) translateY(${waveFloat(4)}px)`,
                    opacity: spr2,
                    fontFamily: FONT_HANDWRITING,
                    color: BRAND.wineBright,
                    fontSize: 44,
                    fontWeight: 700,
                    textShadow: '0 2px 16px rgba(0,0,0,0.95)',
                  }}
                >
                  • Có thực sự fit với cuộc sống của bạn không? ✨
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* BEAT 32 - 35 (105.1s - 116.3s): CUỘC SỐNG ≠ CÔNG VIỆC ➔ Follow */}
      {currentTime >= 105.1 && currentTime <= 116.3 && (() => {
        const spr = makeSpring(3153);
        const sprFollow = makeSpring(3340);
        return (
          <div
            style={{
              position: 'absolute',
              top: 190,
              left: 40,
              right: 40,
              zIndex: 40,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${interpolate(spr, [0, 1], [0.93, 1.0])})`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 54,
                fontWeight: 900,
                color: BRAND.ivory,
                textShadow: '0 3px 20px rgba(0,0,0,0.98)',
                lineHeight: 1.25,
              }}
            >
              CUỘC SỐNG <span style={{ color: BRAND.wineBright }}>≠</span> XOAY QUANH CÔNG VIỆC
            </div>

            <div
              style={{
                transform: `scale(${sprFollow}) translateY(${waveFloat(8)}px)`,
                opacity: sprFollow,
                marginTop: 16,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: `linear-gradient(135deg, ${BRAND.wineGlow} 0%, ${BRAND.wine} 100%)`,
                padding: '14px 34px',
                borderRadius: 36,
                color: BRAND.ivory,
                boxShadow: '0 6px 28px rgba(220,38,38,0.65)',
              }}
            >
              <span style={{ fontSize: 24 }}>👉</span>
              <span style={{ fontFamily: FONT_BODY, fontWeight: 900, fontSize: 23 }}>Follow để cùng đồng hành</span>
              <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.ivory, fontSize: 32 }}>✨</span>
            </div>

            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.beige,
                fontSize: 40,
                marginTop: 12,
                transform: 'rotate(-2deg)',
                textShadow: '0 2px 12px rgba(0,0,0,0.95)',
              }}
            >
              "Mình sẽ thử và ghi lại tất cả ở đây nha ~"
            </div>
          </div>
        );
      })()}

      {/* ─── 3. NATURAL SFX & LOFI BGM ─── */}
      <Audio src={staticFile('library/music/clips/lofi-warm.mp3')} volume={0.05} loop />

      {/* SFX triggers */}
      <Sequence from={15} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.20} /></Sequence>
      <Sequence from={180} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
      <Sequence from={355} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
      <Sequence from={615} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.18} /></Sequence>
      <Sequence from={775} durationInFrames={30}><Audio src={staticFile('sfx/ui-click-soft.wav')} volume={0.18} /></Sequence>
      <Sequence from={1008} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
      <Sequence from={1206} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
      <Sequence from={1467} durationInFrames={30}><Audio src={staticFile('sfx/sparkle-soft.wav')} volume={0.20} /></Sequence>
      <Sequence from={1860} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
      <Sequence from={1986} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-soft.wav')} volume={0.16} /></Sequence>
      <Sequence from={2442} durationInFrames={30}><Audio src={staticFile('sfx/warm-shimmer.wav')} volume={0.18} /></Sequence>
      <Sequence from={2880} durationInFrames={30}><Audio src={staticFile('sfx/page-flip.wav')} volume={0.18} /></Sequence>
      <Sequence from={3153} durationInFrames={30}><Audio src={staticFile('sfx/sparkle-soft.wav')} volume={0.22} /></Sequence>

      {/* ─── 4. SUBTITLES: TẦM CỔ ÁO / NGỰC (Y ~ 1160px), FONT BE VIETNAM PRO (BODY FONT TRONG BRAND GUIDE), WARM IVORY ─── */}
      {activeSub && (() => {
        return (
          <div
            style={{
              position: 'absolute',
              top: 1160,
              left: 40,
              right: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                maxWidth: 820,
                fontFamily: FONT_BODY, // Be Vietnam Pro per Brand Guide
                fontSize: 54,
                fontWeight: 700,
                color: BRAND.ivory, // Warm Ivory per Brand Guide
                lineHeight: 1.25,
                textShadow: '0 3px 18px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
                letterSpacing: 0.2,
              }}
            >
              {activeSub.text}
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};

export default LifeFirstBusinessMaster;
