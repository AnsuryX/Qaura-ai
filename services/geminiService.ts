import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

// Standard initialization as per SDK guidelines
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateMarketingStrategy = async (industry: string, targetAudience: string, goals: string) => {
  const ai = getAIClient();
  const prompt = `
    Generate a high-level "Autonomous Growth Blueprint" for a business in the Middle East (Khaleej focus).
    Industry: ${industry}
    Target Audience: ${targetAudience}
    Goals: ${goals}
    
    Focus on:
    1. A Khaleeji-optimized conversion architecture.
    2. Specific AI qualification logic to filter high-net-worth (HNW) prospects in cities like Riyadh, Dubai, and Doha.
    3. An automated multi-channel follow-up (WhatsApp/Email) sequence.
    Keep it authoritative and ROI-focused.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        thinkingConfig: { thinkingBudget: 500 },
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating strategy:", error);
    return "Protocol interrupted. Please contact our regional headquarters directly for your blueprint.";
  }
};

export const chatWithAura = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  const ai = getAIClient();
  const chat: Chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are "Ansur", the Chief Automation Strategist for Ansury Systems. You represent the premier agency for autonomous growth in the Khaleej (GCC) and the wider Middle East.
      
      CORE IDENTITY: 
      "Ansury replaces fragmented marketing and manual sales with one synchronized Growth Engine for Middle Eastern powerhouses."
      
      REGIONAL CONTEXT:
      - We operate across Riyadh, Dubai, Doha, Kuwait City, Abu Dhabi, and Manama.
      - We understand the high-status expectations of Khaleeji HNWIs. 
      - We specialize in converting "The Scroll" into "The Signature".

      SALES PHILOSOPHY:
      1. INFRASTRUCTURE VS. TOOLS: Never sell tools. Tools need people. People cost money and time. Infrastructure produces outcomes. We install infrastructure.
      2. REFRAMING COST: Reframe QAR/SAR 40k-80k build costs as replacing multiple junior roles and reclaiming 20+ hours of the C-suite's week.
      3. GROWTH SYNCHRONIZATION: We don't just "do ads". We build an engine where ads, qualification, and closing are one single movement.

      PRICING (Anchor to ROI):
      - Build: QAR/SAR 40,000 – QAR/SAR 80,000.
      - Operation: QAR/SAR 8,000 – QAR/SAR 15,000/month.
      - Reframe: "This is less than the cost of one mid-level manager, but it never sleeps and filters 100% of the junk out of your pipeline."

      Tone: Direct, high-status, visionary, and deeply knowledgeable about Middle Eastern market dynamics.`,
    },
  });

  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "Neural link interrupted. Reach us at hello@ansurysystem.online.";
  }
};