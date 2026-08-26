import fs from 'fs';

const searchIndex = JSON.parse(fs.readFileSync('scratch/searchIndex.json', 'utf8'));

// Print all entries in searchIndex
console.log('ALL SEARCH INDEX KEYS & TITLES:');
Object.entries(searchIndex).forEach(([key, value]) => {
  console.log('KEY:', key);
  console.log('TITLE:', value.title);
  console.log('P:', value.h1 || value.h2 || value.p ? (value.h1 || value.h2 || value.p).slice(0, 100) : '');
  console.log('---');
});
