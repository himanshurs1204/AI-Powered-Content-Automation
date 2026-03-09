/**
 * Thumbnail Image Prompt Configuration
 * ===================================
 * Generates detailed instructions for AI image generation
 */

export const generateThumbnailImagePrompt = (videoTitle, style) => {
  const styleDescriptions = {
    tech: "technology/programming/software focused with modern, sleek design",
    educational: "educational/learning focused with clear, professional design",
    motivational:
      "motivational/inspirational with energetic, positive visual tone",
    entertainment: "entertaining/fun focused with vibrant, playful design",
    business:
      "business/professional focused with corporate, trustworthy design",
    gaming: "gaming/streaming focused with bold, action-packed design",
  };

  const styleDesc = styleDescriptions[style] || style;

  return `Create a PROFESSIONAL YouTube thumbnail image for this video:

TITLE: "${videoTitle}"
STYLE: ${styleDesc}

CRITICAL SPECIFICATIONS:
- Dimensions: 1280x720px (16:9 aspect ratio)
- Design must work at 168x94px (thumbnail size)
- Text-safe area: centered 1024x576px minimum for critical elements
- Maximum text elements: 3-4 words in bold, large fonts
- Contrast ratio minimum: 4.5:1 for all text elements

DESIGN INSTRUCTIONS:
1. Create a BOLD, CLEAN thumbnail design
2. Use HIGH CONTRAST colors (complementary or contrasting hues)
3. Include ONE focal point that draws attention
4. Add directional cue (arrow, pointer, or eye-tracking element)
5. Ensure all text is MASSIVE and EASILY READABLE
6. Use shapes/highlights to frame important elements
7. Maintain professional quality appropriate for the style
8. Avoid clutter - white space is valuable
9. Include 1-2 relevant icons or visual elements for the niche
10. Make it instantly recognizable as YouTube content

DESIGN STYLE DETAILS:
- For ${style}: Apply design principles that appeal to ${style} audience
- These usually include [specific visual cues for ${style}]
- Use color psychology appropriate for appeal and viral potential

OUTPUT:
Generate the actual thumbnail image based on these exact specifications. Make it visually striking, professional, and optimized for maximum click-through rate on YouTube.`;
};

export const generateThumbnailImageAdvancedPrompt = (
  videoTitle,
  style,
  customBriefing,
) => {
  return `${generateThumbnailImagePrompt(videoTitle, style)}

ADDITIONAL BRIEFING:
${customBriefing || "Use best practices for YouTube thumbnail design"}

The created image should be ready for direct upload to YouTube.`;
};

export const thumbnailImageResponseStructure = {
  image: {
    fileName: "string",
    filePath: "string",
    url: "string",
    mimeType: "string",
    size: "number",
    metadata: {
      dimensions: "1280x720",
      style: "string",
      videoTitle: "string",
      createdAt: "string",
      format: "string (PNG/JPG)",
    },
    design: {
      mainElements: ["string"],
      colorPalette: ["string"],
      textElements: ["string"],
      focusPoint: "string",
      ctrScore: "number",
    },
  },
};
