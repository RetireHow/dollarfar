// slices/rrspCalculatorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RRSPInput, RRSPResult } from "./RRSP.types";
import { calculateRRSPTotalSavings } from "./RRSP.utils";

interface RRSPCalculatorState {
  input: RRSPInput;
  result: RRSPResult | null;
}

const initialState: RRSPCalculatorState = {
  input: {
    currentAge: 0,
    retirementAge: 0,
    contributionAmount: 0,
    currentRRSPSavings: 0,
    contributionFrequency: { label: "Monthly", value: "Monthly" },
    rateOfReturn: 0,
  },
  result: {
    totalSavings: 0,
    totalContributions: 0,
    investmentEarnings: 0,
    savingsByAge: [],
  },
};

const rrspCalculatorSlice = createSlice({
  name: "rrspCalculator",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<RRSPInput>) => {
      state.input = action.payload;
    },
    calculate: (state) => {
      state.result = calculateRRSPTotalSavings(state.input);
    },
  },
});

export const { setInput, calculate } = rrspCalculatorSlice.actions;
export default rrspCalculatorSlice.reducer;
