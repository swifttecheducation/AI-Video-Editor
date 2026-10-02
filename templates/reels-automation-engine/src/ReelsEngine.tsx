import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Video, staticFile } from 'remotion';
import { BrandConfig, SubtitleItem, EditorialPunchIn, OverlayConfig } from './types';
import { HandheldDrift } from './components/HandheldDrift';
import { SubtitleTrack } from './components/SubtitleTrack';
import { EditorialHook } from './components/EditorialHook';
import { SeriesBadge } from './components/SeriesBadge';
import { StaggeredList } from './components/StaggeredList';

export interface ReelsEngineProps {
  videoSrc: string;
  brand: BrandConfig;
  subtitles: SubtitleItem[];
  punchIns?: EditorialPunchIn[];
  overlays?: OverlayConfig[];
}

export const ReelsEngine: React.FC<ReelsEngineProps> = ({
  videoSrc,
  brand,
  subtitles,
  punchIns = [],
  overlays = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.palette.background,
        overflow: 'hidden',
        fontFamily: brand.typography.bodyFont,
      }}
    >
      {/* 1. Master Footage with Camera Drift & Multi-Cam Punch-Ins */}
      <HandheldDrift frame={frame} currentTime={currentTime} punchIns={punchIns}>
        <Video
          src={videoSrc.startsWith('http') ? videoSrc : staticFile(videoSrc)}
          volume={1.0}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </HandheldDrift>

      {/* 2. Dynamic Editorial Overlays */}
      {overlays.map((overlay) => {
        if (currentTime < overlay.startTime || currentTime > overlay.endTime) {
          return null;
        }

        const startFrame = Math.round(overlay.startTime * fps);

        switch (overlay.type) {
          case 'hook':
            return (
              <EditorialHook
                key={overlay.id}
                frame={frame}
                fps={fps}
                startFrame={startFrame}
                line1={overlay.data.line1}
                line2={overlay.data.line2}
                line3={overlay.data.line3}
                brand={brand}
                topY={overlay.data.topY}
              />
            );
          case 'badge':
            return (
              <SeriesBadge
                key={overlay.id}
                frame={frame}
                fps={fps}
                startFrame={startFrame}
                brand={brand}
                headlineMain={overlay.data.headlineMain}
                handwrittenSub={overlay.data.handwrittenSub}
                topY={overlay.data.topY}
              />
            );
          case 'staggered_list':
            return (
              <StaggeredList
                key={overlay.id}
                frame={frame}
                fps={fps}
                currentTime={currentTime}
                headerIcon={overlay.data.headerIcon}
                headerIndex={overlay.data.headerIndex}
                headerTitle={overlay.data.headerTitle}
                items={overlay.data.items}
                brand={brand}
                topY={overlay.data.topY}
              />
            );
          default:
            return null;
        }
      })}

      {/* 3. Subtitles (Airy, speech-synced, anchored below collar) */}
      <SubtitleTrack
        subtitles={subtitles}
        currentTime={currentTime}
        brand={brand}
      />
    </AbsoluteFill>
  );
};

export default ReelsEngine;
