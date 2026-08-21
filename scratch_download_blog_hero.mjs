import fs from 'fs';

async function downloadBlogHero() {
  const url = 'https://framerusercontent.com/images/9dAb299scDpvttYGl8LW6V89Ys.jpg';
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  fs.writeFileSync('src/assets/blog_hero_converts.jpg', Buffer.from(buf));
  console.log("Saved src/assets/blog_hero_converts.jpg");
}

downloadBlogHero();
