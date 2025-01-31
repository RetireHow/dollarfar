type TFinalResult = {
  OASAmount?: number;
  PPBenefitAmount?: number;
  age?: number;
  annualRIG?: number;
  employerPensionAmount?: number;
  otherIncomeAmount?: number;
  retirementSavingsAmount?: number;
};

export const calculateAnnualAverageRetirementIncome = (
  finalResult: TFinalResult[]
) => {
  if (finalResult?.length == 0) {
    return 0;
  }
  let grandTotal = 0;
  finalResult?.forEach((item: TFinalResult) => {
    grandTotal += Object.entries(item)
      ?.filter(
        ([key, value]) =>
          value !== undefined && // Exclude undefined fields
          key !== "age" && // Exclude 'age'
          key !== "annualRIG" // Exclude 'annualRIG'
      )
      .reduce((sum, [, value]) => sum + (value as number), 0);
  });
  return Math.round(grandTotal / finalResult?.length);
};
