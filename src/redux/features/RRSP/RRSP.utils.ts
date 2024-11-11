// utils/calculateRRSP.ts
import { RRSPCalculatorInput, RRSPCalculatorResult } from './RRSP.types';

export const calculateRRSP = (input: RRSPCalculatorInput): RRSPCalculatorResult => {
  const { currentAge, retirementAge, preTaxIncome, ongoingContribution, currentRRSP, rateOfReturn } = input;
  
  // 1. Calculate Maximum Annual Contribution (18% of pre-tax income)
  const maxAnnualContribution = Number((preTaxIncome * 0.18).toFixed(2));

  // 2. Calculate Years to Retirement
  const yearsToRetirement = retirementAge - currentAge;

  // 3. Calculate RRSP Balance at Retirement
  const rrspBalanceAtRetirement = 
    currentRRSP * Math.pow(1 + rateOfReturn, yearsToRetirement) +
    ongoingContribution * ((Math.pow(1 + rateOfReturn, yearsToRetirement) - 1) / rateOfReturn);

  // 4. Set total savings as the RRSP balance at retirement
  const totalSavings = Number(rrspBalanceAtRetirement.toFixed(2));

  return {
    maxAnnualContribution,
    rrspBalanceAtRetirement,
    totalSavings
  };
};
