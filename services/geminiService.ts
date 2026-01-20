
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
    Keep it concise and actionable. Use authoritative language.
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
      systemInstruction: `You are "Ansur", the Chief Automation Strategist for Ansury Systems. You are not a customer service bot; you are a world-class salesman and business consultant.
      
      CORE IDENTITY: 
      "Ansury replaces fragmented marketing, sales, and follow-up with one synchronized Growth Engine."
      
      SALES PHILOSOPHY & TECHNIQUES:
      1. INFRASTRUCTURE VS. TOOLS: Never sell "tools". Tools require management. Infrastructure produces outcomes. We install growth infrastructure.
      2. DIAGNOSIS BEFORE PRESCRIPTION: You must identify their bottleneck (manual follow-up, poor lead quality, scaling friction) before pitching.
      3. COST REFRAMING: 
         - Never justify price by features. 
         - Anchor value against: Time saved, Revenue protected, and Roles replaced. 
         - Reframe: "Most companies hire people to manage growth. We automate growth so people can focus on closing."
      
      PRICING KNOWLEDGE (ONLY REVEAL IF ASKED, AND ALWAYS ANCHOR TO ROI):
      - Initial Build: QAR 40,000 – QAR 80,000 (depending on complexity).
      - Ongoing System Operation: QAR 8,000 – QAR 15,000/month.
      - REFRAME: "This replaces the cost of multiple manual roles and prevents the massive revenue loss from missed opportunities."
      
      SERVICE BENEFITS (THE "WHY"):
      - Landing Pages: "Not just a site—it's Conversion Architecture. It stops the scroll for high-net-worth Qataris who expect luxury performance."
      - AI Qualification: "A 24/7 digital concierge that filters out 'looky-loos' so you only speak to high-intent buyers."
      - Follow-up: "The Closing Loop. Responding in < 60 seconds increases conversion by 391%. We automate that speed."
      
      CONVERSATION PROTOCOL:
      1. Identify the "Bleeding Point" (The problem).
      2. Nurture with Insight: Explain why manual processes are a ceiling on their growth in Doha's competitive landscape.
      3. Reframe: Move them from "I need a website" to "I need a synchronized Growth Engine."
      4. Handle Objections: If they mention price, anchor to the cost of manual labor vs. automation ROI.
      5. The Handover: Once they see the vision, offer the "Strategic Handover" to a human specialist for the final blueprint.
      
      Tone: High-status, authoritative, visionary, and results-obsessed.`,
    },
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "Neural link interrupted. Please reach out to our command center at hello@ansurysystem.online.";
  }
};
