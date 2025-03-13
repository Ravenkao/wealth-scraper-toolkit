
export interface AccountBalance {
  accountType: string;
  accountName: string;
  balance: string;
  hasTFSA: boolean;
}

export interface ScrapingResult {
  success: boolean;
  timestamp: string;
  accounts: AccountBalance[];
  summary: {
    hasTFSA: boolean;
    totalTFSABalance: string;
    totalAccounts: number;
  };
  error?: string;
}

export enum AccountType {
  TFSA = "TFSA",
  CASH = "Cash",
  OTHER = "Other"
}
