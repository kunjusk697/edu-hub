# edu-hub

Eduin Global learning platform.

## Backend

NestJS API in `backend/` with Prisma and PostgreSQL.

### Setup

```bash
cd backend
cp .env.example .env
docker compose up -d
npm install
npm run prisma:generate
npx prisma migrate dev --name init
npm run start:dev
```

The API listens on `PORT` (default `4000`). `GET /health` returns `{ "status": "ok" }`.
