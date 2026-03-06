# Adding New Features - Developer Guide

This guide explains how to add new features to the AI Content Automation Platform.

## Architecture Overview

The project follows a **layered architecture**:

1. **Frontend** (React pages) → Makes API calls
2. **Backend API** (Express routes) → Handles requests
3. **Services** (Business logic) → Does the heavy lifting
4. **Database** (MongoDB) → Stores data

Every feature follows this flow:

```
API Request → Route → Controller → Service → Database → Response
```

## Adding a New AI Feature (Complete Example)

Let's say you want to add an **"SEO Keyword Generator"** feature.

### Step 1: Add Backend Route

**File:** `backend/routes/aiRoutes.js`

```javascript
router.post("/seo-keywords", generateSEOKeywords);
```

### Step 2: Create AI Service Function

**File:** `backend/services/aiService.js`

```javascript
// Add this function
export const generateSEOKeywords = async (topic, searchIntent) => {
  try {
    const prompt = `Generate 10 high-value SEO keywords for the topic: "${topic}"
Search Intent: ${searchIntent}

Format as a numbered list. Include monthly search volume estimates.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error("Failed to generate SEO keywords");
  }
};
```

### Step 3: Create Controller

**File:** `backend/controllers/aiController.js`

```javascript
export const generateSEOKeywords = async (req, res) => {
  try {
    const { topic, searchIntent } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Please provide a topic",
      });
    }

    // Call AI service
    const keywords = await generateSEOKeywordsAI(
      topic,
      searchIntent || "informational",
    );

    // Save to database
    const content = await Content.create({
      userId: req.user._id,
      type: "keywords",
      prompt: `Topic: ${topic}, Intent: ${searchIntent}`,
      generatedContent: keywords,
      metadata: { topic, searchIntent },
    });

    res.status(200).json({
      success: true,
      data: {
        id: content._id,
        keywords,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
```

Don't forget to import the AI function at the top:

```javascript
import { generateSEOKeywords as generateSEOKeywordsAI } from "../services/aiService.js";
```

### Step 4: Add Frontend Page

**File:** `frontend/src/pages/GenerateSEOKeywords.jsx`

```javascript
import { useState } from "react";
import { Button, Input, Select, Alert, Card } from "../components";
import { aiAPI } from "../services/api";

export const GenerateSEOKeywords = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keywords, setKeywords] = useState("");
  const [form, setForm] = useState({
    topic: "",
    searchIntent: "informational",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setKeywords("");

    if (!form.topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);

    try {
      const { data } = await aiAPI.generateSEOKeywords(
        form.topic,
        form.searchIntent,
      );
      setKeywords(data.keywords);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate keywords");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔑 SEO Keyword Generator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <form onSubmit={handleSubmit}>
              <Input
                label="Topic"
                placeholder="e.g., React Tutorial"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                required
              />

              <Select
                label="Search Intent"
                value={form.searchIntent}
                onChange={(e) =>
                  setForm({ ...form, searchIntent: e.target.value })
                }
                options={[
                  { label: "Informational", value: "informational" },
                  { label: "Commercial", value: "commercial" },
                  { label: "Transactional", value: "transactional" },
                ]}
              />

              <Button
                variant="primary"
                className="w-full"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Generating..." : "Generate Keywords"}
              </Button>
            </form>
          </Card>

          <Card className="md:col-span-2">
            {error && <Alert type="error" message={error} />}
            {keywords && (
              <div>
                <h2 className="font-bold mb-3">Keywords:</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                  {keywords}
                </pre>
              </div>
            )}
            {!keywords && !loading && (
              <p className="text-gray-500 text-center py-8">
                Generate keywords to see them here ✨
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
```

### Step 5: Add API Service Call

**File:** `frontend/src/services/api.js`

```javascript
export const aiAPI = {
  // ... existing code ...
  generateSEOKeywords: (topic, searchIntent) =>
    api.post("/ai/seo-keywords", { topic, searchIntent }),
};
```

### Step 6: Add to Frontend Routes

**File:** `frontend/src/App.jsx`

```javascript
import { GenerateSEOKeywords } from "./pages";

// In Routes:
<Route
  path="/generate-seo-keywords"
  element={
    <ProtectedRoute>
      <GenerateSEOKeywords />
    </ProtectedRoute>
  }
/>;
```

### Step 7: Update Pages Index

**File:** `frontend/src/pages/index.js`

```javascript
export { GenerateSEOKeywords } from "./GenerateSEOKeywords";
```

### Step 8: Add to Dashboard

**File:** `frontend/src/pages/Dashboard.jsx`

```javascript
const tools = [
  // ... existing tools ...
  {
    id: 6,
    title: "Generate SEO Keywords",
    description: "Find high-value keywords for your content",
    icon: "🔑",
    link: "/generate-seo-keywords",
    color: "from-orange-400 to-orange-600",
  },
];
```

## Adding a New Content Type

If you want to store a new type of generated content:

### 1. Update Content Model (Optional)

**File:** `backend/models/Content.js`

```javascript
type: {
  type: String,
  enum: ['title', 'script', 'thumbnail', 'keywords'], // Add new type
  required: true,
},
```

### 2. Create Corresponding Frontend Pages & Routes

Follow the steps above for each new feature.

## Adding a New Database Model

Example: Adding a **Feedback** feature

### Step 1: Create Model

**File:** `backend/models/Feedback.js`

```javascript
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    comment: String,
  },
  { timestamps: true },
);

export default mongoose.model("Feedback", feedbackSchema);
```

### Step 2: Create Controller

**File:** `backend/controllers/feedbackController.js`

```javascript
import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const { contentId, rating, comment } = req.body;

    const feedback = await Feedback.create({
      userId: req.user._id,
      contentId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ contentId: req.params.contentId });
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

### Step 3: Create Routes

**File:** `backend/routes/feedbackRoutes.js`

```javascript
import express from "express";
import {
  createFeedback,
  getFeedback,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.use(protect);

router.post("/", createFeedback);
router.get("/:contentId", getFeedback);

export default router;
```

### Step 4: Mount Routes

**File:** `backend/server.js`

```javascript
import feedbackRoutes from "./routes/feedbackRoutes.js";
app.use("/api/feedback", feedbackRoutes);
```

## Best Practices

### Code Organization

```
✅ Good
- Separate concerns (models, controllers, services)
- One file per feature/controller
- Descriptive file names

❌ Avoid
- Mixing business logic in routes
- Huge files with multiple unrelated functions
- Unclear naming
```

### Error Handling

```javascript
// Good
try {
  // your code
  if (!userInput) {
    return res.status(400).json({
      success: false,
      message: "Clear error message",
    });
  }
} catch (error) {
  console.error("Detailed error:", error);
  res.status(500).json({
    success: false,
    message: "User-friendly error",
  });
}
```

### Async/Await

```javascript
// Good
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await apiAPI.someCall();
    setData(data);
  } catch (err) {
    setError(err.message);
  }
};

// Avoid
handleSubmit = (e) => {
  e.preventDefault();
  apiAPI.someCall().then(...).catch(...);
};
```

### Frontend State Management

```javascript
// Good - clear state
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [data, setData] = useState(null);

// Avoid
const [state, setState] = useState({});
```

## Testing Your New Feature

1. **Add console logs** to debug
2. **Check Network tab** (F12) to see API calls
3. **Test error scenarios** (empty inputs, API failures)
4. **Test with real data**
5. **Check database** to verify data is saved

## Deployment Tips

Before deploying new features:

- [ ] Test locally with npm run dev
- [ ] Test all error cases
- [ ] Update .env.example with any new variables
- [ ] Commit with clear messages
- [ ] Update documentation

## Common Mistakes to Avoid

1. **Forgetting to import renamed functions** → Import errors
2. **Not handling errors** → Apps crash
3. **Not checking user authorization** → Security issues
4. **Typos in endpoint names** → API 404 errors
5. **Forgetting to save to database** → Data not persisted
6. **Wrong HTTP methods** → 405 errors

## Getting Help

- Read error messages carefully (they usually tell you the problem)
- Check browser console (F12 → Console)
- Check backend logs (terminal output)
- Search error message on Google/Stack Overflow
- Look at similar existing features for reference

Happy building! 🎉
