import { staticFile } from 'remotion';

export const CHICKEN_NOODLE_FONT_FACE = `
@font-face {
  font-family: 'SVN-Chicken Noodle Soup';
  src: url('${staticFile('fonts/SVN-Chicken-Noodle-Soup.otf')}') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
`;
