/**
 * Thumbnail Idea Prompt Configuration
 * ==================================
 * Generates professional thumbnail design ideas
 */

export const generateThumbnailIdeaPrompt = (videoTitle, style) => {
  const styleGuides = {
    tech: "Technology/Software/Programming",
    educational: "Educational/Learning/How-to",
    motivational: "Motivation/Inspiration/Self-help",
    entertainment: "Entertainment/Comedy/Fun",
    business: "Business/Finance/Entrepreneurship",
    gaming: "Gaming/Streaming/Esports",
  };

  const styleDescription = styleGuides[style] || style;

  return `You are an expert YouTube thumbnail designer with years of experience in content strategy and visual psychology.

VIDEO TITLE: "${videoTitle}"
CONTENT STYLE: ${styleDescription}

DESIGN PRINCIPLES TO FOLLOW:
1. Use high contrast colors (avoid similar hues)
2. Bold, readable text (maximum 3-4 words)
3. Include human emotion/expression when relevant
4. Use arrows, circles, or highlights to guide attention
5. Include a focal point that stands out
6. Maintain YouTube's recommended safe zone (1024x576px, text in center 25%)
7. Test readability at small sizes (thumbnail is usually 168x94px)
8. Use proven YouTube thumbnail trends for the content style

CRITICAL REQUIREMENTS:
- Main text must be HUGE and BOLD
- Contrast ratio must be at least 4.5:1 for accessibility
- Should be instantly recognizable at thumbnail size
- Must evoke curiosity or emotion

STRICT OUTPUT FORMAT:
Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "thumbnail": {
    "mainText": {
      "text": "string (max 4 words)",
      "fontSize": "string (relative: huge/large/medium)",
      "fontWeight": "bold/extra-bold",
      "color": "string (hex code or color name)",
      "position": "string (top/center/bottom)"
    },
    "designElements": [
      {
        "element": "string (arrow/circle/highlight/image/icon)",
        "description": "string",
        "position": "string",
        "purpose": "string (what it achieves)"
      }
    ],
    "colorScheme": {
      "primary": "string (hex or color name)",
      "secondary": "string (hex or color name)",
      "accent": "string (hex or color name)",
      "background": "string",
      "rationale": "string (why these colors work)"
    },
    "layout": {
      "guide": "string (description of layout)",
      "safeZone": "text should be in center 50% of image",
      "balance": "string (how to distribute elements)"
    },
    "tips": [
      "string (actionable tip 1)",
      "string (actionable tip 2)",
      "string (actionable tip 3)"
    ],
    "emotionalApproach": "string (what emotion should it evoke)",
    "metadata": {
      "style": "${style}",
      "clickThroughRateScore": "number (1-10, predicted CTR appeal)",
      "trendRating": "string (trending/evergreen/niche)",
      "recommendedFont": "string (e.g., Arial Bold, Impact)"
    }
  }
}

Ensure valid JSON syntax with no extra text.`;
};

export const thumbnailIdeaResponseStructure = {
  thumbnail: {
    mainText: {
      text: "string",
      fontSize: "string",
      fontWeight: "string",
      color: "string",
      position: "string",
    },
    designElements: [
      {
        element: "string",
        description: "string",
        position: "string",
        purpose: "string",
      },
    ],
    colorScheme: {
      primary: "string",
      secondary: "string",
      accent: "string",
      background: "string",
      rationale: "string",
    },
    layout: {
      guide: "string",
      safeZone: "string",
      balance: "string",
    },
    tips: ["string"],
    emotionalApproach: "string",
    metadata: {
      style: "string",
      clickThroughRateScore: "number",
      trendRating: "string",
      recommendedFont: "string",
    },
  },
};
