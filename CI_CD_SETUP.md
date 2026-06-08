# CI/CD Pipeline Setup Guide

## Overview

This project uses **GitHub Actions** to automate testing and deployment:

- **Backend**: Automatically deploys to Render on push to main
- **Frontend**: Automatically deploys to Vercel on push to main
- **Root CI**: Validates workflows and checks for exposed secrets

## GitHub Secrets Configuration

### Step 1: Get Your Deployment Credentials

#### For Backend (Render)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Select your SecureVault backend service
3. Go to **Settings** → **Deploy Hook**
4. Copy the deploy hook URL

#### For Frontend (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** → **Tokens**
3. Create a new token and copy it
4. Go to your project settings and get:
   - **VERCEL_ORG_ID**: Settings → Org Settings → Team ID
   - **VERCEL_PROJECT_ID**: From project URL or Settings

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and Variables** → **Actions**
3. Click **New repository secret** and add:

#### Backend Deployment
```
Name: RENDER_DEPLOY_HOOK
Value: [Your Render deploy hook URL]
```

#### Frontend Deployment
```
Name: VERCEL_TOKEN
Value: [Your Vercel token]

Name: VERCEL_ORG_ID
Value: [Your Vercel Organization ID]

Name: VERCEL_PROJECT_ID
Value: [Your Vercel Project ID]
```

## Workflow Files

### 1. Backend Workflow (`.github/workflows/backend-deploy.yml`)

**Triggers on:**
- Push to `main` branch (changes in `backend/` folder)
- Pull requests to `main` branch

**Steps:**
1. Checkout code
2. Setup Node.js 20.x
3. Install dependencies
4. Verify build
5. Deploy to Render (only on push to main)

### 2. Frontend Workflow (`.github/workflows/frontend-deploy.yml`)

**Triggers on:**
- Push to `main` branch (changes in `frontend/` folder)
- Pull requests to `main` branch

**Steps:**
1. Checkout code
2. Setup Node.js 20.x
3. Install dependencies
4. Build with Vite
5. Deploy to Vercel (only on push to main)

### 3. Root CI Workflow (`.github/workflows/root-ci.yml`)

**Triggers on:**
- Push to `main` branch
- Pull requests to `main` branch

**Steps:**
1. Checkout code
2. Check for exposed secrets (TruffleHog)
3. Validate workflow files

## Environment Variables in CI/CD

### Backend
- `PORT`: Automatically set in Render dashboard
- `JWT_SECRET`: Set in Render environment variables
- `ENCRYPTION_KEY_BASE64`: Set in Render environment variables

### Frontend
- `VITE_API_URL`: Set to `https://securevault-yahm.onrender.com` in workflow
- Can be overridden in Vercel project settings if needed

## Deployment Flow

```
┌─────────────────────────────────────────────────────┐
│  Developer pushes code to main branch               │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
   ┌─────────────┐          ┌──────────────┐
   │ Root CI     │          │ Path filter  │
   │ (secrets)   │          │              │
   └────┬────────┘          └──────┬───────┘
        │                          │
        ▼                ┌─────────┴─────────┐
   ✅ Pass              │                   │
                        ▼                   ▼
                   ┌──────────┐        ┌──────────┐
                   │ Backend  │        │ Frontend │
                   │ Build &  │        │ Build &  │
                   │ Deploy   │        │ Deploy   │
                   └─────┬────┘        └────┬─────┘
                         │                  │
                         ▼                  ▼
                  🚀 Deploy to Render  🚀 Deploy to Vercel
```

## Monitoring Deployments

1. **GitHub**: Click on **Actions** tab in your repository to see workflow runs
2. **Render**: Dashboard shows deployment status in real-time
3. **Vercel**: Dashboard shows deployment status and logs

## Troubleshooting

### Deployment Not Triggering

- Check that files are in the correct paths (`backend/` or `frontend/`)
- Verify workflow files are in `.github/workflows/`
- Check that you're pushing to the `main` branch

### Build Failures

- Check the **Actions** tab for detailed error logs
- Verify all dependencies are in `package.json`
- Ensure environment variables are set correctly

### Secret-Related Issues

- Verify secret names match exactly in workflow files
- Check that secret values are correctly copied (no extra spaces)
- Secret names are case-sensitive

## Next Steps

### 1. Add Testing
Add a testing framework to your workflows:

```bash
# Backend
npm install --save-dev jest

# Frontend
npm install --save-dev vitest
```

Update workflows to run tests before deployment.

### 2. Add Code Quality Checks

```bash
npm install --save-dev eslint
```

### 3. Add Manual Approval Steps

For production deployments, add approval requirements in GitHub.

## Example: Manual Trigger

To manually trigger a deployment:

1. Go to **Actions** tab
2. Select the workflow
3. Click **Run workflow** → **Run workflow**

## Documentation

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Deploy Webhooks](https://render.com/docs/deploy-hooks)
- [Vercel API Reference](https://vercel.com/docs/rest-api)

---

**Last Updated**: 2026-06-08
