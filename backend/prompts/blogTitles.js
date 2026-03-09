/**
 * Blog Titles Prompt Configuration
 * ================================
 * Generates SEO-friendly and engaging blog titles
 */

export const generateBlogTitlesPrompt = (topic, audience) => {
  return `You are an expert content strategist and SEO specialist. Your task is to generate 5 creative, SEO-friendly, and highly engaging blog titles.

TOPIC: ${topic}
TARGET AUDIENCE: ${audience}

REQUIREMENTS FOR EACH TITLE:
1. Must be between 50-70 characters
2. Include at least one power word (e.g., Essential, Ultimate, Secret, Proven, etc.)
3. Should evoke curiosity or promise value
4. SEO-optimized with relevant keywords
5. Must be clickable and engaging
6. Could include numbers or questions where appropriate

STRICT OUTPUT FORMAT:
Return ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{
  "titles": [
    {"title": "Title 1", "powerWord": "word", "isNumbered": false, "isQuestion": false, "seoScore": 8.5},
    {"title": "Title 2", "powerWord": "word", "isNumbered": true, "isQuestion": false, "seoScore": 8.2}
  ],
  "topic": "${topic}",
  "audience": "${audience}",
  "generatedAt": "timestamp"
}

Ensure valid JSON syntax. No extra text before or after the JSON.`;
};

export const blogTitlesResponseStructure = {
  titles: [
    {
      title: "string",
      powerWord: "string",
      isNumbered: "boolean",
      isQuestion: "boolean",
      seoScore: "number",
    },
  ],
  topic: "string",
  audience: "string",
  generatedAt: "string",
};
