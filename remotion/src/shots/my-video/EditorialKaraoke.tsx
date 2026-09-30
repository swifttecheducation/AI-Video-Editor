import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { FONT_BODY } from '../../fonts';
import { COLORS } from '../../brand';
import { KARAOKE_PHRASES } from './captionsData';

export const EditorialKaraoke: React.FC = () => {
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
        bottom: 230,
        left: 48,
        right: 48,
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
          gap: '10px 14px',
          maxWidth: 960,
          padding: '12px 24px',
          background: 'rgba(21, 19, 19, 0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 24,
          border: '1px solid rgba(212, 202, 190, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        }}
      >
        {activePhrase.words.map((item, idx) => {
          const isWordActive =
            currentTime >= item.start && currentTime <= item.end;

          const spr = spring({
            frame: Math.max(0, Math.round((currentTime - item.start) * fps)),
            fps,
            config: { damping: 15, stiffness: 200, mass: 0.6 },
          });

          return (
            <span
              key={idx}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 38,
                fontWeight: isWordActive ? 700 : 500,
                color: isWordActive ? COLORS.accent : 'rgba(248, 245, 242, 0.88)',
                backgroundColor: isWordActive ? COLORS.paper : 'transparent',
                padding: isWordActive ? '2px 10px' : '2px 0px',
                borderRadius: 8,
                transform: isWordActive ? `scale(${1 + 0.05 * spr})` : 'scale(1)',
                transition: 'all 0.1s ease-out',
                display: 'inline-block',
                letterSpacing: 0.3,
                boxShadow: isWordActive
                  ? '0 4px 16px rgba(0,0,0,0.25)'
                  : 'none',
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
