import { registerRoot, staticFile } from 'remotion';
import { RemotionRoot } from './Root';

if (typeof document !== 'undefined') {
  const fontUrl = staticFile('fonts/SVN-Chicken-Noodle-Soup.otf');
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'SVN-Chicken Noodle Soup';
      src: url('${fontUrl}') format('opentype');
      font-weight: normal;
      font-style: normal;
    }
  `;
  document.head.appendChild(style);

  try {
    const font = new FontFace('SVN-Chicken Noodle Soup', `url(${fontUrl}) format('opentype')`);
    font.load().then((loaded) => {
      document.fonts.add(loaded);
    }).catch(() => {});
  } catch (e) {}
}

registerRoot(RemotionRoot);
