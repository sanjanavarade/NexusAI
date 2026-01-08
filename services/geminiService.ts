
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface AITriageResult {
  riskScore: number;
  category: string;
  suggestedSteps: string[];
  summary: string;
}

/**
 * Analyzes an incident description and returns a structured triage report.
 * Uses Gemini-3-Flash for low-latency, cost-effective reasoning.
 */
export const analyzeIncident = async (description: string): Promise<AITriageResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform an emergency triage analysis on the following incident report: "${description}"`,
      config: {
        systemInstruction: "You are a senior crisis management analyst. Your goal is to assess risk and provide immediate actionable steps.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: {
              type: Type.NUMBER,
              description: "A scale from 1 (minimal) to 10 (catastrophic).",
            },
            category: {
              type: Type.STRING,
              description: "The primary domain: FIRE, MEDICAL, SECURITY, TECHNICAL, or NATURAL_DISASTER.",
            },
            suggestedSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Immediate 3-5 response protocols.",
            },
            summary: {
              type: Type.STRING,
              description: "A concise 20-word executive summary.",
            },
          },
          required: ["riskScore", "category", "suggestedSteps", "summary"],
        },
      },
    });

    const resultStr = response.text.trim();
    return JSON.parse(resultStr) as AITriageResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback logic
    return {
      riskScore: 5,
      category: "UNCATEGORIZED",
      suggestedSteps: ["Await manual dispatcher review", "Check communication lines"],
      summary: "AI analysis failed. Please triage manually."
    };
  }
};
