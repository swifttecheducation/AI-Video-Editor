import { bundle } from '@remotion/bundler';
import { selectComposition, renderMedia } from '@remotion/renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out', 'LifeFirstBusinessMaster_Graded.mp4');

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});

try {
  console.log('Bundling Remotion project...');
  const serveUrl = await bundle({
    entryPoint: path.join(root, 'src', 'index.ts'),
    publicDir: path.join(root, '..', 'media')
  });

  console.log('Selecting composition LifeFirstBusinessMaster...');
  const composition = await selectComposition({
    serveUrl,
    id: 'LifeFirstBusinessMaster'
  });

  console.log(`Starting render: ${composition.durationInFrames} frames (${(composition.durationInFrames / composition.fps).toFixed(1)}s) at ${composition.fps}fps`);

  let lastPct = -1;
  await renderMedia({
    serveUrl,
    composition,
    outputLocation: out,
    concurrency: 2,
    overwrite: true,
    codec: 'h264',
    pixelFormat: 'yuv420p',
    imageFormat: 'jpeg',
    crf: 18,
    onProgress: ({ progress, renderedFrames, encodedFrames }) => {
      const pct = Math.floor(progress * 100);
      if (pct !== lastPct && pct % 5 === 0) {
        lastPct = pct;
        console.log(`[Render] ${pct}% complete (${renderedFrames}/${composition.durationInFrames} frames rendered, ${encodedFrames} encoded)`);
      }
    }
  });

  console.log('\nSUCCESS: Render completed -> ' + out);
} catch (err) {
  console.error('\nRENDER FAILED with error:', err);
  process.exit(1);
}
