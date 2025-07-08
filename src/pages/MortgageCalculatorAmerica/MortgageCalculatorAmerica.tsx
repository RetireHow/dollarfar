/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { Icon } from "@iconify/react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Area,
  Line,
} from "recharts";
import { Modal } from "antd";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import { useCustomPDF } from "../../hooks/useCustomPDF";
import { ExportMortgagePDFModal } from "./ExportMortgagePDFModal";
import { FixedWidthMortgagePDFTemplate } from "./FixedWidthMortgagePDFTemplate";
import useTitle from "../../hooks/useTitle";

const data = {
  title: "U.S Mortgage Calculator",
  description:
    "Estimate payments, compare loan options, and track equity growth with this powerful tool. Works for fixed-rate and adjustable (ARM) mortgages, with extra payment analysis and interactive charts.",
  image: assets.mortgageIconSvg,
};

// Types
interface MortgageInputs {
  homePrice: number;
  downPaymentPercentage: number;
  downPaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  interestType: "fixed" | "arm";
  paymentFrequency: "monthly" | "biweekly" | "weekly";
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
  startDate: moment.Moment;
  extraPayment: number;
  extraPaymentFrequency: "monthly" | "yearly" | "one-time";
  armDetails: {
    initialPeriod: number;
    adjustmentPeriod: number;
    expectedAdjustment: number;
    rateCap: number;
  };
}

interface MortgageResults {
  loanAmount: number;
  periodicPayment: number;
  monthlyEquivalent: number;
  totalMonthlyPayment: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalInterestPaid: number;
  totalCost: number;
  payoffDate: moment.Moment;
  amortizationSchedule: AmortizationEntry[];
  equityData: EquityData[];
  interestType: "fixed" | "arm";
  armProjectedRates?: number[];
}

interface AmortizationEntry {
  month: number;
  date: moment.Moment;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  equity: number;
  interestRate?: number;
}

interface EquityData {
  year: number;
  equity: number;
  interest: number;
  principal: number;
  remainingBalance: number;
}

type HelpModalProps = {
  title: string;
  content: string;
  visible: boolean;
  onClose: () => void;
};

// Utils
const calculatePMI = (loanAmount: number, homePrice: number): number => {
  const ltv = loanAmount / homePrice;
  if (ltv > 0.95) return (loanAmount * 0.009) / 12;
  if (ltv > 0.9) return (loanAmount * 0.0078) / 12;
  if (ltv > 0.85) return (loanAmount * 0.0052) / 12;
  if (ltv > 0.8) return (loanAmount * 0.0032) / 12;
  return 0;
};

const calculateMonthlyPayment = (
  principal: number,
  annualInterestRate: number,
  years: number
): number => {
  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  const payment =
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

  return Math.round(payment * 100) / 100;
};

const calculatePayment = (
  principal: number,
  annualInterestRate: number,
  years: number,
  frequency: "monthly" | "biweekly" | "weekly"
): number => {
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    annualInterestRate,
    years
  );

  switch (frequency) {
    case "monthly":
      return monthlyPayment;
    case "biweekly":
      return monthlyPayment / 2;
    case "weekly":
      return monthlyPayment / 4;
    default:
      return monthlyPayment;
  }
};

const generateAmortizationSchedule = (
  principal: number,
  annualRate: number,
  years: number,
  startDate: moment.Moment,
  paymentFrequency: "monthly" | "biweekly" | "weekly",
  interestType: "fixed" | "arm",
  extraPayment: number = 0,
  extraPaymentFrequency: "monthly" | "yearly" | "one-time" = "monthly",
  armDetails?: {
    initialPeriod: number;
    adjustmentPeriod: number;
    expectedAdjustment: number;
    rateCap: number;
  }
): AmortizationEntry[] => {
  const schedule: AmortizationEntry[] = [];
  let remainingBalance = principal;
  let currentDate = moment(startDate);

  const totalMonths = years * 12;

  let currentRate = annualRate;
  let periodsUntilAdjustment = armDetails ? armDetails.initialPeriod : 0;

  let periodicPayment = calculatePayment(
    principal,
    annualRate,
    years,
    paymentFrequency
  );

  const paymentsPerMonth =
    paymentFrequency === "monthly"
      ? 1
      : paymentFrequency === "biweekly"
      ? 26 / 12
      : 52 / 12;

  for (let month = 1; month <= totalMonths && remainingBalance > 0; month++) {
    if (interestType === "arm" && armDetails && periodsUntilAdjustment <= 0) {
      currentRate = Math.min(
        currentRate + armDetails.expectedAdjustment,
        annualRate + armDetails.rateCap
      );

      const remainingYears = (totalMonths - month + 1) / 12;
      periodicPayment = calculatePayment(
        remainingBalance,
        currentRate,
        remainingYears,
        paymentFrequency
      );

      periodsUntilAdjustment = armDetails.adjustmentPeriod;
    }

    const monthlyRate = currentRate / 100 / 12;
    let interestPayment = remainingBalance * monthlyRate;
    let principalPayment = periodicPayment - interestPayment;
    let additionalPayment = 0;

    if (extraPayment > 0) {
      if (
        extraPaymentFrequency === "monthly" &&
        month % Math.round(1 / paymentsPerMonth) === 0
      ) {
        additionalPayment = extraPayment;
      } else if (extraPaymentFrequency === "yearly" && month % 12 === 0) {
        additionalPayment = extraPayment;
      } else if (extraPaymentFrequency === "one-time" && month === 1) {
        additionalPayment = extraPayment;
      }
    }

    principalPayment += additionalPayment;

    if (principalPayment > remainingBalance) {
      principalPayment = remainingBalance;
      interestPayment = 0;
    }

    remainingBalance -= principalPayment;

    if (paymentFrequency === "monthly") {
      currentDate = currentDate.add(1, "month");
    } else if (paymentFrequency === "biweekly") {
      currentDate = currentDate.add(2, "weeks");
    } else {
      currentDate = currentDate.add(1, "week");
    }

    schedule.push({
      month,
      date: moment(currentDate),
      payment: periodicPayment + additionalPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance,
      equity: principal - remainingBalance,
      interestRate: interestType === "arm" ? currentRate : undefined,
    });

    if (interestType === "arm") periodsUntilAdjustment--;
    if (remainingBalance <= 0) break;
  }

  return schedule;
};

const calculateEquityData = (
  schedule: AmortizationEntry[],
  initialLoanAmount: number,
  downPayment: number
): EquityData[] => {
  const monthsPerYear = 12;
  const years = Math.ceil(schedule.length / monthsPerYear);
  const equityData: EquityData[] = [];

  const homeValue = initialLoanAmount + downPayment;

  for (let year = 1; year <= years; year++) {
    const startMonth = (year - 1) * monthsPerYear;
    const endMonth = Math.min(year * monthsPerYear, schedule.length);
    const yearData = schedule.slice(startMonth, endMonth);

    const lastEntry = yearData[yearData.length - 1];

    equityData.push({
      year,
      equity: lastEntry ? homeValue - lastEntry.remainingBalance : downPayment,
      interest: yearData.reduce((sum, entry) => sum + entry.interest, 0),
      principal: yearData.reduce((sum, entry) => sum + entry.principal, 0),
      remainingBalance: lastEntry
        ? lastEntry.remainingBalance
        : initialLoanAmount,
    });
  }

  return equityData;
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const HelpModal = ({ title, content, visible, onClose }: HelpModalProps) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <button
          key="submit"
          className="px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: "#2b6777" }}
          onClick={onClose}
        >
          Got it!
        </button>,
      ]}
    >
      <div className="text-gray-700 dark:text-gray-300">{content}</div>
    </Modal>
  );
};

const COLORS = {
  primary: "#2b6777",
  secondary: "#52ab98",
  accent: "#c8d8e4",
  background: "#f2f2f2",
  textDark: "#333333",
  textLight: "#ffffff",
};

const paymentBreakdownColors = [
  COLORS.primary,
  COLORS.secondary,
  "#FF9800",
  "#F44336",
  "#9E9E9E",
];

const defaultInputs: MortgageInputs = {
  homePrice: 300000,
  downPaymentPercentage: 20,
  downPaymentAmount: 60000,
  loanTerm: 30,
  interestRate: 3.5,
  interestType: "fixed",
  paymentFrequency: "monthly",
  propertyTax: 3000,
  homeInsurance: 1200,
  hoaFees: 200,
  startDate: moment(),
  extraPayment: 0,
  extraPaymentFrequency: "monthly",
  armDetails: {
    initialPeriod: 36,
    adjustmentPeriod: 12,
    expectedAdjustment: 0.25,
    rateCap: 12,
  },
};

export const MortgageCalculatorAmerica: React.FC = () => {
  useTitle("Dollarfar | Mortgage - U.S Standard");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [inputs, setInputs] = useState<MortgageInputs>(defaultInputs);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");

  const [showAmortization, setShowAmortization] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const showHelpModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const helpContent = {
    homePrice: {
      title: "Home Price",
      content: "The total purchase price of the home you're looking to buy.",
    },
    downPayment: {
      title: "Down Payment",
      content: "The initial upfront payment for the home.",
    },
    loanTerm: {
      title: "Loan Term",
      content: "The length of time over which you'll repay your mortgage.",
    },
    interestRate: {
      title: "Interest Rate",
      content: "The annual interest rate for your mortgage loan.",
    },
    interestType: {
      title: "Interest Type",
      content: "Fixed rate or Adjustable Rate Mortgage (ARM).",
    },
    paymentFrequency: {
      title: "Payment Frequency",
      content: "How often you make mortgage payments.",
    },
    propertyTax: {
      title: "Property Tax",
      content: "Estimated yearly property tax.",
    },
    homeInsurance: {
      title: "Home Insurance",
      content: "Estimated yearly homeowner's insurance cost.",
    },
    hoaFees: {
      title: "HOA/Condo Fees",
      content: "Monthly homeowners association fees.",
    },
    startDate: {
      title: "Loan Start Date",
      content: "When your mortgage payments will begin.",
    },
    extraPayment: {
      title: "Extra Payment",
      content: "Additional payments to reduce principal.",
    },
    armInitialPeriod: {
      title: "Months Before First Adjustment",
      content: "The number of months before the first rate adjustment occurs.",
    },
    armAdjustmentPeriod: {
      title: "Months Between Adjustments",
      content: "The number of months between subsequent rate adjustments.",
    },
    armExpectedAdjustment: {
      title: "Expected Adjustment",
      content: "The expected interest rate change at each adjustment period.",
    },
    armRateCap: {
      title: "Interest Rate Cap",
      content: "The maximum interest rate increase over the initial rate.",
    },
  };

  const results = useMemo<MortgageResults>(() => {
    const downPaymentAmount =
      (inputs.downPaymentPercentage / 100) * inputs.homePrice;
    const loanAmount = inputs.homePrice - downPaymentAmount;

    const periodicPayment = calculatePayment(
      loanAmount,
      inputs.interestRate,
      inputs.loanTerm,
      inputs.paymentFrequency
    );

    let monthlyEquivalent = periodicPayment;
    if (inputs.paymentFrequency === "biweekly")
      monthlyEquivalent = (periodicPayment * 26) / 12;
    if (inputs.paymentFrequency === "weekly")
      monthlyEquivalent = (periodicPayment * 52) / 12;

    let totalMonthlyPayment = monthlyEquivalent;
    if (inputs.extraPayment > 0 && inputs.extraPaymentFrequency === "monthly") {
      totalMonthlyPayment += inputs.extraPayment;
    } else if (
      inputs.extraPayment > 0 &&
      inputs.extraPaymentFrequency === "yearly"
    ) {
      totalMonthlyPayment += inputs.extraPayment / 12;
    }

    const monthlyPMI = calculatePMI(loanAmount, inputs.homePrice);
    const monthlyTax = inputs.propertyTax / 12;
    const monthlyInsurance = inputs.homeInsurance / 12;

    const amortizationSchedule = generateAmortizationSchedule(
      loanAmount,
      inputs.interestRate,
      inputs.loanTerm,
      inputs.startDate,
      inputs.paymentFrequency,
      inputs.interestType,
      inputs.extraPayment,
      inputs.extraPaymentFrequency,
      inputs.interestType === "arm" ? inputs.armDetails : undefined
    );

    const totalInterest = amortizationSchedule.reduce(
      (sum, entry) => sum + entry.interest,
      0
    );
    const equityData = calculateEquityData(
      amortizationSchedule,
      loanAmount,
      downPaymentAmount
    );

    const armProjectedRates: number[] = [];
    if (inputs.interestType === "arm") {
      const { initialPeriod, adjustmentPeriod, expectedAdjustment, rateCap } =
        inputs.armDetails;
      let currentRate = inputs.interestRate;
      armProjectedRates.push(currentRate);

      let monthsRemaining = inputs.loanTerm * 12 - initialPeriod;
      while (monthsRemaining > 0) {
        currentRate = Math.min(
          currentRate + expectedAdjustment,
          inputs.interestRate + rateCap
        );
        armProjectedRates.push(currentRate);
        monthsRemaining -= adjustmentPeriod;
      }
    }

    return {
      loanAmount,
      periodicPayment,
      monthlyEquivalent,
      totalMonthlyPayment,
      monthlyPropertyTax: monthlyTax,
      monthlyHomeInsurance: monthlyInsurance,
      monthlyPMI,
      monthlyHOA: inputs.hoaFees,
      totalInterestPaid: totalInterest,
      totalCost: loanAmount + totalInterest + downPaymentAmount,
      payoffDate:
        amortizationSchedule.length > 0
          ? amortizationSchedule[amortizationSchedule.length - 1].date
          : inputs.startDate.clone().add(inputs.loanTerm, "years"),
      amortizationSchedule,
      equityData,
      interestType: inputs.interestType,
      armProjectedRates:
        inputs.interestType === "arm" ? armProjectedRates : undefined,
    };
  }, [inputs]);

  const handleInputChange = (field: keyof MortgageInputs, value: any) => {
    setInputs((prev) => {
      if (field === "downPaymentPercentage") {
        return {
          ...prev,
          downPaymentPercentage: value,
          downPaymentAmount: (value / 100) * prev.homePrice,
        };
      }
      if (field === "downPaymentAmount") {
        return {
          ...prev,
          downPaymentAmount: value,
          downPaymentPercentage: (value / prev.homePrice) * 100,
        };
      }
      if (field === "homePrice") {
        return {
          ...prev,
          homePrice: value,
          downPaymentAmount: (prev.downPaymentPercentage / 100) * value,
        };
      }
      if (field === "startDate" && typeof value === "string") {
        return { ...prev, [field]: moment(value) };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleArmDetailChange = (
    field: keyof MortgageInputs["armDetails"],
    value: any
  ) => {
    setInputs((prev) => ({
      ...prev,
      armDetails: {
        ...prev.armDetails,
        [field]: value,
      },
    }));
  };

  const paymentBreakdownData = [
    { name: "Principal & Interest", value: results.monthlyEquivalent },
    { name: "Property Tax", value: results.monthlyPropertyTax },
    { name: "Insurance", value: results.monthlyHomeInsurance },
    { name: "PMI", value: results.monthlyPMI },
    { name: "HOA/Condo", value: results.monthlyHOA },
  ];

  const totalMonthlyCost = paymentBreakdownData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = (data.value / totalMonthlyCost) * 100;
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-200">
          <p className="font-medium">{data.name}</p>
          <p>{formatCurrency(data.value)}</p>
          <p>{percent.toFixed(1)}% of payment</p>
        </div>
      );
    }
    return null;
  };

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-200">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const armRateProjectionData = results.armProjectedRates?.map(
    (rate, index) => {
      const initialMonths = inputs.armDetails.initialPeriod;
      const adjustmentMonths = inputs.armDetails.adjustmentPeriod;
      const year = Math.floor((initialMonths + index * adjustmentMonths) / 12);

      return {
        year,
        rate: rate,
        maxRate: inputs.interestRate + inputs.armDetails.rateCap,
      };
    }
  );

  // PDF
  const { toPDF, targetRef } = useCustomPDF({
    filename: "mortgage-calculator-report.pdf",
    page: { margin: 10, format: "a4" },
    onBeforeGetContent: () => {
      setIsGeneratingPDF(true);
      setPdfError(null);
      return Promise.resolve();
    },
    onBeforeSave: () => {
      // Optional: Perform any final checks before saving
    },
    onAfterSave: () => {
      setIsGeneratingPDF(false);
    },
    onError: (error) => {
      setIsGeneratingPDF(false);
      setPdfError("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", error);
    },
  });

  return (
    <>
      <PageHero data={data} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-8 px-4">
        <HelpModal
          title={modalContent.title}
          content={modalContent.content}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-1">
            <Icon icon="la:flag-usa" width="40" height="40" />
            <h1
              className="text-3xl font-bold bg-gradient-to-r from-[#2b6777] to-[#52ab98] bg-clip-text text-transparent"
              style={{ color: COLORS.primary }}
            >
              U.S Mortgage Calculator
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Calculate your mortgage payments with fixed or adjustable rate
            options
          </p>
          <div className="flex justify-end">
            <ExportMortgagePDFModal
              setIsGeneratingPDF={setIsGeneratingPDF}
              isGeneratingPDF={isGeneratingPDF}
              setPdfError={setPdfError}
              targetRef={targetRef}
              toPDF={toPDF}
            />
          </div>
          {pdfError && (
            <p className="text-red-500 font-semibold text-right my-2">
              Error: PDF could not be downloaded!
            </p>
          )}
        </header>

        <div className="max-w-7xl mx-auto">
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:shadow-xl">
              <div className="flex border-b dark:border-gray-700 mb-6 relative">
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#2b6777] to-[#52ab98] transition-all duration-300 ease-in-out"
                  style={{
                    width: "50%",
                    left: activeTab === "basic" ? "0" : "50%",
                  }}
                />

                <button
                  className={`flex-1 py-3 px-4 font-medium transition-all duration-300 relative ${
                    activeTab === "basic"
                      ? "text-[#2b6777] dark:text-white font-semibold"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("basic")}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Icon
                      icon="mdi:calculator"
                      className="mr-2"
                      width={18}
                      height={18}
                    />
                    Basic
                  </span>
                </button>

                <button
                  className={`flex-1 py-3 px-4 font-medium transition-all duration-300 relative ${
                    activeTab === "advanced"
                      ? "text-[#2b6777] dark:text-white font-semibold"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("advanced")}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Icon
                      icon="mdi:tune"
                      className="mr-2"
                      width={18}
                      height={18}
                    />
                    Advanced
                  </span>
                </button>
              </div>

              {activeTab === "basic" ? (
                <div className="space-y-5">
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Home Price
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.homePrice.title,
                              helpContent.homePrice.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                        {formatCurrency(inputs.homePrice)}
                      </span>
                    </div>
                    <NumericFormat
                      thousandSeparator={true}
                      prefix="$"
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 ${
                        inputs.homePrice <= 0
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      value={inputs.homePrice}
                      onValueChange={(values) =>
                        handleInputChange("homePrice", values.floatValue || 0)
                      }
                    />
                    {inputs.homePrice <= 0 && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <Icon icon="mdi:alert-circle" className="mr-1" />
                        Home price must be greater than $0
                      </p>
                    )}
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Down Payment
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.downPayment.title,
                              helpContent.downPayment.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                        {inputs.downPaymentPercentage}% •{" "}
                        {formatCurrency(inputs.downPaymentAmount)}
                      </span>
                    </div>

                    <div className="flex space-x-2 mb-3">
                      {[20, 10, 5, 3.5].map((percent) => (
                        <button
                          key={percent}
                          className={`flex-1 py-2 px-3 text-sm rounded-md transition-all duration-300 ${
                            inputs.downPaymentPercentage === percent
                              ? "bg-gradient-to-r from-[#2b6777] to-[#52ab98] text-white shadow-md"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                          onClick={() =>
                            handleInputChange("downPaymentPercentage", percent)
                          }
                        >
                          {percent}%
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <NumericFormat
                          suffix="%"
                          decimalScale={2}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                          value={inputs.downPaymentPercentage}
                          onValueChange={(values) =>
                            handleInputChange(
                              "downPaymentPercentage",
                              values.floatValue || 0
                            )
                          }
                        />
                      </div>
                      <div className="relative">
                        <NumericFormat
                          thousandSeparator={true}
                          prefix="$"
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                          value={inputs.downPaymentAmount}
                          onValueChange={(values) =>
                            handleInputChange(
                              "downPaymentAmount",
                              values.floatValue || 0
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Loan Term (years)
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.loanTerm.title,
                              helpContent.loanTerm.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                        {inputs.loanTerm} years
                      </span>
                    </div>

                    <div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={inputs.loanTerm}
                        onChange={(e) =>
                          handleInputChange(
                            "loanTerm",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                          backgroundSize: `${
                            ((inputs.loanTerm - 1) / 29) * 100
                          }% 100%`,
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>1 year</span>
                        <span>30 years</span>
                      </div>
                    </div>

                    {inputs.loanTerm <= 0 && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <Icon icon="mdi:alert-circle" className="mr-1" />
                        Loan term must be greater than 0 years
                      </p>
                    )}
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Interest Rate (%)
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.interestRate.title,
                              helpContent.interestRate.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                    </div>
                    <NumericFormat
                      suffix="%"
                      decimalScale={2}
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 ${
                        inputs.interestRate <= 0
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      value={inputs.interestRate}
                      onValueChange={(values) =>
                        handleInputChange(
                          "interestRate",
                          values.floatValue || 0
                        )
                      }
                    />
                    {inputs.interestRate <= 0 && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <Icon icon="mdi:alert-circle" className="mr-1" />
                        Interest rate must be greater than 0%
                      </p>
                    )}
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Interest Type
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.interestType.title,
                              helpContent.interestType.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                    </div>

                    <div className="relative">
                      <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 shadow-inner">
                        <button
                          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                            inputs.interestType === "fixed"
                              ? "text-white"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                          onClick={() =>
                            handleInputChange("interestType", "fixed")
                          }
                        >
                          {inputs.interestType === "fixed" && (
                            <div
                              className="absolute inset-0 z-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
                              }}
                            />
                          )}
                          <span className="relative z-10 flex items-center justify-center">
                            <Icon
                              icon="mdi:lock-outline"
                              className="mr-2"
                              width={18}
                              height={18}
                            />
                            Fixed Rate
                          </span>
                        </button>

                        <button
                          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                            inputs.interestType === "arm"
                              ? "text-white"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                          onClick={() =>
                            handleInputChange("interestType", "arm")
                          }
                        >
                          {inputs.interestType === "arm" && (
                            <div
                              className="absolute inset-0 z-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
                              }}
                            />
                          )}
                          <span className="relative z-10 flex items-center justify-center">
                            <Icon
                              icon="mdi:chart-line"
                              className="mr-2"
                              width={18}
                              height={18}
                            />
                            Adjustable Rate
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {inputs.interestType === "arm" && (
                    <div className="space-y-5 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <Icon
                          icon="mdi:adjust"
                          className="mr-2"
                          width={16}
                          height={16}
                        />
                        ARM Details
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              Months Before First Adjustment
                              <button
                                onClick={() =>
                                  showHelpModal(
                                    helpContent.armInitialPeriod.title,
                                    helpContent.armInitialPeriod.content
                                  )
                                }
                                className="ml-1 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                              >
                                <Icon
                                  icon="mdi:information-outline"
                                  width={14}
                                  height={14}
                                />
                              </button>
                            </label>
                          </div>
                          <NumericFormat
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                            value={inputs.armDetails.initialPeriod}
                            onValueChange={(values) =>
                              handleArmDetailChange(
                                "initialPeriod",
                                values.floatValue || 0
                              )
                            }
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              Months Between Adjustments
                              <button
                                onClick={() =>
                                  showHelpModal(
                                    helpContent.armAdjustmentPeriod.title,
                                    helpContent.armAdjustmentPeriod.content
                                  )
                                }
                                className="ml-1 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                              >
                                <Icon
                                  icon="mdi:information-outline"
                                  width={14}
                                  height={14}
                                />
                              </button>
                            </label>
                          </div>
                          <NumericFormat
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                            value={inputs.armDetails.adjustmentPeriod}
                            onValueChange={(values) =>
                              handleArmDetailChange(
                                "adjustmentPeriod",
                                values.floatValue || 0
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              Expected Adjustment (%)
                              <button
                                onClick={() =>
                                  showHelpModal(
                                    helpContent.armExpectedAdjustment.title,
                                    helpContent.armExpectedAdjustment.content
                                  )
                                }
                                className="ml-1 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                              >
                                <Icon
                                  icon="mdi:information-outline"
                                  width={14}
                                  height={14}
                                />
                              </button>
                            </label>
                          </div>
                          <NumericFormat
                            suffix="%"
                            decimalScale={2}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                            value={inputs.armDetails.expectedAdjustment}
                            onValueChange={(values) =>
                              handleArmDetailChange(
                                "expectedAdjustment",
                                values.floatValue || 0
                              )
                            }
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              Interest Rate Cap (%)
                              <button
                                onClick={() =>
                                  showHelpModal(
                                    helpContent.armRateCap.title,
                                    helpContent.armRateCap.content
                                  )
                                }
                                className="ml-1 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                              >
                                <Icon
                                  icon="mdi:information-outline"
                                  width={14}
                                  height={14}
                                />
                              </button>
                            </label>
                          </div>
                          <NumericFormat
                            suffix="%"
                            decimalScale={2}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                            value={inputs.armDetails.rateCap}
                            onValueChange={(values) =>
                              handleArmDetailChange(
                                "rateCap",
                                values.floatValue || 0
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Payment Frequency
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.paymentFrequency.title,
                              helpContent.paymentFrequency.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white appearance-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                        value={inputs.paymentFrequency}
                        onChange={(e) =>
                          handleInputChange(
                            "paymentFrequency",
                            e.target.value as "monthly" | "biweekly" | "weekly"
                          )
                        }
                      >
                        <option value="monthly">Monthly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="weekly">Weekly</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Icon
                          icon="mdi:chevron-down"
                          className="text-gray-400"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {(
                    [
                      {
                        key: "propertyTax",
                        label: "Annual Property Tax",
                        icon: "mdi:home-city",
                      },
                      {
                        key: "homeInsurance",
                        label: "Annual Home Insurance",
                        icon: "mdi:shield-home",
                      },
                      {
                        key: "hoaFees",
                        label: "Monthly HOA/Condo Fees",
                        icon: "mdi:account-group",
                      },
                    ] as const
                  ).map((item) => (
                    <div key={item.key} className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                          <Icon
                            icon={item.icon}
                            className="mr-2"
                            width={16}
                            height={16}
                          />
                          {item.label}
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent[item.key].title,
                                helpContent[item.key].content
                              )
                            }
                            className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                          >
                            <Icon
                              icon="mdi:information-outline"
                              width={16}
                              height={16}
                            />
                          </button>
                        </label>
                        <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                          {formatCurrency(inputs[item.key])}
                        </span>
                      </div>
                      <NumericFormat
                        thousandSeparator={true}
                        prefix="$"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                        value={inputs[item.key]}
                        onValueChange={(values) =>
                          handleInputChange(item.key, values.floatValue || 0)
                        }
                      />
                    </div>
                  ))}

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <Icon
                          icon="mdi:calendar-start"
                          className="mr-2"
                          width={16}
                          height={16}
                        />
                        Loan Start Date
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.startDate.title,
                              helpContent.startDate.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white appearance-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                        value={inputs.startDate.format("YYYY-MM-DD")}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Icon
                          icon="mdi:calendar"
                          className="text-gray-400"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <Icon
                          icon="mdi:cash-plus"
                          className="mr-2"
                          width={16}
                          height={16}
                        />
                        Extra Payment
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.extraPayment.title,
                              helpContent.extraPayment.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                        {formatCurrency(inputs.extraPayment)}
                      </span>
                    </div>

                    <NumericFormat
                      thousandSeparator={true}
                      prefix="$"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 mb-3"
                      value={inputs.extraPayment}
                      onValueChange={(values) =>
                        handleInputChange(
                          "extraPayment",
                          values.floatValue || 0
                        )
                      }
                    />

                    <div className="relative">
                      <select
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white appearance-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                        value={inputs.extraPaymentFrequency}
                        onChange={(e) =>
                          handleInputChange(
                            "extraPaymentFrequency",
                            e.target.value as "monthly" | "yearly" | "one-time"
                          )
                        }
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="one-time">One-time</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Icon
                          icon="mdi:chevron-down"
                          className="text-gray-400"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-[#2b6777] to-[#52ab98] rounded-lg shadow-md text-sm font-semibold text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                onClick={() => setInputs(defaultInputs)}
              >
                <Icon
                  icon="mdi:refresh"
                  className="mr-2"
                  width={18}
                  height={18}
                />
                Reset Calculator
              </button>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Payment Summary
                  </h2>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: COLORS.primary + "20" }}
                  >
                    <Icon
                      icon="mdi:finance"
                      className="text-xl"
                      style={{ color: COLORS.primary }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: COLORS.primary + "20" }}
                      >
                        <Icon
                          icon="mdi:cash-multiple"
                          className="text-sm"
                          style={{ color: COLORS.primary }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        {inputs.paymentFrequency === "monthly"
                          ? "Monthly"
                          : inputs.paymentFrequency === "biweekly"
                          ? "Bi-weekly"
                          : "Weekly"}{" "}
                        Payment
                      </p>
                    </div>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      {formatCurrency(results.totalMonthlyPayment)}
                    </p>
                    <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: "100%",
                          backgroundColor: COLORS.primary,
                          backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: COLORS.secondary + "20" }}
                      >
                        <Icon
                          icon="mdi:bank-outline"
                          className="text-sm"
                          style={{ color: COLORS.secondary }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Loan Amount
                      </p>
                    </div>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: COLORS.secondary }}
                    >
                      {formatCurrency(results.loanAmount)}
                    </p>
                    <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: "100%",
                          backgroundColor: COLORS.secondary,
                          backgroundImage: `linear-gradient(to right, ${COLORS.secondary}, ${COLORS.accent})`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: "#F44336" + "20" }}
                      >
                        <Icon
                          icon="mdi:percent"
                          className="text-sm"
                          style={{ color: "#F44336" }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Total Interest
                      </p>
                    </div>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: "#F44336" }}
                    >
                      {formatCurrency(results.totalInterestPaid)}
                    </p>
                    <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: "100%",
                          backgroundColor: "#F44336",
                          backgroundImage: `linear-gradient(to right, #F44336, #FF9800)`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
                          Payoff Date
                        </p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-white">
                          {results.payoffDate.format("MMMM YYYY")}
                        </p>
                      </div>
                      <Icon
                        icon="mdi:calendar-check"
                        className="text-2xl opacity-70"
                        style={{ color: COLORS.primary }}
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
                          Total Cost
                        </p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-white">
                          {formatCurrency(results.totalCost)}
                        </p>
                      </div>
                      <Icon
                        icon="mdi:finance"
                        className="text-2xl opacity-70"
                        style={{ color: COLORS.secondary }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
                        Interest Type
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                        {results.interestType === "fixed"
                          ? "Fixed Rate"
                          : "Adjustable Rate Mortgage"}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        results.interestType === "fixed"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      }`}
                    >
                      {results.interestType === "fixed" ? "Fixed" : "ARM"}
                    </div>
                  </div>
                  {results.interestType === "arm" && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Initial Rate: {inputs.interestRate}% for{" "}
                        {Math.floor(inputs.armDetails.initialPeriod / 12)} years
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Then adjusts every{" "}
                        {Math.floor(inputs.armDetails.adjustmentPeriod / 12)}{" "}
                        year(s)
                      </p>
                    </div>
                  )}
                </div>

                {results.interestType === "arm" && armRateProjectionData && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      ARM Rate Projection
                    </h3>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={armRateProjectionData}
                            margin={{
                              top: 20,
                              right: 20,
                              left: 20,
                              bottom: 20,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#eee"
                              strokeOpacity={0.2}
                            />
                            <XAxis
                              dataKey="year"
                              label={{
                                value: "Years",
                                position: "insideBottomRight",
                                offset: -5,
                              }}
                              stroke="#888"
                              tick={{ fill: "var(--text-gray-600)" }}
                            />
                            <YAxis
                              label={{
                                value: "Rate (%)",
                                angle: -90,
                                position: "insideLeft",
                              }}
                              stroke="#888"
                              tick={{ fill: "var(--text-gray-600)" }}
                            />
                            <Tooltip
                              formatter={(value, label) => {
                                return [`${value}%`, label];
                              }}
                              labelFormatter={(label) => `Year ${label}`}
                            />
                            <Area
                              type="monotone"
                              dataKey="rate"
                              name="Projected Rate"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.2}
                            />
                            <Line
                              type="monotone"
                              dataKey="maxRate"
                              name="Maximum Possible Rate"
                              stroke="#ff7300"
                              dot={false}
                              strokeDasharray="5 5"
                            />
                            <Legend />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Note: Projected rates are estimates based on expected
                        adjustments and rate cap. Actual rates may vary.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-colors duration-200">
                  <h3
                    className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
                    style={{ color: COLORS.primary }}
                  >
                    Payment Breakdown (Monthly Equivalent)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentBreakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {paymentBreakdownData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                paymentBreakdownColors[
                                  index % paymentBreakdownColors.length
                                ]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          content={<CustomPieTooltip />}
                          wrapperStyle={{
                            backgroundColor: "var(--bg-gray-100)",
                            borderColor: "var(--border-gray-200)",
                            borderRadius: "0.5rem",
                            padding: "0.5rem",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{
                            color: "var(--text-gray-800)",
                            paddingTop: "1rem",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-colors duration-200">
                  <h3
                    className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
                    style={{ color: COLORS.primary }}
                  >
                    Equity Timeline
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={results.equityData}
                        margin={{ top: 20, right: 20, left: 50, bottom: 20 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#eee"
                          strokeOpacity={0.2}
                        />
                        <XAxis
                          dataKey="year"
                          stroke="#888"
                          tick={{ fill: "var(--text-gray-600)" }}
                        />
                        <YAxis
                          tickFormatter={(value) => formatCurrency(value)}
                          stroke="#888"
                          tick={{ fill: "var(--text-gray-600)" }}
                        />
                        <Tooltip
                          content={<CustomChartTooltip />}
                          wrapperStyle={{
                            backgroundColor: "var(--bg-gray-100)",
                            borderColor: "var(--border-gray-200)",
                            borderRadius: "0.5rem",
                            padding: "0.5rem",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "var(--text-gray-800)",
                            paddingTop: "1rem",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="equity"
                          name="Equity"
                          stackId="1"
                          stroke={COLORS.secondary}
                          fill={COLORS.secondary}
                          fillOpacity={0.2}
                        />
                        <Area
                          type="monotone"
                          dataKey="remainingBalance"
                          name="Remaining Balance"
                          stackId="2"
                          stroke={COLORS.primary}
                          fill={COLORS.primary}
                          fillOpacity={0.2}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-colors duration-200">
                <h3
                  className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
                  style={{ color: COLORS.primary }}
                >
                  Interest vs Principal
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={results.equityData}
                      margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#eee"
                        strokeOpacity={0.2}
                      />
                      <XAxis
                        dataKey="year"
                        stroke="#888"
                        tick={{ fill: "var(--text-gray-600)" }}
                      />
                      <YAxis
                        tickFormatter={(value) => formatCurrency(value)}
                        stroke="#888"
                        tick={{ fill: "var(--text-gray-600)" }}
                      />
                      <Tooltip
                        content={<CustomChartTooltip />}
                        wrapperStyle={{
                          backgroundColor: "var(--bg-gray-100)",
                          borderColor: "var(--border-gray-200)",
                          borderRadius: "0.5rem",
                          padding: "0.5rem",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          color: "var(--text-gray-800)",
                          paddingTop: "1rem",
                        }}
                      />
                      <Bar
                        dataKey="principal"
                        name="Principal"
                        fill={COLORS.secondary}
                      />
                      <Bar
                        dataKey="interest"
                        name="Interest"
                        fill={COLORS.primary}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-200 border border-gray-100 dark:border-gray-700">
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5"
                      style={{ color: COLORS.primary }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Amortization Schedule
                    </h3>
                  </div>
                  <button
                    className="flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:opacity-80"
                    style={{ color: COLORS.primary }}
                    onClick={() => setShowAmortization(!showAmortization)}
                  >
                    <span>
                      {showAmortization ? "Hide Details" : "Show Details"}
                    </span>
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        showAmortization ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {showAmortization && (
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white dark:from-gray-800 to-transparent z-10"></div>
                    <div className="overflow-x-auto max-h-96 pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700 z-20">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Period
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                            {inputs.interestType === "arm" && (
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Rate
                              </th>
                            )}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Payment
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Principal
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Interest
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {results.amortizationSchedule.map((entry, index) => (
                            <tr
                              key={index}
                              className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                                index % 2 === 0
                                  ? "bg-white dark:bg-gray-800"
                                  : "bg-gray-50 dark:bg-gray-700"
                              }`}
                            >
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {entry.month}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {entry.date.format("MMM YYYY")}
                              </td>
                              {inputs.interestType === "arm" && (
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                  {entry.interestRate?.toFixed(2)}%
                                </td>
                              )}
                              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {formatCurrency(entry.payment)}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(entry.principal)}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(entry.interest)}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {formatCurrency(entry.remainingBalance)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-800 to-transparent z-10"></div>

                    <div className="px-6 py-3 border-t dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <div>
                        Showing {results.amortizationSchedule.length} periods
                      </div>
                      <div className="flex space-x-4">
                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Hidden Content  */}
      <div
        ref={targetRef}
        style={{
          display: "none",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
        }}
      >
        <FixedWidthMortgagePDFTemplate inputs={inputs} results={results} />
      </div>
    </>
  );
};
