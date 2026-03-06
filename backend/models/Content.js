// models/Content.js
// Content model for storing generated content (titles, scripts, thumbnails)
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["title", "script", "thumbnail"],
      required: true,
    },
    prompt: {
      type: String,
      required: true, // The input from user
    },
    generatedContent: {
      type: mongoose.Schema.Types.Mixed, // Can be string, array, or object
      required: true,
    },
    metadata: {
      // Additional info based on type
      topic: String,
      audience: String,
      videoLength: String,
      style: String,
    },
  },
  { timestamps: true },
);

// Index for faster queries
contentSchema.index({ userId: 1, type: 1, createdAt: -1 });

export default mongoose.model("Content", contentSchema);
