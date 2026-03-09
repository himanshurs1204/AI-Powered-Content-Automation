// services/aiService.js
// AI Service - Handles Gemini AI API calls using REST API
import * as fs from "node:fs";
import path from "node:path";
import {
  generateBlogTitlesPrompt,
  generateYoutubeScriptPrompt,
  generateThumbnailIdeaPrompt,
  generateThumbnailImagePrompt,
} from "../prompts/index.js";
import {
  validateAndCleanResponse,
  formatForStorage,
} from "../utils/responseValidator.js";
import {
  formatForClient,
  addAuditInfo,
  removeSensitiveData,
} from "../utils/responseFormatter.js";

// Gemini API base URL
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * Get and validate API key
 * @returns {string} The API key
 */
const getApiKey = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error(
      "❌ GEMINI_API_KEY is not set in environment variables. Check your .env file.",
    );
    throw new Error("GEMINI_API_KEY is not configured");
  }

  return apiKey;
};

/**
 * Helper function to call Gemini API directly via REST
 * @param {string} model - Model name (e.g., "gemini-3-flash-preview")
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string>} The response text
 */
const callGeminiAPI = async (model, prompt) => {
  try {
    const apiKey = getApiKey();

    const response = await fetch(
      `${GEMINI_API_URL}/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API Error (${response.status}): ${errorData.error?.message || "Unknown error"}`,
      );
    }

    const data = await response.json();

    if (
      !data.candidates ||
      data.candidates.length === 0 ||
      !data.candidates[0].content
    ) {
      throw new Error("No response from Gemini API. Check your API key.");
    }

    const text = data.candidates[0].content.parts
      .map((part) => part.text)
      .join("");

    return text;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw error;
  }
};

/**
 * Generate blog title ideas using Gemini AI
 * @param {string} topic - The blog topic
 * @param {string} audience - Target audience
 * @returns {Promise<Array>} Array of 5 blog title ideas
 */
export const generateBlogTitles = async (topic, audience) => {
  try {
    const prompt = generateBlogTitlesPrompt(topic, audience);

    const text = await callGeminiAPI("gemini-3-flash-preview", prompt);

    // Validate and clean response
    const validationResult = validateAndCleanResponse("blogTitles", text);

    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.errors);
      throw new Error(
        `Response validation failed: ${validationResult.errors.join(", ")}`,
      );
    }

    // Log warnings if any
    if (validationResult.warnings.length > 0) {
      console.warn("Validation warnings:", validationResult.warnings);
    }

    // Format for client
    const formattedResponse = formatForClient(
      "blogTitles",
      validationResult.validatedData,
    );

    return formattedResponse;
  } catch (error) {
    console.error("Error generating blog titles:", error.message);
    throw new Error(
      `Failed to generate blog titles: ${error.message || "Unknown error"}`,
    );
  }
};

/**
 * Generate YouTube script using Gemini AI
 * @param {string} topic - Video topic
 * @param {string} videoLength - Video length (short/medium/long)
 * @returns {Promise<Object>} Script with intro, content, and conclusion
 */
export const generateYoutubeScript = async (topic, videoLength) => {
  try {
    const prompt = generateYoutubeScriptPrompt(topic, videoLength);

    const text = await callGeminiAPI("gemini-3-flash-preview", prompt);

    // Validate and clean response
    const validationResult = validateAndCleanResponse("youtubeScript", text);

    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.errors);
      throw new Error(
        `Response validation failed: ${validationResult.errors.join(", ")}`,
      );
    }

    // Log warnings if any
    if (validationResult.warnings.length > 0) {
      console.warn("Validation warnings:", validationResult.warnings);
    }

    // Format for client
    const formattedResponse = formatForClient(
      "youtubeScript",
      validationResult.validatedData,
    );

    return formattedResponse;
  } catch (error) {
    console.error("Error generating YouTube script:", error.message);
    throw new Error(
      `Failed to generate YouTube script: ${error.message || "Unknown error"}`,
    );
  }
};

/**
 * Generate thumbnail idea using Gemini AI
 * @param {string} videoTitle - Video title
 * @param {string} style - Style of content (tech, educational, motivational)
 * @returns {Promise<Object>} Thumbnail idea with text and design suggestions
 */
export const generateThumbnailIdea = async (videoTitle, style) => {
  try {
    const prompt = generateThumbnailIdeaPrompt(videoTitle, style);

    const text = await callGeminiAPI("gemini-3-flash-preview", prompt);

    // Validate and clean response
    const validationResult = validateAndCleanResponse("thumbnailIdea", text);

    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.errors);
      throw new Error(
        `Response validation failed: ${validationResult.errors.join(", ")}`,
      );
    }

    // Log warnings if any
    if (validationResult.warnings.length > 0) {
      console.warn("Validation warnings:", validationResult.warnings);
    }

    // Format for client
    const formattedResponse = formatForClient(
      "thumbnailIdea",
      validationResult.validatedData,
    );

    return formattedResponse;
  } catch (error) {
    console.error("Error generating thumbnail idea:", error.message);
    throw new Error(
      `Failed to generate thumbnail idea: ${error.message || "Unknown error"}`,
    );
  }
};

/**
 * Generate thumbnail image using Gemini Vision API
 * @param {string} videoTitle - Video title
 * @param {string} style - Style of content (tech, educational, motivational)
 * @returns {Promise<Object>} Image path and metadata
 */
export const generateThumbnailImage = async (videoTitle, style) => {
  try {
    const prompt = generateThumbnailImagePrompt(videoTitle, style);

    const text = await callGeminiAPI("gemini-3.1-flash-image-preview", prompt);

    // Validate and clean response
    const validationResult = validateAndCleanResponse("thumbnailImage", {
      image: {
        fileName: `thumbnail-${Date.now()}.png`,
        style,
        videoTitle,
        description: text,
      },
    });

    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.errors);
      throw new Error(
        `Response validation failed: ${validationResult.errors.join(", ")}`,
      );
    }

    // Save file
    const fileName = `thumbnail-${Date.now()}.txt`;
    const filePath = path.join(process.cwd(), "uploads", fileName);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save the description
    fs.writeFileSync(filePath, text);

    const imageData = {
      ...validationResult.validatedData.image,
      filePath: `/uploads/${fileName}`,
      url: `/api/uploads/${fileName}`,
    };

    // Format for client
    const formattedResponse = formatForClient("thumbnailImage", {
      image: imageData,
      generatedAt: new Date().toISOString(),
    });

    return formattedResponse;
  } catch (error) {
    console.error("Error generating thumbnail image:", error.message);
    throw new Error(
      `Failed to generate thumbnail image: ${error.message || "Unknown error"}`,
    );
  }
};

/**
 * Helper function to extract sections from the response (Legacy - for backward compatibility)
 * @deprecated Use validators instead
 */
const extractSection = (text, sectionName) => {
  try {
    const regex = new RegExp(
      `\\*\\*${sectionName}\\*\\*\\s*(.+?)(?=\\*\\*|$)`,
      "is",
    );
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  } catch (error) {
    console.error(`Error extracting section ${sectionName}:`, error.message);
    return "";
  }
};
