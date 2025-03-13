
// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('WealthScraper TFSA Detector installed');
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "contentScriptReady") {
    console.log("Content script is ready on:", sender.tab?.url);
  }
});

// Enable the action when on Wealthsimple sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('wealthsimple.com')) {
    chrome.action.setIcon({
      path: {
        "16": "icons/icon16.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
      },
      tabId: tabId
    });
  }
});

// Initialize on startup
chrome.runtime.onStartup.addListener(() => {
  console.log('WealthScraper extension started');
});
