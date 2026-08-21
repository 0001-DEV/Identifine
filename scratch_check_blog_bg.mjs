import fs from 'fs';

const html = fs.readFileSync('blog_detail_raw.html', 'utf8');

// Search for body background or html background
const bgMatches = [...html.matchAll(/background(?:-color)?:\s*([^;]+);/g)].map(m => m[1]);
console.log("Background rules found:", bgMatches.slice(0, 30));

// Check styles
const styleMatches = [...html.matchAll(/<style[^>]*>([^<]+)<\/style>/g)].map(m => m[1]);
console.log("Style tags:", styleMatches.length);
fs.writeFileSync('blog_framer_styles.txt', styleMatches.join('\n\n'));
console.log("Written blog_framer_styles.txt");
