import { configureStore } from "@reduxjs/toolkit";
import compoundInterestReducer from "./features/compoundInterestSlice/compoundInterestSlice";
import researchReducer from "./features/other/researchSlice";
import NWReducer from "./features/NWSlice/NWSlice";
import budgetReducer from "./features/BgtSlice/BgtSlice";

import stepperReducer from "./features/stepperSlice/stepperSclie";
import CRICStepperReducer from "./features/stepperSlice/CRICStepperSlice";

import RRIFReducer from "./features/RRIF/RRIFSlice";
import RRSPReducer from "./features/RRSP/RRSPSlice";
import globalCurrencyReducer from "./features/other/globalCurrency";
import CRICReducer from "./features/CRIC/CRICSlice";
import COLCReducer from "./features/COLC/COLCSlice";

// Create and configure the store
export const store = configureStore({
  reducer: {
    compoundInterest: compoundInterestReducer,
    research: researchReducer,
    NWCalculator: NWReducer,
    budgetCalculator: budgetReducer,
    RRIF: RRIFReducer,
    rrspCalculator: RRSPReducer,
    COLCalculator: COLCReducer,
    globalCurrency: globalCurrencyReducer,
    stepper: stepperReducer,

    CRICalculator: CRICReducer,
    CRICStepper: CRICStepperReducer,
  },
  devTools: import.meta.env.MODE === "development",
});

// Export the store type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
