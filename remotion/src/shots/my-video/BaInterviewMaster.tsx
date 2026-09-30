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

export const compositionConfig = {
  id: 'BaInterviewMaster',
  durationInSeconds: 157.62,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Subtitles synced with edited-transcript.json
const CAPTIONS = [
  { s: 0.16, e: 4.3, text: 'Tuần trước mình lại phải từ chối một bạn đã đăng ký Interview Master.' },
  { s: 4.3, e: 10.5, text: 'Không phải bạn ấy không cố gắng, bạn ấy biết dùng Jira, viết User Story...' },
  { s: 10.5, e: 15.6, text: 'biết vẽ Flowchart, viết tài liệu theo template rất đầy đủ.' },
  { s: 15.6, e: 23.54, text: 'Nhưng khi mình hỏi: "Tại sao em lại chọn hỏi câu hỏi đó?" thì bạn lúng túng.' },
  { s: 24.06, e: 32.48, text: 'Mình nhận ra rất nhiều bạn học BA như một người thợ dùng công cụ.' },
  { s: 32.92, e: 42.92, text: 'Cứ nghĩ vẽ flowchart đẹp, dùng Jira, Figma thành thạo là thành BA.' },
  { s: 43.26, e: 50.74, text: 'Nhưng đó chỉ là công cụ. Biết cầm mic không có nghĩa bạn là ca sĩ!' },
  { s: 51.26, e: 56.68, text: 'Người thợ chỉ ghi lại chính xác những gì khách hàng yêu cầu.' },
  { s: 56.84, e: 64.06, text: 'BA thật sự luôn hỏi: Tại sao cần tính năng này? Vấn đề thực sự là gì?' },
  { s: 64.34, e: 68.56, text: 'Và nếu thay đổi thì hệ thống sẽ bị ảnh hưởng những gì?' },
  { s: 68.94, e: 74.24, text: 'Bản chất BA chưa bao giờ là nghề gõ tài liệu hay vẽ sơ đồ.' },
  { s: 74.7, e: 78.26, text: 'BA là nghề giải quyết bài toán kinh doanh bằng công nghệ.' },
  { s: 78.85, e: 86.59, text: 'Trong thời đại AI, công cụ sẽ ngày càng dễ dùng hơn.' },
  { s: 86.59, e: 92.28, text: 'Học tool có thể chỉ mất vài tuần đến một tháng.' },
  { s: 92.28, e: 96.96, text: 'Nhưng tư duy phân tích mới cần rất nhiều thời gian mài giũa.' },
  { s: 97.45, e: 102.68, text: 'Đó là lý do mình nhận rất ít học viên cho Interview Master.' },
  { s: 102.68, e: 113.84, text: 'Tự học không có định hướng thì khả năng phân tích sẽ rất yếu.' },
  { s: 114.25, e: 126.6, text: 'Interview Master tập trung vào mock interview và chiến lược tìm việc.' },
  { s: 126.83, e: 133.47, text: 'Yêu cầu đầu vào cao để đảm bảo bạn đã có nền tảng tư duy.' },
  { s: 134.05, e: 147.35, text: 'Nếu bạn nỗ lực mãi chưa tìm được việc: Bạn đang học sai trọng tâm.' },
  { s: 147.85, e: 157.27, text: 'Hãy comment IM để nhận lịch Mock Interview và lộ trình thực chiến!' },
];

export const BaInterviewMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const activeCaption = CAPTIONS.find((c) => currentTime >= c.s && currentTime <= c.e);

  return (
    <AbsoluteFill style={{ backgroundColor: '#090D16', overflow: 'hidden', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* 1. MASTER VIDEO FOOTAGE (BROADCAST NORMALIZED -14 LUFS) */}
      <AbsoluteFill>
        <Video
          src={staticFile('projects/my-video/master.mp4')}
          volume={1.0}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* 2. BACKGROUND MUSIC BED (SUBTLE BACKGROUND AT 5% VOLUME) */}
      <Audio
        src={staticFile('library/music/clips/lofi-warm.mp3')}
        volume={0.05}
        loop
      />

      {/* SUBTLE SFX TRIGGERS */}
      {frame === 8 && <Audio src={staticFile('library/sfx/clips/whoosh-soft.mp3')} volume={0.15} />}
      {frame === 150 && <Audio src={staticFile('library/sfx/clips/ui-click-soft.mp3')} volume={0.15} />}
      {frame === 485 && <Audio src={staticFile('library/sfx/clips/whoosh-soft.mp3')} volume={0.15} />}
      {frame === 730 && <Audio src={staticFile('library/sfx/clips/pop-reveal.mp3')} volume={0.15} />}
      {frame === 2240 && <Audio src={staticFile('library/sfx/clips/impact-soft.mp3')} volume={0.18} />}

      {/* 3. SCALED-UP, PROPORTIONATE VISUAL BEATS (OPTIMIZED FOR 1080x1920) */}

      {/* Beat 1: Hook Headline Banner (0.3s - 4.2s) */}
      {currentTime >= 0.3 && currentTime <= 4.2 && (
        <TopCard frame={frame} enterFrame={9} exitFrame={126} fps={fps}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.90)',
            backdropFilter: 'blur(28px)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 24,
            padding: '28px 48px',
            width: 920,
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}>
            <span style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#F43F5E',
              boxShadow: '0 0 20px #F43F5E',
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, color: '#94A3B8', textTransform: 'uppercase' }}>
                HỒ SƠ ỨNG VIÊN PHỎNG VẤN
              </div>
              <div style={{ fontSize: 38, fontWeight: 800, color: '#F8FAFC', marginTop: 6, lineHeight: 1.25 }}>
                Đã học BA gần 1 năm nhưng vẫn bị từ chối
              </div>
            </div>
          </div>
        </TopCard>
      )}

      {/* Beat 2: Authentic Jira UI Screencast Mockup (5.0s - 15.0s) */}
      {currentTime >= 5.0 && currentTime <= 15.0 && (
        <TopCard frame={frame} enterFrame={150} exitFrame={450} fps={fps}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(32px)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 24,
            padding: '36px 48px',
            width: 920,
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
          }}>
            {/* Window title bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#10B981' }} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#94A3B8', letterSpacing: 1.5, textTransform: 'uppercase' }}>KỸ NĂNG ỨNG VIÊN TỰ TIN</span>
            </div>

            {/* Checklist items - Highlight dynamically as spoken */}
            <div style={{ marginTop: 22 }}>
              <MinimalRow
                label="Dùng Jira & Viết User Story thành thạo"
                active={currentTime >= 5.5}
                isCurrent={currentTime >= 5.5 && currentTime < 9.0}
              />
              <MinimalRow
                label="Vẽ sơ đồ quy trình Flowchart chi tiết"
                active={currentTime >= 9.0}
                isCurrent={currentTime >= 9.0 && currentTime < 12.0}
              />
              <MinimalRow
                label="Soạn tài liệu Document theo template chuẩn"
                active={currentTime >= 12.0}
                isCurrent={currentTime >= 12.0}
              />
            </div>
          </div>
        </TopCard>
      )}

      {/* Beat 3: The Fatal Question (16.2s - 23.3s) - DYNAMIC SPEECH HIGHLIGHT */}
      {currentTime >= 16.2 && currentTime <= 23.3 && (() => {
        // 16.2s - 18.5s: Setup ("Đó, nhưng mà trong lúc interview chuyên sâu hơn...") -> Neutral (no highlight yet)
        // 18.5s - 22.0s: Question spoken ("Tại sao trong trường hợp này em lại chọn hỏi câu hỏi đó?") -> Highlight Question
        // 22.0s - 23.3s: Reaction spoken ("Thì bạn ấy bắt đầu lúng túng") -> Highlight Warning
        const isQuestionActive = currentTime >= 18.5 && currentTime < 22.0;
        const isWarningActive = currentTime >= 22.0;

        return (
          <TopCard frame={frame} enterFrame={486} exitFrame={699} fps={fps}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.94)',
              backdropFilter: 'blur(32px)',
              border: isWarningActive ? '2.5px solid rgba(244, 63, 94, 0.6)' : (isQuestionActive ? '2.5px solid rgba(56, 189, 248, 0.6)' : '2px solid rgba(255, 255, 255, 0.15)'),
              borderRadius: 24,
              padding: '36px 48px',
              width: 920,
              boxShadow: isWarningActive
                ? '0 0 50px rgba(244, 63, 94, 0.35), 0 30px 80px rgba(0, 0, 0, 0.7)'
                : (isQuestionActive ? '0 0 50px rgba(56, 189, 248, 0.35), 0 30px 80px rgba(0, 0, 0, 0.7)' : '0 30px 80px rgba(0, 0, 0, 0.7)'),
              textAlign: 'left',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <div style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 2,
                color: isQuestionActive ? '#38BDF8' : '#94A3B8',
                textTransform: 'uppercase',
                transition: 'color 0.25s ease',
              }}>
                CÂU HỎI PHỎNG VẤN CHUYÊN SÂU
              </div>

              {/* The Question (18.5s - 22.0s) */}
              <div style={{
                fontSize: 38,
                fontWeight: 800,
                color: isQuestionActive ? '#FFFFFF' : '#E2E8F0',
                marginTop: 12,
                lineHeight: 1.3,
                padding: '12px 18px',
                borderRadius: 16,
                backgroundColor: isQuestionActive ? 'rgba(56, 189, 248, 0.16)' : 'transparent',
                border: isQuestionActive ? '1.5px solid rgba(56, 189, 248, 0.5)' : '1.5px solid transparent',
                boxShadow: isQuestionActive ? '0 0 30px rgba(56, 189, 248, 0.3)' : 'none',
                transform: isQuestionActive ? 'scale(1.02)' : 'scale(1.0)',
                transformOrigin: 'left center',
                opacity: isQuestionActive ? 1.0 : (isWarningActive ? 0.45 : 0.85),
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                "Tại sao trong trường hợp này em lại chọn hỏi câu hỏi đó?"
              </div>

              {/* The Warning: Ứng viên lúng túng (22.0s - 23.3s) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginTop: 18,
                padding: '14px 20px',
                borderRadius: 16,
                backgroundColor: isWarningActive ? 'rgba(244, 63, 94, 0.22)' : 'transparent',
                border: isWarningActive ? '2px solid #F43F5E' : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isWarningActive ? '0 0 35px rgba(244, 63, 94, 0.45)' : 'none',
                transform: isWarningActive ? 'scale(1.03)' : 'scale(1.0)',
                transformOrigin: 'left center',
                opacity: isWarningActive ? 1.0 : 0.35,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <span style={{ fontSize: 28, filter: isWarningActive ? 'drop-shadow(0 0 8px #F43F5E)' : 'none' }}>⚠️</span>
                <span style={{
                  fontSize: 24,
                  fontWeight: isWarningActive ? 800 : 600,
                  color: isWarningActive ? '#FFA4B2' : '#64748B',
                  letterSpacing: -0.2,
                }}>
                  Ứng viên lúng túng — chưa hiểu lý do đằng sau quyết định
                </span>
              </div>
            </div>
          </TopCard>
        );
      })()}

      {/* Beat 4: Sleek Contrast Card (24.5s - 32.2s) - DYNAMIC SPEECH HIGHLIGHT */}
      {currentTime >= 24.5 && currentTime <= 32.2 && (() => {
        // 24.5s - 27.0s: Setup ("Và lúc đó mình nhận ra rất nhiều bạn...") -> Neutral (no card highlighted yet)
        // 27.0s - 29.8s: "thợ dùng công cụ" -> Highlight Left Card (Thợ dùng tool)
        // 29.8s - 32.2s: "chứ không phải làm phân tích" -> Highlight Right Card (BA thực thụ)
        const isToolActive = currentTime >= 27.0 && currentTime < 29.8;
        const isAnalysisActive = currentTime >= 29.8;
        const isNeutral = !isToolActive && !isAnalysisActive;

        return (
          <TopCard frame={frame} enterFrame={735} exitFrame={966} fps={fps}>
            <div style={{
              display: 'flex',
              gap: 28,
              width: 960,
              alignItems: 'stretch',
            }}>
              {/* Card 1: Thợ dùng tool */}
              <div style={{
                flex: 1,
                background: isToolActive ? 'rgba(28, 15, 25, 0.96)' : 'rgba(15, 23, 42, 0.70)',
                backdropFilter: 'blur(32px)',
                border: isToolActive ? '3px solid #F43F5E' : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 24,
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: isToolActive ? '0 0 50px rgba(244, 63, 94, 0.5), 0 20px 60px rgba(0, 0, 0, 0.6)' : 'none',
                transform: isToolActive ? 'scale(1.04)' : (isNeutral ? 'scale(1.0)' : 'scale(0.96)'),
                opacity: isToolActive ? 1.0 : (isNeutral ? 0.85 : 0.4),
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <div style={{
                  display: 'inline-block',
                  background: isToolActive ? 'rgba(244, 63, 94, 0.25)' : 'transparent',
                  padding: '6px 18px',
                  borderRadius: 20,
                  border: isToolActive ? '1.5px solid #F43F5E' : '1.5px solid transparent',
                  fontSize: 20,
                  fontWeight: 800,
                  color: isToolActive ? '#F43F5E' : '#94A3B8',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}>
                  HỌC SAI CÁCH ❌
                </div>
                <div style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: isToolActive ? '#FFFFFF' : '#94A3B8',
                  marginTop: 16,
                }}>
                  THỢ DÙNG TOOL
                </div>
                <div style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: isToolActive ? '#FCA5A5' : '#64748B',
                  marginTop: 14,
                }}>
                  Chỉ biết thao tác & bấm nút
                </div>
              </div>

              {/* Card 2: BA thực thụ */}
              <div style={{
                flex: 1,
                background: isAnalysisActive ? 'rgba(20, 30, 60, 0.96)' : 'rgba(15, 23, 42, 0.70)',
                backdropFilter: 'blur(32px)',
                border: isAnalysisActive ? '3px solid #38BDF8' : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 24,
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: isAnalysisActive ? '0 0 50px rgba(56, 189, 248, 0.5), 0 20px 60px rgba(0, 0, 0, 0.6)' : 'none',
                transform: isAnalysisActive ? 'scale(1.04)' : (isNeutral ? 'scale(1.0)' : 'scale(0.96)'),
                opacity: isAnalysisActive ? 1.0 : (isNeutral ? 0.85 : 0.4),
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <div style={{
                  display: 'inline-block',
                  background: isAnalysisActive ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                  padding: '6px 18px',
                  borderRadius: 20,
                  border: isAnalysisActive ? '1.5px solid #38BDF8' : '1.5px solid transparent',
                  fontSize: 20,
                  fontWeight: 800,
                  color: isAnalysisActive ? '#38BDF8' : '#94A3B8',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}>
                  BA THỰC THỤ ✅
                </div>
                <div style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: isAnalysisActive ? '#FFFFFF' : '#94A3B8',
                  marginTop: 16,
                }}>
                  LÀM PHÂN TÍCH
                </div>
                <div style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: isAnalysisActive ? '#BAE6FD' : '#64748B',
                  marginTop: 14,
                }}>
                  Hiểu nguyên lý & bản chất
                </div>
              </div>
            </div>
          </TopCard>
        );
      })()}

      {/* Beat 5: Minimalist Quote (43.5s - 50.2s) */}
      {currentTime >= 43.5 && currentTime <= 50.2 && (
        <TopCard frame={frame} enterFrame={1305} exitFrame={1506} fps={fps}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(32px)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 24,
            padding: '34px 50px',
            width: 920,
            textAlign: 'center',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.65)',
          }}>
            <div style={{ fontSize: 34, fontStyle: 'italic', fontWeight: 700, color: '#F8FAFC', lineHeight: 1.35 }}>
              "Cầm mic lên không có nghĩa bạn sẽ trở thành ca sĩ."
            </div>
            <div style={{ fontSize: 22, color: '#94A3B8', marginTop: 14, fontWeight: 600 }}>
              Biết bấm công cụ ≠ Có năng lực phân tích nghiệp vụ
            </div>
          </div>
        </TopCard>
      )}

      {/* Beat 6: 3 Câu hỏi cốt lõi (57.0s - 68.0s) */}
      {currentTime >= 57.0 && currentTime <= 68.0 && (
        <TopCard frame={frame} enterFrame={1710} exitFrame={2040} fps={fps}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(32px)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 24,
            padding: '32px 48px',
            width: 920,
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, color: '#818CF8', textTransform: 'uppercase', marginBottom: 18 }}>
              TƯ DUY PHẢN BIỆN CỦA BA THỰC THỤ
            </div>
            <QuestionLine
              num="1"
              text="Tại sao họ lại cần tính năng này?"
              active={currentTime >= 57.0}
              isCurrent={currentTime >= 57.0 && currentTime < 60.5}
            />
            <QuestionLine
              num="2"
              text="Bản chất vấn đề thực sự đằng sau là gì?"
              active={currentTime >= 60.5}
              isCurrent={currentTime >= 60.5 && currentTime < 64.3}
            />
            <QuestionLine
              num="3"
              text="Thay đổi sẽ tác động gì tới toàn bộ hệ thống?"
              active={currentTime >= 64.3}
              isCurrent={currentTime >= 64.3}
            />
          </div>
        </TopCard>
      )}

      {/* Beat 7: Core Definition (74.7s - 78.3s) */}
      {currentTime >= 74.7 && currentTime <= 78.3 && (
        <TopCard frame={frame} enterFrame={2241} exitFrame={2349} fps={fps}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(36px)',
            border: '2px solid #818CF8',
            borderRadius: 24,
            padding: '36px 52px',
            width: 920,
            textAlign: 'center',
            boxShadow: '0 24px 70px rgba(99, 102, 241, 0.3)',
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2.5, color: '#94A3B8', textTransform: 'uppercase' }}>
              BẢN CHẤT CỦA BUSINESS ANALYSIS
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: '#F8FAFC', marginTop: 12, lineHeight: 1.3 }}>
              Giải quyết bài toán <span style={{ color: '#60A5FA' }}>KINH DOANH</span> bằng <span style={{ color: '#34D399' }}>CÔNG NGHỆ</span>
            </div>
          </div>
        </TopCard>
      )}

      {/* Beat 8: AI Landscape Note (86.8s - 96.5s) */}
      {currentTime >= 86.8 && currentTime <= 96.5 && (
        <TopCard frame={frame} enterFrame={2604} exitFrame={2895} fps={fps}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(32px)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 24,
            padding: '32px 48px',
            width: 920,
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1.5, color: '#A78BFA', textTransform: 'uppercase' }}>
              XU HƯỚNG THỜI ĐẠI AI
            </div>
            <div style={{ marginTop: 20 }}>
              {/* Row 1: Tool (86.8s - 92.0s) */}
              <div style={{
                padding: '14px 20px',
                borderRadius: 16,
                backgroundColor: (currentTime >= 86.8 && currentTime < 92.0) ? 'rgba(56, 189, 248, 0.16)' : 'transparent',
                border: (currentTime >= 86.8 && currentTime < 92.0) ? '1.5px solid rgba(56, 189, 248, 0.45)' : '1.5px solid transparent',
                transform: (currentTime >= 86.8 && currentTime < 92.0) ? 'scale(1.02)' : 'scale(0.98)',
                opacity: (currentTime >= 86.8 && currentTime < 92.0) ? 1.0 : 0.45,
                transition: 'all 0.25s ease',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 24, color: (currentTime >= 86.8 && currentTime < 92.0) ? '#FFFFFF' : '#94A3B8', fontWeight: 700 }}>Học cách dùng Tool</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#38BDF8' }}>Vài tuần đến 1 tháng ⚡</span>
                </div>
                <div style={{ width: '100%', height: 10, background: '#1E293B', borderRadius: 5, marginTop: 10 }}>
                  <div style={{ width: '30%', height: '100%', background: '#38BDF8', borderRadius: 5, boxShadow: (currentTime >= 86.8 && currentTime < 92.0) ? '0 0 16px #38BDF8' : 'none' }} />
                </div>
              </div>

              {/* Row 2: Tư duy (92.0s - 96.5s) */}
              <div style={{
                marginTop: 14,
                padding: '14px 20px',
                borderRadius: 16,
                backgroundColor: currentTime >= 92.0 ? 'rgba(129, 140, 248, 0.18)' : 'transparent',
                border: currentTime >= 92.0 ? '1.5px solid rgba(129, 140, 248, 0.5)' : '1.5px solid transparent',
                transform: currentTime >= 92.0 ? 'scale(1.02)' : 'scale(0.98)',
                opacity: currentTime >= 92.0 ? 1.0 : 0.45,
                transition: 'all 0.25s ease',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 24, color: currentTime >= 92.0 ? '#FFFFFF' : '#94A3B8', fontWeight: 700 }}>Tư duy phân tích nghiệp vụ</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#818CF8' }}>Cần nhiều năm mài giũa 🧠</span>
                </div>
                <div style={{ width: '100%', height: 10, background: '#1E293B', borderRadius: 5, marginTop: 10 }}>
                  <div style={{ width: '90%', height: '100%', background: '#818CF8', borderRadius: 5, boxShadow: currentTime >= 92.0 ? '0 0 16px #818CF8' : 'none' }} />
                </div>
              </div>
            </div>
          </div>
        </TopCard>
      )}

      {/* Beat 9: CTA Pill (147.8s - 157.2s) */}
      {currentTime >= 147.8 && (
        <TopCard frame={frame} enterFrame={4434} exitFrame={4716} fps={fps}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(36px)',
            border: '2.5px solid #818CF8',
            borderRadius: 24,
            padding: '36px 52px',
            width: 920,
            boxShadow: '0 30px 80px rgba(99, 102, 241, 0.4)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, color: '#818CF8', textTransform: 'uppercase' }}>
              LỘ TRÌNH THỰC CHIẾN CHUYÊN SÂU
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
              Comment IM để nhận lịch Mock Interview 1-1
            </div>
          </div>
        </TopCard>
      )}

      {/* 4. LARGE, HIGH-CONTRAST SUBTITLES (OPTIMIZED FOR 1080x1920) */}
      {activeCaption && (
        <div style={{
          position: 'absolute',
          bottom: 240,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            backgroundColor: 'rgba(10, 15, 26, 0.90)',
            backdropFilter: 'blur(28px)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 20,
            padding: '20px 36px',
            maxWidth: 960,
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
          }}>
            <span style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#F8FAFC',
              lineHeight: 1.35,
              letterSpacing: -0.3,
            }}>
              {activeCaption.text}
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Reusable micro-components for authentic UI
const TopCard: React.FC<{
  frame: number;
  enterFrame: number;
  exitFrame: number;
  fps: number;
  children: React.ReactNode;
}> = ({ frame, enterFrame, exitFrame, fps, children }) => {
  const enter = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  const exit = interpolate(
    frame,
    [exitFrame - 10, exitFrame],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = Math.min(enter, exit);
  const translateY = interpolate(enter, [0, 1], [-50, 0]);

  return (
    <div style={{
      position: 'absolute',
      top: 180,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      opacity,
      transform: `translateY(${translateY}px)`,
      zIndex: 20,
    }}>
      {children}
    </div>
  );
};

const MinimalRow: React.FC<{ label: string; active: boolean; isCurrent?: boolean }> = ({ label, active, isCurrent }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    marginTop: 14,
    padding: '12px 20px',
    borderRadius: 16,
    backgroundColor: isCurrent ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
    border: isCurrent ? '1.5px solid rgba(56, 189, 248, 0.5)' : '1.5px solid transparent',
    boxShadow: isCurrent ? '0 0 25px rgba(56, 189, 248, 0.3)' : 'none',
    transform: isCurrent ? 'scale(1.02)' : 'scale(1.0)',
    opacity: active ? (isCurrent ? 1.0 : 0.75) : 0.35,
    transition: 'all 0.25s ease',
  }}>
    <div style={{
      width: 16,
      height: 16,
      borderRadius: '50%',
      backgroundColor: active ? '#38BDF8' : 'rgba(255, 255, 255, 0.3)',
      boxShadow: isCurrent ? '0 0 16px #38BDF8' : 'none',
      flexShrink: 0,
    }} />
    <span style={{
      fontSize: 27,
      color: isCurrent ? '#38BDF8' : (active ? '#F8FAFC' : '#94A3B8'),
      fontWeight: isCurrent ? 800 : (active ? 700 : 500),
    }}>
      {label}
    </span>
  </div>
);

const QuestionLine: React.FC<{ num: string; text: string; active: boolean; isCurrent?: boolean }> = ({ num, text, active, isCurrent }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginTop: 14,
    padding: '12px 20px',
    borderRadius: 16,
    backgroundColor: isCurrent ? 'rgba(129, 140, 248, 0.18)' : 'transparent',
    border: isCurrent ? '1.5px solid rgba(129, 140, 248, 0.5)' : '1.5px solid transparent',
    boxShadow: isCurrent ? '0 0 25px rgba(129, 140, 248, 0.3)' : 'none',
    transform: isCurrent ? 'scale(1.02)' : 'scale(1.0)',
    opacity: active ? (isCurrent ? 1.0 : 0.75) : 0.35,
    transition: 'all 0.25s ease',
  }}>
    <span style={{ fontSize: 22, fontWeight: 900, color: isCurrent ? '#A5B4FC' : '#818CF8', width: 28 }}>{num}.</span>
    <span style={{
      fontSize: 26,
      color: isCurrent ? '#FFFFFF' : (active ? '#E2E8F0' : '#64748B'),
      fontWeight: isCurrent ? 800 : (active ? 700 : 500),
    }}>
      {text}
    </span>
  </div>
);

export default BaInterviewMaster;
