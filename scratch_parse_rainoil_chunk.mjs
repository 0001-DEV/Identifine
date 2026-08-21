import fs from 'fs';

async function parseCaseStudyPage() {
  const res = await fetch('https://identifi.framer.website/case-studies/rainoil');
  const html = await res.text();
  
  // Find script chunks
  const scriptUrls = [...html.matchAll(/src="([^"]+\.mjs)"/g)].map(m => m[1]);
  console.log("Script URLs:", scriptUrls);
  
  for (const url of scriptUrls) {
    const sRes = await fetch(url);
    const sText = await sRes.text();
    if (sText.includes('Visual Identity Direction') || sText.includes('We partnered with')) {
      console.log("Found chunk with content:", url);
      // Let's write the chunk or inspect it
      fs.writeFileSync('rainoil_chunk.js', sText);
      console.log("Written rainoil_chunk.js");
    }
  }
}

parseCaseStudyPage();
