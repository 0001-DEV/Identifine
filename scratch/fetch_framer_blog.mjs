import fs from 'fs';

async function main() {
  const res = await fetch('https://identifi.framer.website/blog');
  const html = await res.text();
  fs.writeFileSync('scratch/framer_blog.html', html);
  console.log('HTML saved to scratch/framer_blog.html');

  // Search for searchIndex json
  const searchIndexMatch = html.match(/https:\/\/framerusercontent\.com\/sites\/[^\"]+\/searchIndex[^\"]+\.json/);
  if (searchIndexMatch) {
    console.log('Search Index URL:', searchIndexMatch[0]);
    const sRes = await fetch(searchIndexMatch[0]);
    const sJson = await sRes.json();
    fs.writeFileSync('scratch/searchIndex.json', JSON.stringify(sJson, null, 2));
    console.log('Search index saved!');
  }
}

main().catch(console.error);
