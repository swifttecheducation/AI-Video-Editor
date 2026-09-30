// Video brand tokens (see /brand.md). Import these in every shot
// so all videos stay consistent; change a value here and every shot updates.
//
// The COLORS / EASINGS / RADIUS below are the house style the example shots were
// built in — a calm, premium look you are free to keep. BRAND, right below, is
// YOUR identity and ships as a placeholder on purpose. Run `/brand-setup` to
// rewrite both this file and /brand.md to your own channel in one pass.
import { Easing } from 'remotion';

// Channel identity. Any shot that puts your name on screen reads it from here,
// so one edit re-brands every video you have ever made in this repo.
export const BRAND = {
  // The wordmark, split in three so the MIDDLE part renders in the accent color.
  // e.g. ['Build', 'With', 'AI'] renders the word "With" in indigo.
  // Use ['Acme', 'Labs', ''] for a two-part mark.
  wordmark: ['Your', 'Channel', ''] as readonly string[],
  signoff: 'See you in the next one',
} as const;

export const COLORS = {
  // roles
  accent: '#720000', // Wine — primary brand accent
  accent2: '#798466', // Olive — secondary brand accent
  signal: '#798466', // Olive — success / highlights
  signalAlt: '#8A9775', // lighter Olive companion
  warn: '#D49B44', // warm amber — attention
  danger: '#8B1818', // deep crimson — contrast / error
  ink: '#1F1616', // deep charcoal-wine primary text on light
  muted: '#6C655F', // secondary text
  paper: '#F8F5F2', // Warm Ivory — light surface / bg
  cream: '#EFEBE4', // Soft Beige light tint
  line: '#D4CABE', // Soft Beige — borders & dividers on light
  // dark UI / terminal scale (Warm dark tones)
  d900: '#151313',
  d800: '#1D1A1A',
  d600: '#342F2F',
  d400: '#8A8179',
  d300: '#D4CABE',
} as const;

// signature gradient: Wine -> Olive transition
export const GRADIENT = `linear-gradient(120deg, ${COLORS.accent}, #962828, ${COLORS.accent2})`;

export const RADIUS = { card: 16, panel: 14, window: 10, pill: 999 } as const;

export const SHADOW = {
  soft: '0 8px 32px rgba(26,26,46,0.10)',
  card: '0 10px 40px rgba(26,26,46,0.08)',
} as const;

// Calm, premium easings (confirmed brand motion). Use these — never Easing.out(...) wrappers.
export const EASINGS = {
  easeOut: Easing.bezier(0.33, 1, 0.68, 1),
  easeIn: Easing.bezier(0.32, 0, 0.67, 0),
  easeInOut: Easing.bezier(0.37, 0, 0.63, 1),
  overshoot: Easing.bezier(0.34, 1.4, 0.64, 1), // gentle, no cartoon bounce
} as const;
