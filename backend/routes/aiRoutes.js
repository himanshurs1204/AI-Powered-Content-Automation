// routes/aiRoutes.js
// Routes for AI content generation
import express from "express";
import {
  generateBlogTitles,
  generateYoutubeScript,
  generateThumbnail,
  generateThumbnailImageController,
} from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All AI routes are protected
router.use(protect);

router.post("/blog-titles", generateBlogTitles);
router.post("/youtube-script", generateYoutubeScript);
router.post("/thumbnail", generateThumbnail);
router.post("/thumbnail-image", generateThumbnailImageController);

export default router;
