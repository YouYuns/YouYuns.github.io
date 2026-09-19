const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:/Users/sung/Desktop/모청사진';
const destDir = path.join(__dirname, '../src/images');
const publicDir = path.join(__dirname, '../public');

function parseKey(name) {
  const m = name.match(/^(\d+)(\.(\d+))?/);
  if (!m) return [999, 0, name];
  const major = parseInt(m[1], 10);
  const minor = m[3] ? parseInt(m[3], 10) : 0;
  const subMatch = name.match(/^(\d+)[^\d.]+(\d+)/);
  const sub = subMatch ? parseInt(subMatch[2], 10) : 0;
  return [major, minor, sub, name];
}

async function convertImage(srcFile, destFiles) {
  const buf = await sharp(srcFile)
    .rotate()
    .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();

  const meta = await sharp(buf).metadata();

  for (const dest of destFiles) {
    fs.writeFileSync(dest, buf);
    const stat = fs.statSync(dest);
    console.log(`  -> ${path.basename(dest)}: ${meta.width}x${meta.height}, ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

async function run() {
  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory not found: ${srcDir}`);
    process.exit(1);
  }

  const allFiles = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  allFiles.sort((a, b) => {
    const [majA, minA, subA] = parseKey(a);
    const [majB, minB, subB] = parseKey(b);
    if (majA !== majB) return majA - majB;
    if (minA !== minB) return minA - minB;
    if (subA !== subB) return subA - subB;
    return a.localeCompare(b);
  });

  console.log(`Found ${allFiles.length} files in ${srcDir}:`);
  allFiles.forEach((f, i) => console.log(` [${i}] ${f}`));

  // 1. 0썸넬 -> main.webp (both src/images/main.webp and public/main.webp)
  const thumbFile = allFiles.find(f => f.startsWith('0'));
  if (thumbFile) {
    console.log(`\nConverting thumbnail: ${thumbFile} -> main.webp`);
    await convertImage(path.join(srcDir, thumbFile), [
      path.join(destDir, 'main.webp'),
      path.join(publicDir, 'main.webp'),
    ]);
  } else {
    console.warn('Warning: 0썸넬 file not found!');
  }

  // 2. 1, 2, 3, 4 -> 1.webp, 2.webp, 3.webp, 4.webp (for autocover)
  const autoCoverFiles = [1, 2, 3, 4].map(num => {
    return allFiles.find(f => {
      const [maj] = parseKey(f);
      return maj === num && !f.startsWith('0');
    });
  });

  console.log('\nConverting AutoCover images (1~4):');
  for (let i = 0; i < autoCoverFiles.length; i++) {
    const f = autoCoverFiles[i];
    if (!f) {
      console.warn(`Warning: AutoCover image ${i + 1} not found!`);
      continue;
    }
    console.log(`Converting ${f} -> ${i + 1}.webp`);
    await convertImage(path.join(srcDir, f), [
      path.join(destDir, `${i + 1}.webp`),
    ]);
  }

  // 3. 5실내 ~ 24 -> gallery-1.webp ~ gallery-21.webp (for gallery only)
  const galleryFiles = allFiles.filter(f => {
    const [maj] = parseKey(f);
    return maj >= 5;
  });

  console.log(`\nConverting Gallery images (5~24, total ${galleryFiles.length} images):`);
  for (let i = 0; i < galleryFiles.length; i++) {
    const f = galleryFiles[i];
    const targetName = `gallery-${i + 1}.webp`;
    console.log(`Converting [${i + 1}/${galleryFiles.length}] ${f} -> ${targetName}`);
    await convertImage(path.join(srcDir, f), [
      path.join(destDir, targetName),
    ]);
  }

  // 4. Remove old 5.webp ~ 30.webp if they exist
  console.log('\nCleaning up old unused numbered webp files in src/images:');
  for (let num = 5; num <= 30; num++) {
    const oldFile = path.join(destDir, `${num}.webp`);
    if (fs.existsSync(oldFile)) {
      fs.unlinkSync(oldFile);
      console.log(`  Removed obsolete: ${num}.webp`);
    }
  }

  console.log('\nAll image processing completed successfully!');
}

run().catch(err => {
  console.error('Error during image conversion:', err);
  process.exit(1);
});
