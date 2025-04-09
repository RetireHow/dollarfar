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





// export function calculateRRSP(
//   currentTotal:number = 0,
//   ongoingContribution:number = 0,
//   contributionFrequency:number,
//   rateOfReturn:number = 0,
//   startAge:number,
//   endAge:number
// ) {
//   const periodsPerYear = contributionFrequency;
//   const ratePerPeriod = rateOfReturn / 100 / periodsPerYear;
//   const savingsByYear = [];
//   let totalSavings = currentTotal;
//   let totalContributions = 0;
//   let totalReturn = 0;

//   for (let age = startAge; age < endAge; age++) {
//     const annualContribution = ongoingContribution * periodsPerYear;
//     let annualReturn = 0;

//     for (let period = 0; period < periodsPerYear; period++) {
//       // Apply the growth to the savings and add contribution
//       totalSavings = totalSavings * (1 + ratePerPeriod) + ongoingContribution;
//       totalContributions += ongoingContribution;

//       // Calculate the annual return
//       if (period === periodsPerYear - 1) {
//         annualReturn = totalSavings - totalContributions - totalReturn;
//       }
//     }

//     // Track the total return
//     totalReturn = totalSavings - totalContributions;

//     savingsByYear.push({
//       age,
//       totalContribution: totalContributions.toFixed(2),
//       annualReturn: annualReturn.toFixed(2),
//       totalReturn: totalReturn.toFixed(2),
//       annualContribution: annualContribution.toFixed(2),
//       savingsAmount: totalSavings.toFixed(2),
//     });
//   }

//   return {
//     totalSavings: savingsByYear[savingsByYear?.length - 1]?.savingsAmount,
//     totalContributions:
//       savingsByYear[savingsByYear?.length - 1]?.totalContribution,
//     investmentEarnings:
//       Number(savingsByYear[savingsByYear?.length - 1]?.savingsAmount) -
//       Number(savingsByYear[savingsByYear?.length - 1]?.totalContribution),
//     savingsByAge: savingsByYear,
//   };
// }
