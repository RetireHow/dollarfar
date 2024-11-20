export interface RRSPInput {
  currentAge: number;
  retirementAge: number;
  contributionAmount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contributionFrequency: any;
  rateOfReturn: number; // Annual rate of return as a decimal (e.g., 0.05 for 5%)
  currentRRSPSavings: number; // Initial savings in RRSP
}

export interface RRSPBreakdown {
  age: number;
  Savings: string; // Cumulative savings as a formatted string
}

export interface RRSPResult {
  totalSavings: number; // RRSP Balance at Retirement as a formatted string
  totalContributions: number; // Total contributions made
  investmentEarnings: number; // Earnings from investments as a formatted string
  savingsByAge: RRSPBreakdown[]; // Yearly savings breakdown
}
