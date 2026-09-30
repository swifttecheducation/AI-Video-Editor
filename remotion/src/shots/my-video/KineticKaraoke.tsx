import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { FONT_BODY } from '../../fonts';
import { COLORS } from '../../brand';
import { KARAOKE_PHRASES } from './captionsData';

export const KineticKaraoke: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find active phrase
  const activePhrase = KARAOKE_PHRASES.find(
    (p) => currentTime >= p.start && currentTime <= p.end
  );

  if (!activePhrase) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 330,
        left: 36,
        right: 36,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {activePhrase.words.map((item, idx) => {
        const isWordActive =
          currentTime >= item.start && currentTime <= item.end;

        // Bouncy spring pop when word becomes active
        const wordSpring = spring({
          frame: Math.max(0, Math.round((currentTime - item.start) * fps)),
          fps,
          config: { damping: 12, stiffness: 220, mass: 0.6 },
        });

        const scale = isWordActive ? 1 + 0.16 * wordSpring : 1.0;

        return (
          <div
            key={idx}
            style={{
              transform: `scale(${scale})`,
              transition: 'transform 0.08s ease-out',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isWordActive ? '6px 16px' : '4px 8px',
              borderRadius: 16,
              background: isWordActive
                ? COLORS.accent
                : 'rgba(20, 16, 15, 0.45)',
              backdropFilter: isWordActive ? 'none' : 'blur(8px)',
              boxShadow: isWordActive
                ? '0 10px 30px rgba(114, 0, 0, 0.55), 0 2px 8px rgba(0,0,0,0.4)'
                : 'none',
              border: isWordActive
                ? `1.5px solid rgba(255, 255, 255, 0.4)`
                : '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 42,
                fontWeight: isWordActive ? 800 : 700,
                color: isWordActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.92)',
                textShadow: isWordActive
                  ? '0 2px 10px rgba(0,0,0,0.5)'
                  : '0 2px 8px rgba(0,0,0,0.8)',
                letterSpacing: 0.5,
              }}
            >
              {item.word}
            </span>
          </div>
        );
      })}
    </div>
  );
};
