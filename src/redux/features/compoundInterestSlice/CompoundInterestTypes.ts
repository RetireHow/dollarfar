/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the state type
export interface CompoundInterestState {
  principal: string;
  rate: string;
  time: string;
  contributionAmount: string;
  contributionFrequency: string;
  frequency: number;
  frequencyName: string; // default frequency name
  compoundInterest: number;
  totalAmount: number;
  interestBreakdown: Array<{ period: string; interest: number }>;
}
