// routes/calendarRoutes.js
// Routes for managing content calendar
import express from "express";
import {
  createCalendarEntry,
  getCalendarEntries,
  updateCalendarEntry,
  deleteCalendarEntry,
} from "../controllers/calendarController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All calendar routes are protected
router.use(protect);

router.post("/", createCalendarEntry);
router.get("/", getCalendarEntries);
router.put("/:id", updateCalendarEntry);
router.delete("/:id", deleteCalendarEntry);

export default router;
