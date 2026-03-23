import { Jimp } from 'jimp';

const img = await Jimp.read('c:/Users/maykt/Downloads/cool');

img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
  const r = this.bitmap.data[idx];
  const g = this.bitmap.data[idx + 1];
  const b = this.bitmap.data[idx + 2];
  // Make dark/black pixels transparent
  if (r < 40 && g < 40 && b < 40) {
    this.bitmap.data[idx + 3] = 0;
  }
});

await img.write('cool-nobg.png');
console.log('Done! cool-nobg.png created.');
