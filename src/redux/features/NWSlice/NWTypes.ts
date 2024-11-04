// Define individual asset group types (as you already defined)
export type PropertyAssets = {
    principalResidence: number;
    cottage: number;
    realEstateAssets: number;
    [key: string]: number; // For dynamic fields
  };
  
  export type SavingsInvestmentAssets = {
    rrsp: number;
    rrIf: number;
    resp: number;
    [key: string]: number;
  };
  
  export type PersonalItemsAssets = {
    jewelry: number;
    artWork: number;
    collectibles: number;
    [key: string]: number;
  };
  
  export type BusinessOwnershipAssets = {
    ownership: number;
    partnership: number;
    equity: number;
    [key: string]: number;
  };
  
  export type VehiclesAssets = {
    car1: number;
    car2: number;
    motorcycle: number;
    [key: string]: number;
  };

  export type OtherAssets = {
    otherAsset:number;
    [key: string]: number;
  }
  
  // Define the Totals type
  export type Totals = {
    property: number;
    savingsInvestment: number;
    personalItems: number;
    businessOwnershipInterest: number;
    vehicles: number;
    otherAssets: number;
  };
  
  // Define the complete Assets type
  export type Assets = {
    property: PropertyAssets;
    savingsInvestment: SavingsInvestmentAssets;
    personalItems: PersonalItemsAssets;
    businessOwnershipInterest: BusinessOwnershipAssets;
    vehicles: VehiclesAssets;
    otherAssets: OtherAssets;
    totals: Totals;
  };
  
  // Define individual liability group types (as you already defined)
  export type HomeLoanLiabilities = {
    cottageLoan: number;
    mortgageLoan: number;
    loan1: number;
    [key: string]: number; // For dynamic fields
  };
  
  export type PersonalOtherLoansLiabilities = {
    personalLoan: number;
    studentLoan: number;
    [key: string]: number;
  };
  
  export type VehicleLoansLiabilities = {
    carLoan: number;
    motorcycleLoan: number;
    [key: string]: number;
  };
  
  export type TaxLiabilityLiabilities = {
    egCapitalGains: number;
    anyOtherTaxLiability: number;
    [key: string]: number;
  };
  
  export type CreditCardDuesLiabilities = {
    creditCard1: number;
    creditCard2: number;
    creditCard3: number;
    [key: string]: number;
  };

  export type OtherDebts = {
    otherDebt:number;
    [key: string]: number;
  }
  
  // Define the Totals type
  export type LiabilityTotals = {
    homeLoan: number;
    personalOtherLoans: number;
    vehicleLoans: number;
    taxLiability: number;
    creditCardDues: number;
    otherDebts: number,
  };
  
  // Define the complete Liabilities type
  export type Liabilities = {
    homeLoan: HomeLoanLiabilities;
    personalOtherLoans: PersonalOtherLoansLiabilities;
    vehicleLoans: VehicleLoansLiabilities;
    taxLiability: TaxLiabilityLiabilities;
    creditCardDues: CreditCardDuesLiabilities;
    otherDebts: OtherDebts;
    totals: LiabilityTotals;
  };
  
  // Define state structure
  export type NWState = {
    assets: Assets;
    liabilities: Liabilities;
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
  };



  // Type mapping to get specific keys for each category in Liabilities
export type LiabilityCategoryKeys = {
  cottageLoan: string;
  mortgageLoan: string;
  loan1: string;
  personalLoan: string;
  studentLoan: string;
  carLoan: string;
  motorcycleLoan: string;
  egCapitalGains: string;
  anyOtherTaxLiability: string;
  creditCard1: string;
  creditCard2: string;
  creditCard3: string;
  otherDebt: string;
};