// services/aiService.js
// AI Service - Handles Gemini AI API calls using REST API
import * as fs from "node:fs";
import path from "node:path";

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
    const prompt = `Generate 5 creative and SEO-friendly blog titles for the following:
Topic: ${topic}
Target Audience: ${audience}

Return the titles as a numbered list (1-5). Make them engaging and clickable.`;

    const text = await callGeminiAPI("gemini-3-flash-preview", prompt);

    // Parse the response to extract titles
    const titles = text
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter((line) => line.length > 0);

    return titles;
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
    const lengthGuide = {
      short: "2-3 minutes",
      medium: "5-10 minutes",
      long: "15+ minutes",
    };

    const prompt = `Create a YouTube video script for a ${lengthGuide[videoLength] || videoLength} video about: ${topic}

Structure the script with:
1. **INTRO** (Hook the viewer in 15-30 seconds)
2. **MAIN CONTENT** (Divided into sections if needed)
3. **CONCLUSION** (Call to action and closing)

Make it engaging, natural, and suitable for video narration.`;

    const text = await callGeminiAPI("gemini-3-flash-preview", prompt);

    // Parse sections
    const sections = {
      intro: extractSection(text, "INTRO"),
      content: extractSection(text, "MAIN CONTENT"),
      conclusion: extractSection(text, "CONCLUSION"),
      full: text,
    };

    return sections;
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
    const prompt = `Create a thumbnail idea for a ${style} YouTube video with the title: "${videoTitle}"

Provide:
1. **Main Text for Thumbnail** - Short, punchy text (max 3-4 words)
2. **Design Elements** - What visual elements/graphics to include
3. **Color Scheme** - Recommended colors that pop
4. **Tips** - Best practices for this thumbnail

Format your response clearly with these sections.`;

    const text = await callGeminiAPI("gemini-3-flash-preview", prompt);

    const thumbnail = {
      mainText: extractSection(text, "Main Text"),
      designElements: extractSection(text, "Design Elements"),
      colorScheme: extractSection(text, "Color Scheme"),
      tips: extractSection(text, "Tips"),
      full: text,
    };

    return thumbnail;
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
    const prompt = `Create a professional YouTube thumbnail image for a ${style} video titled "${videoTitle}". 
Make it visually striking with:
- Bold, readable text (max 3 words)
- Contrasting colors
- Attention-grabbing design
- Professional layout`;

    const text = await callGeminiAPI("gemini-3.1-flash-image-preview", prompt);

    // For image generation, return the description for now
    // In production, you would need to handle image data properly
    const fileName = `thumbnail-${Date.now()}.txt`;
    const filePath = path.join(process.cwd(), "uploads", fileName);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save the description
    fs.writeFileSync(filePath, text);

    return {
      fileName,
      filePath: `/uploads/${fileName}`,
      url: `/api/uploads/${fileName}`,
      description: text,
      generated: new Date(),
    };
  } catch (error) {
    console.error("Error generating thumbnail image:", error.message);
    throw new Error(
      `Failed to generate thumbnail image: ${error.message || "Unknown error"}`,
    );
  }
};

/**
 * Helper function to extract sections from the response
 * @param {string} text - Full response text
 * @param {string} sectionName - Section name to extract
 * @returns {string} Extracted section content
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
