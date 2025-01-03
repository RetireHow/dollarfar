import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TModifiedItem = {
  itemName: string;
  city1ItemPrice: number;
  city2ItemPrice: number;
  livingIndex: number;
};

type TModifiedCostData = {
  category: string;
  city1TotalCost: number;
  city2TotalCost: number;
  totalLivingIndex: number;
  city1Currency: string;
  city2Currency: string;
  items: TModifiedItem[];
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
}

// Initial state
const initialState: COLCState = {
  selectedCityName1: "",
  selectedCityName2: "",
  income: 0,
  city1SubTotalCost: 0,
  city2SubTotalCost: 0,
  subTotalIndex: 0,
  COLCModifiedCostData: [],
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
} = COLCSlice.actions;

export default COLCSlice.reducer;
