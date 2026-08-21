import fs from 'fs';

async function searchAllChunks() {
  const res = await fetch('https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/script_main.BAGG-J-A.mjs');
  const text = await res.text();
  const allMjs = [...text.matchAll(/[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.mjs/g)].map(m => m[0]);
  
  for (const m of [...new Set(allMjs)]) {
    const url = 'https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/' + m;
    const r = await fetch(url);
    if (r.ok) {
      const c = await r.text();
      if (c.includes('Explore') && c.includes('journal')) {
        console.log("FOUND JOURNAL IN:", url);
        const idx = c.indexOf('Explore');
        console.log(c.substring(Math.max(0, idx - 400), Math.min(c.length, idx + 2000)));
      }
    }
  }
}

searchAllChunks();
