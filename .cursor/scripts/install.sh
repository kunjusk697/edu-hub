#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

if [[ ! -f backend/.env ]]; then
  cp backend/.env.example backend/.env
fi

if [[ ! -f admin/.env.local ]]; then
  cp admin/.env.example admin/.env.local
fi

if [[ ! -f student/.env.local ]]; then
  cp student/.env.example student/.env.local
fi

(cd backend && npm ci)
(cd admin && npm ci)
(cd student && npm ci)

(cd backend && npm run prisma:generate)
