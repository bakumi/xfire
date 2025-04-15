const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const sizes = {
    'icon-16x16.png': 16,
    'icon-32x32.png': 32,
    'icon-192x192.png': 192,
    'icon-512x512.png': 512,
    'apple-icon.png': 180,
    'favicon.ico': 32,
  };

  const inputSvg = path.join(process.cwd(), 'public', 'icon.svg');
  const ogInputSvg = path.join(process.cwd(), 'public', 'og-image.svg');

  // Генерация иконок разных размеров
  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(inputSvg)
      .resize(size, size)
      .toFile(path.join(process.cwd(), 'public', filename));
  }

  // Генерация OG изображения
  await sharp(ogInputSvg)
    .resize(1200, 630)
    .toFile(path.join(process.cwd(), 'public', 'og-image.png'));

  console.log('✅ Все иконки успешно сгенерированы');
}

generateIcons().catch(console.error); 