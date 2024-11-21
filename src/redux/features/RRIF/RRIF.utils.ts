import { TAgePeriod } from "./RRIF.types";
import { ageWithdrawalPercentages } from "./RRIFSlice";

// Calculation function for age breakdown data in mannual mode
export const calcBalanceAgeByAge = (
  initialBalance: number,
  rateOfReturn: number,
  annualWithdrawalAmount: number,
  startYear: number,
  endYear: number
): TAgePeriod[] => {
  const ageBreakdownData: TAgePeriod[] = [];
  let balanceAtBeginningOfYear: number = initialBalance;

  for (let year = startYear; year <= endYear; year++) {
    const interest = balanceAtBeginningOfYear * (rateOfReturn / 100);
    const balanceAtEndOfYear: number =
      balanceAtBeginningOfYear + interest - annualWithdrawalAmount;

    const mannualWithdrawalPercentage =
      (annualWithdrawalAmount * 100) / balanceAtBeginningOfYear;

    ageBreakdownData.push({
      balanceAtBeginningOfTheYear: Number(balanceAtBeginningOfYear.toFixed(2)),
      balanceAtEndOfTheYear: Number(balanceAtEndOfYear.toFixed(2)),
      annualWithdrawalAmount,
      mannualWithdrawalPercentage:mannualWithdrawalPercentage.toFixed(2),
      age: year,
    });

    // Update the beginning balance for the next year
    balanceAtBeginningOfYear = balanceAtEndOfYear;
  }

  return ageBreakdownData;
};

export const calculateRemainingRRIFBalanceAtTheEndOfPeriod = (
  annualRateOfReturn: number,
  annualWithdrawal: number,
  initialBalance: number,
  startYear: number,
  endYear: number
): number => {
  const years = endYear - startYear;
  // Convert rate of return to decimal
  const r = annualRateOfReturn / 100;

  // Scenario 2: If rate of return is 0, we simplify the formula
  if (r === 0) {
    return initialBalance - annualWithdrawal * years;
  }

  // Scenario 1: When rate of return is greater than 0
  const growthFactor = Math.pow(1 + r, years);

  const futureValue =
    initialBalance * growthFactor - (annualWithdrawal * (growthFactor - 1)) / r;

  return Number(futureValue.toFixed(2));
};

export const calculateTotalWithdrawnOverLifeTime = (
  annualWithdrawalAmount: number,
  startYear: number,
  endYear: number
): number => {
  if (annualWithdrawalAmount && startYear && endYear && endYear > startYear) {
    const agePeriod = endYear - startYear;
    return annualWithdrawalAmount * agePeriod;
  } else {
    return 0;
  }
};

// Calculation function for age breakdown data in government mode
export const calcBalanceAgeByAgeGovernmentAge = (
  initialBalance: number,
  rateOfReturn: number,
  startYear: number,
  endYear: number
) => {
  const ageBreakdownData: TAgePeriod[] = [];
  let totalWithdrawanOverLifeTime: number = 0;
  let balanceAtBeginningOfYear: number = initialBalance;

  for (let year = startYear; year <= endYear; year++) {
    const withdrawalAgeDecimal = ageWithdrawalPercentages[year] / 100;
    const interest = balanceAtBeginningOfYear * (rateOfReturn / 100);
    const balanceAtEndOfYear: number =
      balanceAtBeginningOfYear +
      interest -
      balanceAtBeginningOfYear * withdrawalAgeDecimal;

    //calculate total withdrawal
    totalWithdrawanOverLifeTime +=
      balanceAtBeginningOfYear * withdrawalAgeDecimal;

    ageBreakdownData.push({
      balanceAtBeginningOfTheYear: Number(balanceAtBeginningOfYear.toFixed(2)),
      balanceAtEndOfTheYear: Number(balanceAtEndOfYear.toFixed(2)),
      annualWithdrawalAmount: Number(
        (balanceAtBeginningOfYear * withdrawalAgeDecimal).toFixed(2)
      ),
      age: year,
      minWithdrawalPercentage: ageWithdrawalPercentages[year],
    });

    // Update the beginning balance for the next year
    balanceAtBeginningOfYear = balanceAtEndOfYear;
  }

  return { ageBreakdownData, totalWithdrawanOverLifeTime };
};
