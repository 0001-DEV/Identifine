import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';
const compDir = 'src/components';

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) continue;
    if (!full.endsWith('.jsx') && !full.endsWith('.js')) continue;
    
    const content = fs.readFileSync(full, 'utf8');
    
    // Check for fixed pixel widths that could overflow on mobile (< 375px)
    const fixedWidths = [...content.matchAll(/w-\[(\d+)px\]/g)]
      .map(m => parseInt(m[1]))
      .filter(w => w > 320);
      
    // Check for fixed min-widths
    const minWidths = [...content.matchAll(/min-w-\[(\d+)px\]/g)]
      .map(m => parseInt(m[1]))
      .filter(w => w > 300);

    // Check for horizontal overflow classes or unchecked negative margins
    const negMargins = [...content.matchAll(/-m[tlrbx]?-\d+/g)].map(m => m[0]);
    
    console.log(`\n=== Scanning: ${full} ===`);
    if (fixedWidths.length > 0) console.log(`  Fixed large widths (w-[>320px]):`, fixedWidths);
    if (minWidths.length > 0) console.log(`  Fixed large min-widths (min-w-[>300px]):`, minWidths);
    if (negMargins.length > 0) console.log(`  Negative margins found:`, [...new Set(negMargins)]);
  }
}

scanDir(pagesDir);
scanDir(compDir);
