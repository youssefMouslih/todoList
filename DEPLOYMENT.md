# Deployment Guide

## Prerequisites
1. Create accounts on:
   - [Heroku](https://signup.heroku.com) for backend deployment
   - [Netlify](https://app.netlify.com/signup) for frontend deployment
2. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Install [Git](https://git-scm.com/downloads) if not already installed

## Backend Deployment (Heroku)

1. Login to Heroku:
   ```bash
   heroku login
   ```

2. Create a new Heroku app:
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. Set environment variables on Heroku:
   ```bash
   # Set required environment variables
   heroku config:set PORT=3001
   heroku config:set CORS_ORIGIN=https://your-frontend-netlify-url.netlify.app
   heroku config:set NODE_ENV=production

   # Optional: Set security-related variables
   heroku config:set RATE_LIMIT_WINDOW_MS=900000
   heroku config:set RATE_LIMIT_MAX_REQUESTS=100
   ```

   Note: Adjust rate limiting values based on your application's needs. These settings limit each IP to 100 requests per 15 minutes.

4. Deploy to Heroku:
   ```bash
   git subtree push --prefix backend heroku main
   ```

5. Get your backend URL:
   ```bash
   heroku open
   ```
   Note down the URL (e.g., https://your-app-name.herokuapp.com)

## Frontend Deployment (Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy using Netlify CLI or Netlify Dashboard:

   **Option 1: Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

   **Option 2: Netlify Dashboard**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

3. Configure environment variables in Netlify:
   - Go to Site settings > Build & deploy > Environment
   - Add environment variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-app-name.herokuapp.com/api` (use your Heroku app URL)

4. Trigger a new deployment:
   - Go to Deploys
   - Click "Trigger deploy"

## Verify Deployment

1. Open your Netlify URL
2. Try adding and managing tasks
3. Check browser console for any API connection errors
4. Monitor Heroku logs:
   ```bash
   heroku logs --tail
   ```

## Troubleshooting

1. If frontend can't connect to backend:
   - Verify CORS_ORIGIN in backend matches your Netlify URL
   - Check REACT_APP_API_URL in Netlify environment variables
   - Ensure backend API is running

2. If backend deployment fails:
   - Check Heroku logs: `heroku logs --tail`
   - Verify all environment variables are set
   - Ensure Procfile is properly configured

3. If frontend deployment fails:
   - Check Netlify deploy logs
   - Verify build command and publish directory
   - Ensure all dependencies are listed in package.json