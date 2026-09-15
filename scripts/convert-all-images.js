import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

function getSourceFiles(dir, exts = ['.js', '.jsx', '.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getSourceFiles(filePath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(filePath);
    }
  }
  return results;
}

async function run() {
  console.log('Scanning React source files for image imports...\n');
  const files = getSourceFiles(srcDir);
  const importRegex = /import\s+([\w\s{},*]+)\s+from\s+['"]([^'"]+\.(png|jpe?g))['"]/gi;

  const imagesToProcess = new Map(); // resolvedPath -> { webpPath, usages: [{ file, relPath }] }

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const relPath = match[2];
      const resolvedPath = path.resolve(path.dirname(file), relPath);

      if (fs.existsSync(resolvedPath)) {
        const ext = path.extname(resolvedPath);
        const webpPath = resolvedPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
        const webpRel = relPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');

        if (!imagesToProcess.has(resolvedPath)) {
          imagesToProcess.set(resolvedPath, {
            originalPath: resolvedPath,
            webpPath,
            usages: []
          });
        }
        imagesToProcess.get(resolvedPath).usages.push({
          file,
          relPath,
          webpRel
        });
      }
    }
  }

  console.log(`Found ${imagesToProcess.size} distinct imported image files.\n`);

  let convertedCount = 0;
  let totalSavedBytes = 0;

  for (const [originalPath, info] of imagesToProcess.entries()) {
    const origSize = fs.statSync(originalPath).size;

    // Check if webp exists
    if (!fs.existsSync(info.webpPath)) {
      try {
        const image = sharp(originalPath);
        const metadata = await image.metadata();

        let pipeline = image;
        // Cap max width to 1920px for high-dpi screens without excessive file weight
        if (metadata.width && metadata.width > 1920) {
          pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
        }

        await pipeline
          .webp({ quality: 82, effort: 4 })
          .toFile(info.webpPath);

        const newSize = fs.statSync(info.webpPath).size;
        const saved = origSize - newSize;
        totalSavedBytes += Math.max(0, saved);
        console.log(`✓ Converted: ${path.basename(originalPath)} (${(origSize / 1024).toFixed(1)} KB) → ${(newSize / 1024).toFixed(1)} KB`);
        convertedCount++;
      } catch (err) {
        console.error(`✗ Error converting ${path.basename(originalPath)}:`, err.message);
      }
    } else {
      const existingWebpSize = fs.statSync(info.webpPath).size;
      const saved = origSize - existingWebpSize;
      totalSavedBytes += Math.max(0, saved);
    }
  }

  console.log(`\nConverted ${convertedCount} new images to WebP.`);
  console.log(`Estimated bandwidth reduction across imports: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB!\n`);

  // Now update imports across all files
  let updatedFiles = 0;
  let totalImportsSwitched = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let fileChanged = false;

    for (const [, info] of imagesToProcess.entries()) {
      if (fs.existsSync(info.webpPath)) {
        for (const usage of info.usages) {
          if (usage.file === file) {
            const singleQuote = `from '${usage.relPath}'`;
            const singleQuoteReplacement = `from '${usage.webpRel}'`;
            const doubleQuote = `from "${usage.relPath}"`;
            const doubleQuoteReplacement = `from "${usage.webpRel}"`;

            if (content.includes(singleQuote)) {
              content = content.replaceAll(singleQuote, singleQuoteReplacement);
              fileChanged = true;
              totalImportsSwitched++;
            }
            if (content.includes(doubleQuote)) {
              content = content.replaceAll(doubleQuote, doubleQuoteReplacement);
              fileChanged = true;
              totalImportsSwitched++;
            }
          }
        }
      }
    }

    if (fileChanged) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`✓ Updated imports in: ${path.relative(rootDir, file)}`);
      updatedFiles++;
    }
  }

  console.log(`\nDone! Successfully updated ${totalImportsSwitched} image imports across ${updatedFiles} files.`);
}

run().catch(console.error);
