/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompoundInterestState } from "./CompoundInterestTypes";

// Initial state
export const initialState: CompoundInterestState = {
  principal: "",
  rate: "",
  time: "",
  frequency: 1, // compounding frequency (e.g., annually, quarterly, monthly)
  frequencyName: "Annually", // default frequency name
  compoundInterest: 0,
  totalAmount: 0,
  interestBreakdown: [],
};

// Create the slice
const compoundInterestSlice = createSlice({
  name: "compoundInterest",
  initialState,
  reducers: {
    setPrincipal: (state, action: PayloadAction<any>) => {
      state.principal = action.payload;
    },
    setRate: (state, action: PayloadAction<any>) => {
      state.rate = action.payload;
    },
    setTime: (state, action: PayloadAction<any>) => {
      state.time = action.payload;
    },
    setFrequency: (state, action: PayloadAction<any>) => {
      state.frequency = action.payload;

      // Map numeric frequency to corresponding frequency name
      switch (action.payload) {
        case 1:
          state.frequencyName = "Annually";
          break;
        case 4:
          state.frequencyName = "Quarterly";
          break;
        case 12:
          state.frequencyName = "Monthly";
          break;
        case 52:
          state.frequencyName = "Weekly";
          break;
        case 26:
          state.frequencyName = "Bi-Weekly";
          break;
        case 365:
          state.frequencyName = "Daily";
          break;
        default:
          state.frequencyName = "Unknown Frequency";
          break;
      }
    },
    calculateCompoundInterest: (state) => {
      const P = state.principal;
      const r = state.rate / 100; // convert to decimal
      const t = state.time;
      const n = state.frequency;

      // Compound Interest Formula: A = P(1 + r/n)^(nt)
      const amount = P * Math.pow(1 + r / n, n * t);
      const interest = amount - P;

      // state.compoundInterest = interest;
      // Set compoundInterest rounded to 2 decimal places
      state.compoundInterest = parseFloat(interest.toFixed(2));
      state.totalAmount = parseFloat((interest+state.principal)?.toFixed(2));
    },

    // New function to calculate frequency breakdown
    calculateInterestBreakdown: (state) => {
      const P = state.principal;
      const r = state.rate / 100; // convert to decimal
      const n = state.frequency; // frequency (1 = Annually, 4 = Quarterly, etc.)
      const breakdown = [];

      // Loop through each period based on frequency
      if (state.time > 1 && n == 1) {
        for (let i = 1; i <= state.time * n; i++) {
          const amount = P * Math.pow(1 + r / n, i); // Calculate compound interest at this period
          const interest = amount - P;

          // Determine period label based on frequency
          let periodLabel = "";
          switch (n) {
            case 1: // Annually
              periodLabel = `${new Date().getFullYear() + (i - 1)}`;
              break;
            default:
              periodLabel = `Period ${i}`;
              break;
          }

          breakdown.push({
            period: periodLabel,
            principal: P,
            interest: parseFloat(interest.toFixed(2)),
          });
        }
      } else {
        for (let i = 1; i <= state.time * n; i++) {
          const amount = P * Math.pow(1 + r / n, i); // Calculate compound interest at this period
          const interest = amount - P;

          // Determine period label based on frequency
          let periodLabel = "";
          switch (n) {
            case 1: // Annually
              periodLabel = `${new Date().getFullYear()}`;
              break;
            case 4: // Quarterly
              periodLabel = `Q:${i}`;
              break;
            case 12: // Monthly
              periodLabel = `M:${i}`;
              break;
            case 52: // Weekly
              periodLabel = `W:${i}`;
              break;
            case 26: // Bi-Weekly
              periodLabel = `Bi-W:${i}`;
              break;
            case 365: // Daily
              periodLabel = `D:${i}`;
              break;
            default:
              periodLabel = `Period ${i}`;
              break;
          }

          breakdown.push({
            period: periodLabel,
            principal: P,
            interest: parseFloat(interest.toFixed(2)),
          });
        }
      }

      state.interestBreakdown = breakdown; // Set the breakdown in the state
    },

    resetCalculator: (state) => {
      state.principal = 0;
      state.rate = 0;
      state.time = 0;
      state.frequency = 1;
      state.compoundInterest = 0;
    },
  },
});

// Export actions and reducer
export const {
  setPrincipal,
  setRate,
  setTime,
  setFrequency,
  calculateCompoundInterest,
  resetCalculator,
  calculateInterestBreakdown,
} = compoundInterestSlice.actions;

export default compoundInterestSlice.reducer;
