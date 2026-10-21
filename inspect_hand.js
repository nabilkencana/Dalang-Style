const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('public/assets/bagong/hand-1.png');
let pos = 8;
let idatChunks = [];
let width = 0, height = 0;
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
const compressed = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(compressed);

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

// Print ASCII art 60 cols x 30 rows
const cols = 60;
const rows = 30;
for (let r = 0; r < rows; r++) {
  let line = '';
  const y = Math.floor(r * (height / rows));
  for (let c = 0; c < cols; c++) {
    const x = Math.floor(c * (width / cols));
    // check if this is near current grip [22, 35] or prox [218, 94]
    if (Math.abs(x - 22) < 4 && Math.abs(y - 35) < 3) {
      line += 'G'; // Current Grip
    } else if (Math.abs(x - 218) < 4 && Math.abs(y - 94) < 3) {
      line += 'P'; // Prox (wrist)
    } else {
      const a = unfilter[(y * width + x) * 4 + 3];
      line += a > 50 ? '#' : ' ';
    }
  }
  console.log(`${String(r * 4).padStart(3, ' ')} |${line}|`);
}
