# Cloudinary Migration Guide

## Overview
This guide will help you migrate your images from local storage to Cloudinary to reduce bundle size and improve performance.

## Files Affected
- **Gallery**: 14 images (c1-c14.jpeg)
- **Carousel**: 8 images (c1-c8.jpeg)
- **Events**: 14 images (various event posters)
- **Logo**: 4 main logos (iplogo, college-logo, IIC_logo, Abhiyantran-logo)

## Step 1: Setup Cloudinary Account

1. Go to https://cloudinary.com and sign up
2. Once logged in, go to Dashboard
3. Note down these credentials:
   - Cloud Name
   - API Key
   - API Secret

## Step 2: Upload Images (Choose ONE method)

### Method A: Manual Upload (Recommended for First Time)

1. Log into Cloudinary Dashboard
2. Go to Media Library
3. Create folder structure:
   - Click "Create Folder" → name it "eoorox"
   - Inside eoorox, create: gallery, carousel, events, logo
4. Upload files to respective folders:
   - Upload gallery images (c1-c14.jpeg) to eoorox/gallery
   - Upload carousel images (c1-c8.jpeg) to eoorox/carousel
   - Upload event images to eoorox/events
   - Upload logo images to eoorox/logo

### Method B: Automated Upload Using Script

1. Install Cloudinary SDK:
   ```bash
   npm install cloudinary
   ```

2. Edit `uploadToCloudinary.js` and replace:
   - YOUR_CLOUD_NAME
   - YOUR_API_KEY
   - YOUR_API_SECRET

3. Run the upload script:
   ```bash
   node uploadToCloudinary.js
   ```

## Step 3: Update Configuration

1. Open `src/config/cloudinary.js`
2. Replace `YOUR_CLOUD_NAME` with your actual Cloudinary cloud name
3. Save the file

## Step 4: Update Component Files

The following files need to be updated to use Cloudinary URLs instead of local imports:

### Files to Update:
1. `src/components/Pages/Gallery/Gallery.js` - Gallery images
2. `src/components/Pages/Games/Games.js` - Gallery images
3. `src/components/Utilities/TrendingGames/TrendingGames.js` - Gallery images
4. `src/components/Utilities/LiveStreamingVideo/Carousel8bit/Carousel8bit.js` - Carousel images
5. `src/components/Utilities/WorkGallery/WorkGallery.js` - Event images
6. `src/components/Utilities/Hero/HeroOne/HeroOne.js` - IP Logo
7. `src/components/Utilities/Footer/Footer.js` - IP Logo
8. `src/components/Utilities/About/About.js` - IP Logo
9. `src/components/Utilities/Header/Header.js` - College, IIC, Abhiyantran logos

### Example Update:

**Before:**
```javascript
import img1 from '../../../assets/img/gallery/c1.jpeg';
```

**After:**
```javascript
import { cloudinaryImages } from '../../../config/cloudinary';
const img1 = cloudinaryImages.gallery.c1;
```

## Step 5: Test Your Application

1. Run your development server:
   ```bash
   npm start
   ```

2. Check each page:
   - Home page (logos, carousel)
   - Gallery page
   - Games page
   - About page (logos)
   - Events section

3. Verify images load correctly from Cloudinary

## Step 6: Optimize Images (Optional)

After migration, you can add transformations for optimization:

```javascript
// Example: Resize and optimize
const img1 = getCloudinaryUrl('gallery', 'c1.jpeg', 'w_800,h_600,c_fill,q_auto,f_auto');
```

Available transformations:
- `w_800` - width 800px
- `h_600` - height 600px
- `c_fill` - crop to fill
- `q_auto` - automatic quality
- `f_auto` - automatic format (webp/avif)

## Step 7: Clean Up (After Verification)

Once everything works, you can:
1. Delete local image files from:
   - `src/assets/img/gallery/`
   - `src/assets/img/carousel/`
   - `src/assets/img/events/`
   - `src/assets/img/logo/iplogo.png` (keep other logos if still needed)

2. Delete the upload script: `uploadToCloudinary.js`

## Benefits

✓ Reduced bundle size
✓ Faster page loads
✓ Automatic image optimization
✓ CDN delivery worldwide
✓ Responsive images
✓ Format conversion (WebP, AVIF)

## Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- React Integration: https://cloudinary.com/documentation/react_integration
