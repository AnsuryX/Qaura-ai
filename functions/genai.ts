// Cloudflare Pages Function to proxy AI requests.
// Deploy this repository to Cloudflare Pages and set the environment variable
// `GEMINI_API_KEY` in the Pages project settings if you want real AI responses.

export async function onRequest(context: any) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Only POST supported' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  let body: any;
  try {
    body = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const action = body.action || 'chat';

  // If GEMINI_API_KEY configured in Cloudflare Pages, implement real provider logic here.
  const apiKey = env.GEMINI_API_KEY || env.API_KEY || null;

  if (!apiKey) {
    // Development / demo fallback: return deterministic mock responses so app remains functional after deploy.
    if (action === 'strategy') {
      const { industry = 'unknown', targetAudience = 'general', goals = 'growth' } = body;
      const text = `Mock Strategy for ${industry} targeting ${targetAudience}:\n1) Focus on local SEO and Arabic-English creative assets.\n2) Use predictive segmentation and tailored offers.\n3) Run a 6-week generative creative test.`;
      return new Response(JSON.stringify({ text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (action === 'chat') {
      const message = body.message || '';
      const text = `Mock reply: I received your message (${message.slice(0, 120)}). Set GEMINI_API_KEY in Pages to enable live responses.`;
      return new Response(JSON.stringify({ text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // TODO: Add real provider integration here when deploying with a valid API key.
  // Cloudflare Pages Functions run on the Edge (Deno). Many server SDKs (Node) won't work.
  // Implement a direct REST call to your chosen AI provider here using Fetch and the `apiKey` from env.

  return new Response(JSON.stringify({ error: 'Not implemented - provide GEMINI_API_KEY and implement provider proxy in functions/genai.ts' }), { status: 501, headers: { 'Content-Type': 'application/json' } });
}
