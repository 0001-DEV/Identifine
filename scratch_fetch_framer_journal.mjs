import fs from 'fs';

async function fetchFramerHome() {
  const res = await fetch('https://identifi.framer.website/');
  const html = await res.text();
  
  // Find scripts
  const scripts = [...html.matchAll(/src="([^"]+\.mjs)"/g)].map(m => m[1]);
  for (const s of scripts) {
    const sRes = await fetch(s);
    const text = await sRes.text();
    if (text.includes('insights & inspiration') || text.includes('Explore') || text.includes('latest')) {
      console.log("Found in script:", s);
      const idx = text.indexOf('insights & inspiration');
      console.log(text.substring(Math.max(0, idx - 500), Math.min(text.length, idx + 2000)));
    }
  }
}

fetchFramerHome();
