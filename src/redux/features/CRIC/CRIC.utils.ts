import { TOtherIncomeItem } from "./CRIC.types";

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
export interface PensionAccount {
  pensionPlanType?: string;
  annualPension?: string;
  startAmount?: string;
  inflationRate?: string;
  pensionReceivingAge: string;
  isIndexedToInflation?: string;
  pensionStopReceivingAge: string;
}

export interface PensionDataPoint {
  age: number;
  employerPensionAmount: number;
  annualRIG: number;
}

export interface PensionChartResult {
  chartData: PensionDataPoint[];
  description: string;
}

export function generateEmployerPensionChartData(
  accounts: PensionAccount[],
  annualRIG: number
): PensionChartResult {
  const mergedPensions: Record<number, number> = {};
  let description = "";

  accounts.forEach((account) => {
    let currentPension = parseFloat(
      account.annualPension || account.startAmount || "0"
    );
    const initialPension = currentPension;
    const applyDecline =
      account.isIndexedToInflation?.trim().toLowerCase() === "no";
    const inflationRate = applyDecline
      ? parseFloat(account.inflationRate || "0")
      : 0;
    const inflationFactor = applyDecline ? inflationRate / 100 : 0;
    const startAge = parseInt(account.pensionReceivingAge);
    const stopAge = parseInt(account.pensionStopReceivingAge);

    for (let age = startAge; age <= stopAge; age++) {
      if (age !== startAge && applyDecline) {
        currentPension -= currentPension * inflationFactor;
        currentPension = Number(parseInt(currentPension.toString()));
      }

      mergedPensions[age] = (mergedPensions[age] || 0) + currentPension;
    }

    if (applyDecline) {
      description += `Employer Pension: Declining from ${initialPension.toLocaleString()} to ${currentPension.toLocaleString()} annually between age ${startAge} and ${stopAge}; `;
    } else {
      description += `Employer Pension: Fixed at ${initialPension.toLocaleString()} annually between age ${startAge} and ${stopAge}; `;
    }
  });

  const chartData: PensionDataPoint[] = Object.entries(mergedPensions).map(
    ([age, employerPensionAmount]) => ({
      age: Number(age),
      employerPensionAmount,
      annualRIG,
    })
  );

  return {
    chartData,
    description: description.trim(),
  };
}

//Canada Pension Plan Calculation Function
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

export function mergeOtherIncomeByAgeWithSummary(
  accounts: TOtherIncomeItem[],
  annualRIG: number
) {
  const incomeByAge: Record<number, number> = {};

  // Step 1: Build the yearly income map
  accounts.forEach((account: TOtherIncomeItem) => {
    const amount = parseFloat(account.otherIncomeAmount);
    const frequency = parseInt(account.otherIncomeFrequency, 10);
    const startAge = parseInt(account.otherIncomeStartReceivingAge, 10);
    const stopAge = parseInt(account.otherIncomeStopReceivingAge, 10);

    const yearlyIncome = amount * frequency;

    for (let age = startAge; age <= stopAge; age++) {
      if (!incomeByAge[age]) {
        incomeByAge[age] = 0;
      }
      incomeByAge[age] += yearlyIncome;
    }
  });

  // Step 2: Convert to array
  const mergedIncomeArray = Object.entries(incomeByAge)
    .map(([age, total]) => ({
      age: parseInt(age, 10),
      otherIncomeAmount: total,
      annualRIG,
    }))
    .sort((a, b) => a.age - b.age); // Sort by age

  // Step 3: Generate summary text by grouping consecutive age ranges with same income
  const summaryRanges = [];
  let start = mergedIncomeArray[0]?.age;
  let end = start;
  let currentIncome = mergedIncomeArray[0]?.otherIncomeAmount;

  for (let i = 1; i < mergedIncomeArray.length; i++) {
    const entry = mergedIncomeArray[i];

    if (entry.otherIncomeAmount === currentIncome && entry.age === end + 1) {
      end = entry.age;
    } else {
      summaryRanges.push({ start, end, amount: currentIncome });
      start = entry.age;
      end = entry.age;
      currentIncome = entry.otherIncomeAmount;
    }
  }

  // Push the final range
  if (start !== undefined) {
    summaryRanges.push({ start, end, amount: currentIncome });
  }

  // Step 4: Format summary string
  const summary = summaryRanges
    .map(
      ({ amount, start, end }) =>
        `${amount?.toLocaleString()} annually (from age ${start} to ${end})`
    )
    .join("; ");

  return {
    yearlyIncomeData: mergedIncomeArray,
    summaryText: `Other Income: ${summary}`,
  };
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

interface RetirementResult {
  savingsYearByYear: Array<{
    age: number;
    savingsAmount: number;
    realValue?: number;
  }>;
  annualRetirementIncome: number;
  realAnnualIncome: number;
  totalSavingsAtRetirement: number;
}

export function calculateTFSAorNonRegAccountSavings(
  currentAge: number,
  retirementStartAge: number,
  retirementEndAge: number,
  currentTotal: number = 0,
  ongoingContribution: number = 0,
  contributionFrequency: number = 1,
  preRetirementReturn: number = 10,
  postRetirementReturn: number = 5,
  taxRate: number = 0,
  inflationRate: number = 0
): RetirementResult {
  // --- Validations ---

  // --- Constants & Helpers ---
  const taxFactor = 1 - taxRate / 100;
  const inflationFactor = 1 + inflationRate / 100;
  const afterTaxGrowth = (balance: number, rate: number) =>
    balance * (rate / 100) * taxFactor;

  const adjustForInflation = (value: number, years: number) =>
    inflationRate > 0 ? value / Math.pow(inflationFactor, years) : value;

  const yearsToRetirement = retirementStartAge - currentAge;
  const retirementYears = retirementEndAge - retirementStartAge;
  const savingsByYear: RetirementResult["savingsYearByYear"] = [];

  // --- Pre-Retirement Growth ---
  let savings = currentTotal;
  for (let year = 1; year <= yearsToRetirement; year++) {
    const growth = afterTaxGrowth(savings, preRetirementReturn);
    savings += growth + ongoingContribution * contributionFrequency;

    savingsByYear.push({
      age: currentAge + year,
      savingsAmount: Math.round(savings),
      realValue: Math.round(adjustForInflation(savings, year)),
    });
  }

  const totalSavingsAtRetirement = savings;

  // --- Retirement Phase ---
  const postTaxReturn = (postRetirementReturn / 100) * taxFactor;
  const realReturn =
    inflationRate > 0
      ? (1 + postTaxReturn) / inflationFactor - 1
      : postTaxReturn;

  let realAnnualIncome: number;
  if (retirementYears <= 0)
    throw new Error("Retirement duration must be positive.");

  if (Math.abs(realReturn) < 1e-6) {
    realAnnualIncome = totalSavingsAtRetirement / retirementYears;
  } else {
    const annuityFactor = 1 - Math.pow(1 + realReturn, -retirementYears);
    realAnnualIncome = (totalSavingsAtRetirement * realReturn) / annuityFactor;
  }

  const nominalAnnualIncome =
    realAnnualIncome * Math.pow(inflationFactor, yearsToRetirement);

  // --- Withdrawals Over Retirement ---
  let retirementBalance = totalSavingsAtRetirement;
  for (let year = 1; year <= retirementYears; year++) {
    const age = retirementStartAge + year - 1;
    const growth = afterTaxGrowth(retirementBalance, postRetirementReturn);
    const withdrawal =
      nominalAnnualIncome * Math.pow(inflationFactor, year - 1);

    retirementBalance += growth - withdrawal;

    savingsByYear.push({
      age,
      savingsAmount: Math.round(retirementBalance),
      realValue: Math.round(
        adjustForInflation(retirementBalance, yearsToRetirement + year)
      ),
    });
  }

  return {
    savingsYearByYear: savingsByYear,
    annualRetirementIncome: Math.round(nominalAnnualIncome),
    realAnnualIncome: Math.round(realAnnualIncome),
    totalSavingsAtRetirement: Math.round(totalSavingsAtRetirement),
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
