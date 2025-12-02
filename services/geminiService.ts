
import { GoogleGenAI } from '@google/genai';

/**
 * Fetches actionable savings tips from the Gemini API.
 * @returns A promise that resolves to an array of strings, each representing a savings tip.
 */
export const fetchSavingsTips = async (): Promise<string[]> => {
  try {
    if (!process.env.API_KEY) {
      console.error('API_KEY is not set. Please ensure it is configured.');
      return ['API key is missing. Please contact support.'];
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelName = 'gemini-2.5-flash'; // Recommended for basic text tasks

    const prompt = `Provide 5 actionable and practical tips for improving personal savings, suitable for someone tracking their monthly income and expenses. Format them as a bulleted list.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    });

    const text = response.text;
    if (text) {
      // Parse the bulleted list into an array of strings
      return text.split('\n').filter(tip => tip.trim().startsWith('*')).map(tip => tip.trim().substring(1).trim());
    } else {
      return ['Could not retrieve savings tips.'];
    }
  } catch (error) {
    console.error('Error fetching savings tips from Gemini API:', error);
    if (error instanceof Error) {
        return [`Failed to fetch tips: ${error.message}. Please try again later.`];
    }
    return ['Failed to fetch tips. Please try again later.'];
  }
};
