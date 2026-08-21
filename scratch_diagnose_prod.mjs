import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Simple static server for dist/
const distDir = path.resolve('dist');

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html'); // SPA fallback
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webp': 'image/webp',
    '.json': 'application/json'
  };

  const contentType = contentTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(4173, async () => {
  console.log('Preview server running on port 4173');
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
      console.log(`[BROWSER ${msg.type().toUpperCase()}]:`, msg.text());
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
      console.error('[PAGE ERROR]:', err);
    });

    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    
    console.log('\n--- PAGE TITLE ---');
    console.log(await page.title());

    console.log('\n--- ROOT HTML LENGTH ---');
    const content = await page.content();
    console.log(content.length);

    console.log('\n--- CONSOLE ERRORS ---');
    console.log(consoleErrors);

    await browser.close();
  } catch (e) {
    console.error('Test error:', e);
  } finally {
    server.close();
    process.exit(0);
  }
});
