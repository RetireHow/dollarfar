/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UpdatePayload {
  category: keyof BudgetState;
  subCategory?: keyof SubCategory;
  field: keyof Field;
  value: number;
}

export interface SalaryOrWages {
  salary1: number;
  wages: number;
  [key: string]: number;
}

export interface GovtBenefits {
  childTaxBenefit: number;
  [key: string]: number;
}

export interface NetIncome {
  businessProfit: number;
  [key: string]: number;
}

export interface OtherIncome {
  rentalIncome: number;
  [key: string]: number;
}

// Define income type at all
export interface Income {
  salaryOrWages: SalaryOrWages;
  govtBenefits: GovtBenefits;
  netIncome: NetIncome;
  otherIncome: OtherIncome;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface WGE {
  water: number;
  gas: number;
  electricity: number;
  [key: string]: number;
}

export interface CableTvInternetPhone {
  cableTv: number;
  internet: number;
  homePhone: number;
  cellPhone: number;
  [key: string]: number;
}

export interface RepairsOrMaintenance {
  repairs: number;
  maintenances: number;
  [key: string]: number;
}

export interface Housing {
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

export interface GasFuelEtrToll {
  gas: number;
  fuel: number;
  etrToll: number;
  [key: string]: number;
}

export interface Transport {
  carPayment: number;
  carInsurance: number;
  carRepairs: number;
  gasFuelEtrToll: GasFuelEtrToll;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface SchoolCollegeFee {
  schoolFee: number;
  collegeFee: number;
}

export interface Educational {
  schoolCollegeFee: SchoolCollegeFee;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface EntertainmentEvents {
  entertainment: number;
  events: number;
  [key: string]: number;
}

export interface Other {
  househole: number;
  clothing: number;
  eatingOut: number;
  medical: number;
  entertainmentEvents: EntertainmentEvents;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface Loans {
  personalLoan: number;
  homeLoan: number;
  studentLoan: number;
  [key: string]: number;
}

export interface Investments {
  mutalFunds: number;
  bonds: number;
  [key: string]: number;
}

export interface Savings {
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
