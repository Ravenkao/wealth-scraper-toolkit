
# WealthScraper TFSA Detector Chrome Extension

A Chrome extension that helps users detect if they have TFSA accounts on their Wealthsimple dashboard.

## Features

- Automatically scans Wealthsimple dashboard for TFSA accounts
- Displays total TFSA balance across all accounts
- Shows detailed breakdown of all accounts
- Privacy-focused: all processing happens locally in your browser

## Installation for Development

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the `extension` directory from this project
5. The extension should now be installed and ready to use

## How to Use

1. Log in to your Wealthsimple account at https://my.wealthsimple.com
2. Click on the WealthScraper extension icon in your browser toolbar
3. Click "Scan for TFSA Accounts"
4. View your results!

## Building from Source

To build the extension from source:

1. Ensure you have Node.js and npm installed
2. Run `npm install` to install dependencies
3. Run `npm run build-extension` to build the extension
4. The built extension will be available in the `dist/extension` directory

## Privacy

This extension:
- Only runs on Wealthsimple domains
- Processes all data locally in your browser
- Does not send any data to external servers
- Does not store any personal financial information

## Disclaimer

This extension is not affiliated with or endorsed by Wealthsimple. It is provided for educational and convenience purposes only. Financial information detected by this extension should be verified with your official Wealthsimple account statements.
