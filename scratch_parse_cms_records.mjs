import fs from 'fs';

const text = fs.readFileSync('cms_case_studies.js', 'utf8');

// Let's write a parser to extract all items
const jsonMatches = text.match(/\{"id":"[^"]+","title":[^}]+\}/g);
console.log("JSON matches found:", jsonMatches?.length);

// Extract all titles and descriptions
const matches = [...text.matchAll(/title:\s*["']([^"']+)["']|name:\s*["']([^"']+)["']/g)];
console.log("Titles/names:", matches.map(m => m[1] || m[2]));

// Let's extract full records
fs.writeFileSync('cms_readable.txt', text.replace(/\\"/g, '"'));
console.log("Written cms_readable.txt");
