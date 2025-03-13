
// This script runs on the Wealthsimple page

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanWealthsimple") {
    console.log("WealthScraper: Scanning page for TFSA accounts...");
    
    try {
      // Check if we're on the Wealthsimple site
      if (!window.location.href.includes('wealthsimple.com')) {
        sendResponse({
          success: false,
          error: 'Not on Wealthsimple site'
        });
        return true;
      }
      
      // Find all account elements in the dashboard
      const accountElements = document.querySelectorAll('[data-testid="account-list-item"], .account-list-item, div[role="button"]');
      
      if (accountElements.length === 0) {
        // Try alternative selectors if the page structure has changed
        const potentialAccountSections = Array.from(document.querySelectorAll('div')).filter(div => {
          const text = div.textContent?.toLowerCase() || '';
          return text.includes('tfsa') || text.includes('account');
        });
        
        if (potentialAccountSections.length === 0) {
          sendResponse({
            success: false,
            error: 'Unable to locate account elements on page'
          });
          return true;
        }
      }
      
      console.log(`WealthScraper: Found ${accountElements.length} account elements`);
      
      // Extract account data
      const accounts = [];
      let hasTFSA = false;
      let totalTFSABalance = 0;
      
      accountElements.forEach(element => {
        const accountText = element.textContent || '';
        const accountTypeElement = element.querySelector('[data-testid="account-type"], .account-type') || element;
        const accountType = determineAccountType(accountTypeElement.textContent || '');
        
        // Extract balance - look for dollar amounts
        const balanceMatch = accountText.match(/\$([0-9,.]+)/);
        const balance = balanceMatch ? balanceMatch[0] : '$0.00';
        
        // Extract account name
        let accountName = 'Unknown Account';
        const possibleNameElements = element.querySelectorAll('h3, h4, .account-name, [data-testid="account-name"]');
        if (possibleNameElements.length > 0) {
          accountName = possibleNameElements[0].textContent?.trim() || accountName;
        }
        
        const isTFSA = accountType === 'TFSA' || 
                       accountText.toLowerCase().includes('tfsa') ||
                       accountName.toLowerCase().includes('tfsa');
        
        if (isTFSA) {
          hasTFSA = true;
          // Add to total TFSA balance - extract numeric value
          const numericBalance = parseFloat(balance.replace(/[$,]/g, '')) || 0;
          totalTFSABalance += numericBalance;
        }
        
        accounts.push({
          accountType: accountType,
          accountName: accountName,
          balance: balance,
          hasTFSA: isTFSA
        });
      });
      
      // Format total TFSA balance
      const formattedTotalBalance = `$${totalTFSABalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
      
      sendResponse({
        success: true,
        timestamp: new Date().toISOString(),
        accounts: accounts,
        summary: {
          hasTFSA: hasTFSA,
          totalTFSABalance: formattedTotalBalance,
          totalAccounts: accounts.length
        }
      });
      
    } catch (error) {
      console.error('WealthScraper: Error scanning page:', error);
      sendResponse({
        success: false,
        error: error.message || 'Unknown error scanning page'
      });
    }
    
    return true; // Required for async sendResponse
  }
});

function determineAccountType(text) {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('tfsa')) {
    return 'TFSA';
  } else if (lowerText.includes('cash')) {
    return 'Cash';
  } else {
    return 'Other';
  }
}

// Let the background script know the content script has loaded
chrome.runtime.sendMessage({ action: "contentScriptReady" });
