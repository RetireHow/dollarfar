import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Define the state type
interface CompoundInterestState {
  principal: number;
  rate: number;
  time: number;
  frequency: {value:number, label:string};
  frequencyName: string; // default frequency name
  compoundInterest: number;
  interestBreakdown: Array<{ period: string; interest: number }>; // for chart data
}

// Initial state
const initialState: CompoundInterestState = {
  principal: 3000,
  rate: 6,
  time: 5,
  frequency: {value:1, label:'Annually'}, // compounding frequency (e.g., annually, quarterly, monthly)
  frequencyName: "Yearly", // default frequency name
  compoundInterest: 0,
  interestBreakdown: [],
};

// Create the slice
const compoundInterestSlice = createSlice({
  name: "compoundInterest",
  initialState,
  reducers: {
    setPrincipal: (state, action: PayloadAction<number>) => {
      state.principal = action.payload;
    },
    setRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setFrequency: (state, action: PayloadAction<{value:number, label:string}>) => {
      state.frequency = action.payload;

      // Map numeric frequency to corresponding frequency name
      switch (action.payload.value) {
        case 1:
          state.frequencyName = "Yearly";
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
      const n = state.frequency.value;

      // Compound Interest Formula: A = P(1 + r/n)^(nt)
      const amount = P * Math.pow(1 + r / n, n * t);
      const interest = amount - P;

      // state.compoundInterest = interest;
      // Set compoundInterest rounded to 2 decimal places
      state.compoundInterest = parseFloat(interest.toFixed(2));
    },

    // New function to calculate frequency breakdown
    calculateInterestBreakdown: (state) => {
      const P = state.principal;
      const r = state.rate / 100; // convert to decimal
      const n = state.frequency.value; // frequency (1 = Annually, 4 = Quarterly, etc.)
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
            periodLabel = `${new Date().getFullYear()+(i-1)}`;
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
        for (let i = 1; i <= n; i++) {
          const amount = P * Math.pow(1 + r / n, i); // Calculate compound interest at this period
          const interest = amount - P;

          // Determine period label based on frequency
          let periodLabel = "";
          switch (n) {
            case 1: // Annually
              periodLabel = `${new Date().getFullYear()}`;
              break;
            case 4: // Quarterly
              periodLabel = `Quarter:${i}`;
              break;
            case 12: // Monthly
              periodLabel = months[i-1];
              break;
            case 52: // Weekly
              periodLabel = `Week:${i}`;
              break;
            case 26: // Bi-Weekly
              periodLabel = `Bi-Week:${i}`;
              break;
            case 365: // Daily
              periodLabel = `Day:${i}`;
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
      state.frequency = {value:1, label:'Yearly'};
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
