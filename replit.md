# Workspace

## Overview

pnpm workspace monorepo using TypeScript. The main product is NEVERLATEAI, a full-stack AI-powered assignment manager that helps signed-in students track assignments, calculate priority, predict ideal start windows, monitor deadlines, and generate a daily study plan.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (`artifacts/student-assignment-manager`)
- **API framework**: Express 5 (`artifacts/api-server`)
- **Authentication**: Managed sign-in/sign-up with branded app routes
- **Storage**: JSON file storage (`artifacts/api-server/data/assignments.json`)
- **AI logic**: Rule-based assignment planning in `artifacts/api-server/src/lib/assignment-ai.ts`
- **Validation**: Zod (`zod/v4`) generated from OpenAPI
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/student-assignment-manager run dev` — run the NEVERLATEAI frontend

## NEVERLATEAI

### Folder Structure

- `artifacts/student-assignment-manager/src/pages/dashboard.tsx` — main dashboard route
- `artifacts/student-assignment-manager/src/App.tsx` — public landing page, sign-in/sign-up routes, and protected dashboard routing
- `artifacts/student-assignment-manager/public/logo.svg` — branded auth logo
- `artifacts/student-assignment-manager/src/components/assignment-list.tsx` — assignment form, CRUD controls, priority list, and calendar grouping
- `artifacts/student-assignment-manager/src/components/dashboard-stats.tsx` — summary cards
- `artifacts/student-assignment-manager/src/components/daily-recommendations.tsx` — daily study plan
- `artifacts/api-server/src/routes/assignments.ts` — assignment API routes
- `artifacts/api-server/src/middlewares/clerkProxyMiddleware.ts` — production auth proxy middleware
- `artifacts/api-server/src/lib/assignment-ai.ts` — start-time prediction, priority scoring, warnings, and daily plan logic
- `artifacts/api-server/src/lib/assignment-store.ts` — per-user JSON persistence and seed data
- `lib/api-spec/openapi.yaml` — API contract

### Run Instructions

1. Start the API server: `pnpm --filter @workspace/api-server run dev`
2. Start the web app: `pnpm --filter @workspace/student-assignment-manager run dev`
3. Open the preview at `/`.
4. Sign up or sign in from the public home page.
5. Add, edit, or delete assignments from the protected dashboard. The server recalculates priority, start suggestions, warnings, calendar grouping, and daily recommendations after each change.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
