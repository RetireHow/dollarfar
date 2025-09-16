import React, { useEffect, useState } from "react";
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

// Define TypeScript interfaces
interface CalculatorInputs {
  startingAmount: number | "";
  grossReturn: number | "";
  advisorFee: number | "";
  taxRate: number | "";
  inflation: number | "";
}

interface CalculatorResults {
  grossIncome: string;
  advisorFeeCost: string;
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
}

interface InputError {
  field: keyof CalculatorInputs;
  message: string;
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

  // For percentages, we might have values > 1000 that need commas
  const parts = numValue.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${parts.join(".")}%`;
};

// Custom tooltip formatter for charts
const chartTooltipFormatter = (value: number, name: string) => {
  return [formatCurrency(value), name];
};

const data = {
  title: "Net Income Yield Calculator",
  description:
    "This yield calculator determines your true net returns by accounting for advisor fees, taxes, and inflation. It provides clear visualizations of how these costs impact both nominal and real yields, helping investors understand their actual earnings after all expenses and economic factors.",
  image: assets.compoundInterestCalcIcon,
};

// Main component
const NetIncomeYieldCalculator: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Default values as empty strings
  const [inputs, setInputs] = useState<CalculatorInputs>({
    startingAmount: "",
    grossReturn: "",
    advisorFee: "",
    taxRate: "",
    inflation: "",
  });

  const [inputDisplayValues, setInputDisplayValues] = useState<
    Record<keyof CalculatorInputs, string>
  >({
    startingAmount: "",
    grossReturn: "",
    advisorFee: "",
    taxRate: "",
    inflation: "",
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<InputError[]>([]);
  const [showCalculationSteps, setShowCalculationSteps] =
    useState<boolean>(false);

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

    if (inputs.advisorFee === "") {
      newErrors.push({
        field: "advisorFee",
        message: "Advisor fee is required",
      });
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
          Number(inputs.advisorFee),
          Number(inputs.taxRate),
          Number(inputs.inflation)
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
    const { name, value } = e.target;
    const fieldName = name as keyof CalculatorInputs;

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
        { name: "Advisor Fees", value: parseFloat(results.advisorFeeCost) },
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

  return (
    <>
      <PageHero data={data} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
              Net Income Yield Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Calculate your true investment returns after accounting for fees,
              taxes, and inflation
            </p>
          </div>

          {showDescription && (
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 dark:bg-gradient-to-r dark:from-teal-700 dark:to-blue-700 rounded-xl shadow-lg p-6 mb-8 text-white relative">
              <button
                onClick={() => setShowDescription(false)}
                className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100"
              >
                <Icon icon="mdi:close" className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Icon icon="mdi:lightbulb-on" className="mr-2 text-amber-200" />
                Maximize Your Investment Returns
              </h2>
              <p className="mb-3">
                Many investors focus on gross returns without considering how
                fees, taxes, and inflation significantly reduce their actual
                earnings. This calculator helps you understand your true net
                yield.
              </p>
              <p>
                Use this calculator to make informed decisions about your
                investments and financial advisory relationships.
              </p>
            </div>
          )}

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
                {inputConfigs.map((input, index) => {
                  const error = errors.find((e) => e.field === input.name);
                  return (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                        <Icon
                          icon={input.icon}
                          className="mr-1 text-teal-500 dark:text-teal-400"
                        />
                        {input.label}
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
                          className={`focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 block w-full ${
                            input.prefix ? "pl-7" : "pl-4"
                          } pr-12 py-3 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md border ${
                            error ? "border-red-500" : ""
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

              {!showDescription && (
                <button
                  onClick={() => setShowDescription(true)}
                  className="w-full mt-4 text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center"
                >
                  <Icon icon="mdi:information" className="mr-2" />
                  Why is this important?
                </button>
              )}

              <div className="mt-6 bg-teal-50 dark:bg-teal-900 p-4 rounded-lg border border-teal-200 dark:border-teal-700">
                <h3 className="font-medium text-teal-800 dark:text-teal-200 flex items-center">
                  <Icon icon="mdi:lightning-bolt" className="mr-2" />
                  Pro Tip
                </h3>
                <p className="text-sm text-teal-600 dark:text-teal-100 mt-2">
                  Even small differences in fees can have a huge impact on
                  long-term wealth accumulation. Always consider the net return
                  after all costs.
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
                        Advisor Fees:
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(results.advisorFeeCost)}
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
                            <strong>Advisor Fees:</strong> Gross Income ×
                            (Advisor Fee ÷ 100) ={" "}
                            {formatCurrency(results.grossIncome)} × (
                            {inputs.advisorFee} ÷ 100) ={" "}
                            {formatCurrency(results.advisorFeeCost)}
                          </li>
                          <li>
                            <strong>Taxable Income:</strong> Gross Income -
                            Advisor Fees = {formatCurrency(results.grossIncome)}{" "}
                            - {formatCurrency(results.advisorFeeCost)} ={" "}
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
    </>
  );
};

// The provided calculation function with TypeScript
function calculateNetIncomeYield(
  startingAmount: number,
  grossReturn: number,
  advisorFee: number,
  taxRate: number,
  inflation: number
): CalculatorResults {
  if (startingAmount <= 0) {
    throw new Error("Starting amount must be greater than zero.");
  }

  // Step 1: Gross income from investment
  const grossIncome = (startingAmount * grossReturn) / 100;

  // Step 2: Advisor fee
  const advisorFeeCost = (grossIncome * advisorFee) / 100;

  // Step 3: Taxable income
  const taxableIncome = grossIncome - advisorFeeCost;

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
    advisorFeeCost: advisorFeeCost.toFixed(2),
    taxableIncome: taxableIncome.toFixed(2),
    taxes: taxes.toFixed(2),
    netIncome: netIncome.toFixed(2),
    nominalNetYield: nominalNetYield.toFixed(2),
    realNetYield: realNetYield.toFixed(2),
  };
}

export default NetIncomeYieldCalculator;
