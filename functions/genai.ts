import { GoogleGenAI } from "@google/genai";

interface RequestBody {
  type: 'strategy' | 'chat';
  industry?: string;
  audience?: string;
  goals?: string;
  chatHistory?: { role: 'user' | 'model'; parts: { text: string }[] }[];
  message?: string;
}

export async function onRequest(context: { request: Request; env: { GEMINI_API_KEY: string } }) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only POST allowed
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body: RequestBody = await request.json();
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'API key not configured',
          fallback: 'Our neural link is experiencing interference. Please contact us at hello@ansury.systems.',
        }),
        {
          status: 503,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    if (body.type === 'strategy') {
      // Strategy generation
      const { industry, audience, goals } = body;
      const prompt = `
Generate a concise, high-level AI-driven marketing strategy for a business in Qatar.
Industry: ${industry}
Target Audience: ${audience}
Goals: ${goals}

Focus on:
1. Local Qatari market nuances.
2. Specific AI tools or techniques (Predictive, Generative, etc.)
3. Three actionable steps.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });

      return new Response(
        JSON.stringify({ strategy: response.text }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } else if (body.type === 'chat') {
      // Chat interaction
      const { chatHistory, message } = body;
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

      const response = await chat.sendMessage({ message });

      return new Response(
        JSON.stringify({ reply: response.text }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request type' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        fallback: 'Our neural link is experiencing interference. Please contact us at hello@ansury.systems.',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}
