# 🚀 Quick Start - Deploy Ansury Systems

## 1. Local Verification (Before Deploy)

```bash
# Test development
npm run dev
# Opens http://localhost:3000
# Try: Strategy Generator + Chatbot

# Test production build
npm run preview
# Opens http://localhost:4173
# Verify it works same as dev
```

## 2. Prepare for Deployment

```bash
# Update copilot instructions
git add .github/copilot-instructions.md

# Add deployment files
git add .env.example DEPLOYMENT.md functions/genai.ts

# Commit all changes
git commit -m "Production-optimized: serverless backend, Arabic font improvements, code splitting"
git push origin main
```

## 3. Deploy to Cloudflare Pages (5 minutes)

### 3a. Create Project
1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Pages** (left sidebar)
3. Click **Create a project** → **Connect to Git**
4. Select your GitHub repo → Authorize

### 3b. Configure Build
| Field | Value |
|-------|-------|
| Project name | `ansury-systems` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output | `dist` |
| Leave framework as "None" | ✓ |

### 3c. Set Environment Variable
1. After project created, go to **Settings** → **Environment variables**
2. Click **Add variable**
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyBvnb4Bh1vWH_rlEM9SNNyZ2V4tEySKKZ8`
   - **Environments:** ✓ Production ✓ Preview
3. Click **Save**

### 3d. Trigger Deploy
1. Go to **Deployments** tab
2. Click **Retry latest deployment** OR
3. Push a new commit to `main` (auto-triggers build)

**Wait ~2 minutes...**

## 4. Your Site is Live! 🎉

Cloudflare provides a URL like: `https://ansury-systems.pages.dev`

### ✅ Test on Live Site:
- [ ] Home page loads
- [ ] Language toggle (EN/AR) works
- [ ] Click "Get Strategy" → fills out form → generates AI strategy
- [ ] Open Chatbot (bottom right) → type message → gets AI response
- [ ] Arabic text renders cleanly (check portfolio, services)

## 5. Custom Domain (Optional)

1. In Pages project: **Settings** → **Domains**
2. Click **Add domain**
3. Enter your domain (e.g., `ansury.systems`)
4. Follow DNS setup steps (Cloudflare will guide you)

---

## 📊 What Got Optimized

| Item | Result |
|------|--------|
| **Bundle Size** | 508KB → 230KB (54% reduction) |
| **Gzipped** | 128KB → 71KB (44% reduction) |
| **Code Splitting** | React & Lucide isolated |
| **Arabic Font** | Cairo font (better rendering) |
| **Backend** | Serverless function `functions/genai.ts` |
| **API Calls** | Browser → Cloudflare Function → Gemini |

---

## 🆘 If Something Goes Wrong

### Deployment failed?
- Check **Deployments** tab → Click failed deployment → View logs
- Scroll through logs for error message
- Common: Missing `npm` cache → click **Retry deployment**

### API calls not working?
- Check: Did you add `GEMINI_API_KEY` to environment variables?
- Check: Network tab (DevTools) → Do you see `/api/genai` POST requests?
- Check: Cloudflare Pages Logs → Are requests reaching the function?

### Arabic text broken?
- Hard refresh browser: `Ctrl+Shift+R`
- Check: Google Fonts loaded? (DevTools → Network → search "Cairo")

---

## 📚 Full Documentation

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting, architecture, and next steps.

---

**You're all set! Deploy away!** 🚀
