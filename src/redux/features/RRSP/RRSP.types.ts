/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts
export interface RRSPCalculatorInput {
    currentAge: number;
    retirementAge: number;
    preTaxIncome: number;
    ongoingContribution: number;
    currentRRSP: number;
    contributionFrequency:any;
    rateOfReturn: number; // e.g., 5% should be passed as 0.05
  }
  
  export interface RRSPCalculatorResult {
    investmentEarnings: number;
    rrspBalanceAtRetirement: number;
    totalSavings: number;
  }
  