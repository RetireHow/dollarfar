import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RRIFInitalBalance: 0,
  currentAge: 0,
  rateOfReturn: 0,
  annualWithdrawalAmount: 0,
  withdrawalFrequency: 0,
  withdrawalStartYear: 0,
  withdrawalEndYear: 0,
  startPaymentYear: 0,

  min1stMonthWithdrawalAmount: 0,
  min2ndMonthWithdrawalAmount: 0,
  remainingAmount: 0,
};

const RRIFSlice = createSlice({
  name: "NWSlice",
  initialState,
  reducers: {
    test(state, action) {
      state.rateOfReturn = action.payload;
    },
  },
});

// Export actions and reducer
export const { test } = RRIFSlice.actions;
export default RRIFSlice.reducer;
