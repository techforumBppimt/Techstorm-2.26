// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = 'dyj3kxni2';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Helper function to get Cloudinary URL
export const getCloudinaryUrl = (folder, filename, transformations = '') => {
  // Remove file extension
  const publicId = filename.replace(/\.[^/.]+$/, '');
  
  // Add transformations if provided (e.g., 'w_500,h_300,c_fill')
  const transform = transformations ? `/${transformations}` : '';
  
  return `${CLOUDINARY_BASE_URL}${transform}/eoorox/${folder}/${publicId}`;
};

// Image URLs object for easy management
export const cloudinaryImages = {
  // Gallery images - optimized
  gallery: {
    c1: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c1`,
    c2: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c2`,
    c3: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c3`,
    c4: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c4`,
    c5: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c5`,
    c6: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c6`,
    c7: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c7`,
    c8: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c8`,
    c9: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c9`,
    c10: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c10`,
    c11: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c11`,
    c12: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c12`,
    c13: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c13`,
    c14: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill,q_auto:good,f_auto/eoorox/gallery/c14`,
  },
  
  // Carousel images - optimized for fast loading
  carousel: {
    c1: `${CLOUDINARY_BASE_URL}/w_1200,h_800,c_fill,q_auto:good,f_auto/eoorox/carousel/c1`,
    c2: `${CLOUDINARY_BASE_URL}/w_1200,h_800,c_fill,q_auto:good,f_auto/eoorox/carousel/c2`,
    c3: `${CLOUDINARY_BASE_URL}/w_1200,h_800,c_fill,q_auto:good,f_auto/eoorox/carousel/c3`,
    c4: `${CLOUDINARY_BASE_URL}/w_1200,h_800,c_fill,q_auto:good,f_auto/eoorox/carousel/c4`,
    c5: `${CLOUDINARY_BASE_URL}/w_1200,h_800,c_fill,q_auto:good,f_auto/eoorox/carousel/c5`,
    c6: `${CLOUDINARY_BASE_URL}/w_1200,h_800,c_fill,q_auto:good,f_auto/eoorox/carousel/c6`,
    c7: `${CLOUDINARY_BASE_URL}/w_1200,h_800,c_fill,q_auto:good,f_auto/eoorox/carousel/c7`,
    c8: `${CLOUDINARY_BASE_URL}/w_1200,h_800,c_fill,q_auto:good,f_auto/eoorox/carousel/c8`,
  },
  
  // Event images - optimized
  events: {
    codebee: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/codebee`,
    crreativecanvas: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/crreativecanvas`,
    fifamobile: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/fifamobile`,
    forzahorizon: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/forzahorizon`,
    hackstorm: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/hackstorm`,
    khet: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/khet`,
    omegatrix: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/omegatrix`,
    passionwithreels: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/passionwithreels`,
    rocombat: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/rocombat`,
    ronavigator: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/ronavigator`,
    rosoccer: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/rosoccer`,
    roterrance: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/roterrance`,
    techhunt: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/techhunt`,
    technomania: `${CLOUDINARY_BASE_URL}/w_600,h_400,c_fit,q_auto:good,f_auto/eoorox/events/technomania`,
  },
  
  // Root images (backgrounds, hero images, etc.) - optimized
  root: {
    herobg: `${CLOUDINARY_BASE_URL}/w_1920,q_auto:good,f_auto/eoorox/root/herobg`,
    heroph: `${CLOUDINARY_BASE_URL}/w_800,q_auto:good,f_auto/eoorox/root/heroph`,
    aboutbg: `${CLOUDINARY_BASE_URL}/w_1920,q_auto:good,f_auto/eoorox/root/aboutbg`,
    footerbg: `${CLOUDINARY_BASE_URL}/w_1920,q_auto:good,f_auto/eoorox/root/footerbg`,
    pcmain: `${CLOUDINARY_BASE_URL}/w_800,q_auto:good,f_auto/eoorox/root/pcmain`,
    pcstart: `${CLOUDINARY_BASE_URL}/w_800,q_auto:good,f_auto/eoorox/root/pcstart`,
    preloader: `${CLOUDINARY_BASE_URL}/w_200,q_auto:good,f_auto/eoorox/root/preloader`,
    cursor: `${CLOUDINARY_BASE_URL}/w_50,q_auto:good,f_auto/eoorox/root/cursor`,
    cursorClick: `${CLOUDINARY_BASE_URL}/w_50,q_auto:good,f_auto/eoorox/root/cursor-click`,
  },
  
  // Logo images
  logo: {
    iplogo: `${CLOUDINARY_BASE_URL}/eoorox/logo/iplogo`,
    collegelogo: `${CLOUDINARY_BASE_URL}/eoorox/logo/college-logo`,
    IIC_logo: `${CLOUDINARY_BASE_URL}/eoorox/logo/IIC_logo`,
    Abhiyantran_logo: `${CLOUDINARY_BASE_URL}/eoorox/logo/Abhiyantran-logo`,
  }
};

export default cloudinaryImages;
