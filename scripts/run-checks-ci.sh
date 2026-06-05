#!/bin/bash
# scripts/run-checks-ci.sh — Next.js CI runner (Option B)
# Build → start → check → kill
set -e
PORT=${CHECK_PORT:-3000}
BASE_URL="http://localhost:${PORT}"
PID_FILE="/tmp/prepush-server-$$.pid"
cleanup() {
  if [ -f "$PID_FILE" ]; then
    kill "$(cat "$PID_FILE")" 2>/dev/null || true; rm -f "$PID_FILE"
  fi
}
trap cleanup EXIT INT TERM
echo ""; echo "╔══════════════════════════════════════════════════╗"
echo "║        Pre-Push CI Runner — Tuan Le Law          ║"
echo "╚══════════════════════════════════════════════════╝"; echo ""
echo "📦  Building production bundle..."
npm run build; echo "✅  Build complete."; echo ""
echo "🚀  Starting server on port ${PORT}..."
PORT=$PORT npm run start &; echo $! > "$PID_FILE"
echo "⏳  Waiting for server..."
WAIT=0
until curl -sf "${BASE_URL}/" > /dev/null 2>&1; do
  sleep 1; WAIT=$((WAIT+1))
  if [ $WAIT -ge 30 ]; then echo "❌  Server did not start within 30s."; exit 1; fi
done
echo "✅  Server ready at ${BASE_URL}"; echo ""
CHECK_BASE_URL=$BASE_URL node scripts/pre-deploy-checks.mjs
