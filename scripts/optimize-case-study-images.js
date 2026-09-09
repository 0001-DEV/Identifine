import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const caseStudiesDir = path.join(rootDir, 'src', 'assets', 'case-studies');
const assetsDir = path.join(rootDir, 'src', 'assets');

async function convertImage(srcPath, destPath, maxWidth = 1600) {
  const originalSize = fs.statSync(srcPath).size;
  const image = sharp(srcPath);
  const metadata = await image.metadata();

  let pipeline = image;
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality: 86, effort: 5 })
    .toFile(destPath);

  const newSize = fs.statSync(destPath).size;
  const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
  console.log(`✓ Converted: ${path.basename(srcPath)} (${(originalSize / 1024).toFixed(1)} KB) → ${path.basename(destPath)} (${(newSize / 1024).toFixed(1)} KB) [Saved ${savings}%]`);
  return { originalSize, newSize };
}

async function run() {
  console.log('Optimizing Case Studies and related card images to WebP...\n');
  let totalOriginal = 0;
  let totalNew = 0;

  // 1. Case studies folder
  const caseStudyFiles = fs.readdirSync(caseStudiesDir);
  for (const file of caseStudyFiles) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const srcPath = path.join(caseStudiesDir, file);
      const baseName = path.basename(file, ext);
      const destPath = path.join(caseStudiesDir, `${baseName}.webp`);
      const { originalSize, newSize } = await convertImage(srcPath, destPath);
      totalOriginal += originalSize;
      totalNew += newSize;
    }
  }

  // 2. Main card assets used in case study detail
  const extraAssets = [
    'ELITE_PASS_BLACK_MATTE.png',
    'ELITE_PASS_GOLD.png',
    'ELITE_PASS_SILVER.png'
  ];

  for (const file of extraAssets) {
    const srcPath = path.join(assetsDir, file);
    if (fs.existsSync(srcPath)) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      const destPath = path.join(assetsDir, `${baseName}.webp`);
      const { originalSize, newSize } = await convertImage(srcPath, destPath);
      totalOriginal += originalSize;
      totalNew += newSize;
    }
  }

  console.log('\n----------------------------------------');
  console.log(`Total original size: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total optimized WebP size: ${(totalNew / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Overall reduction: ${(((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1)}% drop!`);
  console.log('----------------------------------------\n');
}

run().catch(console.error);
