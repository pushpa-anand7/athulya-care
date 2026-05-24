#!/usr/bin/env bash
# Installs Expo Go matching this project's SDK (required — Play Store Expo Go may be the wrong SDK).
set -euo pipefail

APK_URL="https://github.com/expo/expo-go-releases/releases/download/Expo-Go-54.0.8/Expo-Go-54.0.8.apk"
APK_FILE="${TMPDIR:-/tmp}/Expo-Go-54.0.8.apk"

if ! command -v adb >/dev/null 2>&1; then
  echo "adb not found. Install Android platform-tools or open Android Studio."
  exit 1
fi

if ! adb devices | grep -q 'device$'; then
  echo "No Android device connected. Enable USB debugging and connect your phone."
  adb devices
  exit 1
fi

echo "Downloading Expo Go 54.0.8..."
curl -fsSL -o "$APK_FILE" "$APK_URL"

echo "Removing old Expo Go (if present)..."
adb uninstall host.exp.exponent 2>/dev/null || true

echo "Installing Expo Go 54.0.8..."
adb install -r "$APK_FILE"

echo "Done. Open Expo Go on your phone, then scan the QR from: npm start"
