import { configureStore } from "@reduxjs/toolkit";
import compoundInterestReducer from "./features/compoundInterestSlice/compoundInterestSlice"; // Import the reducer

// Create and configure the store
const store = configureStore({
  reducer: {
    compoundInterest: compoundInterestReducer, // Add your slice reducer here
  },
});

// Export the store type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
