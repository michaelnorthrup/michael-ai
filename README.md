# michael-ai

Personal site: résumé + "Ask about Michael" chat backed by Claude. See
[AGENTS.md](AGENTS.md) for where content comes from and what may be public.

## Layout

Single Cloudflare Worker, TypeScript, pnpm, Node 22+.

| Path | Responsibility |
|---|---|
| `public/index.html` | Résumé, project examples, and chat UI (no build step) |
| `public/site.css` | Shared responsive, dark-mode, and print styles |
| `public/site.js` | Interactive audit example, streaming chat, and print controls |
| `public/notes/` | Short articles using the shared styles |
| `src/index.ts` | Worker entry: `/api/chat`, everything else from `public/` |
| `src/chat.ts` | Streams Claude replies; per-IP rate limit via the `CHAT_LIMITER` binding |
| `src/profile.ts` | Public-safe knowledge base, the only source the bot answers from |

Model comes from `CHAT_MODEL` in `wrangler.toml` (default `claude-opus-5-5`,
effort `low`, prompt-cached system prompt, server-side refusal fallbacks).

## Develop and check

```sh
pnpm install
echo "ANTHROPIC_API_KEY=sk-ant-..." > .dev.vars
pnpm dev          # http://127.0.0.1:8789/
pnpm typecheck
```

## Deploy

Set the API key once per environment (and set a monthly spend limit on the
key in the Anthropic Console):

```sh
pnpm wrangler secret put ANTHROPIC_API_KEY
```

GitHub Workers Builds: connect the repo in the Cloudflare dashboard with root
directory `/` and deploy command `npx wrangler deploy`. Manual deploy:
`pnpm deploy`.

Live at https://mnorthrup.com (www redirects to the apex). The domain is in the
same Cloudflare account; `routes` in `wrangler.toml` attaches it on deploy.
