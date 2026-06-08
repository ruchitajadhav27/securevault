# CI/CD Pipeline for SecureVault

Your project now has a complete **Continuous Integration / Continuous Deployment (CI/CD)** pipeline configured with GitHub Actions.

## 🎯 What's Included

### Automated Workflows

1. **Backend Deployment** ([`.github/workflows/backend-deploy.yml`](.github/workflows/backend-deploy.yml))
   - Runs on: Push to `main` (changes in `backend/`)
   - Actions: Build verification → Deploy to Render

2. **Frontend Deployment** ([`.github/workflows/frontend-deploy.yml`](.github/workflows/frontend-deploy.yml))
   - Runs on: Push to `main` (changes in `frontend/`)
   - Actions: Install → Build → Deploy to Vercel

3. **Security Checks** ([`.github/workflows/root-ci.yml`](.github/workflows/root-ci.yml))
   - Runs on: Every push and PR
   - Actions: Secret scanning with TruffleHog

## 🚀 Quick Start

### Step 1: Configure GitHub Secrets

You need to set up 4 GitHub secrets for automatic deployments:

1. **RENDER_DEPLOY_HOOK** - Deployment webhook for backend
2. **VERCEL_TOKEN** - Authentication token for Vercel
3. **VERCEL_ORG_ID** - Vercel organization ID
4. **VERCEL_PROJECT_ID** - Vercel project ID

📖 **Detailed setup guides:**
- [Render Deploy Hook Setup](RENDER_DEPLOY_SETUP.md)
- [Vercel Deployment Setup](VERCEL_DEPLOYMENT_SETUP.md)
- [Complete CI/CD Guide](CI_CD_SETUP.md)

### Step 2: Push Your Code

```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

### Step 3: Watch Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. Watch your workflows run
4. Workflows will automatically deploy to production on success

## 📊 Workflow Status

After each push, you can monitor:

- **GitHub Actions**: Repository → Actions tab
- **Render Dashboard**: Backend deployment status
- **Vercel Dashboard**: Frontend deployment status

## 🔄 Deployment Flow

```
Git Push to main
    ↓
GitHub Actions Triggered
    ↓
├─ Backend Changed?
│   ├─ ✓ Install dependencies
│   ├─ ✓ Verify build
│   └─ ✓ Deploy to Render
│
└─ Frontend Changed?
    ├─ ✓ Install dependencies
    ├─ ✓ Build with Vite
    └─ ✓ Deploy to Vercel
```

## 📝 Key Files

- `.github/workflows/backend-deploy.yml` - Backend CI/CD
- `.github/workflows/frontend-deploy.yml` - Frontend CI/CD
- `.github/workflows/root-ci.yml` - Security & validation checks
- `CI_CD_SETUP.md` - Complete setup guide
- `RENDER_DEPLOY_SETUP.md` - Render specific instructions
- `VERCEL_DEPLOYMENT_SETUP.md` - Vercel specific instructions

## 🛠 Advanced Features

### Manual Deployment Trigger

In GitHub Actions, you can manually trigger workflows without pushing code:

1. Go to **Actions** tab
2. Select desired workflow
3. Click **Run workflow**
4. Choose branch and click **Run workflow**

### Pull Request Checks

Workflows run on PRs to validate changes before merging:
- No automatic deployment on PRs
- Build verification only
- Helps catch errors early

### Environment Variables

- **Backend**: Set in Render dashboard
  - `JWT_SECRET`
  - `ENCRYPTION_KEY_BASE64`
  - `PORT`

- **Frontend**: Set in `.env.production`
  - `VITE_API_URL=https://securevault-yahm.onrender.com`

## 🐛 Troubleshooting

### Deployment Not Triggering?

- Check that workflow files exist in `.github/workflows/`
- Verify you're pushing to `main` branch
- Ensure file changes match path filters (e.g., changes in `backend/` for backend workflow)

### Build Failures?

- Check **Actions** → Workflow logs for errors
- Verify all dependencies are in `package.json`
- Test locally: `npm install && npm run build`

### Secrets Not Working?

- Verify exact secret names match workflow files
- No extra spaces when copying values
- Double-check URLs and tokens are complete

## 📚 Next Steps

1. **Add Testing**: Set up Jest/Vitest for automated testing
2. **Add Linting**: Integrate ESLint into workflows
3. **Add Code Coverage**: Track test coverage over time
4. **Add Approvals**: Require manual approval for production deployments

## 🔗 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Deploy Webhooks](https://render.com/docs/deploy-hooks)
- [Vercel CLI & API](https://vercel.com/docs/cli)

---

**Your CI/CD pipeline is now ready! 🎉**

Next: [Set up your GitHub secrets](CI_CD_SETUP.md)
