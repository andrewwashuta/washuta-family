#!/usr/bin/env bun
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const PHOTOS_ROOT = join(process.cwd(), 'public/photos');
const MAX_LONG_EDGE = 1440;
const JPEG_QUALITY = 78;

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;

for (const month of MONTHS) {
  const dir = join(PHOTOS_ROOT, month);
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(jpe?g)$/i.test(entry.name))
    .map((entry) => entry.name);

  for (const name of files) {
    const path = join(dir, name);
    const before = statSync(path).size;
    const input = readFileSync(path);

    const meta = await sharp(input).metadata();
    const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
    const pipeline = sharp(input);
    if (longEdge > MAX_LONG_EDGE) {
      pipeline.resize({
        width: meta.width && meta.width >= meta.height! ? MAX_LONG_EDGE : undefined,
        height: meta.height && meta.height > meta.width! ? MAX_LONG_EDGE : undefined,
      });
    }
    const output = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();

    if (output.length < before) {
      writeFileSync(path, output);
      const after = output.length;
      totalBefore += before;
      totalAfter += after;
      processed += 1;
      const saved = ((before - after) / before * 100).toFixed(0);
      console.log(`  ${month}/${name}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${saved}%)`);
    } else {
      console.log(`  ${month}/${name}  skipped (already smaller)`);
    }
  }
}

if (processed > 0) {
  const saved = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
  console.log(`\nRecompressed ${processed} photos: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (-${saved}%)`);
} else {
  console.log('\nNothing to recompress.');
}
