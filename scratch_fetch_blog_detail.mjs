import fs from 'fs';

async function fetchBlogDetailPage() {
  const url = 'https://identifi.framer.website/blog/design-that-converts-what-really-works-in-2025';
  const res = await fetch(url);
  const html = await res.text();
  
  console.log("HTML length:", html.length);
  fs.writeFileSync('blog_detail_raw.html', html);
  
  // Find all images
  const imgMatches = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'\s)]+/g)].map(m => m[0]);
  console.log("Images found:", [...new Set(imgMatches)]);
  
  // Find visible text
  const textMatches = html.match(/>([^<]+)</g)
    ?.map(s => s.replace(/[><]/g, '').trim())
    .filter(s => s.length > 0 && !s.includes('{') && !s.includes('@') && !s.includes('function'));
  console.log("Text preview:", textMatches?.slice(0, 60));
  fs.writeFileSync('blog_detail_text.txt', textMatches?.join('\n') || '');
}

fetchBlogDetailPage();
