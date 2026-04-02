// Bug fix: was entirely dead code and contradicted runtime values.
// Now uses the correct unified gen.pollinations.ai domain and is imported by route.ts + ResultCard.tsx.

export const TEXT_MODEL = "gemini-fast";
export const IMAGE_MODEL = "flux";

// Unified base domain for all Pollinations API calls (text + image)
export const GEN_BASE_URL = "https://gen.pollinations.ai";

export const SYSTEM_PROMPT = `You are a High-End Creative Director. Output ONLY raw JSON.
Structure:
{
  "hook": "Aggressive high-stakes curiosity gap (max 10 words)",
  "body": "3 cinematic sentences with elite vocabulary and heavy impact.",
  "imagePrompt": "Cinematic photography, [Subject], hyper-detailed, 8k, moody lighting, shot on 35mm, high contrast, professional color grade, anamorphic lens flares."
}
RULES: No slang. No cringe. No markdown backticks.`;

