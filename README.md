# AaPanel Mobile 📱

**AaPanel Mobile** is an unofficial mobile client built with **Expo React Native** for managing your server via the [aaPanel API](https://www.aapanel.com/). This app was created as a hobby project to provide a simple, lightweight, and mobile-friendly interface for server monitoring and website management.

> ⚠️ This project is **not affiliated with or endorsed by the official aaPanel team**.

---

## ✨ Features

- 🔐 First-time setup with persistent API credentials (`panel_url` and `api_key`)
- 📊 System statistics dashboard:
  - CPU usage
  - Memory usage
  - Disk space
  - Network traffic
  - Visualized with bar and pie charts
- 🌐 Website management:
  - List of all websites
  - Start and stop site actions
- ℹ️ About page with creator info
- 🌓 Auto Dark Mode (adapts to system theme)

---

## 📦 Tech Stack

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Axios](https://axios-http.com/)
- [CryptoJS](https://www.npmjs.com/package/crypto-js)
- [qs](https://www.npmjs.com/package/qs)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
- [React Navigation](https://reactnavigation.org/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/aapanel-mobile.git
cd aapanel-mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

### 4. Open on a mobile device

* Install **Expo Go** from Play Store or App Store
* Scan the QR code in your terminal or browser

---

## ⬇️ Download

You can download the latest release of AaPanel Mobile from the [releases page](https://github.com/teguh02/aapanel-mobile/releases/tag/1.0.1).

---

## 📸 Screenshots

Here are some screenshots of the application:

![AaPanel Mobile Screenshot](build/images/screenshoot.jpg)

---

## ⚙️ API Configuration

Upon first launch, you'll be prompted to input:

* `panel_url`: e.g., `https://192.168.1.100:7800`
* `api_key`: the key you generated from your aaPanel dashboard

These values are securely stored in your device using AsyncStorage and reused for future requests.

---

## 🔐 Authentication Mechanism

Each API request includes:

* `request_time`: current UNIX timestamp
* `request_token`: `md5(request_time + md5(api_key))`

All API calls use `POST` with `application/x-www-form-urlencoded`.

---

## 👤 About the Creator

**Teguh Rijanandi**
📧 [teguhrijanandi02@gmail.com](mailto:teguhrijanandi02@gmail.com)

This application is an independent project developed out of personal interest in server management and mobile app development.

---

## 📄 License

This project is licensed under the MIT License.

## Local web development

For panels without browser CORS support, create `.env.local` containing
`EXPO_PUBLIC_PANEL_PROXY_ORIGIN=https://your-panel.example.com`, then run
`npm ci` and `npm run dev:web`. Enter the same panel origin and your API key
in the application. Do not put the API key in the environment file or repository.
Restart the development server after changing the proxy origin.

The proxy is available only in the local Metro development server. A static
web export requires a separately configured backend or panel CORS support.
Use `npm run typecheck` and `npm run build:web` to validate changes.

## Android and iOS builds

Sign in to the linked Expo account, then run `eas build --platform android --profile android-apk` for an installable APK. For iPhone, run `eas build --platform ios --profile ios-device`; an Apple Developer account and a registered device are required for internal installation. TestFlight distribution requires App Store Connect setup.
