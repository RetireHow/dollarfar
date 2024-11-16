// Define the state type
export interface CompoundInterestState {
    principal: number;
    rate: number;
    time: number;
    frequency: number;
    frequencyName: string; // default frequency name
    compoundInterest: number;
    interestBreakdown: Array<{ period: string; interest: number }>; 
    chartBase64:string;
  }
  
 