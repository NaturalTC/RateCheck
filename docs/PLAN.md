# RateCheck - Project Plan

**Goal:** a Massachusetts car insurance *estimator*. A user enters a ZIP code and a
few allowed rating factors and gets an estimated annual premium range, with a
breakdown of how each factor moved it. It is an estimate, never a quote.

**Stack:** MongoDB · Express · React · Node, all TypeScript. Vite for the client,
Vitest + Supertest for tests, GitHub Actions CI, Docker Compose for local MongoDB,
MongoDB Atlas (free tier) for deployment.

**Ground rules**
- Every number in `server/src/rules/` cites a source in its `sources` array.
- Only factors the state allows. Massachusetts bans credit score, sex, marital
  status, occupation, income, education and home ownership.
- Collect the minimum: no names, license numbers, VINs or exact addresses.
- Write the React and business logic yourself; use Claude Code to explain and review.

---

## Milestone 0 - Scaffold (done)
- [x] npm workspaces monorepo (`client/`, `server/`)
- [x] Express API with `/api/health`, env validation (zod), MongoDB connection
- [x] React + Vite client that calls the API through a dev proxy
- [x] Docker Compose MongoDB, CI (lint, typecheck, test, build)

## Milestone 1 - Data research (no code)
- [ ] Read the MA Auto Insurance Bill of Rights; confirm allowed/banned factors
- [ ] Email the MA Division of Insurance asking how to access private passenger auto rate filings
- [ ] Find a published MA average premium to use as the baseline
- [ ] Look up the Safe Driver Insurance Plan surcharge steps
- [ ] Look up the 2025 MA minimum coverage limits
- [ ] Replace the placeholders in `server/src/rules/ma.ts`, with a source for each

## Milestone 2 - Estimate engine (backend, you write it)
- [ ] Write the tests in `server/test/estimate.test.ts` first
- [ ] Implement `estimate()` in `server/src/estimate/estimate.ts`
- [ ] `POST /api/estimate`: validate the body with zod, reject non-MA ZIP codes with a clear message
- [ ] Route tests with Supertest (valid input, bad ZIP, missing fields)

## Milestone 3 - Estimate form (frontend, you write it)
- [ ] Controlled form: ZIP, years licensed, driving record, vehicle type, mileage, coverage
- [ ] Client-side validation that mirrors the server
- [ ] Results view: range plus a per-factor breakdown
- [ ] Loading and error states; works at phone width
- [ ] Component tests (Vitest + React Testing Library)

## Milestone 4 - MongoDB
- [ ] Store anonymous estimate requests (factors only, no identity) to show usage stats
- [ ] Optionally move state rules into a `stateRules` collection, seeded from the TS files
- [ ] `/api/stats`: number of estimates served (a real usage number for your CV)

## Milestone 5 - Deploy
- [ ] MongoDB Atlas M0 cluster
- [ ] Deploy the API (Render/Railway/AWS) and the client (Vercel/Netlify/S3)
- [ ] Deploy step in GitHub Actions; secrets in GitHub, never in the repo
- [ ] README screenshots and a live link

## Later
- More states via new `rules/<state>.ts` files (Connecticut next)
- Per-insurer estimates if rate filing data becomes available
- Rate limiting on `/api/estimate`
