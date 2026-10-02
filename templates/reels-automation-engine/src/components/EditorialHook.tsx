import React from 'react';
import { spring } from 'remotion';
import { BrandConfig } from '../types';

interface EditorialHookProps {
  frame: number;
  fps: number;
  startFrame: number;
  line1: string;
  line2: string;
  line3?: string;
  brand: BrandConfig;
  topY?: number;
}

export const EditorialHook: React.FC<EditorialHookProps> = ({
  frame,
  fps,
  startFrame,
  line1,
  line2,
  line3,
  brand,
  topY = 180,
}) => {
  const makeSpring = (offset: number) =>
    spring({
      frame: Math.max(0, frame - (startFrame + offset)),
      fps,
      config: { damping: 14, stiffness: 120, mass: 0.7 },
    });

  const spr1 = makeSpring(0);
  const spr2 = makeSpring(15);
  const spr3 = makeSpring(32);

  const waveFloat = (offset = 0) => Math.sin((frame + offset) / 16) * 3.5;

  return (
    <div
      style={{
        position: 'absolute',
        top: topY,
        left: 40,
        right: 40,
        zIndex: 35,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Line 1 */}
      <div
        style={{
          transform: `scale(${spr1}) translateY(${waveFloat(0)}px)`,
          opacity: spr1,
          fontFamily: brand.typography.headingFont,
          fontSize: 74,
          fontWeight: 800,
          color: brand.palette.primaryText,
          lineHeight: 1.15,
          textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
          letterSpacing: 1,
        }}
      >
        {line1}
      </div>

      {/* Line 2 (Italic Secondary Accent) */}
      <div
        style={{
          transform: `scale(${spr2}) translateY(${waveFloat(8)}px)`,
          opacity: spr2,
          fontFamily: brand.typography.headingFont,
          fontSize: 68,
          fontStyle: 'italic',
          fontWeight: 600,
          color: brand.palette.secondaryText,
          lineHeight: 1.15,
          marginTop: 6,
          textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
        }}
      >
        {line2}
      </div>

      {/* Line 3 (Optional Emphasis) */}
      {line3 && (
        <div
          style={{
            transform: `scale(${spr3}) translateY(${waveFloat(16)}px)`,
            opacity: spr3,
            fontFamily: brand.typography.headingFont,
            fontSize: 74,
            fontWeight: 900,
            color: brand.palette.primaryText,
            lineHeight: 1.15,
            marginTop: 8,
            textShadow: '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
          }}
        >
          {line3}
        </div>
      )}
    </div>
  );
};
