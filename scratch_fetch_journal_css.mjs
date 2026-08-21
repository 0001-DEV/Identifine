import fs from 'fs';

async function fetchCss() {
  const url = 'https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/IiQROz5iwH_4HoyootFdULC_jMwORi3edTfh_hLjdqM.JQaWwSWW.mjs';
  const res = await fetch(url);
  const text = await res.text();
  
  // Find css strings
  const cssMatches = [...text.matchAll(/\.framer-[a-zA-Z0-9_-]+[^{]*\{[^}]+\}/g)].map(m => m[0]);
  console.log("CSS rules found:", cssMatches.length);
  fs.writeFileSync('framer_journal_css.txt', cssMatches.join('\n'));
  console.log("Written framer_journal_css.txt");
}

fetchCss();
