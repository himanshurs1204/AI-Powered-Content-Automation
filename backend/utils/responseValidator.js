/**
 * Response Validator and Cleaner
 * =============================
 * Validates AI responses against expected structure
 * and cleans/formats data before storing in database
 */

/**
 * Parse JSON response safely
 * @param {string} response - Raw response text from AI
 * @returns {Object} Parsed JSON or error object
 */
export const parseJSONResponse = (response) => {
  try {
    // Remove markdown code blocks if present
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse
        .replace(/```json\n?/, "")
        .replace(/```$/, "");
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse
        .replace(/```\n?/, "")
        .replace(/```$/, "");
    }

    const parsed = JSON.parse(cleanedResponse);
    return { success: true, data: parsed };
  } catch (error) {
    console.error("JSON Parse Error:", error.message);
    return {
      success: false,
      error: `Invalid JSON response: ${error.message}`,
      rawResponse: response,
    };
  }
};

/**
 * Validate blog titles response
 * @param {Object} data - Parsed response data
 * @returns {Object} Validation result with cleaned data
 */
export const validateBlogTitles = (data) => {
  const errors = [];
  const warnings = [];

  // Check required fields
  if (!data.titles || !Array.isArray(data.titles)) {
    errors.push("Missing or invalid 'titles' array");
  } else {
    // Validate each title
    data.titles = data.titles.map((title, index) => {
      const cleaned = {
        title: String(title.title || "").trim(),
        powerWord: String(title.powerWord || "").trim(),
        isNumbered: Boolean(title.isNumbered),
        isQuestion: Boolean(title.isQuestion),
        seoScore: Number(title.seoScore) || 0,
      };

      // Validate title
      if (!cleaned.title || cleaned.title.length === 0) {
        errors.push(`Title ${index + 1}: Empty title`);
      } else if (cleaned.title.length > 100) {
        warnings.push(
          `Title ${index + 1}: Title is longer than recommended (100 chars)`,
        );
      }

      if (cleaned.seoScore < 0 || cleaned.seoScore > 10) {
        warnings.push(`Title ${index + 1}: SEO score adjusted to valid range`);
        cleaned.seoScore = Math.max(0, Math.min(10, cleaned.seoScore));
      }

      return cleaned;
    });
  }

  // Check for minimum titles
  if (data.titles && data.titles.length < 3) {
    warnings.push(
      `Only ${data.titles.length} titles generated. Minimum recommended is 3.`,
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    data: {
      titles: data.titles || [],
      topic: String(data.topic || "").trim(),
      audience: String(data.audience || "").trim(),
      generatedAt: data.generatedAt || new Date().toISOString(),
    },
  };
};

/**
 * Validate YouTube script response
 * @param {Object} data - Parsed response data
 * @returns {Object} Validation result with cleaned data
 */
export const validateYoutubeScript = (data) => {
  const errors = [];
  const warnings = [];

  if (!data.script) {
    errors.push("Missing 'script' object");
    return { valid: false, errors, warnings, data: null };
  }

  const script = data.script;

  // Validate intro
  if (!script.intro || !script.intro.fullText) {
    errors.push("Missing or invalid intro section");
  }

  // Validate main content
  if (!script.mainContent || !Array.isArray(script.mainContent)) {
    errors.push("Missing or invalid mainContent array");
  } else if (script.mainContent.length === 0) {
    warnings.push("No main content sections provided");
  } else {
    script.mainContent = script.mainContent.map((section, index) => ({
      section: String(section.section || `Section ${index + 1}`).trim(),
      content: String(section.content || "").trim(),
      transition: String(section.transition || "").trim(),
      wordCount: Number(section.wordCount) || 0,
    }));
  }

  // Validate conclusion
  if (!script.conclusion || !script.conclusion.fullText) {
    errors.push("Missing or invalid conclusion section");
  }

  // Clean metadata
  if (!script.metadata) {
    script.metadata = {};
  }

  script.metadata = {
    topic: String(script.metadata.topic || "").trim(),
    videoLength: String(script.metadata.videoLength || "").trim(),
    estimatedDuration: String(script.metadata.estimatedDuration || "").trim(),
    totalWordCount: Number(script.metadata.totalWordCount) || 0,
    engagementScore: Math.max(
      0,
      Math.min(10, Number(script.metadata.engagementScore) || 5),
    ),
  };

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    data: {
      script,
      generatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Validate thumbnail idea response
 * @param {Object} data - Parsed response data
 * @returns {Object} Validation result with cleaned data
 */
export const validateThumbnailIdea = (data) => {
  const errors = [];
  const warnings = [];

  if (!data.thumbnail) {
    errors.push("Missing 'thumbnail' object");
    return { valid: false, errors, warnings, data: null };
  }

  const thumbnail = data.thumbnail;

  // Validate main text
  if (!thumbnail.mainText || !thumbnail.mainText.text) {
    errors.push("Missing main thumbnail text");
  } else {
    const wordCount = thumbnail.mainText.text.split(" ").length;
    if (wordCount > 4) {
      warnings.push(
        `Main text has ${wordCount} words. Recommended maximum is 4.`,
      );
      thumbnail.mainText.text = thumbnail.mainText.text
        .split(" ")
        .slice(0, 4)
        .join(" ");
    }
  }

  // Validate design elements
  if (!Array.isArray(thumbnail.designElements)) {
    warnings.push("Missing or invalid design elements array");
    thumbnail.designElements = [];
  } else {
    thumbnail.designElements = thumbnail.designElements.map((el) => ({
      element: String(el.element || "").trim(),
      description: String(el.description || "").trim(),
      position: String(el.position || "").trim(),
      purpose: String(el.purpose || "").trim(),
    }));
  }

  // Validate color scheme
  if (!thumbnail.colorScheme) {
    errors.push("Missing color scheme");
  } else {
    thumbnail.colorScheme = {
      primary: String(thumbnail.colorScheme.primary || "#000000").trim(),
      secondary: String(thumbnail.colorScheme.secondary || "#FFFFFF").trim(),
      accent: String(thumbnail.colorScheme.accent || "#FF0000").trim(),
      background: String(thumbnail.colorScheme.background || "#FFFFFF").trim(),
      rationale: String(thumbnail.colorScheme.rationale || "").trim(),
    };
  }

  // Validate tips
  if (!Array.isArray(thumbnail.tips)) {
    warnings.push("Missing tips array");
    thumbnail.tips = [];
  } else {
    thumbnail.tips = thumbnail.tips
      .map((tip) => String(tip).trim())
      .filter((tip) => tip);
  }

  // Validate metadata
  if (!thumbnail.metadata) {
    thumbnail.metadata = {};
  }

  thumbnail.metadata = {
    style: String(thumbnail.metadata.style || "").trim(),
    clickThroughRateScore: Math.max(
      1,
      Math.min(10, Number(thumbnail.metadata.clickThroughRateScore) || 5),
    ),
    trendRating: String(thumbnail.metadata.trendRating || "evergreen").trim(),
    recommendedFont: String(
      thumbnail.metadata.recommendedFont || "Arial Bold",
    ).trim(),
  };

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    data: {
      thumbnail: {
        mainText: {
          text: thumbnail.mainText?.text || "",
          fontSize: thumbnail.mainText?.fontSize || "huge",
          fontWeight: thumbnail.mainText?.fontWeight || "bold",
          color: thumbnail.mainText?.color || "#000000",
          position: thumbnail.mainText?.position || "center",
        },
        designElements: thumbnail.designElements,
        colorScheme: thumbnail.colorScheme,
        layout: {
          guide: String(thumbnail.layout?.guide || "").trim(),
          safeZone: "text should be in center 50% of image",
          balance: String(thumbnail.layout?.balance || "").trim(),
        },
        tips: thumbnail.tips,
        emotionalApproach: String(thumbnail.emotionalApproach || "").trim(),
        metadata: thumbnail.metadata,
      },
      generatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Validate thumbnail image response
 * @param {Object} data - Parsed response data or raw response
 * @returns {Object} Validation result with cleaned data
 */
export const validateThumbnailImage = (data) => {
  const errors = [];
  const warnings = [];

  // For image generation, we might get a description instead of structured data
  let imageData = data.image || data;

  if (!imageData || typeof imageData !== "object") {
    errors.push("Invalid image data structure");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    data: {
      image: {
        fileName: String(imageData.fileName || `thumbnail-${Date.now()}.png`),
        filePath: String(imageData.filePath || ""),
        url: String(imageData.url || ""),
        mimeType: String(imageData.mimeType || "image/png"),
        size: Number(imageData.size) || 0,
        metadata: {
          dimensions: "1280x720",
          style: String(imageData.style || "").trim(),
          videoTitle: String(imageData.videoTitle || "").trim(),
          createdAt: new Date().toISOString(),
          format: "PNG",
        },
        design: {
          mainElements: Array.isArray(imageData.mainElements)
            ? imageData.mainElements.map((el) => String(el).trim())
            : [],
          colorPalette: Array.isArray(imageData.colorPalette)
            ? imageData.colorPalette.map((c) => String(c).trim())
            : [],
          textElements: Array.isArray(imageData.textElements)
            ? imageData.textElements.map((t) => String(t).trim())
            : [],
          focusPoint: String(imageData.focusPoint || "center").trim(),
          ctrScore: Math.max(1, Math.min(10, Number(imageData.ctrScore) || 7)),
        },
      },
    },
  };
};

/**
 * Main validator orchestrator
 * @param {string} type - Response type (blogTitles, youtubeScript, etc)
 * @param {string} rawResponse - Raw response from AI
 * @returns {Object} Complete validation result
 */
export const validateAndCleanResponse = (type, rawResponse) => {
  // Parse JSON
  const parseResult = parseJSONResponse(rawResponse);

  if (!parseResult.success) {
    return {
      success: false,
      type,
      parseError: parseResult.error,
      rawResponse: parseResult.rawResponse,
      validatedData: null,
    };
  }

  // Validate based on type
  let validationResult;
  switch (type) {
    case "blogTitles":
      validationResult = validateBlogTitles(parseResult.data);
      break;
    case "youtubeScript":
      validationResult = validateYoutubeScript(parseResult.data);
      break;
    case "thumbnailIdea":
      validationResult = validateThumbnailIdea(parseResult.data);
      break;
    case "thumbnailImage":
      validationResult = validateThumbnailImage(parseResult.data);
      break;
    default:
      return {
        success: false,
        type,
        error: `Unknown response type: ${type}`,
        validatedData: null,
      };
  }

  return {
    success: validationResult.valid,
    type,
    errors: validationResult.errors,
    warnings: validationResult.warnings,
    validatedData: validationResult.data,
  };
};

/**
 * Format data for storage
 * @param {Object} validatedData - Validated data from validator
 * @returns {Object} Clean data ready for database storage
 */
export const formatForStorage = (type, validatedData) => {
  return {
    type,
    data: validatedData,
    storedAt: new Date().toISOString(),
    version: "1.0",
  };
};
