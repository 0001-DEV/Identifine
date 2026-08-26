import fs from 'fs';

const html = fs.readFileSync('scratch/framer_blog.html', 'utf8');

// Find all framer component scripts or json chunks
const jsonMatches = html.match(/\{"routes":[\s\S]*?\}/g);
console.log('JSON MATCHES COUNT:', jsonMatches ? jsonMatches.length : 0);

// Search for CMS collection data in the HTML or scripts
const cmsMatches = html.match(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)/g);
console.log('ALL UNIQUE FRAMER IMAGES:', [...new Set(cmsMatches)]);

// Let's search for blog titles and descriptions
const headings = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi);
console.log('ALL HEADINGS:', headings);
