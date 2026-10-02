import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EditorialPunchIn } from '../types';

interface HandheldDriftProps {
  frame: number;
  currentTime: number;
  punchIns?: EditorialPunchIn[];
  children: React.ReactNode;
}

export const HandheldDrift: React.FC<HandheldDriftProps> = ({
  frame,
  currentTime,
  punchIns = [],
  children,
}) => {
  // 1. Organic Handheld Sway
  const driftX = Math.sin(frame / 42) * 2.0;
  const driftY = Math.cos(frame / 52) * 1.5;
  const driftRotate = Math.sin(frame / 65) * 0.08;

  // 2. Multi-Cam Dynamic Punch-In
  let baseZoom = 1.0;
  for (const punch of punchIns) {
    if (currentTime >= punch.start && currentTime < punch.end) {
      baseZoom = punch.zoom;
      break;
    }
  }

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translate(${driftX}px, ${driftY}px) scale(${baseZoom}) rotate(${driftRotate}deg)`,
          transformOrigin: 'center 38%',
          transition: 'transform 0.25s ease-out',
        }}
      >
        {children}

        {/* Cinematic gradient overlay for subtitle and text readability */}
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(to bottom, rgba(10, 5, 6, 0.55) 0%, rgba(10, 5, 6, 0.12) 28%, rgba(10, 5, 6, 0.10) 65%, rgba(10, 5, 6, 0.80) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
