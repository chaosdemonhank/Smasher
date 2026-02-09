#!/bin/bash
set -e

echo "Starting APK build process for GitHub Actions..."

# Navigate to app-rn
cd app-rn

echo "Installing app dependencies..."
npm ci

# Setup Android environment
export ANDROID_HOME=$ANDROID_SDK_ROOT
export JAVA_HOME=$JAVA_HOME_17_X64

echo "Building APK with EAS..."
npx eas build --platform android --profile production-apk --non-interactive

# Find the built APK
APK_PATH=$(find . -name "*.apk" -type f | head -1)
if [ -n "$APK_PATH" ]; then
    echo "APK found at $APK_PATH"
    mkdir -p ../build
    cp "$APK_PATH" ../build/app.apk
    echo "APK moved to ../build/app.apk"
else
    echo "Error: APK file not found"
    exit 1
fi
