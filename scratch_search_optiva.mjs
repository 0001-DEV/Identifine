async function searchOptiva() {
  try {
    const res = await fetch('https://framerusercontent.com/sites/1CM8YwuzS4OncBb65X4Dov/searchIndex-yaFI1z7IGJkq.json');
    const data = await res.json();
    console.log("Search index entries:", Object.keys(data));
    const str = JSON.stringify(data);
    const matches = str.match(/optiva[^\s"']*/gi);
    console.log("Optiva matches in search index:", matches);
  } catch (e) {
    console.error(e);
  }
}

searchOptiva();
