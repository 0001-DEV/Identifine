import fs from 'fs';

async function main() {
  const res = await fetch('https://identifi.framer.website/blog/how-to-craft-a-bio-that-works-on-every-platform');
  const html = await res.text();
  fs.writeFileSync('scratch/bio_article.html', html);
  console.log('Bio article HTML saved!');

  const headings = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi);
  console.log('HEADINGS:', headings);
}

main().catch(console.error);
