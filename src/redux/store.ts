import { configureStore } from "@reduxjs/toolkit";
import compoundInterestReducer from "./features/compoundInterestSlice/compoundInterestSlice";
import researchReducer from "./features/other/researchSlice";
import NWReducer from "./features/NWSlice/NWSlice";
import budgetReducer from "./features/BgtSlice/BgtSlice";
import stepperReducer from "./features/stepperSlice/stepperSclie";
import RRIFReducer from "./features/RRIF/RRIFSlice";
import RRSPReducer from "./features/RRSP/RRSPSlice";
import globalCurrencyReducer from "./features/other/globalCurrency";

// Create and configure the store
const store = configureStore({
  reducer: {
    compoundInterest: compoundInterestReducer,
    research: researchReducer,
    NWCalculator: NWReducer,
    budgetCalculator: budgetReducer,
    RRIF: RRIFReducer,
    rrspCalculator: RRSPReducer,
    globalCurrency: globalCurrencyReducer,
    stepper: stepperReducer,
  },
});

// Export the store type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
