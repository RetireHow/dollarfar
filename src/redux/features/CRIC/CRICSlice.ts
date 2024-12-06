/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateCPPBenefit, calculateOAS } from "./utils";

type CRICState = {
  dobMonth: string;
  dobYear: number;
  gender: string;
  currentAnnualIncome: number;
  annualRetirementIncomeGoal: number;
  lifeExpectency: number;

  // CPP or QPP
  selectedPP: string;
  ppStartYear: number;
  ppBenefitAmount: number;
  ppAnnualAmount: number;

  isFortyYears: number;
  oasStartYear: number;
  yearsInCanada: number;

  CRIBreakdownData: any;
  oas: any;
};

// Initial state
const initialState: CRICState = {
  // GI
  dobMonth: "March",
  dobYear: 1997,
  gender: "Male",
  currentAnnualIncome: 32000,
  annualRetirementIncomeGoal: 26000,
  lifeExpectency: 86,

  //CPP or QPP
  selectedPP: "Canada Pension Plan",
  ppStartYear: 65,
  ppBenefitAmount: 300,
  ppAnnualAmount: 0,

  // OAS
  isFortyYears: 1,
  oasStartYear: 65,
  yearsInCanada: 20,

  CRIBreakdownData: [],
  oas: {},
};

// Create the slice
const CRICSlice = createSlice({
  name: "CRICalculator",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof CRICState; value: any }>
    ) => {
      const { field, value } = action.payload;
      if (field) {
        (state[field] as keyof CRICState) = value;
      }

      // Calculate PP Benefit
      const { selectedPP, ppStartYear, ppBenefitAmount } = state;
      let cpp: number = 0;
      if (selectedPP && ppStartYear && ppBenefitAmount) {
        cpp = calculateCPPBenefit(ppBenefitAmount, ppStartYear) as number;
        state.ppAnnualAmount = cpp;
      }


      if (selectedPP !== "Not Applicable") {
        // Calculate OAS Benefit
        const { isFortyYears, yearsInCanada, oasStartYear } = state;
        const oas = calculateOAS(isFortyYears, oasStartYear, yearsInCanada);
        state.oas = oas;

        const years = [];
        for (
          let year = Math.min(ppStartYear, oasStartYear);
          year <= state.lifeExpectency;
          year++
        ) {
          years.push(year);
        }

        // Generate OAS list with the condition for before and after age 75
        const oasList = [];
        for (let year = oasStartYear; year <= 74; year++) {
          oasList.push({ oas: oas.oldAgeSecurityBefore75, oasAge: year });
        }
        for (let year = 75; year <= state.lifeExpectency; year++) {
          oasList.push({ oas: oas.oldAgeSecurityAfter75, oasAge: year });
        }

        // Build breakdown data
        const breakdownData = years.map((year) => {
          const isCPPActive = year >= ppStartYear;
          const isOASActive = year >= oasStartYear;

          // Determine OAS based on age
          const oasAmount =
            isOASActive && year >= 75
              ? oas.oldAgeSecurityAfter75
              : isOASActive
              ? oas.oldAgeSecurityBefore75
              : 0;

          return {
            year,
            cppAmount: isCPPActive ? cpp : 0, // Add CPP benefit if the year matches or exceeds ppStartYear
            oasAmount: oasAmount, // Add OAS benefit if the year matches or exceeds oasStartYear
            currentAnnualIncome: state.currentAnnualIncome,
            annualRetirementIncomeGoal: state.annualRetirementIncomeGoal,
          };
        });
        state.CRIBreakdownData = breakdownData;
      } else {
        const oas = calculateOAS(state.isFortyYears, state.oasStartYear, state.yearsInCanada);
        state.oas = oas;
        const oasList = [];
        for (let year = state.oasStartYear; year <= 74; year++) {
          oasList.push({
            oasAmount: state.oas.oldAgeSecurityBefore75,
            year,
            currentAnnualIncome: state.currentAnnualIncome,
            annualRetirementIncomeGoal: state.annualRetirementIncomeGoal,
          });
        }
        for (let year = 75; year <= state.lifeExpectency; year++) {
          oasList.push({
            oasAmount: state.oas.oldAgeSecurityAfter75,
            year,
            currentAnnualIncome: state.currentAnnualIncome,
            annualRetirementIncomeGoal: state.annualRetirementIncomeGoal,
          });
        }
        state.CRIBreakdownData = oasList;
      }
    },
  },
});

// Export actions and reducer
export const { updateField } = CRICSlice.actions;
export default CRICSlice.reducer;
