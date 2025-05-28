export interface TAgePeriod {
  balanceAtBeginningOfTheYear: number;
  balanceAtEndOfTheYear: number;
  annualWithdrawalAmount?: number;
  age: number;
  minWithdrawalPercentage?: number;
  mannualWithdrawalPercentage?: string;
}

export interface TwithdrawalFrequency {
  label: string;
  value: string;
}

export interface TRRIFState {
  RRIFInitalBalance: string;
  currentAge: string;
  rateOfReturn: string;
  withdrawType: string | number;
  annualWithdrawalAmount: string;
  withdrawalFrequency: string | TwithdrawalFrequency;
  withdrawalStartYear: string;
  withdrawalEndYear: string;

  remainingRRRIFBalanceEndOfPeriod: number;
  totalWithdrawnOverLifeTime: number;

  ageBreakdownDataOverLifeTimeManually: TAgePeriod[];
}
