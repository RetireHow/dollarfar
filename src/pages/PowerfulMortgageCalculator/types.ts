import moment from 'moment';

export interface MortgageInputs {
  homePrice: number;
  downPaymentPercentage: number;
  downPaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
  startDate: moment.Moment;
  extraPayment: number;
  extraPaymentFrequency: 'monthly' | 'yearly' | 'one-time';
}

export interface MortgageResults {
  loanAmount: number;
  periodicPayment: number;
  monthlyEquivalent: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalInterestPaid: number;
  totalCost: number;
  payoffDate: moment.Moment;
  amortizationSchedule: AmortizationEntry[];
  equityData: EquityData[];
}

export interface AmortizationEntry {
  month: number;
  date: moment.Moment;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  equity: number;
}

export interface EquityData {
  year: number;
  equity: number;
  interest: number;
  principal: number;
  remainingBalance: number;
}