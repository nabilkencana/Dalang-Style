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

// Print 80 columns x 40 rows
const cols = 80;
const rows = 40;
let output = [];
for (let r = 0; r < rows; r++) {
  let line = '';
  const y = Math.floor(r * (height / rows));
  for (let c = 0; c < cols; c++) {
    const x = Math.floor(c * (width / cols));
    const a = unfilter[(y * width + x) * 4 + 3];
    const rVal = unfilter[(y * width + x) * 4];
    const gVal = unfilter[(y * width + x) * 4 + 1];
    const bVal = unfilter[(y * width + x) * 4 + 2];
    
    // Check candidate points
    if (x >= 20 && x <= 24 && y >= 33 && y <= 37) line += '!'; // current [22, 35]
    else if (x >= 65 && x <= 69 && y >= 50 && y <= 54) line += '1'; // [67, 52]
    else if (x >= 78 && x <= 82 && y >= 56 && y <= 60) line += '2'; // [80, 58]
    else if (x >= 92 && x <= 96 && y >= 62 && y <= 66) line += '3'; // [94, 64]
    else if (x >= 216 && x <= 220 && y >= 92 && y <= 96) line += 'W'; // wrist [218, 94]
    else if (a < 40) line += ' ';
    else {
      // luminance
      const lum = (rVal * 299 + gVal * 587 + bVal * 114) / 1000;
      if (lum > 160) line += '.';
      else if (lum > 80) line += '+';
      else line += '#';
    }
  }
  output.push(`${String(Math.floor(r * height / rows)).padStart(3, ' ')} |${line}|`);
}
fs.writeFileSync('hand_map.txt', output.join('\n'));
console.log('Saved hand_map.txt');
