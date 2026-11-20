# michael-ai

Personal site: résumé + "Ask about Michael" chat backed by Claude. See
[AGENTS.md](AGENTS.md) for where content comes from and what may be public.

## Layout

Single Cloudflare Worker, TypeScript, pnpm, Node 22+.

| Path | Responsibility |
|---|---|
| `public/index.html` | Static résumé page and chat UI (no build step) |
| `src/index.ts` | Worker entry: `/api/chat`, everything else from `public/` |
| `src/chat.ts` | Streams Claude replies; per-IP rate limit via the `CHAT_LIMITER` binding |
| `src/auth.ts` | Workload Identity Federation: the Worker signs its own short-lived JWT and the SDK exchanges it for an access token |
| `wif/jwks.json` | Public key the Claude Console trusts (private half is the `WIF_SIGNING_KEY` secret) |
| `src/profile.ts` | Public-safe knowledge base, the only source the bot answers from |

Model comes from `CHAT_MODEL` in `wrangler.toml` (default `claude-opus-5-5`,
effort `low`, prompt-cached system prompt, server-side refusal fallbacks).

## Authentication: Workload Identity Federation

There is no Anthropic API key. Cloudflare doesn't issue Workers an OIDC
identity token, so the Worker is its own issuer: it signs a 5-minute ES256
JWT with `WIF_SIGNING_KEY`, and a Console federation rule exchanges it for a
short-lived, inference-only access token. The SDK caches and refreshes it.

One-time setup:

1. `pnpm wif:keygen` writes `.keys/wif-signing-key.json` (private, gitignored)
   and `wif/jwks.json` (public). Rerun after deleting `.keys/` to rotate.
2. Claude Console, Settings, Workspaces: create a `michael-ai` workspace and set
   a monthly spend limit on it. This is the real cost cap.
3. Console, Keys, Service accounts: create `michael-ai-worker` (role: developer).
4. Console, Workload identity, Register issuer:
   issuer URL `https://michael-ai.workers` (must equal `WIF_ISSUER` exactly),
   JWKS source **inline**, keys from `wif/jwks.json`.
5. Rules, create a rule: issuer above, match subject `michael-ai-worker` and
   audience `https://api.anthropic.com`, target the service account, workspace
   `michael-ai`, scope `workspace:inference`, token lifetime 3600.
6. Put the organization ID, `fdrl_...` rule ID, and `wrkspc_...` workspace ID
   in `[vars]` in `wrangler.toml`.
7. `pnpm wif:upload` stores the private key as the Worker secret.

To cut access instantly, archive the rule in the Console. Exchanges show
under Workload identity, Authentication events.

## Develop and check

```sh
pnpm install
# .dev.vars: WIF_SIGNING_KEY='<contents of .keys/wif-signing-key.json>'
pnpm dev          # http://127.0.0.1:8789/
pnpm typecheck
```

## Deploy

GitHub Workers Builds: connect the repo in the Cloudflare dashboard with root
directory `/` and deploy command `npx wrangler deploy`. Manual deploy:
`pnpm deploy`.

Custom domain: uncomment `routes` in `wrangler.toml` with a domain in the same
Cloudflare account; Wrangler attaches it and provisions DNS and TLS on deploy.
