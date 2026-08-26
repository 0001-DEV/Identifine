import fs from 'fs';

const html = fs.readFileSync('scratch/framer_blog.html', 'utf8');

// Find all CSS variable declarations or framer styles
const styles = html.match(/style="([^"]+)"/g);
console.log('STYLES COUNT:', styles ? styles.length : 0);

if (styles) {
  const fontStyles = styles.filter(s => s.includes('font-family') || s.includes('font-size') || s.includes('color'));
  console.log('SAMPLE FONT STYLES (first 15):');
  fontStyles.slice(0, 15).forEach(s => console.log(s));
}
