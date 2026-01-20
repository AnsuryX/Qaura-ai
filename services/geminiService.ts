import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { SERVICES, SERVICE_DETAILS } from "../constants";

// Standard initialization as per SDK guidelines
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Pre-processes service data for the AI context to ensure it has 
 * absolute precision when explaining our offerings.
 */
const getServicesContext = () => {
  return SERVICES.map(service => {
    const details = SERVICE_DETAILS[service.id as keyof typeof SERVICE_DETAILS];
    return {
      id: service.id,
      title: service.title.en,
      summary: service.description.en,
      technical_stack: details.tools,
      market_impact_roi: details.roi.en,
      key_features: details.features.en.map(f => `${f.name}: ${f.explanation}`)
    };
  });
};

export const generateMarketingStrategy = async (industry: string, targetAudience: string, goals: string) => {
  const ai = getAIClient();
  const prompt = `
    Generate a high-level "Autonomous Growth Blueprint" for a business in the Middle East (Khaleej focus).
    Industry: ${industry}
    Target Audience: ${targetAudience}
    Goals: ${goals}
    
    Structure the response with:
    1. Operational Bottleneck Analysis.
    2. Khaleeji-optimized conversion architecture strategy.
    3. AI lead qualification logic.
    4. Automated follow-up sequence (WhatsApp/Email).
    5. INVESTMENT & ROI FRAMEWORK:
       - Explain that implementing this blueprint costs between QAR/SAR 40,000 – 80,000 for the build, with an operational cost of QAR/SAR 8,000 – 15,000/month.
       - Forcefully frame this investment as a high-performance alternative to hiring 3-4 junior/mid-level staff members.
       - Highlight the 24/7 nature of the infrastructure and the removal of human error.
    
    Keep it authoritative, visionary, and ROI-focused.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1200,
        thinkingConfig: { thinkingBudget: 600 },
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
  const servicesData = JSON.stringify(getServicesContext(), null, 2);

  const chat: Chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are "Ansur", the Chief Automation Strategist for Ansury Systems. You represent the premier agency for autonomous growth in the Khaleej (GCC).
      
      CORE IDENTITY: 
      "Ansury replaces fragmented marketing and manual sales with one synchronized Growth Engine for Middle Eastern powerhouses."
      
      YOUR KNOWLEDGE BASE (Our Service Catalog):
      ${servicesData}

      CONVERSATION GUIDELINES:
      1. KNOWLEDGE: You have deep knowledge of our services. Explain ROI, tools, and features specifically as defined.
      2. PERSUASION: Use "benefit → explain → proof → action".
      3. MANDATORY PRICING LOGIC: 
         - Build costs: QAR/SAR 40,000 – 80,000.
         - Operational costs: QAR/SAR 8,000 – 15,000/month.
         - When discussing costs: You MUST frame these numbers against the cost of human headcount. 
         - Logic: "A mid-level marketing manager in Dubai/Riyadh costs significantly more than our entire infrastructure, but our system never sleeps, never forgets to follow up, and qualifies leads with 98% accuracy."
         - Focus on "Buying back time" for the CEO and "Replacing manual friction" with high-margin automation.
      4. REGIONAL CONTEXT: Speak with high-status, professional language suitable for the GCC elite.
      
      If asked about price, be direct but always justify it through the lens of staff replacement and reclaimed executive time.`,
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
