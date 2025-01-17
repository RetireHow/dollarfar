import { RRSPBreakdown, RRSPInput, RRSPResult } from "./RRSP.types";

export function calculateRRSPTotalSavings({
  currentAge,
  retirementAge,
  contributionAmount,
  contributionFrequency,
  rateOfReturn,
  currentRRSPSavings,
}: RRSPInput): RRSPResult {
  // Constants
  const compoundingPeriods = contributionFrequency.value === "Monthly" ? 12 : 1;
  const rateOfReturnDecimal = rateOfReturn / 100;
  const ratePerPeriod = rateOfReturnDecimal / compoundingPeriods;

  // Total savings and contribution accumulators
  let totalSavings = currentRRSPSavings; // Start with current savings
  let totalContributions = 0; // Initialize contributions
  const savingsByAge: RRSPBreakdown[] = [];

  // Loop through each year
  for (let age = currentAge; age < retirementAge; age++) {
    let yearSavings = 0;

    // Calculate future value for each period within the year
    for (let period = 0; period < compoundingPeriods; period++) {
      const periodsRemaining =
        (retirementAge - age) * compoundingPeriods - period;

      // Contribution compounding at the end of the period
      yearSavings +=
        contributionAmount * Math.pow(1 + ratePerPeriod, periodsRemaining);
      }

    // Add the year's contributions to the total contributions
    totalContributions += contributionAmount * compoundingPeriods;

    // Add the year's savings to the total
    totalSavings += yearSavings;

    // Store cumulative savings by age, rounding to 2 decimal places
    savingsByAge.push({
      age,
      Savings: totalSavings.toFixed(2), // Gradual increase
    });
  }

  // Round total savings to match online calculator's result more closely
  totalSavings = Number(totalSavings.toFixed(2));

  // Calculate investment earnings
  const investmentEarnings = (
    Number(totalSavings) - totalContributions
  ).toFixed(2);

  // Return final total savings, total contributions, investment earnings, and breakdown
  return {
    totalSavings, // RRSP Balance at Retirement
    totalContributions,
    investmentEarnings: Number(investmentEarnings),
    savingsByAge,
  };
 
}
