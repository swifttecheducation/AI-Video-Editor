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
  wineLight: '#991B1B',
  wineGlow: '#DC2626',
  olive: '#798466',
  oliveLight: '#A3B18A',
  ivory: '#F8F5F2',
  beige: '#D4CABE',
  gold: '#E0B554',
  white: '#FFFFFF',
};

// 100% Exact word-for-word transcript from master audio
const SUBTITLES = [
  { s: 0.00, e: 5.60, text: 'Mình muốn kiếm tiền từ việc kinh doanh, nhưng mình không muốn việc kinh doanh nuốt mất cái cuộc sống của mình.' },
  { s: 6.00, e: 10.96, text: 'Mình là Sia, mẹ của một nhóc 2 tuổi và đang có một cái solo business siêu nhỏ.' },
  { s: 12.00, e: 17.38, text: 'Và đây là tập 3 của Live First Business xây dựng một cái mô hình kinh doanh từ cuộc sống mà mình mong muốn trước.' },
  { s: 18.28, e: 20.30, text: 'Tập này nói chuyện thực tế hơn nhé.' },
  { s: 20.74, e: 24.58, text: 'Mình có thể kiếm tiền từ chuyên môn của bản thân bằng những cách nào?' },
  { s: 25.84, e: 28.50, text: 'Một, tư vấn 1-1.' },
  { s: 28.50, e: 32.72, text: 'Nếu bạn đã có chuyên môn đủ sâu để có thể giải quyết một vấn đề cụ thể cho khách hàng thì đây có lẽ là cách nhanh nhất.' },
  { s: 33.60, e: 35.50, text: 'Hai, dịch vụ đóng gói.' },
  { s: 35.74, e: 40.00, text: 'Một vấn đề rõ, một phạm vi rõ, làm xong thì bàn giao và kết thúc.' },
  { s: 40.24, e: 43.50, text: 'Ba, workshop hoặc là một cái lớp học nhỏ.' },
  { s: 43.50, e: 48.00, text: 'Một cái điều mà bạn thường xuyên phải giải thích cho khách hàng, cho bạn bè có thể sẽ trở thành buổi học mà rất nhiều người muốn học từ bạn.' },
  { s: 48.96, e: 51.50, text: 'Bốn, sản phẩm số.' },
  { s: 51.50, e: 56.00, text: 'Template này, ebook này, bộ hướng dẫn này.' },
  { s: 56.00, e: 61.12, text: 'Tất cả đều có thể trở thành một sản phẩm mà bạn đóng gói một lần và bán nhiều lần.' },
  { s: 62.06, e: 65.50, text: 'Nhưng thật ra ấy, bạn cũng không nhất thiết phải mở business ngay.' },
  { s: 66.24, e: 70.20, text: 'Remote work, freelance hay là công việc online part-time.' },
  { s: 70.76, e: 72.80, text: 'Cũng có thể là điểm bắt đầu.' },
  { s: 73.16, e: 76.80, text: 'Đôi khi chỉ cần một công việc mà cho bạn nhiều cái quyền chủ động hơn,' },
  { s: 77.16, e: 80.76, text: 'đã là một cái thay đổi rất lớn để tiến gần tới với Live First Business rồi.' },
  { s: 81.38, e: 85.00, text: 'Và mình không nghĩ là các bạn sẽ cần phải làm tất cả những cái điều này.' },
  { s: 85.34, e: 88.50, text: 'Nếu đang có con nhỏ và cái quỹ thời gian của các bạn rất là ít,' },
  { s: 88.94, e: 91.20, text: 'hãy bắt đầu từ cái việc nhỏ nhất thôi.' },
  { s: 91.56, e: 94.94, text: 'Một việc đủ nhỏ để cái skill hay cái kỹ năng của bạn hiện tại có thể làm được.' },
  { s: 96.02, e: 104.28, text: 'Làm thì nhỏ thôi và xem xem là có ai thực sự trả tiền và có thực sự là cái cách làm để nó fit với các cái cuộc sống của bạn không?' },
  { s: 105.12, e: 107.50, text: 'Nếu bạn cũng đang tìm một cách kiếm tiền,' },
  { s: 108.06, e: 111.00, text: 'mà không muốn cả cuộc sống phải xoay quanh công việc,' },
  { s: 111.44, e: 116.32, text: 'follow mình nhé, mình sẽ ghi lại cái hành trình mình tìm kiếm cũng như là chia sẻ lại với mọi người nha!' },
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

  // Organic wave float for floating words
  const waveFloat = (offset = 0) => Math.sin((frame + offset) / 16) * 3.5;
  const waveRotate = (offset = 0) => Math.cos((frame + offset) / 22) * 1.8;

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* ─── 1. MASTER VIDEO FOOTAGE (100% TALKING HEAD) ─── */}
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

          {/* Very gentle filmic gradient at top and bottom for floating text legibility without boxing */}
          <AbsoluteFill
            style={{
              background:
                'linear-gradient(to bottom, rgba(10, 5, 6, 0.45) 0%, rgba(10, 5, 6, 0) 22%, rgba(10, 5, 6, 0) 70%, rgba(10, 5, 6, 0.65) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ─── 2. FREE-FLOATING AESTHETIC KINETIC TYPOGRAPHY (ZERO CLUNKY BOXES) ─── */}

      {/* BEAT 1 (0.0s - 5.6s): Hai tay cân hai phía: KIẾM TIỀN ≠ VIỆC CHIẾM HẾT CUỘC SỐNG */}
      {currentTime >= 0.5 && currentTime <= 5.5 && (() => {
        const sprLeft = makeSpring(15);
        const sprRight = makeSpring(35);
        const sprNot = makeSpring(50);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 40,
              right: 40,
              zIndex: 35,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Handwriting floating tag */}
            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.oliveLight,
                fontSize: 32,
                fontWeight: 700,
                transform: `rotate(-4deg) translateY(${waveFloat(0)}px)`,
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                marginBottom: 8,
              }}
            >
              bài toán cân bằng ~
            </div>

            {/* Floating Kinetic Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              {/* Left text */}
              <div
                style={{
                  transform: `translateX(${(1 - sprLeft) * -60}px) rotate(-2deg) translateY(${waveFloat(10)}px)`,
                  opacity: sprLeft,
                  fontFamily: FONT_DISPLAY,
                  fontSize: 36,
                  fontWeight: 800,
                  color: BRAND.ivory,
                  textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 4px 24px rgba(114,0,0,0.6)',
                  letterSpacing: 1,
                }}
              >
                KIẾM TIỀN
              </div>

              {/* Not Equal Sign */}
              <div
                style={{
                  transform: `scale(${sprNot}) rotate(${waveRotate(5)}deg)`,
                  opacity: sprNot,
                  fontFamily: FONT_DISPLAY,
                  fontSize: 48,
                  fontWeight: 900,
                  color: BRAND.wineGlow,
                  textShadow: '0 0 20px rgba(220,38,38,0.7), 0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                ≠
              </div>

              {/* Right text */}
              <div
                style={{
                  transform: `translateX(${(1 - sprRight) * 60}px) rotate(2deg) translateY(${waveFloat(20)}px)`,
                  opacity: sprRight,
                  fontFamily: FONT_DISPLAY,
                  fontSize: 34,
                  fontWeight: 800,
                  color: BRAND.beige,
                  textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.8)',
                  letterSpacing: 0.5,
                }}
              >
                CUỘC SỐNG BỊ NUỐT MẤT
              </div>
            </div>

            {/* Hand-drawn underline SVG */}
            <svg width="340" height="24" viewBox="0 0 340 24" style={{ marginTop: 6, opacity: sprRight }}>
              <path
                d="M 10 16 Q 90 4, 180 14 Q 260 22, 330 10"
                fill="none"
                stroke={BRAND.wineGlow}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })()}

      {/* BEAT 2 & 3 (6.0s - 11.0s): Chỉ vào mình ➔ Sia • Mẹ của nhóc 2 tuổi & Điều hành business nhỏ */}
      {currentTime >= 6.0 && currentTime <= 11.0 && (() => {
        const spr1 = makeSpring(180);
        const spr2 = makeSpring(250);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 50,
              zIndex: 35,
              transform: `translateX(${(1 - spr1) * -40}px)`,
              opacity: spr1,
            }}
          >
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 34,
                fontWeight: 800,
                textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 4px 25px rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span>Sia</span>
              <span style={{ color: BRAND.oliveLight, fontSize: 24 }}>•</span>
              <span style={{ fontSize: 28, color: BRAND.beige }}>Mẹ của nhóc 2 tuổi</span>
            </div>
            {currentTime >= 8.3 && (
              <div
                style={{
                  transform: `translateY(${(1 - spr2) * 12}px) rotate(-2deg) translateY(${waveFloat(5)}px)`,
                  opacity: spr2,
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.gold,
                  fontSize: 32,
                  fontWeight: 700,
                  marginTop: 6,
                  textShadow: '0 2px 12px rgba(0,0,0,0.9)',
                }}
              >
                ~ đang có một solo business siêu nhỏ ✨
              </div>
            )}
          </div>
        );
      })()}

      {/* BEAT 4 & 5 (11.8s - 17.4s): Giơ 3 ngón ➔ Title card series: LIFE-FIRST BUSINESS • TẬP 3 ➔ Cuộc sống trước ➔ Business sau */}
      {currentTime >= 11.8 && currentTime <= 17.4 && (() => {
        const sprTitle = makeSpring(355);
        const sprLife = makeSpring(420);
        const sprBiz = makeSpring(465);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 40,
              right: 40,
              zIndex: 35,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${interpolate(sprTitle, [0, 1], [0.92, 1.0])})`,
              opacity: sprTitle,
            }}
          >
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 800,
                color: BRAND.gold,
                letterSpacing: 3,
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>SERIES: LIFE-FIRST BUSINESS</span>
              <span style={{ background: BRAND.gold, color: '#1A0A0C', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 900 }}>TẬP 03</span>
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 36,
                fontWeight: 800,
                marginTop: 8,
                textAlign: 'center',
                textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                lineHeight: 1.25,
              }}
            >
              <span style={{ transform: `scale(${sprLife})`, display: 'inline-block', color: BRAND.oliveLight }}>
                CUỘC SỐNG TRƯỚC
              </span>
              <span style={{ margin: '0 12px', color: BRAND.gold, fontSize: 32 }}>➔</span>
              <span style={{ transform: `scale(${sprBiz})`, display: 'inline-block', color: BRAND.ivory }}>
                BUSINESS SAU
              </span>
            </div>

            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.beige,
                fontSize: 26,
                marginTop: 6,
                transform: `rotate(-2deg) translateY(${waveFloat(12)}px)`,
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}
            >
              bắt đầu từ lối sống bạn muốn ~
            </div>
          </div>
        );
      })()}

      {/* BEAT 7 (20.7s - 24.8s): Hai tay mở ra kiểu câu hỏi ➔ CHUYÊN MÔN ➔ KIẾM TIỀN BẰNG CÁCH NÀO? */}
      {currentTime >= 20.5 && currentTime <= 24.8 && (() => {
        const spr = makeSpring(615);
        return (
          <div
            style={{
              position: 'absolute',
              top: 145,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              transform: `translateY(${(1 - spr) * -25}px) translateY(${waveFloat(0)}px)`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.gold,
                fontSize: 32,
                fontWeight: 700,
                transform: 'rotate(-4deg)',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                marginBottom: 6,
              }}
            >
              thực tế hơn nhé... ☕
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 38,
                fontWeight: 800,
                lineHeight: 1.3,
                textShadow: '0 2px 16px rgba(0,0,0,0.95), 0 4px 30px rgba(0,0,0,0.8)',
              }}
            >
              Kiếm tiền từ chuyên môn của bạn
              <br />
              <span style={{ color: BRAND.oliveLight, fontFamily: FONT_HANDWRITING, fontSize: 44 }}>
                bằng những cách nào?
              </span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 8, 9, 10 (25.8s - 32.7s): Giơ 1 ngón ➔ 01 • TƯ VẤN 1:1 + Chữ viết tay uốn lượn "cách nhanh nhất ⚡" */}
      {currentTime >= 25.8 && currentTime <= 32.7 && (() => {
        const sprNum = makeSpring(775);
        const sprHand = makeSpring(840);
        const sprDetail = makeSpring(900);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
              left: 50,
              right: 50,
              zIndex: 35,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  transform: `scale(${sprNum}) rotate(${waveRotate(0)}deg)`,
                  opacity: sprNum,
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${BRAND.wine} 0%, #A81E1E 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: BRAND.ivory,
                  fontFamily: FONT_DISPLAY,
                  fontSize: 26,
                  fontWeight: 900,
                  boxShadow: '0 4px 18px rgba(114,0,0,0.7)',
                }}
              >
                01
              </div>

              <div
                style={{
                  transform: `translateX(${(1 - sprNum) * -30}px)`,
                  opacity: sprNum,
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.ivory,
                  fontSize: 42,
                  fontWeight: 800,
                  textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                }}
              >
                TƯ VẤN 1:1
              </div>
            </div>

            {/* Handwriting floating annotation with tilt */}
            <div
              style={{
                transform: `translateX(${(1 - sprHand) * 40}px) rotate(-3deg) translateY(${waveFloat(8)}px)`,
                opacity: sprHand,
                fontFamily: FONT_HANDWRITING,
                color: BRAND.gold,
                fontSize: 34,
                fontWeight: 700,
                marginTop: 8,
                marginLeft: 66,
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}
            >
              ~ cách bắt đầu nhanh nhất để có dòng tiền ⚡
            </div>

            {currentTime >= 28.5 && (
              <div
                style={{
                  transform: `translateY(${(1 - sprDetail) * 15}px)`,
                  opacity: sprDetail,
                  fontFamily: FONT_BODY,
                  color: BRAND.beige,
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 8,
                  marginLeft: 66,
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                ✓ Giải quyết 1 vấn đề cụ thể cho khách hàng
              </div>
            )}
          </div>
        );
      })()}

      {/* BEAT 11, 12, 13 (33.6s - 40.0s): Giơ 2 ngón ➔ 02 • DỊCH VỤ ĐÓNG GÓI + LÀM ➔ BÀN GIAO ➔ XONG! (Đóng dấu) */}
      {currentTime >= 33.6 && currentTime <= 40.0 && (() => {
        const sprNum = makeSpring(1008);
        const sprFlow = makeSpring(1070);
        const sprStamp = makeSpring(1135);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
              left: 50,
              right: 50,
              zIndex: 35,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  transform: `scale(${sprNum}) rotate(${waveRotate(5)}deg)`,
                  opacity: sprNum,
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${BRAND.olive} 0%, #5E694E 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: BRAND.ivory,
                  fontFamily: FONT_DISPLAY,
                  fontSize: 26,
                  fontWeight: 900,
                  boxShadow: '0 4px 18px rgba(121,132,102,0.6)',
                }}
              >
                02
              </div>

              <div
                style={{
                  transform: `translateX(${(1 - sprNum) * -30}px)`,
                  opacity: sprNum,
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.ivory,
                  fontSize: 40,
                  fontWeight: 800,
                  textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                }}
              >
                DỊCH VỤ ĐÓNG GÓI
              </div>

              <div
                style={{
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.oliveLight,
                  fontSize: 26,
                  transform: 'rotate(-4deg)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                Productized Scope ~
              </div>
            </div>

            {/* 3 Steps: LÀM ➔ BÀN GIAO ➔ XONG! */}
            <div
              style={{
                transform: `scale(${sprFlow}) translateY(${waveFloat(14)}px)`,
                opacity: sprFlow,
                marginTop: 14,
                marginLeft: 66,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 800, color: BRAND.ivory, textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                1 Vấn đề rõ
              </span>
              <span style={{ color: BRAND.oliveLight, fontSize: 20 }}>➔</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 800, color: BRAND.ivory, textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                1 Phạm vi rõ
              </span>
              <span style={{ color: BRAND.oliveLight, fontSize: 20 }}>➔</span>

              {/* Slanted ink stamp effect for XONG! */}
              <span
                style={{
                  transform: `scale(${sprStamp}) rotate(-7deg)`,
                  opacity: sprStamp,
                  display: 'inline-block',
                  background: BRAND.wineGlow,
                  color: BRAND.ivory,
                  padding: '4px 14px',
                  borderRadius: 8,
                  fontFamily: FONT_DISPLAY,
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  boxShadow: '0 4px 18px rgba(220,38,38,0.7)',
                }}
              >
                XONG! ✓
              </span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 14, 15, 16 (40.2s - 48.0s): Giơ 3 ngón ➔ 03 • WORKSHOP / LỚP HỌC NHỎ + Đóng gói lặp lại */}
      {currentTime >= 40.2 && currentTime <= 48.0 && (() => {
        const sprNum = makeSpring(1206);
        const sprCohort = makeSpring(1320);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
              left: 50,
              right: 50,
              zIndex: 35,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  transform: `scale(${sprNum}) rotate(${waveRotate(10)}deg)`,
                  opacity: sprNum,
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${BRAND.gold} 0%, #B88924 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1A0A0C',
                  fontFamily: FONT_DISPLAY,
                  fontSize: 26,
                  fontWeight: 900,
                  boxShadow: '0 4px 18px rgba(224,181,84,0.6)',
                }}
              >
                03
              </div>

              <div
                style={{
                  transform: `translateX(${(1 - sprNum) * -30}px)`,
                  opacity: sprNum,
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.ivory,
                  fontSize: 40,
                  fontWeight: 800,
                  textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                }}
              >
                WORKSHOP NHỎ
              </div>

              <div
                style={{
                  fontFamily: FONT_HANDWRITING,
                  color: BRAND.gold,
                  fontSize: 28,
                  transform: 'rotate(-3deg)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                micro-cohort ~
              </div>
            </div>

            <div
              style={{
                transform: `translateY(${(1 - sprCohort) * 15}px) translateY(${waveFloat(4)}px)`,
                opacity: sprCohort,
                marginTop: 10,
                marginLeft: 66,
                fontFamily: FONT_HANDWRITING,
                color: BRAND.beige,
                fontSize: 30,
                fontWeight: 700,
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}
            >
              "Điều bạn hay phải giải thích ➔ trở thành lớp học nhiều người muốn học ✨"
            </div>
          </div>
        );
      })()}

      {/* BEAT 17, 18, 19 (48.9s - 61.1s): Giơ 4 ngón ➔ 04 • SẢN PHẨM SỐ + ĐÓNG GÓI 1 LẦN - BÁN NHIỀU LẦN */}
      {currentTime >= 48.9 && currentTime <= 61.1 && (() => {
        const sprNum = makeSpring(1467);
        const sprPill = makeSpring(1560);
        const sprMulti = makeSpring(1710);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
              left: 50,
              right: 50,
              zIndex: 35,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  transform: `scale(${sprNum}) rotate(${waveRotate(15)}deg)`,
                  opacity: sprNum,
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${BRAND.wineGlow} 0%, ${BRAND.wine} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: BRAND.ivory,
                  fontFamily: FONT_DISPLAY,
                  fontSize: 26,
                  fontWeight: 900,
                  boxShadow: '0 4px 18px rgba(220,38,38,0.7)',
                }}
              >
                04
              </div>

              <div
                style={{
                  transform: `translateX(${(1 - sprNum) * -30}px)`,
                  opacity: sprNum,
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.ivory,
                  fontSize: 40,
                  fontWeight: 800,
                  textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                }}
              >
                SẢN PHẨM SỐ
              </div>
            </div>

            {/* Organic freeform badges */}
            <div
              style={{
                transform: `scale(${sprPill})`,
                opacity: sprPill,
                marginTop: 10,
                marginLeft: 66,
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ color: BRAND.beige, fontFamily: FONT_BODY, fontSize: 18, fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                Template
              </span>
              <span style={{ color: BRAND.oliveLight }}>•</span>
              <span style={{ color: BRAND.beige, fontFamily: FONT_BODY, fontSize: 18, fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                Ebook
              </span>
              <span style={{ color: BRAND.oliveLight }}>•</span>
              <span style={{ color: BRAND.beige, fontFamily: FONT_BODY, fontSize: 18, fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                Bộ Hướng Dẫn
              </span>
            </div>

            {/* Handwriting highlight: Đóng gói 1 lần, bán nhiều lần */}
            <div
              style={{
                transform: `translateX(${(1 - sprMulti) * 30}px) rotate(-3deg) translateY(${waveFloat(10)}px)`,
                opacity: sprMulti,
                marginTop: 10,
                marginLeft: 66,
                fontFamily: FONT_HANDWRITING,
                color: BRAND.gold,
                fontSize: 34,
                fontWeight: 700,
                textShadow: '0 2px 14px rgba(0,0,0,0.95)',
              }}
            >
              💡 Đóng gói 1 lần ➔ Bán nhiều lần (thu nhập thụ động ✨)
            </div>
          </div>
        );
      })()}

      {/* BEAT 20 (62.0s - 65.5s): Lắc đầu nhẹ ➔ KHÔNG NHẤT THIẾT PHẢI MỞ BUSINESS NGAY */}
      {currentTime >= 62.0 && currentTime <= 65.5 && (() => {
        const spr = makeSpring(1860);
        return (
          <div
            style={{
              position: 'absolute',
              top: 145,
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
                color: BRAND.gold,
                fontSize: 34,
                fontWeight: 700,
                transform: 'rotate(-4deg)',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                marginBottom: 6,
              }}
            >
              nhưng thật ra ấy...
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 38,
                fontWeight: 800,
                textShadow: '0 2px 16px rgba(0,0,0,0.95), 0 4px 30px rgba(0,0,0,0.8)',
              }}
            >
              "Bạn không nhất thiết phải mở business ngay!"
            </div>
          </div>
        );
      })()}

      {/* BEAT 21, 22, 23 (66.2s - 80.8s): Đếm 3 lựa chọn ➔ Remote work • Freelance • Part-time ➔ Quyền chủ động */}
      {currentTime >= 66.2 && currentTime <= 80.8 && (() => {
        const spr = makeSpring(1986);
        const sprUnlock = makeSpring(2190);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              transform: `scale(${interpolate(spr, [0, 1], [0.93, 1.0])})`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.oliveLight,
                fontSize: 28,
                transform: 'rotate(-2deg)',
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              }}
            >
              những bước đệm linh hoạt ~
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 34,
                fontWeight: 800,
                marginTop: 6,
                textShadow: '0 2px 14px rgba(0,0,0,0.95)',
              }}
            >
              Remote Work • Freelance • Part-time Online
            </div>

            <div
              style={{
                transform: `scale(${sprUnlock}) translateY(${waveFloat(8)}px)`,
                opacity: sprUnlock,
                fontFamily: FONT_HANDWRITING,
                color: BRAND.gold,
                fontSize: 32,
                fontWeight: 700,
                marginTop: 8,
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}
            >
              🔓 Chỉ cần cho bạn nhiều quyền chủ động hơn!
            </div>
          </div>
        );
      })()}

      {/* BEAT 25, 26, 27, 28 (81.4s - 94.9s): Dành cho mẹ bỉm con nhỏ ➔ BẮT ĐẦU TỪ VIỆC NHỎ NHẤT */}
      {currentTime >= 81.4 && currentTime <= 94.9 && (() => {
        const spr = makeSpring(2442);
        const sprHand = makeSpring(2668);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
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
                color: BRAND.gold,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              }}
            >
              DÀNH CHO NGƯỜI CÓ CON NHỎ & ÍT THỜI GIAN 👶
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                color: BRAND.ivory,
                fontSize: 42,
                fontWeight: 800,
                marginTop: 8,
                textShadow: '0 2px 16px rgba(0,0,0,0.95)',
              }}
            >
              Hãy bắt đầu từ việc <span style={{ color: BRAND.wineGlow, textDecoration: 'underline' }}>NHỎ NHẤT</span>!
            </div>

            <div
              style={{
                transform: `rotate(-3deg) translateY(${waveFloat(10)}px)`,
                opacity: sprHand,
                fontFamily: FONT_HANDWRITING,
                color: BRAND.oliveLight,
                fontSize: 32,
                fontWeight: 700,
                marginTop: 8,
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}
            >
              "Một việc đủ nhỏ để kỹ năng hiện tại đã làm được ngay 🌱"
            </div>
          </div>
        );
      })()}

      {/* BEAT 29, 30, 31 (96.0s - 104.3s): 2 Tiêu chí kiểm chứng ➔ Có ai trả tiền? & FIT VỚI CUỘC SỐNG */}
      {currentTime >= 96.0 && currentTime <= 104.3 && (() => {
        const spr = makeSpring(2880);
        const spr1 = makeSpring(2950);
        const spr2 = makeSpring(3030);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
              left: 40,
              right: 40,
              zIndex: 35,
              textAlign: 'center',
              transform: `scale(${interpolate(spr, [0, 1], [0.93, 1.0])})`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.gold,
                fontSize: 32,
                transform: 'rotate(-3deg)',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}
            >
              2 bài test thực tế ⚖️
            </div>

            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <div
                style={{
                  transform: `translateX(${(1 - spr1) * -30}px)`,
                  opacity: spr1,
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.ivory,
                  fontSize: 28,
                  fontWeight: 800,
                  textShadow: '0 2px 12px rgba(0,0,0,0.95)',
                }}
              >
                1. Có ai thực sự trả tiền không?
              </div>

              <div
                style={{
                  transform: `translateX(${(1 - spr2) * 30}px) translateY(${waveFloat(4)}px)`,
                  opacity: spr2,
                  fontFamily: FONT_DISPLAY,
                  color: BRAND.oliveLight,
                  fontSize: 30,
                  fontWeight: 800,
                  textShadow: '0 2px 14px rgba(0,0,0,0.95)',
                }}
              >
                2. Cách làm đó có <span style={{ color: BRAND.gold }}>FIT với cuộc sống</span> không?
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 32, 33, 34, 35 (105.1s - 116.3s): CUỘC SỐNG ≠ XOAY QUANH CÔNG VIỆC ➔ Follow mình nhé ✨ */}
      {currentTime >= 105.1 && currentTime <= 116.3 && (() => {
        const spr = makeSpring(3153);
        const sprFollow = makeSpring(3340);
        return (
          <div
            style={{
              position: 'absolute',
              top: 135,
              left: 40,
              right: 40,
              zIndex: 40,
              textAlign: 'center',
              transform: `scale(${interpolate(spr, [0, 1], [0.93, 1.0])})`,
              opacity: spr,
            }}
          >
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 38,
                fontWeight: 900,
                color: BRAND.ivory,
                textShadow: '0 2px 16px rgba(0,0,0,0.95)',
                lineHeight: 1.25,
              }}
            >
              CUỘC SỐNG <span style={{ color: BRAND.wineGlow }}>≠</span> XOAY QUANH CÔNG VIỆC
            </div>

            {/* Floating button */}
            <div
              style={{
                transform: `scale(${sprFollow}) translateY(${waveFloat(8)}px)`,
                opacity: sprFollow,
                marginTop: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: `linear-gradient(135deg, ${BRAND.wineGlow} 0%, ${BRAND.wine} 100%)`,
                padding: '12px 26px',
                borderRadius: 30,
                color: BRAND.ivory,
                boxShadow: '0 6px 24px rgba(220,38,38,0.6)',
              }}
            >
              <span style={{ fontSize: 20 }}>👉</span>
              <span style={{ fontFamily: FONT_BODY, fontWeight: 900, fontSize: 19 }}>Follow để cùng đồng hành</span>
              <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.gold, fontSize: 26 }}>✨</span>
            </div>

            <div
              style={{
                fontFamily: FONT_HANDWRITING,
                color: BRAND.beige,
                fontSize: 28,
                marginTop: 10,
                transform: 'rotate(-2deg)',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}
            >
              "Mình sẽ thử và ghi lại tất cả ở đây nha ~"
            </div>
          </div>
        );
      })()}

      {/* ─── 3. NATURAL SFX & LOFI BGM ─── */}
      <Audio src={staticFile('library/music/clips/lofi-warm.mp3')} volume={0.05} loop />

      {/* Gentle organic clicks / page turns */}
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

      {/* ─── 4. SLEEK FLOATING SUBTITLES (ZERO WHITE BOXES) ─── */}
      {activeSub && (() => {
        const subDuration = Math.max(0.1, activeSub.e - activeSub.s);
        const progress = Math.max(0, Math.min(1, (currentTime - activeSub.s) / subDuration));
        const words = activeSub.text.split(' ');
        const activeWordIndex = Math.min(words.length - 1, Math.floor(progress * words.length));

        return (
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              left: 40,
              right: 40,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                maxWidth: 960,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '8px 12px',
                lineHeight: 1.35,
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
                      fontSize: 34,
                      fontWeight: isCurrent ? 900 : 700,
                      color: isCurrent ? BRAND.wineGlow : isPast ? BRAND.ivory : 'rgba(248, 245, 242, 0.60)',
                      transform: isCurrent ? 'scale(1.15) translateY(-2px)' : 'scale(1.0)',
                      backgroundColor: isCurrent ? 'rgba(220, 38, 38, 0.18)' : 'transparent',
                      padding: isCurrent ? '2px 10px' : '2px 0',
                      borderRadius: 10,
                      display: 'inline-block',
                      transition: 'all 0.08s ease',
                      textShadow: isCurrent
                        ? '0 0 20px rgba(220,38,38,0.8), 0 2px 12px rgba(0,0,0,0.95)'
                        : '0 2px 10px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.85)',
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
