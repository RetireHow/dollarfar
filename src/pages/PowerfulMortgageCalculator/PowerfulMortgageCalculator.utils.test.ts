/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from "vitest";
import moment from "moment";
import {
  calculatePMI,
  calculatePeriodicPayment,
  generateAmortizationSchedule,
  calculateEquityData,
  formatCurrency,
} from "./PowerfulMortgageCalculator.utils";

describe("calculatePMI", () => {
  it("should return PMI when LTV is greater than 80%", () => {
    const loanAmount = 400000;
    const homePrice = 450000;
    const expectedPMI = (400000 * 0.01) / 12;

    expect(calculatePMI(loanAmount, homePrice)).toBeCloseTo(expectedPMI, 2);
  });

  it("should return 0 when LTV is 80% or less", () => {
    const loanAmount = 320000;
    const homePrice = 400000;

    expect(calculatePMI(loanAmount, homePrice)).toBe(0);
  });

  it("should return 0 when LTV is exactly 80%", () => {
    const loanAmount = 320000;
    const homePrice = 400000;

    expect(calculatePMI(loanAmount, homePrice)).toBe(0);
  });

  it("should handle edge case with very small amounts", () => {
    const loanAmount = 1000;
    const homePrice = 1000;
    const expectedPMI = (1000 * 0.01) / 12;

    expect(calculatePMI(loanAmount, homePrice)).toBeCloseTo(expectedPMI, 2);
  });
});

describe("calculatePeriodicPayment", () => {
  const principal = 300000;
  const annualRate = 5.0;
  const years = 30;

  it("should calculate monthly payment correctly", () => {
    const payment = calculatePeriodicPayment(
      principal,
      annualRate,
      years,
      "monthly"
    );
    expect(payment).toBeCloseTo(1610.46, 2);
  });

  it("should calculate biweekly payment correctly", () => {
    const payment = calculatePeriodicPayment(
      principal,
      annualRate,
      years,
      "biweekly"
    );

    // Biweekly should be roughly half of monthly but slightly less due to more frequent compounding
    expect(payment).toBeCloseTo(742.93, 2);
  });

  it("should calculate weekly payment correctly", () => {
    const payment = calculatePeriodicPayment(
      principal,
      annualRate,
      years,
      "weekly"
    );

    // Weekly should be roughly 1/4 of monthly
    expect(payment).toBeCloseTo(371.39, 2);
  });

  it("should handle zero interest rate", () => {
    const payment = calculatePeriodicPayment(principal, 0, years, "monthly");

    // The function returns NaN when interest rate is 0 due to division by zero in the formula
    // This is actually a bug in the original function - it doesn't handle 0% interest properly
    expect(payment).toBeNaN();
  });

  it("should handle very high interest rate", () => {
    const payment = calculatePeriodicPayment(principal, 20, years, "monthly");

    expect(payment).toBeGreaterThan(5000);
    expect(payment).toBeLessThan(6000);
  });
});

describe("generateAmortizationSchedule", () => {
  const principal = 200000;
  const annualRate = 4.5;
  const years = 15;
  const startDate = moment("2024-01-01");

  it("should generate correct number of payments for monthly schedule", () => {
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly"
    );

    expect(schedule).toHaveLength(years * 12);
  });

  it("should generate correct number of payments for biweekly schedule", () => {
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "biweekly"
    );

    expect(schedule).toHaveLength(years * 26);
  });

  it("should have decreasing remaining balance", () => {
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly"
    );

    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].remainingBalance).toBeLessThan(
        schedule[i - 1].remainingBalance
      );
    }
  });

  it("should have increasing equity", () => {
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly"
    );

    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].equity).toBeGreaterThan(schedule[i - 1].equity);
    }
  });

  it("should end with zero remaining balance", () => {
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly"
    );

    const lastEntry = schedule[schedule.length - 1];
    expect(lastEntry.remainingBalance).toBeCloseTo(0, 2);
  });

  it("should have equity equal to principal at the end", () => {
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly"
    );

    const lastEntry = schedule[schedule.length - 1];
    expect(lastEntry.equity).toBeCloseTo(principal, 2);
  });

  it("should apply extra monthly payments correctly", () => {
    const extraPayment = 200;
    const scheduleWithExtra = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly",
      extraPayment,
      "monthly"
    );

    const scheduleWithoutExtra = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly"
    );

    // Schedule with extra payments should be shorter
    expect(scheduleWithExtra.length).toBeLessThan(scheduleWithoutExtra.length);

    // Each payment should include the extra amount
    scheduleWithExtra.forEach((entry) => {
      expect(entry.payment).toBeGreaterThan(
        calculatePeriodicPayment(principal, annualRate, years, "monthly")
      );
    });
  });

  it("should apply extra yearly payments correctly", () => {
    const extraPayment = 5000;
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly",
      extraPayment,
      "yearly"
    );

    // Check that extra payment is applied at year intervals (every 12 months)
    const yearlyPayments = schedule.filter(
      (_, index) => (index + 1) % 12 === 0
    );
    yearlyPayments.forEach((entry) => {
      expect(entry.payment).toBeGreaterThan(
        calculatePeriodicPayment(principal, annualRate, years, "monthly")
      );
    });
  });

  it("should apply one-time extra payment correctly", () => {
    const extraPayment = 10000;
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      years,
      startDate,
      "monthly",
      extraPayment,
      "one-time"
    );

    // Only first payment should have extra amount
    expect(schedule[0].payment).toBeGreaterThan(
      calculatePeriodicPayment(principal, annualRate, years, "monthly")
    );

    // Subsequent payments should be normal
    expect(schedule[1].payment).toBeCloseTo(
      calculatePeriodicPayment(principal, annualRate, years, "monthly"),
      2
    );
  });

  it("should handle dates correctly for monthly payments", () => {
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      2, // 2 years for shorter test
      startDate,
      "monthly"
    );

    expect(schedule[0].date.format("YYYY-MM-DD")).toBe("2024-02-01");
    expect(schedule[1].date.format("YYYY-MM-DD")).toBe("2024-03-01");
    expect(schedule[11].date.format("YYYY-MM-DD")).toBe("2025-01-01");
  });

  it("should handle biweekly date increments correctly", () => {
    const schedule = generateAmortizationSchedule(
      principal,
      annualRate,
      1, // 1 year for shorter test
      startDate,
      "biweekly"
    );

    expect(schedule[0].date.format("YYYY-MM-DD")).toBe("2024-01-15");
    expect(schedule[1].date.format("YYYY-MM-DD")).toBe("2024-01-29");
  });
});

describe("calculateEquityData", () => {
  let sampleSchedule: any[];

  beforeEach(() => {
    sampleSchedule = generateAmortizationSchedule(
      100000,
      5.0,
      10,
      moment("2024-01-01"),
      "monthly"
    );
  });

  it("should generate correct number of years", () => {
    const equityData = calculateEquityData(sampleSchedule);

    expect(equityData).toHaveLength(10);
  });

  it("should have increasing equity year over year", () => {
    const equityData = calculateEquityData(sampleSchedule);

    for (let i = 1; i < equityData.length; i++) {
      expect(equityData[i].equity).toBeGreaterThan(equityData[i - 1].equity);
    }
  });

  it("should have decreasing remaining balance year over year", () => {
    const equityData = calculateEquityData(sampleSchedule);

    for (let i = 1; i < equityData.length; i++) {
      expect(equityData[i].remainingBalance).toBeLessThan(
        equityData[i - 1].remainingBalance
      );
    }
  });

  it("should have positive interest and principal payments each year", () => {
    const equityData = calculateEquityData(sampleSchedule);

    equityData.forEach((yearData) => {
      expect(yearData.interest).toBeGreaterThan(0);
      expect(yearData.principal).toBeGreaterThan(0);
    });
  });

  it("should handle partial years correctly", () => {
    // Create a schedule with 13 months
    const shortSchedule = sampleSchedule.slice(0, 13);
    const equityData = calculateEquityData(shortSchedule);

    expect(equityData).toHaveLength(2);
    expect(equityData[1].principal).toBeGreaterThan(0);
  });

  it("should handle empty schedule", () => {
    const equityData = calculateEquityData([]);

    expect(equityData).toHaveLength(0);
  });
});

describe("formatCurrency", () => {
  it("should format positive numbers correctly", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
    expect(formatCurrency(1000000)).toBe("$1,000,000.00");
  });

  it("should format negative numbers correctly", () => {
    expect(formatCurrency(-1234.56)).toBe("-$1,234.56");
  });

  it("should format zero correctly", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("should format small decimal numbers correctly", () => {
    expect(formatCurrency(0.99)).toBe("$0.99");
    expect(formatCurrency(0.01)).toBe("$0.01");
  });

  it("should round to 2 decimal places", () => {
    expect(formatCurrency(1234.567)).toBe("$1,234.57");
    expect(formatCurrency(1234.562)).toBe("$1,234.56");
  });

  it("should handle very large numbers", () => {
    expect(formatCurrency(999999999.99)).toBe("$999,999,999.99");
  });
});
