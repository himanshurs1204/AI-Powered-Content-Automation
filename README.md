# AI Content Automation Platform

A full-stack MERN application for generating and managing content with AI assistance. Create blog titles, YouTube scripts, thumbnail ideas, and manage your content calendar.

## Project Architecture

```
ai-content-automation/
├── backend/                    # Node.js + Express backend
│   ├── config/                # Configuration (database connection)
│   ├── controllers/           # Request handlers
│   ├── routes/               # API routes
│   ├── models/               # MongoDB schemas
│   ├── middleware/           # Auth & custom middleware
│   ├── services/             # AI services (Gemini API calls)
│   ├── server.js             # Main server entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/                   # React + Vite frontend
    ├── src/
    │   ├── components/       # Reusable React components
    │   ├── pages/           # Page components
    │   ├── services/        # API service layer
    │   ├── hooks/           # Custom React hooks (useAuth)
    │   ├── utils/           # Helper functions
    │   ├── App.jsx          # Main app with routing
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Tailwind styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

### Content Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: String (enum: ['title', 'script', 'thumbnail']),
  prompt: String,
  generatedContent: Mixed (string | array | object),
  metadata: {
    topic: String,
    audience: String,
    videoLength: String,
    style: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Calendar Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  platform: String (enum: ['Blog', 'YouTube', 'Instagram']),
  date: Date,
  status: String (enum: ['Planned', 'In Progress', 'Published']),
  description: String,
  contentId: ObjectId (ref: Content, optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Gemini AI** - Content generation

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Gemini AI API Key (get from: https://makersuite.google.com/app/apikey)

## Installation & Setup

### 1. Clone and Setup Backend

```bash
cd backend
npm install
```

### 2. Configure Environment

Create `.env` file (copy from `.env.example`):

```env
MONGODB_URI=mongodb://localhost:27017/ai-content-automation
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start MongoDB

```bash
# If using MongoDB locally
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 4. Start Backend Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Backend will run on `http://localhost:5000`

### 5. Setup Frontend

```bash
cd frontend
npm install
```

### 6. Start Frontend Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

```
POST   /api/auth/register      - Register user
POST   /api/auth/login         - Login user (returns JWT token)
GET    /api/auth/me            - Get current user (protected)
```

### AI Content Generation

```
POST   /api/ai/blog-titles     - Generate blog titles
POST   /api/ai/youtube-script  - Generate YouTube script
POST   /api/ai/thumbnail       - Generate thumbnail idea
```

### Content Management

```
GET    /api/content            - Get all saved content (with optional ?type filter)
GET    /api/content/:id        - Get specific content
DELETE /api/content/:id        - Delete content
GET    /api/content/stats      - Get content statistics
```

### Calendar Management

```
POST   /api/calendar           - Create calendar entry
GET    /api/calendar           - Get all entries (with optional date range)
PUT    /api/calendar/:id       - Update entry
DELETE /api/calendar/:id       - Delete entry
```

## Frontend Routes

```
/login                    - Login page
/register                 - Registration page
/dashboard                - Main dashboard with all tools
/generate-titles          - Blog title generator
/generate-script          - YouTube script generator
/generate-thumbnail       - Thumbnail idea generator
/content-calendar         - Content calendar management
/saved-content            - View/manage saved content
```

## Key Features

### 1. Authentication

- User registration and login
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes on frontend and backend

### 2. Blog Title Generator

- Input: Topic + Optional audience
- Output: 5 AI-generated blog titles
- Auto-save to database

### 3. YouTube Script Generator

- Input: Video topic + length (short/medium/long)
- Output: Structured script (Intro, Content, Conclusion)
- Copy individual sections or full script

### 4. Thumbnail Ideas

- Input: Video title + style
- Output: Text suggestions, design elements, color schemes, tips
- Based on content style (tech, educational, etc.)

### 5. Content Calendar

- Create/edit/delete calendar entries
- Track content status (Planned, In Progress, Published)
- Filter by platform (Blog, YouTube, Instagram)
- Link to generated content

### 6. Saved Content

- View all generated content
- Filter by type
- Delete unwanted content
- Copy content to clipboard

## Customization Guide

### Change Color Scheme

Edit `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Modify AI Prompts

Edit `backend/services/aiService.js`:

```javascript
export const generateBlogTitles = async (topic, audience) => {
  // Modify the prompt here
  const prompt = `Your custom prompt...`;
};
```

### Add New Content Types

1. Update backend models if needed
2. Create new controller in `controllers/`
3. Add new routes in `routes/`
4. Create new page in `frontend/src/pages/`
5. Add to App.jsx routing

## Common Issues & Solutions

### "MongoDB connection refused"

- Ensure MongoDB is running (`mongod`)
- Check MONGODB_URI in .env
- Use MongoDB Atlas for cloud database

### "Gemini API Key not found"

- Get API key from: https://makersuite.google.com/app/apikey
- Add to .env as GEMINI_API_KEY

### CORS errors

- Backend CORS is configured in `server.js`
- Frontend proxy is configured in `vite.config.js`
- Make sure backend runs on :5000 and frontend on :3000

### Frontend not connecting to backend

- Verify API base URL in `frontend/src/services/api.js`
- Check if backend server is running
- Look at network tab in browser DevTools

## Deployment

### Backend (Render/Railway/Heroku)

```bash
# Push to GitHub
git push origin main

# Connect service to repo and deploy
# Set environment variables in service dashboard
```

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy the dist/ folder
```

## Learning Resources

- **MongoDB**: https://docs.mongodb.com
- **Express.js**: https://expressjs.com
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **JWT**: https://jwt.io
- **Gemini AI**: https://ai.google.dev

## Next Steps & Enhancements

1. **Image Generation** - Integrate actual image generation API
2. **Email Notifications** - Send content reminders
3. **Social Media Integration** - Direct publishing to platforms
4. **Analytics Dashboard** - Track content performance
5. **Collaboration** - Share content with team members
6. **Templates** - Create reusable content templates
7. **Export Options** - Download as PDF/DOCX
8. **Multi-language** - Support multiple languages

## License

MIT License - Feel free to use for learning and commercial projects!

## Support

If you encounter issues:

1. Check error messages in browser console & terminal
2. Verify all .env variables are set
3. Ensure MongoDB & backend are running
4. Check backend logs for API errors

Happy coding! 🚀
