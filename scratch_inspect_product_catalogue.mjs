import fs from 'fs';

async function fetchFramerProductCatalogue() {
  const res = await fetch('https://identifi.framer.website/product-catalogue');
  const html = await res.text();
  console.log("HTML length:", html.length);

  // Extract all text inside elements
  const textMatches = [];
  const regex = />([^<]+)</g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const str = m[1].trim();
    if (str && !str.startsWith('{') && !str.includes('var(') && !str.includes('function') && str.length > 1) {
      textMatches.push(str);
    }
  }
  console.log("Product Catalogue Text fragments:", [...new Set(textMatches)]);

  // Extract image urls
  const images = [...html.matchAll(/https:\/\/framerusercontent.com\/images\/[^\s"'<>]+\.(png|jpg|jpeg|svg|webp)/g)].map(m => m[0]);
  console.log("Images found on product-catalogue:", [...new Set(images)]);
}

fetchFramerProductCatalogue();
