import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const tempDir = path.join(rootDir, '.temp_patch');
const zipFile = path.join(rootDir, 'cpanel_update_only.zip');

try {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(tempDir, 'assets'), { recursive: true });

  // Copy index.html, contact.php, and .htaccess
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(tempDir, 'index.html'));
  if (fs.existsSync(path.join(distDir, 'contact.php'))) {
    fs.copyFileSync(path.join(distDir, 'contact.php'), path.join(tempDir, 'contact.php'));
  }
  if (fs.existsSync(path.join(distDir, '.htaccess'))) {
    fs.copyFileSync(path.join(distDir, '.htaccess'), path.join(tempDir, '.htaccess'));
  }

  // Copy JS, CSS, SVG, logos, and identity program images
  const assets = fs.readdirSync(path.join(distDir, 'assets'));
  for (const file of assets) {
    const fullPath = path.join(distDir, 'assets', file);
    const stat = fs.statSync(fullPath);
    const lower = file.toLowerCase();

    const isCode = lower.endsWith('.js') || lower.endsWith('.css') || lower.endsWith('.svg');
    const isIdentityAsset = lower.includes('identity-') || lower.includes('identikare');
    const isSmallIcon = (lower.endsWith('.png') || lower.endsWith('.webp')) && stat.size < 100 * 1024;

    if (isCode || isIdentityAsset || isSmallIcon) {
      fs.copyFileSync(fullPath, path.join(tempDir, 'assets', file));
    }
  }

  // Create zip using built-in tar
  execSync(`tar.exe -a -c -f "${zipFile}" -C "${tempDir}" .`);
  fs.rmSync(tempDir, { recursive: true, force: true });

  const stats = fs.statSync(zipFile);
  console.log(`\n✓ Successfully created: cpanel_update_only.zip (${(stats.size / 1024).toFixed(1)} KB)`);
  console.log(`Ready to upload to public_html in cPanel!\n`);
} catch (err) {
  console.error('Error packaging update:', err);
  process.exit(1);
}
