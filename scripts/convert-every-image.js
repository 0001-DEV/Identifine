import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'src', 'assets');
const publicDir = path.join(rootDir, 'public');

function getImages(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getImages(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

async function convertAll() {
  const images = [...getImages(assetsDir), ...getImages(publicDir)];
  console.log(`Found ${images.length} images.`);
  let converted = 0;

  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.slice(0, -ext.length) + '.webp';
    if (!fs.existsSync(webpPath)) {
      try {
        const image = sharp(imgPath);
        const metadata = await image.metadata();
        let pipeline = image;
        if (metadata.width && metadata.width > 2400) {
          pipeline = pipeline.resize({ width: 2400, withoutEnlargement: true });
        }
        await pipeline.webp({ quality: 84, effort: 4 }).toFile(webpPath);
        console.log(`Converted: ${path.relative(rootDir, imgPath)} -> ${path.basename(webpPath)}`);
        converted++;
      } catch (err) {
        console.error(`Error converting ${imgPath}:`, err.message);
      }
    }
  }
  console.log(`Done. Converted ${converted} images.`);
}

convertAll();
