export interface RRSPInput {
  currentAge: string;
  retirementAge: string;
  contributionAmount: string;
  contributionFrequency: string;
  rateOfReturn: string;
  currentRRSPSavings: string;
}

export interface SavingsByAge {
  age: number;
  savingsAmount: number;
}

export interface RRSPResult {
  totalSavings: number;
  totalContributions: number;
  investmentEarnings: number;
  savingsByAge: SavingsByAge[];
}
