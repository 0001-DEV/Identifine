import fs from 'fs';

const html = fs.readFileSync('scratch/framer_blog.html', 'utf8');

const urls = html.match(/https:\/\/framerusercontent\.com\/[^\s"'>]+/g);
const set = new Set(urls);
console.log('ALL UNIQUE FRAMER URLS IN HTML:', [...set].filter(u => !u.endsWith('.jpg') && !u.endsWith('.svg') && !u.endsWith('.png')));
