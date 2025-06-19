import moment from 'moment';
import { AmortizationEntry, EquityData } from './types';

export const calculatePMI = (loanAmount: number, homePrice: number): number => {
  const ltv = loanAmount / homePrice;
  return ltv > 0.8 ? (loanAmount * 0.01) / 12 : 0;
};

export const calculatePeriodicPayment = (
  principal: number,
  annualRate: number,
  years: number,
  frequency: 'monthly' | 'biweekly' | 'weekly'
): number => {
  let periodsPerYear: number;
  let ratePerPeriod: number;

  switch (frequency) {
    case 'monthly':
      periodsPerYear = 12;
      ratePerPeriod = annualRate / 100 / 12;
      break;
    case 'biweekly':
      periodsPerYear = 26;
      ratePerPeriod = annualRate / 100 / 26;
      break;
    case 'weekly':
      periodsPerYear = 52;
      ratePerPeriod = annualRate / 100 / 52;
      break;
  }

  const totalPeriods = years * periodsPerYear;
  return (principal * ratePerPeriod * Math.pow(1 + ratePerPeriod, totalPeriods)) /
    (Math.pow(1 + ratePerPeriod, totalPeriods) - 1);
};

export const generateAmortizationSchedule = (
  principal: number,
  annualRate: number,
  years: number,
  startDate: moment.Moment,
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly',
  extraPayment: number = 0,
  extraPaymentFrequency: 'monthly' | 'yearly' | 'one-time' = 'monthly'
): AmortizationEntry[] => {
  const periodicPayment = calculatePeriodicPayment(principal, annualRate, years, paymentFrequency);
  let ratePerPeriod: number;
  let periodsPerYear: number;
  let dateIncrement: moment.unitOfTime.DurationConstructor;

  switch (paymentFrequency) {
    case 'monthly':
      ratePerPeriod = annualRate / 100 / 12;
      periodsPerYear = 12;
      dateIncrement = 'months';
      break;
    case 'biweekly':
      ratePerPeriod = annualRate / 100 / 26;
      periodsPerYear = 26;
      dateIncrement = 'weeks';
      break;
    case 'weekly':
      ratePerPeriod = annualRate / 100 / 52;
      periodsPerYear = 52;
      dateIncrement = 'weeks';
      break;
  }

  const schedule: AmortizationEntry[] = [];
  let remainingBalance = principal;
  let currentDate = moment(startDate);
  const totalPeriods = years * periodsPerYear;

  for (let period = 1; period <= totalPeriods && remainingBalance > 0; period++) {
    const interestPayment = remainingBalance * ratePerPeriod;
    let principalPayment = periodicPayment - interestPayment;
    let additionalPayment = 0;

    if (extraPayment > 0) {
      if (extraPaymentFrequency === 'monthly' && period % (periodsPerYear / 12) === 0) {
        additionalPayment = extraPayment;
      } else if (extraPaymentFrequency === 'yearly' && period % periodsPerYear === 0) {
        additionalPayment = extraPayment;
      } else if (extraPaymentFrequency === 'one-time' && period === 1) {
        additionalPayment = extraPayment;
      }
    }

    principalPayment += additionalPayment;

    if (principalPayment > remainingBalance) {
      principalPayment = remainingBalance;
    }

    remainingBalance -= principalPayment;
    currentDate = currentDate.add(paymentFrequency === 'monthly' ? 1 : 2, dateIncrement);

    schedule.push({
      month: period,
      date: moment(currentDate),
      payment: periodicPayment + additionalPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance,
      equity: principal - remainingBalance,
    });

    if (remainingBalance <= 0) break;
  }

  return schedule;
};

export const calculateEquityData = (
  schedule: AmortizationEntry[],
  initialLoanAmount: number,
  downPayment: number
): EquityData[] => {
  const monthsPerYear = 12;
  const years = Math.ceil(schedule.length / monthsPerYear);
  const equityData: EquityData[] = [];
  
  // The initial home value is loan amount + down payment
  const homeValue = initialLoanAmount + downPayment;

  for (let year = 1; year <= years; year++) {
    const startMonth = (year - 1) * monthsPerYear;
    const endMonth = Math.min(year * monthsPerYear, schedule.length);
    const yearData = schedule.slice(startMonth, endMonth);

    const lastEntry = yearData[yearData.length - 1];
    
    equityData.push({
      year,
      // Equity is home value minus remaining balance (plus the down payment is effectively included)
      equity: lastEntry ? homeValue - lastEntry.remainingBalance : downPayment,
      interest: yearData.reduce((sum, entry) => sum + entry.interest, 0),
      principal: yearData.reduce((sum, entry) => sum + entry.principal, 0),
      remainingBalance: lastEntry ? lastEntry.remainingBalance : initialLoanAmount
    });
  }

  return equityData;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};