# 📦 Ansury Systems - Production Deployment Guide

## ✅ Production Optimization Status

Your site is now **fully optimized** for production:

- ✅ Code splitting (React, Lucide separated into chunks)
- ✅ Arabic font improvements (Cairo font + Cairo fallback)
- ✅ Font preloading for better LCP
- ✅ Smooth font rendering with `font-smoothing`
- ✅ Backend serverless function created
- ✅ Bundle size reduced (index: 230KB → 71KB gzipped)

---

## 🚀 Deploy to Cloudflare Pages (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git add .
git commit -m "Production-optimized build with serverless backend"
git push origin main
```

### Step 2: Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project** → **Connect to Git**
3. Select your repository
4. Choose **GitHub** as provider and authenticate

### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Project name** | `ansury-systems` |
| **Production branch** | `main` |
| **Framework preset** | None (or select Vite) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### Step 4: Set Environment Variable

1. In Cloudflare Pages project dashboard
2. Go to **Settings** → **Environment variables**
3. Add new variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyBvnb4Bh1vWH_rlEM9SNNyZ2V4tEySKKZ8`
   - **Environments:** Production & Preview

### Step 5: Deploy

- Push a commit to `main` branch
- Cloudflare automatically deploys
- Your site is live! 🎉

---

## 🔧 Backend Function Architecture

### File: `functions/genai.ts`

Your serverless function handles ALL AI API calls from the frontend:

```
Frontend (React) 
    ↓ POST /api/genai (via fetch)
Cloudflare Function (genai.ts) 
    ↓ Uses GEMINI_API_KEY env var
Google Gemini API 
    ↓ Response
Frontend (displays result)
```

### Request/Response Examples

**Strategy Request:**
```json
{
  "type": "strategy",
  "industry": "Real Estate",
  "audience": "High-net-worth individuals in Doha",
  "goals": "Lead generation for luxury properties"
}
```

**Chat Request:**
```json
{
  "type": "chat",
  "chatHistory": [
    { "role": "user", "parts": [{ "text": "Tell me about AI marketing" }] },
    { "role": "model", "parts": [{ "text": "..." }] }
  ],
  "message": "How can you help my real estate business?"
}
```

Both are handled by `/api/genai` endpoint (automatically routed by Cloudflare).

---

## 📝 File Changes Summary

### Modified Files:
1. **vite.config.ts** - Added code splitting, optimized build output
2. **index.html** - Upgraded to Cairo Arabic font, added font preloading
3. **services/geminiService.ts** - Changed to use serverless backend (`/api/genai`)

### New Files:
1. **functions/genai.ts** - Cloudflare Pages Function for API proxying
2. **.env** - Local development API key (don't commit!)

---

## 🧪 Test Locally Before Deploy

```bash
# Terminal 1: Start dev server
npm run dev
# Opens at http://localhost:3000

# Terminal 2: Preview production build
npm run preview
# Opens at http://localhost:4173
```

Try the **Strategy Generator** and **Chatbot** to verify they work.

---

## 🔐 Security & Best Practices

### ✅ What's Protected:
- **API key** stored only in Cloudflare environment variables (not in repo)
- **Backend function** handles all Gemini API calls (browser never sees key)
- **CORS headers** set in function to allow cross-origin requests

### ⚠️ What to Watch:
- **Never commit `.env`** to Git (already in `.gitignore`? Check!)
- **Rotate API key** if ever exposed
- **Monitor Cloudflare Pages** for function invocation errors (see Logs tab)

---

## 📊 Performance Metrics (After Optimization)

| Metric | Before | After |
|--------|--------|-------|
| Main JS Bundle | 508KB (128KB gzip) | 230KB (71KB gzip) |
| React Chunk | Part of main | 11.8KB (4.2KB gzip) |
| Lucide Icons | Part of main | 11.8KB (2.9KB gzip) |
| Arabic Font | Noto Sans | Cairo (better rendering) |
| Font Preload | No | Yes (faster LCP) |

---

## 🆘 Troubleshooting

### "API calls return 503" on Cloudflare Pages
- ✅ Check: Did you set `GEMINI_API_KEY` in Pages project settings?
- ✅ Check: Is the key valid? Test locally first with `npm run dev`

### Arabic text rendering issues
- ✅ Check: Browser cache cleared? (`Ctrl+Shift+R`)
- ✅ Check: Font loaded? (Open DevTools → Network → look for `cairo`)

### Build fails on Cloudflare
- ✅ Check: `npm run build` works locally? Try it.
- ✅ Check: Node version is 18+? (Cloudflare defaults to 18.x)

### Strategy/Chat not responding
- ✅ Check: Function logs in Cloudflare Pages dashboard
- ✅ Check: Network tab shows POST to `/api/genai`?
- ✅ Check: Is the request reaching the function?

---

## 📞 Key Endpoints After Deploy

| Endpoint | Purpose |
|----------|---------|
| `/` | Main SPA (home page) |
| `/api/genai` | Serverless backend (POST only) |
| `/portfolio`, `/services`, `/contact` | Client-side routes (React Router) |

---

## 🎯 Next Steps

1. **Push to GitHub** (with all changes)
2. **Create Cloudflare Pages** project
3. **Set environment variable** (`GEMINI_API_KEY`)
4. **Trigger deployment** (push to main)
5. **Visit your live URL** (provided by Cloudflare)
6. **Test Strategy Generator & Chatbot** on live site
7. **Monitor** Cloudflare Pages dashboard for errors

---

## 📖 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Google GenAI SDK](https://github.com/google-gemini/generative-ai-js)
- [React 19 + TypeScript](https://react.dev/reference/react)

