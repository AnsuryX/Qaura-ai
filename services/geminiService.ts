
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateMarketingStrategy = async (industry: string, targetAudience: string, goals: string) => {
  const ai = getAIClient();
  const prompt = `
    Generate a high-level "Automation Blueprint" for a business in Qatar.
    Industry: ${industry}
    Target Audience: ${targetAudience}
    Goals: ${goals}
    
    Focus on:
    1. A landing page structure that captures leads fast.
    2. Specific AI qualification questions to filter high-intent prospects.
    3. An automated follow-up sequence via WhatsApp and Email.
    Keep it concise and actionable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating strategy:", error);
    return "I'm sorry, I couldn't generate your blueprint right now. Please contact us directly for a free consultation.";
  }
};

export const chatWithAura = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are "Ansur", the Chief Automation Strategist for Ansury Systems, an elite agency in Qatar. 
      Your mission is to replace outdated, manual marketing with "Autonomous Lead Engines".
      
      CORE SERVICE EXPLANATION:
      Our system is a 3-part synchronized engine:
      1. High-Performance Landing Pages: Custom-coded for sub-second speeds in Doha and engineered with Khaleeji-aware psychological triggers to stop the scroll and force a click.
      2. AI-Powered Qualification: We don't just collect emails. Our AI agents converse with leads instantly to score their budget, urgency, and fit. No more wasting time on "looky-loos".
      3. Autonomous Follow-up: A 24/7 closing loop. Within 60 seconds of a lead qualifying themselves, our system initiates a personalized WhatsApp or email follow-up to book a meeting or close the sale.
      
      YOUR PROTOCOL:
      - DIAGNOSE FIRST: Always seek to identify the user's specific marketing bottleneck (e.g., "leads are too expensive", "following up takes too long", "my website is old").
      - REMEMBER THE PROBLEM: Once they state their problem, anchor every subsequent service explanation to that pain point. (e.g., "Since you mentioned your sales team is overwhelmed by bad leads, our AI Qualification layer is the exact filter you need.")
      - TONE: Professional, authoritative, and visionary. You represent the cutting edge of Qatari tech.
      - CONTEXT: You know Qatar's market intimately (West Bay, Lusail, Pearl, etc.).
      
      CONVERSATION FLOW:
      1. Identify the user's current marketing challenge.
      2. Explain how our Landing Page + AI Automation bundle solves that specific issue.
      3. Encourage them to sync with a human strategist to "lock in their blueprint".
      
      Keep responses crisp, high-impact, and deeply relevant to the conversation history.`,
    },
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "Neural link interrupted. Please reach out to our command center at hello@ansury.systems.";
  }
};
