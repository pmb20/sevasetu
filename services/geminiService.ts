
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

// Always use process.env.API_KEY directly and use the named parameter for initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeGrievance = async (description: string): Promise<AIAnalysisResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following public grievance for a government portal: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "Category like Infrastructure, Sanitation, Healthcare, Education, etc." },
            department: { type: Type.STRING, description: "Relevant government department like PWD, Health Dept, Municipal Corp, etc." },
            priority: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            estimatedResolutionDays: { type: Type.NUMBER },
            confidence: { type: Type.NUMBER, description: "0 to 1 confidence score" },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Actionable steps for the citizen to speed up the process"
            }
          },
          required: ["category", "department", "priority", "estimatedResolutionDays", "confidence", "suggestions"]
        }
      }
    });

    // Access the .text property directly, it is not a method.
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
};

export const chatWithAssistant = async (history: { role: string; content: string }[], message: string) => {
    const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: 'You are SevaSetu Assistant, a digital government official helping Indian citizens with public services. Be formal, helpful, and concise. Knowledgeable about RTI, Aadhaar, PAN, Municipal services, and state welfare schemes.',
        }
    });
    
    // chat.sendMessage accepts a message parameter.
    const response = await chat.sendMessage({ message });
    // Access the .text property directly.
    return response.text;
};
