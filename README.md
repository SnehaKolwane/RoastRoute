# RoastRoute (Expo React Native)

Simple app for the developer assignment: Finder + Favorites using mock data.

## Features
- Finder tab: Map + list of coffee shops (mock JSON).
- Shop detail screen with "Add to Favorites".
- Favorites tab reads saved favorites (AsyncStorage).

## Setup (fresh machine)
1. Install Node.js (>=16 recommended) and npm.
2. Install Expo CLI (optional but helpful):
npm install -g expo-cli
3. Create the project folder and copy files (or clone repository if provided).

## Install dependencies
From project root:
npm install
expo install react-native-maps expo-location @react-native-async-storage/async-storage react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
Note: `expo install` pins versions compatible with your Expo SDK.

## Run
Start Metro:
npx expo start

vbnet
Copy code
Then:
- Press `a` to open Android emulator (if configured), or
- Scan QR with Expo Go on your phone, or
- Press `i` to open in iOS simulator (macOS).

## Notes
- Map may require extra configuration on Android devices/emulators (Google Maps API key). On many emulators the default map will render; if not, follow react-native-maps docs for API key setup.
- This project uses local `data/mock-coffee-shops.json` — no external API needed.



## What was most challenging (sample)
Ensuring reliable location permission handling across different emulators and devi