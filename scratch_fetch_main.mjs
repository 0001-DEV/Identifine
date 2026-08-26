import fs from 'fs';

async function main() {
  const url = 'https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/script_main.BAGG-J-A.mjs';
  const res = await fetch(url);
  const text = await res.text();
  fs.writeFileSync('scratch/main_script.mjs', text);
  console.log('Main script saved to scratch/main_script.mjs');

  // Find all component script URLs referenced inside main_script
  const moduleUrls = text.match(/https:\/\/framerusercontent\.com\/modules\/[^\"]+\.js/g);
  console.log('MODULE URLS:', moduleUrls ? moduleUrls.length : 0);

  // Search for blog CMS records
  const blogChunks = text.match(/\{"id":"[^"]+","slug":"[^"]+"[\s\S]*?\}/g);
  console.log('BLOG CHUNKS COUNT:', blogChunks ? blogChunks.length : 0);
}

main().catch(console.error);
