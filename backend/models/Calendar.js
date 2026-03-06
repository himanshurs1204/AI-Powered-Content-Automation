// models/Calendar.js
// Calendar model for managing content publishing schedules
import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    platform: {
      type: String,
      enum: ["Blog", "YouTube", "Instagram"],
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Published"],
      default: "Planned",
    },
    description: {
      type: String,
      maxlength: 500,
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content", // Link to generated content if applicable
    },
  },
  { timestamps: true },
);

// Index for faster queries
calendarSchema.index({ userId: 1, date: 1 });

export default mongoose.model("Calendar", calendarSchema);
