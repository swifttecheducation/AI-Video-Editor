export interface BrandConfig {
  name: string;
  palette: {
    primaryText: string;    // e.g. '#F8F5F2' (Warm Ivory)
    secondaryText: string;  // e.g. '#D4CABE' (Soft Beige)
    accentPrimary: string;  // e.g. '#720000' / '#B91C1C' (Wine)
    accentSecondary: string;// e.g. '#798466' / '#9BAA83' (Olive)
    background: string;     // e.g. '#07090E'
  };
  typography: {
    headingFont: string;     // e.g. 'Alegreya, serif'
    subtitleFont: string;    // e.g. "'SVN-Chicken Noodle Soup', 'Be Vietnam Pro', sans-serif"
    handwritingFont: string; // e.g. "'SVN-Chicken Noodle Soup', cursive"
    bodyFont: string;        // e.g. "'Be Vietnam Pro', sans-serif"
  };
  subtitles: {
    positionY: number;       // e.g. 1300 (below collar, on chest)
    fontSize: number;        // e.g. 66
    fontWeight: number;      // e.g. 700
    maxWidth: number;        // e.g. 860
    lineHeight: number;      // e.g. 1.25
    textShadow: string;
  };
  header: {
    seriesTitle: string;     // e.g. 'SERIES: LIFE-FIRST BUSINESS'
    episodeLabel: string;    // e.g. 'TẬP 03'
  };
}

export interface SubtitleItem {
  s: number; // Start seconds
  e: number; // End seconds
  text: string;
}

export interface EditorialPunchIn {
  start: number;
  end: number;
  zoom: number; // e.g. 1.06 - 1.10
}

export interface StaggeredListItem {
  text: string;
  triggerSeconds: number;
  color?: string;
  highlight?: boolean;
}

export interface OverlayConfig {
  id: string;
  startTime: number;
  endTime: number;
  type: 'hook' | 'badge' | 'staggered_list' | 'broll' | 'cta' | 'custom';
  data: any;
}
