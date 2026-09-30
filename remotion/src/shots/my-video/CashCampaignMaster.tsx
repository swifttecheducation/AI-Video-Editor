import React from 'react';
import {
  AbsoluteFill,
  Video,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { COLORS } from '../../brand';

export const compositionConfig = {
  id: 'CashCampaignMaster',
  durationInSeconds: 79.52,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Precise captions for all 8 storytelling scenes
const CAPTIONS = [
  { s: 0.1, e: 3.8, text: 'Nếu ngày mai cần thêm doanh thu, các bạn solo expert hãy tạo ngay cái này mới nhé!' },
  { s: 3.9, e: 8.9, text: 'Ủa, phải tạo sản phẩm mới chứ? Không thì ít nhất cũng phải có định dạng nội dung mới hay thêm kênh mới chứ?' },
  { s: 9.0, e: 14.5, text: 'Thế mà... thì còn khướt mới ra được doanh thu!' },
  { s: 14.6, e: 18.5, text: 'Bây giờ muốn ra doanh thu nhanh, thì mình nhìn lại xem mình có nguồn lực gì, tài sản gì,' },
  { s: 18.6, e: 23.2, text: 'xong tìm cách kích hoạt lại chúng. Chứ cứ FOMO chạy theo bên ngoài thì còn khướt...' },
  { s: 23.3, e: 27.2, text: 'Thế bác làm solo 2 năm rồi thì đã từng bán được sản phẩm nào chưa?' },
  { s: 27.3, e: 31.4, text: 'Ebook này, Template này, hay là Workshop? Workshop phải có recording nhé!' },
  { s: 31.5, e: 38.6, text: 'À, thế thì cũng còn mấy cái recording Workshop từ ngày xưa, cũng có nhiều người feedback khen phết!' },
  { s: 38.7, e: 45.2, text: 'Thế thử sửa sang đóng gói lại cho phù hợp hiện tại, rồi mình làm Flash Sale đi!' },
  { s: 45.3, e: 49.5, text: 'Flash Sale trong vòng 2 - 3 ngày thôi chẳng hạn.' },
  { s: 49.6, e: 55.6, text: 'Nhớ đừng bán trơ trọi recording, mà phải có sample, tài liệu và hướng dẫn để người ta thực hành được!' },
  { s: 55.7, e: 64.6, text: 'Vừa rồi là Flash Sale Campaign — 1 trong 7 loại Cash Campaign ra tiền nhanh cho Solo Experts, Coach và Consultant.' },
  { s: 64.7, e: 71.5, text: 'Mình có series 7 bài viết chuyên sâu về 7 loại Cash Campaign, link mình để ở dưới comment.' },
  { s: 71.6, e: 79.5, text: 'Mọi người có thể đọc và soi chiếu xem tài sản của mình phù hợp với chiến dịch nào nha. Bye bye!' },
];

export const CashCampaignMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const activeCaption = CAPTIONS.find((c) => currentTime >= c.s && currentTime <= c.e);

  // Reusable spring builder
  const makeSpring = (startFrame: number, durationFrames = 15) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping: 14, stiffness: 120, mass: 0.8 },
    });
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0B0A', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* 1. MASTER VIDEO FOOTAGE (1080x1920 VERTICAL REEL) */}
      <AbsoluteFill>
        <Video
          src={staticFile('rough_cut_master.mp4')}
          volume={1.0}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* 2. SUBTLE PROCEDURAL SFX TRIGGERS */}
      {frame === 5 && <Audio src={staticFile('sfx/pop.wav')} volume={0.4} />}
      {frame === 115 && <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />}
      {frame === 270 && <Audio src={staticFile('sfx/bass_thud.wav')} volume={0.4} />}
      {frame === 700 && <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />}
      {frame === 765 && <Audio src={staticFile('sfx/pop.wav')} volume={0.35} />}
      {frame === 815 && <Audio src={staticFile('sfx/pop.wav')} volume={0.35} />}
      {frame === 870 && <Audio src={staticFile('sfx/ding.wav')} volume={0.45} />}
      {frame === 945 && <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />}
      {frame === 1160 && <Audio src={staticFile('sfx/pop.wav')} volume={0.4} />}
      {frame === 1670 && <Audio src={staticFile('sfx/ding.wav')} volume={0.45} />}
      {frame === 1940 && <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />}

      {/* 3. VISUAL GRAPHIC OVERLAYS & CARDS */}

      {/* BEAT 1: HOOK HEADLINE BANNER (0.2s - 3.8s) */}
      {currentTime >= 0.2 && currentTime <= 3.8 && (() => {
        const spr = makeSpring(6);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 54,
              right: 54,
              background: 'rgba(248, 245, 242, 0.94)',
              backdropFilter: 'blur(16px)',
              border: `2px solid ${COLORS.line}`,
              borderRadius: 24,
              padding: '24px 32px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              transform: `scale(${0.9 + 0.1 * spr}) translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              textAlign: 'center',
            }}
          >
            <div style={{ color: COLORS.accent2, fontFamily: FONT_MONO, fontSize: 22, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
              TĂNG DOANH THU NHANH
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 700, color: COLORS.accent, lineHeight: 1.25 }}>
              Nếu Ngày Mai Cần Doanh Thu Gấp?
            </div>
          </div>
        );
      })()}

      {/* BEAT 2: SKEPTICAL CREATOR PERSONA BADGE (3.9s - 8.9s) */}
      {currentTime >= 3.9 && currentTime <= 8.9 && (() => {
        const spr = makeSpring(120);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 60,
              right: 60,
              background: 'rgba(248, 245, 242, 0.92)',
              backdropFilter: 'blur(16px)',
              border: `2px solid ${COLORS.accent}`,
              borderRadius: 22,
              padding: '20px 28px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
              transform: `scale(${0.9 + 0.1 * spr})`,
              opacity: spr,
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'inline-block', background: COLORS.accent, color: '#fff', fontSize: 18, fontWeight: 700, padding: '4px 14px', borderRadius: 999, marginBottom: 8, letterSpacing: 1.5 }}>
              CÂU HỎI QUEN THUỘC
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 600, color: COLORS.ink, lineHeight: 1.3 }}>
              "Ủa, phải làm sản phẩm mới, nội dung mới chứ?"
            </div>
          </div>
        );
      })()}

      {/* BEAT 3: CORE PRINCIPLE: KÍCH HOẠT TÀI SẢN (9.0s - 23.2s) */}
      {currentTime >= 11.5 && currentTime <= 22.8 && (() => {
        const spr = makeSpring(345);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 54,
              right: 54,
              background: 'rgba(248, 245, 242, 0.94)',
              backdropFilter: 'blur(20px)',
              border: `2px solid ${COLORS.accent2}`,
              borderRadius: 26,
              padding: '28px 32px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              transform: `translateY(${(1 - spr) * 20}px)`,
              opacity: spr,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 26 }}>⚡</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: COLORS.accent2, letterSpacing: 2 }}>
                NGUYÊN TẮC VÀNG
              </span>
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 42, fontWeight: 700, color: COLORS.accent, lineHeight: 1.3, marginBottom: 12 }}>
              Kích Hoạt Tài Sản Có Sẵn
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: COLORS.muted, lineHeight: 1.4 }}>
              Đừng vội tạo mới hay FOMO theo bên ngoài — hãy nhìn lại nguồn lực bạn đã có!
            </div>
          </div>
        );
      })()}

      {/* BEAT 4: ASSET CHECKLIST (23.3s - 31.4s) */}
      {currentTime >= 24.5 && currentTime <= 31.4 && (() => {
        const sprItem1 = makeSpring(740);
        const sprItem2 = makeSpring(780);
        const sprItem3 = makeSpring(820);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 60,
              right: 60,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                border: `2px solid ${COLORS.line}`,
                borderRadius: 20,
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `translateX(${(1 - sprItem1) * -40}px)`,
                opacity: sprItem1,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22 }}>
                📖
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 600, color: COLORS.ink }}>
                Ebook / Sách điện tử
              </div>
            </div>

            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                border: `2px solid ${COLORS.line}`,
                borderRadius: 20,
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `translateX(${(1 - sprItem2) * -40}px)`,
                opacity: sprItem2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.accent2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22 }}>
                📋
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 600, color: COLORS.ink }}>
                Template / Biểu mẫu Notion
              </div>
            </div>

            <div
              style={{
                background: 'rgba(248, 245, 242, 0.97)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 20,
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `translateX(${(1 - sprItem3) * -40}px) scale(${1 + 0.03 * sprItem3})`,
                opacity: sprItem3,
                boxShadow: '0 12px 35px rgba(114, 0, 0, 0.25)',
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22 }}>
                🎥
              </div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 700, color: COLORS.accent }}>
                  Workshop Recording
                </div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 20, color: COLORS.accent2, fontWeight: 600 }}>
                  (Phải có video ghi lại)
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 5: EUREKA / DISCOVERY BADGE (31.5s - 38.6s) */}
      {currentTime >= 32.5 && currentTime <= 38.2 && (() => {
        const spr = makeSpring(980);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 60,
              right: 60,
              background: 'rgba(248, 245, 242, 0.94)',
              backdropFilter: 'blur(16px)',
              border: `2px solid ${COLORS.accent2}`,
              borderRadius: 24,
              padding: '24px 30px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              transform: `scale(${0.9 + 0.1 * spr})`,
              opacity: spr,
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'inline-block', background: COLORS.accent2, color: '#fff', fontSize: 18, fontWeight: 700, padding: '4px 14px', borderRadius: 999, marginBottom: 10, letterSpacing: 1.5 }}>
              💡 TÀI SẢN SẴN CÓ
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 40, fontWeight: 700, color: COLORS.accent, lineHeight: 1.25, marginBottom: 8 }}>
              Workshop Cũ + Feedback Tốt
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 22, color: COLORS.muted }}>
              Học viên cũ đã khen → Đã được chứng minh giá trị!
            </div>
          </div>
        );
      })()}

      {/* BEAT 6: FLASH SALE BLUEPRINT CARD (39.0s - 55.0s) */}
      {currentTime >= 40.0 && currentTime <= 54.8 && (() => {
        const spr = makeSpring(1200);
        return (
          <div
            style={{
              position: 'absolute',
              top: 170,
              left: 54,
              right: 54,
              background: 'rgba(248, 245, 242, 0.96)',
              backdropFilter: 'blur(20px)',
              border: `2px solid ${COLORS.accent}`,
              borderRadius: 26,
              padding: '28px 32px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
              transform: `translateY(${(1 - spr) * 20}px)`,
              opacity: spr,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ background: COLORS.accent, color: '#fff', padding: '6px 14px', borderRadius: 10, fontSize: 18, fontWeight: 700, letterSpacing: 1.5 }}>
                CHIẾN DỊCH FLASH SALE
              </span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 700, color: COLORS.accent2 }}>
                2 - 3 NGÀY
              </span>
            </div>

            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 700, color: COLORS.ink, marginBottom: 16 }}>
              Quy Tắc Đóng Gói Hoàn Chỉnh:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 22, color: COLORS.ink }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: COLORS.accent2, fontWeight: 700 }}>✓</span>
                <span>Recording Workshop cốt lõi</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: COLORS.accent2, fontWeight: 700 }}>✓</span>
                <span>Sample & Bài tập mẫu</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: COLORS.accent2, fontWeight: 700 }}>✓</span>
                <span>Tài liệu & Hướng dẫn thực hành</span>
              </div>
            </div>

            <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${COLORS.line}`, fontFamily: FONT_BODY, fontSize: 20, color: COLORS.accent, fontWeight: 600 }}>
              ⚠️ Đừng bán trơ trọi recording — hãy bán trọn bộ giải pháp!
            </div>
          </div>
        );
      })()}

      {/* BEAT 7: FRAMEWORK OVERVIEW (56.0s - 64.5s) */}
      {currentTime >= 56.0 && currentTime <= 64.5 && (() => {
        const spr = makeSpring(1680);
        return (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 54,
              right: 54,
              background: 'rgba(248, 245, 242, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `2px solid ${COLORS.accent}`,
              borderRadius: 26,
              padding: '28px 32px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              transform: `scale(${0.9 + 0.1 * spr})`,
              opacity: spr,
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: FONT_MONO, color: COLORS.accent2, fontSize: 22, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
              HỆ THỐNG DÒNG TIỀN
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 700, color: COLORS.accent, lineHeight: 1.25, marginBottom: 12 }}>
              7 Loại Cash Campaign
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: COLORS.muted, lineHeight: 1.4 }}>
              Dành riêng cho <b>Solo Experts, Coaches & Consultants</b> tạo doanh thu nhanh
            </div>
          </div>
        );
      })()}

      {/* BEAT 8: OUTRO CALL TO ACTION (65.0s - 79.5s) */}
      {currentTime >= 65.0 && (() => {
        const spr = makeSpring(1950);
        return (
          <div
            style={{
              position: 'absolute',
              top: 170,
              left: 54,
              right: 54,
              background: 'rgba(248, 245, 242, 0.96)',
              backdropFilter: 'blur(20px)',
              border: `2px solid ${COLORS.accent}`,
              borderRadius: 28,
              padding: '30px 32px',
              boxShadow: '0 24px 60px rgba(114, 0, 0, 0.3)',
              transform: `translateY(${(1 - spr) * 20}px)`,
              opacity: spr,
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'inline-block', background: COLORS.accent, color: '#fff', fontSize: 18, fontWeight: 700, padding: '5px 16px', borderRadius: 999, marginBottom: 12, letterSpacing: 1.5 }}>
              SERIES 7 BÀI VIẾT CHUYÊN SÂU
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 42, fontWeight: 700, color: COLORS.ink, lineHeight: 1.3, marginBottom: 14 }}>
              Khám Phá Trọn Bộ 7 Cash Campaigns
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: COLORS.accent2,
                color: '#fff',
                fontFamily: FONT_DISPLAY,
                fontSize: 26,
                fontWeight: 600,
                padding: '14px 28px',
                borderRadius: 16,
                boxShadow: '0 8px 24px rgba(121, 132, 102, 0.4)',
                marginTop: 6,
              }}
            >
              <span>👇</span>
              <span>Link chi tiết ở dưới Comment</span>
            </div>
          </div>
        );
      })()}

      {/* 4. DYNAMIC SUBTITLES (BOTTOM-ANCHORED WITH BRAND TOKENS) */}
      {activeCaption && (
        <div
          style={{
            position: 'absolute',
            bottom: 230,
            left: 54,
            right: 54,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: 'rgba(248, 245, 242, 0.95)',
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${COLORS.line}`,
              borderRadius: 20,
              padding: '16px 28px',
              boxShadow: '0 12px 35px rgba(0,0,0,0.35)',
              textAlign: 'center',
              maxWidth: 960,
            }}
          >
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 34,
                fontWeight: 600,
                lineHeight: 1.45,
                color: COLORS.ink,
                letterSpacing: 0.2,
              }}
            >
              {activeCaption.text}
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

export default CashCampaignMaster;
