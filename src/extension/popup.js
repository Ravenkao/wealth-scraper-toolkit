
document.addEventListener('DOMContentLoaded', function() {
  const scanButton = document.getElementById('scan-button');
  const backButton = document.getElementById('back-button');
  const startView = document.getElementById('start-view');
  const resultsView = document.getElementById('results-view');
  const scanningIndicator = document.getElementById('scanning-indicator');
  const resultsSummary = document.getElementById('results-summary');
  const accountList = document.getElementById('account-list');
  const statusMessage = document.getElementById('status-message');
  
  let isWealthsimpleSite = false;
  
  // Check if we're on a Wealthsimple site
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    if (currentTab.url.includes('wealthsimple.com')) {
      isWealthsimpleSite = true;
      statusMessage.textContent = 'Ready to scan Wealthsimple for TFSA accounts';
      scanButton.disabled = false;
    } else {
      statusMessage.textContent = 'Navigate to Wealthsimple dashboard to scan for TFSA accounts';
      scanButton.disabled = true;
    }
  });
  
  // Handle scan button click
  scanButton.addEventListener('click', function() {
    if (!isWealthsimpleSite) {
      statusMessage.textContent = 'Please navigate to Wealthsimple first';
      return;
    }
    
    scanningIndicator.classList.remove('hidden');
    scanButton.disabled = true;
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scanWealthsimple" }, function(response) {
        scanningIndicator.classList.add('hidden');
        
        if (chrome.runtime.lastError) {
          showError("Error: Could not connect to the page. Please refresh and try again.");
          scanButton.disabled = false;
          return;
        }
        
        if (!response || !response.success) {
          showError(response?.error || "Unknown error occurred while scanning");
          scanButton.disabled = false;
          return;
        }
        
        // Show results
        displayResults(response);
        startView.classList.add('hidden');
        resultsView.classList.remove('hidden');
      });
    });
  });
  
  // Handle back button click
  backButton.addEventListener('click', function() {
    resultsView.classList.add('hidden');
    startView.classList.remove('hidden');
    scanButton.disabled = false;
    accountList.innerHTML = '';
    resultsSummary.innerHTML = '';
  });
  
  function showError(message) {
    statusMessage.textContent = message;
    statusMessage.parentElement.classList.remove('bg-blue-50', 'border-blue-100', 'text-blue-800');
    statusMessage.parentElement.classList.add('bg-red-50', 'border-red-100', 'text-red-800');
  }
  
  function displayResults(result) {
    const { summary, accounts } = result;
    
    // Clear previous results
    accountList.innerHTML = '';
    
    // Display summary
    resultsSummary.innerHTML = '';
    resultsSummary.className = `mb-3 p-3 rounded-lg ${summary.hasTFSA ? 'bg-green-50 border border-green-100' : 'bg-amber-50 border border-amber-100'}`;
    
    const summaryHTML = `
      <div class="flex items-center">
        <div class="${summary.hasTFSA ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} w-10 h-10 rounded-full flex items-center justify-center mr-3">
          ${summary.hasTFSA 
            ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>'}
        </div>
        <div>
          <div class="font-medium">${summary.hasTFSA ? 'TFSA Detected' : 'No TFSA Found'}</div>
          <p class="text-sm ${summary.hasTFSA ? 'text-green-700' : 'text-amber-700'}">
            ${summary.hasTFSA 
              ? `Total TFSA balance: ${summary.totalTFSABalance}`
              : 'Consider opening a TFSA for tax benefits'}
          </p>
        </div>
      </div>
    `;
    resultsSummary.innerHTML = summaryHTML;
    
    // Display accounts
    accounts.forEach(account => {
      const accountElement = document.createElement('div');
      accountElement.className = `p-3 rounded-lg border ${account.hasTFSA ? 'border-blue-100 bg-blue-50' : 'border-gray-100 bg-gray-50'}`;
      
      accountElement.innerHTML = `
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="${account.hasTFSA ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'} w-8 h-8 rounded-lg flex items-center justify-center mr-2">
              ${account.hasTFSA 
                ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>'}
            </div>
            <div>
              <div class="font-medium text-sm">${account.accountName}</div>
              <div class="text-xs text-gray-500">${account.accountType}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-semibold">${account.balance}</div>
            ${account.hasTFSA ? '<span class="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">TFSA</span>' : ''}
          </div>
        </div>
      `;
      
      accountList.appendChild(accountElement);
    });
  }
});
