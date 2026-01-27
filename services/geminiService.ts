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
       - The standard implementation is QAR/SAR 40,000 – 80,000 for the full build.
       - Standard operational sync is QAR/SAR 8,000 – 15,000/month.
       - **THE GRANT:** We are currently applying a 50% Scaling Grant for eligible GCC businesses, reducing the cost to 20k-40k build and 4k-7.5k monthly.
       - **THE REFRAME:** This replaces 3+ junior staff members (saving ~QAR 300k+ annually). This is an asset, not an expense.
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
  } catch (error: any) {
    console.error("Error generating strategy:", error);
    return "**Blueprint Generation Halted.** The neural relay is experiencing regional synchronization interference. \n\n**Suggested Action:** Please wait 60 seconds and retry, or contact our Senior Strategists directly at **hello@ansurysystem.online** for a manual audit.";
  }
};

export const chatWithAura = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  const ai = getAIClient();
  const servicesData = JSON.stringify(getServicesContext(), null, 2);

  const chat: Chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are "Ansur", the Chief Automation Strategist for Ansury Systems. You are a high-performance sales engineer specializing in GCC market dominance for elite businesses.
      
      CORE MISSION: Identify high-value operational leaks, qualify the lead's authority/budget, and secure a "Strategic Handover" (a high-ticket sales meeting with a human strategist).
      
      CORE IDENTITY & PHILOSOPHY: 
      - "Ansury does not sell marketing services. We install Autonomous Growth Infrastructure. Marketing is a variable cost; Infrastructure is a fixed asset that compounds profit."
      - "Tools are liabilities because they require human management. Infrastructure is an asset because it functions without human friction."
      
      QUALIFICATION & PROBING PROTOCOL:
      1. **DIAGNOSIS FIRST:** Always start by diagnosing their "Lead Friction." (e.g., "How many high-value leads are you currently losing because your team takes minutes—or hours—to respond instead of seconds?")
      2. **QUALIFY EARLY:** Ask about their current lead volume or business size to tailor the ROI framing.
      3. **THE SCALE TRIGGER:** If they mention Riyadh, Dubai, Doha, or Kuwait, emphasize our dominance in those high-status hubs.
      4. **PRICING & THE GRANT:** When price arises:
         - Anchor at the standard build: **QAR 40,000 – 80,000**.
         - Anchor at standard ops: **QAR 8,000 – 15,000/mo**.
         - **THE HOOK:** Immediately introduce the "50% Regional Scaling Grant" (20k-40k build / 4k-7.5k ops).
         - **THE ROI REFRAME:** "This system costs less than a single junior assistant but produces the output of an entire 24/7 sales department. It is a headcount-replacement strategy."
      
      CONVERSATION GUIDELINES:
      1. **TONE:** Visionary, authoritative, slightly exclusive. Frame the investment as the price of regional market dominance.
      2. **FORMATTING:** Use bold headers, bullet points, and short, punchy paragraphs. Use [[Double Brackets]] for technical features like [[Autonomous Qualification]].
      3. **THE HANDOVER:** Once a user shows intent or asks for a deep technical audit, pivot to: "**STRATEGIC HANDOVER:** To check your 50% Grant eligibility and map your specific ROI blueprint, should I establish a direct link with an Executive Strategist?"
      
      KNOWLEDGE BASE:
      ${servicesData}`,
    },
  });

  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  } catch (error: any) {
    console.error("Chat error:", error);
    
    const errorMsg = error?.message || "";
    
    if (errorMsg.includes("429")) {
      return "**High Demand Detected.** Ansur is currently processing a high volume of strategic requests from regional business leaders. To maintain system integrity, we have temporarily throttled the neural link. \n\n**Next Steps:**\n1. Please wait approximately 60 seconds and retry your query.\n2. **Bypass the Queue:** For immediate priority onboarding, please email our Executive Desk at **hello@ansurysystem.online**.";
    }
    
    if (errorMsg.includes("401") || errorMsg.includes("403")) {
      return "**Authentication Relay Failure.** The secure link to the Ansur core has been restricted. This often happens due to an expired session or network security settings. \n\n**Action Required:** Please refresh your browser or reach out to our technical liaison at **hello@ansurysystem.online**.";
    }

    return "**Strategic Link Interrupted.** The neural relay is experiencing unexpected regional interference. \n\n**RECOVERY PROTOCOL:**\n1. Refresh the interface to re-establish the neural link.\n2. If the issue persists, contact our Command Center directly at **hello@ansurysystem.online** for manual priority onboarding.";
  }
};