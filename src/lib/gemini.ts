import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function extractDataFromSurveyPhoto(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: "image/jpeg",
            },
          },
          {
            text: "Extract information from this survey photo. Look for issue title, description, urgency level (Critical, High, Medium, Low), and category (Medical, Food, Shelter, Water, Sanitation). Return as JSON.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            urgencyLevel: { type: Type.STRING, enum: ["Critical", "High", "Medium", "Low"] },
            category: { type: Type.STRING, enum: ["Medical", "Food", "Shelter", "Water", "Sanitation"] },
          },
          required: ["title", "description", "urgencyLevel", "category"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Extraction Error:", error);
    return null;
  }
}

export async function getUrgencyPlan(query: string, locationContext: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Context: ${locationContext}. User Query: ${query}`,
      config: {
        systemInstruction: "You are an expert NGO operation planner. Provide a high-reasoning, strategic response for the urgent intervention requested. Focus on logistics, resource allocation, and safety.",
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH
        }
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Planning Error:", error);
    return "I am currently unable to generate a strategic plan. Please try manual coordination.";
  }
}
