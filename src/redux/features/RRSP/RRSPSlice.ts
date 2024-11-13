// slices/rrspCalculatorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RRSPCalculatorInput, RRSPCalculatorResult } from "./RRSP.types";
import { calculateRRSP } from "./RRSP.utils";

interface RRSPCalculatorState {
  input: RRSPCalculatorInput;
  result: RRSPCalculatorResult | null;
}

const initialState: RRSPCalculatorState = {
  input: {
    currentAge: 25,
    retirementAge: 55,
    preTaxIncome: 100000,
    ongoingContribution: 1000,
    currentRRSP: 150000,
    contributionFrequency: { label: "Monthly", value: "Monthly" },
    rateOfReturn: 5,
  },
  result: {
    investmentEarnings: 0,
    rrspBalanceAtRetirement: 0,
    totalSavings: 0,
  },
};

const rrspCalculatorSlice = createSlice({
  name: "rrspCalculator",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<RRSPCalculatorInput>) => {
      state.input = action.payload;
    },
    calculate: (state) => {
      state.result = calculateRRSP(state.input);
    },
  },
});

export const { setInput, calculate } = rrspCalculatorSlice.actions;
export default rrspCalculatorSlice.reducer;
