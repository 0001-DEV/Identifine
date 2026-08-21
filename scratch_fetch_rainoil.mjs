async function fetchRainoilPage() {
  try {
    const res = await fetch('https://identifi.framer.website/case-studies/rainoil');
    const html = await res.text();
    
    // Extract script tags or main container
    console.log("HTML length:", html.length);
    
    // Extract visible text content
    // Regex for text within tags
    const textMatches = html.match(/>([^<]+)</g)
      ?.map(s => s.replace(/[><]/g, '').trim())
      .filter(s => s.length > 0 && !s.includes('{') && !s.includes('@'));
    
    console.log("Text segments:", textMatches?.slice(0, 50));
    
    // Find all images
    const imgMatches = html.match(/https:\/\/framerusercontent\.com\/images\/[^"'\s)]+/g);
    console.log("Images found:", [...new Set(imgMatches)]);
    
  } catch (err) {
    console.error(err);
  }
}

fetchRainoilPage();
