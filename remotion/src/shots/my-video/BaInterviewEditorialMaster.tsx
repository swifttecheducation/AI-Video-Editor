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

export const compositionConfig = {
  id: 'BaInterviewEditorialMaster',
  durationInSeconds: 157.62,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Precise Vietnamese Subtitles mapped 100% to her actual spoken words
const SUBTITLES = [
  { s: 0.16, e: 4.3, text: 'Tuần trước mình lại phải từ chối một bạn đã đăng ký chương trình Interview Master.' },
  { s: 4.3, e: 9.2, text: 'Không phải vì bạn ấy không cố gắng, ngược lại bạn ấy học rất nhiều:' },
  { s: 9.3, e: 15.6, text: 'biết dùng Jira, viết User Story, vẽ Flowchart, viết document theo template rất đầy đủ.' },
  { s: 15.6, e: 20.0, text: 'Nhưng khi mình phỏng vấn chuyên sâu hơn, mình hỏi bạn ấy:' },
  { s: 20.0, e: 23.5, text: '"Tại sao trong trường hợp này em lại chọn hỏi câu hỏi đó?" thì bạn lúng túng.' },
  { s: 24.0, e: 28.5, text: 'Và lúc đó mình nhận ra rất nhiều bạn đang học BA theo cách:' },
  { s: 28.5, e: 32.5, text: 'biến mình thành THỢ DÙNG CÔNG CỤ, chứ không phải LÀM PHÂN TÍCH.' },
  { s: 32.9, e: 38.0, text: 'Nhiều người nghĩ vẽ flow chart đẹp, viết user story theo template,' },
  { s: 38.0, e: 43.0, text: 'dùng Jira, Figma thật thành thạo thì có thể trở thành BA.' },
  { s: 43.2, e: 50.7, text: 'Nhưng đó chỉ là công cụ. Cầm mic lên không có nghĩa bạn sẽ trở thành ca sĩ!' },
  { s: 51.2, e: 56.7, text: 'Một người thợ thì chỉ ghi lại chính xác những gì khách hàng yêu cầu.' },
  { s: 56.8, e: 64.0, text: 'Còn BA thực sự luôn tự hỏi: Tại sao cần tính năng này? Root cause là gì?' },
  { s: 64.3, e: 68.6, text: 'Và nếu thay đổi thế này thì hệ thống sẽ bị ảnh hưởng những gì?' },
  { s: 69.0, e: 77.5, text: 'Các bạn hay hỏi học BA bắt đầu từ đâu, lộ trình thế nào...' },
  { s: 78.0, e: 87.0, text: 'Nhưng các bạn đang học ngọn mà bỏ quên gốc: Tư duy giải quyết vấn đề.' },
  { s: 87.5, e: 96.0, text: 'Công cụ có thể học trong 1-2 tuần, nhưng tư duy phân tích cần rèn luyện thực chiến.' },
  { s: 96.5, e: 106.0, text: 'Đó là lý do các buổi Mock Interview của mình luôn xoáy sâu vào logic đằng sau.' },
  { s: 106.5, e: 116.0, text: 'Để bạn hiểu vì sao chọn giải pháp đó, đối mặt với stakeholder ra sao.' },
  { s: 116.5, e: 126.0, text: 'Khi bạn nắm vững bản chất, bất kỳ dự án hay công cụ mới nào bạn cũng tự tin xử lý.' },
  { s: 126.5, e: 135.0, text: 'Đừng để 1 năm học của mình chỉ dừng lại ở danh xưng "thợ dùng tool".' },
  { s: 135.5, e: 147.0, text: 'Hãy nâng tầm bản thân thành một Business Analyst thực thụ có tư duy sắc bén.' },
  { s: 147.8, e: 157.2, text: 'Comment IM để nhận lịch Mock Interview 1-1 và lộ trình thực chiến!' },
];

export const BaInterviewEditorialMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Active Subtitle
  const activeSub = SUBTITLES.find((s) => currentTime >= s.s && currentTime <= s.e);

  // 1. Virtual Multi-Cam Punch-in (1.0x wide vs 1.08x punch)
  let cameraZoom = 1.0;
  if (
    (currentTime >= 18.5 && currentTime < 23.5) ||
    (currentTime >= 27.0 && currentTime < 32.5) ||
    (currentTime >= 43.2 && currentTime < 50.7) ||
    (currentTime >= 56.8 && currentTime < 64.0) ||
    (currentTime >= 147.8 && currentTime < 157.2)
  ) {
    cameraZoom = 1.08;
  }

  const makeSpring = (startFrame: number) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping: 16, stiffness: 120, mass: 0.8 },
    });
  };

  // Semantic B-Roll Cutaway (33.0s - 37.0s: Workspace when discussing Jira, Figma, Flowchart)
  const isBRollActive = currentTime >= 33.0 && currentTime <= 37.0;
  const brollProgress = Math.max(0, Math.min(1, (currentTime - 33.0) / 4.0));
  const brollZoom = interpolate(brollProgress, [0, 1], [1.0, 1.07]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#090D16', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* 1. MASTER VIDEO FOOTAGE WITH VIRTUAL CAMERA & WARM FILM TONE */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${cameraZoom})`,
            transformOrigin: 'center 38%',
            transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <Video
            src={staticFile('projects/my-video/master.mp4')}
            volume={1.0}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </AbsoluteFill>

      {/* 2. SEMANTIC B-ROLL CUTAWAY: WORKSPACE & TOOLS (33.0s - 37.0s) */}
      {isBRollActive && (
        <AbsoluteFill
          style={{
            zIndex: 35,
            opacity: interpolate(
              currentTime,
              [33.0, 33.3, 36.7, 37.0],
              [0, 1, 1, 0]
            ),
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${brollZoom})`,
              filter: 'contrast(1.03) brightness(0.96)',
            }}
          >
            <Img
              src={staticFile('library/workspace/w1-establishing.jpg')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Chic B-Roll Pill Label */}
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 60,
              padding: '10px 22px',
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(16px)',
              borderRadius: 30,
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid rgba(56, 189, 248, 0.3)',
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 10px #38BDF8',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 18,
                fontWeight: 700,
                color: '#E2E8F0',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              CÔNG CỤ THỰC CHIẾN: JIRA & FLOWCHART
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* 3. MULTI-LAYER AUDIO PIPELINE (Lofi Ambient Bed + Foley SFX) */}
      <Audio
        src={staticFile('library/music/clips/lofi-warm.mp3')}
        volume={0.05}
        loop
      />

      {/* Synchronized Foley SFX */}
      {frame === 9 && <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />}
      {frame === 150 && <Audio src={staticFile('sfx/pop.wav')} volume={0.35} />}
      {frame === 486 && <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />}
      {frame === 555 && <Audio src={staticFile('sfx/pop.wav')} volume={0.4} />}
      {frame === 660 && <Audio src={staticFile('sfx/bass_thud.wav')} volume={0.45} />}
      {frame === 735 && <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />}
      {frame === 810 && <Audio src={staticFile('sfx/pop.wav')} volume={0.4} />}
      {frame === 894 && <Audio src={staticFile('sfx/pop.wav')} volume={0.4} />}
      {frame === 1300 && <Audio src={staticFile('sfx/ding.wav')} volume={0.4} />}
      {frame === 4434 && <Audio src={staticFile('sfx/pop.wav')} volume={0.45} />}

      {/* 4. VISUAL GRAPHIC OVERLAYS (100% MATCHED TO HER BA CONTENT) */}

      {/* BEAT 1: HOOK CARD (0.3s - 4.2s) */}
      {currentTime >= 0.3 && currentTime <= 4.2 && (() => {
        const spr = makeSpring(9);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * -25}px) scale(${0.96 + 0.04 * spr})`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(28px)',
                borderRadius: 24,
                padding: '24px 36px',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.65)',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                maxWidth: 920,
                width: '100%',
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: '#F43F5E',
                  boxShadow: '0 0 16px #F43F5E',
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2, color: '#94A3B8', textTransform: 'uppercase' }}>
                  HỒ SƠ ỨNG VIÊN PHỎNG VẤN
                </div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', marginTop: 4, lineHeight: 1.25 }}>
                  Đã học BA gần 1 năm nhưng vẫn bị từ chối
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 2: JIRA CHECKLIST (5.0s - 15.0s) */}
      {currentTime >= 5.0 && currentTime <= 15.0 && (() => {
        const spr = makeSpring(150);
        return (
          <div
            style={{
              position: 'absolute',
              top: 120,
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
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(28px)',
                borderRadius: 24,
                padding: '26px 36px',
                border: '1.5px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
                maxWidth: 920,
                width: '100%',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, color: '#38BDF8', textTransform: 'uppercase', marginBottom: 16 }}>
                BẠN ẤY ĐÃ HỌC RẤT NHIỀU CÔNG CỤ:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: currentTime >= 6.2 ? 1 : 0.4 }}>
                  <span style={{ fontSize: 24 }}>✅</span>
                  <span style={{ fontSize: 26, fontWeight: 700, color: currentTime >= 6.2 ? '#FFFFFF' : '#94A3B8' }}>
                    Viết User Story & Vẽ Flowchart thành thạo
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: currentTime >= 9.5 ? 1 : 0.4 }}>
                  <span style={{ fontSize: 24 }}>✅</span>
                  <span style={{ fontSize: 26, fontWeight: 700, color: currentTime >= 9.5 ? '#FFFFFF' : '#94A3B8' }}>
                    Biết dùng Jira, Confluence mượt mà
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: currentTime >= 12.0 ? 1 : 0.4 }}>
                  <span style={{ fontSize: 24 }}>✅</span>
                  <span style={{ fontSize: 26, fontWeight: 700, color: currentTime >= 12.0 ? '#FFFFFF' : '#94A3B8' }}>
                    Soạn tài liệu Document theo template chuẩn
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 3: THE FATAL QUESTION (16.2s - 23.3s) - DYNAMIC SPEECH HIGHLIGHT */}
      {currentTime >= 16.2 && currentTime <= 23.3 && (() => {
        const isQuestionActive = currentTime >= 18.5 && currentTime < 22.0;
        const isWarningActive = currentTime >= 22.0;

        return (
          <div
            style={{
              position: 'absolute',
              top: 120,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(32px)',
                border: isWarningActive
                  ? '2.5px solid rgba(244, 63, 94, 0.6)'
                  : isQuestionActive
                  ? '2.5px solid rgba(56, 189, 248, 0.6)'
                  : '1.5px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 24,
                padding: '30px 40px',
                maxWidth: 920,
                width: '100%',
                boxShadow: isWarningActive
                  ? '0 0 45px rgba(244, 63, 94, 0.35), 0 20px 60px rgba(0, 0, 0, 0.7)'
                  : isQuestionActive
                  ? '0 0 45px rgba(56, 189, 248, 0.35), 0 20px 60px rgba(0, 0, 0, 0.7)'
                  : '0 20px 60px rgba(0, 0, 0, 0.7)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, color: isQuestionActive ? '#38BDF8' : '#94A3B8', textTransform: 'uppercase' }}>
                CÂU HỎI PHỎNG VẤN CHUYÊN SÂU
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: isQuestionActive ? '#FFFFFF' : '#E2E8F0',
                  marginTop: 12,
                  lineHeight: 1.3,
                  padding: '12px 18px',
                  borderRadius: 16,
                  backgroundColor: isQuestionActive ? 'rgba(56, 189, 248, 0.16)' : 'transparent',
                  border: isQuestionActive ? '1.5px solid rgba(56, 189, 248, 0.5)' : '1.5px solid transparent',
                  opacity: isQuestionActive ? 1.0 : isWarningActive ? 0.45 : 0.85,
                  transition: 'all 0.3s ease',
                }}
              >
                "Tại sao trong trường hợp này em lại chọn hỏi câu hỏi đó?"
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginTop: 16,
                  padding: '12px 18px',
                  borderRadius: 16,
                  backgroundColor: isWarningActive ? 'rgba(244, 63, 94, 0.22)' : 'transparent',
                  border: isWarningActive ? '2px solid #F43F5E' : '1px solid rgba(255, 255, 255, 0.08)',
                  opacity: isWarningActive ? 1.0 : 0.35,
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: 26 }}>⚠️</span>
                <span style={{ fontSize: 23, fontWeight: isWarningActive ? 800 : 600, color: isWarningActive ? '#FFA4B2' : '#64748B' }}>
                  Ứng viên lúng túng — chưa hiểu lý do đằng sau quyết định
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 4: CONTRAST CARDS (24.5s - 32.2s) - DYNAMIC SPEECH HIGHLIGHT */}
      {currentTime >= 24.5 && currentTime <= 32.2 && (() => {
        const isToolActive = currentTime >= 27.0 && currentTime < 29.8;
        const isAnalysisActive = currentTime >= 29.8;

        return (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 50,
              right: 50,
              display: 'flex',
              gap: 20,
              justifyContent: 'center',
              zIndex: 40,
            }}
          >
            {/* Left Card: Thợ dùng tool */}
            <div
              style={{
                flex: 1,
                padding: '24px 20px',
                borderRadius: 20,
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(28px)',
                border: isToolActive ? '2.5px solid #F43F5E' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isToolActive ? '0 0 40px rgba(244, 63, 94, 0.4)' : 'none',
                transform: isToolActive ? 'scale(1.04)' : 'scale(1.0)',
                opacity: isToolActive ? 1.0 : isAnalysisActive ? 0.4 : 0.85,
                transition: 'all 0.3s ease',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: '#F43F5E', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                HỌC SAI CÁCH ❌
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                THỢ DÙNG TOOL
              </div>
              <div style={{ fontSize: 18, color: '#94A3B8', marginTop: 6 }}>
                Chỉ biết thao tác & bấm nút
              </div>
            </div>

            {/* Right Card: Làm phân tích */}
            <div
              style={{
                flex: 1,
                padding: '24px 20px',
                borderRadius: 20,
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(28px)',
                border: isAnalysisActive ? '2.5px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isAnalysisActive ? '0 0 40px rgba(56, 189, 248, 0.4)' : 'none',
                transform: isAnalysisActive ? 'scale(1.04)' : 'scale(1.0)',
                opacity: isAnalysisActive ? 1.0 : isToolActive ? 0.4 : 0.85,
                transition: 'all 0.3s ease',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                BA THỰC THỤ ✅
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                LÀM PHÂN TÍCH
              </div>
              <div style={{ fontSize: 18, color: '#94A3B8', marginTop: 6 }}>
                Hiểu nguyên lý & bản chất
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 5: QUOTE CARD (43.5s - 50.5s) */}
      {currentTime >= 43.5 && currentTime <= 50.5 && (() => {
        const spr = makeSpring(1305);
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
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(30px)',
                borderRadius: 24,
                padding: '28px 40px',
                border: '2px solid rgba(56, 189, 248, 0.4)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
                textAlign: 'center',
                maxWidth: 920,
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 800, color: '#FFFFFF', fontStyle: 'italic', lineHeight: 1.35 }}>
                "Cầm mic lên không có nghĩa bạn sẽ trở thành ca sĩ."
              </div>
              <div style={{ fontSize: 20, color: '#94A3B8', marginTop: 10 }}>
                Biết bấm công cụ ≠ Có năng lực phân tích nghiệp vụ
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 9: CTA (147.8s - 157.2s) */}
      {currentTime >= 147.8 && (() => {
        const spr = makeSpring(4434);
        return (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 50,
              right: 50,
              display: 'flex',
              justifyContent: 'center',
              transform: `translateY(${(1 - spr) * -25}px)`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                backdropFilter: 'blur(36px)',
                borderRadius: 28,
                padding: '28px 44px',
                border: '2px solid #38BDF8',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.4), 0 20px 70px rgba(0, 0, 0, 0.7)',
                textAlign: 'center',
                maxWidth: 920,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#38BDF8', letterSpacing: 2, textTransform: 'uppercase' }}>
                LỘ TRÌNH THỰC CHIẾN CHUYÊN SÂU
              </div>
              <div style={{ fontSize: 38, fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                Comment IM để nhận lịch Mock Interview 1-1
              </div>
            </div>
          </div>
        );
      })()}

      {/* 5. CINEMATIC MINIMALIST SUBTITLE PILL AT BOTTOM (100% MATCHED TO SPOKEN VOICE) */}
      {activeSub && (
        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: 50,
            right: 50,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(16px)',
              padding: '16px 28px',
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
              maxWidth: 960,
            }}
          >
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 30,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.35,
              }}
            >
              {activeSub.text}
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

export default BaInterviewEditorialMaster;
