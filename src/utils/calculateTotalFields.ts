type TItem = {
  OASAmount?: number;
  PPBenefitAmount?: number;
  age?: number;
  annualRIG?: number;
  employerPensionAmount?: number;
  otherIncomeAmount?: number;
  retirementSavingsAmount?: number;
};

export function calculateTotalFields(item: TItem): number {
  if (!item.age) {
    return 0;
  }
  return Object.entries(item)
    ?.filter(
      ([key, value]) =>
        value !== undefined && // Exclude undefined fields
        key !== "age" && // Exclude 'age'
        key !== "annualRIG" // Exclude 'annualRIG'
    )
    .reduce((sum, [, value]) => sum + (value as number), 0); // Sum up the remaining values
}
