import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadHero() {
  const url = 'https://framerusercontent.com/images/uZw7JfP2571wmEcR1LNquw0HpI.png';
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  const dest = path.join(__dirname, 'src', 'assets', 'case-studies', 'product_catalogue_hero.png');
  fs.writeFileSync(dest, buffer);
  console.log('Downloaded product_catalogue_hero.png, size:', buffer.length);
}

downloadHero();
