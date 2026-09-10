import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname, basename } from 'path';

const assetsDir = 'd:/Identifine/dist/assets';

const files = readdirSync(assetsDir).filter(f => extname(f).toLowerCase() === '.webp');
console.log('Found ' + files.length + ' WebP files to compress in dist/assets...\n');

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const filePath = join(assetsDir, file);
  const sizeBefore = statSync(filePath).size;
  totalBefore += sizeBefore;
  try {
    const srcBuf = await import('fs').then(m => m.promises.readFile(filePath));
    const compressed = await sharp(srcBuf).webp({ quality: 72, effort: 6, lossless: false }).toBuffer();
    const sizeAfter = compressed.length;
    if (sizeAfter < sizeBefore) {
      writeFileSync(filePath, compressed);
      totalAfter += sizeAfter;
      const saving = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);
      console.log('OK ' + file.padEnd(52) + ' ' + (sizeBefore/1024).toFixed(1).padStart(8) + ' KB -> ' + (sizeAfter/1024).toFixed(1).padStart(8) + ' KB (-' + saving + '%)');
    } else {
      totalAfter += sizeBefore;
      console.log('-- ' + file.padEnd(52) + ' ' + (sizeBefore/1024).toFixed(1).padStart(8) + ' KB  (skipped, already optimal)');
    }
  } catch(err) {
    totalAfter += sizeBefore;
    console.error('ERR ' + file + ': ' + err.message);
  }
}
console.log('\n========================================================');
console.log('Total before: ' + (totalBefore/1024/1024).toFixed(2) + ' MB');
console.log('Total after:  ' + (totalAfter/1024/1024).toFixed(2) + ' MB');
console.log('Total saved:  ' + ((totalBefore-totalAfter)/1024/1024).toFixed(2) + ' MB (-' + (((totalBefore-totalAfter)/totalBefore)*100).toFixed(1) + '%)');
console.log('========================================================');
