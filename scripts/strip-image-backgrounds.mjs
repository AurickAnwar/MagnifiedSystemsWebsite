/**
 * Makes checkerboard / light neutral backgrounds transparent on Image1–3.
 * Run: node scripts/strip-image-backgrounds.mjs
 */
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { rename, unlink } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const files = ['Image1.png', 'Image2.png', 'Image3.png'];

const CHECKER_LUM = [80, 130, 205];

/** True for checkerboard squares; tinted subject grays stay opaque. */
function isCheckerboardPixel(r, g, b) {
  const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
  if (maxDiff > 8) return false;
  const lum = (r + g + b) / 3;
  const nearest = CHECKER_LUM.reduce(
    (min, s) => Math.min(min, Math.abs(lum - s)),
    255
  );
  return nearest <= 10;
}

function floodTransparent(data, width, height, channels) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const seed = (x, y) => {
    const i = (y * width + x) * channels;
    if (isCheckerboardPixel(data[i], data[i + 1], data[i + 2])) {
      queue.push(x, y);
      visited[y * width + x] = 1;
    }
  };

  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
  }

  const neighbors = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length) {
    const y = queue.pop();
    const x = queue.pop();
    const idx = (y * width + x) * channels;

    data[idx + 3] = 0;

    for (const [dx, dy] of neighbors) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const ni = ny * width + nx;
      if (visited[ni]) continue;
      const pi = ni * channels;
      if (!isCheckerboardPixel(data[pi], data[pi + 1], data[pi + 2])) continue;
      visited[ni] = 1;
      queue.push(nx, ny);
    }
  }

  // Second pass: remove any leftover exact checker pixels (isolated islands)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i + 3] === 0) continue;
      if (isCheckerboardPixel(data[i], data[i + 1], data[i + 2])) {
        data[i + 3] = 0;
      }
    }
  }

  // Soften halos on neutral fringe next to transparency
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * channels;
      if (data[i + 3] === 0) continue;
      const maxDiff = Math.max(
        Math.abs(data[i] - data[i + 1]),
        Math.abs(data[i + 1] - data[i + 2]),
        Math.abs(data[i] - data[i + 2])
      );
      if (maxDiff > 12) continue;
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (lum < 150 || lum > 235) continue;
      let transparentNeighbors = 0;
      for (const [dx, dy] of neighbors) {
        const ni = ((y + dy) * width + (x + dx)) * channels;
        if (data[ni + 3] === 0) transparentNeighbors++;
      }
      if (transparentNeighbors >= 2) {
        const fade = Math.max(0, 1 - (lum - 150) / 90);
        data[i + 3] = Math.round(data[i + 3] * fade);
      }
    }
  }
}

async function processFile(name) {
  const inputPath = join(publicDir, name);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  floodTransparent(data, info.width, info.height, info.channels);

  const tempPath = `${inputPath}.tmp.png`;
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png({ compressionLevel: 9 })
    .toFile(tempPath);

  try {
    await unlink(inputPath);
  } catch {
    /* first run or locked */
  }
  await rename(tempPath, inputPath);

  console.log(`OK ${name} (${info.width}x${info.height})`);
}

for (const file of files) {
  await processFile(file);
}
