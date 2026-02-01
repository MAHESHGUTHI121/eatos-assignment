# Vercel Deployment Guide

I have prepared the codebase for a seamless deployment to Vercel. Follow these steps to put your Restaurant Admin Dashboard online.

## 1. Preparation
Ensure you have a MongoDB Atlas database ready. You will need the connection string.

## 2. Deploy Steps
1. Push this code to a **GitHub repository**.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. **Configure Project Settings**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`
5. **Set Environment Variables**:
   Add the following in the Vercel Dashboard:
   - `MONGODB_URI`: *Your MongoDB connection string*
   - `VITE_API_URL`: `/api`
   - `NODE_ENV`: `production`

6. Click **Deploy**.

## 3. Post-Deployment
- Your frontend will be served at your Vercel URL.
- All requests to `/api/*` will be handled by the Express backend running as Vercel Serverless Functions.

## 4. Troubleshooting
- If the menu is empty, ensure your `MONGODB_URI` is correct and accessible from Vercel (White-list `0.0.0.0/0` in MongoDB Atlas).
- To seed the data on the production database, you can run `node backend/seed.js` locally after setting the production `MONGODB_URI` in your `.env` file temporarily.
