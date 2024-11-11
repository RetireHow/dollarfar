// slices/rrspCalculatorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RRSPCalculatorInput, RRSPCalculatorResult } from './RRSP.types';
import { calculateRRSP } from './RRSP.utils';

interface RRSPCalculatorState {
  input: RRSPCalculatorInput;
  result: RRSPCalculatorResult | null;
}

const initialState: RRSPCalculatorState = {
  input: {
    currentAge: 50,
    retirementAge: 70,
    preTaxIncome: 500,
    ongoingContribution: 300,
    currentRRSP: 700,
    rateOfReturn: 0.05
  },
  result: null,
};

const rrspCalculatorSlice = createSlice({
  name: 'rrspCalculator',
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<RRSPCalculatorInput>) => {
      state.input = action.payload;
    },
    calculate: (state) => {
      state.result = calculateRRSP(state.input);
    }
  },
});

export const { setInput, calculate } = rrspCalculatorSlice.actions;
export default rrspCalculatorSlice.reducer;
