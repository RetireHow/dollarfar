import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface ResearchtState {
  title: string;
  brand: string;
  price: number;
}

// Initial state
const initialState: ResearchtState = {
  title: "",
  brand: "",
  price: 0,
};

// Create the slice
const researchSlice = createSlice({
  name: "research",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },

    setBrand(state, action: PayloadAction<string>) {
      state.brand = action.payload;
    },

    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
  },
});

// Export actions and reducer
export const { setTitle, setBrand, setPrice } = researchSlice.actions;

export default researchSlice.reducer;
