export function calculateRRSP(
  currentTotal: number = 0,
  ongoingContribution: number = 0,
  contributionFrequency: number,
  rateOfReturn: number = 0,
  startAge: number,
  endAge: number
) {
  const periodsPerYear = contributionFrequency;
  const ratePerPeriod = rateOfReturn / 100 / periodsPerYear;
  const savingsByYear = [];
  let totalSavings = currentTotal;
  let totalContributions = 0;

  for (let age = startAge; age < endAge; age++) {
    for (let period = 0; period < periodsPerYear; period++) {
      totalSavings = totalSavings * (1 + ratePerPeriod) + ongoingContribution;
      totalContributions += ongoingContribution;
    }
    savingsByYear.push({
      age,
      savingsAmount: Math.round(totalSavings),
    });
  }

  const investmentEarnings = totalSavings - totalContributions;
  return {
    totalSavings: Number(totalSavings.toFixed(2)),
    totalContributions: Number(totalContributions.toFixed(2)),
    investmentEarnings: Number(investmentEarnings.toFixed(2)),
    savingsByAge: savingsByYear,
  };
}
