# 🚨 URGENT: Vercel Timeout Fix for File Uploads

## Problem

The backend is throwing `FUNCTION_INVOCATION_FAILED` errors when users try to register. This is caused by:

1. **Vercel's 10-second timeout** on the free tier (Hobby plan)
2. **Multiple file uploads** (participant ID proofs) taking too long
3. **Parallel Cloudinary uploads** causing timeout issues

## Solution Applied

### 1. ✅ Updated `vercel.json` Configuration

Added timeout and memory settings:

```json
{
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node",
      "config": {
        "maxDuration": 60
      }
    }
  ],
  "functions": {
    "server.js": {
      "maxDuration": 60,
      "memory": 1024
    }
  }
}
```

**Note**: `maxDuration: 60` requires a **Pro plan** ($20/month). On the free Hobby plan, the max is 10 seconds.

### 2. ✅ Changed File Upload from Parallel to Sequential

Changed from `Promise.all()` (parallel) to sequential `for...of` loop to:
- Reduce memory usage
- Avoid overwhelming Cloudinary API
- Better error tracking
- Prevent timeout issues

### 3. ✅ Added Detailed Logging

Added timing logs to track:
- Total registration time
- Individual file upload time
- File sizes
- Error details

---

## 🚀 Deployment Steps

### Option A: Upgrade to Vercel Pro (Recommended)

If you need the 60-second timeout:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your account/team name
3. Go to **Settings** → **Billing**
4. Upgrade to **Pro Plan** ($20/month)
5. Redeploy backend

### Option B: Stay on Free Tier (Optimize Further)

If you want to stay on the free tier, we need to optimize more:

#### Step 1: Reduce File Upload Time

Update `server/middleware/upload.js` to reduce file size limit:

```javascript
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Reduce from 5MB to 2MB
  },
  fileFilter: fileFilter
});
```

#### Step 2: Add Image Compression

Install sharp for image compression:

```bash
cd server
npm install sharp
```

Update `server/config/cloudinary.js` to compress before upload:

```javascript
const sharp = require('sharp');

const uploadToCloudinary = async (fileBuffer, fileName, subfolder = 'registrations', options = {}) => {
  // Compress image if it's too large
  let processedBuffer = fileBuffer;
  
  if (fileBuffer.length > 500000) { // If > 500KB
    try {
      processedBuffer = await sharp(fileBuffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
      console.log(`🗜️ Compressed image from ${(fileBuffer.length/1024).toFixed(1)}KB to ${(processedBuffer.length/1024).toFixed(1)}KB`);
    } catch (err) {
      console.log('⚠️ Compression failed, using original:', err.message);
      processedBuffer = fileBuffer;
    }
  }
  
  return new Promise((resolve, reject) => {
    // ... rest of the code
  });
};
```

---

## 🔧 Immediate Actions Required

### 1. Update Environment Variables on Vercel

```bash
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,https://techstorm.bppimt.ac.in
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGODB_URI=mongodb+srv://AnikPaul:AnikPaul123@cluster0.gvubzsp.mongodb.net/techstorm
NODE_ENV=production
```

### 2. Commit and Push Changes

```bash
git add .
git commit -m "Fix: Vercel timeout issues - sequential uploads + better logging"
git push origin main
```

### 3. Redeploy Backend on Vercel

```bash
cd server
vercel --prod
```

Or from Vercel Dashboard:
1. Go to **Deployments**
2. Click **Redeploy** on latest deployment

---

## 🧪 Testing After Deployment

### Test 1: Check Vercel Logs

1. Go to Vercel Dashboard → Backend Project
2. Click on latest deployment
3. Go to **Functions** tab
4. Click on `server.js` function
5. Watch logs in real-time

### Test 2: Try Registration

1. Go to https://techstorm.bppimt.ac.in
2. Try to register for Technomania
3. Upload participant ID proofs
4. Submit form
5. Check browser console for errors

### Test 3: Check Timing

Look for these logs in Vercel:
```
⏱️ Registration started at: ...
📁 Processing uploaded files...
📄 Processing file: participants[0].idFile ...
✅ Participant 0 ID uploaded: ... (2500ms)
✅ All files processed successfully in 5000ms
⏱️ Registration completed in 7500ms
```

If total time > 10 seconds on free tier, you'll still get timeout errors.

---

## 📊 Expected Performance

### With Sequential Uploads (Current)

- **1 participant with ID**: ~2-3 seconds
- **2 participants with IDs**: ~4-6 seconds
- **3 participants with IDs**: ~6-9 seconds
- **4 participants with IDs**: ~8-12 seconds ⚠️ (might timeout on free tier)
- **5 participants with IDs**: ~10-15 seconds ⚠️ (will timeout on free tier)

### With Parallel Uploads (Previous)

- All uploads happen simultaneously
- Faster but uses more memory
- More likely to hit Cloudinary rate limits
- Can cause timeout on Vercel

---

## 🎯 Recommendations

### Short Term (Immediate)

1. ✅ Deploy the sequential upload fix
2. ✅ Update environment variables
3. ✅ Monitor Vercel logs
4. ⚠️ Warn users about upload time

### Medium Term (This Week)

1. Add image compression with Sharp
2. Reduce file size limits to 2MB
3. Add progress indicator on frontend
4. Add retry logic for failed uploads

### Long Term (Next Month)

1. Consider upgrading to Vercel Pro ($20/month)
2. Or migrate to a different hosting solution:
   - Railway.app (free tier with 500 hours/month)
   - Render.com (free tier with no timeout)
   - AWS Lambda (pay per use, 15-minute timeout)
   - DigitalOcean App Platform ($5/month)

---

## 🆘 If Still Getting Errors

### Error: "FUNCTION_INVOCATION_FAILED"

**Cause**: Function exceeded 10-second timeout

**Solutions**:
1. Upgrade to Vercel Pro
2. Implement image compression
3. Reduce file size limits
4. Migrate to different hosting

### Error: "CORS blocked"

**Cause**: Environment variables not set

**Solution**:
1. Check `CORS_ORIGINS` is set on Vercel
2. Redeploy after setting env vars
3. Clear browser cache

### Error: "Cloudinary upload failed"

**Cause**: Cloudinary credentials wrong or rate limit hit

**Solution**:
1. Verify Cloudinary credentials in Vercel env vars
2. Check Cloudinary dashboard for usage limits
3. Wait a few minutes and try again

---

## 📞 Support

If issues persist after deployment:

1. **Check Vercel Logs**: Dashboard → Deployments → Functions → server.js
2. **Check Browser Console**: F12 → Console tab
3. **Check MongoDB**: Verify data is being saved
4. **Check Cloudinary**: Verify files are being uploaded

---

## ✨ Summary

**Changes Made**:
- ✅ Sequential file uploads (instead of parallel)
- ✅ Increased timeout to 60 seconds (requires Pro plan)
- ✅ Increased memory to 1024MB
- ✅ Added detailed timing logs
- ✅ Better error logging

**Next Steps**:
1. Update Vercel environment variables
2. Commit and push changes
3. Redeploy backend
4. Test registration with file uploads
5. Monitor Vercel logs

**If on Free Tier**:
- Expect timeouts with 4+ participants
- Consider adding image compression
- Or upgrade to Pro plan

**You're ready to deploy! 🚀**
