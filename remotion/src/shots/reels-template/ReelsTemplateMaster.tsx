import React from 'react';
import { ReelsEngine } from '../../engine/ReelsEngine';
import defaultBrand from '../../engine/brand.default.json';
import { BrandConfig, SubtitleItem, EditorialPunchIn, OverlayConfig } from '../../engine/types';

export const compositionConfig = {
  id: 'ReelsTemplateMaster',
  durationInSeconds: 116.3,
  fps: 30,
  width: 1080,
  height: 1920,
};

const SAMPLE_SUBTITLES: SubtitleItem[] = [
  { s: 0.00, e: 1.40, text: 'Mình muốn kiếm tiền' },
  { s: 1.40, e: 2.80, text: 'từ việc kinh doanh,' },
  { s: 2.80, e: 4.20, text: 'nhưng không muốn nó' },
  { s: 4.20, e: 5.60, text: 'nuốt mất cuộc sống.' },
  { s: 6.00, e: 7.20, text: 'Mình là Sia,' },
  { s: 7.20, e: 8.80, text: 'mẹ của nhóc 2 tuổi' },
  { s: 8.80, e: 10.96, text: 'và solo business siêu nhỏ.' },
  { s: 12.00, e: 13.50, text: 'Và đây là tập 3' },
  { s: 13.50, e: 15.20, text: 'của Live First Business,' },
  { s: 15.20, e: 16.50, text: 'xây dựng mô hình kinh doanh' },
  { s: 16.50, e: 17.38, text: 'từ cuộc sống trước.' },
];

const SAMPLE_PUNCH_INS: EditorialPunchIn[] = [
  { start: 0.0, end: 5.6, zoom: 1.04 },
  { start: 18.28, end: 24.58, zoom: 1.08 },
  { start: 62.06, end: 65.5, zoom: 1.07 },
  { start: 88.94, end: 94.94, zoom: 1.08 },
  { start: 111.44, end: 116.3, zoom: 1.10 },
];

const SAMPLE_OVERLAYS: OverlayConfig[] = [
  {
    id: 'hook_beat1',
    startTime: 0.3,
    endTime: 5.8,
    type: 'hook',
    data: {
      line1: 'cách thực tế',
      line2: 'để kiếm thêm thu nhập',
      line3: 'tại nhà từ chuyên môn',
      topY: 180,
    },
  },
  {
    id: 'series_beat4',
    startTime: 11.8,
    endTime: 17.4,
    type: 'badge',
    data: {
      headlineMain: 'CUỘC SỐNG TRƯỚC ➔ BUSINESS SAU',
      handwrittenSub: 'bắt đầu từ lối sống bạn muốn ~',
      topY: 180,
    },
  },
];

export const ReelsTemplateMaster: React.FC = () => {
  return (
    <ReelsEngine
      videoSrc="projects/life-first-business/master.mp4"
      brand={defaultBrand as unknown as BrandConfig}
      subtitles={SAMPLE_SUBTITLES}
      punchIns={SAMPLE_PUNCH_INS}
      overlays={SAMPLE_OVERLAYS}
    />
  );
};

export default ReelsTemplateMaster;
