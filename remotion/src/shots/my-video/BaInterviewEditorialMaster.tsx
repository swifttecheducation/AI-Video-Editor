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

  // 1. Dynamic Handheld Drift & Subtle Natural Camera Movement
  const driftX = Math.sin(frame / 35) * 4;
  const driftY = Math.cos(frame / 45) * 3;
  const driftRotate = Math.sin(frame / 50) * 0.25;

  // 2. Virtual Multi-Cam Dynamic Punch-in (1.0x wide vs 1.08x - 1.14x punch)
  let baseZoom = 1.0;
  if (currentTime >= 18.5 && currentTime < 23.5) {
    baseZoom = 1.14; // Dramatic question punch
  } else if (currentTime >= 26.5 && currentTime < 28.5) {
    baseZoom = 1.08;
  } else if (currentTime >= 51.2 && currentTime < 56.7) {
    baseZoom = 1.08;
  } else if (currentTime >= 64.3 && currentTime < 68.6) {
    baseZoom = 1.09;
  } else if (currentTime >= 78.0 && currentTime < 87.0) {
    baseZoom = 1.07;
  } else if (currentTime >= 135.5 && currentTime < 147.0) {
    baseZoom = 1.08;
  } else if (currentTime >= 147.8 && currentTime < 157.2) {
    baseZoom = 1.12; // CTA punch
  }

  // 3. Screen Shake Impact on heavy bass hits
  let shakeOffset = 0;
  if ((frame >= 35 && frame <= 42) || (frame >= 600 && frame <= 606) || (frame >= 855 && frame <= 862)) {
    shakeOffset = (frame % 2 === 0 ? 1 : -1) * 4;
  }

  const makeSpring = (startFrame: number, damping = 14, stiffness = 130) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { damping, stiffness, mass: 0.8 },
    });
  };

  // 4. Five Distinct Semantic B-Roll Segments Mapped to Her Speech
  const broll1Active = currentTime >= 0.8 && currentTime <= 3.8;   // Rejection CV
  const broll2Active = currentTime >= 10.0 && currentTime <= 14.5; // Jira & Flowcharts
  const broll3Active = currentTime >= 28.5 && currentTime <= 32.5; // Robot Factory
  const broll4Active = currentTime >= 44.0 && currentTime <= 49.5; // Singer with Mic
  const broll5Active = currentTime >= 58.0 && currentTime <= 63.5; // Strategic Chess & Logic Tree

  const isAnyBroll = broll1Active || broll2Active || broll3Active || broll4Active || broll5Active;

  // Flash transition detector (first 4 frames of every B-Roll entry and exit)
  const isFlash =
    (frame >= 24 && frame <= 28) ||
    (frame >= 111 && frame <= 115) ||
    (frame >= 300 && frame <= 304) ||
    (frame >= 432 && frame <= 436) ||
    (frame >= 855 && frame <= 859) ||
    (frame >= 972 && frame <= 976) ||
    (frame >= 1320 && frame <= 1324) ||
    (frame >= 1482 && frame <= 1486) ||
    (frame >= 1740 && frame <= 1744) ||
    (frame >= 1902 && frame <= 1906);

  return (
    <AbsoluteFill style={{ backgroundColor: '#090D16', overflow: 'hidden', fontFamily: FONT_BODY }}>
      {/* ─── 1. MASTER VIDEO FOOTAGE WITH DYNAMIC CAMERA & WARM FILM TONE ─── */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `translate(${driftX + shakeOffset}px, ${driftY}px) scale(${baseZoom}) rotate(${driftRotate}deg)`,
            transformOrigin: 'center 38%',
          }}
        >
          <Video
            src={staticFile('projects/my-video/master.mp4')}
            volume={1.0}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Golden Warm Film Tone & Contrast Boost */}
          <AbsoluteFill
            style={{
              background:
                'radial-gradient(ellipse at 50% 36%, rgba(255, 200, 140, 0.05) 0%, rgba(20, 10, 5, 0.15) 80%, rgba(5, 3, 2, 0.45) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ─── 2. SEMANTIC B-ROLL CUTAWAYS (100% MATCHED TO WORDS) ─── */}

      {/* B-ROLL 1: CV REJECTION STAMP (0.8s - 3.8s) */}
      {broll1Active && (() => {
        const p = (currentTime - 0.8) / 3.0;
        const bZoom = interpolate(p, [0, 1], [1.02, 1.12]);
        const stampSpr = makeSpring(34, 12, 160);
        return (
          <AbsoluteFill style={{ zIndex: 35 }}>
            <div style={{ width: '100%', height: '100%', transform: `scale(${bZoom})`, overflow: 'hidden' }}>
              <Img
                src={staticFile('library/broll/broll_rejected_cv.jpg')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Rubber Stamp Slam Graphic */}
            <div
              style={{
                position: 'absolute',
                top: 220,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                transform: `scale(${interpolate(stampSpr, [0, 1], [2.2, 1.0])}) rotate(-6deg)`,
                opacity: stampSpr,
              }}
            >
              <div
                style={{
                  border: '6px solid #EF4444',
                  borderRadius: 16,
                  padding: '14px 38px',
                  background: 'rgba(239, 68, 68, 0.22)',
                  boxShadow: '0 0 40px rgba(239, 68, 68, 0.7)',
                }}
              >
                <span style={{ fontSize: 38, fontWeight: 900, color: '#EF4444', letterSpacing: 4, fontFamily: FONT_DISPLAY }}>
                  HỒ SƠ BỊ TỪ CHỐI ✕
                </span>
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* B-ROLL 2: JIRA BOARD & FLOWCHART WORKSPACE (10.0s - 14.5s) */}
      {broll2Active && (() => {
        const p = (currentTime - 10.0) / 4.5;
        const bZoom = interpolate(p, [0, 1], [1.0, 1.08]);
        const panX = interpolate(p, [0, 1], [0, -15]);
        const card1Spr = makeSpring(310);
        const card2Spr = makeSpring(335);
        return (
          <AbsoluteFill style={{ zIndex: 35 }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${bZoom}) translate(${panX}px, 0px)`,
                overflow: 'hidden',
              }}
            >
              <Img
                src={staticFile('library/broll/broll_jira_flowchart.jpg')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Interactive Animated UI Chips */}
            <div style={{ position: 'absolute', top: 180, left: 60, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  transform: `translateX(${(1 - card1Spr) * -80}px)`,
                  opacity: card1Spr,
                  background: 'rgba(15, 23, 42, 0.94)',
                  border: '1.5px solid #38BDF8',
                  padding: '12px 24px',
                  borderRadius: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 8px #38BDF8' }} />
                <span style={{ color: '#F1F5F9', fontWeight: 800, fontSize: 20 }}>JIRA: [PROJ-104] USER STORY SPEC</span>
              </div>
              <div
                style={{
                  transform: `translateX(${(1 - card2Spr) * -80}px)`,
                  opacity: card2Spr,
                  background: 'rgba(15, 23, 42, 0.94)',
                  border: '1.5px solid #10B981',
                  padding: '12px 24px',
                  borderRadius: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                <span style={{ color: '#F1F5F9', fontWeight: 800, fontSize: 20 }}>FIGMA: BPMN FLOWCHART DIAGRAM</span>
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* B-ROLL 3: ROBOT ASSEMBLY LINE (28.5s - 32.5s) */}
      {broll3Active && (() => {
        const p = (currentTime - 28.5) / 4.0;
        const bZoom = interpolate(p, [0, 1], [1.0, 1.10]);
        const robotSpr = makeSpring(860);
        return (
          <AbsoluteFill style={{ zIndex: 35 }}>
            <div style={{ width: '100%', height: '100%', transform: `scale(${bZoom})`, overflow: 'hidden' }}>
              <Img
                src={staticFile('library/broll/broll_robot_factory.jpg')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Warning Robotic Tag */}
            <div
              style={{
                position: 'absolute',
                top: 200,
                left: 50,
                right: 50,
                display: 'flex',
                justifyContent: 'center',
                transform: `scale(${interpolate(robotSpr, [0, 1], [0.88, 1.0])})`,
                opacity: robotSpr,
              }}
            >
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '2px solid #F43F5E',
                  borderRadius: 24,
                  padding: '20px 36px',
                  textAlign: 'center',
                  boxShadow: '0 0 40px rgba(244, 63, 94, 0.5)',
                }}
              >
                <div style={{ color: '#F43F5E', fontWeight: 800, fontSize: 18, letterSpacing: 2 }}>CẠM BẪY HỌC NGHỀ</div>
                <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 36, marginTop: 4 }}>"THỢ DÙNG TOOL" ⚙️</div>
                <div style={{ color: '#94A3B8', fontSize: 18, marginTop: 4 }}>Chỉ bấm nút cơ học - Thiếu tư duy nghiệp vụ</div>
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* B-ROLL 4: SINGER WITH STAGE MIC (44.0s - 49.5s) */}
      {broll4Active && (() => {
        const p = (currentTime - 44.0) / 5.5;
        const bZoom = interpolate(p, [0, 1], [1.0, 1.09]);
        const micSpr = makeSpring(1325);
        return (
          <AbsoluteFill style={{ zIndex: 35 }}>
            <div style={{ width: '100%', height: '100%', transform: `scale(${bZoom})`, overflow: 'hidden' }}>
              <Img
                src={staticFile('library/broll/broll_singer_mic.jpg')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Golden Quote Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: 240,
                left: 50,
                right: 50,
                display: 'flex',
                justifyContent: 'center',
                transform: `translateY(${(1 - micSpr) * 40}px)`,
                opacity: micSpr,
              }}
            >
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.92)',
                  border: '2px solid #FACC15',
                  borderRadius: 24,
                  padding: '24px 38px',
                  textAlign: 'center',
                  boxShadow: '0 0 50px rgba(250, 204, 21, 0.4), 0 20px 60px rgba(0,0,0,0.8)',
                }}
              >
                <div style={{ color: '#FACC15', fontWeight: 800, fontSize: 20, letterSpacing: 2 }}>ẨN DỤ SẮC BÉN 🎙️</div>
                <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 32, marginTop: 6, fontStyle: 'italic' }}>
                  "Cầm mic lên không có nghĩa bạn sẽ trở thành ca sĩ!"
                </div>
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* B-ROLL 5: STRATEGIC CHESS & ROOT CAUSE LOGIC (58.0s - 63.5s) */}
      {broll5Active && (() => {
        const p = (currentTime - 58.0) / 5.5;
        const bZoom = interpolate(p, [0, 1], [1.02, 1.09]);
        const chessSpr = makeSpring(1745);
        return (
          <AbsoluteFill style={{ zIndex: 35 }}>
            <div style={{ width: '100%', height: '100%', transform: `scale(${bZoom})`, overflow: 'hidden' }}>
              <Img
                src={staticFile('library/broll/broll_strategic_chess.jpg')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Analytical Root Cause Card */}
            <div
              style={{
                position: 'absolute',
                top: 200,
                left: 50,
                right: 50,
                display: 'flex',
                justifyContent: 'center',
                transform: `scale(${interpolate(chessSpr, [0, 1], [0.88, 1.0])})`,
                opacity: chessSpr,
              }}
            >
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.94)',
                  border: '2px solid #38BDF8',
                  borderRadius: 24,
                  padding: '24px 40px',
                  textAlign: 'center',
                  boxShadow: '0 0 50px rgba(56, 189, 248, 0.4)',
                }}
              >
                <div style={{ color: '#38BDF8', fontWeight: 800, fontSize: 18, letterSpacing: 2 }}>TƯ DUY PHÂN TÍCH GỐC RỄ 💡</div>
                <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 36, marginTop: 4 }}>ROOT CAUSE LÀ GÌ?</div>
                <div style={{ color: '#94A3B8', fontSize: 19, marginTop: 4 }}>Hiểu sâu bản chất hệ thống thay vì vẽ vỏ bọc</div>
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* ─── 3. WHITE FLASH & CINEMATIC TRANSITION ─── */}
      {isFlash && (
        <AbsoluteFill
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            zIndex: 48,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ─── 4. MULTI-LAYER AUDIO PIPELINE (SFX + Ambient BGM) ─── */}
      <Audio src={staticFile('library/music/clips/lofi-warm.mp3')} volume={0.05} loop />

      {/* Synchronized Foley SFX Library (Clean 48kHz WAV) */}
      <Sequence from={24} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-soft.wav')} volume={0.35} /></Sequence>
      <Sequence from={36} durationInFrames={30}><Audio src={staticFile('sfx/stamp-hit.wav')} volume={0.6} /></Sequence>
      <Sequence from={114} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-reverse.wav')} volume={0.35} /></Sequence>
      <Sequence from={300} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-soft.wav')} volume={0.35} /></Sequence>
      <Sequence from={315} durationInFrames={60}><Audio src={staticFile('sfx/keys-typing-soft.wav')} volume={0.4} /></Sequence>
      <Sequence from={435} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-reverse.wav')} volume={0.35} /></Sequence>
      <Sequence from={600} durationInFrames={30}><Audio src={staticFile('sfx/bass_thud.wav')} volume={0.5} /></Sequence>
      <Sequence from={855} durationInFrames={30}><Audio src={staticFile('sfx/glitch-zap.wav')} volume={0.4} /></Sequence>
      <Sequence from={975} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-reverse.wav')} volume={0.35} /></Sequence>
      <Sequence from={1320} durationInFrames={45}><Audio src={staticFile('sfx/chime-magic.wav')} volume={0.45} /></Sequence>
      <Sequence from={1485} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-reverse.wav')} volume={0.35} /></Sequence>
      <Sequence from={1740} durationInFrames={30}><Audio src={staticFile('sfx/chess-piece-thock.wav')} volume={0.5} /></Sequence>
      <Sequence from={1905} durationInFrames={30}><Audio src={staticFile('sfx/whoosh-reverse.wav')} volume={0.35} /></Sequence>
      <Sequence from={4434} durationInFrames={30}><Audio src={staticFile('sfx/pop.wav')} volume={0.5} /></Sequence>

      {/* ─── 5. DYNAMIC GRAPHIC OVERLAYS ON A-ROLL FOOTAGE ─── */}

      {/* BEAT 2: CHECKLIST CARD (4.5s - 9.0s) */}
      {currentTime >= 4.5 && currentTime <= 9.0 && (() => {
        const spr = makeSpring(135);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 50,
              right: 50,
              transform: `translateY(${(1 - spr) * -30}px)`,
              opacity: spr,
              zIndex: 30,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.94)',
                borderRadius: 24,
                padding: '24px 36px',
                border: '1.5px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#38BDF8', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                HỌC RẤT NHIỀU CÔNG CỤ:
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>
                  <span style={{ color: '#10B981' }}>✓</span> Viết User Story & Vẽ Flowchart thành thạo
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 700, color: '#94A3B8' }}>
                  <span style={{ color: '#10B981' }}>✓</span> Biết dùng Jira, Confluence mượt mà
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 700, color: '#94A3B8' }}>
                  <span style={{ color: '#10B981' }}>✓</span> Soạn tài liệu Document theo template chuẩn
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 3: THE FATAL QUESTION (20.0s - 23.5s) */}
      {currentTime >= 20.0 && currentTime <= 23.5 && (() => {
        const spr = makeSpring(600);
        return (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 50,
              right: 50,
              transform: `translateY(${(1 - spr) * -25}px) scale(${interpolate(spr, [0, 1], [0.88, 1.0])})`,
              opacity: spr,
              zIndex: 30,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderRadius: 24,
                padding: '28px 36px',
                border: '2px solid rgba(239, 68, 68, 0.6)',
                boxShadow: '0 0 50px rgba(239, 68, 68, 0.4), 0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F87171', letterSpacing: 2, textTransform: 'uppercase' }}>
                CÂU HỎI PHỎNG VẤN CHUYÊN SÂU 🎯
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', marginTop: 10, lineHeight: 1.3 }}>
                "Tại sao trong trường hợp này em lại chọn hỏi câu hỏi đó?"
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
              top: 150,
              left: 50,
              right: 50,
              transform: `translateY(${(1 - spr) * -25}px) scale(${interpolate(spr, [0, 1], [0.88, 1.0])})`,
              opacity: spr,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                borderRadius: 28,
                padding: '28px 44px',
                border: '2px solid #38BDF8',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.5), 0 20px 70px rgba(0, 0, 0, 0.8)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: '#38BDF8', letterSpacing: 2, textTransform: 'uppercase' }}>
                LỘ TRÌNH THỰC CHIẾN CHUYÊN SÂU 🚀
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                Comment "IM" để nhận lịch Mock Interview 1-1
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── 6. KINETIC WORD-BY-WORD POP SUBTITLE PILL (ELIMINATES STIFFNESS) ─── */}
      {activeSub && (() => {
        const subDuration = Math.max(0.1, activeSub.e - activeSub.s);
        const progress = Math.max(0, Math.min(1, (currentTime - activeSub.s) / subDuration));
        const words = activeSub.text.split(' ');
        const activeWordIndex = Math.min(words.length - 1, Math.floor(progress * words.length));

        return (
          <div
            style={{
              position: 'absolute',
              bottom: 130,
              left: 40,
              right: 40,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                background: 'rgba(11, 17, 33, 0.94)',
                padding: '18px 30px',
                borderRadius: 24,
                border: '1px solid rgba(255, 255, 255, 0.16)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7)',
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
