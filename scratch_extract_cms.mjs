import fs from 'fs';

async function extractCMSData() {
  const url = 'https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/o92Ees1t9.C1G8gb4d.mjs';
  const res = await fetch(url);
  const text = await res.text();
  console.log("CMS file length:", text.length);
  fs.writeFileSync('cms_case_studies.js', text);
  console.log("Written cms_case_studies.js");
}

extractCMSData();
