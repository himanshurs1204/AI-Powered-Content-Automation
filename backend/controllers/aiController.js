// controllers/aiController.js
// Controller for AI-powered content generation
import Content from "../models/Content.js";
import {
  generateBlogTitles as generateBlogTitlesAI,
  generateYoutubeScript as generateYoutubeScriptAI,
  generateThumbnailIdea as generateThumbnailIdeaAI,
  generateThumbnailImage as generateThumbnailImageAI,
} from "../services/aiService.js";

// @route   POST /api/ai/blog-titles
// @desc    Generate blog title ideas
// @access  Private
export const generateBlogTitles = async (req, res) => {
  try {
    const { topic, audience } = req.body;

    if (!topic) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a topic" });
    }

    // Call AI service
    const titles = await generateBlogTitlesAI(
      topic,
      audience || "general audience",
    );

    // Save to database
    const content = await Content.create({
      userId: req.user._id,
      type: "title",
      prompt: `Topic: ${topic}, Audience: ${audience}`,
      generatedContent: titles,
      metadata: {
        topic,
        audience,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        id: content._id,
        titles,
      },
    });
  } catch (error) {
    console.error("Error generating blog titles:", {
      message: error.message,
      stack: error.stack,
      status: error.status,
    });
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate blog titles",
    });
  }
};

// @route   POST /api/ai/youtube-script
// @desc    Generate YouTube script
// @access  Private
export const generateYoutubeScript = async (req, res) => {
  try {
    const { topic, videoLength } = req.body;

    if (!topic || !videoLength) {
      return res.status(400).json({
        success: false,
        message: "Please provide topic and video length",
      });
    }

    // Call AI service
    const script = await generateYoutubeScriptAI(topic, videoLength);

    // Save to database
    const content = await Content.create({
      userId: req.user._id,
      type: "script",
      prompt: `Topic: ${topic}, Length: ${videoLength}`,
      generatedContent: script,
      metadata: {
        topic,
        videoLength,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        id: content._id,
        script,
      },
    });
  } catch (error) {
    console.error("Error generating YouTube script:", {
      message: error.message,
      stack: error.stack,
      status: error.status,
    });
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate YouTube script",
    });
  }
};

// @route   POST /api/ai/thumbnail
// @desc    Generate thumbnail idea
// @access  Private
export const generateThumbnail = async (req, res) => {
  try {
    const { videoTitle, style } = req.body;

    if (!videoTitle || !style) {
      return res.status(400).json({
        success: false,
        message: "Please provide video title and style",
      });
    }

    // Call AI service
    const thumbnailIdea = await generateThumbnailIdeaAI(videoTitle, style);

    // Save to database
    const content = await Content.create({
      userId: req.user._id,
      type: "thumbnail",
      prompt: `Title: ${videoTitle}, Style: ${style}`,
      generatedContent: thumbnailIdea,
      metadata: {
        videoTitle,
        style,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        id: content._id,
        thumbnail: thumbnailIdea,
      },
    });
  } catch (error) {
    console.error("Error generating thumbnail idea:", {
      message: error.message,
      stack: error.stack,
      status: error.status,
    });
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate thumbnail idea",
    });
  }
};

// @route   POST /api/ai/thumbnail-image
// @desc    Generate thumbnail image using Gemini Vision
// @access  Private
export const generateThumbnailImageController = async (req, res) => {
  try {
    const { videoTitle, style } = req.body;

    if (!videoTitle || !style) {
      return res.status(400).json({
        success: false,
        message: "Please provide video title and style",
      });
    }

    // Call AI service to generate image
    const imageData = await generateThumbnailImageAI(videoTitle, style);

    // Save to database
    const content = await Content.create({
      userId: req.user._id,
      type: "thumbnail-image",
      prompt: `Generate image for: ${videoTitle} (${style})`,
      generatedContent: imageData,
      metadata: {
        videoTitle,
        style,
        imageUrl: imageData.url,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        id: content._id,
        image: imageData,
      },
    });
  } catch (error) {
    console.error("Error generating thumbnail image:", {
      message: error.message,
      stack: error.stack,
      status: error.status,
    });
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate thumbnail image",
    });
  }
};
