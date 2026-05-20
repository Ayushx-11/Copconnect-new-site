// One-off: turn the near-white/grey background of copbot-full.png transparent.
// Run with: node images/_strip-bg.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync, deflateSync, createInflate } from 'node:zlib';

// Minimal PNG parser/writer for RGBA8 8-bit images.
// Avoids any external deps so it works in the user's offline environment.

function read(buf, offset, len) { return buf.subarray(offset, offset + len); }

function parsePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504E47) throw new Error('not a PNG');
  const chunks = [];
  let off = 8;
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.subarray(off + 4, off + 8).toString('ascii');
    const data = buf.subarray(off + 8, off + 8 + len);
    chunks.push({ type, data });
    off += 12 + len;
  }
  const ihdr = chunks.find(c => c.type === 'IHDR').data;
  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  const bitDepth = ihdr.readUInt8(8);
  const colorType = ihdr.readUInt8(9);
  if (bitDepth !== 8) throw new Error('only 8-bit supported, got ' + bitDepth);
  // Concatenate IDAT
  const idat = Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data));
  const raw = inflateSync(idat);
  // Defilter
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 4 ? 2 : 1;
  const stride = width * channels;
  const pixels = Buffer.alloc(width * height * 4);
  let prevRow = Buffer.alloc(stride);
  let inOff = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[inOff++];
    const row = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const v = raw[inOff++];
      const left = x >= channels ? row[x - channels] : 0;
      const up = prevRow[x];
      const upLeft = x >= channels ? prevRow[x - channels] : 0;
      let recon;
      if (filter === 0) recon = v;
      else if (filter === 1) recon = v + left;
      else if (filter === 2) recon = v + up;
      else if (filter === 3) recon = v + Math.floor((left + up) / 2);
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left), pb = Math.abs(p - up), pc = Math.abs(p - upLeft);
        const pred = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        recon = v + pred;
      } else throw new Error('unknown filter ' + filter);
      row[x] = recon & 0xff;
    }
    prevRow = row;
    // Expand into RGBA
    for (let x = 0; x < width; x++) {
      const sOff = x * channels;
      const dOff = (y * width + x) * 4;
      if (colorType === 6) { pixels[dOff]=row[sOff]; pixels[dOff+1]=row[sOff+1]; pixels[dOff+2]=row[sOff+2]; pixels[dOff+3]=row[sOff+3]; }
      else if (colorType === 2) { pixels[dOff]=row[sOff]; pixels[dOff+1]=row[sOff+1]; pixels[dOff+2]=row[sOff+2]; pixels[dOff+3]=255; }
      else throw new Error('color type ' + colorType + ' not implemented');
    }
  }
  return { width, height, pixels };
}

function writePng({ width, height, pixels }) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const t = Buffer.from(type, 'ascii');
    const crc = Buffer.alloc(4);
    // CRC32
    let c = 0xffffffff;
    const td = Buffer.concat([t, data]);
    for (let i = 0; i < td.length; i++) {
      c ^= td[i];
      for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
    crc.writeUInt32BE((c ^ 0xffffffff) >>> 0, 0);
    return Buffer.concat([len, t, data, crc]);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9); // RGBA8
  ihdr.writeUInt8(0,10); ihdr.writeUInt8(0,11); ihdr.writeUInt8(0,12);
  // Pack as raw filter 0 lines
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const idat = deflateSync(raw);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

const inPath = process.argv[2] || 'images/copbot-full.png';
const outPath = process.argv[3] || inPath;
console.log('Reading', inPath);
const png = parsePng(readFileSync(inPath));
console.log('Size', png.width, 'x', png.height);

// Sample top-left corner color to detect bg
const samples = [];
for (let i = 0; i < 200; i++) {
  const ox = (i * 4);
  samples.push([png.pixels[ox], png.pixels[ox+1], png.pixels[ox+2]]);
}
const avg = samples.reduce((a, [r,g,b]) => [a[0]+r, a[1]+g, a[2]+b], [0,0,0]).map(v => Math.round(v / samples.length));
console.log('Detected bg color (top-left avg):', avg);

// Make any pixel whose color is within distance `tol` of bg transparent
// Use slight smoothing: distance < 8 = fully transparent, < 30 = partial
function dist(a,b) { return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2); }
let stripped = 0;
for (let i = 0; i < png.pixels.length; i += 4) {
  const px = [png.pixels[i], png.pixels[i+1], png.pixels[i+2]];
  const d = dist(px, avg);
  if (d < 14) { png.pixels[i+3] = 0; stripped++; }
  else if (d < 36) {
    const t = (d - 14) / (36 - 14);
    png.pixels[i+3] = Math.round(255 * t);
  }
}
console.log('Stripped', stripped, 'pixels');
writeFileSync(outPath, writePng(png));
console.log('Wrote', outPath);
