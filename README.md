# Fullstack Template — Vite React + Tailwind v4 / Node TS + Mongo

[![Frontend CI](https://github.com/yolandaatt/Portfolio/actions/workflows/frontend.yml/badge.svg)](https://github.com/yolandaatt/Portfolio/actions/workflows/frontend.yml)
[![Backend CI](https://github.com/yolandaatt/Portfolio/actions/workflows/backend.yml/badge.svg)](https://github.com/yolandaatt/Portfolio/actions/workflows/backend.yml)

En snabbstartsmall för moderna projekt:

- **Frontend:** Vite + React + TypeScript + Tailwind **v4** (PostCSS v4), ESLint (flat), Prettier, Husky/lint-staged, **Vitest + Testing Library**
- **Backend:** Node 20 + Express + TypeScript + MongoDB (Mongoose), **Vitest + Supertest**, ESLint (flat), Prettier
- **CI:** separata GitHub Actions för client/server (lint, **test**, build)
- **Docker:** `docker-compose.dev.yml` (hot-reload) & `docker-compose.prod.yml` (Nginx + healthchecks)

---

## Innehåll

- [Krav](#krav)
- [Struktur](#struktur)
- [Använd som template](#använd-som-template)
- [Lokal utveckling (utan Docker)](#lokal-utveckling-utan-docker)
- [Utveckling med Docker Compose](#utveckling-med-docker-compose)
- [Produktion med Docker Compose](#produktion-med-docker-compose)
- [Miljövariabler](#miljövariabler)
- [Scripts](#scripts)
- [CI](#ci)
- [Editor & kodstil](#editor--kodstil)
- [Felsökning](#felsökning)
- [Licens](#licens)

---

## Krav

- **Node 20** (rekommenderat: `nvm use 20`)
- **npm 10+**
- **Docker Desktop** (för Compose-flöden)

---

## Struktur

```txt
.
├─ .github/workflows/
│  ├─ frontend.yml
│  └─ backend.yml
├─ .vscode/
│  ├─ settings.json
│  └─ extensions.json
├─ docker/
│  ├─ client.Dockerfile
│  └─ server.Dockerfile
├─ client/                    # Vite + React + TS + Tailwind v4
│  ├─ src/
│  │  ├─ App.tsx, main.tsx, index.css
│  │  └─ test/setup.ts        # jest-dom för Vitest
│  ├─ App.test.tsx            # exempeltest
│  ├─ vitest.config.ts
│  ├─ .env.example / .env / .env.production
│  ├─ postcss.config.js       # @tailwindcss/postcss
│  ├─ tailwind.config.ts
│  ├─ eslint.config.js / .prettierrc / .prettierignore / .husky
│  └─ nginx.conf              # används i client.Dockerfile (prod)
├─ server/                    # Express + TS + Mongo + Vitest
│  ├─ src/ (app.ts, index.ts, db.ts, routes/health.ts)
│  ├─ tests/health.test.ts
│  ├─ tsconfig.base.json / tsconfig.json / tsconfig.build.json
│  ├─ .env.example / .env
│  └─ eslint.config.js / vitest.config.ts
├─ docker-compose.dev.yml
├─ docker-compose.prod.yml
├─ .editorconfig
├─ .gitignore
└─ README.md
```

Använd som template

Klicka Use this template på GitHub → skapa nytt repo.

Klona och installera:

cd client && npm ci
cd ../server && npm ci

Skapa .env-filer (se Miljövariabler
).

Verifiera:

# client

npm run lint && npm run test && npm run build

# server

npm run lint && npm run test && npm run build

Lokal utveckling (utan Docker)

# Backend

cd server
cp .env.example .env # MONGO_URI=mongodb://localhost:27017/app, PORT=3001
npm run dev # kräver en Mongo lokalt eller i container

# Frontend

cd ../client
cp .env.example .env # VITE_API_URL=http://localhost:3001
npm run dev

Utveckling med Docker Compose

Skapa env-filer:

# client/.env

VITE_API_URL=http://server:3001

# server/.env

PORT=3001
MONGO_URI=mongodb://mongo:27017/app

Starta stacken:

docker compose -f docker-compose.dev.yml up --build

Frontend: http://localhost:5173

API: http://localhost:3001/health
→ { "status": "ok" }

Stoppa:

docker compose -f docker-compose.dev.yml down

# lägg -v om du vill radera Mongo-datan:

# docker compose -f docker-compose.dev.yml down -v

Windows/OneDrive: bind mounts under OneDrive kan vara långsamma. Om hot-reload känns trögt, lägg projektet under t.ex. C:\dev\projekt.

Produktion med Docker Compose

Sätt klientens prod-URL:

# client/.env.production

VITE_API_URL=http://localhost:3001

Bygg & starta:

docker compose -f docker-compose.prod.yml up -d --build

Frontend (Nginx): http://localhost

API: http://localhost:3001/health

Stoppa:

docker compose -f docker-compose.prod.yml down

Prod-compose innehåller healthchecks (server & client) och väntar in en frisk server innan klienten markeras som uppe.

Miljövariabler

Client (Vite läser client/.env\* och kräver prefix VITE\_):

VITE_API_URL — bas-URL till backend

dev-compose: http://server:3001

lokal dev utan Docker: http://localhost:3001

prod (lokalt): http://localhost:3001

Server:

PORT — lyssningsport (default 3001)

MONGO_URI — t.ex. mongodb://localhost:27017/app (lokalt) eller mongodb://mongo:27017/app (Compose)

Riktiga .env-filer ignoreras av Git; .env.example checkas in som mall.

Scripts
Client (client/)
npm run dev # startar Vite
npm run build # tsc -b && vite build
npm run preview # serva build
npm run lint # ESLint (flat)
npm run lint:fix
npm run format # Prettier --write
npm run format:check
npm run test # Vitest (headless)
npm run test:watch

Server (server/)
npm run dev # tsx watch src/index.ts
npm run build # tsc -p tsconfig.build.json
npm start # node dist/index.js
npm run lint
npm run lint:fix
npm run test # Vitest + Supertest
npm run test:watch

CI

Frontend CI (.github/workflows/frontend.yml): npm ci → lint → test → build.

Backend CI (.github/workflows/backend.yml): npm ci → lint → test → build.

Rekommenderat: använd paths: i varje workflow så jobben bara triggar när rätt mapp ändras samt concurrency för att avbryta äldre körningar på samma branch.

Editor & kodstil

.editorconfig – enhetliga radslut/indentering (LF, 2 spaces).

.vscode/settings.json – format on save + ESLint fix on save.

.vscode/extensions.json – rekommenderar ESLint, Prettier, Tailwind, Docker.

Husky + lint-staged (i client): lint/format på staged filer.

Felsökning

Docker Desktop “Engine stopped”

Säkerställ WSL2 och “Use the WSL 2 based engine”.

wsl --shutdown, starta om Docker Desktop.

Sista utväg: Docker Desktop → Troubleshoot → Reset to factory defaults.

Port 80 upptagen i prod

Ändra i docker-compose.prod.yml: client.ports: ["8080:80"] → öppna http://localhost:8080.

Frontend når inte API i dev-compose

Kontrollera att client/.env har VITE_API_URL=http://server:3001 (inte localhost).
