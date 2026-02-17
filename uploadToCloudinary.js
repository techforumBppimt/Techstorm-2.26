const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dyj3kxni2',
  api_key: '964966765481576',
  api_secret: '2bzTfHSjCxPpFgh5lOje_bzlIYM'
});

// Helper to get all subfolders in a directory
function getSubfolders(rootPath) {
  if (!fs.existsSync(rootPath)) return [];
  return fs.readdirSync(rootPath).filter(f => fs.statSync(path.join(rootPath, f)).isDirectory());
}

// Folders to upload from src/assets/img (all subfolders of gallery, carousel, events, logo)
const assetImgRoot = path.join(__dirname, 'src', 'assets', 'img');
const assetFolders = ['gallery', 'carousel', 'events', 'logo'];
const assetSubfolders = assetFolders.flatMap(folder => {
  const folderPath = path.join(assetImgRoot, folder);
  return getSubfolders(folderPath).map(sub => ({
    local: path.join(folderPath, sub),
    cloud: `eoorox/${folder}/${sub}`
  }))
    .concat({ local: folderPath, cloud: `eoorox/${folder}` }); // include root folder
});

// Folders to upload from public/pictures_of_gallery (all subfolders)
const picturesOfGalleryRoot = path.join(__dirname, 'public', 'pictures_of_gallery');
const picturesOfGallerySubfolders = getSubfolders(picturesOfGalleryRoot).map(sub => ({
  local: path.join(picturesOfGalleryRoot, sub),
  cloud: `eoorox/pictures_of_gallery/${sub}`
}));

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

async function uploadFolder(localFolder, cloudinaryTargetFolder) {
  if (!fs.existsSync(localFolder)) {
    console.log(`Folder ${localFolder} does not exist`);
    return;
  }
  const files = fs.readdirSync(localFolder);
  if (!files.length) {
    console.log(`No files in ${localFolder}`);
    return;
  }
  console.log(`\nUploading ${localFolder} to Cloudinary folder ${cloudinaryTargetFolder}...`);
  for (const file of files) {
    if (file.startsWith('.') || file.includes('.TMP')) continue; // Skip hidden/temp files
    const filePath = path.join(localFolder, file);
    if (fs.statSync(filePath).isFile()) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: cloudinaryTargetFolder,
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
  // Upload all asset subfolders and root folders
  for (const { local, cloud } of assetSubfolders) {
    await uploadFolder(local, cloud);
  }
  // Upload all pictures_of_gallery subfolders
  for (const { local, cloud } of picturesOfGallerySubfolders) {
    await uploadFolder(local, cloud);
  }
  await uploadRootImages();
  console.log('\\n✓ Upload complete!');
}

uploadAll();
