/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  calculateCPPBenefit,
  calculateEmployerPensionAgeByAge,
  calculateOAS,
  calculateOASBenefitsAgeByAge,
  calculateOtherIncomeAgeByAge,
  calculatePensionPlanAgeByAge,
  calculateRetirementSavingsAgeByAge,
  calculateTFSAorNonRegAccountSavings,
  mergeArraysByAge,
} from "./CRIC.utils";
import {
  CRICState,
  TCalculatedResult,
  TEmployerPension,
  TGeneralInfo,
  TNRA,
  TOldAgeSecurity,
  TOtherIncome,
  TPensionPlan,
  TRetirementSavings,
  TTFSA,
} from "./CRIC.types";

// Initial state
const initialState: CRICState = {
  generalInfo: {
    dobMonth: "Select One",
    dobYear: "Select One",
    gender: "Select One",
    currentAnnualIncome: "Select One",
    annualRetirementIncomeGoal: "Select One",
    lifeExpectency: "",
  },

  pensionPlan: {
    selectedPP: "Not Applicable",
    ppStartYear: "Select One",
    monthlyRetirementPensionEstimate: "Select One",
  },

  employerPension: {
    hasEmployerPension: "No",
    pensionPlanType: "Select One",
    annualPension: "",
    pensionReceivingAge: "Select One",
    isIndexedToInflation: "Yes",
    inflationRate: "",
  },

  retirementSavings: {
    TFSA: {
      hasTFSA: "No",
      TFSAcurrentTotal: "",
      TFSAOngoingContributionAmount: "",
      TFSAOngoingContributionFrequency: "Select One",
      TFSAreturnRate: "",
    },
    NRA: {
      hasNRA: "No",
      NRAcurrentTotal: "",
      NRAOngoingContributionAmount: "",
      NRAOngoingContributionFrequency: "Select One",
      NRAreturnRate: "",
      NRAtaxRate: "",
    },
    TFSAorNRASavingsReceivingAge: "Select One",
  },

  oldAgeSecurity: {
    willLiveInCanadaUntil65: "Select One",
    willLiveInCanadaAtleast40Years: "Select One",
    numberOYearsLivedInCanada: "Select One",
    OASPensionReceivingAge: "Select One",
  },

  otherIncome: {
    hasOtherIncome: "No",
    otherIncomeType: "Select One",
    otherIncomeFrequency: "Select One",
    otherIncomeAmount: "Select One",
    otherIncomeStartReceivingAge: "Select One",
    otherIncomeStopReceivingAge: "Select One",
  },

  calculatedResult: {
    PPResult: {
      PPBenefitAmount: 0,
      PPBenefitsAgeByAge: [],
    },
    OASResult: {
      OASBenefitAmount: {
        oldAgeSecurityBefore75: 0,
        oldAgeSecurityAfter75: 0,
      },
      OASAmountsAgeByAge: [],
    },
    employerPensionResult: {
      employerPensionsAgeByAge: [],
    },

    retirementSavingsResult: {
      TFSASavings: {
        annualRetirementIncome: 0,
        savingsYearByYear: [],
      },
      nonRegAccountSavings: {
        annualRetirementIncome: 0,
        savingsYearByYear: [],
      },
      annualRetirementIncomeFromBothAccount: 0,
      retirementSavingsAgeByAge: [],
    },

    otherIncomeResult: {
      otherIncomeAmountAnnually: 0,
      otherIncomesAgeByAge: [],
    },
  },

  finalResult: [],
};

// Create the slice
const CRICSlice = createSlice({
  name: "CRICalculator",
  initialState,
  reducers: {
    updateGeneralInfoField: (
      state: {
        generalInfo: { [key: string]: string };
      },
      action: PayloadAction<{
        key: keyof TGeneralInfo;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      if (key) {
        state.generalInfo[key] = value;
      }
    },

    updateOldAgeSecurityField: (
      state: {
        oldAgeSecurity: { [key: string]: string };
      },
      action: PayloadAction<{
        key: keyof TOldAgeSecurity;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      if (key) {
        state.oldAgeSecurity[key] = value;
      }
    },

    updatePensionPlanField: (
      state: {
        pensionPlan: { [key: string]: string };
      },
      action: PayloadAction<{
        key: keyof TPensionPlan;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      if (key) {
        state.pensionPlan[key] = value;
      }
    },

    updateEmployerPensionField: (
      state: {
        employerPension: {
          [key: string]: string;
        };
      },
      action: PayloadAction<{
        key: keyof TEmployerPension;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      if (key) {
        state.employerPension[key] = value;
      }
    },

    updateRetirementSavingsField: (
      state: {
        retirementSavings: {
          [key: string]: any;
        };
      },
      action: PayloadAction<{
        mainKey: keyof TRetirementSavings;
        subKey?: keyof (TTFSA & TNRA) | "TFSAorNRASavingsReceivingAge";
        value: string;
      }>
    ) => {
      const { mainKey, subKey, value } = action.payload;
      if (mainKey && subKey) {
        state.retirementSavings[mainKey][subKey] = value;
      }
      if (mainKey && !subKey) {
        state.retirementSavings[mainKey] = value;
      }
    },

    updateOtherIncomeField: (
      state: {
        otherIncome: {
          [key: string]: string;
        };
      },
      action: PayloadAction<{
        key: keyof TOtherIncome;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      if (key) {
        state.otherIncome[key] = value;
      }
    },

    updateAgeByAgeField: (
      state: { calculatedResult: any },
      action: PayloadAction<{
        mainKey: keyof TCalculatedResult;
        subKey: any;
      }>
    ) => {
      const { mainKey, subKey } = action.payload;
      state.calculatedResult[mainKey][subKey] = [];
    },

    resetTFSAWithSelectedNo: (state) => {
      state.calculatedResult.retirementSavingsResult.TFSASavings.savingsYearByYear =
        [];
      state.calculatedResult.retirementSavingsResult.TFSASavings.annualRetirementIncome = 0;
      // reset fields
      state.retirementSavings.TFSA.TFSAcurrentTotal = "";
      state.retirementSavings.TFSA.TFSAOngoingContributionAmount = "";
      state.retirementSavings.TFSA.TFSAOngoingContributionFrequency =
        "Select One";
      state.retirementSavings.TFSA.TFSAreturnRate = "";
    },

    resetNRAWithSelectedNo: (state) => {
      state.calculatedResult.retirementSavingsResult.nonRegAccountSavings.savingsYearByYear =
        [];
      state.calculatedResult.retirementSavingsResult.nonRegAccountSavings.annualRetirementIncome = 0;
      // reset fields
      state.retirementSavings.NRA.NRAcurrentTotal = "";
      state.retirementSavings.NRA.NRAOngoingContributionAmount = "";
      state.retirementSavings.NRA.NRAOngoingContributionFrequency =
        "Select One";
      state.retirementSavings.NRA.NRAreturnRate = "";
      state.retirementSavings.NRA.NRAtaxRate = "";
    },

    //Calculate functions
    calculateOASBenefit: (state) => {
      const {
        OASPensionReceivingAge,
        numberOYearsLivedInCanada,
        willLiveInCanadaAtleast40Years,
      } = state.oldAgeSecurity;

      const { lifeExpectency, annualRetirementIncomeGoal } = state.generalInfo;
      const oas = calculateOAS(
        willLiveInCanadaAtleast40Years,
        Number(OASPensionReceivingAge),
        Number(numberOYearsLivedInCanada)
      );

      state.calculatedResult.OASResult.OASBenefitAmount = oas;

      const OASAgeByAgeAmounts = calculateOASBenefitsAgeByAge(
        oas?.oldAgeSecurityBefore75,
        oas?.oldAgeSecurityAfter75,
        Number(OASPensionReceivingAge),
        Number(lifeExpectency),
        Number(annualRetirementIncomeGoal)
      );

      state.calculatedResult.OASResult.OASAmountsAgeByAge = OASAgeByAgeAmounts;
    },

    calculatePPBenefit: (state) => {
      const { selectedPP, ppStartYear, monthlyRetirementPensionEstimate } =
        state.pensionPlan;
      const { lifeExpectency, annualRetirementIncomeGoal } = state.generalInfo;
      if (
        selectedPP &&
        ppStartYear &&
        monthlyRetirementPensionEstimate &&
        lifeExpectency
      ) {
        const cpp = calculateCPPBenefit(
          Number(monthlyRetirementPensionEstimate),
          Number(ppStartYear)
        );
        state.calculatedResult.PPResult.PPBenefitAmount = Number(cpp);
        state.calculatedResult.PPResult.PPBenefitsAgeByAge =
          calculatePensionPlanAgeByAge(
            Number(ppStartYear),
            Number(lifeExpectency),
            Number(cpp),
            Number(annualRetirementIncomeGoal)
          );
      }
    },

    calculateOtherIncome: (state) => {
      const {
        otherIncomeFrequency,
        otherIncomeAmount,
        otherIncomeStartReceivingAge,
        otherIncomeStopReceivingAge,
      } = state.otherIncome;
      const { annualRetirementIncomeGoal } = state.generalInfo;

      const yearsDifference =
        Number(otherIncomeStopReceivingAge) -
        Number(otherIncomeStartReceivingAge);

      const totalIncomeFrequencyInYear =
        Number(otherIncomeFrequency) * yearsDifference;

      const otherIncomeAmountAnnually =
        (totalIncomeFrequencyInYear * Number(otherIncomeAmount)) /
        yearsDifference;

      state.calculatedResult.otherIncomeResult.otherIncomeAmountAnnually =
        otherIncomeAmountAnnually;
      state.calculatedResult.otherIncomeResult.otherIncomesAgeByAge =
        calculateOtherIncomeAgeByAge(
          Number(otherIncomeStartReceivingAge),
          Number(otherIncomeStopReceivingAge),
          Number(otherIncomeAmountAnnually),
          Number(annualRetirementIncomeGoal)
        );
    },

    calculateEmployerPension: (state) => {
      const {
        annualPension,
        inflationRate,
        pensionReceivingAge,
        isIndexedToInflation,
      } = state.employerPension;
      const { lifeExpectency, annualRetirementIncomeGoal } = state.generalInfo;

      if (lifeExpectency) {
        state.calculatedResult.employerPensionResult.employerPensionsAgeByAge =
          calculateEmployerPensionAgeByAge(
            Number(annualPension),
            isIndexedToInflation == "No" ? Number(inflationRate) : 0,
            Number(pensionReceivingAge),
            Number(lifeExpectency),
            Number(annualRetirementIncomeGoal)
          );
      }
    },

    calculateRetirementSavings: (state) => {
      const { TFSA, NRA, TFSAorNRASavingsReceivingAge } =
        state.retirementSavings;
      const { lifeExpectency, annualRetirementIncomeGoal } = state.generalInfo;

      if (TFSA.hasTFSA == "Yes") {
        const {
          annualRetirementIncome: TFSAAnnualRetirementIncome,
          savingsYearByYear: TFSASavingsYearByYear,
        } =
          calculateTFSAorNonRegAccountSavings(
            Number(TFSA.TFSAcurrentTotal),
            Number(TFSA.TFSAOngoingContributionAmount),
            Number(TFSA.TFSAOngoingContributionFrequency),
            Number(TFSA.TFSAreturnRate),
            Number(TFSAorNRASavingsReceivingAge),
            Number(lifeExpectency),
            0
          ) || {};
        state.calculatedResult.retirementSavingsResult.TFSASavings.savingsYearByYear =
          TFSASavingsYearByYear;
        state.calculatedResult.retirementSavingsResult.TFSASavings.annualRetirementIncome =
          TFSAAnnualRetirementIncome;
      }

      if (NRA.hasNRA == "Yes") {
        const {
          annualRetirementIncome: NRAAnnualRetirementIncome,
          savingsYearByYear: NRASavingsYearByYear,
        } =
          calculateTFSAorNonRegAccountSavings(
            Number(NRA.NRAcurrentTotal),
            Number(NRA.NRAOngoingContributionAmount),
            Number(NRA.NRAOngoingContributionFrequency),
            Number(NRA.NRAreturnRate),
            Number(TFSAorNRASavingsReceivingAge),
            Number(lifeExpectency),
            Number(NRA.NRAtaxRate)
          ) || {};
        state.calculatedResult.retirementSavingsResult.nonRegAccountSavings.savingsYearByYear =
          NRASavingsYearByYear;
        state.calculatedResult.retirementSavingsResult.nonRegAccountSavings.annualRetirementIncome =
          NRAAnnualRetirementIncome;
      }

      //Calculate total annual retirement income from both TFSA + Non Reg. Account
      let annualRetirementIncomeFromBothAccount =
        state.calculatedResult.retirementSavingsResult.TFSASavings
          .annualRetirementIncome +
        state.calculatedResult.retirementSavingsResult.nonRegAccountSavings
          .annualRetirementIncome;
      annualRetirementIncomeFromBothAccount = parseInt(
        annualRetirementIncomeFromBothAccount.toString()
      );

      state.calculatedResult.retirementSavingsResult.annualRetirementIncomeFromBothAccount =
        annualRetirementIncomeFromBothAccount;

      if (annualRetirementIncomeFromBothAccount) {
        state.calculatedResult.retirementSavingsResult.retirementSavingsAgeByAge =
          calculateRetirementSavingsAgeByAge(
            Number(TFSAorNRASavingsReceivingAge),
            Number(lifeExpectency),
            annualRetirementIncomeFromBothAccount,
            Number(annualRetirementIncomeGoal)
          );
      }
    },

    calculateFinalResult: (state) => {
      const { PPBenefitsAgeByAge } = state.calculatedResult.PPResult;
      const { employerPensionsAgeByAge } =
        state.calculatedResult.employerPensionResult;
      const { otherIncomesAgeByAge } = state.calculatedResult.otherIncomeResult;
      const { OASAmountsAgeByAge } = state.calculatedResult.OASResult;
      const { retirementSavingsAgeByAge } =
        state.calculatedResult.retirementSavingsResult;
      const finalResultAgeByAge = mergeArraysByAge(
        PPBenefitsAgeByAge,
        employerPensionsAgeByAge,
        retirementSavingsAgeByAge,
        otherIncomesAgeByAge,
        OASAmountsAgeByAge
      );
      state.finalResult = finalResultAgeByAge;
    },
  },
});

// Export actions and reducer
export const {
  updateGeneralInfoField,
  updateEmployerPensionField,
  updateRetirementSavingsField,
  updateOtherIncomeField,
  updateOldAgeSecurityField,
  updatePensionPlanField,

  calculatePPBenefit,
  calculateOASBenefit,
  calculateOtherIncome,
  calculateEmployerPension,
  calculateFinalResult,
  updateAgeByAgeField,
  calculateRetirementSavings,

  resetTFSAWithSelectedNo,
  resetNRAWithSelectedNo,
} = CRICSlice.actions;

export default CRICSlice.reducer;
