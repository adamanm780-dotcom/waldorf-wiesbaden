import { Jimp } from 'jimp';

const img = await Jimp.read('../waldorf logo/fede46d1-8f64-4da7-aa28-22671cf7b6a6.jpg');

img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
  const r = this.bitmap.data[idx];
  const g = this.bitmap.data[idx + 1];
  const b = this.bitmap.data[idx + 2];
  // Make white/near-white pixels transparent
  if (r > 220 && g > 220 && b > 220) {
    this.bitmap.data[idx + 3] = 0;
  }
});

await img.write('logo-nobg.png');
console.log('Done! logo-nobg.png created.');
