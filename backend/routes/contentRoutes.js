// routes/contentRoutes.js
// Routes for managing saved content
import express from "express";
import {
  getAllContent,
  getContentById,
  deleteContent,
  getContentStats,
} from "../controllers/contentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All content routes are protected
router.use(protect);

router.get("/", getAllContent);
router.get("/stats", getContentStats);
router.get("/:id", getContentById);
router.delete("/:id", deleteContent);

export default router;
