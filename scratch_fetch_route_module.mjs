import fs from 'fs';

async function fetchRouteModule() {
  const res = await fetch('https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/script_main.BAGG-J-A.mjs');
  const text = await res.text();
  
  // Look for route mapping
  const matches = [...text.matchAll(/["'](\/[^"']*)["']\s*:\s*([^,}]+)/g)];
  console.log("Route mappings:", matches.map(m => [m[1], m[2]]));
  
  const allUrls = [...text.matchAll(/https:\/\/[^"'\s)]+\.mjs/g)].map(m => m[0]);
  console.log("All absolute mjs URLs:", allUrls);

  // Let's find relative paths
  const rels = [...text.matchAll(/chunk-[^"'\s)]+\.mjs/g)].map(m => m[0]);
  console.log("Chunks:", rels);
  
  // Search for any other .mjs
  const allMjs = [...text.matchAll(/[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.mjs/g)].map(m => m[0]);
  console.log("All mjs:", [...new Set(allMjs)]);

  for (const m of [...new Set(allMjs)]) {
    const url = 'https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/' + m;
    const r = await fetch(url);
    if (r.ok) {
      const c = await r.text();
      if (c.includes('Rainoil') || c.includes('Visual Identity Direction') || c.includes('We partnered with')) {
        console.log("FOUND EXACT DATA IN:", url);
        fs.writeFileSync('rainoil_data.js', c);
      }
    }
  }
}

fetchRouteModule();
