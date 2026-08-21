import fs from 'fs';

const css = fs.readFileSync('framer_journal_css.txt', 'utf8');

const targetClasses = ['framer-k2571x', 'framer-6qibxx', 'framer-bge5nr', 'framer-17oxi8r', 'framer-no74kl', 'framer-1x644gk'];

for (const c of targetClasses) {
  const matches = [...css.matchAll(new RegExp(`\\.framer-[^\\{]*${c}[^\\{]*\\{[^\\}]+\\}`, 'g'))].map(m => m[0]);
  console.log(`=== ${c} ===`);
  matches.forEach(m => console.log(m));
}
