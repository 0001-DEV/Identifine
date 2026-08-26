import fs from 'fs';

const json = JSON.parse(fs.readFileSync('scratch/searchIndex.json', 'utf8'));

Object.entries(json).forEach(([route, data]) => {
  if (route.startsWith('/blog')) {
    console.log('ROUTE:', route);
    console.log('DATA:', JSON.stringify(data, null, 2));
    console.log('----------------------------------------------------');
  }
});
