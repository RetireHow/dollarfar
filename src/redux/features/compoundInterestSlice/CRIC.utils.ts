export function calculateCRIInvestment(
  initialInvestment: number,
  contribution: number,
  contributionFrequency: number, // e.g., 52 for weekly
  annualInterestRate: number,
  compoundingFrequency: number, // e.g., 4 for quarterly
  years: number,
) {
  // Convert input values to proper format
  const interestRateDecimal = annualInterestRate / 100;
  const periodicRate = interestRateDecimal / compoundingFrequency; // Interest rate per compounding period
  const contributionPerCompoundingPeriod =
    contribution * (contributionFrequency / compoundingFrequency);

  // Initialize tracking variables
  // let totalContribution = 0;
  let totalContribution = initialInvestment;
  let totalFutureValue = initialInvestment;
  const yearByYearBreakdown = [];

  // Yearly breakdown calculation
  for (let year = 1; year <= years; year++) {
    for (let period = 1; period <= compoundingFrequency; period++) {
      // Apply interest to the existing balance
      totalFutureValue *= 1 + periodicRate;

      // Add contributions
      totalFutureValue += contributionPerCompoundingPeriod;
    }

    // Update total contribution so far
    totalContribution += contribution * contributionFrequency;

    // Add to year-by-year breakdown
    yearByYearBreakdown.push({
      year: year,
      totalValue: totalFutureValue.toFixed(2),
      totalContribution: totalContribution.toFixed(2),
      totalInterest: (totalFutureValue - totalContribution).toFixed(2),
    });
  }

  // Total interest earned
  const totalInterestEarned = totalFutureValue - totalContribution;

  return {
    totalFutureValue: totalFutureValue.toFixed(2),
    totalInterestEarned: totalInterestEarned.toFixed(2),
    totalContribution: totalContribution.toFixed(2),
    yearByYearBreakdown: yearByYearBreakdown,
  };
}
