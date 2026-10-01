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

  // 1. Organic Handheld Drift
  const driftX = Math.sin(frame / 42) * 2.2;
  const driftY = Math.cos(frame / 52) * 1.6;
  const driftRotate = Math.sin(frame / 65) * 0.1;

  // 2. Punch-Ins on storytelling beats
  let baseZoom = 1.0;
  if (currentTime >= 0.0 && currentTime < 5.6) {
    baseZoom = 1.04;
  } else if (currentTime >= 18.28 && currentTime < 24.58) {
    baseZoom = 1.08; // Punch-in lúc nói chuyện thực tế & đặt câu hỏi
  } else if (currentTime >= 62.06 && currentTime < 65.5) {
    baseZoom = 1.07;
  } else if (currentTime >= 88.94 && currentTime < 94.94) {
    baseZoom = 1.08;
  } else if (currentTime >= 111.44) {
    baseZoom = 1.10;
  }

  const makeSpring = (startFrame: number, damping = 16, stiffness = 140) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping, stiffness, mass: 0.8 },
    });
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.wineDark, overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* ─── MASTER VIDEO FOOTAGE (100% TALKING HEAD) ─── */}
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

          {/* Vignette bottom gradient for subtitle readability */}
          <AbsoluteFill
            style={{
              background: 'linear-gradient(to top, rgba(32, 2, 4, 0.75) 0%, rgba(32, 2, 4, 0) 28%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ─── 35 MASTER GESTURE-SYNCED GRAPHIC BEATS ─── */}

      {/* BEAT 1 (0.0s - 5.6s): Hai tay cân hai phía: KIẾM TIỀN ≠ CÔNG VIỆC CHIẾM HẾT CUỘC SỐNG */}
      {currentTime >= 0.5 && currentTime <= 5.5 && (() => {
        const sprLeft = makeSpring(15);
        const sprRight = makeSpring(35);
        const sprCenter = makeSpring(55);
        return (
          <div style={{ position: 'absolute', top: 130, left: 40, right: 40, zIndex: 35, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: BRAND.ivory, borderRadius: 26, padding: '22px 28px', border: `2px solid ${BRAND.wine}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ background: BRAND.wine, color: BRAND.ivory, padding: '4px 12px', borderRadius: 14, fontSize: 12, fontWeight: 800 }}>
                  TRIẾT LÝ CÂN BẰNG 🌿
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.olive, fontSize: 24 }}>
                  life-first ~
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ transform: `translateX(${(1 - sprLeft) * -40}px)`, opacity: sprLeft, background: BRAND.beigeSoft, color: BRAND.wine, padding: '10px 18px', borderRadius: 16, fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 22 }}>
                  KIẾM TIỀN
                </div>
                <div style={{ transform: `scale(${sprCenter})`, opacity: sprCenter, color: BRAND.wine, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 32 }}>
                  ≠
                </div>
                <div style={{ transform: `translateX(${(1 - sprRight) * 40}px)`, opacity: sprRight, background: 'rgba(114, 0, 0, 0.12)', color: BRAND.wineDark, border: `1.5px solid ${BRAND.wine}`, padding: '10px 18px', borderRadius: 16, fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 22 }}>
                  VIỆC CHIẾM HẾT CUỘC SỐNG
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 2 & 3 (6.0s - 11.0s): Chỉ vào mình ➔ Sia • Mẹ của nhóc 2 tuổi (dòng 1) & Điều hành business nhỏ (dòng 2) */}
      {currentTime >= 6.0 && currentTime <= 11.0 && (() => {
        const spr1 = makeSpring(180);
        const spr2 = makeSpring(250);
        return (
          <div style={{ position: 'absolute', top: 140, left: 45, zIndex: 35, transform: `translateX(${(1 - spr1) * -40}px)`, opacity: spr1 }}>
            <div style={{ background: BRAND.ivory, borderRadius: 24, padding: '16px 24px', border: `2px solid ${BRAND.olive}`, boxShadow: '0 20px 45px rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${BRAND.wine} 0%, ${BRAND.olive} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND.ivory, fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 22 }}>
                S
              </div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, color: BRAND.wine, fontWeight: 800, fontSize: 22 }}>
                  Sia • Mẹ của nhóc 2 tuổi
                </div>
                {currentTime >= 8.3 && (
                  <div style={{ transform: `translateY(${(1 - spr2) * 10}px)`, opacity: spr2, fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 22, marginTop: 2, fontWeight: 700 }}>
                    ✨ Điều hành một solo business siêu nhỏ
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 4 & 5 (12.0s - 17.4s): Giơ 3 ngón ➔ Title card cố định: LIFE-FIRST BUSINESS • TẬP 3 ➔ Cuộc sống trước ➔ Business sau */}
      {currentTime >= 11.8 && currentTime <= 17.4 && (() => {
        const sprTitle = makeSpring(355);
        const sprLife = makeSpring(420);
        const sprBiz = makeSpring(465);
        return (
          <div style={{ position: 'absolute', top: 130, left: 40, right: 40, zIndex: 35, transform: `scale(${interpolate(sprTitle, [0, 1], [0.94, 1.0])})`, opacity: sprTitle }}>
            <div style={{ background: BRAND.wine, borderRadius: 26, padding: '24px 30px', border: `2px solid ${BRAND.gold}`, boxShadow: '0 20px 50px rgba(0,0,0,0.65)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.gold, fontWeight: 800, fontSize: 13, letterSpacing: 2 }}>
                  SERIES: LIFE-FIRST BUSINESS
                </span>
                <span style={{ background: BRAND.gold, color: BRAND.wineDark, padding: '3px 12px', borderRadius: 12, fontWeight: 900, fontSize: 12 }}>
                  TẬP 03
                </span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, color: BRAND.ivory, fontSize: 24, fontWeight: 800, marginTop: 10 }}>
                Xây dựng mô hình từ cuộc sống mong muốn trước
              </div>
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ transform: `translateX(${(1 - sprLife) * -20}px)`, opacity: sprLife, background: BRAND.olive, color: BRAND.ivory, padding: '6px 14px', borderRadius: 12, fontWeight: 700, fontSize: 15 }}>
                  CUỘC SỐNG TRƯỚC
                </span>
                <span style={{ color: BRAND.gold, fontWeight: 900 }}>➔</span>
                <span style={{ transform: `translateX(${(1 - sprBiz) * 20}px)`, opacity: sprBiz, background: BRAND.ivory, color: BRAND.wineDark, padding: '6px 14px', borderRadius: 12, fontWeight: 800, fontSize: 15 }}>
                  BUSINESS SAU
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 7 (20.7s - 24.8s): Hai tay mở ra kiểu câu hỏi ➔ CHUYÊN MÔN ➔ KIẾM TIỀN BẰNG CÁCH NÀO? */}
      {currentTime >= 20.5 && currentTime <= 24.8 && (() => {
        const spr = makeSpring(615);
        return (
          <div style={{ position: 'absolute', top: 135, left: 40, right: 40, zIndex: 35, transform: `translateY(${(1 - spr) * -20}px)`, opacity: spr }}>
            <div style={{ background: BRAND.ivory, borderRadius: 26, padding: '24px 32px', border: `2px solid ${BRAND.wine}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.wine, fontWeight: 900, fontSize: 13, letterSpacing: 2 }}>
                  BÀI TOÁN THỰC TẾ 💡
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.olive, fontSize: 22 }}>
                  thực tế hơn nhé...
                </span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, color: BRAND.wineDark, fontWeight: 800, fontSize: 25, marginTop: 8, lineHeight: 1.35 }}>
                Chuyên môn của bản thân ➔ Kiếm tiền bằng những cách nào?
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 8, 9, 10 (25.8s - 32.7s): Giơ 1 ngón ➔ Card 01 TƯ VẤN 1:1 + 1 Vấn Đề Cụ Thể + Bắt Đầu Nhanh */}
      {currentTime >= 25.8 && currentTime <= 32.7 && (() => {
        const sprCard = makeSpring(775);
        const sprDetail = makeSpring(855);
        const sprFast = makeSpring(920);
        return (
          <div style={{ position: 'absolute', top: 125, left: 40, right: 40, zIndex: 35, transform: `scale(${interpolate(sprCard, [0, 1], [0.93, 1.0])})`, opacity: sprCard }}>
            <div style={{ background: BRAND.ivory, borderRadius: 26, padding: '24px 30px', border: `2px solid ${BRAND.wine}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: BRAND.wine, color: BRAND.ivory, padding: '4px 12px', borderRadius: 10, fontSize: 13, fontWeight: 900 }}>
                    01
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wine, fontSize: 23, fontWeight: 800 }}>
                    TƯ VẤN 1:1
                  </span>
                </div>
                <span style={{ transform: `scale(${sprFast})`, opacity: sprFast, fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 22, fontWeight: 700 }}>
                  cách nhanh nhất ⚡
                </span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ transform: `translateY(${(1 - sprDetail) * 10}px)`, opacity: sprDetail, background: 'rgba(121, 132, 102, 0.15)', color: BRAND.oliveDark, padding: '6px 14px', borderRadius: 12, fontSize: 15, fontWeight: 700 }}>
                  🎯 1 Vấn đề cụ thể
                </span>
                <span style={{ transform: `translateY(${(1 - sprDetail) * 10}px)`, opacity: sprDetail, background: 'rgba(121, 132, 102, 0.15)', color: BRAND.oliveDark, padding: '6px 14px', borderRadius: 12, fontSize: 15, fontWeight: 700 }}>
                  ⚡ Bắt đầu nhanh nhất
                </span>
              </div>
              <div style={{ color: BRAND.wineDark, fontSize: 15, marginTop: 10, fontWeight: 600 }}>
                Chuyên môn đủ sâu để giải quyết vấn đề cho khách hàng
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 11, 12, 13 (33.6s - 40.0s): Giơ 2 ngón ➔ Card 02 DỊCH VỤ ĐÓNG GÓI + 2 Box khóa vào nhau + LÀM ➔ BÀN GIAO ➔ XONG */}
      {currentTime >= 33.6 && currentTime <= 40.0 && (() => {
        const sprCard = makeSpring(1008);
        const sprBoxes = makeSpring(1068);
        const sprStamp = makeSpring(1135);
        return (
          <div style={{ position: 'absolute', top: 125, left: 40, right: 40, zIndex: 35, transform: `scale(${interpolate(sprCard, [0, 1], [0.93, 1.0])})`, opacity: sprCard }}>
            <div style={{ background: BRAND.ivory, borderRadius: 26, padding: '24px 30px', border: `2px solid ${BRAND.olive}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: BRAND.olive, color: BRAND.ivory, padding: '4px 12px', borderRadius: 10, fontSize: 13, fontWeight: 900 }}>
                    02
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wineDark, fontSize: 23, fontWeight: 800 }}>
                    DỊCH VỤ ĐÓNG GÓI
                  </span>
                </div>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.wine, fontSize: 22, fontWeight: 700 }}>
                  Productized Service ~
                </span>
              </div>
              {/* Hai box khóa vào nhau */}
              <div style={{ transform: `scale(${sprBoxes})`, opacity: sprBoxes, marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '7px 14px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: `1px solid ${BRAND.beige}` }}>
                  🔒 1 Vấn Đề Rõ
                </span>
                <span style={{ alignSelf: 'center', color: BRAND.olive, fontWeight: 900 }}>+</span>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '7px 14px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: `1px solid ${BRAND.beige}` }}>
                  🔒 1 Phạm Vi Rõ
                </span>
              </div>
              {/* Quy trình LÀM ➔ BÀN GIAO ➔ XONG đóng dấu */}
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ color: BRAND.wineDark, fontWeight: 700, fontSize: 15 }}>LÀM</span>
                <span style={{ color: BRAND.olive, fontWeight: 900 }}>➔</span>
                <span style={{ color: BRAND.wineDark, fontWeight: 700, fontSize: 15 }}>BÀN GIAO</span>
                <span style={{ color: BRAND.olive, fontWeight: 900 }}>➔</span>
                <span style={{ transform: `scale(${sprStamp})`, opacity: sprStamp, background: BRAND.wine, color: BRAND.ivory, padding: '4px 14px', borderRadius: 8, fontWeight: 900, fontSize: 15, boxShadow: '0 4px 12px rgba(114,0,0,0.4)' }}>
                  XONG! ✓
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 14, 15, 16 (40.2s - 48.0s): Giơ 3 ngón ➔ Card 03 WORKSHOP + Giải thích lặp lại ➔ 1 Nội dung cho nhiều người */}
      {currentTime >= 40.2 && currentTime <= 48.0 && (() => {
        const sprCard = makeSpring(1206);
        const sprBubble = makeSpring(1300);
        const sprCohort = makeSpring(1380);
        return (
          <div style={{ position: 'absolute', top: 125, left: 40, right: 40, zIndex: 35, transform: `scale(${interpolate(sprCard, [0, 1], [0.93, 1.0])})`, opacity: sprCard }}>
            <div style={{ background: BRAND.ivory, borderRadius: 26, padding: '24px 30px', border: `2px solid ${BRAND.gold}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: BRAND.gold, color: BRAND.wineDark, padding: '4px 12px', borderRadius: 10, fontSize: 13, fontWeight: 900 }}>
                    03
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wineDark, fontSize: 23, fontWeight: 800 }}>
                    WORKSHOP / LỚP NHỎ
                  </span>
                </div>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 22 }}>
                  micro-cohort ~
                </span>
              </div>
              {/* Bubble lặp lại */}
              <div style={{ transform: `translateY(${(1 - sprBubble) * 10}px)`, opacity: sprBubble, marginTop: 12, background: 'rgba(194, 155, 56, 0.15)', borderRadius: 12, padding: '8px 14px', color: BRAND.wineDark, fontSize: 14, fontWeight: 700 }}>
                🔄 Giải thích ➔ Lặp lại ➔ Lặp lại cho nhiều người
              </div>
              {/* 1 Nội dung ➔ Nhiều người */}
              <div style={{ transform: `scale(${sprCohort})`, opacity: sprCohort, marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wine, fontSize: 17, fontWeight: 700 }}>
                  1 Nội dung chuẩn bị ➔ Nhiều người cùng học!
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 20 }}>
                  đòn bẩy thời gian ✨
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 17, 18, 19 (48.9s - 61.1s): Giơ 4 ngón ➔ Card 04 SẢN PHẨM SỐ + Đếm nhanh tag + Đóng gói 1 lần bán nhiều lần */}
      {currentTime >= 48.9 && currentTime <= 61.1 && (() => {
        const sprCard = makeSpring(1467);
        const sprTag1 = makeSpring(1545);
        const sprTag2 = makeSpring(1600);
        const sprTag3 = makeSpring(1650);
        const sprMultiplier = makeSpring(1710);
        return (
          <div style={{ position: 'absolute', top: 125, left: 40, right: 40, zIndex: 35, transform: `scale(${interpolate(sprCard, [0, 1], [0.93, 1.0])})`, opacity: sprCard }}>
            <div style={{ background: BRAND.ivory, borderRadius: 26, padding: '24px 30px', border: `2px solid ${BRAND.wine}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: BRAND.wine, color: BRAND.ivory, padding: '4px 12px', borderRadius: 10, fontSize: 13, fontWeight: 900 }}>
                    04
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: BRAND.wine, fontSize: 23, fontWeight: 800 }}>
                    SẢN PHẨM SỐ
                  </span>
                </div>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 22 }}>
                  Digital Products ~
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                <span style={{ transform: `scale(${sprTag1})`, opacity: sprTag1, background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 12px', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>
                  📄 Template
                </span>
                <span style={{ transform: `scale(${sprTag2})`, opacity: sprTag2, background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 12px', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>
                  📚 Ebook
                </span>
                <span style={{ transform: `scale(${sprTag3})`, opacity: sprTag3, background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 12px', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>
                  🛠️ Bộ Hướng Dẫn
                </span>
              </div>
              <div style={{ transform: `translateY(${(1 - sprMultiplier) * 10}px)`, opacity: sprMultiplier, marginTop: 12, background: BRAND.wine, borderRadius: 14, padding: '10px 16px', color: BRAND.ivory, fontSize: 16, fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>💡 LÀM 1 LẦN ➔ BÁN NHIỀU LẦN</span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.gold, fontSize: 22 }}>
                  thu nhập thụ động ✨
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 20 (62.0s - 65.5s): Lắc đầu nhẹ ➔ KHÔNG NHẤT THIẾT PHẢI MỞ BUSINESS NGAY */}
      {currentTime >= 62.0 && currentTime <= 65.5 && (() => {
        const spr = makeSpring(1860);
        return (
          <div style={{ position: 'absolute', top: 140, left: 40, right: 40, zIndex: 35, transform: `translateY(${(1 - spr) * -20}px)`, opacity: spr }}>
            <div style={{ background: BRAND.ivory, borderRadius: 24, padding: '22px 30px', border: `2px solid ${BRAND.olive}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center' }}>
              <div style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 24, fontWeight: 700 }}>
                nhưng thật ra ấy...
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, color: BRAND.wine, fontWeight: 800, fontSize: 25, marginTop: 6 }}>
                "Bạn không nhất thiết phải mở business ngay!"
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 21, 22, 23, 24 (66.2s - 80.8s): Đếm 3 lựa chọn ➔ LÀM TỪ XA • FREELANCE • PART-TIME ➔ Điểm bắt đầu ➔ Chủ động thời gian & địa điểm */}
      {currentTime >= 66.2 && currentTime <= 80.8 && (() => {
        const sprCard = makeSpring(1986);
        const sprUnlock = makeSpring(2190);
        return (
          <div style={{ position: 'absolute', top: 125, left: 40, right: 40, zIndex: 35, transform: `scale(${interpolate(sprCard, [0, 1], [0.93, 1.0])})`, opacity: sprCard }}>
            <div style={{ background: BRAND.ivory, borderRadius: 26, padding: '24px 30px', border: `2px solid ${BRAND.olive}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.oliveDark, fontWeight: 800, fontSize: 13, letterSpacing: 2 }}>
                  BƯỚC ĐỆM BỀN VỮNG
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.wine, fontSize: 22 }}>
                  cũng là điểm bắt đầu ~
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 12px', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>
                  Remote Work
                </span>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 12px', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>
                  Freelance
                </span>
                <span style={{ background: BRAND.beigeSoft, color: BRAND.wineDark, padding: '6px 12px', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>
                  Part-time Online
                </span>
              </div>
              <div style={{ transform: `scale(${sprUnlock})`, opacity: sprUnlock, marginTop: 12, background: 'rgba(121, 132, 102, 0.15)', borderRadius: 12, padding: '8px 14px', color: BRAND.oliveDark, fontSize: 15, fontWeight: 700 }}>
                🔓 CHỦ ĐỘNG HƠN VỀ THỜI GIAN & ĐỊA ĐIỂM
              </div>
              <div style={{ color: BRAND.wineDark, fontSize: 14, marginTop: 8, fontWeight: 600 }}>
                Đôi khi chỉ cần như thế đã là thay đổi rất lớn rồi!
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 25, 26, 27, 28 (81.4s - 94.9s): Không cần làm tất cả ➔ Quỹ thời gian ít ➔ Bắt đầu từ việc NHỎ NHẤT ➔ Đủ giỏi để kiếm tiền */}
      {currentTime >= 81.4 && currentTime <= 94.9 && (() => {
        const sprCard = makeSpring(2442);
        const sprSmall = makeSpring(2668);
        return (
          <div style={{ position: 'absolute', top: 125, left: 40, right: 40, zIndex: 35, transform: `scale(${interpolate(sprCard, [0, 1], [0.93, 1.0])})`, opacity: sprCard }}>
            <div style={{ background: BRAND.ivory, borderRadius: 26, padding: '24px 32px', border: `2px solid ${BRAND.wine}`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.wine, fontWeight: 800, fontSize: 12, letterSpacing: 1.5 }}>
                  NGƯỜI CÓ CON NHỎ & ÍT THỜI GIAN 👶
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.olive, fontSize: 20 }}>
                  không cần làm tất cả ~
                </span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, color: BRAND.wineDark, fontWeight: 800, fontSize: 25, marginTop: 8 }}>
                Hãy bắt đầu từ việc NHỎ NHẤT!
              </div>
              <div style={{ transform: `scale(${sprSmall})`, opacity: sprSmall, marginTop: 10, background: 'rgba(114,0,0,0.08)', border: `1px solid ${BRAND.wine}`, borderRadius: 12, padding: '8px 14px', color: BRAND.wine, fontSize: 15, fontWeight: 700 }}>
                🌱 Một việc đủ nhỏ để kỹ năng hiện tại đã <strong style={{ textDecoration: 'underline' }}>ĐỦ GIỎI</strong> để làm được ngay.
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 29, 30, 31 (96.0s - 104.3s): Thử nhỏ trước ➔ Có ai trả tiền? ➔ FIT VỚI CUỘC SỐNG */}
      {currentTime >= 96.0 && currentTime <= 104.3 && (() => {
        const sprCard = makeSpring(2880);
        const sprTest1 = makeSpring(2950);
        const sprTest2 = makeSpring(3030);
        return (
          <div style={{ position: 'absolute', top: 125, left: 40, right: 40, zIndex: 35, transform: `scale(${interpolate(sprCard, [0, 1], [0.93, 1.0])})`, opacity: sprCard }}>
            <div style={{ background: BRAND.wine, borderRadius: 26, padding: '24px 32px', border: `2px solid ${BRAND.gold}`, boxShadow: '0 20px 50px rgba(0,0,0,0.65)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: BRAND.gold, fontWeight: 900, fontSize: 13, letterSpacing: 2 }}>
                  2 BÀI TEST KIỂM CHỨNG THỰC TẾ ⚖️
                </span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.beigeSoft, fontSize: 22 }}>
                  thử nhỏ trước ~
                </span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ transform: `translateX(${(1 - sprTest1) * -20}px)`, opacity: sprTest1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 16px', color: BRAND.ivory, fontSize: 16, fontWeight: 700 }}>
                  1. Có ai thực sự trả tiền không? (Nhu cầu thật)
                </div>
                <div style={{ transform: `translateX(${(1 - sprTest2) * 20}px)`, opacity: sprTest2, background: BRAND.gold, borderRadius: 12, padding: '10px 16px', color: BRAND.wineDark, fontSize: 16, fontWeight: 800 }}>
                  2. Cách làm đó có FIT với cuộc sống của bạn không?
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 32, 33, 34, 35 (105.1s - 116.3s): Bạn đang tìm cách nào? ➔ Cuộc sống ≠ xoay quanh công việc ➔ FOLLOW & MÌNH THỬ - MÌNH GHI LẠI */}
      {currentTime >= 105.1 && currentTime <= 116.3 && (() => {
        const sprCard = makeSpring(3153);
        const sprFollow = makeSpring(3340);
        return (
          <div style={{ position: 'absolute', top: 125, left: 40, right: 40, zIndex: 40, transform: `scale(${interpolate(sprCard, [0, 1], [0.93, 1.0])})`, opacity: sprCard }}>
            <div style={{ background: BRAND.ivory, borderRadius: 28, padding: '26px 34px', border: `2.5px solid ${BRAND.wine}`, boxShadow: '0 25px 70px rgba(0,0,0,0.55)', textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: BRAND.olive, letterSpacing: 2, textTransform: 'uppercase' }}>
                ĐỒNG HÀNH CÙNG SIA 🌿
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 900, color: BRAND.wine, marginTop: 6 }}>
                CUỘC SỐNG ≠ XOAY QUANH CÔNG VIỆC
              </div>
              <div style={{ transform: `scale(${sprFollow})`, opacity: sprFollow, marginTop: 12, background: BRAND.wine, borderRadius: 16, padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: 10, color: BRAND.ivory, boxShadow: '0 8px 24px rgba(114,0,0,0.4)' }}>
                <span style={{ fontSize: 18 }}>👉</span>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 900, fontSize: 17 }}>Follow để theo dõi hành trình</span>
                <span style={{ fontFamily: FONT_HANDWRITING, color: BRAND.gold, fontSize: 22 }}>✨</span>
              </div>
              <div style={{ fontFamily: FONT_HANDWRITING, color: BRAND.oliveDark, fontSize: 22, marginTop: 8 }}>
                "Mình tiếp tục thử & ghi lại tất cả ở đây nha ~"
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── NATURAL SFX & LOFI BGM ─── */}
      <Audio src={staticFile('library/music/clips/lofi-warm.mp3')} volume={0.05} loop />

      {/* Subtle organic click/page turns synced to key beats */}
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

      {/* ─── WARM EDITORIAL SUBTITLE PILL ─── */}
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
