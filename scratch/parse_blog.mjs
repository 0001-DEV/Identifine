import fs from 'fs';

const searchIndex = JSON.parse(fs.readFileSync('scratch/searchIndex.json', 'utf8'));

console.log('SEARCH INDEX KEYS:', Object.keys(searchIndex));
const blogEntries = Object.entries(searchIndex).filter(([key, val]) => key.includes('blog') || key.includes('journal') || val.title?.toLowerCase().includes('identity') || val.title?.toLowerCase().includes('blog'));

console.log('BLOG ENTRIES IN INDEX:', JSON.stringify(blogEntries, null, 2));

// Parse HTML text content for headings and text
const html = fs.readFileSync('scratch/framer_blog.html', 'utf8');

// Extract all text inside framer text blocks
const textMatches = html.match(/<p[^>]*>(.*?)<\/p>|<h[1-6][^>]*>(.*?)<\/h[1-6]>|<span[^>]*>(.*?)<\/span>/g);
console.log('SOME HTML TEXT SAMPLES:', textMatches ? textMatches.slice(0, 30) : 'None');
