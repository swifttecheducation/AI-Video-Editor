import React from 'react';
import { interpolate, spring } from 'remotion';
import { BrandConfig } from '../types';

interface SeriesBadgeProps {
  frame: number;
  fps: number;
  startFrame: number;
  brand: BrandConfig;
  headlineMain?: string;
  handwrittenSub?: string;
  topY?: number;
}

export const SeriesBadge: React.FC<SeriesBadgeProps> = ({
  frame,
  fps,
  startFrame,
  brand,
  headlineMain = 'CUỘC SỐNG TRƯỚC ➔ BUSINESS SAU',
  handwrittenSub = 'bắt đầu từ lối sống bạn muốn ~',
  topY = 180,
}) => {
  const sprTitle = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.7 },
  });

  const sprMain = spring({
    frame: Math.max(0, frame - (startFrame + 15)),
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.7 },
  });

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
        transform: `scale(${interpolate(sprTitle, [0, 1], [0.94, 1.0])})`,
        opacity: sprTitle,
      }}
    >
      {/* Top Header Pill */}
      <div
        style={{
          fontFamily: brand.typography.bodyFont,
          fontSize: 30,
          fontWeight: 800,
          color: brand.palette.accentSecondary,
          letterSpacing: 4,
          textTransform: 'uppercase',
          textShadow: '0 2px 10px rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span>{brand.header.seriesTitle}</span>
        <span
          style={{
            background: brand.palette.accentPrimary,
            color: brand.palette.primaryText,
            padding: '5px 16px',
            borderRadius: 8,
            fontSize: 20,
            fontWeight: 900,
          }}
        >
          {brand.header.episodeLabel}
        </span>
      </div>

      {/* Main Headline */}
      {headlineMain && (
        <div
          style={{
            transform: `scale(${sprMain}) translateY(${waveFloat(6)}px)`,
            opacity: sprMain,
            fontFamily: brand.typography.headingFont,
            fontSize: 66,
            fontWeight: 900,
            color: brand.palette.primaryText,
            marginTop: 14,
            textShadow: '0 3px 20px rgba(0,0,0,0.98)',
          }}
        >
          {headlineMain}
        </div>
      )}

      {/* Handwritten Artistic Note */}
      {handwrittenSub && (
        <div
          style={{
            fontFamily: brand.typography.handwritingFont,
            color: brand.palette.secondaryText,
            fontSize: 70,
            marginTop: 12,
            transform: `rotate(-2deg) translateY(${waveFloat(12)}px)`,
            textShadow: '0 2px 18px rgba(0,0,0,0.98), 0 4px 30px rgba(0,0,0,0.90)',
          }}
        >
          {handwrittenSub}
        </div>
      )}
    </div>
  );
};
