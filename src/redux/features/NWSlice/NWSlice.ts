import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
type Assets = {
  property: number;
  principalResidence: number;
  cottage: number;
  realEstateAssets: number;

  savingsInvestment: number;
  rrsp: number;
  rrIf: number;
  resp: number;

  personalItems: number;
  jewelry: number;
  artWork: number;
  collectibles: number;

  businessOwnershipInterest: number;
  ownership: number;
  partnership: number;
  equity: number;

  vehicles: number;
  car1: number;
  car2: number;
  motorcycle: number;

  otherAssets: number;
} & {
  [key: string]: number; // For dynamic fields
};

type Liabilities = {
  homeLoan: number;
  cottageLoan: number;
  mortgageLoan: number;
  loan1: number;

  personalOtherLoans: number;
  personalLoan: number;
  studentLoan: number;

  vehicleLoans: number;
  carLoan: number;
  motorcycleLoan: number;

  taxLiability: number;
  egCapitalGains: number;
  anyOtherTaxLiability: number;

  creditCardDues: number;
  creditCard1: number;
  creditCard2: number;
  creditCard3: number;

  otherDebts: number;
} & {
  [key: string]: number; // For dynamic fields
};

type NWState = {
  assets: Assets;
  liabilities: Liabilities;
  totalAssets: number;
  totalLiabilities: number;
  netWorth:number;
};

// Initial state
const initialState: NWState = {
  assets: {
    property: 0,
    principalResidence: 0,
    cottage: 0,
    realEstateAssets: 0,

    savingsInvestment: 0,
    rrsp: 0,
    rrIf: 0,
    resp: 0,

    personalItems: 0,
    jewelry: 0,
    artWork: 0,
    collectibles: 0,

    businessOwnershipInterest: 0,
    ownership: 0,
    partnership: 0,
    equity: 0,

    vehicles: 0,
    car1: 0,
    car2: 0,
    motorcycle: 0,

    otherAssets: 0,
  },

  liabilities: {
    homeLoan: 0,
    cottageLoan: 0,
    mortgageLoan: 0,
    loan1: 0,

    personalOtherLoans: 0,
    personalLoan: 0,
    studentLoan: 0,

    vehicleLoans: 0,
    carLoan: 0,
    motorcycleLoan: 0,

    taxLiability: 0,
    egCapitalGains: 0,
    anyOtherTaxLiability: 0,

    creditCardDues: 0,
    creditCard1: 0,
    creditCard2: 0,
    creditCard3: 0,

    otherDebts: 0,
  },
  totalAssets: 0,
  totalLiabilities: 0,
  netWorth:0
};

// Create the slice
const NWSlice = createSlice({
  name: "NWSlice",
  initialState,
  reducers: {
    // Static asset reducers
    setProperty(state, action: PayloadAction<number>) {
      state.assets.property = action.payload;
    },
    setPrincipalResidence(state, action: PayloadAction<number>) {
      state.assets.principalResidence = action.payload;
    },
    setCottage(state, action: PayloadAction<number>) {
      state.assets.cottage = action.payload;
    },
    setRealEstateAssets(state, action: PayloadAction<number>) {
      state.assets.realEstateAssets = action.payload;
    },
    setSavingsInvestment(state, action: PayloadAction<number>) {
      state.assets.savingsInvestment = action.payload;
    },
    setRRSP(state, action: PayloadAction<number>) {
      state.assets.rrsp = action.payload;
    },
    setRRIF(state, action: PayloadAction<number>) {
      state.assets.rrIf = action.payload;
    },
    setRESP(state, action: PayloadAction<number>) {
      state.assets.resp = action.payload;
    },
    setPersonalItems(state, action: PayloadAction<number>) {
      state.assets.personalItems = action.payload;
    },
    setJewelry(state, action: PayloadAction<number>) {
      state.assets.jewelry = action.payload;
    },
    setArtwork(state, action: PayloadAction<number>) {
      state.assets.artWork = action.payload;
    },
    setCollectibles(state, action: PayloadAction<number>) {
      state.assets.collectibles = action.payload;
    },
    setBusinessOwnershipInterest(state, action: PayloadAction<number>) {
      state.assets.businessOwnershipInterest = action.payload;
    },
    setOwnership(state, action: PayloadAction<number>) {
      state.assets.ownership = action.payload;
    },
    setPartnership(state, action: PayloadAction<number>) {
      state.assets.partnership = action.payload;
    },
    setEquity(state, action: PayloadAction<number>) {
      state.assets.equity = action.payload;
    },
    setVehicles(state, action: PayloadAction<number>) {
      state.assets.vehicles = action.payload;
    },
    setCar1(state, action: PayloadAction<number>) {
      state.assets.car1 = action.payload;
    },
    setCar2(state, action: PayloadAction<number>) {
      state.assets.car2 = action.payload;
    },
    setMotorcycle(state, action: PayloadAction<number>) {
      state.assets.motorcycle = action.payload;
    },
    setOtherAssets(state, action: PayloadAction<number>) {
      state.assets.otherAssets = action.payload;
    },

    // Static liability reducers
    setHomeLoan(state, action: PayloadAction<number>) {
      state.liabilities.homeLoan = action.payload;
    },
    setCottageLoan(state, action: PayloadAction<number>) {
      state.liabilities.cottageLoan = action.payload;
    },
    setMortgageLoan(state, action: PayloadAction<number>) {
      state.liabilities.mortgageLoan = action.payload;
    },
    setLoan1(state, action: PayloadAction<number>) {
      state.liabilities.loan1 = action.payload;
    },
    setPersonalOtherLoans(state, action: PayloadAction<number>) {
      state.liabilities.personalOtherLoans = action.payload;
    },
    setPersonalLoan(state, action: PayloadAction<number>) {
      state.liabilities.personalLoan = action.payload;
    },
    setStudentLoan(state, action: PayloadAction<number>) {
      state.liabilities.studentLoan = action.payload;
    },
    setVehicleLoans(state, action: PayloadAction<number>) {
      state.liabilities.vehicleLoans = action.payload;
    },
    setCarLoan(state, action: PayloadAction<number>) {
      state.liabilities.carLoan = action.payload;
    },
    setMotorcycleLoan(state, action: PayloadAction<number>) {
      state.liabilities.motorcycleLoan = action.payload;
    },
    setTaxLiability(state, action: PayloadAction<number>) {
      state.liabilities.taxLiability = action.payload;
    },
    setEGCapitalGains(state, action: PayloadAction<number>) {
      state.liabilities.egCapitalGains = action.payload;
    },
    setAnyOtherTaxLiability(state, action: PayloadAction<number>) {
      state.liabilities.anyOtherTaxLiability = action.payload;
    },
    setCreditCardDues(state, action: PayloadAction<number>) {
      state.liabilities.creditCardDues = action.payload;
    },
    setCreditCard1(state, action: PayloadAction<number>) {
      state.liabilities.creditCard1 = action.payload;
    },
    setCreditCard2(state, action: PayloadAction<number>) {
      state.liabilities.creditCard2 = action.payload;
    },
    setCreditCard3(state, action: PayloadAction<number>) {
      state.liabilities.creditCard3 = action.payload;
    },
    setOtherDebts(state, action: PayloadAction<number>) {
      state.liabilities.otherDebts = action.payload;
    },

    // Dynamic asset and liability reducers
    setDynamicAsset(
      state,
      action: PayloadAction<{ key: string; value: number }>
    ) {
      const { key, value } = action.payload;
      state.assets[key] = value;
    },
    setDynamicLiability(
      state,
      action: PayloadAction<{ key: string; value: number }>
    ) {
      const { key, value } = action.payload;
      state.liabilities[key] = value;
    },
    // Calculate total assets
    calculateTotalAssets(state) {
      const { assets } = state;
      const totalAssets = Object.values(assets).reduce(
        (total, value) => total + value,
        0
      );
      return { ...state, totalAssets };
    },

    // Calculate total liabilities
    calculateTotalLiabilities(state) {
      const { liabilities } = state;
      const totalLiabilities = Object.values(liabilities).reduce(
        (total, value) => total + value,
        0
      );
      return { ...state, totalLiabilities };
    },

    // Calculate net worth
    calculateNetWorth(state) {
      const totalAssets = Object.values(state.assets).reduce(
        (total, value) => total + value,
        0
      );
      const totalLiabilities = Object.values(state.liabilities).reduce(
        (total, value) => total + value,
        0
      );
      const netWorth = totalAssets - totalLiabilities;
      return { ...state, netWorth };
    },

    // Clear all states
    clearAll() {
      return initialState;
    },
  },
});

// Export actions and reducer
export const {
  // Static asset actions
  setProperty,
  setPrincipalResidence,
  setCottage,
  setRealEstateAssets,
  setSavingsInvestment,
  setRRSP,
  setRRIF,
  setRESP,
  setPersonalItems,
  setJewelry,
  setArtwork,
  setCollectibles,
  setBusinessOwnershipInterest,
  setOwnership,
  setPartnership,
  setEquity,
  setVehicles,
  setCar1,
  setCar2,
  setMotorcycle,
  setOtherAssets,

  // Static liability actions
  setHomeLoan,
  setCottageLoan,
  setMortgageLoan,
  setLoan1,
  setPersonalOtherLoans,
  setPersonalLoan,
  setStudentLoan,
  setVehicleLoans,
  setCarLoan,
  setMotorcycleLoan,
  setTaxLiability,
  setEGCapitalGains,
  setAnyOtherTaxLiability,
  setCreditCardDues,
  setCreditCard1,
  setCreditCard2,
  setCreditCard3,
  setOtherDebts,

  // Dynamic actions
  setDynamicAsset,
  setDynamicLiability,

  //   Calculate
  calculateTotalAssets,
  calculateTotalLiabilities,
  calculateNetWorth,
  clearAll,
} = NWSlice.actions;

export default NWSlice.reducer;
