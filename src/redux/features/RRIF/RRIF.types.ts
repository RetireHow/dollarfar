export interface TAgePeriod {
    balanceAtBeginningOfTheYear: number;
    balanceAtEndOfTheYear: number;
    annualWithdrawalAmount?:number;
    age: number;
    minWithdrawalPercentage?:number;
  }
  
  export interface TwithdrawalFrequency {
    label: string;
    value: string;
  }
  
  export interface TRRIFState {
    RRIFInitalBalance: number;
    currentAge: number;
    rateOfReturn: number;
    withdrawType: string | number;
    annualWithdrawalAmount: number;
    withdrawalFrequency: number | TwithdrawalFrequency;
    withdrawalStartYear: number;
    withdrawalEndYear: number;
  
    remainingRRRIFBalanceEndOfPeriod: number;
    totalWithdrawnOverLifeTime: number;
  
    ageBreakdownDataOverLifeTimeManually: TAgePeriod[];
  }