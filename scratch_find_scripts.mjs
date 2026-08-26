import fs from 'fs';

const html = fs.readFileSync('scratch/framer_blog.html', 'utf8');

const scripts = html.match(/src="([^"]+)"/g);
console.log('ALL SCRIPT SOURCES:', scripts);

// Let's also search for inline JSON or script contents
const inlineScripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
console.log('INLINE SCRIPTS COUNT:', inlineScripts ? inlineScripts.length : 0);

if (inlineScripts) {
  inlineScripts.forEach((s, idx) => {
    if (s.includes('Featured post') || s.includes('Explore') || s.includes('blog')) {
      fs.writeFileSync(`scratch/inline_script_${idx}.js`, s);
      console.log(`Saved inline_script_${idx}.js`);
    }
  });
}
