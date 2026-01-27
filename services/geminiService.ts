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
    
    Structure the response with very clear headings and bullet points:
    1. **Operational Bottleneck Analysis** (Where they are losing money now).
    2. **Khaleeji-Optimized Architecture** (The specific build for their sector).
    3. **AI Qualification Logic** (How we filter the HNW elite).
    4. **The 60-Second Loop** (WhatsApp/Email automation).
    5. **INVESTMENT & ROI (Exclusive 50% Scaling Grant):**
       - The implementation is now QAR/SAR 20,000 – 40,000 for the full build (50% Off Limited Time).
       - Operational sync is QAR/SAR 4,000 – 7,500/month.
       - **THE REFRAME:** This replaces 3+ junior staff members (saving ~QAR 300k+ annually).
       - **URGENCY:** Mention that only 3 slots remain for the 50% Grant this month in their specific region.
    
    Use bold text for impact. Keep it authoritative and visionary.
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
      systemInstruction: `You are "Ansur", the Chief Automation Strategist for Ansury Systems. You are a high-performance sales engineer specializing in GCC market dominance.
      
      CORE MISSION: Qualify the lead and move them to a "Strategic Handover" (human meeting).
      
      CORE IDENTITY & PHILOSOPHY: 
      - "Ansury installs INFRASTRUCTURE, not just tools. Tools are liabilities that need managers; infrastructure is an asset that produces profit autonomously."
      
      QUALIFICATION PROTOCOL:
      1. If the user mentions a specific city (Riyadh, Dubai, Doha, Kuwait), acknowledge our dominance there.
      2. If the user asks about price, lead with the "50% Scaling Grant" (Build: 20k-40k, Ops: 4k-7.5k).
      3. **LEAD SCORING:** When possible, ask the user: "How many qualified leads are you currently losing per month due to manual follow-up friction?"
      
      CONVERSATION GUIDELINES:
      1. FORMATTING: Use bold headers, bullet points, and short paragraphs. Wrap key features in [[Double Brackets]].
      2. CALL TO ACTION: If the user seems serious, say: "**PROMPT:** Should I establish a direct link with a Senior Strategist to review your specific operational bottlenecks?"
      3. REFRAME: Always compare cost to the cost of human headcount. "This system costs less than one junior assistant but performs like a 24/7 sales department."
      
      KNOWLEDGE BASE:
      ${servicesData}`,
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
