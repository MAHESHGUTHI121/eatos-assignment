# MongoDB Atlas Setup Guide

Since MongoDB is not installed locally, follow these steps to use MongoDB Atlas (free cloud database):

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new cluster (M0 Free tier)

## Step 2: Configure Database Access
1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Set privileges to "Read and write to any database"

## Step 3: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Confirm

## Step 4: Get Connection String
1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

## Step 5: Update Backend .env
Open `backend/.env` and replace the MONGODB_URI:

```
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/restaurant-dashboard?retryWrites=true&w=majority
```

Replace:
- `YOUR_USERNAME` with your database username
- `YOUR_PASSWORD` with your database password
- `YOUR_CLUSTER` with your cluster name

## Step 6: Restart Backend
1. Stop the backend server (Ctrl+C)
2. Run `npm start` again
3. You should see "✅ MongoDB Connected Successfully"

## Step 7: Seed Database
```bash
cd backend
node seed.js
```

Your app should now work!
