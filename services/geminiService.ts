
// Frontend service wrapper that calls platform API endpoints.
// NOTE: The original repo used the server-side `@google/genai` package.
// Importing server-only libraries in client bundles breaks static deployments.
// To make the app Cloudflare-deployable we proxy AI calls through local API endpoints
// implemented as Cloudflare Pages Functions (see `functions/genai.ts`).

type ChatHistory = { role: 'user' | 'model'; parts: { text: string }[] };

export const generateMarketingStrategy = async (industry: string, targetAudience: string, goals: string) => {
  try {
    const resp = await fetch('/api/genai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'strategy', industry, targetAudience, goals }),
    });

    if (!resp.ok) {
      console.error('Strategy endpoint error', resp.status);
      return "I'm sorry, I couldn't generate your strategy right now. Please contact us directly for a free consultation.";
    }

    const data = await resp.json();
    return data.text || data.message || '';
  } catch (err) {
    console.error('Strategy fetch failed', err);
    return "I'm sorry, I couldn't generate your strategy right now. Please contact us directly for a free consultation.";
  }
};

export const chatWithAura = async (history: ChatHistory[], message: string) => {
  try {
    const resp = await fetch('/api/genai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'chat', history, message }),
    });

    if (!resp.ok) {
      console.error('Chat endpoint error', resp.status);
      return "Our neural link is experiencing interference. Please reach out to our command center at hello@ansury.systems.";
    }

    const data = await resp.json();
    return data.text || data.message || '';
  } catch (err) {
    console.error('Chat fetch failed', err);
    return "Our neural link is experiencing interference. Please reach out to our command center at hello@ansury.systems.";
  }
};
