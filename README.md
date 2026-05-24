# Athulya Care (Expo sample app)

Sample app with **Welcome**, **Login**, **Dashboard**, and **Book Appointment** screens.

## Test in your browser (recommended)

No phone, emulator, or Expo Go required. Everything runs locally in Chrome/Edge.

```powershell
cd c:\Users\127547.INDIA\Documents\sample\athulya-care
npm run web
```

When the build finishes, open:

**http://localhost:8081**

The UI appears in a phone-sized frame in the center of the page.

### If you see SSL / certificate errors

Your network may block Expo’s online services. Try:

```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED='0'
npm run web
```

Or ask IT to allow `registry.npmjs.org` and `expo.dev`. The web app itself does not need your phone once it is running.

### Build static website (no Expo Go, no emulator)

A ready-to-open website is built into the `dist/` folder:

```powershell
npm run web:build
npm run web:preview
```

Then open **http://localhost:3000** in Chrome or Edge.

You can also copy the entire `dist` folder to any web server or internal hosting.

## Project structure

```
athulya-care/
├── App.tsx
├── src/
│   ├── components/     AuthLayout, WebShell, buttons, tab bar
│   ├── navigation/     AppNavigator
│   ├── screens/        Welcome, Login, Dashboard, BookAppointment
│   └── constants/      theme, images
```

## App flow

Welcome → Continue → Login → Enter Dashboard → Home  
Book Appointment: Dashboard → **Book Appointment** quick action

## Custom background images

Add `assets/welcome-bg.png` and `assets/login-bg.png`, then in `src/constants/images.ts`:

```ts
welcome: require('../../assets/welcome-bg.png'),
login: require('../../assets/login-bg.png'),
```

On **web**, auth screens use a built-in blue gradient (no external images) so they work offline.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run web` | Run in browser at localhost:8081 |
| `npm run web:build` | Export static site to `dist/` |
| `npm start` | Expo dev server (mobile QR) |
