import fs from 'fs';

const text = fs.readFileSync('scratch/main_script.mjs', 'utf8');

// Find all matches for blog titles or CMS records
const blogMatches = text.match(/Identity design that converts|Why corporate identity|Identity mistakes|Building trust through|Landing page tips/g);
console.log('BLOG MATCHES:', blogMatches);

// Extract imports or chunk URLs from main_script
const imports = text.match(/import\s*\(?["']([^"']+)["']\)?/g);
console.log('IMPORTS:', imports ? imports.slice(0, 20) : 0);

// Search for route chunk URLs
const routes = text.match(/https:\/\/framerusercontent\.com\/[^\"]+\.mjs/g);
console.log('ALL MJS ROUTES:', [...new Set(routes)]);
