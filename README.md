# edu-hub

Eduin Global learning platform.

## Backend

NestJS API in `backend/` with Prisma and PostgreSQL.

```bash
cd backend
cp .env.example .env
docker compose up -d
npm install
npm run prisma:generate
npx prisma migrate dev --name init
npm run start:dev
```

The API listens on `PORT` (default `4000`).

Auth: `POST /auth/register`, `POST /auth/login`.

## Admin

Next.js 15 app in `admin/`.

```bash
cd admin
cp .env.example .env.local
npm install
npm run dev
```

`NEXT_PUBLIC_API_URL` defaults to `http://localhost:4000`.

## Student

Pastel mobile student app in `student/`, matching the Eduin theme model (welcome, home, course).

```bash
cd student
cp .env.example .env.local
npm install
npm run dev
```

Opens on port `3001`.
