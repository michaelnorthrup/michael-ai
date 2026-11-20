# michael-ai

Personal site: résumé + "Ask about Michael" chat backed by Claude.

- `index.html`: the whole front end (static, no build)
- `api/chat.ts`: Vercel function, streams Claude replies (model via `CHAT_MODEL`, default `claude-opus-5-5`, effort `low`, prompt-cached system prompt, refusal fallbacks on)
- `api/_profile.js`: the **only** thing the bot knows. Public-safe facts only. Update it when the résumé changes.
- `dev.ts`: local server

## Run locally
    echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
    npm run dev        # http://localhost:3000

## Deploy (Vercel)
    npx vercel         # first time: link project
    npx vercel env add ANTHROPIC_API_KEY production
    npx vercel --prod

Set a monthly spend limit on the API key in the Anthropic Console. The in-function rate limit is per-instance and best-effort.
