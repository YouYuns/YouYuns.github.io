const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:/Users/SUNGHO/Desktop/모바일청첩장';
const destDir = path.join(__dirname, '../src/images');

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

async function convertAll() {
  const files = fs.readdirSync(srcDir)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .sort(naturalSort);

  console.log(`Found ${files.length} images to convert:`);

  for (let i = 0; i < files.length; i++) {
    const srcFile = path.join(srcDir, files[i]);
    const destFile = path.join(destDir, `${i + 1}.webp`);

    const image = sharp(srcFile);
    const metadata = await image.metadata();

    let transform = sharp(srcFile).rotate();
    if (metadata.width > 1600 || metadata.height > 1600) {
      if (metadata.width >= metadata.height) {
        transform = transform.resize({ width: 1600, withoutEnlargement: true });
      } else {
        transform = transform.resize({ height: 1600, withoutEnlargement: true });
      }
    }

    await transform
      .webp({ quality: 82, effort: 6 })
      .toFile(destFile);

    const stat = fs.statSync(destFile);
    console.log(`[${i + 1}/${files.length}] ${files[i]} -> ${i + 1}.webp (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('All images converted successfully!');
}

convertAll().catch(err => {
  console.error('Error converting images:', err);
  process.exit(1);
});
