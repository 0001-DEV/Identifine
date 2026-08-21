import fs from 'fs';
import path from 'path';

const images = [
  { url: 'https://framerusercontent.com/images/D7yHSZ4UO6Phv2GQkBHGzyzd34.jpg', name: 'rainoil_1.jpg' },
  { url: 'https://framerusercontent.com/images/noNpD2fR8Da0MQ0ehkSf8BFajA.png', name: 'rainoil_2.png' },
  { url: 'https://framerusercontent.com/images/G7G8zFXJDYUr4fEE9zrGNcXgL7w.jpg', name: 'rainoil_3.jpg' }
];

async function downloadImages() {
  const destDir = 'src/assets/case-studies';
  
  for (const img of images) {
    console.log("Downloading", img.url);
    const res = await fetch(img.url);
    const buf = await res.arrayBuffer();
    fs.writeFileSync(path.join(destDir, img.name), Buffer.from(buf));
    console.log("Saved", img.name);
  }
  console.log("All downloaded!");
}

downloadImages();
