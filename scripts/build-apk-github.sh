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

# Check if EXPO_TOKEN is available
if [ -n "$EXPO_TOKEN" ]; then
    echo "Building APK with EAS..."
    npx eas build --platform android --profile production-apk --non-interactive
else
    echo "EXPO_TOKEN not found, building APK locally with Gradle..."
    
    # Setup Android project
    cd android
    ./gradlew assembleRelease
    
    # Find the built APK
    APK_PATH="app/build/outputs/apk/release/app-release.apk"
    if [ -f "$APK_PATH" ]; then
        echo "APK found at $APK_PATH"
        mkdir -p ../../build
        cp "$APK_PATH" ../../build/app.apk
        echo "APK moved to ../../build/app.apk"
    else
        echo "Error: APK file not found at $APK_PATH"
        exit 1
    fi
fi

# For EAS builds, find and copy the APK
if [ -n "$EXPO_TOKEN" ]; then
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
fi
