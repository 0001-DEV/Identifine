async function inspectMain() {
  const res = await fetch('https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/script_main.BAGG-J-A.mjs');
  const text = await res.text();
  const chunks = [...text.matchAll(/https:\/\/framerusercontent\.com\/modules\/[^"'\s)]+\.mjs/g)].map(m => m[0]);
  console.log("Modules in main:", chunks);
  
  for (const chunk of chunks) {
    const cRes = await fetch(chunk);
    const cText = await cRes.text();
    if (cText.includes('Rainoil') || cText.includes('Visual Identity Direction')) {
      console.log("MATCH in chunk:", chunk);
      // print snippet
      const idx = cText.indexOf('Visual Identity Direction');
      console.log(cText.substring(Math.max(0, idx - 400), Math.min(cText.length, idx + 1500)));
    }
  }
}

inspectMain();
