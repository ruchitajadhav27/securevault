# Render Deploy Hook Setup

## Getting Your Render Deploy Hook

### Step-by-Step Guide

1. **Go to Render Dashboard**
   - Visit [https://dashboard.render.com/](https://dashboard.render.com/)

2. **Select Your Backend Service**
   - Click on your SecureVault backend service

3. **Access Settings**
   - Navigate to **Settings** in the left sidebar

4. **Find Deploy Hook**
   - Scroll to **Deploy Hook** section
   - You'll see a URL that looks like:
     ```
     https://api.render.com/deploy/srv-xxxxxxxxxxxxx?key=xxxxxxxxxxxxxxxxxxxxxxxx
     ```

5. **Copy the URL**
   - Click the copy button or select and copy the entire URL

6. **Add to GitHub Secrets**
   - Go to your GitHub repository
   - Settings → Secrets and Variables → Actions
   - Click **New repository secret**
   - Name: `RENDER_DEPLOY_HOOK`
   - Value: [Paste the URL]
   - Click **Add secret**

## Testing the Deploy Hook

You can test the hook manually from your terminal:

```bash
curl "https://api.render.com/deploy/srv-xxxxxxxxxxxxx?key=xxxxxxxxxxxxxxxxxxxxxxxx"
```

Expected response: Service deployment will be triggered.

## Environment Variables in Render

Make sure these are set in your Render service:

1. Go to your service **Settings**
2. Scroll to **Environment**
3. Add:
   - `JWT_SECRET`: Your secret key
   - `ENCRYPTION_KEY_BASE64`: Your base64 encoded encryption key
   - `PORT`: 4000 (should be auto-set)

## Manual Deployment Trigger

If you need to manually trigger a deployment:

1. Go to your service settings
2. Click **Manual Deploy** button at the top

Or use the deploy hook URL in your terminal:

```bash
curl -X POST "https://api.render.com/deploy/srv-xxxxxxxxxxxxx?key=xxxxxxxxxxxxxxxxxxxxxxxx"
```
