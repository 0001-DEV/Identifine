import fs from 'fs';

const slugs = ['rainoil', 'seplat', 'revolution-plus', 'arm', 'sterling-bank', 'tvc', 'bank-78', 'uba'];

async function scrapeAllCaseStudies() {
  const results = {};
  
  for (const slug of slugs) {
    try {
      const url = `https://identifi.framer.website/case-studies/${slug}`;
      const res = await fetch(url);
      const html = await res.text();
      
      // Extract images from html
      const imgMatches = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9_-]+\.(?:jpg|png|svg|webp))/g)].map(m => m[0]);
      const uniqueImgs = [...new Set(imgMatches)].filter(u => !u.includes('fil9iiGkjCASpkzNEoXx0Hz7uE') && !u.includes('OmPFXCCV9PNsL2afkYkLKCy30k4') && !u.includes('G8cPI2T7SBxAKQyklG6OIfva0') && !u.includes('ELPGptGppKHJP5JwjYY0vEFkbE0') && !u.includes('nZowve7G64E03snLfwkROHnUI') && !u.includes('FS5bwlcu5kt4IPmp1i7HwlX14k'));
      
      console.log(`=== ${slug} ===`);
      console.log("Images:", uniqueImgs);
      
      results[slug] = {
        url,
        images: uniqueImgs
      };
    } catch (e) {
      console.error(slug, e);
    }
  }
  
  fs.writeFileSync('scraped_case_studies.json', JSON.stringify(results, null, 2));
  console.log("Done scraping!");
}

scrapeAllCaseStudies();
