#!/usr/bin/env bash
# Deploy NeuroLabs to the VPS: builds locally, uploads, restarts the service.
# Usage:  npm run deploy:vps
# Override with env vars: DEPLOY_HOST, DEPLOY_KEY, DEPLOY_DIR
set -euo pipefail
HOST="${DEPLOY_HOST:-gilos@188.137.245.38}"
KEY="${DEPLOY_KEY:-$HOME/.ssh/id_ed25519_kvadratmetr}"
DIR="${DEPLOY_DIR:-neurolabs}"
SSH="ssh -i $KEY"
cd "$(dirname "$0")/.."

echo "▶ Building…"
npm run build

echo "▶ Uploading to $HOST:~/$DIR …"
$SSH "$HOST" "mkdir -p $DIR/data"
# each folder synced separately so data/ and .env on the server are never touched
rsync -az --delete -e "$SSH" dist/   "$HOST:$DIR/dist/"
rsync -az --delete -e "$SSH" server/ "$HOST:$DIR/server/"
rsync -az --delete -e "$SSH" lib/    "$HOST:$DIR/lib/"
rsync -az -e "$SSH" package.json "$HOST:$DIR/"

echo "▶ Restarting service…"
$SSH "$HOST" "sudo systemctl restart neurolabs && sleep 1 && systemctl is-active neurolabs"
echo "✅ Done: https://neurolabs.uz"
