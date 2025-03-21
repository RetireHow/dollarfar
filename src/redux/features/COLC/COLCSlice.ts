import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TCostOfLivingData {
  output: Output[];
  metaData: MetaData;
}

export interface Output {
  category: string;
  items: Item[];
}

export interface Item {
  itemName: string;
  city1ItemPrice: number;
  city2ItemPrice: number;
  city1OtherCurrencyItemPrice: number;
  city2OtherCurrencyItemPrice: number;
}

export interface MetaData {
  city1: City1;
  city2: City2;
}

export interface City1 {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
}

export interface City2 {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
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

  selectedCountryName1: string;
  selectedCountryName2: string;
  homeCurrencyCode: string;

  income: number;

  COLCModifiedCostData: TCostOfLivingData;

  city1Indices: TIndices;
  city2Indices: TIndices;

  members: string;
  children: string;
  isRent: string;
}

// Initial state
const initialState: COLCState = {
  income: 0,
  selectedCityName1: "",
  selectedCityName2: "",
  selectedCountryName1: "",
  selectedCountryName2: "",
  homeCurrencyCode: "",

  COLCModifiedCostData: {} as TCostOfLivingData,

  city1Indices: {} as TIndices,
  city2Indices: {} as TIndices,

  members: "4",
  children: "0",
  isRent: "false",
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

    setSelectedCountryName1(state, action: PayloadAction<string>) {
      state.selectedCountryName1 = action.payload;
    },
    setSelectedCountryName2(state, action: PayloadAction<string>) {
      state.selectedCountryName2 = action.payload;
    },
    setHomeCurrencyCode(state, action: PayloadAction<string>) {
      state.homeCurrencyCode = action.payload;
    },
    setIncome(state, action: PayloadAction<number>) {
      state.income = action.payload;
    },
    setCOLCModifiedCostData(state, action: PayloadAction<TCostOfLivingData>) {
      state.COLCModifiedCostData = action.payload;
    },
    setCity1Indices(state, action) {
      state.city1Indices = action.payload;
    },
    setCity2Indices(state, action) {
      state.city2Indices = action.payload;
    },
    setMembers(state, action: PayloadAction<string>) {
      state.members = action.payload;
    },
    setChildren(state, action: PayloadAction<string>) {
      state.children = action.payload;
    },
    setIsRent(state, action: PayloadAction<string>) {
      state.isRent = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setSelectedCityName1,
  setSelectedCityName2,
  setSelectedCountryName1,
  setSelectedCountryName2,
  setIncome,
  setCOLCModifiedCostData,
  setCity1Indices,
  setCity2Indices,
  setHomeCurrencyCode,
  setMembers,
  setChildren,
  setIsRent
} = COLCSlice.actions;

export default COLCSlice.reducer;
