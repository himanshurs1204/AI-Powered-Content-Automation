# Quick Start Guide

Get the AI Content Automation Platform running in 10 minutes! 🚀

## Step 1: Prerequisites Check

Make sure you have installed:

- Node.js (download from https://nodejs.org) - check with `node -v`
- MongoDB (local or cloud) - check with `mongod` or use MongoDB Atlas
- A code editor (VS Code recommended)
- Gemini API Key from Google: https://makersuite.google.com/app/apikey

## Step 2: Get Your Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key and save it somewhere (you'll need this soon)

## Step 3: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy contents from .env.example and fill in your values
# IMPORTANT: Add your Gemini API Key!

# Start MongoDB if using local
mongod

# Start the backend server
npm run dev
```

You should see: ✅ MongoDB connected & 🚀 Server running on http://localhost:5000

## Step 4: Frontend Setup (New Terminal)

```bash
# Open a NEW terminal window

# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

You should see: ✅ Server is ready at http://localhost:3000

## Step 5: Access the Application

1. Open browser and go to: http://localhost:3000
2. You'll see the login page
3. Click "Register" to create a new account
4. Fill in: Name, Email, Password
5. Click "Register"

## Step 6: Try a Feature

1. After login, you'll see the Dashboard 🎉
2. Click "Generate Blog Titles"
3. Enter a topic (e.g., "Machine Learning")
4. Click "Generate Titles"
5. Wait for AI to generate titles
6. See your generated content in real-time!

## Troubleshooting

### Backend won't start?

```bash
# Check Node version
node -v

# Kill port 5000 if in use
# Windows: netstat -ano | findstr :5000
# Mac: lsof -i :5000

# Need to install packages again
npm install
```

### Frontend shows "Cannot connect to server"?

```bash
# Make sure backend is running
# Check http://localhost:5000/api/health in browser
# Should show: {"success": true, "message": "Server is running"}
```

### MongoDB connection error?

```bash
# Option 1: Use MongoDB locally
mongod

# Option 2: Use MongoDB Atlas (Cloud)
# 1. Create account at mongodb.com
# 2. Create a cluster
# 3. Get connection string
# 4. Add to MONGODB_URI in backend/.env
```

### API Key not working?

```bash
# Make sure you:
# 1. Got it from https://makersuite.google.com/app/apikey
# 2. Copied it correctly (no extra spaces)
# 3. Pasted in backend/.env as GEMINI_API_KEY=
# 4. Restarted backend after adding key
```

## Project Structure Quick Reference

```
📁 backend/
  ├── 📄 server.js (main file)
  ├── 📁 controllers/ (what happens when you click something)
  ├── 📁 routes/ (API endpoints)
  ├── 📁 models/ (database structure)
  └── 📁 services/ (AI magic here!)

📁 frontend/
  ├── 📄 App.jsx (main app)
  ├── 📁 pages/ (different screens)
  ├── 📁 components/ (reusable pieces)
  └── 📁 services/ (talks to backend)
```

## What Each Tool Does

| Tool           | Purpose                | Input                 | Output                     |
| -------------- | ---------------------- | --------------------- | -------------------------- |
| Blog Titles    | Generate article ideas | Topic + Audience      | 5 title suggestions        |
| YouTube Script | Create video scripts   | Topic + Length        | Intro, Content, Conclusion |
| Thumbnail      | Design suggestions     | Video Title + Style   | Design ideas & colors      |
| Calendar       | Schedule content       | Title + Date + Status | Calendar view              |
| Saved Content  | Organize everything    | -                     | All generated content      |

## Using the Authentication

**To Register:**

- Email should be unique
- Password minimum 6 characters
- Name can be anything

**To Login:**

- Use the email and password you registered with
- Token is auto-saved in browser
- Token expires in 7 days

**To Logout:**

- Click "Logout" button in navigation bar

## Environment Variables Explained

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/ai-content-automation
# Or use MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/

# Secret key for JWT tokens (make it long and random)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server port
PORT=5000

# Environment type
NODE_ENV=development

# Your Gemini API Key (required!)
GEMINI_API_KEY=your_gemini_api_key_here
```

## Next: Customization Ideas

Once it's running, try:

1. **Change Colors**: Edit `frontend/tailwind.config.js`
2. **Change AI Prompts**: Edit `backend/services/aiService.js`
3. **Add New Features**: Create new controller + route + page
4. **Deploy**: Push to GitHub and use Render/Vercel

## Need Help?

1. Check terminal for error messages (read carefully!)
2. Look at browser console (F12 → Console tab)
3. Check if ports 3000 and 5000 are available
4. Restart both terminals if something weird happens
5. Clear browser cache (Ctrl+Shift+Delete)

## Success Checklist! ✅

- [ ] Backend running on :5000
- [ ] Frontend running on :3000
- [ ] Can register a new account
- [ ] Can log in
- [ ] Can generate blog titles
- [ ] Can save content
- [ ] Can access calendar

If all checked ✅ - Congratulations! Your app is working! 🎉

Now start building and customizing! The world needs your content! 🚀
