import fs from 'fs';

async function fetchCmsChunk() {
  const url = 'https://framerusercontent.com/cms/o92Ees1t9-chunk-default-0.framercms';
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  console.log("Chunk buffer length:", buf.byteLength);
  
  // Let's decode strings from the buffer
  const decoder = new TextDecoder('utf-8');
  const str = decoder.decode(buf);
  
  // Find all URLs
  const urls = [...str.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'\s\x00-\x1f]+/g)].map(m => m[0]);
  console.log("All image URLs found:", [...new Set(urls)]);
  
  // Let's look for text segments
  const words = str.split(/[\x00-\x1f]+/).filter(s => s.length > 2);
  fs.writeFileSync('cms_strings.txt', words.join('\n'));
  console.log("Written cms_strings.txt");
}

fetchCmsChunk();
