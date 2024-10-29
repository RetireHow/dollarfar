/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdatePayload {
  category: keyof BudgetState;
  subCategory?: keyof SubCategory;
  field: keyof Field;
  value: number;
}

interface SalaryOrWages {
  salary1: number;
  wages: number;
  [key: string]: number;
}

interface GovtBenefits {
  childTaxBenefit: number;
  [key: string]: number;
}

interface NetIncome {
  businessProfit: number;
  [key: string]: number;
}

interface OtherIncome {
  rentalIncome: number;
  [key: string]: number;
}

// Define income type at all
interface Income {
  salaryOrWages: SalaryOrWages;
  govtBenefits: GovtBenefits;
  netIncome: NetIncome;
  otherIncome: OtherIncome;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

interface WGE {
  water: number;
  gas: number;
  electricity: number;
  [key: string]: number;
}

interface CableTvInternetPhone {
  cableTv: number;
  internet: number;
  homePhone: number;
  cellPhone: number;
  [key: string]: number;
}

interface RepairsOrMaintenance {
  repairs: number;
  maintenances: number;
  [key: string]: number;
}

interface Housing {
  mortgage: number;
  rent: number;
  homeInsurance: number;
  wge: WGE;
  cableTvInternetPhone: CableTvInternetPhone;
  repairsOrMaintenance: RepairsOrMaintenance;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

interface GasFuelEtrToll {
  gas: number;
  fuel: number;
  etrToll: number;
  [key: string]: number;
}

interface Transport {
  carPayment: number;
  carInsurance: number;
  carRepairs: number;
  gasFuelEtrToll: GasFuelEtrToll;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

interface SchoolCollegeFee {
  schoolFee: number;
  collegeFee: number;
}

interface Educational {
  schoolCollegeFee: SchoolCollegeFee;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

interface EntertainmentEvents {
  entertainment: number;
  events: number;
  [key: string]: number;
}

interface Other {
  househole: number;
  clothing: number;
  eatingOut: number;
  medical: number;
  entertainmentEvents: EntertainmentEvents;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

interface Loans {
  personalLoan: number;
  homeLoan: number;
  studentLoan: number;
  [key: string]: number;
}

interface Investments {
  mutalFunds: number;
  bonds: number;
  [key: string]: number;
}

interface Savings {
  vacationFund: number;
  emergency: number;
  retirement: number;
  investments: Investments;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface SubCategory {
  salaryOrWages: string;
  govtBenefits: string;
  netIncome: string;
  otherIncome: string;
  wge: string;
  cableTvInternetPhone: string;
  repairsOrMaintenance: string;
  gasFuelEtrToll: string;
  transport: string;
  schoolCollegeFee: string;
  entertainmentEvents: string;
  investments: string;
}

export interface Field {
  salary1: string;
  wages: string;
  childTaxBenefit: string;
  businessProfit: string;
  rentalIncome: string;
  water: string;
  gas: string;
  electricity: string;
  cableTv: string;
  internet: string;
  homePhone: string;
  cellPhone: string;
  repairs: string;
  maintenances: string;
  mortgage: string;
  rent: string;
  homeInsurance: string;
  fuel: string;
  etrToll: string;
  carPayment: string;
  carInsurance: string;
  carRepairs: string;
  schoolFee: string;
  collegeFee: string;
  entertainment: string;
  events: string;
  househole: string;
  clothing: string;
  eatingOut: string;
  medical: string;
  personalLoan: string;
  homeLoan: string;
  studentLoan: string;
  mutalFunds: string;
  bonds: string;
  vacationFund: string;
  emergency: string;
  retirement: string;
}

// Define the overall state type with dynamic fields
export interface BudgetState {
  income: Income;
  housing: Housing;
  transport: Transport;
  educational: Educational;
  other: Other;
  loans: Loans;
  savings: Savings;
}

// Define the initial state with proper type annotations
const initialState: BudgetState = {
  income: {
    salaryOrWages: { salary1: 0, wages: 0 },
    govtBenefits: { childTaxBenefit: 0 },
    netIncome: { businessProfit: 0 },
    otherIncome: { rentalIncome: 0 },
    totals: {
      salaryOrWages: 0,
      govtBenefits: 0,
      netIncome: 0,
      otherIncome: 0,
    },
    subTotal: 0,
  },

  housing: {
    mortgage: 0,
    rent: 0,
    homeInsurance: 0,
    wge: { water: 0, gas: 0, electricity: 0 },
    cableTvInternetPhone: {
      cableTv: 0,
      internet: 0,
      homePhone: 0,
      cellPhone: 0,
    },
    repairsOrMaintenance: { repairs: 0, maintenances: 0 },
    totals: {
      wge: 0,
      cableTvInternetPhone: 0,
      repairsOrMaintenance: 0,
    },
    subTotal: 0,
  },

  transport: {
    carPayment: 0,
    carInsurance: 0,
    carRepairs: 0,
    gasFuelEtrToll: { gas: 0, fuel: 0, etrToll: 0 },
    totals: {
      gasFuelEtrToll: 0,
    },
    subTotal: 0,
  },

  educational: {
    schoolCollegeFee: { schoolFee: 0, collegeFee: 0 },
    totals: {
      schoolCollegeFee: 0,
    },
    subTotal: 0,
  },

  other: {
    househole: 0,
    clothing: 0,
    eatingOut: 0,
    medical: 0,
    entertainmentEvents: { entertainment: 0, events: 0 },
    totals: {
      entertainmentEvents: 0,
    },
    subTotal: 0,
  },

  loans: {
    personalLoan: 0,
    homeLoan: 0,
    studentLoan: 0,
    subTotal: 0,
  },

  savings: {
    vacationFund: 0,
    emergency: 0,
    retirement: 0,
    investments: {
      mutalFunds: 0,
      bonds: 0,
    },
    totals: {
      investments: 0,
    },
    subTotal: 0,
  },
};

// Helper function to calculate the total of fields within a subcategory
const calculateSubCategoryTotal = (subCategory: {
  [key: string]: number;
}): number => {
  return Object.values(subCategory).reduce((acc, curr) => acc + curr, 0);
};

// Helper function to calculate the total of a main category's fields, including subcategory totals
const calculateMainCategoryTotal = (category: any): number => {
  let total = 0;

  // Sum all direct numeric fields within the main category
  for (const key in category) {
    if (typeof category[key] === "number" && key !== "subTotal") {
      total += category[key];
    }
  }

  // Sum all totals within subcategories
  if (category.totals) {
    total += Object.values(category.totals as []).reduce(
      (acc, curr) => acc + curr,
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
  },
});

// Export actions and reducer
export const { updateField } = budgetSlice.actions;

export default budgetSlice.reducer;
