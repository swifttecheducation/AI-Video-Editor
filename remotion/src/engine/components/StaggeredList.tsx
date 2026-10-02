import React from 'react';
import { spring } from 'remotion';
import { BrandConfig, StaggeredListItem } from '../types';

interface StaggeredListProps {
  frame: number;
  fps: number;
  currentTime: number;
  headerIcon?: string;
  headerIndex?: string;
  headerTitle: string;
  items: StaggeredListItem[];
  brand: BrandConfig;
  topY?: number;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  frame,
  fps,
  currentTime,
  headerIcon = '💡',
  headerIndex = '01',
  headerTitle,
  items,
  brand,
  topY = 180,
}) => {
  const sprHeader = spring({
    frame: Math.max(0, frame),
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.7 },
  });

  const waveFloat = (offset = 0) => Math.sin((frame + offset) / 16) * 3.5;

  return (
    <div
      style={{
        position: 'absolute',
        top: topY,
        left: 50,
        right: 50,
        zIndex: 35,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Category Header */}
      <div
        style={{
          transform: `scale(${sprHeader}) translateY(${waveFloat(0)}px)`,
          opacity: sprHeader,
          fontFamily: brand.typography.headingFont,
          fontSize: 66,
          fontWeight: 900,
          color: brand.palette.primaryText,
          textShadow: '0 3px 20px rgba(0,0,0,0.98)',
        }}
      >
        <span style={{ color: brand.palette.accentSecondary }}>
          {headerIcon} {headerIndex} •
        </span>{' '}
        {headerTitle}
      </div>

      {/* Progressive Staggered Items */}
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        {items.map((item, idx) => {
          if (currentTime < item.triggerSeconds) return null;
          const startFrame = Math.round(item.triggerSeconds * fps);
          const sprItem = spring({
            frame: Math.max(0, frame - startFrame),
            fps,
            config: { damping: 14, stiffness: 130, mass: 0.7 },
          });

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${sprItem}) translateY(${waveFloat(idx * 6)}px)`,
                opacity: sprItem,
                fontFamily: brand.typography.handwritingFont,
                color: item.color || (item.highlight ? brand.palette.accentPrimary : brand.palette.primaryText),
                fontSize: item.highlight ? 54 : 50,
                fontWeight: 700,
                textShadow: '0 2px 16px rgba(0,0,0,0.95)',
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
