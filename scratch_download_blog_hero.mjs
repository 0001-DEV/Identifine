import fs from 'fs';
import path from 'path';

const blogDir = './src/assets/blog';
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

const imagesToFetch = [
  { name: 'blog_1.jpg', url: 'https://framerusercontent.com/images/voVDt6VNkChjkdxCBEdjJIJRtc4.jpg' },
  { name: 'blog_2.jpg', url: 'https://framerusercontent.com/images/TWYqMqARFulW0sklt7GbHYI.jpg' },
  { name: 'blog_3.jpg', url: 'https://framerusercontent.com/images/fxO0ZlaVWlFb22PJponScs6IP8.jpg' },
  { name: 'blog_4.jpg', url: 'https://framerusercontent.com/images/FmeH8eqjHhnhADpE0a0biEUZqe0.jpg' },
  { name: 'blog_5.jpg', url: 'https://framerusercontent.com/images/5zqQb6of14o5Q56TamEfJeupkfA.jpg' }
];

async function downloadImages() {
  for (const img of imagesToFetch) {
    console.log('Downloading:', img.name);
    try {
      const res = await fetch(img.url);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(path.join(blogDir, img.name), Buffer.from(buffer));
      console.log('Saved:', img.name);
    } catch (err) {
      console.error('Error downloading:', img.name, err);
    }
  }
}

downloadImages();
