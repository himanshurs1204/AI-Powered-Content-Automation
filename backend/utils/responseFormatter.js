/**
 * Response Formatter
 * =================
 * Formats validated responses for client consumption
 * and database storage
 */

/**
 * Format blog titles for response
 * @param {Object} validatedData - Validated blog titles data
 * @returns {Object} Formatted response
 */
export const formatBlogTitlesResponse = (validatedData) => {
  const { data } = validatedData;

  return {
    type: "blog-titles",
    count: data.titles.length,
    titles: data.titles.map((title) => ({
      id: `title-${Math.random().toString(36).substr(2, 9)}`,
      title: title.title,
      metadata: {
        powerWord: title.powerWord,
        isNumbered: title.isNumbered,
        isQuestion: title.isQuestion,
        seoScore: title.seoScore,
      },
    })),
    context: {
      topic: data.topic,
      audience: data.audience,
      generatedAt: data.generatedAt,
    },
  };
};

/**
 * Format YouTube script for response
 * @param {Object} validatedData - Validated script data
 * @returns {Object} Formatted response
 */
export const formatYoutubeScriptResponse = (validatedData) => {
  const { script, generatedAt } = validatedData;

  return {
    type: "youtube-script",
    sections: {
      intro: {
        hook: script.intro.hook,
        preview: script.intro.preview,
        wordCount: script.intro.wordCount,
        fullContent: script.intro.fullText,
      },
      mainContent: script.mainContent.map((section) => ({
        id: `section-${Math.random().toString(36).substr(2, 9)}`,
        title: section.section,
        content: section.content,
        transition: section.transition,
        wordCount: section.wordCount,
      })),
      engagement: {
        type: script.engagement.type,
        content: script.engagement.content,
        impact: script.engagement.impact,
      },
      conclusion: {
        summary: script.conclusion.summary,
        cta: script.conclusion.cta,
        fullContent: script.conclusion.fullText,
      },
      outro: script.outro,
    },
    statistics: {
      totalWordCount: script.metadata.totalWordCount,
      estimatedDuration: script.metadata.estimatedDuration,
      engagementScore: script.metadata.engagementScore,
      sectionCount: script.mainContent.length,
    },
    metadata: {
      videoLength: script.metadata.videoLength,
      topic: script.metadata.topic,
      generatedAt,
    },
  };
};

/**
 * Format thumbnail idea for response
 * @param {Object} validatedData - Validated thumbnail data
 * @returns {Object} Formatted response
 */
export const formatThumbnailIdeaResponse = (validatedData) => {
  const { thumbnail, generatedAt } = validatedData;

  return {
    type: "thumbnail-idea",
    design: {
      mainText: {
        content: thumbnail.mainText.text,
        styling: {
          fontSize: thumbnail.mainText.fontSize,
          fontWeight: thumbnail.mainText.fontWeight,
          color: thumbnail.mainText.color,
          position: thumbnail.mainText.position,
        },
      },
      elements: thumbnail.designElements.map((el) => ({
        id: `element-${Math.random().toString(36).substr(2, 9)}`,
        type: el.element,
        description: el.description,
        position: el.position,
        purpose: el.purpose,
      })),
      colors: {
        primary: thumbnail.colorScheme.primary,
        secondary: thumbnail.colorScheme.secondary,
        accent: thumbnail.colorScheme.accent,
        background: thumbnail.colorScheme.background,
        explanation: thumbnail.colorScheme.rationale,
      },
      layout: {
        structure: thumbnail.layout.guide,
        safeZone: thumbnail.layout.safeZone,
        balancing: thumbnail.layout.balance,
      },
    },
    guidelines: {
      tips: thumbnail.tips.map((tip, index) => ({
        id: `tip-${index + 1}`,
        content: tip,
      })),
      emotionalTone: thumbnail.emotionalApproach,
      font: thumbnail.metadata.recommendedFont,
    },
    performance: {
      clickThroughRateScore: thumbnail.metadata.clickThroughRateScore,
      trend: thumbnail.metadata.trendRating,
      style: thumbnail.metadata.style,
    },
    generatedAt,
  };
};

/**
 * Format thumbnail image for response
 * @param {Object} validatedData - Validated image data
 * @returns {Object} Formatted response
 */
export const formatThumbnailImageResponse = (validatedData) => {
  const { image, generatedAt } = validatedData;

  return {
    type: "thumbnail-image",
    file: {
      fileName: image.fileName,
      filePath: image.filePath,
      url: image.url,
      mimeType: image.mimeType,
      size: image.size,
    },
    design: {
      dimensions: image.metadata.dimensions,
      format: image.metadata.format,
      mainElements: image.design.mainElements,
      colorPalette: image.design.colorPalette,
      textElements: image.design.textElements,
      focusPoint: image.design.focusPoint,
      performance: {
        estimatedCTR: image.design.ctrScore,
      },
    },
    metadata: {
      style: image.metadata.style,
      videoTitle: image.metadata.videoTitle,
      createdAt: image.metadata.createdAt,
    },
    generatedAt,
  };
};

/**
 * Main response formatter orchestrator
 * @param {string} type - Response type
 * @param {Object} validatedData - Validated data
 * @returns {Object} Formatted response
 */
export const formatForClient = (type, validatedData) => {
  switch (type) {
    case "blogTitles":
      return formatBlogTitlesResponse(validatedData);
    case "youtubeScript":
      return formatYoutubeScriptResponse(validatedData);
    case "thumbnailIdea":
      return formatThumbnailIdeaResponse(validatedData);
    case "thumbnailImage":
      return formatThumbnailImageResponse(validatedData);
    default:
      return {
        type,
        data: validatedData,
        generatedAt: new Date().toISOString(),
      };
  }
};

/**
 * Remove sensitive data before storage
 * @param {Object} data - Data to clean
 * @returns {Object} Cleaned data
 */
export const removeSensitiveData = (data) => {
  const cleaned = JSON.parse(JSON.stringify(data)); // Deep copy

  // Remove any fields that might contain sensitive info
  const sensitiveFields = [
    "apiKey",
    "token",
    "secret",
    "password",
    "credentials",
  ];

  const removeFromObject = (obj) => {
    if (typeof obj !== "object" || obj === null) return obj;

    Object.keys(obj).forEach((key) => {
      if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        removeFromObject(obj[key]);
      }
    });

    return obj;
  };

  return removeFromObject(cleaned);
};

/**
 * Add tracking and audit information
 * @param {Object} data - Data to augment
 * @param {string} userId - User ID
 * @returns {Object} Augmented data
 */
export const addAuditInfo = (data, userId) => {
  return {
    ...data,
    audit: {
      userId,
      createdAt: new Date().toISOString(),
      version: "1.0",
      validated: true,
      cleaned: true,
    },
  };
};
