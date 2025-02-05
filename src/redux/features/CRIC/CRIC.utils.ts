export type TOAS = {
  oldAgeSecurityBefore75: number;
  oldAgeSecurityAfter75: number;
};

export const calculateOAS = (
  isFortyYears: string,
  oasStartYear: number,
  yearsInCanada: number
) => {
  //Check if Canada living years is 40
  let oasPercentage = 100;
  if (isFortyYears == "No" && yearsInCanada < 40) {
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

//========== || Calculate Year by Year result ==========||
export function calculateEmployerPensionAgeByAge(
  pension: number,
  inflationRate: number,
  pensionStartReceivingAge: number,
  pensionStopReceivingAge: number,
  annualRIG: number
) {
  const pensionsAgeByAge = [];
  let currentPension: number = pension;
  const inflationFactor: number = inflationRate / 100;

  for (
    let age = pensionStartReceivingAge;
    age <= pensionStopReceivingAge;
    age++
  ) {
    if (age == pensionStartReceivingAge) {
      pensionsAgeByAge.push({
        age,
        employerPensionAmount: currentPension,
        annualRIG,
      });
    } else {
      currentPension = currentPension - currentPension * inflationFactor;
      currentPension = Number(parseInt(currentPension.toString()));
      pensionsAgeByAge.push({
        age,
        employerPensionAmount: currentPension,
        annualRIG,
      });
    }
  }
  return pensionsAgeByAge;
}

export function calculatePensionPlanAgeByAge(
  ppStartAge: number,
  ppStopAge: number,
  PPBenefitAmount: number,
  annualRIG: number
) {
  const ppBenefitsAgeByAgeResults = [];
  for (let age = ppStartAge; age <= ppStopAge; age++) {
    ppBenefitsAgeByAgeResults.push({ age, PPBenefitAmount, annualRIG });
  }
  return ppBenefitsAgeByAgeResults;
}

export function calculateOtherIncomeAgeByAge(
  otherIncomeStartAge: number,
  otherIncomeStopAge: number,
  otherIncomeAmount: number,
  annualRIG: number
) {
  const otherIncomesAgeByAgeResults = [];
  for (let age = otherIncomeStartAge; age <= otherIncomeStopAge; age++) {
    otherIncomesAgeByAgeResults.push({ age, otherIncomeAmount, annualRIG });
  }
  return otherIncomesAgeByAgeResults;
}

export function calculateOASBenefitsAgeByAge(
  oldAgeSecurityBefore75: number,
  oldAgeSecurityAfter75: number,
  startAge: number,
  stopAge: number,
  annualRIG: number
) {
  const OASAgeByAgeResults = [];
  for (let age = startAge; age <= stopAge; age++) {
    if (age <= 74) {
      OASAgeByAgeResults.push({
        age,
        OASAmount: oldAgeSecurityBefore75,
        annualRIG,
      });
    } else {
      OASAgeByAgeResults.push({
        age,
        OASAmount: oldAgeSecurityAfter75,
        annualRIG,
      });
    }
  }
  return OASAgeByAgeResults;
}

export function calculateRetirementSavingsAgeByAge(
  startAge: number,
  endAge: number,
  retirementSavingsAmount: number,
  annualRIG: number
) {
  if (startAge && endAge && retirementSavingsAmount && annualRIG) {
    const savingsAgeByAge = [];
    for (let age = startAge; age <= endAge; age++) {
      savingsAgeByAge.push({ age, retirementSavingsAmount, annualRIG });
    }
    return savingsAgeByAge;
  } else {
    return [];
  }
}

/**
 * Calculate savings year by year considering ongoing contributions, frequency, rate of return, and tax on savings.
 *
 * @param {number} currentTotal - Initial savings amount.
 * @param {number} ongoingContribution - Amount contributed per period.
 * @param {number} contributionFrequency - Number of contributions per year.
 * @param {number} rateOfReturn - Annual rate of return in percentage.
 * @param {number} totalSavingsYears - Total number of years for savings.
 * @param {number} [taxRate=0] - Optional tax rate in percentage applied to the annual savings.
 * @returns {Array<{ year: number, savingsAmount: number, taxPaid: number }> } - Array of savings year by year.
 */



// export function calculateTFSAorNonRegAccountSavings(
//   currentTotal: number,
//   ongoingContribution: number = 0,
//   contributionFrequency: number,
//   rateOfReturn: number = 0,
//   startAge: number,
//   endAge: number,
//   taxRate: number = 0
// ) {
//   const retirementYears = endAge - startAge;
//   const afterTaxReturn = (rateOfReturn / 100) * (1 - taxRate / 100);

//   const savingsYearByYear = [];
//   let currentSavings = currentTotal;

//   for (let age = 1; age <= retirementYears; age++) {
//     currentSavings *= 1 + afterTaxReturn;
//     currentSavings += ongoingContribution * contributionFrequency;
//     savingsYearByYear.push({
//       age: startAge + age,
//       savingsAmount: Number(currentSavings.toFixed(2)),
//     });
//   }

//   const annualRetirementIncome = currentSavings / retirementYears;

//   return {
//     annualRetirementIncome,
//     savingsYearByYear,
//   };
// }



export function calculateTFSAorNonRegAccountSavings(
  currentTotal:number = 0,
  ongoingContribution:number = 0,
  contributionFrequency:number,
  rateOfReturn:number = 0,
  startAge:number,
  endAge:number,
  taxRate:number = 0
) {
   const periodsPerYear = contributionFrequency;
  const afterTaxReturn = (rateOfReturn / 100) * (1 - taxRate / 100); // Adjusted for after-tax return
  const ratePerPeriod = afterTaxReturn / periodsPerYear;
  const savingsByYear = [];
  let totalSavings = currentTotal;

  for (let age = startAge; age < endAge; age++) {
    for (let period = 0; period < periodsPerYear; period++) {
      const growth = totalSavings * ratePerPeriod;
      totalSavings += growth + ongoingContribution;
    }

    savingsByYear.push({
      age,
      savingsAmount: Math.round(totalSavings),
    });
  }

  const annualRetirementIncome = totalSavings / (endAge-startAge);
  return {
    savingsYearByYear: savingsByYear,
    annualRetirementIncome
  };
}

















type InputItem = { age: number; [key: string]: number }; // Each item must have an "age" field and other numeric fields
type MergedItem = { age: number; [key: string]: number }; // Final merged items

/**
 * Merges multiple arrays of objects by the "age" field, ensuring all fields are present in every output object.
 *
 * @param {...Array<InputItem>} arrays - Arrays of objects to merge. Each object must have an "age" field.
 * @returns {Array<MergedItem>} - The merged array, where each object contains "age" and all fields with missing values set to 0.
 */
export function mergeArraysByAge(...arrays: InputItem[][]): MergedItem[] {
  const ageMap = new Map<number, MergedItem>();
  const allFields = new Set<string>();

  // Collect all fields and populate ageMap
  arrays.forEach((array) => {
    array.forEach((item) => {
      if (!ageMap.has(item.age)) {
        ageMap.set(item.age, { age: item.age });
      }
      const entry = ageMap.get(item.age)!;

      // Add all fields dynamically while updating the current entry
      Object.keys(item).forEach((key) => {
        if (key !== "age") {
          entry[key] = item[key];
          allFields.add(key); // Track all unique field names
        }
      });
    });
  });

  // Ensure all fields are present in every object, with missing values set to 0
  ageMap.forEach((entry) => {
    allFields.forEach((field) => {
      if (field !== "age" && !(field in entry)) {
        entry[field] = 0; // Default value for missing fields
      }
    });
  });

  // Convert the Map back to an array, sorted by age
  return Array.from(ageMap.values()).sort((a, b) => a.age - b.age);
}
