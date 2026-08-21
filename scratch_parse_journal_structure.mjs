import fs from 'fs';

async function parseFramerJournal() {
  const url = 'https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/IiQROz5iwH_4HoyootFdULC_jMwORi3edTfh_hLjdqM.JQaWwSWW.mjs';
  const res = await fetch(url);
  const text = await res.text();
  
  const idx = text.indexOf('Explore');
  console.log("Journal structure snippet:");
  console.log(text.substring(Math.max(0, idx - 1000), Math.min(text.length, idx + 4000)));
}

parseFramerJournal();
