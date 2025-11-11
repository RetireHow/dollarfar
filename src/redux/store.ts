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
import OTPReducer from "./features/OTP/OTP";

import authReducer from "./features/APIEndpoints/authApi/authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create and configure the store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,

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
    OTP: OTPReducer,
  },

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),

  devTools: import.meta.env.MODE === "development",
});

// Export the store type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
