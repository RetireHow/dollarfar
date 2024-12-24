/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetState, SubCategory, UpdatePayload } from "./BgtTypes";

const initialState: BudgetState = {
  income: {
    salaryOrWages: { salary1: "", wages: "" },
    govtBenefits: { childTaxBenefit: "" },
    netIncome: { businessProfit: "" },
    otherIncome: { rentalIncome: "" },
    totals: {
      salaryOrWages: 0,
      govtBenefits: 0,
      netIncome: 0,
      otherIncome: 0,
    },
    subTotal: 0,
    dynamicInputs: {
      salaryOrWages: [],
    },
  },

  housing: {
    mortgage: "",
    rent: "",
    homeInsurance: "",
    wge: { water: "", gas: "", electricity: "" },
    cableTvInternetPhone: {
      cableTv: "",
      internet: "",
      homePhone: "",
      cellPhone: "",
    },
    repairsOrMaintenance: { repairs: "", maintenances: "" },
    totals: {
      wge: 0,
      cableTvInternetPhone: 0,
      repairsOrMaintenance: 0,
    },
    subTotal: 0,
  },

  transport: {
    carPayment: "",
    carInsurance: "",
    carRepairs: "",
    gasFuelEtrToll: { gas: "", fuel: "", etrToll: "" },
    totals: {
      gasFuelEtrToll: 0,
    },
    subTotal: 0,
  },

  educational: {
    schoolCollegeFee: { schoolFee: "", collegeFee: "" },
    totals: {
      schoolCollegeFee: 0,
    },
    subTotal: 0,
  },

  other: {
    househole: "",
    clothing: "",
    eatingOut: "",
    medical: "",
    entertainmentEvents: { entertainment: "", events: "" },
    totals: {
      entertainmentEvents: 0,
    },
    subTotal: 0,
  },

  loans: {
    personalLoan: "",
    homeLoan: "",
    studentLoan: "",
    subTotal: "",
  },

  savings: {
    vacationFund: "",
    emergency: "",
    retirement: "",
    investments: {
      mutalFunds: "",
      bonds: "",
    },
    totals: {
      investments: 0,
    },
    subTotal: 0,
  },
};

// Helper function to calculate the total of fields within a subcategory
const calculateSubCategoryTotal = (subCategory: {
  [key: string]: string;
}): number => {
  return Object.values(subCategory).reduce(
    (acc, curr) => acc + Number(curr),
    0
  );
};

// Helper function to calculate the total of a main category's fields, including subcategory totals
const calculateMainCategoryTotal = (category: any): number => {
  let total = 0;

  // Sum all direct numeric fields within the main category
  for (const key in category) {
    if (typeof category[key] === "string" && key !== "subTotal") {
      total += Number(category[key]);
    }
  }

  // Sum all totals within subcategories
  if (category.totals) {
    total += Object.values(category.totals as []).reduce(
      (acc, curr) => acc + Number(curr),
      0
    );
  }

  return total;
};

// Create the slice using the defined types
const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<UpdatePayload>) => {
      const { category, subCategory, field, value } = action.payload;

      if (subCategory && field) {
        // Update a specific field within a subcategory
        if (
          state[category] &&
          state[category][subCategory] &&
          typeof state[category][subCategory] === "object"
        ) {
          state[category][subCategory][field] = value;

          // Calculate and update the total for this subcategory
          // Cast totals as { [K in keyof SubCategory]?: number }
          (state[category].totals as { [K in keyof SubCategory]?: number })[
            subCategory
          ] = calculateSubCategoryTotal(state[category][subCategory]);

          // Update the main category total after subcategory change
          state[category].subTotal = calculateMainCategoryTotal(
            state[category]
          );
        }
      } else {
        // Update the top-level field in the category if no subCategory is provided
        if (state[category] && typeof state[category] === "object") {
          state[category][field!] = value; // field is required if no subCategory
          // Update the main category total after subcategory change
          state[category].subTotal = calculateMainCategoryTotal(
            state[category]
          );
        }
      }
    },

    updateDynamicFields: (
      state,
      action: PayloadAction<{
        category: string;
        subCategory: string;
        value: { id: number; label: string; value: string };
      }>
    ) => {
      const { category, subCategory, value } = action.payload;
      if (category) {
        state[category as keyof BudgetState]["dynamicInputs"][subCategory].push(
          value
        );
      }
    },

    changeDynamicFields: (
      state,
      action: PayloadAction<{
        category: string;
        subCategory: string;
        value: string;
        id: number;
      }>
    ) => {
      const { category, subCategory, value, id } = action.payload;
      if (category && subCategory && value && id) {
        const updateIndex = state[category as keyof BudgetState][
          "dynamicInputs"
        ][subCategory].findIndex((item:any) => {
          return item.id == id;
        });
        state[category as keyof BudgetState]["dynamicInputs"][subCategory][
          updateIndex
        ] = value;
      }
    },
  },
});

// Export actions and reducer
export const { updateField, updateDynamicFields, changeDynamicFields } =
  budgetSlice.actions;

export default budgetSlice.reducer;
