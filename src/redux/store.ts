import { configureStore } from "@reduxjs/toolkit";
import compoundInterestReducer from "./features/compoundInterestSlice/compoundInterestSlice";
import researchReducer from "./features/other/researchSlice";
import NWReducer from "./features/NWSlice/NWSlice";

// Create and configure the store
const store = configureStore({
  reducer: {
    compoundInterest: compoundInterestReducer,
    research: researchReducer,
    NWCalculator: NWReducer,
  },
});

// Export the store type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
