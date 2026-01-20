
export const generateMarketingStrategy = async (industry: string, targetAudience: string, goals: string) => {
  try {
    const response = await fetch('/api/genai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'strategy',
        industry,
        audience: targetAudience,
        goals,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.strategy || data.fallback || "I'm sorry, I couldn't generate your strategy right now. Please contact us directly for a free consultation.";
  } catch (error) {
    console.error("Error generating strategy:", error);
    return "I'm sorry, I couldn't generate your strategy right now. Please contact us directly for a free consultation.";
  }
};

export const chatWithAura = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  try {
    const response = await fetch('/api/genai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chat',
        chatHistory: history,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || data.fallback || "Our neural link is experiencing interference. Please reach out to our command center at hello@ansury.systems.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Our neural link is experiencing interference. Please reach out to our command center at hello@ansury.systems.";
  }
};
