import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT_BODY } from '../../fonts';
import { KARAOKE_PHRASES } from './captionsData';

export const CinematicMinimalistKaraoke: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find the active phrase
  const activePhrase = KARAOKE_PHRASES.find(
    (p) => currentTime >= p.start && currentTime <= p.end
  );

  if (!activePhrase) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 280,
        left: 50,
        right: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px 14px',
          maxWidth: 920,
          textAlign: 'center',
        }}
      >
        {activePhrase.words.map((item, idx) => {
          const isWordActive =
            currentTime >= item.start && currentTime <= item.end;

          return (
            <span
              key={idx}
              style={{
                fontFamily: FONT_BODY,
                fontStyle: 'italic',
                fontSize: 42,
                fontWeight: isWordActive ? 800 : 600,
                color: isWordActive ? '#F5B838' : '#FFFFFF',
                textShadow: isWordActive
                  ? '0 0 16px rgba(245, 184, 56, 0.6), 0 3px 12px rgba(0, 0, 0, 0.9)'
                  : '0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.8)',
                letterSpacing: 0.5,
                transform: isWordActive ? 'scale(1.06)' : 'scale(1.0)',
                transition: 'color 0.08s ease, transform 0.08s ease',
                display: 'inline-block',
              }}
            >
              {item.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
