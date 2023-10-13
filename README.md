# Viexplore

This project is an Expo application that uses NativeWind for styling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Before you can start the project, ensure that you have Node.js installed. You can check this by running `node -v` in your terminal. If Node.js is not installed, you can download it from the [official website](https://nodejs.org/en/download/).

Fork and clone the project to your machine.

Run `npm install`

Next, install `nativewind` and `tailwindcss` packages by running:

```
npm install nativewind
npm install -dev tailwindcss@3.3.2
```

Initialize tailwind by doing: `npx tailwindcss init`

This will create a file called `tailwind.config.js` in your directory

Add the paths to all of your component files in your tailwind.config.js file.

```javascript
module.exports = {
- content: [],
+ content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Then, add the Babel plugin for NativeWind in your `babel.config.js` file:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};

```

Download the expo app on your mobile device (Playstore or Appstore)

run the command `npx expo start`

Wait until there's a QR code popup, which you can scan in your expo app (Android) or your camera (iOS), the app should be running for you
