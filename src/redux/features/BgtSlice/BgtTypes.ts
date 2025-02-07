/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UpdatePayload {
  category: keyof BudgetState;
  subCategory?: keyof SubCategory;
  field: keyof Field;
  value: string;
}

export interface SalaryOrWages {
  salary1: string;
  wages: string;
  [key: string]: string;
}

export interface GovtBenefits {
  childTaxBenefit: string;
  [key: string]: string;
}

export interface NetIncome {
  businessProfit: string;
  [key: string]: string;
}

export interface OtherIncome {
  rentalIncome: string;
  [key: string]: string;
}

// Define income type at all
export interface Income {
  frequency:string;
  salaryOrWages: SalaryOrWages;
  govtBenefits: GovtBenefits;
  netIncome: NetIncome;
  otherIncome: OtherIncome;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface WGE {
  water: string;
  gas: string;
  electricity: string;
  [key: string]: string;
}

export interface CableTvInternetPhone {
  cableTv: string;
  internet: string;
  homePhone: string;
  cellPhone: string;
  [key: string]: string;
}

export interface RepairsOrMaintenance {
  repairs: string;
  maintenances: string;
  [key: string]: string;
}

export interface Housing {
  mortgage: string;
  rent: string;
  homeInsurance: string;
  wge: WGE;
  cableTvInternetPhone: CableTvInternetPhone;
  repairsOrMaintenance: RepairsOrMaintenance;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface GasFuelEtrToll {
  gas: string;
  fuel: string;
  etrToll: string;
  [key: string]: string;
}

export interface Transport {
  carPayment: string;
  carInsurance: string;
  carRepairs: string;
  gasFuelEtrToll: GasFuelEtrToll;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface SchoolCollegeFee {
  schoolFee: string;
  collegeFee: string;
}

export interface Educational {
  schoolCollegeFee: SchoolCollegeFee;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface EntertainmentEvents {
  entertainment: string;
  events: string;
  [key: string]: string;
}

export interface Other {
  househole: string;
  clothing: string;
  eatingOut: string;
  medical: string;
  entertainmentEvents: EntertainmentEvents;
  [key: string]: any;
  totals: { [K in keyof SubCategory]?: number };
  subTotal: number;
}

export interface Loans {
  personalLoan: string;
  homeLoan: string;
  studentLoan: string;
  [key: string]: string;
  subTotal: string;
}

export interface Investments {
  mutalFunds: string;
  bonds: string;
  [key: string]: string;
}

export interface Savings {
  vacationFund: string;
  emergency: string;
  retirement: string;
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
