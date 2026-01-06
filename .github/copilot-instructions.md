# Copilot / Agent Instructions

Purpose: Provide concise, actionable guidance so an AI coding agent can be productive immediately in this repository.

Overview
- This is a React + Vite single-page app. The UI root is `App.tsx`, which composes pages and imports major pieces from `components/`.
- Integrations and side-effects belong in `services/` (see `services/geminiService.ts`), while copy and localized strings are in `constants.tsx`.

Critical flows & examples
- Chat: `components/Chatbot.tsx` -> calls `chatWithAura(history, message)` in `services/geminiService.ts`. History items are shaped `{ role: 'user'|'model', parts: [{ text }] }` and the service returns `response.text`.
- Strategy generation: `components/StrategyGenerator.tsx` -> calls `generateMarketingStrategy(...)` in `services/geminiService.ts` and posts a short lead to Formspree (`https://formspree.io/f/mzdzlldz`).
- Lead capture: multiple places post to the same Formspree endpoint; do not change the endpoint or payload without updating all callers.

Environment & run notes
- Local dev: `npm install` then `npm run dev` (Vite). Build: `npm run build`. Preview: `npm run preview`.
- Env var mismatch (important): README mentions `GEMINI_API_KEY` in `.env.local`, but `services/geminiService.ts` reads `process.env.API_KEY`. Verify and standardize the variable name before CI or PRs that touch AI code.

Project-specific conventions
- Directory layout: `components/` for UI, `services/` for external integrations, `constants.tsx` for copy/data, `types.ts` for shared TS types.
- AI tone & handover: `chatWithAura` embeds a system instruction (see `services/geminiService.ts`). Preserve its intent (professional, Qatar-localized, offers