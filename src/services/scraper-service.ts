
import { AccountBalance, AccountType, ScrapingResult } from "../models/wealth-simple";

class ScraperService {
  /**
   * Scrapes the Wealthsimple dashboard to detect TFSA accounts
   */
  async scrapeWealthsimple(): Promise<ScrapingResult> {
    try {
      // This would be executed in a browser context via the Chrome extension
      // Check if we're on the Wealthsimple site
      if (!window.location.href.includes('wealthsimple.com')) {
        return this.createErrorResult('Not on Wealthsimple site');
      }

      console.log('Scanning Wealthsimple for TFSA accounts...');
      
      // Find all account elements in the dashboard
      const accountElements = document.querySelectorAll('[data-testid="account-list-item"], .account-list-item');
      
      if (accountElements.length === 0) {
        // Try alternative selectors if the page structure has changed
        const potentialAccountSections = Array.from(document.querySelectorAll('div')).filter(div => {
          const text = div.textContent?.toLowerCase() || '';
          return text.includes('tfsa') || text.includes('account');
        });
        
        if (potentialAccountSections.length === 0) {
          return this.createErrorResult('Unable to locate account elements on page');
        }
      }
      
      console.log(`Found ${accountElements.length} account elements`);
      
      // Extract account data
      const accounts: AccountBalance[] = [];
      let hasTFSA = false;
      let totalTFSABalance = 0;
      
      accountElements.forEach(element => {
        const accountText = element.textContent || '';
        const accountTypeElement = element.querySelector('[data-testid="account-type"], .account-type') || element;
        const accountType = this.determineAccountType(accountTypeElement.textContent || '');
        
        // Extract balance - look for dollar amounts
        const balanceMatch = accountText.match(/\$([0-9,.]+)/);
        const balance = balanceMatch ? balanceMatch[0] : '$0.00';
        
        // Extract account name
        let accountName = 'Unknown Account';
        const possibleNameElements = element.querySelectorAll('h3, h4, .account-name, [data-testid="account-name"]');
        if (possibleNameElements.length > 0) {
          accountName = possibleNameElements[0].textContent?.trim() || accountName;
        }
        
        const isTFSA = accountType === AccountType.TFSA || 
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
      
      return {
        success: true,
        timestamp: new Date().toISOString(),
        accounts: accounts,
        summary: {
          hasTFSA: hasTFSA,
          totalTFSABalance: formattedTotalBalance,
          totalAccounts: accounts.length
        }
      };
    } catch (error) {
      console.error('Scraping error:', error);
      return this.createErrorResult(error instanceof Error ? error.message : 'Unknown error');
    }
  }
  
  private determineAccountType(text: string): AccountType {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('tfsa')) {
      return AccountType.TFSA;
    } else if (lowerText.includes('cash')) {
      return AccountType.CASH;
    } else {
      return AccountType.OTHER;
    }
  }
  
  private createErrorResult(errorMessage: string): ScrapingResult {
    return {
      success: false,
      timestamp: new Date().toISOString(),
      accounts: [],
      summary: {
        hasTFSA: false,
        totalTFSABalance: '$0.00',
        totalAccounts: 0
      },
      error: errorMessage
    };
  }
  
  /**
   * This simulates the scraping for the demo web app
   * In the actual extension, the real scrapeWealthsimple would be used
   */
  async simulateScraping(): Promise<ScrapingResult> {
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const hasTFSA = Math.random() > 0.3; // 70% chance of having a TFSA
    const tfsaBalance = hasTFSA ? (Math.random() * 50000).toFixed(2) : '0.00';
    const formattedTFSABalance = `$${parseFloat(tfsaBalance).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
    
    const accounts: AccountBalance[] = [];
    
    // Always include a cash account
    accounts.push({
      accountType: AccountType.CASH,
      accountName: 'Cash Account',
      balance: `$${(Math.random() * 10000).toFixed(2)}`,
      hasTFSA: false
    });
    
    // Add TFSA if needed
    if (hasTFSA) {
      accounts.push({
        accountType: AccountType.TFSA,
        accountName: 'TFSA Investment',
        balance: formattedTFSABalance,
        hasTFSA: true
      });
      
      // Sometimes add a second TFSA
      if (Math.random() > 0.6) {
        const secondTFSABalance = (Math.random() * 20000).toFixed(2);
        accounts.push({
          accountType: AccountType.TFSA,
          accountName: 'TFSA Savings',
          balance: `$${secondTFSABalance}`,
          hasTFSA: true
        });
      }
    }
    
    // Sometimes add other account types
    if (Math.random() > 0.5) {
      accounts.push({
        accountType: AccountType.OTHER,
        accountName: 'Registered Savings',
        balance: `$${(Math.random() * 30000).toFixed(2)}`,
        hasTFSA: false
      });
    }
    
    return {
      success: true,
      timestamp: new Date().toISOString(),
      accounts: accounts,
      summary: {
        hasTFSA: hasTFSA,
        totalTFSABalance: formattedTFSABalance,
        totalAccounts: accounts.length
      }
    };
  }
}

export default new ScraperService();
