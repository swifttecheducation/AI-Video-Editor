import React from 'react';
import { SubtitleItem, BrandConfig } from '../types';

interface SubtitleTrackProps {
  subtitles: SubtitleItem[];
  currentTime: number;
  brand: BrandConfig;
}

export const SubtitleTrack: React.FC<SubtitleTrackProps> = ({
  subtitles,
  currentTime,
  brand,
}) => {
  const activeSub = subtitles.find(
    (s) => currentTime >= s.s && currentTime <= s.e
  );

  if (!activeSub) return null;

  const {
    positionY = 1300,
    fontSize = 66,
    fontWeight = 700,
    maxWidth = 860,
    lineHeight = 1.25,
    textShadow = '0 3px 20px rgba(0,0,0,0.98), 0 6px 36px rgba(0,0,0,0.90)',
  } = brand.subtitles;

  return (
    <div
      style={{
        position: 'absolute',
        top: positionY,
        left: 40,
        right: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth,
          fontFamily: brand.typography.subtitleFont,
          fontSize,
          fontWeight,
          color: brand.palette.primaryText,
          lineHeight,
          textShadow,
          letterSpacing: 0.2,
        }}
      >
        {activeSub.text}
      </div>
    </div>
  );
};
