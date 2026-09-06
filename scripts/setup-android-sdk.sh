#!/usr/bin/env bash
set -euo pipefail

export ANDROID_HOME="${ANDROID_HOME:-/opt/android-sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"

if [[ -x "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]] && [[ -d "$ANDROID_HOME/platforms/android-34" ]]; then
  echo "Android SDK already installed at $ANDROID_HOME"
  exit 0
fi

sudo mkdir -p "$ANDROID_HOME/cmdline-tools"
cd /tmp
curl -fsSL -o cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
sudo unzip -qo cmdline-tools.zip -d "$ANDROID_HOME/cmdline-tools"
sudo mv "$ANDROID_HOME/cmdline-tools/cmdline-tools" "$ANDROID_HOME/cmdline-tools/latest"
rm -f cmdline-tools.zip
sudo chown -R "$(whoami):$(whoami)" "$ANDROID_HOME"

export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
printf 'y\n%.0s' {1..50} | sdkmanager --licenses >/dev/null || true
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

echo "Android SDK ready at $ANDROID_HOME"
