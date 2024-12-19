/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the state type
export interface CompoundInterestState {
  principal: any;
  rate: any;
  time: any;
  frequency: any;
  frequencyName: any; // default frequency name
  compoundInterest: any;
  totalAmount: any;
  interestBreakdown: Array<{ period: string; interest: number }>;
}
