/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { RetirementSimulatorPDFModal } from "./RetirementSimulatorPDFModal";
import { useCustomPDF } from "../../hooks/useCustomPDF";
import { FixedRetirementSimulatorPDFTemplate } from "./FixedRetirementSimulatorPDFTemplate";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import PageHero from "../../components/UI/PageHero";
import { assets } from "../../assets/assets";

const data = {
  title: "Retirement Simulator",
  description:
    "Project your retirement future. This powerful simulator forecasts savings growth, identifies financial gaps, and provides actionable insights to secure your golden years with confidence.",
  image: assets.compoundInterestCalcIcon,
};

// Types (unchanged)
interface RetirementParams {
  currentAge: number;
  annualIncome: number;
  inflationRate: number;
  currentSavings: number;
  annualSavings: number;
  savingsIncreaseRate: number;
  investmentReturn: number;
  retirementAge: number;
  lifeExpectancy: number;
  incomeReplacementRate: number;
  annualPension: number;
  pensionIncreaseRate: number;
}

interface YearlyResult {
  age: number;
  salary: number;
  beginningBalance: number;
  interest: number;
  savings: number;
  desiredIncome: number;
  pension: number;
  withdrawal: number;
  endingBalance: number;
}

// Format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

type HelpModalProps = {
  title: string;
  content: string;
  visible: boolean;
  onClose: () => void;
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

// Calculation function
const calculateRetirementPlan = (params: RetirementParams): YearlyResult[] => {
  const {
    currentAge,
    annualIncome,
    inflationRate,
    currentSavings,
    annualSavings,
    savingsIncreaseRate,
    investmentReturn,
    retirementAge,
    lifeExpectancy,
    incomeReplacementRate,
    annualPension,
    pensionIncreaseRate,
  } = params;

  const yearsToRetirement = retirementAge - currentAge;
  const totalYears = lifeExpectancy - currentAge + 1;

  const results: YearlyResult[] = [];

  let currentSalary = annualIncome;
  let prevBalance = currentSavings;
  let pensionAmount = annualPension;

  const finalSalary =
    annualIncome * Math.pow(1 + inflationRate, yearsToRetirement);
  const desiredRetirementIncome = finalSalary * incomeReplacementRate;

  for (let year = 0; year < totalYears; year++) {
    const age = currentAge + year;
    const isWorking = age < retirementAge;

    const interest = prevBalance * investmentReturn;

    let savingsAmount = 0;
    let currentDesiredIncome = 0;
    let withdrawal = 0;
    pensionAmount = 0;

    if (isWorking) {
      savingsAmount = annualSavings * Math.pow(1 + savingsIncreaseRate, year);
    } else {
      const yearsInRetirement = age - retirementAge;
      pensionAmount =
        annualPension * Math.pow(1 + pensionIncreaseRate, yearsInRetirement);
      currentDesiredIncome =
        desiredRetirementIncome *
        Math.pow(1 + inflationRate, yearsInRetirement);
      withdrawal = Math.max(0, currentDesiredIncome - pensionAmount);
    }

    const balance =
      prevBalance + interest + (isWorking ? savingsAmount : -withdrawal);

    results.push({
      age,
      salary: Math.round(isWorking ? currentSalary : 0),
      beginningBalance: Math.round(prevBalance),
      interest: Math.round(interest),
      savings: Math.round(savingsAmount),
      desiredIncome: Math.round(currentDesiredIncome),
      pension: Math.round(pensionAmount),
      withdrawal: Math.round(withdrawal),
      endingBalance: Math.round(balance),
    });

    prevBalance = balance;

    if (age + 1 < retirementAge) {
      currentSalary = currentSalary * (1 + inflationRate);
    }
  }

  return results;
};

// Helper function to format numbers with commas
const formatNumberWithCommas = (value: string): string => {
  return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Helper function to remove commas from numbers
const removeCommas = (value: string): number => {
  return parseFloat(value.replace(/,/g, ""));
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <p className="font-bold text-gray-800 dark:text-white">Age: {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Main component
const RetirementSimulator: React.FC = () => {
  // Default parameters
  const defaultParams: RetirementParams = {
    currentAge: 40,
    annualIncome: 50000,
    inflationRate: 0.03,
    currentSavings: 60000,
    annualSavings: 16000,
    savingsIncreaseRate: 0,
    investmentReturn: 0.0625,
    retirementAge: 65,
    lifeExpectancy: 85,
    incomeReplacementRate: 0.75,
    annualPension: 0,
    pensionIncreaseRate: 0,
  };

  const [params, setParams] = useState<RetirementParams>(defaultParams);
  const [displayValues, setDisplayValues] = useState({
    currentAge: "40",
    annualIncome: "50,000",
    inflationRate: "3.00",
    currentSavings: "60,000",
    annualSavings: "16,000",
    savingsIncreaseRate: "0.00",
    investmentReturn: "6.25",
    retirementAge: "65",
    lifeExpectancy: "85",
    incomeReplacementRate: "75.00",
    annualPension: "0",
    pensionIncreaseRate: "0.00",
  });
  const [results, setResults] = useState<YearlyResult[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  // Calculate results when params change
  useEffect(() => {
    const calculatedResults = calculateRetirementPlan(params);
    setResults(calculatedResults);
    setIsCalculated(true);
  }, [params]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      name === "annualIncome" ||
      name === "currentSavings" ||
      name === "annualSavings" ||
      name === "annualPension"
    ) {
      const formattedValue = formatNumberWithCommas(value);
      setDisplayValues((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));

      setParams((prev) => ({
        ...prev,
        [name]: removeCommas(value),
      }));
    } else if (
      name.includes("Rate") ||
      name.includes("Return") ||
      name.includes("Replacement")
    ) {
      setDisplayValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      setParams((prev) => ({
        ...prev,
        [name]: parseFloat(value) / 100,
      }));
    } else {
      setDisplayValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      setParams((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    }
  };

  // Prevent mouse wheel from changing input values
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.blur();
  };

  // Get retirement summary (updated with +1 for retirement duration)
  const getRetirementSummary = () => {
    const retirementYear = results.findIndex(
      (item) => item.age === params.retirementAge
    );
    if (retirementYear === -1) return null;

    const retirementDuration = params.lifeExpectancy - params.retirementAge + 1;

    const finalSalary =
      params.annualIncome *
      Math.pow(
        1 + params.inflationRate,
        params.retirementAge - params.currentAge
      );
    const desiredRetirementIncome = finalSalary * params.incomeReplacementRate;

    let pvRetirementNeeds = 0;
    for (let year = 0; year < retirementDuration; year++) {
      const annualExpense =
        desiredRetirementIncome * Math.pow(1 + params.inflationRate, year);
      const pv =
        annualExpense / Math.pow(1 + params.investmentReturn, year + 1);
      pvRetirementNeeds += pv;
    }

    let pvPensionIncome = 0;
    for (let year = 0; year < retirementDuration; year++) {
      const annualPension =
        params.annualPension * Math.pow(1 + params.pensionIncreaseRate, year);
      const pv =
        annualPension / Math.pow(1 + params.investmentReturn, year + 1);
      pvPensionIncome += pv;
    }

    const nestEggRequired = Math.max(0, pvRetirementNeeds - pvPensionIncome);

    const yearsToRetirement = params.retirementAge - params.currentAge;

    const futureValueOfCurrentSavings =
      params.currentSavings *
      Math.pow(1 + params.investmentReturn, yearsToRetirement);

    let futureValueOfExistingContributions = 0;
    for (let year = 0; year < yearsToRetirement; year++) {
      const annualContribution =
        params.annualSavings * Math.pow(1 + params.savingsIncreaseRate, year);
      futureValueOfExistingContributions +=
        annualContribution *
        Math.pow(1 + params.investmentReturn, yearsToRetirement - year - 1);
    }

    const totalProjectedSavings =
      futureValueOfCurrentSavings + futureValueOfExistingContributions;

    const additionalSavingsNeeded = Math.max(
      0,
      nestEggRequired - totalProjectedSavings
    );

    let yearlySavingsNeeded = 0;
    if (additionalSavingsNeeded > 0 && yearsToRetirement > 0) {
      const r = params.investmentReturn;
      const n = yearsToRetirement;
      yearlySavingsNeeded =
        additionalSavingsNeeded * (r / (Math.pow(1 + r, n) - 1));
    }

    const monthlySavingsNeeded = yearlySavingsNeeded / 12;

    return {
      retirementAge: params.retirementAge,
      savingsAtRetirement: results[retirementYear].beginningBalance,
      annualRetirementIncome: Math.round(desiredRetirementIncome),
      yearsOfRetirement: retirementDuration,
      nestEggRequired: Math.round(nestEggRequired),
      monthlySavingsNeeded: Math.round(monthlySavingsNeeded),
      yearlySavingsNeeded: Math.round(yearlySavingsNeeded),
      isOnTrack: totalProjectedSavings >= nestEggRequired,
      totalProjectedSavings: Math.round(totalProjectedSavings),
      additionalSavingsNeeded: Math.round(additionalSavingsNeeded),
    };
  };

  const retirementSummary = getRetirementSummary();

  // Get data to display in table - Now shows all rows
  const getDisplayData = () => {
    return results; // Show all rows instead of filtered data
  };

  const displayData = getDisplayData();

  // Prepare chart data
  const chartData = results.map((year) => ({
    age: year.age,
    savings: year.endingBalance,
    withdrawal: year.withdrawal,
    pension: year.pension,
    desiredIncome: year.desiredIncome,
  }));

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // PDF
  const { toPDF, targetRef } = useCustomPDF({
    filename: "Retirement-Simulator.pdf",
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

  const [modalVisible, setModalVisible] = useState(false);

  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const showHelpModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  // Updated help content for retirement planning fields
  const helpContent = {
    currentAge: {
      title: "Current Age",
      content:
        "Your current age in years. This is the starting point for your retirement planning timeline.",
    },
    annualIncome: {
      title: "Current Yearly Income",
      content:
        "Your current annual gross income before taxes. This forms the basis for calculating your retirement savings needs and income replacement.",
    },
    currentSavings: {
      title: "Current Retirement Savings",
      content:
        "The total amount you have already saved for retirement across all accounts (401k, IRA, brokerage, etc.).",
    },
    annualSavings: {
      title: "Yearly Savings Amount",
      content:
        "How much you currently contribute to retirement savings each year. Include employer matches if applicable.",
    },
    savingsIncreaseRate: {
      title: "Yearly Savings Increase",
      content:
        "The expected annual percentage increase in your retirement contributions. This accounts for raises, bonuses, or planned increases in savings rate.",
    },
    investmentReturn: {
      title: "Expected Yearly Investment Growth",
      content:
        "The average annual return you expect from your investments. Historical stock market returns are typically 7-10%, but conservative estimates around 6-7% are often used for planning.",
    },
    retirementAge: {
      title: "Planned Retirement Age",
      content:
        "The age at which you plan to stop working and begin drawing from your retirement savings.",
    },
    lifeExpectancy: {
      title: "Life Expectancy",
      content:
        "How long you expect to live. Plan conservatively - consider family history and add a few years as life expectancies continue to increase. This determines how long your retirement savings need to last.",
    },
    inflationRate: {
      title: "Yearly Inflation and Raise Rate",
      content:
        "The expected average annual inflation rate. This affects both your future salary increases and the rising cost of living during retirement. Typical long-term inflation is around 2-3%.",
    },
    incomeReplacementRate: {
      title: "Required Yearly Retirement Income",
      content:
        "The percentage of your final working years' income that you'll need annually in retirement. Most people need 70-80% of their pre-retirement income to maintain their lifestyle.",
    },
    annualPension: {
      title: "Yearly Pension at Retirement",
      content:
        "Expected annual pension or Social Security income at the start of retirement. If unsure, you can check your Social Security statement for estimates.",
    },
    pensionIncreaseRate: {
      title: "Yearly Pension Increase",
      content:
        "The expected annual increase in your pension payments. Social Security typically has cost-of-living adjustments (COLA) around 2-3% annually.",
    },
  };

  return (
    <>
      <PageHero data={data} />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <HelpModal
          title={modalContent.title}
          content={modalContent.content}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Simplified Header */}
          <div className="p-4 bg-white dark:bg-neutral-800 dark:text-white flex md:flex-row flex-col md:gap-0 gap-3 justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Icon icon="mdi:finance" className="text-3xl" />
              Retirement Simulator
            </h1>
            <div className="flex flex-col">
              <RetirementSimulatorPDFModal
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

          <div className="flex flex-col">
            {/* Form and Status Side by Side */}
            <div className="flex flex-col lg:flex-row">
              {/* Input Form */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 lg:w-2/3 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <Icon icon="mdi:calculator" className="text-teal-600" />
                  Your Financial Information
                </h2>

                <div className="grid md:grid-cols-2 md:gap-3 gap-8">
                  {/* Current Situation */}
                  <div>
                    <div className="space-y-5">
                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Current Age
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.currentAge.title,
                                helpContent.currentAge.content
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
                        <input
                          type="text"
                          name="currentAge"
                          value={displayValues.currentAge}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          min="18"
                          max="100"
                          title="Your current age"
                        />
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Current Yearly Income
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.annualIncome.title,
                                helpContent.annualIncome.content
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
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                            $
                          </span>
                          <input
                            type="text"
                            name="annualIncome"
                            value={displayValues.annualIncome}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full pl-8 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="Your current yearly earnings before taxes"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Current Retirement Savings
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.currentSavings.title,
                                helpContent.currentSavings.content
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
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                            $
                          </span>
                          <input
                            type="text"
                            name="currentSavings"
                            value={displayValues.currentSavings}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full pl-8 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="Total amount you have saved for retirement so far"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Yearly Savings Amount
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.annualSavings.title,
                                helpContent.annualSavings.content
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
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                            $
                          </span>
                          <input
                            type="text"
                            name="annualSavings"
                            value={displayValues.annualSavings}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full pl-8 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="How much you save each year for retirement"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Yearly Savings Increase (%)
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.savingsIncreaseRate.title,
                                helpContent.savingsIncreaseRate.content
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
                        <div className="relative">
                          <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                            %
                          </span>
                          <input
                            type="text"
                            name="savingsIncreaseRate"
                            value={displayValues.savingsIncreaseRate}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="How much your savings contributions increase each year"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Expected Yearly Investment Growth (%)
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.investmentReturn.title,
                                helpContent.investmentReturn.content
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
                        <div className="relative">
                          <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                            %
                          </span>
                          <input
                            type="text"
                            name="investmentReturn"
                            value={displayValues.investmentReturn}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="Average yearly return on your investments"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Retirement Assumptions */}
                  <div>
                    <div className="space-y-5">
                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Planned Retirement Age
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.retirementAge.title,
                                helpContent.retirementAge.content
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
                        <input
                          type="text"
                          name="retirementAge"
                          value={displayValues.retirementAge}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          min={params.currentAge + 1}
                          max="100"
                          title="The age you plan to retire"
                        />
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Life Expectancy
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.lifeExpectancy.title,
                                helpContent.lifeExpectancy.content
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
                        <input
                          type="text"
                          name="lifeExpectancy"
                          value={displayValues.lifeExpectancy}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          min={params.retirementAge + 1}
                          max="120"
                          title="How long you expect to live (plan conservatively)"
                        />
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Yearly Inflation and Raise Rate (%)
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.inflationRate.title,
                                helpContent.inflationRate.content
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
                        <div className="relative">
                          <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                            %
                          </span>
                          <input
                            type="text"
                            name="inflationRate"
                            value={displayValues.inflationRate}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="Average yearly increase in living costs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Required Yearly Retirement Income (% of Final Salary)
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.incomeReplacementRate.title,
                                helpContent.incomeReplacementRate.content
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
                        <div className="relative">
                          <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                            %
                          </span>
                          <input
                            type="text"
                            name="incomeReplacementRate"
                            value={displayValues.incomeReplacementRate}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="Percentage of your pre-retirement income you'll need annually in retirement"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Yearly Pension at Retirement
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.annualPension.title,
                                helpContent.annualPension.content
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
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                            $
                          </span>
                          <input
                            type="text"
                            name="annualPension"
                            value={displayValues.annualPension}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full pl-8 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="Annual pension or Social Security income at start of retirement"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                          Yearly Pension Increase (%)
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent.pensionIncreaseRate.title,
                                helpContent.pensionIncreaseRate.content
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
                        <div className="relative">
                          <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                            %
                          </span>
                          <input
                            type="text"
                            name="pensionIncreaseRate"
                            value={displayValues.pensionIncreaseRate}
                            onChange={handleInputChange}
                            onWheel={handleWheel}
                            className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            title="How much your pension increases each year (e.g., cost-of-living adjustment)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Streamlined Retirement Status */}
              {isCalculated && results.length > 0 && retirementSummary && (
                <div className="p-6 lg:w-1/3 lg:border-b-0">
                  <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:chart-line" className="text-teal-600" />
                    Your Retirement Readiness
                  </h3>

                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 md:p-6 p-3 rounded-lg border border-teal-200 dark:border-teal-800 shadow-sm">
                    {/* Consolidated Status Indicator */}
                    <div
                      className={`p-4 rounded-lg mb-6 ${
                        retirementSummary.isOnTrack
                          ? "bg-green-50 dark:bg-green-900 border-2 border-green-200 dark:border-green-700"
                          : "bg-amber-50 dark:bg-amber-900 border-2 border-amber-200 dark:border-amber-700"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-1 ${
                            retirementSummary.isOnTrack
                              ? "text-green-800 dark:text-green-200"
                              : "text-amber-800 dark:text-amber-200"
                          }`}
                        >
                          <h4
                            className={`font-bold text-lg mb-2 ${
                              retirementSummary.isOnTrack
                                ? "text-green-800 dark:text-green-200"
                                : "text-amber-800 dark:text-amber-200"
                            }`}
                          >
                            {retirementSummary.isOnTrack
                              ? retirementSummary.totalProjectedSavings >=
                                retirementSummary.nestEggRequired * 1.2
                                ? "🎉 Congratulations!"
                                : "👍 You're doing well!"
                              : "💡 Needs improvement"}
                          </h4>

                          {/* Gap/Surplus Display */}
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700 mb-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-600 dark:text-gray-400">
                                Your Projected Savings:
                              </span>
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {formatCurrency(
                                  retirementSummary.totalProjectedSavings
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-600 dark:text-gray-400">
                                Savings Needed for Retirement:
                              </span>
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {formatCurrency(
                                  retirementSummary.nestEggRequired
                                )}
                              </span>
                            </div>
                            <hr className="my-1 border-gray-200 dark:border-gray-600" />
                            <div className="flex justify-between items-center">
                              <span
                                className={`font-bold text-lg ${
                                  retirementSummary.isOnTrack
                                    ? "text-green-700 dark:text-green-300"
                                    : "text-amber-700 dark:text-amber-300"
                                }`}
                              >
                                {retirementSummary.isOnTrack
                                  ? "You're Ahead"
                                  : "Extra Needed"}
                              </span>
                              <span
                                className={`text-xl font-bold ${
                                  retirementSummary.isOnTrack
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-amber-600 dark:text-amber-400"
                                }`}
                              >
                                {retirementSummary.isOnTrack
                                  ? `+${formatCurrency(
                                      retirementSummary.totalProjectedSavings -
                                        retirementSummary.nestEggRequired
                                    )}`
                                  : `${formatCurrency(
                                      retirementSummary.nestEggRequired -
                                        retirementSummary.totalProjectedSavings
                                    )}`}
                              </span>
                            </div>
                          </div>

                          {/* Actionable Advice - Updated with 20% threshold logic only for on-track situations */}
                          <p
                            className={`text-md ${
                              retirementSummary.isOnTrack
                                ? "text-green-700 dark:text-green-300"
                                : "text-amber-700 dark:text-amber-300"
                            }`}
                          >
                            {retirementSummary.isOnTrack ? (
                              retirementSummary.totalProjectedSavings >=
                              retirementSummary.nestEggRequired * 1.2 ? (
                                "You're right on track — and even ahead. Keep building momentum to stay future-ready!"
                              ) : (
                                "Aim for at least 20% more savings. Think of it as your cushion — a shock absorber if life's assumptions change."
                              )
                            ) : (
                              <p>
                                Increase savings by{" "}
                                <span className="font-bold text-lg">
                                  {formatCurrency(
                                    retirementSummary.monthlySavingsNeeded
                                  )}
                                  /month
                                </span>{" "}
                                to reach your goal.
                              </p>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Single Progress Bar */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-md">
                        Progress Toward Your Goal
                      </h4>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            retirementSummary.isOnTrack
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (retirementSummary.totalProjectedSavings /
                                retirementSummary.nestEggRequired) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                        {(
                          (retirementSummary.totalProjectedSavings /
                            retirementSummary.nestEggRequired) *
                          100
                        ).toFixed(0)}
                        % complete
                      </p>
                    </div>

                    {/* Essential Metrics - Reduced to 2 */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700 text-center">
                        <div className="text-teal-600 dark:text-teal-400 text-md font-bold mb-1">
                          Extra Yearly Savings Needed
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(
                            retirementSummary.yearlySavingsNeeded
                          )}
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700 text-center">
                        <div className="text-teal-600 dark:text-teal-400 text-md font-bold mb-1">
                          Your Yearly Retirement Income
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(
                            retirementSummary.annualRetirementIncome
                          )}
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700 text-center">
                        <div className="text-teal-600 dark:text-teal-400 text-md font-bold mb-1">
                          Years Until Retirement
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {params.retirementAge - params.currentAge}
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700 text-center">
                        <div className="text-teal-600 dark:text-teal-400 text-md font-bold mb-1">
                          Years in Retirement
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {params.lifeExpectancy - params.retirementAge + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Table and Chart Below Form */}
            {isCalculated && results.length > 0 && (
              <div className="p-6">
                {/* Original Data Table - UPDATED */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
                  <div className="flex justify-between items-center p-4 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Complete Year-by-Year Projection ({results.length} years)
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                          <th className="px-4 py-3 text-left font-semibold text-md">
                            Age
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-md">
                            Salary
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-md">
                            Year-Start
                            <br />
                            Balance
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-md">
                            Interest
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-md">
                            Yearly
                            <br />
                            Savings
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-md">
                            Retirement
                            <br />
                            Income
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-md">
                            Pension
                            <br />
                            Income
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-md">
                            Year-End
                            <br />
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {displayData.map((year, index) => (
                          <tr
                            key={year.age}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                              year.age === params.retirementAge
                                ? "bg-gradient-to-r from-teal-200 to-blue-200 dark:from-teal-900 dark:to-blue-900 border-l-4 border-teal-500 font-semibold"
                                : index % 2 === 0
                                ? "bg-white dark:bg-gray-800"
                                : "bg-gray-50 dark:bg-gray-700"
                            }`}
                          >
                            <td className="px-4 py-3">
                              <span
                                className={`${
                                  year.age === params.retirementAge
                                    ? "text-teal-800 dark:text-teal-200"
                                    : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {year.age}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`${
                                  year.age === params.retirementAge
                                    ? "text-teal-800 dark:text-teal-200"
                                    : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {formatCurrency(year.salary)}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`${
                                  year.age === params.retirementAge
                                    ? "text-teal-800 dark:text-teal-200"
                                    : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {formatCurrency(year.beginningBalance)}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`text-green-600 dark:text-green-400 ${
                                  year.age === params.retirementAge
                                    ? "font-semibold"
                                    : ""
                                }`}
                              >
                                {formatCurrency(year.interest)}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`${
                                  year.age === params.retirementAge
                                    ? "text-teal-800 dark:text-teal-200"
                                    : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {formatCurrency(year.savings)}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`${
                                  year.age === params.retirementAge
                                    ? "text-teal-800 dark:text-teal-200"
                                    : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {formatCurrency(year.desiredIncome)}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`text-purple-600 dark:text-purple-400 ${
                                  year.age === params.retirementAge
                                    ? "font-semibold"
                                    : ""
                                }`}
                              >
                                {formatCurrency(year.pension)}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`${
                                  year.endingBalance < 0
                                    ? "text-red-600 dark:text-red-400 font-bold"
                                    : "text-indigo-700 dark:text-indigo-400"
                                } ${
                                  year.age === params.retirementAge
                                    ? "font-semibold"
                                    : ""
                                }`}
                              >
                                {formatCurrency(year.endingBalance)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Single Savings Growth Chart - Updated */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Your Savings Growth Over Time
                    </h3>
                  </div>

                  <div className="p-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData}
                          margin={{ top: 10, right: 30, left: 25, bottom: 15 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                          />
                          <XAxis
                            dataKey="age"
                            label={{
                              value: "Age",
                              position: "insideBottom",
                              offset: -10,
                            }}
                          />
                          <YAxis
                            tickFormatter={(value) => `$${value / 1000}k`}
                            label={{
                              value: "Savings",
                              angle: -90,
                              position: "insideLeft",
                              offset: -15,
                            }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend
                            wrapperStyle={{
                              color: "var(--text-gray-800)",
                              paddingTop: "1.5rem",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey={(data) =>
                              data.age < params.retirementAge ? data.savings : 0
                            }
                            stroke="#0d9488"
                            fill="#0d9488"
                            fillOpacity={0.2}
                            name="Pre-Retirement Savings"
                          />
                          <Area
                            type="monotone"
                            dataKey={(data) =>
                              data.age >= params.retirementAge
                                ? data.savings
                                : 0
                            }
                            stroke="#2563eb"
                            fill="#2563eb"
                            fillOpacity={0.3}
                            name="Retirement Savings"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>






                

                {/* Retirement Income Sustainability Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mt-6">
                  <div className="flex justify-between items-center p-4 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Your Retirement Savings Sustainability
                    </h3>
                    <Icon
                      icon="mdi:alert-circle"
                      className="text-amber-500 text-xl"
                    />
                  </div>

                  <div className="p-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData.filter(
                            (d) => d.age >= params.retirementAge
                          )}
                          margin={{ top: 10, right: 30, left: 25, bottom: 8 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                          />
                          <XAxis
                            dataKey="age"
                            label={{
                              value: "Age in Retirement",
                              position: "insideBottom",
                              offset: -10,
                            }}
                          />
                          <YAxis
                            tickFormatter={(value) => `$${value / 1000}k`}
                            label={{
                              value: "Annual Amount",
                              angle: -90,
                              position: "insideLeft",
                              offset: -15,
                            }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend
                            wrapperStyle={{
                              color: "var(--text-gray-800)",
                              paddingTop: "1.5rem",
                            }}
                          />
                          <Bar
                            dataKey="withdrawal"
                            stackId="a"
                            fill="#dc2626"
                            name="Yearly Spending"
                          />
                          <Bar
                            dataKey="savings"
                            stackId="a"
                            fill="#0d9488"
                            name="Remaining Savings"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Key Sustainability Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-amber-50 dark:bg-amber-900 rounded-lg border border-amber-200 dark:border-amber-700">
                      <div className="text-center">
                        <div className="text-md font-semibold text-amber-700 dark:text-amber-300">
                          Annual Spending Rate
                        </div>
                        <div className="text-lg font-bold text-amber-800 dark:text-amber-200">
                          {retirementSummary
                            ? (
                                ((results.find(
                                  (r) => r.age === params.retirementAge
                                )?.withdrawal || 0) /
                                  (results.find(
                                    (r) => r.age === params.retirementAge
                                  )?.endingBalance || 1)) *
                                100
                              ).toFixed(1) + "%"
                            : "N/A"}
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400">
                          (Target: 3-4%)
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-md font-semibold text-amber-700 dark:text-amber-300">
                          Years Money Will Last
                        </div>
                        <div className="text-lg font-bold text-amber-800 dark:text-amber-200">
                          {retirementSummary
                            ? results.filter(
                                (r) =>
                                  r.endingBalance > 0 &&
                                  r.age >= params.retirementAge
                              ).length + " years"
                            : "N/A"}
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400">
                          Funds last until age{" "}
                          {results.find((r) => r.endingBalance <= 0)?.age ||
                            params.lifeExpectancy}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-md font-semibold text-amber-700 dark:text-amber-300">
                          Pension Covers
                        </div>
                        <div className="text-lg font-bold text-amber-800 dark:text-amber-200">
                          {retirementSummary
                            ? (
                                ((results.find(
                                  (r) => r.age === params.retirementAge
                                )?.pension || 0) /
                                  (results.find(
                                    (r) => r.age === params.retirementAge
                                  )?.desiredIncome || 1)) *
                                100
                              ).toFixed(0) + "%"
                            : "N/A"}
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400">
                          of retirement income
                        </div>
                      </div>
                    </div>

                    {/* Sustainability Alert System */}
                    {retirementSummary &&
                      results.find((r) => r.endingBalance <= 0)?.age &&
                      results.find((r) => r.endingBalance <= 0)!.age <=
                        params.lifeExpectancy && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                          <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                            <Icon icon="mdi:alert" className="text-2xl" />
                            <span className="font-semibold text-xl">
                              Warning: Money May Run Out
                            </span>
                          </div>
                          <div className="text-red-600 dark:text-red-400 text-lg mt-1 space-y-2">
                            <p>
                              Your funds may run out at age{" "}
                              {results.find((r) => r.endingBalance <= 0)?.age},
                              which is{" "}
                              {params.lifeExpectancy -
                                (results.find((r) => r.endingBalance <= 0)
                                  ?.age || 0)}{" "}
                              years before your life expectancy.{" "}
                            </p>

                            <div className="text-green-600 dark:text-green-300 text-md mt-1 space-y-2">
                              <p>
                                💡 Not enough to retire yet? Explore how living
                                part-time abroad can help you stretch your
                                dollars, lower costs, and sustain your lifestyle
                                — without downsizing your dreams.
                              </p>

                              <p>
                                🌍 Use our Retirement Simulator and {" "}
                                <Link
                                  className="text-blue-500 hover:text-blue-700 underline"
                                  target="_blank"
                                  to="/cost-of-living-calculator"
                                >
                                  Cost of Living Comparison Calculator
                                </Link>{" "}
                                 at  <span
                                  className="font-bold"
                                >
                                  DollarFar.com
                                </span>{" "} to plan smarter and
                                see where your money goes furthest.
                              </p>

                              <p>
                                💙 RetireHow.com’s mission is to empower the
                                middle class with financial know-how and
                                immersive global living opportunities — helping
                                you retire better and live comfortably
                                wherever life takes you.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                    {retirementSummary &&
                      (!results.find((r) => r.endingBalance <= 0) ||
                        results.find((r) => r.endingBalance <= 0)!.age >
                          params.lifeExpectancy) && (
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                            <Icon icon="mdi:check-circle" className="text-xl" />
                            <span className="font-semibold">
                              Good News: Your Plan Should Work
                            </span>
                          </div>
                          <p className="text-green-600 dark:text-green-400 text-md mt-1">
                            Your retirement income plan appears sustainable
                            through your life expectancy.
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* PDF Hidden Content  */}
      <div
        ref={targetRef}
        style={{
          display: "none",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
        }}
      >
        <FixedRetirementSimulatorPDFTemplate
          params={params}
          results={results}
          retirementSummary={retirementSummary}
        />
      </div>
    </>
  );
};

export default RetirementSimulator;
