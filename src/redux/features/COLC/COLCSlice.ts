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

// Define the state type
interface COLCState {
  selectedCityName1: string;
  selectedCityName2: string;

  homeCurrencyCode: string;

  COLCModifiedCostData: TCostOfLivingData;

  members: string;
  children: string;
  isRent: string;
}

// Initial state
const initialState: COLCState = {
  selectedCityName1: "",
  selectedCityName2: "",
  homeCurrencyCode: "",

  COLCModifiedCostData: {} as TCostOfLivingData,

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
    setHomeCurrencyCode(state, action: PayloadAction<string>) {
      state.homeCurrencyCode = action.payload;
    },
    setCOLCModifiedCostData(state, action: PayloadAction<TCostOfLivingData>) {
      state.COLCModifiedCostData = action.payload;
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
  setCOLCModifiedCostData,
  setHomeCurrencyCode,
  setMembers,
  setChildren,
  setIsRent,
} = COLCSlice.actions;

export default COLCSlice.reducer;
