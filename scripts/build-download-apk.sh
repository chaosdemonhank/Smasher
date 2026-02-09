#!/bin/bash
set -e

echo "Starting APK build process with Fastlane..."

# Navigate to app-rn
cd app-rn

echo "Installing app dependencies..."
npm ci

# Check for Ruby/Bundler
if ! command -v bundle &> /dev/null; then
    echo "Error: 'bundle' command not found. Please install Ruby and Bundler."
    exit 1
fi

echo "Installing Ruby gems..."
bundle install

echo "Building APK with Fastlane..."
bundle exec fastlane build_apk

# Verify output
APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
    echo "APK generated successfully at $APK_PATH"
    mkdir -p ../build
    cp "$APK_PATH" ../build/app.apk
    echo "APK moved to ../build/app.apk"
else
    echo "Error: APK file not found at $APK_PATH"
    exit 1
fi
