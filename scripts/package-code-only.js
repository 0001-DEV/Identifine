import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const targetDir = path.join(rootDir, 'cpanel_code_changes_only');
const zipFile = path.join(rootDir, 'cpanel_code_changes_only.zip');

if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(path.join(targetDir, 'assets'), { recursive: true });

fs.copyFileSync(path.join(distDir, 'index.html'), path.join(targetDir, 'index.html'));

const assets = fs.readdirSync(path.join(distDir, 'assets'));
for (const file of assets) {
  const lower = file.toLowerCase();
  if (lower.endsWith('.js') || lower.endsWith('.css') || lower.endsWith('.map')) {
    fs.copyFileSync(path.join(distDir, 'assets', file), path.join(targetDir, 'assets', file));
  }
}

execSync(`tar.exe -a -c -f "${zipFile}" -C "${targetDir}" .`);
const stats = fs.statSync(zipFile);
console.log(`✓ Created cpanel_code_changes_only.zip (${(stats.size / 1024).toFixed(1)} KB)`);
