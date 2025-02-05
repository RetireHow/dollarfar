// slices/rrspCalculatorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RRSPInput, RRSPResult } from "./RRSP.types";
import { calculateRRSP } from "./RRSP.utils";

interface RRSPCalculatorState {
  input: RRSPInput;
  result: RRSPResult;
}

const initialState: RRSPCalculatorState = {
  input: {
    currentAge: "",
    retirementAge: "",
    contributionAmount: "",
    currentRRSPSavings: "",
    contributionFrequency: "1",
    rateOfReturn: "1",
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
    setInput: (
      state,
      action: PayloadAction<{ key: keyof RRSPInput; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.input[key] = value;
    },
    calculate: (state) => {
      const {
        currentRRSPSavings,
        contributionAmount,
        contributionFrequency,
        rateOfReturn,
        currentAge,
        retirementAge,
      } = state.input;
      if (currentAge && retirementAge) {
        state.result = calculateRRSP(
          Number(currentRRSPSavings),
          Number(contributionAmount),
          Number(contributionFrequency),
          Number(rateOfReturn),
          Number(currentAge),
          Number(retirementAge)
        );
      }
    },
  },
});

export const { setInput, calculate } = rrspCalculatorSlice.actions;
export default rrspCalculatorSlice.reducer;
