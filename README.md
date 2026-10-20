# RateCheck

Estimate what car insurance might cost in Massachusetts, and see *why*.
Enter a ZIP code and a few rating factors; RateCheck returns an estimated annual
premium range with a breakdown of how each factor affected it.

> **An estimate, not a quote.** RateCheck is not an insurer or agent and does not
> sell or recommend insurance. Figures come from public sources listed in
> `server/src/rules/`.

## Stack
MongoDB · Express · React · Node (TypeScript throughout) · Vite · Vitest ·
Docker Compose · GitHub Actions

## Run locally
Requires Node 22+ and Docker.

```bash
npm install
cp server/.env.example server/.env
docker compose up -d        # MongoDB on localhost:27017
npm run dev                 # API on :4000, client on :5173
```

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | API and client with hot reload |
| `npm test` | All tests |
| `npm run lint` / `npm run typecheck` | Static checks |
| `npm run build` | Production builds |

## Roadmap
See [docs/PLAN.md](docs/PLAN.md).
