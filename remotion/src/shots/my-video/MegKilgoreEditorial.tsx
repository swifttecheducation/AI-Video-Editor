import React from 'react';
import {
  AbsoluteFill,
  Video,
  Img,
  Audio,
  staticFile,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { COLORS } from '../../brand';
import { EditorialKaraoke } from './EditorialKaraoke';

export const compositionConfig = {
  id: 'MegKilgoreEditorial',
  durationInSeconds: 79.52,
  fps: 30,
  width: 1080,
  height: 1920,
};

export const MegKilgoreEditorial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // 1. Virtual Multi-Cam Punch-in Schedule (1.0x wide vs 1.13x punch)
  let cameraZoom = 1.0;
  if (
    (currentTime >= 3.85 && currentTime < 8.95) ||
    (currentTime >= 8.95 && currentTime < 14.2) ||
    (currentTime >= 23.3 && currentTime < 31.45) ||
    (currentTime >= 38.65 && currentTime < 49.5) ||
    (currentTime >= 55.65 && currentTime < 64.65)
  ) {
    cameraZoom = 1.13;
  }

  // Helper spring builder for organic animations
  const makeSpring = (startFrame: number) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping: 16, stiffness: 120, mass: 0.8 },
    });
  };

  // Check if B-Roll cutaway is active (19.2s - 22.8s)
  const isBRollActive = currentTime >= 19.2 && currentTime <= 22.8;
  const brollProgress = Math.max(0, Math.min(1, (currentTime - 19.2) / 3.6));
  const brollZoom = interpolate(brollProgress, [0, 1], [1.0, 1.08]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#141211', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* 1. MASTER VIDEO FOOTAGE WITH WARM FILM SCENT & VIRTUAL CAMERA */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${cameraZoom})`,
            transformOrigin: 'center 38%',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            filter: 'sepia(0.08) saturate(1.06) contrast(1.03) brightness(1.02)',
          }}
        >
          <Video
            src={staticFile('rough_cut_master.mp4')}
            volume={1.0}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </AbsoluteFill>

      {/* 2. AESTHETIC B-ROLL CUTAWAY: WORKSPACE & NOTEBOOK (19.2s - 22.8s) */}
      {isBRollActive && (
        <AbsoluteFill
          style={{
            zIndex: 35,
            opacity: interpolate(
              currentTime,
              [19.2, 19.45, 22.55, 22.8],
              [0, 1, 1, 0]
            ),
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${brollZoom})`,
              filter: 'sepia(0.1) saturate(1.05) contrast(1.04) brightness(0.95)',
            }}
          >
            <Img
              src={staticFile('library/workspace/w1-establishing.jpg')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Chic B-Roll Caption pill */}
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 60,
              padding: '10px 22px',
              background: 'rgba(248, 245, 242, 0.92)',
              backdropFilter: 'blur(10px)',
              borderRadius: 30,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: `1px solid ${COLORS.line}`,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: COLORS.accent,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 22,
                fontWeight: 600,
                color: COLORS.ink,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              Tài sản cốt lõi: Tệp khách hàng & Dữ liệu
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* 3. CINEMATIC GRADIENT SCRIM (Warm Editorial Vignette) */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          zIndex: 30,
          background:
            'linear-gradient(180deg, rgba(20, 18, 17, 0.65) 0%, rgba(20, 18, 17, 0) 18%, rgba(20, 18, 17, 0) 75%, rgba(20, 18, 17, 0.8) 100%)',
        }}
      />

      {/* 4. MULTI-LAYER AUDIO PIPELINE (Lofi Coffee-Shop Bed + Meg Kilgore Foley SFX) */}
      <Audio
        src={staticFile('library/music/clips/lofi-warm.mp3')}
        volume={0.05}
        loop
      />

      {/* Synchronized Foley SFX */}
      {frame === 6 && <Audio src={staticFile('library/sfx/clips/page-flip.mp3')} volume={0.4} />}
      {frame === 135 && <Audio src={staticFile('library/sfx/clips/pop-reveal.mp3')} volume={0.35} />}
      {frame === 276 && <Audio src={staticFile('library/sfx/clips/chime-magic.mp3')} volume={0.35} />}
      {frame === 576 && <Audio src={staticFile('library/sfx/clips/keys-typing-soft.mp3')} volume={0.35} />}
      {frame === 960 && <Audio src={staticFile('library/sfx/clips/pencil-scribble.mp3')} volume={0.35} />}
      {frame === 1680 && <Audio src={staticFile('library/sfx/clips/clock-tick-soft.mp3')} volume={0.3} />}
      {frame === 2160 && <Audio src={staticFile('library/sfx/clips/camera-shutter.mp3')} volume={0.4} />}

      {/* 5. EDITORIAL GRAPHIC OVERLAYS & HOOKS */}

      {/* HOOK CARD (0.2s - 4.2s): Signature Meg Kilgore Literary Hook */}
      {currentTime >= 0.2 && currentTime <= 4.2 && (() => {
        const spr = makeSpring(6);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 50,
              right: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `translateY(${(1 - spr) * -25}px) scale(${0.96 + 0.04 * spr})`,
              opacity: spr,
              zIndex: 45,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.96)',
                backdropFilter: 'blur(20px)',
                borderRadius: 24,
                padding: '24px 32px',
                border: `1.5px solid ${COLORS.line}`,
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.28)',
                textAlign: 'center',
                maxWidth: 920,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 20,
                  backgroundColor: 'rgba(114, 0, 0, 0.08)',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.accent,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  THE CASH CAMPAIGN BLUEPRINT
                </span>
              </div>
              <h1
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 48,
                  fontWeight: 700,
                  color: COLORS.ink,
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                Nếu ngày mai cần thêm doanh thu, bạn sẽ làm gì?
              </h1>
            </div>
          </div>
        );
      })()}

      {/* BEAT 2 (4.5s - 8.8s): The Common Friction Checklist */}
      {currentTime >= 4.5 && currentTime <= 8.8 && (() => {
        const spr = makeSpring(135);
        return (
          <div
            style={{
              position: 'absolute',
              top: 110,
              right: 50,
              left: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * 20}px)`,
              opacity: spr,
              zIndex: 45,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                backdropFilter: 'blur(16px)',
                borderRadius: 20,
                padding: '20px 28px',
                border: `1px solid ${COLORS.line}`,
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
                width: '100%',
                maxWidth: 860,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.muted,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                3 Phản xạ quen thuộc (nhưng tốn kém):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>❌</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: COLORS.ink, fontWeight: 600 }}>
                    Đổ thêm tiền chạy quảng cáo
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>❌</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: COLORS.ink, fontWeight: 600 }}>
                    Đăng bài liên tục không ai tương tác
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>❌</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: COLORS.danger, fontWeight: 600 }}>
                    Giảm giá bừa bãi phá vỡ định vị
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 3 (9.2s - 13.8s): The Solution Pillar Card */}
      {currentTime >= 9.2 && currentTime <= 13.8 && (() => {
        const spr = makeSpring(276);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * -20}px)`,
              opacity: spr,
              zIndex: 45,
            }}
          >
            <div
              style={{
                background: 'rgba(21, 19, 19, 0.88)',
                backdropFilter: 'blur(20px)',
                borderRadius: 22,
                padding: '22px 30px',
                border: `1.5px solid ${COLORS.accent}`,
                boxShadow: '0 16px 40px rgba(114, 0, 0, 0.35)',
                textAlign: 'center',
                maxWidth: 880,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.signalAlt,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                GIẢI PHÁP THÔNG MINH HƠN
              </span>
              <h2
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 42,
                  fontWeight: 700,
                  color: COLORS.paper,
                  margin: '8px 0 0',
                  lineHeight: 1.25,
                }}
              >
                Triển khai một <span style={{ color: '#E5A93B' }}>Cash Campaign</span>
              </h2>
            </div>
          </div>
        );
      })()}

      {/* BEAT 4 (32.0s - 37.0s): Irresistible Offer Principle */}
      {currentTime >= 32.0 && currentTime <= 37.0 && (() => {
        const spr = makeSpring(960);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${0.95 + 0.05 * spr})`,
              opacity: spr,
              zIndex: 45,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.95)',
                backdropFilter: 'blur(16px)',
                borderRadius: 20,
                padding: '22px 32px',
                border: `1.5px solid ${COLORS.line}`,
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.22)',
                textAlign: 'center',
                maxWidth: 880,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.accent,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                💡 NGUYÊN TẮC CỐT LÕI
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 36,
                  fontWeight: 600,
                  color: COLORS.ink,
                  lineHeight: 1.3,
                }}
              >
                Đừng giảm giá sản phẩm — Hãy tạo một <span style={{ color: COLORS.accent }}>Lời đề nghị không thể chối từ</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 5 (56.0s - 61.5s): Urgency & Scarcity Framework */}
      {currentTime >= 56.0 && currentTime <= 61.5 && (() => {
        const spr = makeSpring(1680);
        return (
          <div
            style={{
              position: 'absolute',
              top: 160,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * 15}px)`,
              opacity: spr,
              zIndex: 45,
            }}
          >
            <div
              style={{
                background: 'rgba(21, 19, 19, 0.9)',
                backdropFilter: 'blur(16px)',
                borderRadius: 24,
                padding: '18px 30px',
                border: `1px solid ${COLORS.warn}`,
                boxShadow: '0 12px 32px rgba(212, 155, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span style={{ fontSize: 32 }}>⏳</span>
              <div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 17, color: COLORS.d300, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                  YẾU TỐ QUYẾT ĐỊNH
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: '#FFFFFF', fontWeight: 700 }}>
                  Thời hạn rõ ràng: 48 giờ hoặc Giới hạn số lượng
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 6 (72.0s - 79.5s): Soft Elegant Editorial Outro & CTA */}
      {currentTime >= 72.0 && (() => {
        const spr = makeSpring(2160);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 50,
              right: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${0.95 + 0.05 * spr})`,
              opacity: spr,
              zIndex: 45,
            }}
          >
            <div
              style={{
                background: 'rgba(248, 245, 242, 0.96)',
                backdropFilter: 'blur(20px)',
                borderRadius: 24,
                padding: '26px 36px',
                border: `2px solid ${COLORS.accent}`,
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
                textAlign: 'center',
                maxWidth: 900,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.accent,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                THE STARTUP MOM PLAYBOOK
              </span>
              <h2
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 44,
                  fontWeight: 700,
                  color: COLORS.ink,
                  margin: '10px 0 14px',
                  lineHeight: 1.2,
                }}
              >
                Lưu lại video & Bình luận "CASH"
              </h2>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 24,
                  color: COLORS.muted,
                  fontWeight: 500,
                }}
              >
                Nhận toàn bộ tài liệu & checklist triển khai Cash Campaign từng bước.
              </div>
            </div>
          </div>
        );
      })()}

      {/* 6. EDITORIAL KARAOKE SUBTITLES (Safe Lower Third) */}
      <EditorialKaraoke />
    </AbsoluteFill>
  );
};

export default MegKilgoreEditorial;
