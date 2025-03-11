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

type TIndices = {
  crime_index: number;
  cpi_and_rent_index: number;
  cost_of_living_plus_rent_index: number;
  purchasing_power_incl_rent_index: number;
  property_price_to_income_ratio: number;
  contributors_healthcare: number;
  safety_index: number;
  traffic_co2_index: number;
  traffic_inefficiency_index: number;
  contributors_traffic: number;
  rent_index: number;
  health_care_index: number;
  groceries_index: number;
  contributors_property: number;
  pollution_index: number;
  traffic_time_index: number;
  restaurant_price_index: number;
  contributors_cost_of_living: number;
  climate_index: number;
  cost_of_living_index: number;
  cpi_index: number;
  quality_of_life_index: number;
  contributors_pollution: number;
  contributors_crime: number;
  traffic_index: number;
  name: string;
  city_id: number;
};

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

  city1Indices: TIndices;
  city2Indices: TIndices;
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

  city1Indices: {} as TIndices,
  city2Indices: {} as TIndices,
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
    setCity1Indices(state, action) {
      state.city1Indices = action.payload;
    },
    setCity2Indices(state, action) {
      state.city2Indices = action.payload;
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
  setCity1Indices,
  setCity2Indices,
} = COLCSlice.actions;

export default COLCSlice.reducer;
