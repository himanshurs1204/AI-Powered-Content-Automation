/**
 * YouTube Script Prompt Configuration
 * ===================================
 * Generates engaging YouTube video scripts with structured sections
 */

export const generateYoutubeScriptPrompt = (topic, videoLength) => {
  const lengthGuide = {
    short: { duration: "2-3 minutes", wordCount: "300-450" },
    medium: { duration: "5-10 minutes", wordCount: "900-1500" },
    long: { duration: "15+ minutes", wordCount: "3000-5000" },
  };

  const lengthParams = lengthGuide[videoLength] || lengthGuide.medium;

  return `You are a professional YouTube scriptwriter with expertise in viral content creation and audience engagement.

VIDEO TOPIC: ${topic}
VIDEO LENGTH: ${lengthParams.duration} (approximately ${lengthParams.wordCount} words)

IMPORTANT GUIDELINES:
1. Hook viewers within the first 15 seconds
2. Use conversational, natural language suitable for narration
3. Include strategic pauses for breathing
4. Add [VISUAL NOTES] for video elements
5. Keep paragraphs short (2-3 lines max) for readability
6. Include call-to-action (CTA) that's natural, not pushy
7. Build engagement throughout the script
8. Maintain consistent tone and pacing

REQUIRED SECTIONS:
1. INTRO - Hook, preview content, establish urgency
2. MAIN_CONTENT - Broken into logical subsections with transitions
3. ENGAGEMENT - Statistics, examples, or surprising facts
4. CONCLUSION - Summary, CTA, subscription ask
5. OUTRO - Graceful sign-off with next video teaser

STRICT OUTPUT FORMAT:
Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "script": {
    "intro": {
      "hook": "string",
      "preview": "string",
      "fullText": "string",
      "wordCount": number
    },
    "mainContent": [
      {
        "section": "string (section title)",
        "content": "string (section content with [VISUAL NOTES])",
        "transition": "string (transition to next section)",
        "wordCount": number
      }
    ],
    "engagement": {
      "type": "string (statistic/example/fact)",
      "content": "string",
      "impact": "high/medium/low"
    },
    "conclusion": {
      "summary": "string",
      "cta": "string",
      "fullText": "string"
    },
    "outro": "string",
    "metadata": {
      "topic": "${topic}",
      "videoLength": "${videoLength}",
      "estimatedDuration": "${lengthParams.duration}",
      "totalWordCount": number,
      "engagementScore": number
    }
  }
}

Ensure valid JSON syntax with no extra text.`;
};

export const youtubeScriptResponseStructure = {
  script: {
    intro: {
      hook: "string",
      preview: "string",
      fullText: "string",
      wordCount: "number",
    },
    mainContent: [
      {
        section: "string",
        content: "string",
        transition: "string",
        wordCount: "number",
      },
    ],
    engagement: {
      type: "string",
      content: "string",
      impact: "string",
    },
    conclusion: {
      summary: "string",
      cta: "string",
      fullText: "string",
    },
    outro: "string",
    metadata: {
      topic: "string",
      videoLength: "string",
      estimatedDuration: "string",
      totalWordCount: "number",
      engagementScore: "number",
    },
  },
};
