import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateCRIInvestment } from "./CRIC.utils";

type TYearByYearBreakdownItem = {
  year: number;
  totalValue: string;
  totalContribution: string;
  totalInterest: string;
};

type TCompoundInterestState = {
  initialInvestment: string;
  contribution: string;
  contributionFrequency: string;
  annualInterestRate: string;
  compoundingFrequency: string;
  years: string;

  totalFutureValue: string;
  totalInterestEarned: string;
  totalContribution: string;
  yearByYearBreakdown: TYearByYearBreakdownItem[];
};

export type TPayloadKey = {
  initialInvestment: string;
  contribution: string;
  contributionFrequency: string;
  annualInterestRate: string;
  compoundingFrequency: string;
  years: string;
};

// Initial state
export const initialState: TCompoundInterestState = {
  initialInvestment: "",
  contribution: "",
  contributionFrequency: "1",
  annualInterestRate: "",
  compoundingFrequency: "1",
  years: "",

  totalFutureValue: "",
  totalInterestEarned: "",
  totalContribution: "",
  yearByYearBreakdown: [],
};

// Create the slice
const compoundInterestSlice = createSlice({
  name: "compoundInterest",
  initialState,
  reducers: {
    updateCRICField: (
      state,
      action: PayloadAction<{
        key: keyof TPayloadKey;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },

    calculateCRIInvestmentReducer: (state) => {
      const {
        initialInvestment,
        contribution,
        contributionFrequency,
        annualInterestRate,
        compoundingFrequency,
        years,
      } = state;

      const result = calculateCRIInvestment(
        Number(initialInvestment),
        Number(contribution),
        Number(contributionFrequency),
        Number(annualInterestRate),
        Number(compoundingFrequency),
        Number(years)
      );

      const {
        totalContribution,
        totalFutureValue,
        totalInterestEarned,
        yearByYearBreakdown,
      } = result || {};

      state.totalContribution = totalContribution;
      state.totalFutureValue = totalFutureValue;
      state.totalInterestEarned = totalInterestEarned;
      state.yearByYearBreakdown = yearByYearBreakdown;
    },

    clearCIRCFields: (state) => {
      state.initialInvestment = "";
      state.contribution = "";
      state.contributionFrequency = "1";
      state.annualInterestRate = "";
      state.compoundingFrequency = "1";
      state.years = "";

      state.totalFutureValue = "";
      state.totalInterestEarned = "";
      state.totalContribution = "";
      state.yearByYearBreakdown = [];
    },
  },
});

// Export actions and reducer
export const {
  updateCRICField,
  calculateCRIInvestmentReducer,
  clearCIRCFields,
} = compoundInterestSlice.actions;

export default compoundInterestSlice.reducer;
