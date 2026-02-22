# Backend Deployment Instructions

## CORS Configuration for Production

The backend has been configured to allow CORS requests from the production domain. Here's what you need to do:

### 1. Environment Variables on Vercel

Make sure the following environment variables are set in your Vercel backend deployment:

```
CORS_ORIGINS=https://techstorm.bppimt.ac.in,http://localhost:3000
FRONTEND_URL=https://techstorm.bppimt.ac.in
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
```

### 2. Deploy the Backend

After updating the code, redeploy your backend to Vercel:

```bash
cd server
vercel --prod
```

### 3. Verify CORS Headers

After deployment, you can verify CORS is working by checking the response headers:

```bash
curl -I -X OPTIONS https://techstormbackend.vercel.app/api/event-registration/FIFA%20Mobile \
  -H "Origin: https://techstorm.bppimt.ac.in" \
  -H "Access-Control-Request-Method: POST"
```

You should see these headers in the response:
- `Access-Control-Allow-Origin: https://techstorm.bppimt.ac.in`
- `Access-Control-Allow-Methods: GET,OPTIONS,PATCH,DELETE,POST,PUT`
- `Access-Control-Allow-Credentials: true`

## Changes Made

1. **vercel.json**: Added CORS headers configuration for Vercel deployment
2. **server.js**: Updated CORS logic to allow:
   - All requests from domains containing 'bppimt.ac.in' or 'techstorm'
   - All requests in development mode
   - Requests from explicitly allowed origins in CORS_ORIGINS env variable

## Troubleshooting

If CORS issues persist:

1. Check Vercel deployment logs for any errors
2. Verify environment variables are set correctly in Vercel dashboard
3. Clear browser cache and try again
4. Check if the backend URL is correct in the frontend API configuration
