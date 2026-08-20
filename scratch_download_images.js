const fs = require('fs');
const path = require('path');

const images = [
  { name: 'rainoil.jpg', url: 'https://framerusercontent.com/images/D7yHSZ4UO6Phv2GQkBHGzyzd34.jpg' },
  { name: 'seplat.png', url: 'https://framerusercontent.com/images/m23rWmTC1t117pl0p0yuKgkA2vE.png' },
  { name: 'revolution_plus.png', url: 'https://framerusercontent.com/images/8PPo4xrKMwWrMsclJgmOl5Mo.png' },
  { name: 'arm.png', url: 'https://framerusercontent.com/images/noNpD2fR8Da0MQ0ehkSf8BFajA.png' },
  { name: 'sterling_bank.png', url: 'https://framerusercontent.com/images/ERZqkxg5upnRCL3xTV3Tx8zj6bU.png' },
  { name: 'tvc.jpg', url: 'https://framerusercontent.com/images/shFKGuscUbf1x6FO5MTdJvUIJLM.jpg' },
  { name: 'bank78.jpg', url: 'https://framerusercontent.com/images/auPW3XXdL3UM8rzTJ1eZUMqObg.jpg' },
  { name: 'uba.png', url: 'https://framerusercontent.com/images/SHvoyTXPR9vADEmAMkoFZ0GiGKA.png' }
];

async function downloadImages() {
  const dir = path.join(__dirname, '..', 'src', 'assets', 'case-studies');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const img of images) {
    try {
      const res = await fetch(img.url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path.join(dir, img.name), buffer);
      console.log('Downloaded:', img.name, 'size:', buffer.length);
    } catch (e) {
      console.error('Failed to download', img.name, e);
    }
  }
}

downloadImages();
