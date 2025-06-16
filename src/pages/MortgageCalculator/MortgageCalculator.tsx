import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { delay } from "../../utils/delay";

type PaymentFrequency = "monthly" | "bi-weekly" | "weekly" | "semi-monthly";
type PrepaymentFrequency = "one-time" | "each-year" | "same-as-regular";

// Used the professional teal/blue color scheme (#2b6777, #52ab98)

interface PaymentScheduleItem {
  Period: string;
  "Principal Payment": string;
  "Interest Payment": string;
  "Prepayment Amount": string;
  "Total Payment": string;
  "Ending Balance": string;
  isYearlySummary: boolean;
}

interface MortgageDetails {
  paymentFrequency: string;
  prepayment: {
    amount: number;
    frequency: string;
    startWithPayment: number;
    totalApplied: number;
    count: number;
  };
  term: number;
  amortization: number;
  numberOfPayments: {
    term: number;
    originalAmortization: number;
    actualAmortization: number;
  };
  paymentAmount: string;
  principalPayments: {
    term: string;
    amortization: string;
  };
  interestPayments: {
    term: string;
    amortization: string;
    originalTerm: string;
    originalAmortization: string;
  };
  totalCost: {
    term: string;
    amortization: string;
  };
  interestSavings: {
    term: string;
    amortization: string;
  };
  timeSaved: {
    years: string;
    payments: number;
  };
  paymentSchedule: PaymentScheduleItem[];
}

interface FormData {
  principal: number;
  annualRate: number;
  amortizationYears: number;
  termYears: number;
  paymentFrequency: PaymentFrequency;
  prepaymentAmount: number;
  prepaymentFrequency: PrepaymentFrequency;
  startWithPayment: number;
}

export function calculateMortgageDetails(
  principal: number,
  annualRate: number,
  amortizationYears: number,
  termYears: number,
  paymentFrequency: PaymentFrequency = "monthly",
  prepaymentAmount: number = 0,
  prepaymentFrequency: PrepaymentFrequency = "one-time",
  startWithPayment: number = 1
): MortgageDetails {
  // Validate inputs
  const validFrequencies: PaymentFrequency[] = [
    "monthly",
    "bi-weekly",
    "weekly",
    "semi-monthly",
  ];
  const validPrepaymentFreqs: PrepaymentFrequency[] = [
    "one-time",
    "each-year",
    "same-as-regular",
  ];

  if (!validFrequencies.includes(paymentFrequency)) {
    throw new Error(
      "Invalid payment frequency. Use: monthly, bi-weekly, weekly, or semi-monthly."
    );
  }
  if (!validPrepaymentFreqs.includes(prepaymentFrequency)) {
    throw new Error(
      "Invalid prepayment frequency. Use: one-time, each-year, or same-as-regular."
    );
  }

  // Calculate payment schedule
  let paymentsPerYear: number;
  switch (paymentFrequency) {
    case "monthly":
      paymentsPerYear = 12;
      break;
    case "bi-weekly":
      paymentsPerYear = 26;
      break;
    case "weekly":
      paymentsPerYear = 52;
      break;
    case "semi-monthly":
      paymentsPerYear = 24;
      break;
    default:
      paymentsPerYear = 12; // Default case to satisfy TypeScript
  }
  const totalPayments = amortizationYears * paymentsPerYear;
  const termPayments = termYears * paymentsPerYear;

  // Adjust interest rate per payment period
  const periodicRate = annualRate / 100 / paymentsPerYear;

  // Calculate original payment amount (without prepayment)
  const numerator = periodicRate * Math.pow(1 + periodicRate, totalPayments);
  const denominator = Math.pow(1 + periodicRate, totalPayments) - 1;
  const regularPayment = principal * (numerator / denominator);

  // Simulate amortization with prepayment and generate payment schedule
  function generatePaymentSchedule() {
    let remaining = principal;
    let interestPaid = 0;
    const paymentSchedule: PaymentScheduleItem[] = [];
    let nextPrepaymentYear = 1;
    let prepaymentCount = 0;

    // Track totals
    let yearPrincipal = 0;
    let yearInterest = 0;
    let yearPrepayment = 0;
    let yearTotal = 0;
    let currentYear = 1;
    // let paymentsInYear = 0;

    let termPrincipal = 0;
    let termInterest = 0;
    let termPrepayment = 0;
    let termTotal = 0;

    let mortgagePrincipal = 0;
    let mortgageInterest = 0;
    let mortgagePrepayment = 0;
    let mortgageTotal = 0;

    for (let i = 1; i <= totalPayments; i++) {
      const interest = remaining * periodicRate;
      let principalPaid = regularPayment - interest;
      let prepaymentThisPeriod = 0;

      // Apply prepayment logic
      if (prepaymentAmount > 0 && i >= startWithPayment) {
        const paymentYear = Math.ceil(i / paymentsPerYear);
        const isPrepaymentDue =
          (prepaymentFrequency === "one-time" && i === startWithPayment) ||
          (prepaymentFrequency === "each-year" &&
            paymentYear === nextPrepaymentYear) ||
          prepaymentFrequency === "same-as-regular";

        if (isPrepaymentDue) {
          prepaymentThisPeriod = prepaymentAmount;
          principalPaid += prepaymentThisPeriod;
          prepaymentCount++;
          if (prepaymentFrequency === "each-year") {
            nextPrepaymentYear++;
          }
        }
      }

      principalPaid = Math.min(principalPaid, remaining);
      remaining -= principalPaid;
      interestPaid += interest;

      // Update all totals
      yearPrincipal += principalPaid - (prepaymentThisPeriod || 0);
      yearInterest += interest;
      yearPrepayment += prepaymentThisPeriod;
      yearTotal += principalPaid + interest;
      // paymentsInYear++;

      if (i <= termPayments) {
        termPrincipal += principalPaid - (prepaymentThisPeriod || 0);
        termInterest += interest;
        termPrepayment += prepaymentThisPeriod;
        termTotal += principalPaid + interest;
      }

      mortgagePrincipal += principalPaid - (prepaymentThisPeriod || 0);
      mortgageInterest += interest;
      mortgagePrepayment += prepaymentThisPeriod;
      mortgageTotal += principalPaid + interest;

      // Add payment to schedule
      paymentSchedule.push({
        Period: `${paymentFrequency.replace("-", " ")} ${i}`,
        "Principal Payment": (principalPaid - prepaymentThisPeriod).toFixed(2),
        "Interest Payment": interest.toFixed(2),
        "Prepayment Amount": prepaymentThisPeriod.toFixed(2),
        "Total Payment": (principalPaid + interest).toFixed(2),
        "Ending Balance": remaining.toFixed(2),
        isYearlySummary: false,
      });

      // Check if we need to add a yearly summary
      if (i % paymentsPerYear === 0 || i === totalPayments || remaining <= 0) {
        paymentSchedule.push({
          Period: `Year ${currentYear} Totals`,
          "Principal Payment": yearPrincipal.toFixed(2),
          "Interest Payment": yearInterest.toFixed(2),
          "Prepayment Amount": yearPrepayment.toFixed(2),
          "Total Payment": yearTotal.toFixed(2),
          "Ending Balance": remaining.toFixed(2),
          isYearlySummary: true,
        });

        // Reset yearly totals
        yearPrincipal = 0;
        yearInterest = 0;
        yearPrepayment = 0;
        yearTotal = 0;
        currentYear++;
        // paymentsInYear = 0;
      }

      if (remaining <= 0) break;
    }

    // Add After Term Totals if term ended before amortization
    if (
      termPayments < paymentSchedule.filter((p) => !p.isYearlySummary).length
    ) {
      paymentSchedule.push({
        Period: "After Term Totals",
        "Principal Payment": termPrincipal.toFixed(2),
        "Interest Payment": termInterest.toFixed(2),
        "Prepayment Amount": termPrepayment.toFixed(2),
        "Total Payment": termTotal.toFixed(2),
        "Ending Balance": (principal - termPrincipal - termPrepayment).toFixed(
          2
        ),
        isYearlySummary: true,
      });
    }

    // Add Mortgage Totals
    paymentSchedule.push({
      Period: "Mortgage Totals",
      "Principal Payment": mortgagePrincipal.toFixed(2),
      "Interest Payment": mortgageInterest.toFixed(2),
      "Prepayment Amount": mortgagePrepayment.toFixed(2),
      "Total Payment": mortgageTotal.toFixed(2),
      "Ending Balance": "0.00",
      isYearlySummary: true,
    });

    return {
      paymentSchedule,
      totalInterest: interestPaid,
      prepaymentCount,
      termPrincipal,
      termInterest,
      mortgagePrincipal,
      mortgageInterest,
    };
  }

  const withPrepayment = generatePaymentSchedule();
  const prepaymentTermInterest = withPrepayment.termInterest;

  // Simulate original amortization for comparison
  function simulateOriginalAmortization() {
    let remaining = principal;
    let interestPaid = 0;

    for (let i = 1; i <= totalPayments; i++) {
      const interest = remaining * periodicRate;
      const principalPaid = regularPayment - interest;
      remaining -= principalPaid;
      interestPaid += interest;

      if (remaining <= 0) break;
    }

    return { totalInterest: interestPaid };
  }

  const original = simulateOriginalAmortization();
  const originalTermInterest = original.totalInterest;

  const termInterestSavings = originalTermInterest - prepaymentTermInterest;
  const totalInterestSavings =
    original.totalInterest - withPrepayment.totalInterest;

  const actualPayments = withPrepayment.paymentSchedule.filter(
    (p) => !p.isYearlySummary
  ).length;
  const actualAmortizationYears = actualPayments / paymentsPerYear;

  return {
    paymentFrequency,
    prepayment: {
      amount: prepaymentAmount,
      frequency: prepaymentFrequency,
      startWithPayment: startWithPayment,
      totalApplied: withPrepayment.prepaymentCount * prepaymentAmount,
      count: withPrepayment.prepaymentCount,
    },
    term: termYears,
    amortization: amortizationYears,
    numberOfPayments: {
      term: termPayments,
      originalAmortization: totalPayments,
      actualAmortization: actualPayments,
    },
    paymentAmount: regularPayment.toFixed(2),
    principalPayments: {
      term: (
        withPrepayment.termPrincipal +
        withPrepayment.prepaymentCount * prepaymentAmount
      ).toFixed(2),
      amortization: (
        withPrepayment.mortgagePrincipal +
        withPrepayment.prepaymentCount * prepaymentAmount
      ).toFixed(2),
    },
    interestPayments: {
      term: prepaymentTermInterest.toFixed(2),
      amortization: withPrepayment.totalInterest.toFixed(2),
      originalTerm: originalTermInterest.toFixed(2),
      originalAmortization: original.totalInterest.toFixed(2),
    },
    totalCost: {
      term: (
        withPrepayment.termPrincipal +
        prepaymentTermInterest +
        withPrepayment.prepaymentCount * prepaymentAmount
      ).toFixed(2),
      amortization: (
        withPrepayment.mortgagePrincipal +
        withPrepayment.totalInterest +
        withPrepayment.prepaymentCount * prepaymentAmount
      ).toFixed(2),
    },
    interestSavings: {
      term: termInterestSavings.toFixed(2),
      amortization: totalInterestSavings.toFixed(2),
    },
    timeSaved: {
      years: (amortizationYears - actualAmortizationYears).toFixed(1),
      payments: totalPayments - actualPayments,
    },
    paymentSchedule: withPrepayment.paymentSchedule,
  };
}

export function MortgageCalculator() {
  const [formData, setFormData] = useState<FormData>({
    principal: 300000,
    annualRate: 5,
    amortizationYears: 25,
    termYears: 5,
    paymentFrequency: "monthly",
    prepaymentAmount: 0,
    prepaymentFrequency: "one-time",
    startWithPayment: 1,
  });

  const [results, setResults] = useState<MortgageDetails | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "schedule">("summary");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "paymentFrequency" || name === "prepaymentFrequency"
          ? (value as PaymentFrequency | PrepaymentFrequency)
          : Number(value),
    }));
  };

  const calculateMortgage = async () => {
    setIsCalculating(true);
    await delay(1000);
    try {
      const calculated = calculateMortgageDetails(
        formData.principal,
        formData.annualRate,
        formData.amortizationYears,
        formData.termYears,
        formData.paymentFrequency,
        formData.prepaymentAmount,
        formData.prepaymentFrequency,
        formData.startWithPayment
      );
      setResults(calculated);
    } catch (error) {
      console.error(error);
      alert("Error in calculation. Please check your inputs.");
    } finally {
      setIsCalculating(false);
    }
  };

  // Format currency
  const formatCurrency = (value: string | number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(Number(value));
  };

  // Prepare data for charts
  const balanceOverTimeData =
    results?.paymentSchedule
      .filter((item) => !item.isYearlySummary)
      .map((item, index) => ({
        name: `Period ${index + 1}`,
        balance: Number(item["Ending Balance"]),
        principal: Number(item["Principal Payment"]),
        interest: Number(item["Interest Payment"]),
      })) || [];

  const yearlySummaryData =
    results?.paymentSchedule
      .filter((item) => item.Period.startsWith("Year"))
      .map((item) => ({
        year: item.Period.replace("Year ", "").replace(" Totals", ""),
        principal: Number(item["Principal Payment"]),
        interest: Number(item["Interest Payment"]),
        prepayment: Number(item["Prepayment Amount"]),
      })) || [];

  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2b6777] dark:text-[#52ab98]">
            Mortgage Calculator
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Calculate your mortgage payments, amortization schedule, and savings
            from prepayments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold mb-4 text-[#2b6777] dark:text-[#52ab98] border-b pb-2 dark:border-neutral-700">
              Mortgage Details
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="principal"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Mortgage Amount ($)
                </label>
                <input
                  type="number"
                  id="principal"
                  name="principal"
                  value={formData.principal}
                  onChange={handleChange}
                  onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                    e.currentTarget.blur()
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-600 shadow-sm focus:ring-[#52ab98] focus:border-[#52ab98] p-2 border dark:bg-neutral-700 dark:text-white"
                  min="1000"
                  step="1000"
                />
              </div>

              <div>
                <label
                  htmlFor="annualRate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  id="annualRate"
                  name="annualRate"
                  value={formData.annualRate}
                  onChange={handleChange}
                  onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                    e.currentTarget.blur()
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-600 shadow-sm focus:ring-[#52ab98] focus:border-[#52ab98] p-2 border dark:bg-neutral-700 dark:text-white"
                  min="0.1"
                  max="20"
                  step="0.01"
                />
              </div>

              <div>
                <label
                  htmlFor="amortizationYears"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Amortization Period (years)
                </label>
                <input
                  type="number"
                  id="amortizationYears"
                  name="amortizationYears"
                  value={formData.amortizationYears}
                  onChange={handleChange}
                  onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                    e.currentTarget.blur()
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-600 shadow-sm focus:ring-[#52ab98] focus:border-[#52ab98] p-2 border dark:bg-neutral-700 dark:text-white"
                  min="1"
                  max="30"
                />
              </div>

              <div>
                <label
                  htmlFor="termYears"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Term (years)
                </label>
                <input
                  type="number"
                  id="termYears"
                  name="termYears"
                  value={formData.termYears}
                  onChange={handleChange}
                  onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                    e.currentTarget.blur()
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-600 shadow-sm focus:ring-[#52ab98] focus:border-[#52ab98] p-2 border dark:bg-neutral-700 dark:text-white"
                  min="1"
                  max={formData.amortizationYears}
                />
              </div>

              <div>
                <label
                  htmlFor="paymentFrequency"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Payment Frequency
                </label>
                <select
                  id="paymentFrequency"
                  name="paymentFrequency"
                  value={formData.paymentFrequency}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-600 shadow-sm focus:ring-[#52ab98] focus:border-[#52ab98] p-2 border dark:bg-neutral-700 dark:text-white"
                >
                  <option value="monthly">Monthly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="weekly">Weekly</option>
                  <option value="semi-monthly">Semi-Monthly</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
                <h3 className="text-lg font-medium text-[#2b6777] dark:text-[#52ab98]">
                  Prepayment Options
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="prepaymentAmount"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Prepayment Amount ($)
                    </label>
                    <input
                      type="number"
                      id="prepaymentAmount"
                      name="prepaymentAmount"
                      value={formData.prepaymentAmount}
                      onChange={handleChange}
                      onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                        e.currentTarget.blur()
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-600 shadow-sm focus:ring-[#52ab98] focus:border-[#52ab98] p-2 border dark:bg-neutral-700 dark:text-white"
                      min="0"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="prepaymentFrequency"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Prepayment Frequency
                    </label>
                    <select
                      id="prepaymentFrequency"
                      name="prepaymentFrequency"
                      value={formData.prepaymentFrequency}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-600 shadow-sm focus:ring-[#52ab98] focus:border-[#52ab98] p-2 border dark:bg-neutral-700 dark:text-white"
                      disabled={formData.prepaymentAmount <= 0}
                    >
                      <option value="one-time">One-Time</option>
                      <option value="each-year">Each Year</option>
                      <option value="same-as-regular">
                        Same as Regular Payment
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="startWithPayment"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Start With Payment #
                    </label>
                    <input
                      type="number"
                      id="startWithPayment"
                      name="startWithPayment"
                      value={formData.startWithPayment}
                      onChange={handleChange}
                      onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                        e.currentTarget.blur()
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-600 shadow-sm focus:ring-[#52ab98] focus:border-[#52ab98] p-2 border dark:bg-neutral-700 dark:text-white"
                      min="1"
                      disabled={formData.prepaymentAmount <= 0}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={calculateMortgage}
                disabled={isCalculating}
                className={`w-full bg-[#2b6777] hover:bg-[#1e4e5d] dark:bg-[#52ab98] dark:hover:bg-[#3d8a7a] text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out ${
                  isCalculating ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  "Calculate Mortgage"
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {results && (
              <>
                {/* Summary Card */}
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[#2b6777] dark:text-[#52ab98]">
                      Mortgage Summary
                    </h2>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Payment Frequency:{" "}
                        <span className="font-medium dark:text-white">
                          {results.paymentFrequency}
                        </span>
                      </p>
                      <p className="text-lg font-bold text-[#2b6777] dark:text-[#52ab98]">
                        Payment Amount: {formatCurrency(results.paymentAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex border-b border-gray-200 dark:border-neutral-700">
                      <button
                        className={`py-2 px-4 font-medium ${
                          activeTab === "summary"
                            ? "text-[#2b6777] dark:text-[#52ab98] border-b-2 border-[#2b6777] dark:border-[#52ab98]"
                            : "text-gray-500 dark:text-gray-400 hover:text-[#52ab98]"
                        }`}
                        onClick={() => setActiveTab("summary")}
                      >
                        Summary
                      </button>
                      <button
                        className={`py-2 px-4 font-medium ${
                          activeTab === "schedule"
                            ? "text-[#2b6777] dark:text-[#52ab98] border-b-2 border-[#2b6777] dark:border-[#52ab98]"
                            : "text-gray-500 dark:text-gray-400 hover:text-[#52ab98]"
                        }`}
                        onClick={() => setActiveTab("schedule")}
                      >
                        Payment Schedule
                      </button>
                    </div>
                  </div>

                  {activeTab === "summary" ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead className="bg-gray-50 dark:bg-neutral-700">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Term ({results.term} years)
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Amortization Period ({results.amortization} years)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Number of Payments
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {results.numberOfPayments.term}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {results.numberOfPayments.actualAmortization}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Mortgage Payment
                            </td>
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                              colSpan={2}
                            >
                              {formatCurrency(results.paymentAmount)} per{" "}
                              {results.paymentFrequency}
                            </td>
                          </tr>
                          {results.prepayment.amount > 0 && (
                            <>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  Prepayment
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                                  colSpan={2}
                                >
                                  {formatCurrency(results.prepayment.amount)}{" "}
                                  {results.prepayment.frequency.replace(
                                    "-",
                                    " "
                                  )}{" "}
                                  ({results.prepayment.count}x)
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  Total Prepayments
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                                  colSpan={2}
                                >
                                  {formatCurrency(
                                    results.prepayment.totalApplied
                                  )}
                                </td>
                              </tr>
                            </>
                          )}
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Principal Payments
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {formatCurrency(results.principalPayments.term)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {formatCurrency(
                                results.principalPayments.amortization
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Interest Payments
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {formatCurrency(results.interestPayments.term)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {formatCurrency(
                                results.interestPayments.amortization
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Total Cost
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {formatCurrency(results.totalCost.term)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {formatCurrency(results.totalCost.amortization)}
                            </td>
                          </tr>
                          {results.prepayment.amount > 0 && (
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                Interest Savings
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#28a745]">
                                {formatCurrency(results.interestSavings.term)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#28a745]">
                                {formatCurrency(
                                  results.interestSavings.amortization
                                )}
                              </td>
                            </tr>
                          )}
                          {results.prepayment.amount > 0 && (
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                Time Saved
                              </td>
                              <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                                colSpan={2}
                              >
                                {results.timeSaved.years} years (
                                {results.timeSaved.payments} payments)
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead className="bg-gray-50 dark:bg-neutral-700 sticky top-0">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Period
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Principal
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Interest
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Prepayment
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Total Payment
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700">
                          {results.paymentSchedule.map((payment, index) => (
                            <tr
                              key={index}
                              className={
                                payment.isYearlySummary
                                  ? "bg-gray-50 dark:bg-neutral-700 font-semibold"
                                  : "hover:bg-gray-50 dark:hover:bg-neutral-700"
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {payment.Period}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(payment["Principal Payment"])}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(payment["Interest Payment"])}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(payment["Prepayment Amount"])}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(payment["Total Payment"])}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(payment["Ending Balance"])}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
                    <h3 className="text-lg font-medium text-[#2b6777] dark:text-[#52ab98] mb-4">
                      Mortgage Balance Over Time
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={balanceOverTimeData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#eee"
                            strokeOpacity={0.5}
                          />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            stroke="#888"
                          />
                          <YAxis
                            tickFormatter={(value) =>
                              `$${(value / 1000).toFixed(0)}k`
                            }
                            stroke="#888"
                          />
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{
                              backgroundColor: isDarkMode ? "#1e293b" : "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              color: isDarkMode ? "#fff" : "#333",
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="#2b6777"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                              r: 6,
                              stroke: "#52ab98",
                              strokeWidth: 2,
                            }}
                            name="Balance"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
                    <h3 className="text-lg font-medium text-[#2b6777] dark:text-[#52ab98] mb-4">
                      Yearly Payment Breakdown
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yearlySummaryData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#eee"
                            strokeOpacity={0.5}
                          />
                          <XAxis dataKey="year" stroke="#888" />
                          <YAxis
                            tickFormatter={(value) =>
                              `$${(value / 1000).toFixed(0)}k`
                            }
                            stroke="#888"
                          />
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{
                              backgroundColor: isDarkMode ? "#1e293b" : "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              color: isDarkMode ? "#fff" : "#333",
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="principal"
                            stackId="a"
                            fill="#2b6777"
                            name="Principal"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="interest"
                            stackId="a"
                            fill="#52ab98"
                            name="Interest"
                            radius={[4, 4, 0, 0]}
                          />
                          {results.prepayment.amount > 0 && (
                            <Bar
                              dataKey="prepayment"
                              stackId="a"
                              fill="#f3c623"
                              name="Prepayment"
                              radius={[4, 4, 0, 0]}
                            />
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!results && (
              <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700 text-center">
                <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-[#2b6777] dark:text-[#52ab98]">
                  No calculation yet
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Enter your mortgage details and click "Calculate Mortgage" to
                  see your amortization schedule.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
