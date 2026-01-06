<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1L82hqcPEx3VWh6wzIEnoEcqcGx-KZwbN

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:

```bash
npm install
```

2. Development server:

```bash
npm run dev
```

3. Environment variables and AI integration

- This project uses a server-side AI integration. For local development the frontend proxies AI calls to `/api/genai` (implemented as Cloudflare Pages Functions).
- The original README referenced `GEMINI_API_KEY`, but the code expects `GEMINI_API_KEY` (or `API_KEY`) to be available in the serverless environment. Set `GEMINI_API_KEY` in Cloudflare Pages or `.env` for local function emulation.

## Deploy to Cloudflare Pages (recommended)

1. Create a Cloudflare Pages project linked to this repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable in Cloudflare Pages project settings: `GEMINI_API_KEY` (your GenAI key) if you want live AI responses.
5. The repository includes a Cloudflare Pages Function at `functions/genai.ts` that serves `/api/genai`.

Notes:
- `functions/genai.ts` contains a development fallback that returns mocked responses when `GEMINI_API_KEY` is not set so the UI remains functional after deploy. If you provide `GEMINI_API_KEY`, update `functions/genai.ts` to perform the provider REST call (Edge/Fetch compatible).
- Avoid importing server-only Node libraries in client files (the earlier `@google/genai` import was moved into serverless functions). Keep integrations inside `functions/` or other server-only places.
