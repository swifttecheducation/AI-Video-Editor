import React from 'react';
import {
  AbsoluteFill,
  Video,
  Audio,
  staticFile,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { COLORS } from '../../brand';
import { KineticKaraoke } from './KineticKaraoke';

export const compositionConfig = {
  id: 'CashCampaignMasterV2',
  durationInSeconds: 79.52,
  fps: 30,
  width: 1080,
  height: 1920,
};

export const CashCampaignMasterV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // 1. Virtual Multi-Cam Schedule (Alternate Wide 1.0x and Punch-In 1.14x)
  let cameraZoom = 1.0;
  if (
    (currentTime >= 3.85 && currentTime < 8.95) || // Scene 2: Skeptic close-up
    (currentTime >= 8.95 && currentTime < 14.2) || // Scene 3a: Strong punch
    (currentTime >= 23.3 && currentTime < 31.45) || // Scene 4: Questioning assets
    (currentTime >= 38.65 && currentTime < 49.5) || // Scene 6: Flash sale advice
    (currentTime >= 55.65 && currentTime < 64.65) // Scene 7: Framework authority
  ) {
    cameraZoom = 1.14;
  }

  // Smooth transition for camera zoom
  const currentZoom = cameraZoom;

  // Helper spring builder
  const makeSpring = (startFrame: number) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping: 14, stiffness: 140, mass: 0.7 },
    });
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0B0A', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* 1. MASTER VIDEO FOOTAGE WITH VIRTUAL MULTI-CAM PUNCH-IN */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${currentZoom})`,
            transformOrigin: 'center 36%',
            transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <Video
            src={staticFile('rough_cut_master.mp4')}
            volume={1.0}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </AbsoluteFill>

      {/* 2. MULTI-LAYER AUDIO PIPELINE: BGM BED WITH AUTO DUCKING */}
      <Audio
        src={staticFile('library/music/clips/lofi-warm.mp3')}
        volume={0.055}
        loop
      />

      {/* 3. SOUND DESIGN: SYNCHRONIZED SFX TRIGGERS */}
      {frame === 6 && <Audio src={staticFile('library/sfx/clips/pop-reveal.mp3')} volume={0.35} />}
      {frame === 116 && <Audio src={staticFile('library/sfx/clips/whoosh-soft.mp3')} volume={0.3} />}
      {frame === 270 && <Audio src={staticFile('library/sfx/clips/impact-soft.mp3')} volume={0.35} />}
      {frame === 700 && <Audio src={staticFile('library/sfx/clips/whoosh-soft.mp3')} volume={0.3} />}
      {frame === 740 && <Audio src={staticFile('library/sfx/clips/pop-reveal.mp3')} volume={0.35} />}
      {frame === 780 && <Audio src={staticFile('library/sfx/clips/pop-reveal.mp3')} volume={0.35} />}
      {frame === 820 && <Audio src={staticFile('library/sfx/clips/chime-magic.mp3')} volume={0.4} />}
      {frame === 945 && <Audio src={staticFile('library/sfx/clips/whoosh-soft.mp3')} volume={0.3} />}
      {frame === 1200 && <Audio src={staticFile('library/sfx/clips/pop-reveal.mp3')} volume={0.35} />}
      {frame === 1680 && <Audio src={staticFile('library/sfx/clips/chime-magic.mp3')} volume={0.4} />}
      {frame === 1950 && <Audio src={staticFile('library/sfx/clips/whoosh-soft.mp3')} volume={0.3} />}

      {/* 4. REFINED FLOATING CONTEXTUAL ASSETS & BADGES (NEVER COVERS FACE) */}

      {/* BEAT 1: HOOK FLOATING BADGE (0.2s - 3.8s) */}
      {currentTime >= 0.2 && currentTime <= 3.8 && (() => {
        const spr = makeSpring(6);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${0.9 + 0.1 * spr}) translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.94)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 24,
                padding: '16px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 16px 45px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: COLORS.accent,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  boxShadow: '0 6px 16px rgba(114, 0, 0, 0.4)',
                }}
              >
                💸
              </div>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 700, color: COLORS.accent2, letterSpacing: 2 }}>
                  TĂNG DOANH THU CẤP TỐC
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 700, color: COLORS.accent, lineHeight: 1.2 }}>
                  Bí Quyết Cho Solopreneur
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 2: SKEPTICAL CREATOR TAG (3.9s - 8.9s) */}
      {currentTime >= 3.9 && currentTime <= 8.9 && (() => {
        const spr = makeSpring(120);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.94)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 22,
                padding: '14px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                boxShadow: '0 14px 40px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ fontSize: 32 }}>❓</span>
              <div>
                <span style={{ background: COLORS.accent, color: '#fff', padding: '2px 10px', borderRadius: 8, fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
                  SAI LẦM PHỔ BIẾN
                </span>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 600, color: COLORS.ink, marginTop: 4 }}>
                  Cứ thiếu tiền là lại hùng hục làm mới?
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 3: NGUYÊN TẮC VÀNG: KÍCH HOẠT TÀI SẢN CŨ (9.0s - 22.8s) */}
      {currentTime >= 11.5 && currentTime <= 22.8 && (() => {
        const spr = makeSpring(345);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * 20}px)`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${COLORS.accent2}`,
                borderRadius: 24,
                padding: '18px 28px',
                boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
                maxWidth: 900,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 24 }}>⚡</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 700, color: COLORS.accent2, letterSpacing: 1.5 }}>
                  NGUYÊN TẮC CỐT LÕI
                </span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 700, color: COLORS.accent, lineHeight: 1.25 }}>
                Kích Hoạt Tài Sản Đang Sẵn Có
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 20, color: COLORS.muted, marginTop: 4 }}>
                Đừng FOMO chạy theo cái mới — nhìn lại nguồn lực của chính bạn!
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 4: ASSET CHECKLIST PILLS (23.3s - 31.4s) */}
      {currentTime >= 24.5 && currentTime <= 31.4 && (() => {
        const spr1 = makeSpring(740);
        const spr2 = makeSpring(780);
        const spr3 = makeSpring(820);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                border: `1.5px solid ${COLORS.line}`,
                borderRadius: 18,
                padding: '14px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transform: `translateX(${(1 - spr1) * -30}px)`,
                opacity: spr1,
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              }}
            >
              <span style={{ fontSize: 26 }}>📖</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 600, color: COLORS.ink }}>
                Ebook / Tài liệu chuyên môn
              </span>
            </div>

            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                border: `1.5px solid ${COLORS.line}`,
                borderRadius: 18,
                padding: '14px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transform: `translateX(${(1 - spr2) * -30}px)`,
                opacity: spr2,
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              }}
            >
              <span style={{ fontSize: 26 }}>📋</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 600, color: COLORS.ink }}>
                Template / Biểu mẫu Notion
              </span>
            </div>

            <div
              style={{
                background: 'rgba(248, 245, 242, 0.97)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 18,
                padding: '14px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transform: `translateX(${(1 - spr3) * -30}px) scale(${1 + 0.03 * spr3})`,
                opacity: spr3,
                boxShadow: '0 10px 30px rgba(114, 0, 0, 0.25)',
              }}
            >
              <span style={{ fontSize: 26 }}>🎥</span>
              <div>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: COLORS.accent }}>
                  Workshop Recording
                </span>
                <span style={{ marginLeft: 8, fontFamily: FONT_BODY, fontSize: 18, color: COLORS.accent2, fontWeight: 600 }}>
                  (Phải có video ghi lại)
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 5: EUREKA / TÀI SẢN VÀNG (31.5s - 38.6s) */}
      {currentTime >= 32.5 && currentTime <= 38.2 && (() => {
        const spr = makeSpring(980);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${0.9 + 0.1 * spr})`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${COLORS.accent2}`,
                borderRadius: 22,
                padding: '16px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 16px 45px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ fontSize: 36 }}>💡</span>
              <div>
                <span style={{ background: COLORS.accent2, color: '#fff', padding: '2px 10px', borderRadius: 8, fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
                  TÀI SẢN ĐÃ CÓ
                </span>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 700, color: COLORS.accent, marginTop: 4 }}>
                  Workshop Cũ + Feedback Khen Phết!
                </div>
              </div>
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
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * 20}px)`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.96)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 24,
                padding: '20px 28px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
                maxWidth: 900,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ background: COLORS.accent, color: '#fff', padding: '4px 12px', borderRadius: 8, fontSize: 16, fontWeight: 700, letterSpacing: 1.5 }}>
                  ⚡ CHIẾN DỊCH FLASH SALE
                </span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: COLORS.accent2 }}>
                  2 - 3 NGÀY
                </span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>
                Công Thức Đóng Gói Hoàn Chỉnh:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 20, color: COLORS.ink }}>
                <div><span style={{ color: COLORS.accent2, fontWeight: 700 }}>✓</span> Recording Workshop cốt lõi</div>
                <div><span style={{ color: COLORS.accent2, fontWeight: 700 }}>✓</span> Sample & Bài tập thực chiến</div>
                <div><span style={{ color: COLORS.accent2, fontWeight: 700 }}>✓</span> Tài liệu hướng dẫn đi kèm</div>
              </div>
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
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${0.9 + 0.1 * spr})`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 24,
                padding: '20px 28px',
                boxShadow: '0 18px 45px rgba(0,0,0,0.3)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: FONT_MONO, color: COLORS.accent2, fontSize: 18, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>
                HỆ THỐNG DÒNG TIỀN
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 700, color: COLORS.accent, lineHeight: 1.25 }}>
                7 Loại Cash Campaign
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 20, color: COLORS.muted, marginTop: 4 }}>
                Dành cho <b>Solo Experts, Coaches & Consultants</b>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 8: OUTRO CTA (65.0s - 79.5s) */}
      {currentTime >= 65.0 && (() => {
        const spr = makeSpring(1950);
        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * 20}px)`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.96)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 24,
                padding: '22px 28px',
                boxShadow: '0 20px 50px rgba(114, 0, 0, 0.3)',
                textAlign: 'center',
              }}
            >
              <span style={{ background: COLORS.accent, color: '#fff', fontSize: 16, fontWeight: 700, padding: '4px 12px', borderRadius: 999, letterSpacing: 1.5 }}>
                SERIES 7 BÀI VIẾT CHUYÊN SÂU
              </span>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 700, color: COLORS.ink, marginTop: 8, marginBottom: 10 }}>
                Đọc Trọn Bộ 7 Cash Campaigns
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: COLORS.accent2,
                  color: '#fff',
                  fontFamily: FONT_BODY,
                  fontSize: 22,
                  fontWeight: 600,
                  padding: '10px 22px',
                  borderRadius: 14,
                }}
              >
                <span>👇</span>
                <span>Link chi tiết ở dưới Comment</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 5. KINETIC WORD-BY-WORD KARAOKE SUBTITLES */}
      <KineticKaraoke />
    </AbsoluteFill>
  );
};

export default CashCampaignMasterV2;
