import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Assets,
  Liabilities,
  LiabilityCategoryKeys,
  LiabilityTotals,
  NWState,
  Totals,
} from "./types";

const initialState: NWState = {
  assets: {
    property: {
      principalResidence: 0,
      cottage: 0,
      realEstateAssets: 0,
    },
    savingsInvestment: {
      rrsp: 0,
      rrIf: 0,
      resp: 0,
    },
    personalItems: {
      jewelry: 0,
      artWork: 0,
      collectibles: 0,
    },
    businessOwnershipInterest: {
      ownership: 0,
      partnership: 0,
      equity: 0,
    },
    vehicles: {
      car1: 0,
      car2: 0,
      motorcycle: 0,
    },
    otherAssets: {
      otherAsset: 0,
    },
    totals: {
      property: 0,
      savingsInvestment: 0,
      personalItems: 0,
      businessOwnershipInterest: 0,
      vehicles: 0,
      otherAssets: 0,
    },
  },

  liabilities: {
    homeLoan: {
      cottageLoan: 0,
      mortgageLoan: 0,
      loan1: 0,
    },
    personalOtherLoans: {
      personalLoan: 0,
      studentLoan: 0,
    },
    vehicleLoans: {
      carLoan: 0,
      motorcycleLoan: 0,
    },
    taxLiability: {
      egCapitalGains: 0,
      anyOtherTaxLiability: 0,
    },
    creditCardDues: {
      creditCard1: 0,
      creditCard2: 0,
      creditCard3: 0,
    },
    otherDebts: {
      otherDebt: 0,
    },

    totals: {
      homeLoan: 0,
      personalOtherLoans: 0,
      vehicleLoans: 0,
      taxLiability: 0,
      creditCardDues: 0,
      otherDebts: 0,
    },
  },

  totalAssets: 0,
  totalLiabilities: 0,
  netWorth: 0,
};

const NWSlice = createSlice({
  name: "NWSlice",
  initialState,
  reducers: {
    updateAsset: (
      state,
      action: PayloadAction<{
        category: keyof Assets;
        key: string;
        value: number;
      }>
    ) => {
      const { category, key, value } = action.payload;

      // Type assertion to handle dynamic keys safely
      if (state.assets[category]) {
        (state.assets[category] as Record<string, number>)[key] = value;
      }

      if (category in state.assets.totals) {
        state.assets.totals[category as keyof Totals] = Object.values(
          state.assets[category]
        ).reduce((acc, curr) => acc + (curr || 0), 0);
      }
    },

    updateLiabilities: (
      state,
      action: PayloadAction<{
        category: keyof Liabilities;
        // key: keyof Liabilities;
        key: keyof LiabilityCategoryKeys;
        value: number;
      }>
    ) => {
      const { category, key, value } = action.payload;

      // Type assertion to handle dynamic keys safely
      if (state.liabilities[category]) {
        (state.liabilities[category] as Record<string, number>)[key] = value;
      }

      if (category in state.liabilities.totals) {
        state.liabilities.totals[category as keyof LiabilityTotals] =
          Object.values(state.liabilities[category]).reduce(
            (acc, curr) => acc + (curr || 0),
            0
          );
      }
    },

    calculateNetWorth: (state) => {
      // Calculate total assets
      state.totalAssets = Object.values(state.assets.totals).reduce(
        (acc, curr) => acc + (curr || 0),
        0
      );

      // Calculate total liabilities
      state.totalLiabilities = Object.values(state.liabilities.totals).reduce(
        (acc, curr) => acc + (curr || 0),
        0
      );

      // Calculate net worth
      state.netWorth = state.totalAssets - state.totalLiabilities;
    },

    clearAll: (state) => {
      // Reset the assets and liabilities fields without affecting totals
      state.assets = initialState.assets;
      state.liabilities = initialState.liabilities;
    },
  },
});

// Export actions and reducer
export const { updateAsset, updateLiabilities, calculateNetWorth, clearAll } =
  NWSlice.actions;
export default NWSlice.reducer;
