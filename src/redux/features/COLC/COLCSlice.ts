import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TModifiedItem = {
  city1CurrencyCode: string;
  city2CurrencyCode: string;
  city1CurrencySymbol: string;
  city2CurrencySymbol: string;
  itemName: string;
  city1ItemPrice: number;
  city2ItemPrice: number;
  city1OtherCurrencyItemPrice: number;
  city2OtherCurrencyItemPrice: number;
  livingIndex: number;
};

type TModifiedCostData = {
  category: string;
  city1TotalCostCurrencyCode: string;
  city2TotalCostCurrencyCode: string;
  city1TotalCostCurrencySymbol: string;
  city2TotalCostCurrencySymbol: string;
  city1TotalCostOtherCurrencyPrice: number;
  city2TotalCostOtherCurrencyPrice: number;
  city1TotalCost: number;
  city2TotalCost: number;
  totalLivingIndex: number;
  items: TModifiedItem[];
};

type TExchangeRates = TExchangeItem[];

interface TExchangeItem {
  one_usd_to_currency: number;
  currency: string;
  one_eur_to_currency: number;
}

// Define the state type
interface COLCState {
  selectedCityName1: string;
  selectedCityName2: string;
  income: number;
  city1SubTotalCost: number;
  city2SubTotalCost: number;
  subTotalIndex: number;
  COLCModifiedCostData: TModifiedCostData[];
  exchangeRatesData: TExchangeRates;

  fromCityCurrencySymbol: string;
  toCityCurrencySymbol: string;
}

// Initial state
const initialState: COLCState = {
  income: 0,
  selectedCityName1: "",
  selectedCityName2: "",
  city1SubTotalCost: 0,
  city2SubTotalCost: 0,
  subTotalIndex: 0,
  COLCModifiedCostData: [],
  exchangeRatesData: [],
  fromCityCurrencySymbol: "",
  toCityCurrencySymbol: "",
};

// Create the slice
const COLCSlice = createSlice({
  name: "COLC",
  initialState,
  reducers: {
    setSelectedCityName1(state, action: PayloadAction<string>) {
      state.selectedCityName1 = action.payload;
    },

    setSelectedCityName2(state, action: PayloadAction<string>) {
      state.selectedCityName2 = action.payload;
    },

    setIncome(state, action: PayloadAction<number>) {
      state.income = action.payload;
    },

    setCity1SubTotalCost(state, action: PayloadAction<number>) {
      state.city1SubTotalCost = action.payload;
    },
    setCity2SubTotalCost(state, action: PayloadAction<number>) {
      state.city2SubTotalCost = action.payload;
    },
    setSubTotalIndex(state, action: PayloadAction<number>) {
      state.subTotalIndex = action.payload;
    },

    setCOLCModifiedCostData(state, action: PayloadAction<TModifiedCostData[]>) {
      state.COLCModifiedCostData = action.payload;
    },

    setCurrencyRatesData(state, action: PayloadAction<TExchangeRates>) {
      state.exchangeRatesData = action.payload;
    },

    setFromCityCurrencySymbol(state, action: PayloadAction<string>) {
      state.fromCityCurrencySymbol = action.payload;
    },
    setToCityCurrencySymbol(state, action: PayloadAction<string>) {
      state.toCityCurrencySymbol = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setSelectedCityName1,
  setSelectedCityName2,
  setIncome,
  setCity1SubTotalCost,
  setCity2SubTotalCost,
  setSubTotalIndex,
  setCOLCModifiedCostData,
  setCurrencyRatesData,
  setFromCityCurrencySymbol,
  setToCityCurrencySymbol,
} = COLCSlice.actions;

export default COLCSlice.reducer;
