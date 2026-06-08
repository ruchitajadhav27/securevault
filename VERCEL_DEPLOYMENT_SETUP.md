# Vercel Deployment Setup for GitHub Actions

## Getting Vercel Credentials

### Step 1: Get Vercel Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your **Profile** (bottom left)
3. Select **Settings**
4. Go to **Tokens**
5. Click **Create** to create a new token
6. Name it: `GitHub Actions` (or whatever you prefer)
7. Copy the token

### Step 2: Get Organization ID

1. In Vercel Dashboard, click **Settings** (top menu)
2. Go to **General** → **Team ID**
3. Copy your team/org ID (also called Team ID in Vercel)

### Step 3: Get Project ID

1. In Vercel Dashboard, go to your **securevault-frontend** project
2. Click **Settings**
3. Look for **Project ID** (shown as a long alphanumeric string)
4. Copy it

Or get it from the project URL:
- Project URL: `https://vercel.com/username/securevault-frontend`
- Go to the project and check the URL bar

### Step 4: Add to GitHub Secrets

1. Go to your GitHub repository
2. Settings → **Secrets and Variables** → **Actions**
3. Add three secrets:

```
VERCEL_TOKEN: [Your token]
VERCEL_ORG_ID: [Your organization ID]
VERCEL_PROJECT_ID: [Your project ID]
```

## Vercel Environment Variables

Make sure your Vercel project has this environment variable set:

1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Add:
   - Name: `VITE_API_URL`
   - Value: `https://securevault-yahm.onrender.com`
   - Select: **Production**, **Preview**, **Development**
4. Click **Add**

## Testing Deployment

To manually test a Vercel deployment:

1. Push your changes to GitHub `main` branch
2. Go to your GitHub Actions tab and watch the workflow run
3. Or manually trigger from Actions → Frontend CI/CD → Run workflow

## Troubleshooting

### Build Failed
- Check that `npm run build` works locally
- Verify all environment variables are set
- Check for TypeScript/build errors

### Deployment Failed
- Verify Vercel secrets are correct
- Check Vercel project settings
- Review deployment logs in Vercel dashboard

### No Deployment Trigger
- Ensure changes are in `frontend/` folder
- Check that you're pushing to `main` branch
- Verify workflow file is in `.github/workflows/`
