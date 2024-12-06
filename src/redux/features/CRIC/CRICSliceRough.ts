/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
interface GeneralInfo {
  dobMonth: string;
  dobYear: string;
  gender: string;
  currentAnnualIncome: number;
  annualRetirementIncomeGoal: number;
  customRetirementAge: number;
}

interface CPP {
  pensionPlan: string;
  hasCPPStatement: string;
  yearOfStatement: string;
  monthlyRetirementPension: number;
  cppBenefitReceivingAge: number;
  plansToWorkAfterCPP: "Yes" | "No";
  employmentIncomeReceiveEndAge: number;
  employmentEarnings65to65: number;
  hasPlanToContributeToCPP: "Yes" | "No";
  useAverageCPPEstimate: string;
  expectedEarnings18to64: number;
  expectedEarnings65to69: number;
  monthlyCPPAmountAtAge65: number;
  hasStatementOfParticipation: string;
  QPPBenefitRecivingAge: number;
  monthlyQPPAmountRecivingAtAge65: number;
}

interface EmployerPension {
  isMemberOfPensionPlan: string;
  pensionPlanType: string;
  addedPlan: string;
  estimatedPensionFromDefinedPlan: number;
  pensionReceivingAge: number;
  isPensionIndexedInflation: string;
  currentValueOfPlan: number;
  employerContributeToPlanYearly: number;
  yearlyContributionOfYourPlan: number;
  averageAnnualRateOfReturn: number;
}

interface RetirementSavings {
  hasRRSP: string;
  otherSavings: string;
  currentTotalOfRRSP: number;
  contributionFrequency: string;
  contributionAmount: number;
  receivingIncomeFromRRSPAge: number;
  stopReceivingIncomeFromRRSPAge: number;
  averageAnnualRateOfReturn: number;
  receivinSavingsgAge: number;
  stopReceivingSavingsAge: number;
}

interface OtherIncome {
  hasOtherIncome: string;
  incomeType: string;
  estimatedIncomeFrequency: string;
  estimatedIncome: number;
  receivingEstimatedIncomeAge: number;
  stopReceivingEstimatedIncomeAge: number;
}

interface OldAgeSecurity {
  expectToLiveInCanadaAt65: "Yes" | "No" | "Select One";
  livedInCanadaFor40Years: "Yes" | "No" | "Select One";
  receivingOASPensionAge: number;
  yearsLivedInCanadaBetween18To65: number;
}

// Define the type for the overall state
interface CRICState {
  generalInfo: GeneralInfo;
  CPP: CPP;
  employerPension: EmployerPension;
  retirementSavings: RetirementSavings;
  otherIncome: OtherIncome;
  oldAgeSecurity: OldAgeSecurity;
  oasBreakdown: any; // Breakdown for OAS
  averageAnnualRetirementIncome: number;
}

// Initial state
const initialState: CRICState = {
  generalInfo: {
    dobMonth: "March",
    dobYear: "1997",
    gender: "Male",
    currentAnnualIncome: 32000,
    annualRetirementIncomeGoal: 26000,
    customRetirementAge: 86,
  },
  CPP: {
    pensionPlan: "Not Applicable",
    hasCPPStatement: "Select One",
    yearOfStatement: "Select One",
    monthlyRetirementPension: 0,
    cppBenefitReceivingAge: 65,
    plansToWorkAfterCPP: "No",
    employmentIncomeReceiveEndAge: 65,
    employmentEarnings65to65: 0,
    hasPlanToContributeToCPP: "No",
    useAverageCPPEstimate: "Select One",
    expectedEarnings18to64: 0,
    expectedEarnings65to69: 0,
    monthlyCPPAmountAtAge65: 0,
    hasStatementOfParticipation: "Select One",
    QPPBenefitRecivingAge: 65,
    monthlyQPPAmountRecivingAtAge65: 600,
  },

  employerPension: {
    isMemberOfPensionPlan: "No",
    pensionPlanType: "Select One",
    addedPlan: "",
    estimatedPensionFromDefinedPlan: 0,
    pensionReceivingAge: 65,
    isPensionIndexedInflation: "Yes",
    currentValueOfPlan: 0,
    employerContributeToPlanYearly: 0,
    yearlyContributionOfYourPlan: 0,
    averageAnnualRateOfReturn: 5,
  },

  retirementSavings: {
    hasRRSP: "No",
    otherSavings: "No",
    currentTotalOfRRSP: 0,
    contributionFrequency: "Select One",
    contributionAmount: 0,
    receivingIncomeFromRRSPAge: 65,
    stopReceivingIncomeFromRRSPAge: 71,
    averageAnnualRateOfReturn: 5,
    receivinSavingsgAge: 65,
    stopReceivingSavingsAge: 71,
  },

  otherIncome: {
    hasOtherIncome: "No",
    incomeType: "Select One",
    estimatedIncomeFrequency: "Select One",
    estimatedIncome: 0,
    receivingEstimatedIncomeAge: 50,
    stopReceivingEstimatedIncomeAge: 50,
  },

  oldAgeSecurity: {
    expectToLiveInCanadaAt65: "Select One",
    livedInCanadaFor40Years: "Select One",
    receivingOASPensionAge: 65,
    yearsLivedInCanadaBetween18To65: 40,
  },




  oasBreakdown: [],
  averageAnnualRetirementIncome: 0,
};

// Define a type for the payload
interface UpdateFieldPayload {
  section: keyof CRICState; // "generalInfo" or "CPP"
  field: string; // Field to update within the section
  value: any; // The new value for the field
}

// Create the slice
const CRICSlice = createSlice({
  name: "CRICalculator",
  initialState,
  reducers: {
    // Generic reducer to update any field
    updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { section, field, value } = action.payload;

      // Update the state dynamically
      if (state[section] && field in state[section]) {
        (state[section] as any)[field] = value;
      } else {
        console.error(`Invalid field '${field}' in section '${section}'`);
      }
    },

    // calculateOASBreakdown: (state) => {
    //   const { oldAgeSecurity, generalInfo } = state;

    //   const startAge = Number(oldAgeSecurity.receivingOASPensionAge);
    //   const endAge = Number(generalInfo.customRetirementAge);
    //   const maxOASAmountPerYear = 7600; 

    //   if (!startAge || startAge <= 0) {
    //     console.error("Invalid OAS starting age");
    //     return;
    //   }

    //   const breakdown = [];
    //   for (let age = startAge; age <= endAge; age++) {
    //     const proportionOfYearsInCanada =
    //       Number(oldAgeSecurity.yearsLivedInCanadaBetween18To65) / 40;

    //     const annualOASAmount = proportionOfYearsInCanada * maxOASAmountPerYear;

    //     breakdown.push({
    //       age,
    //       annualOASAmount: parseFloat(annualOASAmount.toFixed(2)),
    //     });
    //   }

    //   state.oasBreakdown = breakdown;
    // },

    calculateOASBreakdown: (state) => {
      const { oldAgeSecurity, CPP, retirementSavings, generalInfo } = state;

      const startAge = Math.min(
        oldAgeSecurity.receivingOASPensionAge || 0,
        CPP.cppBenefitReceivingAge || 0,
        retirementSavings.receivingIncomeFromRRSPAge || 0
      );
      const endAge = generalInfo.customRetirementAge; // Life expectancy or retirement age
      const maxOASAmountPerYear = 7600; // Assume max annual OAS benefit (in CAD)

      if (!startAge || startAge <= 0) {
        console.error("Invalid starting age for calculations");
        return;
      }

      const breakdown = [];

      for (let age = startAge; age <= endAge; age++) {
        // OAS Calculation
        const proportionOfYearsInCanada =
          oldAgeSecurity.yearsLivedInCanadaBetween18To65 / 40;
        const annualOASAmount =
          age >= oldAgeSecurity.receivingOASPensionAge
            ? proportionOfYearsInCanada * maxOASAmountPerYear
            : 0;

        // CPP Calculation
        const annualCPPAmount =
          age >= CPP.cppBenefitReceivingAge
            ? CPP.monthlyCPPAmountAtAge65 * 12
            : 0;

        // Retirement Savings Calculation
        const annualRetirementSavingsAmount =
          age >= retirementSavings.receivingIncomeFromRRSPAge &&
          age <= retirementSavings.stopReceivingIncomeFromRRSPAge
            ? retirementSavings.contributionAmount *
              (retirementSavings.contributionFrequency === "Monthly" ? 12 : 1)
            : 0;

        // Total Estimated Retirement Income
        const totalEstimatedRetirementIncome =
          annualOASAmount + annualCPPAmount + annualRetirementSavingsAmount;

        // Add breakdown data for the current age
        breakdown.push({
          age,
          annualOASAmount: parseFloat(annualOASAmount.toFixed(2)),
          annualCPPAmount: parseFloat(annualCPPAmount.toFixed(2)),
          annualRetirementSavingsAmount: parseFloat(
            annualRetirementSavingsAmount.toFixed(2)
          ),
          totalEstimatedRetirementIncome: parseFloat(
            totalEstimatedRetirementIncome.toFixed(2)
          ),
        });
      }

      state.oasBreakdown = breakdown;
    },

   calculateAverageAnnualRetirementIncome: (state) => {
  const {
    generalInfo,
    CPP,
    employerPension,
    retirementSavings,
    otherIncome,
  } = state;

  // Total income from all sources
  const totalIncomeSources = [
    CPP.monthlyRetirementPension * 12, // CPP Annual Pension
    employerPension.estimatedPensionFromDefinedPlan, // Employer Pension
    retirementSavings.contributionAmount *
      (retirementSavings.contributionFrequency === "Monthly" ? 12 : 1), // RRSP Annual Savings
    otherIncome.estimatedIncome *
      (otherIncome.estimatedIncomeFrequency === "Monthly" ? 12 : 1), // Other Annual Income
  ];

  // Calculate the total retirement income
  const totalRetirementIncome = totalIncomeSources.reduce(
    (sum, income) => sum + income,
    0
  );

  // Calculate the user's current age
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - Number(generalInfo.dobYear);

  // Calculate the number of retirement years
  const retirementYears = Number(generalInfo.customRetirementAge) - currentAge;

  // Avoid division by zero or negative retirement years
  if (retirementYears <= 0) {
    state.averageAnnualRetirementIncome = 0;
    console.error(
      "Invalid retirement age or date of birth, resulting in no retirement years."
    );
    return;
  }

  // Calculate the average annual retirement income
  state.averageAnnualRetirementIncome = parseFloat(
    (totalRetirementIncome / retirementYears).toFixed(2)
  );
}

  },
});

// Export actions and reducer
export const {
  updateField,
  calculateOASBreakdown,
  calculateAverageAnnualRetirementIncome,
} = CRICSlice.actions;
export default CRICSlice.reducer;
