const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('public/assets/bagong/hand-1.png');
let pos = 8, idatChunks = [], width = 0, height = 0;
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}
const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const bpp = 4;
const rowSize = 1 + width * bpp;
const unfilter = Buffer.alloc(width * height * bpp);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

for (let y = 0; y < height; y++) {
  const filterType = raw[y * rowSize];
  const rowStart = y * rowSize + 1;
  const outStart = y * width * bpp;
  const prevOutStart = (y - 1) * width * bpp;

  for (let x = 0; x < width * bpp; x++) {
    const rawVal = raw[rowStart + x];
    const left = x >= bpp ? unfilter[outStart + x - bpp] : 0;
    const up = y > 0 ? unfilter[prevOutStart + x] : 0;
    const upLeft = y > 0 && x >= bpp ? unfilter[prevOutStart + x - bpp] : 0;

    let val = 0;
    switch (filterType) {
      case 0: val = rawVal; break;
      case 1: val = (rawVal + left) & 0xff; break;
      case 2: val = (rawVal + up) & 0xff; break;
      case 3: val = (rawVal + Math.floor((left + up) / 2)) & 0xff; break;
      case 4: val = (rawVal + paeth(left, up, upLeft)) & 0xff; break;
    }
    unfilter[outStart + x] = val;
  }
}

// Let's create an SVG preview of hand-1.png with markers for:
// - Wrist Prox [218, 94]
// - Current Grip [22, 35]
// - Candidate Grips e.g. [65, 55], [75, 60], [85, 65], [95, 65]
// Convert PNG data to base64 for embedding in SVG
const base64Png = buf.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="720" height="360" style="background:#222">
  <image href="data:image/png;base64,${base64Png}" width="240" height="120" />
  <!-- Wrist Prox -->
  <circle cx="218" cy="94" r="4" fill="#00ffff" />
  <text x="218" y="112" font-size="8" fill="#00ffff" text-anchor="middle">Wrist [218,94]</text>

  <!-- Old Grip [22, 35] -->
  <circle cx="22" cy="35" r="4" fill="#ff0000" />
  <line x1="22" y1="35" x2="22" y2="120" stroke="#ff0000" stroke-width="2" />
  <text x="22" y="25" font-size="8" fill="#ff0000" text-anchor="middle">Old Grip [22,35] (Pucuk)</text>

  <!-- Candidate 1 [65, 52] -->
  <circle cx="65" cy="52" r="3" fill="#ffff00" />
  <line x1="65" y1="52" x2="65" y2="120" stroke="#ffff00" stroke-width="1.5" stroke-dasharray="3,3" />
  <text x="65" y="45" font-size="7" fill="#ffff00" text-anchor="middle">[65,52]</text>

  <!-- Candidate 2 [75, 60] -->
  <circle cx="75" cy="60" r="3" fill="#00ff00" />
  <line x1="75" y1="60" x2="75" y2="120" stroke="#00ff00" stroke-width="2" />
  <text x="75" y="52" font-size="7" fill="#00ff00" text-anchor="middle">[75,60]</text>

  <!-- Candidate 3 [88, 62] -->
  <circle cx="88" cy="62" r="3" fill="#ff8800" />
  <line x1="88" y1="62" x2="88" y2="120" stroke="#ff8800" stroke-width="1.5" stroke-dasharray="3,3" />
  <text x="88" y="55" font-size="7" fill="#ff8800" text-anchor="middle">[88,62]</text>
</svg>`;

fs.writeFileSync('public/assets/bagong/grip_preview.svg', svg);
console.log('Saved grip_preview.svg');
