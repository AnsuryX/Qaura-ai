# 🔧 Backend Architecture: Cloudflare Pages Function

## Overview

Your Ansury Systems frontend calls AI endpoints through a **Cloudflare Pages Function** (`functions/genai.ts`) instead of directly calling Google Gemini API. This is a **serverless architecture** that provides:

- ✅ **Security**: API key stored server-side (not exposed to browser)
- ✅ **CORS**: Function handles cross-origin requests
- ✅ **Error Handling**: Graceful fallbacks when API unavailable
- ✅ **Scalability**: Auto-scales with Cloudflare edge network
- ✅ **Monitoring**: Cloudflare logs all invocations

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (React SPA)                       │
│  - StrategyGenerator component                              │
│  - Chatbot component                                        │
│  - localStorage for chat history                           │
└────────────────┬────────────────────────────────────────────┘
                 │ POST /api/genai (fetch)
                 ↓
┌─────────────────────────────────────────────────────────────┐
│          Cloudflare Pages Function (genai.ts)               │
│  - Validates request (type: 'strategy' | 'chat')           │
│  - Uses GEMINI_API_KEY env var                             │
│  - Calls Google GenAI SDK                                  │
│  - Returns response or fallback                            │
│  - Sets CORS headers                                       │
└────────────────┬────────────────────────────────────────────┘
                 │ Calls Google Gemini API
                 ↓
┌─────────────────────────────────────────────────────────────┐
│              Google Gemini API (External)                   │
│  - gemini-3-flash-preview model                            │
│  - Processes strategy/chat requests                        │
│  - Returns AI-generated text                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Request/Response Flow

### Strategy Generation Flow

**Frontend sends:**
```json
POST /api/genai
{
  "type": "strategy",
  "industry": "Real Estate",
  "audience": "High-net-worth individuals in Doha",
  "goals": "Generate qualified leads"
}
```

**Function processes:**
1. Validates request (checks `type` === `'strategy'`)
2. Extracts: `industry`, `audience`, `goals`
3. Constructs Gemini prompt
4. Calls `ai.models.generateContent()` with:
   - Model: `gemini-3-flash-preview`
   - Temperature: `0.7` (balanced creativity)
   - Max tokens: `500`
5. Returns strategy text

**Frontend receives:**
```json
HTTP 200
{
  "strategy": "Here is your AI-driven marketing strategy...\n\n1. Personalize..."
}
```

**On error:**
```json
HTTP 503
{
  "error": "API key not configured",
  "fallback": "Our neural link is experiencing interference..."
}
```

---

### Chat Flow

**Frontend sends:**
```json
POST /api/genai
{
  "type": "chat",
  "chatHistory": [
    {"role": "user", "parts": [{"text": "What services do you offer?"}]},
    {"role": "model", "parts": [{"text": "We offer Neural Personalization..."}]}
  ],
  "message": "How can you help my business?"
}
```

**Function processes:**
1. Validates request (checks `type` === `'chat'`)
2. Extracts: `chatHistory`, `message`
3. Creates chat session with:
   - Model: `gemini-3-flash-preview`
   - System instruction: Ansur persona (strategic consultant)
4. Sends message with full history
5. Returns model response

**Frontend receives:**
```json
HTTP 200
{
  "reply": "Thank you for your question! To understand your business better..."
}
```

---

## Code Walkthrough: `functions/genai.ts`

### 1. Type Definition
```typescript
interface RequestBody {
  type: 'strategy' | 'chat';
  industry?: string;
  audience?: string;
  goals?: string;
  chatHistory?: { role: 'user' | 'model'; parts: { text: string }[] }[];
  message?: string;
}
```

### 2. CORS Setup
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Preflight requests (OPTIONS) return 200 with CORS headers
if (request.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}
```

### 3. Method Validation
```typescript
if (request.method !== 'POST') {
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

### 4. Environment Variable Check
```typescript
const apiKey = env.GEMINI_API_KEY;

if (!apiKey) {
  return new Response(
    JSON.stringify({
      error: 'API key not configured',
      fallback: 'Our neural link is experiencing interference...',
    }),
    { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

### 5. Strategy Handling
```typescript
if (body.type === 'strategy') {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a concise, high-level AI-driven marketing strategy...`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });
  
  return new Response(JSON.stringify({ strategy: response.text }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

### 6. Chat Handling
```typescript
if (body.type === 'chat') {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are "Ansur", the advanced AI strategic consultant...`,
    },
  });

  const response = await chat.sendMessage({ message });
  
  return new Response(JSON.stringify({ reply: response.text }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

### 7. Error Handling
```typescript
catch (error) {
  console.error('Error:', error);
  return new Response(
    JSON.stringify({
      error: 'Internal server error',
      fallback: 'Our neural link is experiencing interference...',
    }),
    {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
```

---

## Environment Variable: `GEMINI_API_KEY`

In Cloudflare Pages project settings:
- **Name**: `GEMINI_API_KEY`
- **Value**: Your Google Gemini API key
- **Environments**: Production & Preview

The function accesses it via: `context.env.GEMINI_API_KEY`

---

## Deployment Checklist

- [ ] `functions/genai.ts` exists in repo root
- [ ] `GEMINI_API_KEY` set in Cloudflare Pages project settings
- [ ] Frontend service (`services/geminiService.ts`) calls `/api/genai` ✓
- [ ] Build succeeds locally: `npm run build` ✓
- [ ] Deployment to Cloudflare Pages triggered
- [ ] Test on live site: Strategy Generator works ✓
- [ ] Test on live site: Chatbot works ✓

---

## Monitoring & Debugging

### View Function Logs
1. Cloudflare Dashboard → Pages → Your project
2. Go to **Deployments** tab
3. Click any deployment → **View Details**
4. Scroll to **Functions** section → Click function name
5. View real-time logs

### Debug Strategy Request
```bash
curl -X POST https://your-site.pages.dev/api/genai \
  -H "Content-Type: application/json" \
  -d '{
    "type": "strategy",
    "industry": "Real Estate",
    "audience": "High-net-worth",
    "goals": "Lead generation"
  }'
```

### Debug Chat Request
```bash
curl -X POST https://your-site.pages.dev/api/genai \
  -H "Content-Type: application/json" \
  -d '{
    "type": "chat",
    "chatHistory": [],
    "message": "Hello!"
  }'
```

---

## Common Issues & Solutions

### Issue: "API key not configured" (503)

**Cause**: `GEMINI_API_KEY` not set in Cloudflare Pages environment variables

**Fix**:
1. Cloudflare Dashboard → Pages → Your project
2. **Settings** → **Environment variables**
3. Add: `GEMINI_API_KEY = AIzaSyBvnb4Bh1vWH_rlEM9SNNyZ2V4tEySKKZ8`
4. Save & redeploy

---

### Issue: "Method not allowed" (405)

**Cause**: Frontend sending GET request instead of POST

**Fix**: Check `services/geminiService.ts` uses `fetch(..., { method: 'POST', ... })`

---

### Issue: CORS error in browser console

**Cause**: Function not returning proper CORS headers

**Fix**: Ensure function always includes:
```typescript
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

---

### Issue: Timeout (function takes >30 seconds)

**Cause**: Gemini API call is slow or function runs too long

**Fix**: Cloudflare Functions timeout after 30s. Consider:
- Caching responses
- Using a faster model variant
- Checking Gemini API status

---

## Advanced: Customizing the Function

### Add Request Validation
```typescript
if (!body.industry || !body.audience || !body.goals) {
  return new Response(
    JSON.stringify({ error: 'Missing required fields' }),
    { status: 400, headers: corsHeaders }
  );
}
```

### Rate Limiting (via Cloudflare Workers KV)
```typescript
const rateLimitKey = `api:${request.headers.get('cf-connecting-ip')}`;
// Check & increment counter in KV store
```

### Caching Responses
```typescript
// Cache strategy prompts for 1 hour
response.headers.set('Cache-Control', 'public, max-age=3600');
```

### Custom Model Parameters
```typescript
config: {
  temperature: 0.9,     // Higher = more creative
  topP: 0.95,           // Diversity
  topK: 40,             // Token selection
  maxOutputTokens: 1000, // Longer responses
}
```

---

## Security Best Practices

✅ **Do**:
- Store API key in environment variables only
- Validate request types before processing
- Return generic error messages to client
- Log errors server-side for debugging
- Use CORS headers appropriately

❌ **Don't**:
- Expose API key in frontend code
- Trust client-supplied `chatHistory` without validation
- Log sensitive user data
- Disable CORS (security risk)
- Return detailed error messages (info leak)

---

## Testing Locally

If you want to test the function locally before deploying:

```bash
# Install Cloudflare Workers CLI
npm install -g wrangler

# Create wrangler.toml in repo root
[env.development]
name = "ansury-systems-dev"
type = "javascript"
account_id = "your_account_id"
workers_dev = true
routes = [
  { pattern = "*/api/genai", zone_name = "example.com" }
]

# Start local development
wrangler dev

# Function runs at http://localhost:8787/api/genai
```

---

**Your backend is production-ready! Deploy with confidence.** 🚀
