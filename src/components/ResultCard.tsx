
import { motion } from "framer-motion";
import { AccountBalance, ScrapingResult } from "../models/wealth-simple";

interface ResultCardProps {
  result: ScrapingResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const { success, accounts, summary, error } = result;
  
  if (!success) {
    return (
      <motion.div 
        className="rounded-xl bg-red-50 border border-red-200 p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-medium text-red-700 mb-2">Error</h3>
        <p className="text-red-600">{error || "An unknown error occurred"}</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="glass-card rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold">Wealthsimple Accounts</h2>
          <span className="text-sm text-gray-500">
            {new Date(result.timestamp).toLocaleString()}
          </span>
        </motion.div>
        
        <motion.div 
          className={`mb-6 p-5 rounded-xl ${summary.hasTFSA ? 'bg-green-50 border border-green-100' : 'bg-amber-50 border border-amber-100'}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${summary.hasTFSA ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {summary.hasTFSA ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="font-medium text-lg">
                {summary.hasTFSA ? 'TFSA Detected' : 'No TFSA Found'}
              </h3>
              <p className={summary.hasTFSA ? 'text-green-700' : 'text-amber-700'}>
                {summary.hasTFSA 
                  ? `Total TFSA balance: ${summary.totalTFSABalance}`
                  : "Consider opening a TFSA account for tax benefits"}
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="space-y-4">
          {accounts.map((account, index) => (
            <AccountCard 
              key={`${account.accountType}-${index}`} 
              account={account} 
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface AccountCardProps {
  account: AccountBalance;
  index: number;
}

const AccountCard = ({ account, index }: AccountCardProps) => {
  return (
    <motion.div 
      className={`p-4 rounded-xl border ${account.hasTFSA ? 'border-blue-100 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${account.hasTFSA ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>
            {account.hasTFSA ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <div>
            <h4 className="font-medium">{account.accountName}</h4>
            <p className="text-sm text-gray-500">{account.accountType}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">{account.balance}</p>
          {account.hasTFSA && (
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">TFSA</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
