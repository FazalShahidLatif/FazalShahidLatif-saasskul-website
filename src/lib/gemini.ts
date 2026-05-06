/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

// Initialization with simple error handling
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please set it in the Secrets panel.");
  }
  return new GoogleGenAI({ apiKey });
};

export const ai = getAIClient();

export type ChatMode = "creative" | "technical" | "strategy" | "critique";

const MODE_INSTRUCTIONS: Record<ChatMode, string> = {
  creative: "You are a poetic, atmospheric creative writer. Use evocative language, metaphors, and rich imagery. Focus on mood and tone.",
  technical: "You are a senior software architect and programmer. Provide precise, efficient code and technical explanations. Focus on performance and best practices.",
  strategy: "You are a high-level product strategist. Think about market fit, scale, and long-term impact. Provide concise, actionable bullet points.",
  critique: "You are an honest, sharp-eyed critic. Find flaws in ideas or code and suggest rigorous improvements. Be direct but constructive."
};

export async function askGemini(prompt: string, mode: ChatMode = "creative") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: MODE_INSTRUCTIONS[mode],
        temperature: mode === "creative" ? 1.0 : 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
