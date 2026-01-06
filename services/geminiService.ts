
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateMarketingStrategy = async (industry: string, targetAudience: string, goals: string) => {
  const ai = getAIClient();
  const prompt = `
    Generate a concise, high-level AI-driven marketing strategy for a business in Qatar.
    Industry: ${industry}
    Target Audience: ${targetAudience}
    Goals: ${goals}
    
    Focus on:
    1. Local Qatari market nuances.
    2. Specific AI tools or techniques (Predictive, Generative, etc.)
    3. Three actionable steps.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating strategy:", error);
    return "I'm sorry, I couldn't generate your strategy right now. Please contact us directly for a free consultation.";
  }
};

export const chatWithAura = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are "Ansur", the advanced AI strategic consultant for Ansury Systems, a premier futuristic marketing agency in Qatar. 
      Your tone is professional, futuristic, and helpful. 
      Key Services: Neural Personalization, Market Foresight, Creative AI Studio, Unified Digital Command.
      Local Context: You understand Qatar's market (Doha, Lusail, West Bay) and cultural nuances.
      Goals: 
      1. Answer questions about high-performance AI marketing.
      2. If a user is interested in services, gently ask for their name and company to "synchronize a customized brief".
      3. Offer a "Strategic Handover" to a human specialist if things get very specific or technical.
      Keep responses concise and engaging.`,
    },
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "Our neural link is experiencing interference. Please reach out to our command center at hello@ansury.systems.";
  }
};
