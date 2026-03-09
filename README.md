# AI-Powered Content Automation Platform

A full-stack web application that helps content creators automate and streamline their content generation workflow using Google's Gemini AI.

## Quick Start

### Prerequisites

- Node.js v16+ with npm
- MongoDB (local or cloud)
- Google Gemini API key

### Installation

```bash
# Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials (MONGODB_URI, JWT_SECRET, GEMINI_API_KEY)
npm start

# Frontend Setup (in new terminal)
cd frontend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`  
Frontend runs on `http://localhost:5173`

## Features

- 🤖 AI-powered content generation (blog titles, YouTube scripts, thumbnail ideas)
- 📅 Content calendar for scheduling
- 💾 Save and manage generated content
- 🔐 Secure user authentication
- 🎨 Responsive Tailwind CSS design
- 🔄 Structured response validation and cleaning

## Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT + bcryptjs
- **AI:** Google Gemini API
- **Validation:** Express-validator

## Project Structure

```
ai-content-automation/
├── backend/               # Express API server
│   ├── config/           # Database configuration
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Auth & other middleware
│   ├── prompts/          # AI prompt templates
│   ├── utils/            # Validators & formatters
│   └── server.js         # Entry point
├── frontend/             # React web application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API integration
│   │   ├── utils/        # Helpers
│   │   └── App.jsx       # Main app
│   └── vite.config.js    # Vite configuration
└── package files         # Package.json, .env configurations
```

## Key Features Explained

### 🎯 Blog Title Generator

Generate 5 SEO-friendly blog title ideas with SEO scores, power words, and metadata.

### 🎬 YouTube Script Generator

Create complete video scripts with intro, content sections, engagement hooks, conclusions, and estimated duration.

### 🎨 Thumbnail Designer

Get design suggestions including text placement, color schemes, design elements, and CTR scoring.

### 📅 Content Calendar

Plan and track content publishing across Blog, YouTube, and Instagram platforms.

### 💾 Saved Content Library

Access all previously generated content with search, filter, and organization by content type.

## Architecture Highlights

- **Centralized Prompts:** All AI prompts stored in `/backend/prompts/` for easy maintenance
- **Response Validation:** Automatic validation and cleaning of AI responses before storage
- **Protected Routes:** All sensitive endpoints require JWT authentication
- **Modular Design:** Components are self-contained and reusable
- **Error Handling:** Comprehensive error handling with meaningful messages
- **Scalable:** Ready for production deployment with best practices

- View all generated content in one place
- Filter by content type
- Track creation dates and metadata
- Reuse content across platforms

### 🔐 **User Authentication**

- Secure registration and login
- JWT-based session management
- Protected routes and API endpoints

---

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **Google Gemini AI** - Content generation\
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend

- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **PostCSS & Autoprefixer** - CSS processing

---

## 📁 Project Structure

````
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
````

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

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- Google Gemini API key
- npm or yarn

### Installation Steps

1. **Clone or extract the project**

   ```bash
   cd "AI Powered Content Automation"
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   Create `.env` in the `backend` directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-content-automation
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db-name

   JWT_SECRET=your_jwt_secret_key_here
   GEMINI_API_KEY=your_google_gemini_api_key
   CORS_ORIGIN=http://localhost:5173
   ```

5. **Start the Application**

   Backend:

   ```bash
   cd backend
   npm run dev
   ```

   Frontend (in a new terminal):

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Content Generation Endpoints

- `POST /api/ai/titles` - Generate blog titles
- `POST /api/ai/script` - Generate YouTube script
- `POST /api/ai/thumbnail` - Generate thumbnail ideas

### Content Management Endpoints

- `GET /api/content` - Get all user content
- `POST /api/content` - Save generated content
- `GET /api/content/:id` - Get specific content
- `DELETE /api/content/:id` - Delete content

### Calendar Endpoints

- `GET /api/calendar` - Get user's calendar events
- `POST /api/calendar` - Create calendar event
- `GET /api/calendar/:id` - Get specific event
- `PUT /api/calendar/:id` - Update event
- `DELETE /api/calendar/:id` - Delete event

---

## 🔒 Authentication Flow

```
1. User registers/logs in
   ↓
2. Backend validates credentials and issues JWT token
   ↓
3. Frontend stores JWT in localStorage/sessionStorage
   ↓
4. Client includes JWT in Authorization header for protected routes
   ↓
5. Backend middleware verifies JWT and grants access
   ↓
6. Protected routes only accessible with valid token
```

---

## 🎓 Learning Paths

### For Beginners

1. Start with [START_HERE.md](START_HERE.md) for orientation
2. Check [QUICKSTART.md](QUICKSTART.md) for 10-minute setup
3. Review [STRUCTURE.md](STRUCTURE.md) to understand file organization

### For Adding Features

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
2. Follow the established patterns in controllers/services
3. Add tests and update documentation

### For Deployment

1. See [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
2. Follow environment configuration guidelines
3. Use MongoDB Atlas for cloud database

---

## 📖 Available Documentation

| Document                                 | Purpose                          |
| ---------------------------------------- | -------------------------------- |
| [START_HERE.md](START_HERE.md)           | Project orientation and overview |
| [QUICKSTART.md](QUICKSTART.md)           | 10-minute setup guide            |
| [STRUCTURE.md](STRUCTURE.md)             | File and folder reference        |
| [CONTRIBUTING.md](CONTRIBUTING.md)       | How to add features              |
| [DEPLOYMENT.md](DEPLOYMENT.md)           | Production deployment guide      |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Complete delivery summary        |

---

## 🌟 Features in Detail

### Page Components

**Authentication Pages**

- **Login** - Secure user login with validation
- **Register** - New user registration with email verification

**Content Generation**

- **Dashboard** - Overview of recent activity and quick access
- **Generate Titles** - Create blog title ideas
- **Generate Script** - Create YouTube scripts
- **Generate Thumbnail** - Get thumbnail design suggestions

**Content Management**

- **Saved Content** - Browse and manage all generated content
- **Content Calendar** - Plan and track publishing schedule

---

## 🔧 Configuration

### Backend Configuration (`backend/config/db.js`)

- MongoDB connection setup
- Mongoose configuration
- Error handling

### Frontend Configuration

- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS processing

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**

- Ensure MongoDB is running locally or check connection string for MongoDB Atlas
- Verify `MONGODB_URI` in `.env` file

**API Key Errors**

- Verify `GEMINI_API_KEY` is correctly set in `.env`
- Check that API key has appropriate permissions in Google Cloud Console

**CORS Errors**

- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Check that frontend is making requests to correct backend URL

**Port Already in Use**

- Change port in backend `.env` if 5000 is in use
- Kill existing process: `npx lsof -i :5000` (macOS/Linux) or check Task Manager (Windows)

---

## 📦 Dependencies Overview

### Backend Dependencies

```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ODM",
  "jsonwebtoken": "JWT authentication",
  "bcryptjs": "Password hashing",
  "@google/genai": "Gemini AI integration",
  "express-validator": "Input validation",
  "cors": "Cross-origin requests",
  "dotenv": "Environment variables"
}
```

### Frontend Dependencies

```json
{
  "react": "UI library",
  "react-router-dom": "Client-side routing",
  "axios": "HTTP requests",
  "tailwindcss": "CSS styling"
}
```

---

## 🚀 Performance & Scalability

- **Caching Layer**: Consider Redis for frequently accessed data
- **API Rate Limiting**: Currently not implemented, recommended for production
- **Database Indexing**: Email field indexed for faster lookups
- **Frontend Optimization**: Vite provides fast HMR and efficient bundling
- **Load Balancing**: Ready for deployment with load balancers

---

## 🔐 Security Features

✅ JWT-based authentication
✅ Password hashing with bcryptjs
✅ CORS enabled for controlled access
✅ Environment variables for sensitive data
✅ Protected API routes with middleware
✅ Input validation on all endpoints
✅ XSS protection via React

**Recommended for Production:**

- HTTPS/SSL certificates
- Rate limiting on API endpoints
- API key rotation strategy
- Content Security Policy headers
- Regular security audits

---

## 📝 License

This project is provided as-is for educational and commercial use.

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Adding new features
- Reporting bugs
- Submitting pull requests
- Code style standards

---

## 📞 Support & Resources

- **Documentation**: See [DOCS_INDEX.md](DOCS_INDEX.md) for complete documentation index
- **Issues**: Check existing issues or create new ones for bugs
- **GitHub**: Project repository details

---

## 🎉 What's Included

- ✅ **Complete Backend** - All API endpoints fully implemented
- ✅ **Complete Frontend** - All UI pages and components ready
- ✅ **Authentication** - Secure user management
- ✅ **Database Models** - Mongoose schemas defined
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Documentation** - Extensive guides and references
- ✅ **Production Ready** - Ready for deployment

---

**Happy creating! 🚀**

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
