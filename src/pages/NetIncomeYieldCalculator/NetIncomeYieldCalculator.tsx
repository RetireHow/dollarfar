/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, ReactNode } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Icon } from "@iconify/react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import { NetIncomeYieldCalculatorPDFModal } from "./NetIncomeYieldCalculatorPDFModal";
import { useCustomPDF } from "../../hooks/useCustomPDF";
import { FixedWidthNetIncomeYieldCalculatorPDFTemplate } from "./FixedWidthNetIncomeYieldCalculatorPDFTemplate";
import useTitle from "../../hooks/useTitle";

const data = {
  title: "Net Income Yield Calculator",
  description:
    "This yield calculator determines your true net returns by accounting for advisor fees, taxes, and inflation. It provides clear visualizations of how these costs impact both nominal and real yields, helping investors understand their actual earnings after all expenses and economic factors.",
  image: assets.compoundInterestCalcIcon,
};

// Define TypeScript interfaces
interface CalculatorInputs {
  startingAmount: number | "";
  grossReturn: number | "";
  advisorFee: number | "";
  diyCost: number | "";
  taxRate: number | "";
  inflation: number | "";
  useAdvisor: boolean;
}

interface CalculatorResults {
  grossIncome: string;
  feeCost: string;
  feeType: string;
  taxableIncome: string;
  taxes: string;
  netIncome: string;
  nominalNetYield: string;
  realNetYield: string;
}

interface InputConfig {
  label: string;
  name: keyof CalculatorInputs;
  value: number | "";
  icon: string;
  min: number;
  step: number;
  prefix?: string;
  suffix?: string;
  placeholder: string;
  disabled?: boolean;
}

interface InputError {
  field: keyof CalculatorInputs;
  message: string;
}

interface HelpContentItem {
  title: string;
  content: ReactNode;
}

interface HelpContent {
  [key: string]: HelpContentItem;
}

const handleWheel = (e: React.WheelEvent<HTMLInputElement>): void => {
  e.currentTarget.blur();
};

// Format number with commas
const formatNumberWithCommas = (value: string): string => {
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

// Remove commas from number
const removeCommasFromNumber = (value: string): string => {
  return value.replace(/,/g, "");
};

// Format currency with commas
const formatCurrency = (value: number | string): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue);
};

// Format percentage with commas for large numbers
const formatPercentage = (value: number | string): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return "0%";

  const parts = numValue.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${parts.join(".")}%`;
};

// Custom tooltip formatter for charts
const chartTooltipFormatter = (value: number, name: string) => {
  return [formatCurrency(value), name];
};

// Main component
const NetIncomeYieldCalculator: React.FC = () => {
  useTitle("Dollarfar | Net Income Yield Calculator");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Default values as empty strings
  const [inputs, setInputs] = useState<CalculatorInputs>({
    startingAmount: "",
    grossReturn: "",
    advisorFee: "",
    diyCost: "",
    taxRate: "",
    inflation: "",
    useAdvisor: true,
  });

  const [inputDisplayValues, setInputDisplayValues] = useState<
    Record<keyof CalculatorInputs, string>
  >({
    startingAmount: "",
    grossReturn: "",
    advisorFee: "",
    diyCost: "",
    taxRate: "",
    inflation: "",
    useAdvisor: "true",
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<InputError[]>([]);
  const [showCalculationSteps, setShowCalculationSteps] =
    useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const showHelpModal = (title: string, content: any) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const helpContent: HelpContent = {
    startingAmount: {
      title: "Starting Amount",
      content:
        "The initial amount of money you're investing. This is the principal amount that will generate returns.",
    },
    grossReturn: {
      title: "Gross Return",
      content:
        "The annual return percentage on your investment before any fees, taxes, or inflation adjustments.",
    },
    advisorFee: {
      title: "Advisor Fee",
      content:
        "The percentage fee charged by your financial advisor. This is typically calculated as a percentage of assets under management.",
    },
    diyCost: {
      title: "DIY Cost",
      content:
        "DIY Cost is indirect. DIY investing can quietly cost 2–3% in lost returns from taxes and poor rebalancing. The estimated cost of managing investments yourself, including trading fees, research subscriptions, and the value of your time.",
    },
    taxRate: {
      title: "Tax Rate",
      content: (
        <div>
          Not all income is taxed the same—wages and interest are hit hardest,
          dividends and capital gains much lighter. Check your rate with the
          external calculator or assume your rate.{" "}
          <a
            rel="noopener noreferrer"
            className="text-[#1e40af] hover:text-[#1d4ed8] dark:text-[#93c5fd] dark:hover:text-[#bfdbfe] underline"
            href="https://www.eytaxcalculators.com/en/2025-personal-tax-calculator.html"
            target="_blank"
          >
            Click to open the external calculator
          </a>
        </div>
      ),
    },
    inflation: {
      title: "Inflation",
      content:
        "The expected annual inflation rate. This helps calculate your real (inflation-adjusted) return, which shows your actual purchasing power growth.",
    },
    feeType: {
      title: "Fee Type",
      content:
        "Choose between using a financial advisor (who charges a percentage fee) or managing investments yourself (which has its own costs including time, trading fees, and research expenses).",
    },
  };

  // Validate inputs
  const validateInputs = (): InputError[] => {
    const newErrors: InputError[] = [];

    if (inputs.startingAmount === "" || inputs.startingAmount <= 0) {
      newErrors.push({
        field: "startingAmount",
        message: "Starting amount must be greater than zero",
      });
    }

    if (inputs.grossReturn === "") {
      newErrors.push({
        field: "grossReturn",
        message: "Gross return is required",
      });
    }

    if (inputs.useAdvisor) {
      if (inputs.advisorFee === "") {
        newErrors.push({
          field: "advisorFee",
          message: "Advisor fee is required when using an advisor",
        });
      }
    } else {
      if (inputs.diyCost === "") {
        newErrors.push({
          field: "diyCost",
          message: "DIY cost is required when managing investments yourself",
        });
      }
    }

    if (inputs.taxRate === "") {
      newErrors.push({ field: "taxRate", message: "Tax rate is required" });
    }

    if (inputs.inflation === "") {
      newErrors.push({
        field: "inflation",
        message: "Inflation rate is required",
      });
    }

    return newErrors;
  };

  // Calculate results manually
  const calculateResults = () => {
    const validationErrors = validateInputs();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsLoading(true);

    // Simulate loading for better UX
    setTimeout(() => {
      try {
        const result = calculateNetIncomeYield(
          Number(inputs.startingAmount),
          Number(inputs.grossReturn),
          inputs.useAdvisor ? Number(inputs.advisorFee) : 0,
          inputs.useAdvisor ? 0 : Number(inputs.diyCost),
          Number(inputs.taxRate),
          Number(inputs.inflation),
          inputs.useAdvisor
        );
        setResults(result);
        setIsCalculated(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Calculation error:", error);
        setResults(null);
        setIsCalculated(false);
        setIsLoading(false);
      }
    }, 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldName = name as keyof CalculatorInputs;

    if (type === "checkbox") {
      setInputs((prev) => ({
        ...prev,
        [fieldName]: checked,
      }));
      return;
    }

    // For starting amount, handle comma formatting
    if (fieldName === "startingAmount") {
      // Remove non-numeric characters except decimal point
      const numericValue = value.replace(/[^0-9.]/g, "");

      // Format with commas for display
      const parts = numericValue.split(".");
      const integerPart = parts[0] ? formatNumberWithCommas(parts[0]) : "";
      const decimalPart = parts[1] ? `.${parts[1]}` : "";

      setInputDisplayValues((prev) => ({
        ...prev,
        [fieldName]: `${integerPart}${decimalPart}`,
      }));

      // Store the raw numeric value without commas for calculations
      const rawValue = numericValue
        ? parseFloat(removeCommasFromNumber(numericValue))
        : "";
      setInputs((prev) => ({
        ...prev,
        [fieldName]: rawValue,
      }));
    } else {
      // For other fields, just handle numeric values
      const numericValue = value === "" ? "" : parseFloat(value);

      setInputDisplayValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      setInputs((prev) => ({
        ...prev,
        [fieldName]: numericValue,
      }));
    }

    // Clear error for this field when user starts typing
    if (errors.length > 0) {
      setErrors(errors.filter((error) => error.field !== fieldName));
    }
  };

  // Data for visualization
  const incomeDistributionData = results
    ? [
        { name: "Net Income", value: parseFloat(results.netIncome) },
        { name: "Taxes", value: parseFloat(results.taxes) },
        { name: results.feeType, value: parseFloat(results.feeCost) },
      ]
    : [];

  const comparisonData = results
    ? [
        { name: "Gross Return", value: parseFloat(results.grossIncome) },
        { name: "Net Return", value: parseFloat(results.netIncome) },
      ]
    : [];

  // Soothing color palette
  const COLORS = ["#4FD1C5", "#FC8181", "#F6AD55"]; // Teal, Coral, Peach

  const CHART_COLORS = {
    primary: "#4C51BF", // Indigo
    secondary: "#38B2AC", // Teal
    accent: "#F6AD55", // Peach
    success: "#48BB78", // Green
    warning: "#ECC94B", // Yellow
    danger: "#F56565", // Red
    dark: "#2D3748", // Gray-800
    light: "#F7FAFC", // Gray-50
  };

  // Input configuration
  const inputConfigs: InputConfig[] = [
    {
      label: "Starting Amount",
      name: "startingAmount",
      value: inputs.startingAmount,
      icon: "mdi:cash",
      min: 1,
      step: 100,
      prefix: "$",
      placeholder: "Enter starting amount (e.g., 10,000)",
    },
    {
      label: "Gross Return (%)",
      name: "grossReturn",
      value: inputs.grossReturn,
      icon: "mdi:trending-up",
      min: 0,
      step: 0.1,
      suffix: "%",
      placeholder: "Enter gross return % (e.g., 10)",
    },
    {
      label: "Advisor Fee (%)",
      name: "advisorFee",
      value: inputs.advisorFee,
      icon: "mdi:account-cash",
      min: 0,
      step: 0.1,
      suffix: "%",
      placeholder: "Enter advisor fee % (e.g., 1)",
      disabled: !inputs.useAdvisor,
    },
    {
      label: "DIY Cost (%)",
      name: "diyCost",
      value: inputs.diyCost,
      icon: "mdi:home-analytics",
      min: 0,
      step: 0.1,
      suffix: "%",
      placeholder: "Enter DIY(Do it yourself) cost % (e.g., 2)",
      disabled: inputs.useAdvisor,
    },
    {
      label: "Tax Rate (%)",
      name: "taxRate",
      value: inputs.taxRate,
      icon: "mdi:bank",
      min: 0,
      step: 0.1,
      suffix: "%",
      placeholder: "Enter tax rate % (e.g., 25)",
    },
    {
      label: "Inflation (%)",
      name: "inflation",
      value: inputs.inflation,
      icon: "mdi:chart-line",
      min: 0,
      step: 0.1,
      suffix: "%",
      placeholder: "Enter inflation % (e.g., 3)",
    },
  ];

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // PDF
  const { toPDF, targetRef } = useCustomPDF({
    filename: "investment-comparison-calculator-report.pdf",
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
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {modalContent.title}
              </h3>
              <button
                onClick={() => setModalVisible(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Icon icon="mdi:close" width={24} height={24} />
              </button>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {modalContent.content}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 flex md:flex-row flex-col items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
              Net Income Yield Calculator
            </h1>
            <div>
              <NetIncomeYieldCalculatorPDFModal
                setIsGeneratingPDF={setIsGeneratingPDF}
                isGeneratingPDF={isGeneratingPDF}
                setPdfError={setPdfError}
                targetRef={targetRef}
                toPDF={toPDF}
              />
              {pdfError && (
                <p className="text-red-500 font-semibold text-right my-2">
                  Error: PDF could not be downloaded!
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                <Icon
                  icon="mdi:calculator"
                  className="mr-2 text-teal-600 dark:text-teal-400"
                />
                Investment Parameters
              </h2>

              <div className="space-y-6">
                {/* Render Starting Amount and Gross Return */}
                {inputConfigs.slice(0, 2).map((input, index) => {
                  const error = errors.find((e) => e.field === input.name);
                  return (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                        <Icon
                          icon={input.icon}
                          className="mr-1 text-teal-500 dark:text-teal-400"
                        />
                        {input.label}
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent[input.name].title,
                              helpContent[input.name].content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        {input.prefix && (
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                              {input.prefix}
                            </span>
                          </div>
                        )}
                        <input
                          type="text"
                          name={input.name}
                          value={inputDisplayValues[input.name]}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          min={input.min}
                          step={input.step}
                          disabled={input.disabled}
                          className={`focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 block w-full ${
                            input.prefix ? "pl-7" : "pl-4"
                          } pr-12 py-3 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md border ${
                            error ? "border-red-500" : ""
                          } ${
                            input.disabled
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder={input.placeholder}
                        />
                        {input.suffix && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                              {input.suffix}
                            </span>
                          </div>
                        )}
                      </div>
                      {error && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Radio buttons for toggling fee type */}
                <div className="mb-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Icon
                      icon="mdi:account-switch"
                      className="mr-2 text-teal-500 dark:text-teal-400"
                    />
                    Select Fee Type
                    <button
                      onClick={() =>
                        showHelpModal(
                          helpContent.feeType.title,
                          helpContent.feeType.content
                        )
                      }
                      className="ml-2 cursor-pointer text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                    >
                      <Icon
                        icon="mdi:information-outline"
                        width={16}
                        height={16}
                      />
                    </button>
                  </h3>
                  <div className="flex md:flex-row flex-col md:space-x-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="feeType"
                        value="advisor"
                        checked={inputs.useAdvisor}
                        onChange={() =>
                          setInputs((prev) => ({ ...prev, useAdvisor: true }))
                        }
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        Financial Advisor
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="feeType"
                        value="diy"
                        checked={!inputs.useAdvisor}
                        onChange={() =>
                          setInputs((prev) => ({ ...prev, useAdvisor: false }))
                        }
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        DIY Investing
                      </span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {inputs.useAdvisor
                      ? "Enter a percentage-based fee for a professional advisor"
                      : "Enter percentage-based costs for managing investments yourself"}
                  </p>
                </div>

                {/* Conditionally render Advisor Fee or DIY Cost */}
                {inputs.useAdvisor ? (
                  <div>
                    {inputConfigs.slice(2, 3).map((input, index) => {
                      const error = errors.find((e) => e.field === input.name);
                      return (
                        <div key={index + 2}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                            <Icon
                              icon={input.icon}
                              className="mr-1 text-teal-500 dark:text-teal-400"
                            />
                            {input.label}
                            <button
                              onClick={() =>
                                showHelpModal(
                                  helpContent[input.name].title,
                                  helpContent[input.name].content
                                )
                              }
                              className="ml-2 cursor-pointer text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                            >
                              <Icon
                                icon="mdi:information-outline"
                                width={16}
                                height={16}
                              />
                            </button>
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            {input.prefix && (
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                                  {input.prefix}
                                </span>
                              </div>
                            )}
                            <input
                              type="text"
                              name={input.name}
                              value={inputDisplayValues[input.name]}
                              onChange={handleInputChange}
                              onWheel={handleWheel}
                              min={input.min}
                              step={input.step}
                              disabled={input.disabled}
                              className={`focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 block w-full ${
                                input.prefix ? "pl-7" : "pl-4"
                              } pr-12 py-3 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md border ${
                                error ? "border-red-500" : ""
                              } ${
                                input.disabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              placeholder={input.placeholder}
                            />
                            {input.suffix && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                                  {input.suffix}
                                </span>
                              </div>
                            )}
                          </div>
                          {error && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                              {error.message}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {inputConfigs.slice(3, 4).map((input, index) => {
                      const error = errors.find((e) => e.field === input.name);
                      return (
                        <div key={index + 3}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                            <Icon
                              icon={input.icon}
                              className="mr-1 text-teal-500 dark:text-teal-400"
                            />
                            {input.label}
                            <button
                              onClick={() =>
                                showHelpModal(
                                  helpContent[input.name].title,
                                  helpContent[input.name].content
                                )
                              }
                              className="ml-2 cursor-pointer text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                            >
                              <Icon
                                icon="mdi:information-outline"
                                width={16}
                                height={16}
                              />
                            </button>
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            {input.prefix && (
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                                  {input.prefix}
                                </span>
                              </div>
                            )}
                            <input
                              type="text"
                              name={input.name}
                              value={inputDisplayValues[input.name]}
                              onChange={handleInputChange}
                              onWheel={handleWheel}
                              min={input.min}
                              step={input.step}
                              disabled={input.disabled}
                              className={`focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 block w-full ${
                                input.prefix ? "pl-7" : "pl-4"
                              } pr-12 py-3 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md border ${
                                error ? "border-red-500" : ""
                              } ${
                                input.disabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              placeholder={input.placeholder}
                            />
                            {input.suffix && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                                  {input.suffix}
                                </span>
                              </div>
                            )}
                          </div>
                          {error && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                              {error.message}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Render Tax Rate and Inflation */}
                {inputConfigs.slice(4).map((input, index) => {
                  const error = errors.find((e) => e.field === input.name);
                  return (
                    <div key={index + 4}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                        <Icon
                          icon={input.icon}
                          className="mr-1 text-teal-500 dark:text-teal-400"
                        />
                        {input.label}
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent[input.name].title,
                              helpContent[input.name].content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        {input.prefix && (
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                              {input.prefix}
                            </span>
                          </div>
                        )}
                        <input
                          type="text"
                          name={input.name}
                          value={inputDisplayValues[input.name]}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          min={input.min}
                          step={input.step}
                          disabled={input.disabled}
                          className={`focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 block w-full ${
                            input.prefix ? "pl-7" : "pl-4"
                          } pr-12 py-3 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md border ${
                            error ? "border-red-500" : ""
                          } ${
                            input.disabled
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder={input.placeholder}
                        />
                        {input.suffix && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                              {input.suffix}
                            </span>
                          </div>
                        )}
                      </div>
                      {error && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={calculateResults}
                disabled={isLoading}
                className="w-full mt-8 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-md shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-teal-400 flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className="animate-spin mr-2" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:calculator" className="mr-2" />
                    Calculate Net Yield
                  </>
                )}
              </button>

              <div className="mt-6 bg-teal-50 dark:bg-teal-900 p-4 rounded-lg border border-teal-200 dark:border-teal-700">
                <h3 className="font-medium text-teal-800 dark:text-teal-200 flex items-center">
                  <Icon icon="mdi:lightning-bolt" className="mr-2" />
                  Pro Tip
                </h3>
                <p className="text-sm text-teal-600 dark:text-teal-100 mt-2">
                  {inputs.useAdvisor
                    ? "Even small differences in advisor fees can have a huge impact on long-term wealth accumulation. Always consider the net return after all costs."
                    : "Pro Tip: DIY investing cuts advisor fees, but research warns hidden costs—poor rebalancing, missed tax optimization, trading fees, research tools and your time—can erode returns."}
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                <Icon
                  icon="mdi:chart-arc"
                  className="mr-2 text-teal-600 dark:text-teal-400"
                />
                Results
              </h2>

              {isCalculated && results ? (
                <>
                  <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="font-medium text-blue-800 dark:text-blue-200 flex items-center">
                      <Icon
                        icon={
                          inputs.useAdvisor
                            ? "mdi:account-tie"
                            : "mdi:home-analytics"
                        }
                        className="mr-2"
                      />
                      {inputs.useAdvisor
                        ? "Using Financial Advisor"
                        : "DIY Investment Management"}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-100 mt-1">
                      {inputs.useAdvisor
                        ? `Advisor Fee: ${formatPercentage(inputs.advisorFee)}`
                        : `DIY Cost: ${formatPercentage(inputs.diyCost)}`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900 p-4 rounded-lg border border-teal-200 dark:border-teal-700 shadow-sm">
                      <p className="text-sm text-teal-700 dark:text-teal-200 font-medium">
                        Nominal Net Yield
                      </p>
                      <p className="text-2xl font-bold text-teal-800 dark:text-teal-100">
                        {formatPercentage(results.nominalNetYield)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700 shadow-sm">
                      <p className="text-sm text-indigo-700 dark:text-indigo-200 font-medium">
                        Real Net Yield (Inflation Adjusted)
                      </p>
                      <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-100">
                        {formatPercentage(results.realNetYield)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                      <Icon
                        icon="mdi:chart-pie"
                        className="mr-2 text-teal-500 dark:text-teal-400"
                      />
                      Income Distribution
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={incomeDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {incomeDistributionData.map((_, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={chartTooltipFormatter} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                      <Icon
                        icon="mdi:chart-bar"
                        className="mr-2 text-teal-500 dark:text-teal-400"
                      />
                      Gross vs Net Return
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            tickFormatter={(value) =>
                              `$${formatNumberWithCommas(value.toFixed(0))}`
                            }
                          />
                          <Tooltip formatter={chartTooltipFormatter} />
                          <Legend />
                          <Bar
                            dataKey="value"
                            fill={CHART_COLORS.primary}
                            name="Return Amount"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">
                        Gross Income:
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(results.grossIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">
                        {results.feeType}:
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(results.feeCost)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">
                        Taxable Income:
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(results.taxableIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">
                        Taxes:
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(results.taxes)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-teal-50 dark:bg-teal-900 rounded-lg border border-teal-200 dark:border-teal-700">
                      <span className="text-teal-700 dark:text-teal-200 font-medium">
                        Net Income:
                      </span>
                      <span className="font-bold text-teal-800 dark:text-teal-100">
                        {formatCurrency(results.netIncome)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() =>
                        setShowCalculationSteps(!showCalculationSteps)
                      }
                      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center"
                    >
                      <Icon
                        icon={
                          showCalculationSteps
                            ? "mdi:chevron-up"
                            : "mdi:chevron-down"
                        }
                        className="mr-2"
                      />
                      {showCalculationSteps
                        ? "Hide Calculation Steps"
                        : "Show Calculation Steps"}
                    </button>

                    {showCalculationSteps && (
                      <div className="mt-4 bg-blue-50 dark:bg-teal-900 p-4 rounded-lg border border-blue-200 dark:border-teal-700">
                        <h3 className="font-medium text-teal-800 dark:text-blue-200 mb-3 flex items-center">
                          <Icon icon="mdi:abacus" className="mr-2" />
                          Calculation Steps
                        </h3>
                        <ol className="list-decimal pl-5 space-y-2 text-sm text-teal-700 dark:text-blue-100">
                          <li>
                            <strong>Gross Income:</strong> Starting Amount ×
                            (Gross Return ÷ 100) ={" "}
                            {formatCurrency(inputs.startingAmount)} × (
                            {inputs.grossReturn} ÷ 100) ={" "}
                            {formatCurrency(results.grossIncome)}
                          </li>
                          <li>
                            <strong>{results.feeType}:</strong>{" "}
                            {`Gross Income × (${
                              results.feeType === "Advisor Fees"
                                ? "Advisor Fee"
                                : "DIY Cost"
                            } ÷ 100) = ${formatCurrency(
                              results.grossIncome
                            )} × (${
                              inputs.useAdvisor
                                ? inputs.advisorFee
                                : inputs.diyCost
                            } ÷ 100)`}{" "}
                            = {formatCurrency(results.feeCost)}
                          </li>
                          <li>
                            <strong>Taxable Income:</strong> Gross Income - Fees
                            = {formatCurrency(results.grossIncome)} -{" "}
                            {formatCurrency(results.feeCost)} ={" "}
                            {formatCurrency(results.taxableIncome)}
                          </li>
                          <li>
                            <strong>Taxes:</strong> Taxable Income × (Tax Rate ÷
                            100) = {formatCurrency(results.taxableIncome)} × (
                            {inputs.taxRate} ÷ 100) ={" "}
                            {formatCurrency(results.taxes)}
                          </li>
                          <li>
                            <strong>Net Income:</strong> Taxable Income - Taxes
                            = {formatCurrency(results.taxableIncome)} -{" "}
                            {formatCurrency(results.taxes)} ={" "}
                            {formatCurrency(results.netIncome)}
                          </li>
                          <li>
                            <strong>Nominal Net Yield:</strong> (Net Income ÷
                            Starting Amount) × 100 = (
                            {formatCurrency(results.netIncome)} ÷{" "}
                            {formatCurrency(inputs.startingAmount)}) × 100 ={" "}
                            {formatPercentage(results.nominalNetYield)}
                          </li>
                          <li>
                            <strong>Real Net Yield:</strong> Nominal Net Yield -
                            Inflation ={" "}
                            {formatPercentage(results.nominalNetYield)} -{" "}
                            {inputs.inflation}% ={" "}
                            {formatPercentage(results.realNetYield)}
                          </li>
                        </ol>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <Icon
                    icon="mdi:calculator-variant"
                    className="text-gray-300 dark:text-gray-600 text-6xl mb-4"
                  />
                  <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
                    Enter your investment parameters and click "Calculate" to
                    see results
                  </p>
                  <button
                    onClick={calculateResults}
                    disabled={
                      Object.values(inputs).some((val) => val === "") ||
                      isLoading
                    }
                    className={`py-2 px-6 rounded-md font-medium ${
                      Object.values(inputs).some((val) => val === "") ||
                      isLoading
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-teal-500 text-white hover:bg-teal-600"
                    }`}
                  >
                    {isLoading ? "Calculating..." : "Calculate Now"}
                  </button>
                </div>
              )}
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
          fontSize: "16px",
        }}
      >
        <FixedWidthNetIncomeYieldCalculatorPDFTemplate
          inputs={inputs}
          inputDisplayValues={inputDisplayValues}
          results={results}
        />
      </div>
    </>
  );
};

// Updated calculation function with TypeScript
function calculateNetIncomeYield(
  startingAmount: number,
  grossReturn: number,
  advisorFee: number,
  diyCost: number,
  taxRate: number,
  inflation: number,
  useAdvisor: boolean
): CalculatorResults {
  if (startingAmount <= 0) {
    throw new Error("Starting amount must be greater than zero.");
  }

  // Step 1: Gross income from investment
  const grossIncome = (startingAmount * grossReturn) / 100;

  // Step 2: Calculate fees based on selection
  let feeCost: number;
  let feeType: string;

  if (useAdvisor) {
    feeCost = (grossIncome * advisorFee) / 100;
    feeType = "Advisor Fees";
  } else {
    feeCost = (grossIncome * diyCost) / 100;
    feeType = "DIY Costs";
  }

  // Step 3: Taxable income
  const taxableIncome = grossIncome - feeCost;

  // Step 4: Taxes
  const taxes = (taxableIncome * taxRate) / 100;

  // Step 5: Net income
  const netIncome = taxableIncome - taxes;

  // Step 6: Net yield (%)
  const nominalNetYield = (netIncome / startingAmount) * 100;

  // Step 7: Adjust for inflation
  const realNetYield = nominalNetYield - inflation;

  return {
    grossIncome: grossIncome.toFixed(2),
    feeCost: feeCost.toFixed(2),
    feeType,
    taxableIncome: taxableIncome.toFixed(2),
    taxes: taxes.toFixed(2),
    netIncome: netIncome.toFixed(2),
    nominalNetYield: nominalNetYield.toFixed(2),
    realNetYield: realNetYield.toFixed(2),
  };
}

export default NetIncomeYieldCalculator;
