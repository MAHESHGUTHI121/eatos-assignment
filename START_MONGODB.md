# Starting MongoDB Locally - Quick Guide

## Option 1: Start MongoDB as a Service (Recommended)

### Find MongoDB Installation Path
MongoDB is typically installed in one of these locations:
- `C:\Program Files\MongoDB\Server\{version}\bin\`
- `C:\Program Files\MongoDB\Server\7.0\bin\`
- `C:\Program Files\MongoDB\Server\6.0\bin\`

### Start MongoDB Service

**Method 1: Using Services**
1. Press `Win + R`, type `services.msc`, press Enter
2. Find "MongoDB" or "MongoDB Server" in the list
3. Right-click → Start

**Method 2: Using Command Prompt (Run as Administrator)**
```cmd
net start MongoDB
```

**Method 3: Using PowerShell (Run as Administrator)**
```powershell
Start-Service MongoDB
```

## Option 2: Start MongoDB Manually

1. Open Command Prompt or PowerShell **as Administrator**
2. Navigate to MongoDB bin folder:
   ```cmd
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   ```
3. Start MongoDB:
   ```cmd
   mongod
   ```

## Verify MongoDB is Running

Open a new terminal and run:
```bash
cd backend
node seed.js
```

If you see "MongoDB Connected" and "Menu Items seeded", MongoDB is working!

## Troubleshooting

**If MongoDB won't start:**
1. Check if port 27017 is already in use
2. Make sure you have Administrator privileges
3. Check MongoDB installation path
4. Restart your computer and try again

**Alternative: Use MongoDB Compass**
- Download from: https://www.mongodb.com/try/download/compass
- It can start MongoDB automatically
