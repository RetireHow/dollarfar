/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAgePeriod, TRRIFState } from "./RRIF.types";
import {
  calcBalanceAgeByAge,
  calcBalanceAgeByAgeGovernmentAge,
  calculateRemainingRRIFBalanceAtTheEndOfPeriod,
  calculateTotalWithdrawnOverLifeTime,
} from "./RRIF.utils";

export const ageWithdrawalPercentages: Record<number, number> = {
  50: 2.5,
  51: 2.56,
  52: 2.63,
  53: 2.7,
  54: 2.78,
  55: 2.86,
  56: 2.94,
  57: 3.03,
  58: 3.13,
  59: 3.23,
  60: 3.33,
  61: 3.45,
  62: 3.57,
  63: 3.7,
  64: 3.85,
  65: 4.0,
  66: 4.17,
  67: 4.35,
  68: 4.55,
  69: 4.76,
  70: 5.0,
  71: 5.28,
  72: 5.4,
  73: 5.53,
  74: 5.67,
  75: 5.82,
  76: 5.98,
  77: 6.17,
  78: 6.36,
  79: 6.58,
  80: 6.82,
  81: 7.08,
  82: 7.38,
  83: 7.71,
  84: 8.08,
  85: 8.51,
  86: 8.99,
  87: 9.55,
  88: 10.21,
  89: 10.99,
  90: 11.92,
  91: 13.06,
  92: 14.49,
  93: 16.34,
  94: 18.79,
  95: 20.0,
  96: 20.25,
  97: 20.5,
  98: 20.75,
  99: 21.0,
  100: 21.25,
};

const initialState: TRRIFState = {
  RRIFInitalBalance: "",
  currentAge: "",
  rateOfReturn: "",
  withdrawType: "Government",
  annualWithdrawalAmount: "",
  withdrawalFrequency: { label: "Annually", value: "Annually" },
  withdrawalStartYear: "",
  withdrawalEndYear: "",

  remainingRRRIFBalanceEndOfPeriod: 0, //End of Withdrawal Period
  totalWithdrawnOverLifeTime: 0, //From withdrawalStartYear to  withdrawalEndYear,

  ageBreakdownDataOverLifeTimeManually: [],
};

const RRIFSlice = createSlice({
  name: "RRIF",
  initialState,
  reducers: {
    updateRRIFState(
      state,
      action: PayloadAction<{
        key: keyof TRRIFState;
        value: string;
      }>
    ) {
      const { key, value } = action.payload;

      if (key) {
        (state[key] as string) = value;
      }
    },

    calcBalanceAgeByAgeBreakdown(state) {
      const {
        RRIFInitalBalance,
        withdrawalStartYear,
        withdrawalEndYear,
        rateOfReturn,
        annualWithdrawalAmount,
      } = state;
      const ageBreakdownData: TAgePeriod[] = [];
      let balanceAtBeginningOfYear = Number(RRIFInitalBalance);

      for (
        let year = Number(withdrawalStartYear);
        year <= Number(withdrawalEndYear);
        year++
      ) {
        const interest =
          Number(balanceAtBeginningOfYear) * (Number(rateOfReturn) / 100);
        const balanceAtEndOfYear =
          Number(balanceAtBeginningOfYear) +
          interest -
          Number(annualWithdrawalAmount);

        // Update the beginning balance for the next year
        balanceAtBeginningOfYear = balanceAtEndOfYear;
      }

      state.ageBreakdownDataOverLifeTimeManually = ageBreakdownData;
    },

    calculateRRIF(state) {
      //Calculate balance age by age
      const {
        RRIFInitalBalance,
        rateOfReturn,
        annualWithdrawalAmount,
        withdrawalStartYear,
        withdrawalEndYear,
        withdrawType,
      } = state;

      if (
        RRIFInitalBalance &&
        annualWithdrawalAmount &&
        withdrawalStartYear &&
        withdrawalEndYear &&
        withdrawalEndYear > withdrawalStartYear &&
        withdrawType === "Mannual"
      ) {
        state.ageBreakdownDataOverLifeTimeManually = calcBalanceAgeByAge(
          Number(RRIFInitalBalance),
          Number(rateOfReturn),
          Number(annualWithdrawalAmount),
          Number(withdrawalStartYear),
          Number(withdrawalEndYear)
        );
      } else if (
        RRIFInitalBalance &&
        withdrawalStartYear &&
        withdrawalEndYear &&
        withdrawalEndYear > withdrawalStartYear &&
        withdrawType === "Government"
      ) {
        const { ageBreakdownData, totalWithdrawanOverLifeTime } =
          calcBalanceAgeByAgeGovernmentAge(
            Number(RRIFInitalBalance),
            Number(rateOfReturn),
            Number(withdrawalStartYear),
            Number(withdrawalEndYear)
          );
        state.ageBreakdownDataOverLifeTimeManually = ageBreakdownData;
        state.totalWithdrawnOverLifeTime = Number(
          totalWithdrawanOverLifeTime.toFixed(2)
        );
        state.remainingRRRIFBalanceEndOfPeriod = Number(
          (Number(state.RRIFInitalBalance) - state.totalWithdrawnOverLifeTime).toFixed(
            2
          )
        );
      }

      // //Calculate Remaining RRIF Balance (End of Withdrawal Period)
      if (
        annualWithdrawalAmount &&
        RRIFInitalBalance &&
        withdrawalStartYear &&
        withdrawalEndYear &&
        withdrawalEndYear > withdrawalStartYear
      ) {
        state.remainingRRRIFBalanceEndOfPeriod =
          calculateRemainingRRIFBalanceAtTheEndOfPeriod(
            Number(rateOfReturn),
            Number(annualWithdrawalAmount),
            Number(RRIFInitalBalance),
            Number(withdrawalStartYear),
            Number(withdrawalEndYear)
          );
      }

      //Calculate Total Withdrawn Over Lifetime (From start age to end age)
      if (
        annualWithdrawalAmount &&
        withdrawalStartYear &&
        withdrawalEndYear &&
        withdrawalEndYear > withdrawalStartYear
      ) {
        state.totalWithdrawnOverLifeTime = calculateTotalWithdrawnOverLifeTime(
          Number(annualWithdrawalAmount),
          Number(withdrawalStartYear),
          Number(withdrawalEndYear)
        );
      }
    },
  },
});

// Export actions and reducer
export const { updateRRIFState, calcBalanceAgeByAgeBreakdown, calculateRRIF } =
  RRIFSlice.actions;
export default RRIFSlice.reducer;
