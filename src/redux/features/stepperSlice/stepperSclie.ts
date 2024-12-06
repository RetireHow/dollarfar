import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepperState {
  activeStep: number;
  totalSteps: number;
}

const initialState: StepperState = {
  activeStep: 0,
  totalSteps: 7, // As we have 7 steps [1, 2, 3, 4, 5, 6, 7]
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.activeStep < state.totalSteps - 1) {
        state.activeStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.activeStep > 0) {
        state.activeStep -= 1;
      }
    },
    resetActiveStep: (state) => {
      state.activeStep = 0;
    },
    setTotalSteps: (state, action) => {
      state.totalSteps = action.payload;
    },
    goToStep: (state, action: PayloadAction<number>) => {
      const step = action.payload;
      if (step >= 0 && step < state.totalSteps) {
        state.activeStep = step;
      }
    },
  },
});

// Export actions and reducer
export const { nextStep, previousStep, resetActiveStep, goToStep, setTotalSteps } =
  stepperSlice.actions;
export default stepperSlice.reducer;
