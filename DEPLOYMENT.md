# Deployment Guide - Production Ready

Complete guide to deploy your AI Content Automation Platform to production.

## Pre-Deployment Checklist

### Backend ✅

- [ ] All environment variables set in `.env`
- [ ] Tested all API endpoints locally
- [ ] No console errors or warnings
- [ ] Database connection working
- [ ] Gemini API key valid and functional
- [ ] Added error handling to all endpoints
- [ ] JWT_SECRET is strong and random
- [ ] NODE_ENV set to `production` for deployment

### Frontend ✅

- [ ] All pages render without errors
- [ ] API calls work correctly
- [ ] No broken links
- [ ] Responsive design tested on mobile
- [ ] Build completes successfully: `npm run build`
- [ ] No console errors
- [ ] All environment variables configured

## Deploying Backend

### Option A: Deploy to Render

**Best for:** Beginners, free tier available

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New Web Service"
   - Connect your GitHub repo
   - Select the backend folder

3. **Configure Environment**
   - Set environment variables:
     ```
     MONGODB_URI=your_mongodb_connection
     JWT_SECRET=your_secret_key
     GEMINI_API_KEY=your_api_key
     PORT=5000
     NODE_ENV=production
     ```

4. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

5. **Deploy**
   - Render auto-deploys on push
   - Backend URL: `https://your-app.onrender.com`

### Option B: Deploy to Railway

**Best for:** Modern deployment, free tier available

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repo

3. **Add Environment Variables**
   - Go to "Variables"
   - Add all variables from `.env`

4. **Configure Start Command**
   - In `package.json` ensure `start` script exists
   - Railway auto-detects Node apps

5. **Deploy**
   - Railway auto-deploys
   - Get your domain from deployment page

### Option C: Deploy to Heroku

**Note:** Heroku free tier ended, but process is similar for paid plans

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name-backend

# Set environment variables
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set GEMINI_API_KEY=your_key

# Deploy
git push heroku main
```

## Deploying Frontend

### Option A: Deploy to Vercel

**Best for:** React apps, optimized deployment

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repo
   - Choose `frontend` folder as root

3. **Set Environment Variables**

   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com/api
   ```

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Deploy**
   - Vercel auto-deploys on push
   - Get your frontend URL

6. **Update Backend CORS**
   - Add frontend URL to backend CORS in `server.js`

### Option B: Deploy to Netlify

**Best for:** Simple deployment, great integrations

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Connect Site**
   - Click "New site from Git"
   - Select your GitHub repo
   - Choose `frontend` folder

3. **Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Environment Variables**
   - Click "Site settings" → "Build & deploy"
   - Add env variables

5. **Deploy**
   - Netlify auto-deploys
   - Get your frontend URL

### Option C: Deploy to GitHub Pages

**Best for:** Free, no backend services

1. **Update `vite.config.js`**

   ```javascript
   export default {
     plugins: [react()],
     base: "/your-repo-name/",
   };
   ```

2. **Build**

   ```bash
   npm run build
   ```

3. **Deploy to `gh-pages` branch**
   ```bash
   npm install --save-dev gh-pages
   # Add to package.json scripts:
   "deploy": "gh-pages -d dist"
   npm run deploy
   ```

## Connecting Frontend to Backend

After deploying both, update frontend API URL:

**File:** `frontend/src/services/api.js`

```javascript
const API_BASE_URL =
  process.env.VITE_API_BASE_URL || "https://your-backend-url/api";
```

Then set environment variable in frontend deployment settings.

## Database in Production

### Using MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to https://mongodb.com/cloud/atlas
   - Sign up

2. **Create Cluster**
   - Click "Build a Cluster"
   - Choose free tier
   - Select region closest to you
   - Click "Create Cluster"

3. **Get Connection String**
   - Click "Connect"
   - Choose "Application"
   - Copy connection string
   - Replace `<password>` with your password

4. **Use in Backend**
   - Add to `.env`: `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db-name`

5. **Whitelist IP**
   - Go to "Network Access"
   - Add your server's IP or allow `0.0.0.0/0`

## Securing Production

### Essential Security Steps

1. **Change JWT Secret**

   ```bash
   # Generate secure secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Enable HTTPS**
   - Most platforms enable automatically
   - Verify certificate is valid

3. **Set Strong Passwords**
   - MongoDB password
   - All API keys
   - Never commit secrets

4. **Keep Dependencies Updated**

   ```bash
   npm audit
   npm audit fix
   npm update
   ```

5. **Add Rate Limiting** (optional)

   ```bash
   npm install express-rate-limit
   ```

   **File:** `backend/server.js`

   ```javascript
   import rateLimit from "express-rate-limit";

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
   });

   app.use(limiter);
   ```

## Monitoring & Logs

### Render Logs

- Dashboard → Logs tab
- Shows real-time logs
- Search for errors

### Railway Logs

- Deployments page
- View live or historical logs

### Frontend Errors (Sentry)

Add error tracking:

```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

## Scaling for More Users

### Current Limits

- Free tier handles ~100 concurrent users
- MongoDB free tier: 512MB storage

### Upgrade When Needed

1. **Upgrade MongoDB**
   - MongoDB Atlas → Change tier
   - More storage and performance

2. **Upgrade Server**
   - Render/Railway → Increase RAM/CPU
   - Vertical scaling for more capacity

3. **Add Caching**

   ```bash
   npm install redis
   ```

4. **Database Optimization**
   - Add indexes on frequently queried fields
   - Archive old data
   - Implement pagination

## Troubleshooting Production Issues

### Backend Not Responding

1. Check logs on deployment platform
2. Verify all env variables set
3. Test API manually: `https://backend-url/api/health`
4. Check database connection
5. Verify API keys are valid

### Frontend Not Connecting to Backend

1. Check CORS settings in backend
2. Verify backend URL in frontend config
3. Check network tab (DevTools → Network)
4. Ensure frontend URL is CORS-enabled in backend

### Database Connection Failed

1. Check connection string
2. Verify IP whitelist on MongoDB Atlas
3. Confirm password doesn't have special characters (URL encode if needed)
4. Check if cluster is active

### Gemini API Not Working

1. Verify API key is correct
2. Check API quota on Google Cloud
3. Test API in isolation
4. Check rate limits

## Monitoring Performance

### Key Metrics to Track

- Response times
- Error rates
- Database query times
- Uptime %
- Active users

### Tools

- **Render Analytics** (built-in)
- **New Relic** (advanced monitoring)
- **Datadog** (comprehensive)
- **Google Analytics** (frontend usage)

## Backup Strategy

### Database

- MongoDB Atlas auto-backups daily
- Export monthly backup locally:
  ```bash
  mongoexport --uri="your_connection_string" --out backup.json
  ```

### Code

- GitHub is your backup
- Keep main branch clean
- Tag releases: `git tag -a v1.0.0 -m "Release 1.0"`

## Rollback Plan

If something breaks:

```bash
# Revert to previous commit
git revert <commit-hash>
git push

# Or revert a file
git checkout <commit-hash> -- <file>
git commit -m "Revert to working version"
git push
```

## Performance Optimization

### Backend

- Add caching headers
- Compress responses with gzip
- Implement response pagination
- Optimize database queries

### Frontend

- Enable code splitting
- Lazy load routes
- Optimize images
- Minify CSS/JS (Vite does this)

## Cost Breakdown (Estimated Monthly)

| Service          | Free Tier   | Paid (Starting) |
| ---------------- | ----------- | --------------- |
| Backend Server   | $0 (Render) | $7-50           |
| Frontend Hosting | $0 (Vercel) | $20+            |
| Database         | $0 (512MB)  | $6-100          |
| Domain Name      | -           | $12             |
| **Total**        | **$0-12**   | **$40-200**     |

## Custom Domain Setup

### Add Custom Domain

1. **Buy Domain**
   - GoDaddy, Namecheap, etc.

2. **Setup Frontend Domain**
   - Vercel: Add domain in project settings
   - Netlify: Add domain in site settings

3. **Setup Backend Domain** (optional)
   - Create subdomain (api.yourdomain.com)
   - Point to your backend server

4. **Configure DNS**
   - Follow your deployment platform's instructions
   - Usually requires adding CNAME or A records

## Final Checklist Before Going Live

- [ ] Remove console.log statements
- [ ] Test all features one more time
- [ ] Database backups automated
- [ ] Error tracking setup
- [ ] Monitoring enabled
- [ ] HTTPS enabled
- [ ] All env variables configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Documentation updated
- [ ] Team knows deployment process
- [ ] Rollback plan documented

## Post-Deployment

1. **Monitor First 24 Hours**
   - Watch error rates
   - Check performance
   - Test critical paths

2. **Gather Feedback**
   - User experience
   - Performance issues
   - Feature requests

3. **Plan Updates**
   - Bug fixes
   - Performance improvements
   - New features

## Getting Help

- Deployment Platform Docs
  - Render: https://render.com/docs
  - Vercel: https://vercel.com/docs
  - Netlify: https://docs.netlify.com

- Database
  - MongoDB: https://docs.mongodb.com

- General
  - Stack Overflow
  - GitHub Discussions
  - Community forums

Congratulations on deploying your app! 🎉🚀
