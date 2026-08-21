async function searchChunkPaths() {
  const res = await fetch('https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/script_main.BAGG-J-A.mjs');
  const text = await res.text();
  console.log("script_main length:", text.length);
  const imports = [...text.matchAll(/import\s*\(?['"]([^'"]+)['"]\)?/g)].map(m => m[1]);
  console.log("Imports:", imports);
  const mjsFiles = [...text.matchAll(/["'](\.?\/[^"']+\.mjs)["']/g)].map(m => m[1]);
  console.log("mjs files:", mjsFiles);
  
  for (const f of mjsFiles) {
    const fullUrl = new URL(f, 'https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/').href;
    const r = await fetch(fullUrl);
    const t = await r.text();
    if (t.includes('Visual Identity Direction') || t.includes('Rainoil') || t.includes('We partnered with')) {
      console.log("FOUND in", fullUrl);
      const idx = t.indexOf('Rainoil');
      console.log(t.substring(Math.max(0, idx - 300), Math.min(t.length, idx + 2000)));
    }
  }
}

searchChunkPaths();
