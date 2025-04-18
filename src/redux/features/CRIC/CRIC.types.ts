export type TGeneralInfo = {
  dobMonth: string;
  dobYear: string;
  gender: string;
  currentAnnualIncome: string;
  annualRetirementIncomeGoal: string;
  lifeExpectency: string;
};

export type TPensionPlan = {
  selectedPP: string;
  ppStartYear: string;
  monthlyRetirementPensionEstimate: string;
};

export type TOldAgeSecurity = {
  willLiveInCanadaUntil65: string;
  willLiveInCanadaAtleast40Years: string;
  numberOYearsLivedInCanada: string;
  OASPensionReceivingAge: string;
};

export type TEmployerPension = {
  hasEmployerPension?: string;
  pensionPlanType: string;
  annualPension: string;
  pensionReceivingAge: string;
  isIndexedToInflation: string;
  inflationRate: string;
  pensionStopReceivingAge:string;
};

export type TTFSA = {
  hasTFSA: string;
  TFSAcurrentTotal: string;
  TFSAOngoingContributionAmount: string;
  TFSAOngoingContributionFrequency: string;
  TFSAreturnRate: string;
};

export type TNRA = {
  hasNRA: string;
  NRAcurrentTotal: string;
  NRAOngoingContributionAmount: string;
  NRAOngoingContributionFrequency: string;
  NRAreturnRate: string;
  NRAtaxRate: string;
};

export type TRetirementSavings = {
  TFSA: TTFSA;
  NRA: TNRA;
  TFSAorNRASavingsReceivingAge: string;
};

export type TOtherIncomeItem = {
  otherIncomeType: string;
  otherIncomeFrequency: string;
  otherIncomeAmount: string;
  otherIncomeStartReceivingAge: string;
  otherIncomeStopReceivingAge: string;
};

export type TOtherIncome = {
  hasOtherIncome: string;
  otherIncomeType: string;
  otherIncomeFrequency: string;
  otherIncomeAmount: string;
  otherIncomeStartReceivingAge: string;
  otherIncomeStopReceivingAge: string;
};

export type TOtherIncomeAgeByAge = {
  age: number;
  otherIncomeAmount: number;
  annualRIG: number;
};

export type TOtherIncomeResult = {
  otherIncomeAmountAnnually: number;
  otherIncomesAgeByAge: TOtherIncomeAgeByAge[];
  addedOtherIncomesList: TOtherIncomeItem[];
  summaryText:string;
};

export type TOASAmountAgeByAge = {
  age: number;
  OASAmount: number;
  annualRIG: number;
};

export type TOASResult = {
  OASBenefitAmount: {
    oldAgeSecurityBefore75: number;
    oldAgeSecurityAfter75: number;
  };
  OASAmountsAgeByAge: TOASAmountAgeByAge[];
};

export type TPPBenefitAgeByAge = {
  age: number;
  PPBenefitAmount: number;
  annualRIG: number;
};

export type TPPResult = {
  PPBenefitAmount: number;
  PPBenefitsAgeByAge: TPPBenefitAgeByAge[];
};

export type TEmployerPensionAgeByAge = {
  age: number;
  employerPensionAmount: number;
  annualRIG: number;
};

export type TEmployerPensionResult = {
  employerPensionsAgeByAge: TEmployerPensionAgeByAge[];
  addedEmployerPensionsList:TEmployerPension[];
  description:string;
};

export type TTFSASavingsYearByYear = {
  age: number;
  savingsAmount: number;
};

export type TTFSASavings = {
  annualRetirementIncome: number;
  savingsYearByYear: TTFSASavingsYearByYear[];
};

export type TNonRegAccountSavingsYearByYear = {
  age: number;
  savingsAmount: number;
};

export type TNonRegAccountSavings = {
  annualRetirementIncome: number;
  savingsYearByYear: TNonRegAccountSavingsYearByYear[];
};

export type TRetirementSavingsAgeByAge = {
  age: number;
  retirementSavingsAmount: number;
  annualRIG: number;
};

export type TRetirementSavingsResult = {
  TFSASavings: TTFSASavings;
  nonRegAccountSavings: TNonRegAccountSavings;
  annualRetirementIncomeFromBothAccount: number;
  retirementSavingsAgeByAge: TRetirementSavingsAgeByAge[];
};

export type TCalculatedResult = {
  PPResult: TPPResult;
  OASResult: TOASResult;
  employerPensionResult: TEmployerPensionResult;
  retirementSavingsResult: TRetirementSavingsResult;
  otherIncomeResult: TOtherIncomeResult;
};

export type TFinalResult = {
  age: number;
  [key: string]: number;
};

export type CRICState = {
  generalInfo: TGeneralInfo;
  pensionPlan: TPensionPlan;
  oldAgeSecurity: TOldAgeSecurity;

  employerPension: TEmployerPension;
  retirementSavings: TRetirementSavings;
  otherIncome: TOtherIncome;

  calculatedResult: TCalculatedResult;
  finalResult: TFinalResult[];
};
