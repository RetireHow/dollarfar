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

// Calculation function (unchanged)
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
  const totalYears = lifeExpectancy - currentAge;

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
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <p className="font-bold text-gray-800">Age: {label}</p>
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
const RetirementCalculator: React.FC = () => {
  // Default parameters
  const defaultParams: RetirementParams = {
    currentAge: 40,
    annualIncome: 50000,
    inflationRate: 0.03,
    currentSavings: 60000,
    annualSavings: 15000,
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
    annualSavings: "15,000",
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

  // Get retirement summary (updated with annual-based savings calculation)
  const getRetirementSummary = () => {
    const retirementYear = results.findIndex(
      (item) => item.age === params.retirementAge
    );
    if (retirementYear === -1) return null;

    const retirementDuration = params.lifeExpectancy - params.retirementAge;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Simplified Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-700 p-4 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Icon icon="mdi:finance" className="text-3xl" />
            Retirement Simulation Calculator
          </h1>
        </div>

        <div className="flex flex-col">
          {/* Form and Status Side by Side */}
          <div className="flex flex-col lg:flex-row">
            {/* Input Form */}
            <div className="p-6 border-b border-gray-200 lg:w-2/3 lg:border-r lg:border-b-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Icon icon="mdi:calculator" className="text-teal-600" />
                Your Financial Information
              </h2>

              <div className="grid md:grid-cols-2 md:gap-3 gap-8">
                {/* Current Situation */}
                <div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Current Age
                      </label>
                      <input
                        type="text"
                        name="currentAge"
                        value={displayValues.currentAge}
                        onChange={handleInputChange}
                        onWheel={handleWheel}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                        min="18"
                        max="100"
                        title="Your current age"
                      />
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Current Annual Income
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          name="annualIncome"
                          value={displayValues.annualIncome}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                          title="Your current yearly earnings before taxes"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Current Retirement Savings
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          name="currentSavings"
                          value={displayValues.currentSavings}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                          title="Total amount you have saved for retirement so far"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Annual Savings Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          name="annualSavings"
                          value={displayValues.annualSavings}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                          title="How much you save each year for retirement"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Annual Savings Increases (%)
                      </label>
                      <div className="relative">
                        <span className="absolute right-3 top-3 text-gray-500">
                          %
                        </span>
                        <input
                          type="text"
                          name="savingsIncreaseRate"
                          value={displayValues.savingsIncreaseRate}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                          title="How much your savings contributions increase each year"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Expected Annual Investment Return (%)
                      </label>
                      <div className="relative">
                        <span className="absolute right-3 top-3 text-gray-500">
                          %
                        </span>
                        <input
                          type="text"
                          name="investmentReturn"
                          value={displayValues.investmentReturn}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
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
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Desired Retirement Age
                      </label>
                      <input
                        type="text"
                        name="retirementAge"
                        value={displayValues.retirementAge}
                        onChange={handleInputChange}
                        onWheel={handleWheel}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                        min={params.currentAge + 1}
                        max="100"
                        title="The age you plan to retire"
                      />
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Expected Life Expectancy
                      </label>
                      <input
                        type="text"
                        name="lifeExpectancy"
                        value={displayValues.lifeExpectancy}
                        onChange={handleInputChange}
                        onWheel={handleWheel}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                        min={params.retirementAge + 1}
                        max="120"
                        title="How long you expect to live (plan conservatively)"
                      />
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Annual Inflation and Income Increases (%)
                      </label>
                      <div className="relative">
                        <span className="absolute right-3 top-3 text-gray-500">
                          %
                        </span>
                        <input
                          type="text"
                          name="inflationRate"
                          value={displayValues.inflationRate}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                          title="Average yearly increase in living costs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Desired Income in Retirement (% of final salary)
                      </label>
                      <div className="relative">
                        <span className="absolute right-3 top-3 text-gray-500">
                          %
                        </span>
                        <input
                          type="text"
                          name="incomeReplacementRate"
                          value={displayValues.incomeReplacementRate}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                          title="Percentage of your pre-retirement income you'll need annually in retirement"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Expected Annual Pension at Retirement Age
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          name="annualPension"
                          value={displayValues.annualPension}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
                          title="Annual pension or Social Security income at start of retirement"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md font-medium text-gray-700 mb-1">
                        Annual Pension Increase (%)
                      </label>
                      <div className="relative">
                        <span className="absolute right-3 top-3 text-gray-500">
                          %
                        </span>
                        <input
                          type="text"
                          name="pensionIncreaseRate"
                          value={displayValues.pensionIncreaseRate}
                          onChange={handleInputChange}
                          onWheel={handleWheel}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow shadow-sm hover:shadow-md"
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
                <h3 className="text-xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                  <Icon icon="mdi:chart-line" className="text-teal-600" />
                  Retirement Status
                </h3>

                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg border border-teal-200 shadow-sm">
                  {/* Consolidated Status Indicator */}
                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      retirementSummary.isOnTrack
                        ? "bg-green-50 border-2 border-green-200"
                        : "bg-amber-50 border-2 border-amber-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-1 ${
                          retirementSummary.isOnTrack
                            ? "text-green-800"
                            : "text-amber-800"
                        }`}
                      >
                        <h4
                          className={`font-bold text-lg mb-2 ${
                            retirementSummary.isOnTrack
                              ? "text-green-800"
                              : "text-amber-800"
                          }`}
                        >
                          {retirementSummary.isOnTrack
                            ? "🎉 You're on track!"
                            : "💡 Action needed"}
                        </h4>

                        {/* Gap/Surplus Display */}
                        <div className="bg-white p-3 rounded-lg shadow-sm border mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-600">
                              Projected Savings:
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              {formatCurrency(
                                retirementSummary.totalProjectedSavings
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-600">
                              Required Nest Egg:
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              {formatCurrency(
                                retirementSummary.nestEggRequired
                              )}
                            </span>
                          </div>
                          <hr className="my-1 border-gray-200" />
                          <div className="flex justify-between items-center">
                            <span
                              className={`font-bold text-lg ${
                                retirementSummary.isOnTrack
                                  ? "text-green-700"
                                  : "text-amber-700"
                              }`}
                            >
                              {retirementSummary.isOnTrack
                                ? "Surplus"
                                : "Shortfall"}
                            </span>
                            <span
                              className={`text-xl font-bold ${
                                retirementSummary.isOnTrack
                                  ? "text-green-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {retirementSummary.isOnTrack
                                ? `+${formatCurrency(
                                    retirementSummary.totalProjectedSavings -
                                      retirementSummary.nestEggRequired
                                  )}`
                                : `-${formatCurrency(
                                    retirementSummary.nestEggRequired -
                                      retirementSummary.totalProjectedSavings
                                  )}`}
                            </span>
                          </div>
                        </div>

                        {/* Actionable Advice - Shortened */}
                        <p
                          className={`text-md ${
                            retirementSummary.isOnTrack
                              ? "text-green-700"
                              : "text-amber-700"
                          }`}
                        >
                          {retirementSummary.isOnTrack
                            ? `You'll have ${formatCurrency(
                                retirementSummary.totalProjectedSavings -
                                  retirementSummary.nestEggRequired
                              )} extra at retirement.`
                            : `Increase savings by ${formatCurrency(
                                retirementSummary.monthlySavingsNeeded
                              )}/month to get on track.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Single Progress Bar */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-800 text-md">
                      Progress Toward Goal
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
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
                    <p className="text-xs text-gray-600 text-center">
                      {(
                        (retirementSummary.totalProjectedSavings /
                          retirementSummary.nestEggRequired) *
                        100
                      ).toFixed(0)}
                      % complete
                    </p>
                  </div>

                  {/* Essential Metrics - Reduced to 2 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                      <div className="text-teal-600 text-md font-bold mb-1">
                        Required Additional Yearly Savings
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(retirementSummary.yearlySavingsNeeded)}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                      <div className="text-teal-600 text-md font-bold mb-1">
                        Projected Annual Retirement Income
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(
                          retirementSummary.annualRetirementIncome
                        )}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                      <div className="text-teal-600 text-md font-bold mb-1">
                        Years Until Retirement
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {params.retirementAge - params.currentAge}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                      <div className="text-teal-600 text-md font-bold mb-1">
                        Years of Retirement Fund
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {params.lifeExpectancy - params.retirementAge}
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
              {/* Original Data Table - UNCHANGED */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800">
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
                          Beginning <br /> Balance
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-md">
                          Interest
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-md">
                          Yearly <br /> Savings
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-md">
                          Retirement <br /> Income
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-md">
                          Pension <br /> Income
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-md">
                          Withdrawal
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-md">
                          Ending <br /> Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {displayData.map((year, index) => (
                        <tr
                          key={year.age}
                          className={`hover:bg-gray-50 transition-colors ${
                            year.age === params.retirementAge
                              ? "bg-gradient-to-r from-teal-100 to-blue-100 border-l-4 border-teal-500 font-semibold"
                              : index % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3">
                            <span
                              className={`font-medium ${
                                year.age === params.retirementAge
                                  ? "text-teal-800"
                                  : "text-gray-900"
                              }`}
                            >
                              {year.age}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`font-medium ${
                                year.age === params.retirementAge
                                  ? "text-teal-800"
                                  : ""
                              }`}
                            >
                              {formatCurrency(year.salary)}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`font-medium ${
                                year.age === params.retirementAge
                                  ? "text-teal-800"
                                  : ""
                              }`}
                            >
                              {formatCurrency(year.beginningBalance)}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`font-medium text-green-600 ${
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
                              className={`font-medium ${
                                year.age === params.retirementAge
                                  ? "text-teal-800"
                                  : ""
                              }`}
                            >
                              {formatCurrency(year.savings)}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`font-medium ${
                                year.age === params.retirementAge
                                  ? "text-teal-800"
                                  : ""
                              }`}
                            >
                              {formatCurrency(year.desiredIncome)}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`font-medium text-purple-600 ${
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
                              className={`font-medium ${
                                year.withdrawal > 0 ? "text-amber-600" : ""
                              } ${
                                year.age === params.retirementAge
                                  ? "font-semibold"
                                  : ""
                              }`}
                            >
                              {formatCurrency(year.withdrawal)}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`font-medium ${
                                year.endingBalance < 0
                                  ? "text-red-600 font-bold"
                                  : "text-indigo-700"
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

              {/* Single Savings Growth Chart */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Retirement Savings Growth Projection
                  </h3>
                </div>

                <div className="p-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 25, bottom: 15 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
                        <Area
                          type="monotone"
                          dataKey="savings"
                          stroke="#0d9488"
                          fill="#0d9488"
                          fillOpacity={0.2}
                          name="Retirement Savings"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Retirement Income Sustainability Chart */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Retirement Income Sustainability Analysis
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
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
                          name="Portfolio Withdrawals"
                        />
                        <Bar
                          dataKey="savings"
                          stackId="a"
                          fill="#0d9488"
                          name="Portfolio Balance"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Key Sustainability Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="text-center">
                      <div className="text-md font-semibold text-amber-700">
                        Safe Withdrawal Rate
                      </div>
                      <div className="text-lg font-bold text-amber-800">
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
                      <div className="text-xs text-amber-600">
                        (Target: 3-4%)
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-md font-semibold text-amber-700">
                        Portfolio Longevity
                      </div>
                      <div className="text-lg font-bold text-amber-800">
                        {retirementSummary
                          ? results.filter(
                              (r) =>
                                r.endingBalance > 0 &&
                                r.age >= params.retirementAge
                            ).length + " years"
                          : "N/A"}
                      </div>
                      <div className="text-xs text-amber-600">
                        Funds last until age{" "}
                        {results.find((r) => r.endingBalance <= 0)?.age ||
                          params.lifeExpectancy}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-md font-semibold text-amber-700">
                        Pension Coverage
                      </div>
                      <div className="text-lg font-bold text-amber-800">
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
                      <div className="text-xs text-amber-600">
                        of retirement income
                      </div>
                    </div>
                  </div>

                  {/* Sustainability Alert System */}
                  {retirementSummary &&
                    results.find((r) => r.endingBalance <= 0)?.age &&
                    results.find((r) => r.endingBalance <= 0)!.age <
                      params.lifeExpectancy && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 text-red-700">
                          <Icon icon="mdi:alert" className="text-xl" />
                          <span className="font-semibold">
                            Sustainability Warning
                          </span>
                        </div>
                        <p className="text-red-600 text-md mt-1">
                          Your funds may run out at age{" "}
                          {results.find((r) => r.endingBalance <= 0)?.age},
                          which is{" "}
                          {params.lifeExpectancy -
                            (results.find((r) => r.endingBalance <= 0)?.age ||
                              0)}{" "}
                          years before your life expectancy. Consider reducing
                          withdrawals or working longer.
                        </p>
                      </div>
                    )}

                  {retirementSummary &&
                    (!results.find((r) => r.endingBalance <= 0) ||
                      results.find((r) => r.endingBalance <= 0)!.age >=
                        params.lifeExpectancy) && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <Icon icon="mdi:check-circle" className="text-xl" />
                          <span className="font-semibold">
                            Sustainable Plan
                          </span>
                        </div>
                        <p className="text-green-600 text-md mt-1">
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
    </div>
  );
};

export default RetirementCalculator;
