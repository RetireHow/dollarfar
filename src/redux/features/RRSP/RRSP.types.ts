// types.ts
export interface RRSPCalculatorInput {
    currentAge: number;
    retirementAge: number;
    preTaxIncome: number;
    ongoingContribution: number;
    currentRRSP: number;
    rateOfReturn: number; // e.g., 5% should be passed as 0.05
  }
  
  export interface RRSPCalculatorResult {
    maxAnnualContribution: number;
    rrspBalanceAtRetirement: number;
    totalSavings: number;
  }
  