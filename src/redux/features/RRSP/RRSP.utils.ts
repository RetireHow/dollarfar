// utils/calculateRRSP.ts
import { RRSPCalculatorInput, RRSPCalculatorResult } from "./RRSP.types";

export const calculateRRSP = (
  input: RRSPCalculatorInput
): RRSPCalculatorResult => {
  const {
    currentAge,
    retirementAge,
    ongoingContribution,
    currentRRSP,
    contributionFrequency, // "Monthly" or "Annually"
    rateOfReturn // Annual rate in decimal form, e.g., 5% as 0.05
  } = input;

  //Convert return to decimal
  const decimalRateOfReturn = rateOfReturn/100;

  const yearsToRetirement = retirementAge - currentAge;
  const totalPeriods = contributionFrequency.value === "Monthly" ? yearsToRetirement * 12 : yearsToRetirement;
  const ratePerPeriod = contributionFrequency.value === "Monthly" ? decimalRateOfReturn / 12 : decimalRateOfReturn;
  
  // Future Value of current RRSP balance with compound interest
  const futureValueCurrentSavings = currentRRSP * Math.pow((1 + ratePerPeriod), totalPeriods);

  // Future Value of contributions
  const futureValueContributions = ongoingContribution * 
    ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);

  // Total RRSP Balance at Retirement
  const rrspBalanceAtRetirement = futureValueCurrentSavings + futureValueContributions;

  // Total Contributions made
  const totalContributions = ongoingContribution * totalPeriods;

  // Investment Earnings
  const investmentEarnings = rrspBalanceAtRetirement - totalContributions;

  return {
    rrspBalanceAtRetirement: rrspBalanceAtRetirement,
    investmentEarnings: investmentEarnings,
    totalSavings: totalContributions
  };
};
