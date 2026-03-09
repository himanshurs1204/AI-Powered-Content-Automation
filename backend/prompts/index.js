/**
 * Prompts Index
 * ============
 * Central export point for all AI prompts
 */

export {
  generateBlogTitlesPrompt,
  blogTitlesResponseStructure,
} from "./blogTitles.js";
export {
  generateYoutubeScriptPrompt,
  youtubeScriptResponseStructure,
} from "./youtubeScript.js";
export {
  generateThumbnailIdeaPrompt,
  thumbnailIdeaResponseStructure,
} from "./thumbnailIdea.js";
export {
  generateThumbnailImagePrompt,
  generateThumbnailImageAdvancedPrompt,
  thumbnailImageResponseStructure,
} from "./thumbnailImage.js";

/**
 * Utility function to get prompt with validation
 */
export const getPrompt = async (promptType, ...args) => {
  if (promptType === "blogTitles") {
    const { generateBlogTitlesPrompt } = await import("./blogTitles.js");
    return generateBlogTitlesPrompt(...args);
  } else if (promptType === "youtubeScript") {
    const { generateYoutubeScriptPrompt } = await import("./youtubeScript.js");
    return generateYoutubeScriptPrompt(...args);
  } else if (promptType === "thumbnailIdea") {
    const { generateThumbnailIdeaPrompt } = await import("./thumbnailIdea.js");
    return generateThumbnailIdeaPrompt(...args);
  } else if (promptType === "thumbnailImage") {
    const { generateThumbnailImagePrompt } =
      await import("./thumbnailImage.js");
    return generateThumbnailImagePrompt(...args);
  } else {
    throw new Error(`Unknown prompt type: ${promptType}`);
  }
};
