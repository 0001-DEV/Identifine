import fs from 'fs';

const html = fs.readFileSync('scratch/framer_blog.html', 'utf8');

// Find script tags
const scriptMatches = html.match(/https:\/\/framerusercontent\.com\/modules\/[^\"]+\.js/g);
console.log('FOUND SCRIPT MODULES:', scriptMatches);

async function main() {
  if (!scriptMatches) return;
  for (let i = 0; i < Math.min(scriptMatches.length, 10); i++) {
    const url = scriptMatches[i];
    console.log('FETCHING MODULE:', url);
    const res = await fetch(url);
    const text = await res.text();
    fs.writeFileSync(`scratch/module_${i}.js`, text);
  }
  console.log('Modules downloaded!');
}

main().catch(console.error);
