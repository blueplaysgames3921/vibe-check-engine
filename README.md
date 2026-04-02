# Vibe Check Engine

A content generation tool that takes a topic and returns a viral-ready hook, a short cinematic body, and an AI-generated image — all in one request. Built with Next.js 14 and the Pollinations API.

---

## How it works

You type a topic. The app sends it to a `/api/generate` route which hits the Pollinations text API using an OpenAI-compatible chat completions endpoint. The model (`gemini-fast`) returns a strict JSON object with three fields: a hook, a body, and an image prompt. That image prompt is then passed to Pollinations' Flux model to generate a matching visual.

The whole thing is structured so the UI never has to parse freeform AI text — the API enforces `json_object` mode and the route validates all three fields before returning anything to the client.

---

## Stack

- **Next.js 14** — App Router, server components, API routes
- **Pollinations.ai** — free inference API for both text (`gemini-fast`) and images (`flux`)
- **Tailwind CSS** — styling
- **Vercel** — deployment

No database. No auth. No paid API keys required.

---

## Getting started

```bash
git clone https://github.com/yourname/vibe-check-engine.git
cd vibe-check-engine
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
  app/
    api/generate/route.ts   # The generation endpoint
    layout.tsx              # Root layout, metadata, fonts
    page.tsx                # Main UI
  components/
    Header.tsx
    InputForm.tsx
    ResultCard.tsx
  lib/
    constants.ts            # Models, base URL, system prompt
    types.ts
public/
  favicon.ico
  manifest.json
  robots.txt
  sitemap.xml
  og-image.png              # 1200x630 — used for social share previews
```

---

## API route

`POST /api/generate`

**Request body**
```json
{ "topic": "the loneliness of overnight flights" }
```

**Response**
```json
{
  "hook": "Nobody tells you about the 3am seat belt sign.",
  "body": "...",
  "imagePrompt": "Cinematic photography, empty airplane cabin at night..."
}
```

**Error responses**

| Status | Meaning |
| --- | --- |
| 422 | AI returned malformed or incomplete JSON |
| 502 | Pollinations API is down or unreachable |
| 504 | Request timed out (8s limit to avoid Vercel 504s) |

The route uses an `AbortController` with an 8-second timeout. If Pollinations doesn't respond in time, the client gets a 504 instead of hanging until Vercel kills the function.

---

## Content structure

Every generation follows the same three-part format defined in the system prompt:

- **Hook** — 10 words max. A curiosity gap that makes someone stop scrolling.
- **Body** — 3 sentences. Cinematic, high-impact, no filler.
- **Image prompt** — Engineered for Flux: subject, lighting style, lens, color grade. The model doesn't freestyle this — it fills a template so the output is consistently usable.

---

## Deployment

Deploy to Vercel with one click or via CLI:

```bash
npm install -g vercel
vercel
```

No environment variables required. The app calls Pollinations directly from the server-side API route, which keeps your Referer header clean and avoids CORS issues on the client.

---
