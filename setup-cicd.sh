#!/bin/bash

# SecureVault CI/CD Quick Setup Script
# This script helps you set up GitHub Actions secrets

echo "🚀 SecureVault CI/CD Setup"
echo "================================"
echo ""
echo "This script will help you configure GitHub secrets for CI/CD."
echo ""
echo "Before running this script, make sure you have:"
echo "1. A GitHub repository with this code"
echo "2. A Render account with backend service"
echo "3. A Vercel account with frontend project"
echo ""
echo "📋 Follow these steps:"
echo ""
echo "STEP 1: Backend Deployment (Render)"
echo "-----------------------------------"
echo "1. Go to: https://dashboard.render.com/"
echo "2. Select your SecureVault backend service"
echo "3. Go to Settings → Deploy Hook"
echo "4. Copy the deploy hook URL"
echo ""
read -p "Enter your Render Deploy Hook URL: " RENDER_HOOK
echo ""

echo "STEP 2: Frontend Deployment (Vercel)"
echo "------------------------------------"
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Go to Settings → Tokens"
echo "3. Create a new token"
echo ""
read -p "Enter your Vercel Token: " VERCEL_TOKEN
echo ""

echo "3. Go to Dashboard → Settings → General"
echo ""
read -p "Enter your Vercel Organization ID: " VERCEL_ORG_ID
echo ""

echo "4. Go to your project → Settings → Project ID"
echo ""
read -p "Enter your Vercel Project ID: " VERCEL_PROJECT_ID
echo ""

echo "📝 GitHub Secrets to Add:"
echo "========================"
echo ""
echo "Go to your GitHub repository:"
echo "Settings → Secrets and Variables → Actions → New repository secret"
echo ""
echo "Add these secrets:"
echo ""
echo "1. RENDER_DEPLOY_HOOK"
echo "   Value: $RENDER_HOOK"
echo ""
echo "2. VERCEL_TOKEN"
echo "   Value: $VERCEL_TOKEN"
echo ""
echo "3. VERCEL_ORG_ID"
echo "   Value: $VERCEL_ORG_ID"
echo ""
echo "4. VERCEL_PROJECT_ID"
echo "   Value: $VERCEL_PROJECT_ID"
echo ""
echo "✅ Once you've added all secrets, push your code to GitHub!"
echo "   Your workflows will automatically run and deploy."
