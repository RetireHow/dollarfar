export type TOAS = {
  oldAgeSecurityBefore75: number;
  oldAgeSecurityAfter75: number;
};

export const calculateOAS = (
  isFortyYears: number,
  oasStartYear: number,
  yearsInCanada: number
) => {

  //Check if Canada living years is 40
  let oasPercentage = 100;
  if (!Number(isFortyYears) && yearsInCanada < 40) {
    oasPercentage = (yearsInCanada * 100) / 40;
  }

  let oldAgeSecurityBefore75 = (8732 * oasPercentage) / 100; //Annual Value
  if (oasStartYear > 65 && oasStartYear < 75) {
    const delayYears = oasStartYear - 65;
    const totalDelayBenefits: number =
      ((628.704 * oasPercentage) / 100) * delayYears; //Yearly delay benefits 628.704
    oldAgeSecurityBefore75 = Math.round(
      totalDelayBenefits + oldAgeSecurityBefore75
    );
  }

  let oldAgeSecurityAfter75 = (9605 * oasPercentage) / 100; //Annual Value
  if (oasStartYear > 65 && oasStartYear < 75) {
    const delayYears = oasStartYear - 65;
    const totalDelayBenefits = ((691.704 * oasPercentage) / 100) * delayYears; //Yearly delay benefits 628.704
    oldAgeSecurityAfter75 = Math.round(
      totalDelayBenefits + oldAgeSecurityAfter75
    );
  }

  return { oldAgeSecurityBefore75, oldAgeSecurityAfter75 };
};

export function calculateCPPBenefit(fullBenefit: number, startAge: number) {
  const standardAge = 65; // Age at which full benefit is received
  const earlyReductionRate = 0.006; // 0.6% reduction per month
  const lateIncreaseRate = 0.007; // 0.7% increase per month

  // Validate input
  if (startAge < 60 || startAge > 70) {
    return "CPP can only start between ages 60 and 70.";
  }

  const monthsDifference = (startAge - standardAge) * 12;

  let adjustedBenefit;

  if (startAge < standardAge) {
    // Early reduction
    const reduction = monthsDifference * earlyReductionRate;
    adjustedBenefit = fullBenefit * (1 + reduction); // Add because `monthsDifference` will be negative
  } else if (startAge > standardAge) {
    // Late increase
    const increase = monthsDifference * lateIncreaseRate;
    adjustedBenefit = fullBenefit * (1 + increase);
  } else {
    // Full benefit at age 65
    adjustedBenefit = fullBenefit;
  }

  // Return yearly benefit
  return Math.round(adjustedBenefit * 12);
}
