import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface CurrencyState {
  currency: string;
  currencyFullName: string;
}

// Initial state
const initialState: CurrencyState = {
  currency: "C$",
  currencyFullName: "Canadian Dollar",
};

// Map of G7 currency symbols to full names
const G7CurrencyMap: Record<string, string> = {
  C$: "Canadian Dollar",
  $: "United States Dollar",
  "€": "Euro",
  "£": "British Pound Sterling",
  "¥": "Japanese Yen",
};

// Create the slice
const globalCurrencySlice = createSlice({
  name: "globalCurrency",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
      // Update the full name based on the currency symbol
      state.currencyFullName =
        G7CurrencyMap[action.payload] || "Unknown Currency";
    },
  },
});

// Export actions and reducer
export const { setCurrency } = globalCurrencySlice.actions;

export default globalCurrencySlice.reducer;
