# Project Structure & File Guide

Complete reference of all files and what they do.

## Backend Structure

### Configuration Files

**`backend/.env.example`**

- Template for environment variables
- Copy to `.env` and fill with your values
- Never commit actual `.env` file

**`backend/package.json`**

- Project metadata and dependencies
- Define npm scripts: `npm run dev`, `npm start`

**`backend/server.js` (MAIN FILE)**

- Express app entry point
- Sets up middleware, routes, error handling
- Start with: `npm run dev`

### Config Folder

**`backend/config/db.js`**

- MongoDB connection setup
- Called on server startup
- Handles connection errors

### Models Folder (Database)

**`backend/models/User.js`**

- User schema for authentication
- Password hashing with bcryptjs
- Methods: comparePassword()

**`backend/models/Content.js`**

- Schema for AI generated content
- Stores: type, prompt, generated content
- Used by: Blog titles, Scripts, Thumbnails

**`backend/models/Calendar.js`**

- Content calendar/schedule schema
- Tracks: title, platform, date, status
- Linked to Content via contentId

### Middleware Folder

**`backend/middleware/auth.js`**

- JWT token verification
- `protect` function: protects routes
- `generateToken` function: creates JWT
- Used by: All protected API routes

### Services Folder (Business Logic)

**`backend/services/aiService.js` (IMPORTANT)**

- All Gemini AI API integration
- Functions:
  - `generateBlogTitles()` - creates blog titles
  - `generateYoutubeScript()` - creates video scripts
  - `generateThumbnailIdea()` - creates thumbnail ideas
- Helper: `extractSection()` - parses AI responses
- **This is where to modify AI prompts**

### Controllers Folder (Request Handlers)

**`backend/controllers/authController.js`**

- Handles user registration & login
- Functions:
  - `register` - creates new user
  - `login` - authenticates user
  - `getMe` - gets current user
- Validates input and returns JWT

**`backend/controllers/aiController.js`**

- Handles AI content generation requests
- Functions:
  - `generateBlogTitles` - POST /api/ai/blog-titles
  - `generateYoutubeScript` - POST /api/ai/youtube-script
  - `generateThumbnail` - POST /api/ai/thumbnail
- Calls AI services and saves to database

**`backend/controllers/contentController.js`**

- Manages saved content (CRUD operations)
- Functions:
  - `getAllContent` - GET all content, optional filter
  - `getContentById` - GET single content
  - `deleteContent` - DELETE content
  - `getContentStats` - GET statistics

**`backend/controllers/calendarController.js`**

- Manages content calendar
- Functions:
  - `createCalendarEntry` - POST new entry
  - `getCalendarEntries` - GET with date filtering
  - `updateCalendarEntry` - PUT update entry
  - `deleteCalendarEntry` - DELETE entry

### Routes Folder (API Endpoints)

**`backend/routes/authRoutes.js`**

- Routes for authentication

```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

**`backend/routes/aiRoutes.js`**

- Routes for AI generation

```
POST /api/ai/blog-titles
POST /api/ai/youtube-script
POST /api/ai/thumbnail
```

**`backend/routes/contentRoutes.js`**

- Routes for content management

```
GET /api/content
GET /api/content/:id
DELETE /api/content/:id
GET /api/content/stats
```

**`backend/routes/calendarRoutes.js`**

- Routes for calendar management

```
POST /api/calendar
GET /api/calendar
PUT /api/calendar/:id
DELETE /api/calendar/:id
```

## Frontend Structure

### Configuration Files

**`frontend/package.json`**

- Frontend dependencies and scripts
- Scripts: `npm run dev`, `npm run build`

**`frontend/vite.config.js`**

- Vite bundler configuration
- Sets dev server port (3000)
- Proxy to backend (/api)

**`frontend/tailwind.config.js`**

- Tailwind CSS customization
- Theme colors, fonts, breakpoints

**`frontend/postcss.config.js`**

- PostCSS plugins (Tailwind, autoprefixer)

**`frontend/index.html`**

- HTML entry point
- Links to src/main.jsx
- Contains root div for React

### Source Folder

**`frontend/src/main.jsx`**

- React app entry point
- Renders App component to #root

**`frontend/src/App.jsx`**

- Main App component
- React Router setup
- All route definitions
- AuthProvider wrapper

**`frontend/src/index.css`**

- Global styles
- Tailwind directives
- Custom animations

### Components Folder (Reusable UI)

**`frontend/src/components/Button.jsx`**

- Reusable button component
- Variants: primary, secondary, outline, danger

**`frontend/src/components/Input.jsx`**

- Input, Textarea, Select components
- Handles labels, errors, validation states

**`frontend/src/components/Card.jsx`**

- Card container component
- CardSkeleton for loading states

**`frontend/src/components/Alert.jsx`**

- Alert notification component
- Types: success, error, warning, info

**`frontend/src/components/Navbar.jsx`**

- Top navigation bar
- Shows user name and logout button
- Navigation links to dashboard, calendar, saved content

**`frontend/src/components/ProtectedRoute.jsx`**

- Route wrapper for authentication
- Redirects to login if not authenticated
- Shows loading spinner while checking auth

**`frontend/src/components/index.js`**

- Barrel export of all components
- Import like: `import { Button, Input } from '../components'`

### Hooks Folder

**`frontend/src/hooks/useAuth.js`**

- Custom auth hook with context
- Provides:
  - `user` - current user object
  - `loading` - loading state
  - `register()` - register function
  - `login()` - login function
  - `logout()` - logout function
- Usage: `const { user, login } = useAuth()`

### Services Folder (API Calls)

**`frontend/src/services/api.js`**

- Centralized API communication
- Axios instance with auth interceptor
- Exports: authAPI, aiAPI, contentAPI, calendarAPI
- Auto-adds JWT token to requests

### Utils Folder

**`frontend/src/utils/helpers.js`**

- Helper functions:
  - `formatDate()` - format dates
  - `truncate()` - shorten text
  - `getStatusColor()` - CSS classes for status
  - `getPlatformIcon()` - emojis for platforms

### Pages Folder (Full Pages)

**`frontend/src/pages/Login.jsx`**

- Login page
- Form with email & password
- Links to register

**`frontend/src/pages/Register.jsx`**

- Registration page
- Form with name, email, password
- Password validation

**`frontend/src/pages/Dashboard.jsx`**

- Main dashboard
- Shows 5 tool cards
- Navigation to all features

**`frontend/src/pages/GenerateTitles.jsx`**

- Blog title generator
- Left: Input form
- Right: Generated titles list

**`frontend/src/pages/GenerateScript.jsx`**

- YouTube script generator
- Generates: Intro, Content, Conclusion
- Copy individual sections or full

**`frontend/src/pages/GenerateThumbnail.jsx`**

- Thumbnail idea generator
- Generates: Text, Design, Colors, Tips
- Styled preview of suggestions

**`frontend/src/pages/SavedContent.jsx`**

- View all generated content
- Filter by type
- Copy, view, delete content

**`frontend/src/pages/ContentCalendar.jsx`**

- Content calendar/schedule
- Create/edit/delete entries
- Filter by platform
- Set status (Planned/In Progress/Published)

**`frontend/src/pages/index.js`**

- Barrel export of all pages
- Import like: `import { Dashboard } from './pages'`

## Documentation Files

**`README.md`**

- Project overview
- Installation instructions
- API reference
- Feature descriptions
- Troubleshooting

**`QUICKSTART.md`**

- Quick 10-minute setup guide
- Step-by-step for beginners
- Troubleshooting common issues

**`CONTRIBUTING.md`**

- How to add new features
- Architecture explanation
- Complete example: Adding SEO Keywords
- Best practices

**`DEPLOYMENT.md`**

- Deploy to production
- Multiple platform options
- Security checklist
- Monitoring and scaling

## How Files Connect

```
User Request Flow:
1. User clicks button on Page (e.g., GenerateTitles.jsx)
2. Page calls aiAPI.generateBlogTitles() from services/api.js
3. API sends POST to /api/ai/blog-titles
4. Backend routes to aiController.generateBlogTitles()
5. Controller calls generateBlogTitlesAI() from aiService.js
6. Service calls Gemini API
7. Response saved to Content model (MongoDB)
8. Response returned to component
9. Component displays results

File Dependencies:
frontend/pages/ → frontend/services/api.js
               → frontend/hooks/useAuth.js
               → frontend/components/
               → frontend/utils/helpers.js

backend/routes/ → backend/controllers/
               → backend/services/
               → backend/models/
               → backend/middleware/
               → backend/config/
```

## Code Reading Order (For Learning)

1. **Start with backend/server.js** - See main structure
2. **Read backend/models/** - Understand data
3. **Read backend/middleware/auth.js** - See auth flow
4. **Read backend/controllers/authController.js** - Simple example
5. **Read backend/services/aiService.js** - See Gemini integration
6. **Read frontend/src/App.jsx** - Frontend routing
7. **Read frontend/src/hooks/useAuth.js** - Auth state
8. **Read frontend/src/services/api.js** - API calls
9. **Read frontend/src/pages/Dashboard.jsx** - Simple page
10. **Read frontend/src/pages/GenerateTitles.jsx** - Feature page

## File Size Estimates

| File                 | Lines    | Purpose        |
| -------------------- | -------- | -------------- |
| server.js            | ~60      | Server setup   |
| auth.js (middleware) | ~30      | Auth logic     |
| aiService.js         | ~120     | AI integration |
| authController.js    | ~80      | Auth endpoints |
| aiController.js      | ~140     | AI endpoints   |
| models/\*.js         | ~50 each | Data schemas   |
| hooks/useAuth.js     | ~90      | Auth context   |
| pages/\*.jsx         | ~200 avg | Feature pages  |
| components/\*.jsx    | ~30 avg  | UI components  |

## Naming Conventions Used

- **Files**: camelCase (api.js, authController.js)
- **Folders**: lowercase (models, controllers, pages)
- **Functions**: camelCase (generateBlogTitles)
- **Components**: PascalCase (Login, Dashboard)
- **Constants**: UPPER_SNAKE_CASE (JWT_SECRET)
- **Classes**: PascalCase (with MongoDB models)

## Key Files to Modify When Customizing

| Goal                 | File                               |
| -------------------- | ---------------------------------- |
| Change colors        | frontend/tailwind.config.js        |
| Modify AI prompts    | backend/services/aiService.js      |
| Add new content type | Add to models, controllers, routes |
| Change database      | backend/config/db.js               |
| Add authentication   | Modify backend/middleware/auth.js  |
| Change UI layout     | frontend/src/pages/\*.jsx          |
| Add new feature      | Follow CONTRIBUTING.md             |

## Important Notes

- **Always** keep `.env` secret (add to .gitignore)
- **Backend** must run on port 5000 for frontend proxy to work
- **Frontend** uses localhost:3000 for development
- **Database** calls are async/await
- **AI Calls** take 5-10 seconds, use loading states
- **JWT Token** stored in localStorage, auto-sent with requests
- **CORS** configured to allow localhost:3000

This covers the entire project! 🎉
