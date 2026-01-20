# Copilot Instructions: Ansury Systems Marketing AI Studio

## Project Overview

**Ansury Systems** is a React + Vite + TypeScript SPA for an AI-driven marketing agency targeting Qatar's luxury market. The app provides AI-powered strategy generation, chatbot consultation, portfolio browsing, and lead capture.

**Key Fact:** This is a **Cloudflare Pages hybrid application**—React runs client-side, but AI API calls route through serverless backend at `functions/genai.ts` (not included in this repo snapshot). The frontend assumes an `/api/genai` endpoint exists.

## Architecture & Data Flow

### Component Structure
- **App.tsx** → Main router/state manager; controls page navigation (`home`, `portfolio`, `services`, `contact`) and i18n toggling (`en`, `ar`)
- **Navbar** → Language switcher + nav menu; uses `Lang` state from App
- **StrategyGenerator** → Form component; calls `generateMarketingStrategy()`, posts lead to Formspree webhook
- **Chatbot** → Persistent chat widget with localStorage memory; calls `chatWithAura()` for multi-turn conversation
- **StrategyGenerator & Chatbot** are lazy-loaded concepts—only render on specific pages

### API & Service Layer
[services/geminiService.ts](services/geminiService.ts) wraps Google GenAI client:
- **generateMarketingStrategy()** → One-shot prompt to Gemini 3 Flash (Qatar market focus); returns raw text
- **chatWithAura()** → Multi-turn chat with **Ansur persona** (strategic AI consultant); uses system instruction to maintain brand voice
- Both functions expect `process.env.API_KEY` (Vite-injected from `GEMINI_API_KEY`)
- **Error fallback:** Returns polished error messages if API unavailable (for graceful UX post-deploy)

### Data & Constants
- [constants.tsx](constants.tsx) → Centralized content: `SERVICES`, `CASE_STUDIES`, `SERVICE_DETAILS`
- All text is bilingual (English + Arabic); keyed as `{ en: '...', ar: '...' }`
- Icons are **string references** (e.g., `'Cpu'`, `'BarChart3'`) resolved dynamically in components
- [types.ts](types.ts) → Minimal interfaces; easy extension pattern

### State Management
- **App.tsx** holds all global state (currentPage, lang, form fields, UI toggles)
- **Chatbot** uses localStorage (`ansury_chat_history`) for persistent session memory
- **StrategyGenerator** is stateless; triggers async API call on form submit
- No Redux/Zustand—simple useState is sufficient for current complexity

## Critical Workflows

### Local Development
```bash
npm install
npm run dev
```
Runs Vite at `http://localhost:3000`. Requires `.env` file with `GEMINI_API_KEY=<your-key>`.

### Build & Deploy (Cloudflare Pages)
```bash
npm run build
```
Outputs to `dist/`. Deploy requires:
- Cloudflare Pages project linked to repo
- Build dir: `dist`, Publish cmd: `npm run build`
- Environment variable: `GEMINI_API_KEY` in Pages project settings
- Backend function at `functions/genai.ts` must proxy requests to Gemini API

**Dev Fallback:** If `GEMINI_API_KEY` not set, `functions/genai.ts` should return mocked AI responses so UI doesn't break.

### Adding Features
1. **New page?** Add Page type in [types.ts](types.ts), conditional JSX in App.tsx, nav link in Navbar
2. **New service/case study?** Add to [constants.tsx](constants.tsx); components auto-render from arrays
3. **New AI interaction?** Add function to [services/geminiService.ts](services/geminiService.ts); import into component
4. **Bilingual content?** Always use `{ en: '...', ar: '...' }` pattern; update App's lang effect if needed

## Project-Specific Patterns & Conventions

### Internationalization (i18n)
- **No library** (no i18next)—manual conditional rendering: `content[lang]`
- **RTL support:** `document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'` set in App useEffect
- All UI strings in [constants.tsx](constants.tsx); components destructure `lang` from App props

### Tailwind + Glass Morphism
- Custom CSS utilities (defined in root or Tailwind config): `.glass` class for frosted-glass effect
- Primary colors: cyan (`text-cyan-400`, `border-cyan-500`), slate (`text-slate-400`)
- Lucide icons used throughout for visual consistency

### Forms & Lead Capture
- **StrategyGenerator** → Posts to `https://formspree.io/f/mzdzlldz` (Formspree webhook)
- **Chatbot handover** → Likely posts to separate endpoint (check Chatbot.tsx for details)
- No client-side validation framework; simple `required` attributes on inputs

### Error Handling
- Service functions wrap try-catch; return friendly fallback messages instead of throwing
- No global error boundary; errors logged to console
- API unavailable? UX remains functional (mocked responses or empty states)

## Key Files to Understand First

| File | Purpose | When to Edit |
|------|---------|--------------|
| [App.tsx](App.tsx) | Main router & global state | Add pages, change layout, fix nav flow |
| [services/geminiService.ts](services/geminiService.ts) | AI prompt logic & persona | Tweak strategy prompt, adjust Ansur system instruction |
| [constants.tsx](constants.tsx) | All content strings, service cards | Update copy, add case studies, change pricing |
| [components/Chatbot.tsx](components/Chatbot.tsx) | Persistent chat widget | Modify UI, change localStorage behavior, adjust lead handover |
| [types.ts](types.ts) | TypeScript interfaces | Extend data models |
| [vite.config.ts](vite.config.ts) | Build & env config | Add aliases, modify dev server settings |

## Integration Points & External Dependencies

- **Google GenAI SDK** (`@google/genai`) — Client library; used in service layer
- **Formspree** — Lead webhook; strategy form POSTs to form ID `mzdzlldz`
- **Cloudflare Pages Functions** — Serverless backend (not in repo); must implement `/api/genai` endpoint
- **Lucide Icons** — Icon library; icons referenced by string name in constants
- **React 19 + Vite 6** — Modern stack; TypeScript strict mode enabled

## Common Gotchas

1. **API Key not found?** Check vite.config.ts `define` block; ensure `GEMINI_API_KEY` env var exported by Vite
2. **RTL breaks styling?** CSS may need tweaks for Arabic (margin/padding inversion); test in browser
3. **Formspree form ID hardcoded** — If migrating webhook, update in [components/StrategyGenerator.tsx](components/StrategyGenerator.tsx)
4. **No backend in dev?** Strategy/chat endpoints fail locally if Cloudflare Functions not running; mock or use proxy
5. **localStorage format** — Chat history is JSON array of `{ role, text }`; parse errors silently fall back to initial greeting

## Testing & Validation

- **No automated tests** in current setup—test manually or add Vitest/Jest if needed
- **Browser console** logs errors from service calls; check when API fails
- **Network tab** shows `/api/genai` calls (POST) in dev; verify payload & response in production
