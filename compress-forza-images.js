const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'public', 'pictures_of_gallery', 'ForzaHorizon');
const outputFolder = path.join(folder, 'compressed');

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(folder).forEach(file => {
  const filePath = path.join(folder, file);
  if (fs.statSync(filePath).isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
    const outputPath = path.join(outputFolder, file);
    sharp(filePath)
      .jpeg({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`Compressed: ${file}`);
      })
      .catch(err => {
        console.error(`Error compressing ${file}:`, err);
      });
  }
});
