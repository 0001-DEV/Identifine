async function inspectFavicon() {
  const url = 'https://framerusercontent.com/images/fil9iiGkjCASpkzNEoXx0Hz7uE.svg';
  const res = await fetch(url);
  const text = await res.text();
  console.log("Framer favicon SVG content:\n", text);
}

inspectFavicon();
