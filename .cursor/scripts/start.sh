#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

start_postgres() {
  if command -v pg_ctlcluster >/dev/null 2>&1; then
    local version
    version="$(ls /etc/postgresql 2>/dev/null | head -1 || true)"
    if [[ -n "${version}" ]] && ! pg_isready -q 2>/dev/null; then
      sudo pg_ctlcluster "${version}" main start || true
    fi
  elif ! pg_isready -q 2>/dev/null; then
    sudo service postgresql start || true
  fi

  for _ in $(seq 1 30); do
    if pg_isready -q; then
      return 0
    fi
    sleep 1
  done

  echo "PostgreSQL did not become ready in time" >&2
  return 1
}

ensure_database() {
  sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';" >/dev/null
  sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = 'eduin_global'" | grep -q 1 \
    || sudo -u postgres psql -c "CREATE DATABASE eduin_global;"
}

start_postgres
ensure_database

cd "$ROOT/backend"
npx prisma migrate deploy
npx prisma db seed
