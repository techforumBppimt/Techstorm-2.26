const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dyj3kxni2',
  api_key: '964966765481576',
  api_secret: '2bzTfHSjCxPpFgh5lOje_bzlIYM'
});

// Folders to upload
const folders = ['gallery', 'carousel', 'events', 'logo'];

// Root images to upload (directly in img folder)
const rootImages = [
  'herobg.png',
  'heroph.png',
  'aboutbg.png',
  'pcmain.png',
  'pcstart.png',
  'preloader.gif',
  'cursor.png',
  'cursor-click.png'
];

async function uploadFolder(folderName) {
  const folderPath = path.join(__dirname, 'src', 'assets', 'img', folderName);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`Folder ${folderName} does not exist`);
    return;
  }

  const files = fs.readdirSync(folderPath);
  
  console.log(`\nUploading ${folderName} folder...`);
  
  for (const file of files) {
    if (file.includes('.TMP')) continue; // Skip temp files
    
    const filePath = path.join(folderPath, file);
    
    if (fs.statSync(filePath).isFile()) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `eoorox/${folderName}`,
          public_id: path.parse(file).name,
          overwrite: true
        });
        
        console.log(`✓ Uploaded: ${file} -> ${result.secure_url}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error.message);
      }
    }
  }
}

async function uploadRootImages() {
  const rootPath = path.join(__dirname, 'src', 'assets', 'img');
  
  console.log('\\nUploading root images...');
  
  for (const file of rootImages) {
    const filePath = path.join(rootPath, file);
    
    if (fs.existsSync(filePath)) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'eoorox/root',
          public_id: path.parse(file).name,
          overwrite: true
        });
        
        console.log(`✓ Uploaded: ${file} -> ${result.secure_url}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error.message);
      }
    } else {
      console.log(`⊗ File not found: ${file}`);
    }
  }
}

async function uploadAll() {
  console.log('Starting Cloudinary upload...');
  
  for (const folder of folders) {
    await uploadFolder(folder);
  }
  
  await uploadRootImages();
  
  console.log('\\n✓ Upload complete!');
}

uploadAll();
