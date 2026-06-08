# SecureVault - Setup and Deployment Guide

## Environment Configuration

This project is configured to work in both **local development** and **production** environments.

### Frontend Configuration

#### Local Development
```bash
# File: frontend/.env.local
VITE_API_URL=http://localhost:4000
```

#### Production (Vercel)
```bash
# File: frontend/.env.production
VITE_API_URL=https://securevault-yahm.onrender.com
```

**Vercel Environment Variables:**
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add the following:
   - `VITE_API_URL = https://securevault-yahm.onrender.com`

### Backend Configuration

#### Local Development
```bash
# File: backend/.env
PORT=4000
JWT_SECRET=change_this_to_a_strong_secret
ENCRYPTION_KEY_BASE64=xWl+fmH3sHbttV9BM0OymgmKBS14OUbVqItGCAzhNSs=
```

#### Production (Render)
Set these environment variables in your Render dashboard:
- `PORT=4000`
- `JWT_SECRET=your_strong_secret_key_here`
- `ENCRYPTION_KEY_BASE64=your_base64_encoded_key_here`

## Running Locally

### Prerequisites
- Node.js (v20.x or higher)
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:4000
```

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (local Vite dev server)
- `http://localhost:3000` (alternative local port)
- `https://securevault-weld.vercel.app` (production frontend)

If you're using a different domain, update the `corsOptions.allowedOrigins` array in [backend/src/app.js](backend/src/app.js).

## Deployment

### Deploy Backend to Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables (see Backend Configuration above)

### Deploy Frontend to Vercel

1. Connect your GitHub repository to Vercel
2. Framework: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Environment Variables:
   - `VITE_API_URL=https://securevault-yahm.onrender.com`

## Troubleshooting

### CORS Errors
If you see CORS errors:
1. Check that `VITE_API_URL` is correctly set in frontend environment
2. Verify the frontend URL is in the allowed origins on backend
3. Ensure the backend is running on the correct port

### Authentication Issues
- Verify `JWT_SECRET` matches between requests
- Check token is being stored in browser (check localStorage in DevTools)
- Ensure `ENCRYPTION_KEY_BASE64` is valid and matches between environments

## Environment Variables Summary

| Variable | Backend | Frontend | Purpose |
|----------|---------|----------|---------|
| `JWT_SECRET` | ✓ | - | Token signing key |
| `ENCRYPTION_KEY_BASE64` | ✓ | - | Note encryption key |
| `PORT` | ✓ | - | Server port |
| `VITE_API_URL` | - | ✓ | API endpoint URL |

For any issues, check the console logs and error messages from both frontend and backend.
