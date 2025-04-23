# Todo List Application Deployment Guide

This guide documents the actual deployment process we followed for the Todo List application, including challenges faced and their solutions.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Deployment (Heroku)](#backend-deployment-heroku)
- [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
- [Troubleshooting](#troubleshooting)
- [Maintenance and Updates](#maintenance-and-updates)

## Prerequisites

1. **Accounts Required:**
   - [Heroku](https://signup.heroku.com) account for backend deployment
   - [Netlify](https://app.netlify.com/signup) account for frontend deployment

2. **Required Tools:**
   - [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
   - [Git](https://git-scm.com/downloads)
   - [Node.js](https://nodejs.org/) (version compatible with your project)
   - [npm](https://www.npmjs.com/) (comes with Node.js)

## Backend Deployment (Heroku)

### Step 1: Login to Heroku
```bash
heroku login
```
This will open a browser window for authentication.

### Step 2: Navigate to the Project Root Directory
```bash
cd /path/to/todoList
```

### Step 3: Create a New Heroku App
```bash
cd backend
heroku create
```

We received the following output:
```
Creating app... done, ⬢ shielded-caverns-84788
https://shielded-caverns-84788-7f4ec210a2ee.herokuapp.com/ | https://git.heroku.com/shielded-caverns-84788.git
```

### Step 4: Set Environment Variables
```bash
heroku config:set PORT=3001 CORS_ORIGIN=http://localhost:3000 -a shielded-caverns-84788
```

### Step 5: Add Heroku Remote to Git
```bash
git remote add heroku https://git.heroku.com/shielded-caverns-84788.git
```

### Step 6: Set Buildpack (if not automatically detected)
```bash
heroku buildpacks:set heroku/nodejs -a shielded-caverns-84788
```

### Step 7: Deploy Backend Using Git Subtree
Since our project is a monorepo with both frontend and backend in the same repository, we need to use git subtree to deploy only the backend folder:

```bash
git subtree push --prefix backend heroku main
```

### Step 8: Update CORS Settings for Production
After deploying the frontend to Netlify, update the CORS settings to allow requests from your Netlify domain:

```bash
heroku config:set CORS_ORIGIN=https://glowing-cendol-2ed464.netlify.app -a shielded-caverns-84788
```

## Frontend Deployment (Netlify)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build the Frontend
```bash
cd frontend
npm run build
```

### Step 3: Deploy to Netlify
```bash
netlify deploy --prod
```

If this is your first time, you'll be prompted to create a new site:
```
This folder isn't linked to a site yet
? What would you like to do? Create & configure a new site
? Team: [Select your team]
? Site name (leave blank for a random name): [Optional custom name]
```

### Step 4: Specify the Publish Directory
When prompted for the publish directory, specify the build folder:
```
? Publish directory: frontend/build
```

### Step 5: Update Environment Variables
Create or update `.env.production` in the frontend directory with the Heroku backend URL:
```
REACT_APP_API_URL=https://shielded-caverns-84788-7f4ec210a2ee.herokuapp.com/api
```

### Step 6: Rebuild and Redeploy
```bash
cd frontend
npm run build
netlify deploy --prod --dir=frontend/build
```

## Troubleshooting

### Common Backend Deployment Issues

1. **Buildpack Detection Failure**
   - **Issue**: Heroku fails to detect the Node.js buildpack
   - **Solution**: Manually set the buildpack using `heroku buildpacks:set heroku/nodejs`

2. **Git Subtree Push Errors**
   - **Issue**: Error when pushing to Heroku with git subtree
   - **Solution**: Ensure you're in the root directory of the project and use the correct prefix path

3. **Environment Variable Issues**
   - **Issue**: Backend can't access environment variables
   - **Solution**: Verify variables are set correctly with `heroku config`

### Common Frontend Deployment Issues

1. **Build Errors**
   - **Issue**: Frontend build fails with dependency errors
   - **Solution**: Run `npm install` before building to ensure all dependencies are installed

2. **API Connection Issues**
   - **Issue**: Frontend can't connect to backend API
   - **Solution**: Verify the `REACT_APP_API_URL` is set correctly and CORS is configured properly on the backend

3. **Netlify Deploy Path Issues**
   - **Issue**: Netlify can't find the build directory
   - **Solution**: Ensure you're specifying the correct path with `--dir=frontend/build`

4. **Environment Variable Expansion Errors**
   - **Issue**: Build fails with "Maximum call stack size exceeded" in dotenv-expand
   - **Solution**: Check for circular references in your environment variables

## Maintenance and Updates

### Updating the Backend

1. Make changes to your backend code
2. Commit changes to git
3. Deploy the updated backend:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Updating the Frontend

1. Make changes to your frontend code
2. Commit changes to git
3. Rebuild the frontend:
   ```bash
   cd frontend
   npm run build
   ```
4. Deploy the updated frontend:
   ```bash
   netlify deploy --prod --dir=frontend/build
   ```

### Monitoring

1. **Backend Logs**
   ```bash
   heroku logs --tail -a shielded-caverns-84788
   ```

2. **Frontend Deployment Status**
   - Visit the Netlify dashboard at https://app.netlify.com/sites/glowing-cendol-2ed464

---

## Quick Reference

### Backend (Heroku)
- URL: https://shielded-caverns-84788-7f4ec210a2ee.herokuapp.com/
- Dashboard: https://dashboard.heroku.com/apps/shielded-caverns-84788

### Frontend (Netlify)
- URL: https://glowing-cendol-2ed464.netlify.app
- Dashboard: https://app.netlify.com/sites/glowing-cendol-2ed464