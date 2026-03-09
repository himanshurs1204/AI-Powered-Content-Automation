# Migration from Proxy to Axios - Setup Guide

## Overview

Your application has been successfully migrated from using Vite's proxy configuration to direct axios HTTP requests. This provides better control, cleaner configuration, and easier deployment.

## Changes Made

### Frontend Changes

#### 1. **Removed Vite Proxy Configuration**

- **File**: `frontend/vite.config.js`
- **Change**: Removed the proxy configuration that was forwarding `/api` requests to the backend
- **Why**: Direct axios calls eliminate an extra layer and provide more explicit control

#### 2. **Updated API Service with Environment Variables**

- **File**: `frontend/src/services/api.js`
- **Change**: API base URL now uses environment variable `VITE_API_BASE_URL`
- **Default**: Falls back to `http://localhost:5000/api` if not set
- **Code**:
  ```javascript
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  ```

#### 3. **Created Environment Configuration Files**

- **Files**:
  - `frontend/.env` - Your local development configuration
  - `frontend/.env.example` - Template for other developers
- **Configuration**:
  ```
  VITE_API_BASE_URL=http://localhost:5000/api
  ```

### Backend Changes

#### 1. **Enhanced CORS Configuration**

- **File**: `backend/server.js`
- **Change**: Replaced generic `cors()` with environment-based configuration
- **Why**: More secure and production-ready
- **Code**:
  ```javascript
  const allowedOrigins = (
    process.env.ALLOWED_ORIGINS || "http://localhost:3000"
  ).split(",");
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  ```

#### 2. **Updated Environment Configuration**

- **File**: `backend/.env.example`
- **New Variable**: `ALLOWED_ORIGINS` for configuring allowed frontend URLs

## How It Works

### Development Setup

The already configured `frontend/src/services/api.js` handles all API communications:

```javascript
// This is the main API instance used throughout your app
const api = axios.create({
  baseURL: API_BASE_URL, // From environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically adds auth token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Calls

Your components use the exported API objects (already set up):

```javascript
import { authAPI, aiAPI, contentAPI, calendarAPI } from "@/services/api";

// Usage in components
await authAPI.login(email, password);
await aiAPI.generateBlogTitles(topic, audience);
await contentAPI.getAllContent(type);
```

## Environment Configuration

### Frontend

**Development**: No changes needed. Default is `http://localhost:5000/api`

**Production**: Before deploying, update:

```bash
# frontend/.env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### Backend

**Development**: Ensure `ALLOWED_ORIGINS` includes frontend URL:

```bash
# backend/.env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

**Production**: Update to your domain:

```bash
# backend/.env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## Running the Application

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## Testing the Migration

1. Open the frontend in your browser (`http://localhost:3000`)
2. Open DevTools → Network tab
3. All API requests should now show:
   - **Request**: Direct to `http://localhost:5000/api/*`
   - **Headers**: Include `Authorization: Bearer <token>` when authenticated
   - **CORS**: Response headers should include `Access-Control-Allow-Origin`

## Advantages of This Approach

✅ **Explicit Configuration**: Backend URLs are clear and configurable
✅ **Better Security**: Proper CORS configuration for production
✅ **Easier Deployment**: Different URLs for dev/staging/production
✅ **No Build-time Proxy**: Proxy config no longer tied to dev server
✅ **Standard Practice**: Direct HTTP clients are industry standard
✅ **Better Debugging**: Network requests are transparent

## Troubleshooting

### CORS Errors?

- Check `backend/.env` has correct `ALLOWED_ORIGINS`
- Ensure backend CORS config matches your frontend URL

### API Requests Failing?

- Verify backend is running on port 5000
- Check `frontend/.env` has correct `VITE_API_BASE_URL`
- Review browser console → Network tab for actual requests

### Auth Not Working?

- Ensure token is being stored in localStorage
- Verify Authorization header is being sent (Network tab)
