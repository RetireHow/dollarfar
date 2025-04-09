/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TDynamicField = {
  title: string;
  amount: string;
  frequency: string;
  totalAnnualAmount: number;
};

// ==========================|| Income Types ||================================
type TSalarySubField = {
  salaryAmount: string;
  salaryFrequency: string;
  totalAnnualAmount: number;
};

type TGovtBenefitsSubField = {
  govtBenefitsAmount: string;
  govtBenefitsFrequency: string;
  totalAnnualAmount: number;
};

type TNetIncomeSubField = {
  netIncomeAmount: string;
  netIncomeFrequency: string;
  totalAnnualAmount: number;
};

type TOtherIncomeSubField = {
  otherIncomeAmount: string;
  otherIncomeFrequency: string;
  totalAnnualAmount: number;
};

type TIncome = {
  salary: TSalarySubField;
  govtBenefits: TGovtBenefitsSubField;
  netIncome: TNetIncomeSubField;
  otherIncome: TOtherIncomeSubField;

  dynamicSalaries: TDynamicField[];
  dynamicGovtBenefits: TDynamicField[];
  dynamicNetIncomes: TDynamicField[];
  dynamicOtherIncomes: TDynamicField[];
  dynamicMoreIncomes: TDynamicField[];

  totalAnnualIncome: number;
  totalMonthlyIncome: number;

  totalAnnualIncomeAfterTax: number;
  totalMonthlyIncomeAfterTax: number;

  incomeTaxRate: string;
  totalAnnualIncomeTaxPaidAmount: number;
  totalMonthlyIncomeTaxPaidAmount: number;
};

// =======================|| Housing Types ||======================
type TMortgage1 = {
  mortgageAmount1: string;
  mortgageFrequency1: string;
  totalAnnualAmount: number;
};
type TMortgage2 = {
  mortgageAmount2: string;
  mortgageFrequency2: string;
  totalAnnualAmount: number;
};
type TMortgage3 = {
  mortgageAmount3: string;
  mortgageFrequency3: string;
  totalAnnualAmount: number;
};

type TRent = {
  rentAmount: string;
  rentFrequency: string;
  totalAnnualAmount: number;
};
type THomeInsurance = {
  homeInsuranceAmount: string;
  homeInsuranceFrequency: string;
  totalAnnualAmount: number;
};
type TUtilities = {
  utilitiesAmount: string;
  utilitiesFrequency: string;
  totalAnnualAmount: number;
};
type TTelecomService = {
  telecomServiceAmount: string;
  telecomServiceFrequency: string;
  totalAnnualAmount: number;
};
type TMaintenance = {
  maintenanceAmount: string;
  maintenanceFrequency: string;
  totalAnnualAmount: number;
};

type THousing = {
  mortgage1: TMortgage1;
  mortgage2: TMortgage2;
  mortgage3: TMortgage3;
  rent: TRent;
  homeInsurance: THomeInsurance;
  utilities: TUtilities;
  telecomService: TTelecomService;
  maintenance: TMaintenance;

  dynamicUtilities: TDynamicField[];
  dynamicTelecomServices: TDynamicField[];
  dynamicMaintenances: TDynamicField[];
  dynamicMoreHousingExpenses: TDynamicField[];

  totalAnnualHousingExpenses: number;
  totalMonthlyHousingExpenses: number;
};

// ==========================|| Transport Types ||======================
type TCarPayment = {
  carPaymentAmount: string;
  carPaymentFrequency: string;
  totalAnnualAmount: number;
};
type TCarInsurance = {
  carInsuranceAmount: string;
  carInsuranceFrequency: string;
  totalAnnualAmount: number;
};
type TCarRepairs = {
  carRepairsAmount: string;
  carRepairsFrequency: string;
  totalAnnualAmount: number;
};
type TGasFuelEtrToll = {
  gasFuelEtrTollAmount: string;
  gasFuelEtrTollFrequency: string;
  totalAnnualAmount: number;
};

type TTransport = {
  carPayment: TCarPayment;
  carInsurance: TCarInsurance;
  carRepairs: TCarRepairs;
  gasFuelEtrToll: TGasFuelEtrToll;
  dynamicGasFuelEtrToll: TDynamicField[];
  dynamicMoreTransportExpenses: TDynamicField[];

  totalAnnualTransportExpenses: number;
  totalMonthlyTransportExpenses: number;
};

// ==========================|| Education Types ||===================
type TSchoolCollegeFee = {
  schoolCollegeFeeAmount: string;
  schoolCollegeFeeFrequency: string;
  totalAnnualAmount: number;
};

type TEducation = {
  schoolCollegeFee: TSchoolCollegeFee;
  dynamicSchoolCollegeFees: TDynamicField[];
  dynamicMoreEducatoinExpenses: TDynamicField[];

  totalAnnualEducationalExpenses: number;
  totalMonthlyEducationalExpenses: number;
};

// ======================|| Other Expenses Types ||===================
type Thousehole = {
  householeAmount: string;
  householeFrequency: string;
  totalAnnualAmount: number;
};
type Tclothing = {
  clothingAmount: string;
  clothingFrequency: string;
  totalAnnualAmount: number;
};
type TeatingOut = {
  eatingOutAmount: string;
  eatingOutFrequency: string;
  totalAnnualAmount: number;
};
type Tmedical = {
  medicalAmount: string;
  medicalFrequency: string;
  totalAnnualAmount: number;
};
type TentertainmentEvents = {
  entertainmentEventsAmount: string;
  entertainmentEventsFrequency: string;
  totalAnnualAmount: number;
};
type TOther = {
  househole: Thousehole;
  clothing: Tclothing;
  eatingOut: TeatingOut;
  medical: Tmedical;
  entertainmentEvents: TentertainmentEvents;

  dynamicEntertainmentEvents: TDynamicField[];
  dynamicMoreOtherExpenses: TDynamicField[];
  totalAnnualOtherExpenses: number;
  totalMonthlyOtherExpenses: number;
};

// ======================|| Loan Types ||=========================
type TPersonalLoan = {
  personalLoanAmount: string;
  personalLoanFrequency: string;
  totalAnnualAmount: number;
};
type THomeLoan = {
  homeLoanAmount: string;
  homeLoanFrequency: string;
  totalAnnualAmount: number;
};
type TStudentLoan = {
  studentLoanAmount: string;
  studentLoanFrequency: string;
  totalAnnualAmount: number;
};

type TLoans = {
  personalLoan: TPersonalLoan;
  homeLoan: THomeLoan;
  studentLoan: TStudentLoan;
  dynamicMoreLoansExpenses: TDynamicField[];
  totalAnnualLoansExpenses: number;
  totalMonthlyLoansExpenses: number;
};

// ===================|| Savings Types ||=====================
type TVacationFund = {
  vacationFundAmount: "";
  vacationFundFrequency: "12";
  totalAnnualAmount: 0;
};
type TEmergency = {
  emergencyAmount: "";
  emergencyFrequency: "12";
  totalAnnualAmount: 0;
};
type TRetirement = {
  retirementAmount: "";
  retirementFrequency: "12";
  totalAnnualAmount: 0;
};
type TInvestments = {
  investmentsAmount: "";
  investmentsFrequency: "12";
  totalAnnualAmount: 0;
};

type TSavings = {
  vacationFund: TVacationFund;
  emergency: TEmergency;
  retirement: TRetirement;
  investments: TInvestments;
  dynamicInvestments: TDynamicField[];
  dynamicMoreInvestments: TDynamicField[];
  totalAnnualSavingsExpenses: number;
  totalMonthlySavingsExpenses: number;
};

export type TBudgetSlice = {
  income: TIncome;
  housing: THousing;
  transport: TTransport;
  education: TEducation;
  other: TOther;
  loans: TLoans;
  savings: TSavings;
  totalAnnualExpenses: number;
  totalMonthlyExpenses: number;
  totalMonthlyCashFlow: number;
  totalAnnualCashFlow: number;

  totalMonthlyCashFlowAfterTax: number;
  totalAnnualCashFlowAfterTax: number;
};

export type TStaticPayloadField = {
  salary: string;
  govtBenefits: string;
  netIncome: string;
  otherIncome: string;

  mortgage: string;
  rent: string;
  homeInsurance: string;
  utilities: string;
  telecomService: string;
  maintenance: string;
};

type TStaticFieldUpdatePayload = {
  stepName: keyof TBudgetSlice;
  field: keyof TStaticPayloadField;
  subField: string;
  value: string;
};

const initialState: TBudgetSlice = {
  income: {
    salary: {
      salaryAmount: "",
      salaryFrequency: "12",
      totalAnnualAmount: 0,
    },
    govtBenefits: {
      govtBenefitsAmount: "",
      govtBenefitsFrequency: "12",
      totalAnnualAmount: 0,
    },
    netIncome: {
      netIncomeAmount: "",
      netIncomeFrequency: "12",
      totalAnnualAmount: 0,
    },
    otherIncome: {
      otherIncomeAmount: "",
      otherIncomeFrequency: "12",
      totalAnnualAmount: 0,
    },

    dynamicSalaries: [],
    dynamicGovtBenefits: [],
    dynamicNetIncomes: [],
    dynamicOtherIncomes: [],
    dynamicMoreIncomes: [],

    totalAnnualIncome: 0,
    totalMonthlyIncome: 0,
    totalAnnualIncomeAfterTax: 0,
    totalMonthlyIncomeAfterTax: 0,
    incomeTaxRate: "",
    totalAnnualIncomeTaxPaidAmount: 0,
    totalMonthlyIncomeTaxPaidAmount: 0,
  },

  housing: {
    mortgage1: {
      mortgageAmount1: "",
      mortgageFrequency1: "12",
      totalAnnualAmount: 0,
    },
    mortgage2: {
      mortgageAmount2: "",
      mortgageFrequency2: "12",
      totalAnnualAmount: 0,
    },
    mortgage3: {
      mortgageAmount3: "",
      mortgageFrequency3: "12",
      totalAnnualAmount: 0,
    },
    rent: {
      rentAmount: "",
      rentFrequency: "12",
      totalAnnualAmount: 0,
    },
    homeInsurance: {
      homeInsuranceAmount: "",
      homeInsuranceFrequency: "12",
      totalAnnualAmount: 0,
    },
    utilities: {
      utilitiesAmount: "",
      utilitiesFrequency: "12",
      totalAnnualAmount: 0,
    },
    telecomService: {
      telecomServiceAmount: "",
      telecomServiceFrequency: "12",
      totalAnnualAmount: 0,
    },
    maintenance: {
      maintenanceAmount: "",
      maintenanceFrequency: "12",
      totalAnnualAmount: 0,
    },

    dynamicUtilities: [],
    dynamicTelecomServices: [],
    dynamicMaintenances: [],
    dynamicMoreHousingExpenses: [],

    totalAnnualHousingExpenses: 0,
    totalMonthlyHousingExpenses: 0,
  },

  transport: {
    carPayment: {
      carPaymentAmount: "",
      carPaymentFrequency: "12",
      totalAnnualAmount: 0,
    },
    carInsurance: {
      carInsuranceAmount: "",
      carInsuranceFrequency: "12",
      totalAnnualAmount: 0,
    },
    carRepairs: {
      carRepairsAmount: "",
      carRepairsFrequency: "12",
      totalAnnualAmount: 0,
    },
    gasFuelEtrToll: {
      gasFuelEtrTollAmount: "",
      gasFuelEtrTollFrequency: "12",
      totalAnnualAmount: 0,
    },
    dynamicGasFuelEtrToll: [],
    dynamicMoreTransportExpenses: [],

    totalAnnualTransportExpenses: 0,
    totalMonthlyTransportExpenses: 0,
  },

  education: {
    schoolCollegeFee: {
      schoolCollegeFeeAmount: "",
      schoolCollegeFeeFrequency: "12",
      totalAnnualAmount: 0,
    },
    dynamicSchoolCollegeFees: [],
    dynamicMoreEducatoinExpenses: [],

    totalAnnualEducationalExpenses: 0,
    totalMonthlyEducationalExpenses: 0,
  },

  other: {
    househole: {
      householeAmount: "",
      householeFrequency: "12",
      totalAnnualAmount: 0,
    },
    clothing: {
      clothingAmount: "",
      clothingFrequency: "12",
      totalAnnualAmount: 0,
    },
    eatingOut: {
      eatingOutAmount: "",
      eatingOutFrequency: "12",
      totalAnnualAmount: 0,
    },
    medical: {
      medicalAmount: "",
      medicalFrequency: "12",
      totalAnnualAmount: 0,
    },
    entertainmentEvents: {
      entertainmentEventsAmount: "",
      entertainmentEventsFrequency: "12",
      totalAnnualAmount: 0,
    },

    dynamicEntertainmentEvents: [],
    dynamicMoreOtherExpenses: [],

    totalAnnualOtherExpenses: 0,
    totalMonthlyOtherExpenses: 0,
  },

  loans: {
    personalLoan: {
      personalLoanAmount: "",
      personalLoanFrequency: "12",
      totalAnnualAmount: 0,
    },
    homeLoan: {
      homeLoanAmount: "",
      homeLoanFrequency: "12",
      totalAnnualAmount: 0,
    },
    studentLoan: {
      studentLoanAmount: "",
      studentLoanFrequency: "12",
      totalAnnualAmount: 0,
    },
    dynamicMoreLoansExpenses: [],

    totalAnnualLoansExpenses: 0,
    totalMonthlyLoansExpenses: 0,
  },

  savings: {
    vacationFund: {
      vacationFundAmount: "",
      vacationFundFrequency: "12",
      totalAnnualAmount: 0,
    },
    emergency: {
      emergencyAmount: "",
      emergencyFrequency: "12",
      totalAnnualAmount: 0,
    },
    retirement: {
      retirementAmount: "",
      retirementFrequency: "12",
      totalAnnualAmount: 0,
    },
    investments: {
      investmentsAmount: "",
      investmentsFrequency: "12",
      totalAnnualAmount: 0,
    },

    dynamicInvestments: [],
    dynamicMoreInvestments: [],

    totalAnnualSavingsExpenses: 0,
    totalMonthlySavingsExpenses: 0,
  },

  totalAnnualExpenses: 0,
  totalMonthlyExpenses: 0,
  totalMonthlyCashFlow: 0,
  totalAnnualCashFlow: 0,

  totalMonthlyCashFlowAfterTax: 0,
  totalAnnualCashFlowAfterTax: 0,
};

function calculateTotalAnnualAmountSumForAllDynamicFields(
  ...arrays: TDynamicField[][]
) {
  return arrays.reduce((totalSum, array) => {
    const arraySum = array.reduce(
      (sum: number, field: { totalAnnualAmount: number }) =>
        sum + field.totalAnnualAmount,
      0
    );
    return totalSum + arraySum;
  }, 0);
}

// Create the slice using the defined types
const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    updateBgtStaticField: (
      state: any,
      action: PayloadAction<TStaticFieldUpdatePayload>
    ) => {
      const { stepName, field, subField, value } = action.payload;
      if (stepName && field && subField) {
        state[stepName][field][subField] = value;
        state[stepName][field].totalAnnualAmount =
          Number(
            state[stepName][field][Object.keys(state[stepName][field])[1]]
          ) *
          Number(
            state[stepName][field][Object.keys(state[stepName][field])[0]]
          );
      }
    },
    updateIncomeTaxField: (state, action) => {
      state.income.incomeTaxRate = action.payload;
    },

    addDynamicField: (
      state: any,
      action: PayloadAction<{
        stepName: string;
        field: string;
        value: TDynamicField;
      }>
    ) => {
      const { stepName, field, value } = action.payload;
      state[stepName][field].push(value);
    },

    updateDynamicFieldTitle: (
      state: any,
      action: PayloadAction<{
        stepName: string;
        field: string;
        value: string;
        index: number;
      }>
    ) => {
      const { stepName, field, value, index: fieldIndex } = action.payload;
      const updateIndex = state[stepName][field].findIndex(
        (_: any, index: number) => index == fieldIndex
      );
      if (updateIndex >= 0) {
        const dynamicFieldToBeUpdated = state[stepName][field][updateIndex];
        dynamicFieldToBeUpdated.title = value;
        state[stepName][field][updateIndex] = dynamicFieldToBeUpdated;
      }
    },

    updateDynamicFieldValue: (
      state: any,
      action: PayloadAction<{
        stepName: string;
        field: string;
        value: string;
        index: number;
      }>
    ) => {
      const { stepName, field, value, index: fieldIndex } = action.payload;
      const updateIndex = state[stepName][field].findIndex(
        (_: any, index: number) => index == fieldIndex
      );
      if (updateIndex >= 0) {
        const dynamicFieldToBeUpdated = state[stepName][field][updateIndex];
        dynamicFieldToBeUpdated.amount = value;
        dynamicFieldToBeUpdated.totalAnnualAmount =
          Number(dynamicFieldToBeUpdated.amount) *
          Number(dynamicFieldToBeUpdated.frequency);
        state[stepName][field][updateIndex] = dynamicFieldToBeUpdated;
      }
    },

    updateDynamicFieldFrequency: (
      state: any,
      action: PayloadAction<{
        stepName: string;
        field: string;
        value: string;
        index: number;
      }>
    ) => {
      const { stepName, field, value, index: fieldIndex } = action.payload;
      const updateIndex = state[stepName][field].findIndex(
        (_: any, index: number) => index == fieldIndex
      );
      if (updateIndex >= 0) {
        const dynamicFieldToBeUpdated = state[stepName][field][updateIndex];
        dynamicFieldToBeUpdated.frequency = value;
        dynamicFieldToBeUpdated.totalAnnualAmount =
          Number(dynamicFieldToBeUpdated.amount) *
          Number(dynamicFieldToBeUpdated.frequency);
        state[stepName][field][updateIndex] = dynamicFieldToBeUpdated;
      }
    },

    deleteDynamicField: (
      state: any,
      action: PayloadAction<{
        stepName: string;
        field: string;
        index: number;
      }>
    ) => {
      const { stepName, field, index: fieldIndex } = action.payload;
      state[stepName][field] = state[stepName][field].filter(
        (_: any, index: number) => index !== fieldIndex
      );
    },

    calculateTotalIncome: (state) => {
      const staticFieldsTotalAnnualIncome =
        state.income.salary.totalAnnualAmount +
        state.income.govtBenefits.totalAnnualAmount +
        state.income.netIncome.totalAnnualAmount +
        state.income.otherIncome.totalAnnualAmount;

      const {
        dynamicSalaries,
        dynamicGovtBenefits,
        dynamicNetIncomes,
        dynamicOtherIncomes,
        dynamicMoreIncomes,
      } = state.income;

      const dynamicFieldsTotalAnnualIncome =
        calculateTotalAnnualAmountSumForAllDynamicFields(
          dynamicSalaries,
          dynamicGovtBenefits,
          dynamicNetIncomes,
          dynamicOtherIncomes,
          dynamicMoreIncomes
        );
      state.income.totalAnnualIncome =
        staticFieldsTotalAnnualIncome + dynamicFieldsTotalAnnualIncome;
      state.income.totalMonthlyIncome = Number(
        (state.income.totalAnnualIncome / 12).toFixed(2)
      );
    },

    calculateTotalHousingExpenses: (state) => {
      const staticFieldsTotalAnnualHousingExpenses =
        state.housing.mortgage1.totalAnnualAmount +
        state.housing.mortgage2.totalAnnualAmount +
        state.housing.mortgage3.totalAnnualAmount +
        state.housing.rent.totalAnnualAmount +
        state.housing.homeInsurance.totalAnnualAmount +
        state.housing.utilities.totalAnnualAmount +
        state.housing.telecomService.totalAnnualAmount +
        state.housing.maintenance.totalAnnualAmount;

      const {
        dynamicUtilities,
        dynamicTelecomServices,
        dynamicMaintenances,
        dynamicMoreHousingExpenses,
      } = state.housing;

      const dynamicFieldsTotalAnnualHousingExpenses =
        calculateTotalAnnualAmountSumForAllDynamicFields(
          dynamicUtilities,
          dynamicTelecomServices,
          dynamicMaintenances,
          dynamicMoreHousingExpenses
        );
      state.housing.totalAnnualHousingExpenses =
        staticFieldsTotalAnnualHousingExpenses +
        dynamicFieldsTotalAnnualHousingExpenses;

      state.housing.totalMonthlyHousingExpenses = Number(
        (state.housing.totalAnnualHousingExpenses / 12).toFixed(2)
      );
    },

    calculateTotalTransportExpenses: (state) => {
      const staticFieldsTotalAnnualTransportExpenses =
        state.transport.carPayment.totalAnnualAmount +
        state.transport.carInsurance.totalAnnualAmount +
        state.transport.carRepairs.totalAnnualAmount +
        state.transport.gasFuelEtrToll.totalAnnualAmount;

      const { dynamicGasFuelEtrToll, dynamicMoreTransportExpenses } =
        state.transport;

      const dynamicFieldsTotalAnnualTransportExpenses =
        calculateTotalAnnualAmountSumForAllDynamicFields(
          dynamicGasFuelEtrToll,
          dynamicMoreTransportExpenses
        );
      state.transport.totalAnnualTransportExpenses =
        staticFieldsTotalAnnualTransportExpenses +
        dynamicFieldsTotalAnnualTransportExpenses;

      state.transport.totalMonthlyTransportExpenses = Number(
        (state.transport.totalAnnualTransportExpenses / 12).toFixed(2)
      );
    },

    calculateTotalEducationalExpenses: (state) => {
      const staticFieldsTotalAnnualEducationalExpenses =
        state.education.schoolCollegeFee.totalAnnualAmount;

      const { dynamicMoreEducatoinExpenses, dynamicSchoolCollegeFees } =
        state.education;

      const dynamicFieldsTotalAnnualEducationExpenses =
        calculateTotalAnnualAmountSumForAllDynamicFields(
          dynamicMoreEducatoinExpenses,
          dynamicSchoolCollegeFees
        );

      state.education.totalAnnualEducationalExpenses =
        staticFieldsTotalAnnualEducationalExpenses +
        dynamicFieldsTotalAnnualEducationExpenses;

      state.education.totalMonthlyEducationalExpenses = Number(
        (state.education.totalAnnualEducationalExpenses / 12).toFixed(2)
      );
    },

    calculateTotalOtherExpenses: (state) => {
      const staticFieldsTotalAnnualOtherExpenses =
        state.other.househole.totalAnnualAmount +
        state.other.clothing.totalAnnualAmount +
        state.other.eatingOut.totalAnnualAmount +
        state.other.medical.totalAnnualAmount +
        state.other.entertainmentEvents.totalAnnualAmount;

      const { dynamicEntertainmentEvents, dynamicMoreOtherExpenses } =
        state.other;

      const dynamicFieldsTotalAnnualOtherExpenses =
        calculateTotalAnnualAmountSumForAllDynamicFields(
          dynamicEntertainmentEvents,
          dynamicMoreOtherExpenses
        );

      state.other.totalAnnualOtherExpenses =
        staticFieldsTotalAnnualOtherExpenses +
        dynamicFieldsTotalAnnualOtherExpenses;

      state.other.totalMonthlyOtherExpenses = Number(
        (state.other.totalAnnualOtherExpenses / 12).toFixed(2)
      );
    },
    calculateTotalLoansExpenses: (state) => {
      const staticFieldsTotalAnnualLoansExpenses =
        state.loans.homeLoan.totalAnnualAmount +
        state.loans.personalLoan.totalAnnualAmount +
        state.loans.studentLoan.totalAnnualAmount;

      const { dynamicMoreLoansExpenses } = state.loans;

      const dynamicFieldsTotalAnnualLoansExpenses =
        calculateTotalAnnualAmountSumForAllDynamicFields(
          dynamicMoreLoansExpenses
        );

      state.loans.totalAnnualLoansExpenses =
        staticFieldsTotalAnnualLoansExpenses +
        dynamicFieldsTotalAnnualLoansExpenses;

      state.loans.totalMonthlyLoansExpenses = Number(
        (state.loans.totalAnnualLoansExpenses / 12).toFixed(2)
      );
    },

    calculateTotalSavingsExpenses: (state) => {
      const staticFieldsTotalAnnualSavingsExpenses =
        state.savings.emergency.totalAnnualAmount +
        state.savings.investments.totalAnnualAmount +
        state.savings.retirement.totalAnnualAmount +
        state.savings.vacationFund.totalAnnualAmount;

      const { dynamicInvestments, dynamicMoreInvestments } = state.savings;

      const dynamicFieldsTotalAnnualSavingsExpenses =
        calculateTotalAnnualAmountSumForAllDynamicFields(
          dynamicInvestments,
          dynamicMoreInvestments
        );

      state.savings.totalAnnualSavingsExpenses =
        staticFieldsTotalAnnualSavingsExpenses +
        dynamicFieldsTotalAnnualSavingsExpenses;

      state.savings.totalMonthlySavingsExpenses = Number(
        (state.savings.totalAnnualSavingsExpenses / 12).toFixed(2)
      );
    },

    calculateTotalExpenses: (state) => {
      const totalAnnualExpenses =
        state.housing.totalAnnualHousingExpenses +
        state.transport.totalAnnualTransportExpenses +
        state.education.totalAnnualEducationalExpenses +
        state.other.totalAnnualOtherExpenses +
        state.loans.totalAnnualLoansExpenses +
        state.savings.totalAnnualSavingsExpenses;

      const totalMonthlyExpenses =
        state.housing.totalMonthlyHousingExpenses +
        state.transport.totalMonthlyTransportExpenses +
        state.education.totalMonthlyEducationalExpenses +
        state.other.totalMonthlyOtherExpenses +
        state.loans.totalMonthlyLoansExpenses +
        state.savings.totalMonthlySavingsExpenses;

      state.totalAnnualExpenses = totalAnnualExpenses;
      state.totalMonthlyExpenses = totalMonthlyExpenses;
    },

    calculateCashFlow: (state) => {
      const totalAnnualIncome = state.income.totalAnnualIncome;
      const totalMonthlyIncome = state.income.totalMonthlyIncome;

      const totalAnnualIncomeTaxPaidAmount =
        totalAnnualIncome * (Number(state.income.incomeTaxRate) / 100);
      const totalMonthlyIncomeTaxPaidAmount =
        totalMonthlyIncome * (Number(state.income.incomeTaxRate) / 100);

      state.income.totalAnnualIncomeTaxPaidAmount =
        totalAnnualIncomeTaxPaidAmount;
      state.income.totalMonthlyIncomeTaxPaidAmount =
        totalMonthlyIncomeTaxPaidAmount;

      state.income.totalAnnualIncomeAfterTax =
        totalAnnualIncome - totalAnnualIncomeTaxPaidAmount;
      state.income.totalMonthlyIncomeAfterTax =
        totalMonthlyIncome - totalMonthlyIncomeTaxPaidAmount;

      const totalAnnualExpenses = state.totalAnnualExpenses;
      const totalMonthlyExpenses = state.totalMonthlyExpenses;

      const totalMonthlyCashFlow = totalMonthlyIncome - totalMonthlyExpenses;
      const totalAnnualCashFlow = totalAnnualIncome - totalAnnualExpenses;

      const totalMonthlyCashFlowAfterTax =
        state.income.totalMonthlyIncomeAfterTax - totalMonthlyExpenses;
      const totalAnnualCashFlowAfterTax =
        state.income.totalAnnualIncomeAfterTax - totalAnnualExpenses;

      state.totalMonthlyCashFlow = totalMonthlyCashFlow;
      state.totalAnnualCashFlow = totalAnnualCashFlow;

      state.totalMonthlyCashFlowAfterTax = totalMonthlyCashFlowAfterTax;
      state.totalAnnualCashFlowAfterTax = totalAnnualCashFlowAfterTax;
    },
  },
});

// Export actions and reducer
export const {
  updateBgtStaticField,
  addDynamicField,
  updateDynamicFieldTitle,
  updateDynamicFieldValue,
  updateDynamicFieldFrequency,
  deleteDynamicField,

  calculateTotalIncome,
  calculateTotalHousingExpenses,
  calculateTotalTransportExpenses,
  calculateTotalEducationalExpenses,
  calculateTotalOtherExpenses,
  calculateTotalLoansExpenses,
  calculateTotalSavingsExpenses,
  calculateTotalExpenses,
  calculateCashFlow,
  updateIncomeTaxField,
} = budgetSlice.actions;

export default budgetSlice.reducer;
