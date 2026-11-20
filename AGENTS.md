# michael-ai code workspace

This folder, `/Users/mnorthrup/repos/michael-ai`, holds the source code for Michael Northrup's personal site: a résumé page plus a Claude-backed "Ask about Michael" chat. Implementation, build configuration, and deployment live here.

The career workspace is `/Users/mnorthrup/Remote Brain/Projects/career` (Obsidian vault). It is authoritative for career facts, positioning, and what is cleared for public use: `Resume/LinkedIn Profile.md` (public guardrails), `Resume/2026 Accomplishments.md` (Layer 2 is the public layer), and `Resume/Work Experience/`. Read those on demand; don't copy the vault in wholesale.

## Rules for content

- `src/profile.ts` is the only thing the chat bot knows. It and `public/index.html` must contain public-safe facts only: no internal project or platform names, no compensation, no colleague names, no metrics the vault marks unverified or not cleared.
- When résumé facts change in the vault, update `src/profile.ts` and the résumé in `public/index.html` together.
- The bot speaks about Michael in the third person and never discusses compensation, job-search status, or availability.
