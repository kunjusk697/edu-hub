#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export ANDROID_HOME="${ANDROID_HOME:-/opt/android-sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"

if [[ ! -x "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]]; then
  echo "Android SDK not found at $ANDROID_HOME. Run scripts/setup-android-sdk.sh first."
  exit 1
fi

node scripts/write-mobile-config.js
npm ci
npx cap sync android

cd android
./gradlew assembleDebug

APK_SRC="app/build/outputs/apk/debug/app-debug.apk"
ARTIFACT_DIR="/opt/cursor/artifacts"
mkdir -p "$ARTIFACT_DIR" "$ROOT/dist"
cp "$APK_SRC" "$ARTIFACT_DIR/le-mam-debug.apk"
cp "$APK_SRC" "$ROOT/dist/le-mam-debug.apk"

echo ""
echo "APK built:"
echo "  $ROOT/dist/le-mam-debug.apk"
echo "  $ARTIFACT_DIR/le-mam-debug.apk"
