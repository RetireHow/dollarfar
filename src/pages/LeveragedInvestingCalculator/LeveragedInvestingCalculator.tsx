import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Icon } from "@iconify/react";

// Types
interface InvestmentInputs {
  // General inputs
  investmentAmount: number;
  loanInterestRate: number;
  marginalTaxRate: number;
  investmentPeriod: number;

  // Real Estate inputs
  realEstateAppreciation: number;
  rentalYield: number;
  vacancyRate: number;
  propertyTaxRate: number;
  maintenanceRate: number;
  managementFees: number;
  closingCosts: number;

  // Financial Market inputs
  marketAppreciation: number;
  dividendYield: number;
  managementFee: number;
  expenseRatio: number;

  // Stress test
  stressTestScenario: StressTestScenario;
}

type StressTestScenario = "baseline" | "recession" | "high_inflation";

interface StressMultiplier {
  realEstate: number;
  market: number;
  volatility: number;
}

interface InvestmentResult {
  finalValue: number;
  totalReturn: number;
  annualizedReturn: number;
  cashFlow: number;
  netGain: number;
}

interface Results {
  realEstate: InvestmentResult;
  market: InvestmentResult;
  breakdown: BreakdownItem[];
}

interface BreakdownItem {
  name: string;
  realEstate: number;
  market: number;
}

interface YearlyData {
  year: number;
  realEstateValue: number;
  marketValue: number;
  realEstateTotal: number;
  marketTotal: number;
  realEstateCashFlow: number;
  marketCashFlow: number;
}

interface InputConfig {
  name: keyof InvestmentInputs;
  label: string;
  suffix?: string;
  tooltip?: string;
  step?: string;
  min?: string;
  max?: string;
  category: "general" | "realEstate" | "financial";
}

interface ScenarioConfig {
  value: StressTestScenario;
  label: string;
  icon: string;
  color: "green" | "red" | "orange";
  description: string;
}

interface Metric {
  label: string;
  value: string;
  icon: string;
  description?: string;
}

// Constants
const STRESS_MULTIPLIERS: Record<string, StressMultiplier> = {
  baseline: { realEstate: 1.0, market: 1.0, volatility: 1.0 },
  recession: { realEstate: 0.7, market: 0.8, volatility: 1.5 },
  high_inflation: { realEstate: 1.2, market: 1.1, volatility: 1.3 },
};

const SCENARIOS: ScenarioConfig[] = [
  {
    value: "baseline",
    label: "Baseline",
    icon: "mdi:chart-line",
    color: "green",
    description: "Normal market conditions with average growth"
  },
  {
    value: "recession",
    label: "Recession",
    icon: "mdi:chart-line-stacked",
    color: "red",
    description: "Economic downturn with reduced growth"
  },
  {
    value: "high_inflation",
    label: "High Inflation",
    icon: "mdi:chart-areaspline",
    color: "orange",
    description: "High inflation environment with adjusted returns"
  },
];

const ALL_INPUTS: InputConfig[] = [
  // General inputs
  {
    name: "investmentAmount",
    label: "Investment Amount",
    suffix: "$",
    tooltip: "Total amount borrowed for investment",
    step: "1000",
    min: "1000",
    category: "general"
  },
  {
    name: "loanInterestRate",
    label: "Loan Interest Rate",
    suffix: "%",
    tooltip: "Annual interest rate on your loan or mortgage",
    step: "0.1",
    min: "0",
    max: "20",
    category: "general"
  },
  {
    name: "marginalTaxRate",
    label: "Marginal Tax Rate",
    suffix: "%",
    tooltip: "Your highest tax bracket percentage",
    step: "1",
    min: "0",
    max: "50",
    category: "general"
  },
  {
    name: "investmentPeriod",
    label: "Investment Period",
    suffix: "years",
    tooltip: "Number of years for the investment",
    step: "1",
    min: "1",
    max: "30",
    category: "general"
  },

  // Real Estate inputs
  {
    name: "realEstateAppreciation",
    label: "Annual Appreciation",
    suffix: "%",
    tooltip: "Expected annual property value increase",
    step: "0.1",
    min: "-5",
    max: "15",
    category: "realEstate"
  },
  {
    name: "rentalYield",
    label: "Gross Rental Yield",
    suffix: "%",
    tooltip: "Annual rental income as percentage of property value",
    step: "0.1",
    min: "0",
    max: "15",
    category: "realEstate"
  },
  {
    name: "vacancyRate",
    label: "Vacancy Rate",
    suffix: "%",
    tooltip: "Percentage of time property is vacant",
    step: "1",
    min: "0",
    max: "25",
    category: "realEstate"
  },
  {
    name: "propertyTaxRate",
    label: "Property Tax Rate",
    suffix: "%",
    tooltip: "Annual property tax as percentage of value",
    step: "0.1",
    min: "0",
    max: "3",
    category: "realEstate"
  },
  {
    name: "maintenanceRate",
    label: "Maintenance Rate",
    suffix: "%",
    tooltip: "Annual maintenance costs as percentage of value",
    step: "0.1",
    min: "0",
    max: "3",
    category: "realEstate"
  },
  {
    name: "managementFees",
    label: "Management Fees",
    suffix: "%",
    tooltip: "Property management fees percentage",
    step: "0.1",
    min: "0",
    max: "15",
    category: "realEstate"
  },
  {
    name: "closingCosts",
    label: "Closing Costs",
    suffix: "%",
    tooltip: "One-time purchase costs as percentage",
    step: "0.1",
    min: "0",
    max: "5",
    category: "realEstate"
  },

  // Financial Market inputs
  {
    name: "marketAppreciation",
    label: "Annual Appreciation",
    suffix: "%",
    tooltip: "Expected annual portfolio growth",
    step: "0.1",
    min: "-10",
    max: "15",
    category: "financial"
  },
  {
    name: "dividendYield",
    label: "Dividend Yield",
    suffix: "%",
    tooltip: "Annual dividend income as percentage",
    step: "0.1",
    min: "0",
    max: "8",
    category: "financial"
  },
  {
    name: "managementFee",
    label: "Management Fee",
    suffix: "%",
    tooltip: "Investment advisor or management fees",
    step: "0.1",
    min: "0",
    max: "2",
    category: "financial"
  },
  {
    name: "expenseRatio",
    label: "Fund Expense Ratio",
    suffix: "%",
    tooltip: "ETF or mutual fund annual expenses",
    step: "0.01",
    min: "0",
    max: "1",
    category: "financial"
  },
];

const LeveragedInvestingCalculator: React.FC = () => {
  // Initial state
  const [inputs, setInputs] = useState<InvestmentInputs>({
    // General inputs
    investmentAmount: 100000,
    loanInterestRate: 5.0,
    marginalTaxRate: 35,
    investmentPeriod: 10,

    // Real Estate inputs
    realEstateAppreciation: 4.0,
    rentalYield: 5.0,
    vacancyRate: 5,
    propertyTaxRate: 1.0,
    maintenanceRate: 1.0,
    managementFees: 8.0,
    closingCosts: 2.0,

    // Financial Market inputs
    marketAppreciation: 7.0,
    dividendYield: 2.0,
    managementFee: 0.5,
    expenseRatio: 0.2,

    // Stress test
    stressTestScenario: "baseline",
  });

  const [results, setResults] = useState<Results | null>(null);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [activeScenario, setActiveScenario] = useState<StressTestScenario>("baseline");

  // Calculate results
  const calculateResults = useCallback(() => {
    const {
      investmentAmount,
      loanInterestRate,
      marginalTaxRate,
      investmentPeriod,
      realEstateAppreciation,
      rentalYield,
      vacancyRate,
      propertyTaxRate,
      maintenanceRate,
      managementFees,
      marketAppreciation,
      dividendYield,
      managementFee,
      expenseRatio,
      stressTestScenario,
    } = inputs;

    // Apply stress test scenarios
    const multiplier = STRESS_MULTIPLIERS[stressTestScenario];

    // Real Estate Calculations
    const adjustedRealEstateAppreciation =
      realEstateAppreciation * multiplier.realEstate;
    const effectiveRentalYield = rentalYield * (1 - vacancyRate / 100);
    const annualRealEstateExpenses =
      investmentAmount *
      (propertyTaxRate / 100 + maintenanceRate / 100 + managementFees / 100);
    const annualInterestCost = investmentAmount * (loanInterestRate / 100);
    const taxDeductibleInterest = annualInterestCost * (marginalTaxRate / 100);

    const netRentalIncome =
      investmentAmount * (effectiveRentalYield / 100) -
      annualRealEstateExpenses;
    const afterTaxRentalIncome = netRentalIncome * (1 - marginalTaxRate / 100);
    const realEstateCashFlow =
      afterTaxRentalIncome - annualInterestCost + taxDeductibleInterest;

    const realEstateFinalValue =
      investmentAmount *
      Math.pow(1 + adjustedRealEstateAppreciation / 100, investmentPeriod);
    const realEstateNetGain = realEstateFinalValue - investmentAmount;
    const realEstateTotalReturn =
      realEstateNetGain + realEstateCashFlow * investmentPeriod;

    // Financial Market Calculations
    const adjustedMarketAppreciation = marketAppreciation * multiplier.market;
    const totalMarketFees = managementFee + expenseRatio;
    const netMarketReturn = adjustedMarketAppreciation - totalMarketFees;

    const annualDividendIncome = investmentAmount * (dividendYield / 100);
    const afterTaxDividendIncome =
      annualDividendIncome * (1 - (marginalTaxRate * 0.85) / 100); // Dividend tax credit
    const marketInterestTaxSavings =
      annualInterestCost * (marginalTaxRate / 100);

    const marketFinalValue =
      investmentAmount * Math.pow(1 + netMarketReturn / 100, investmentPeriod);
    const marketNetGain = marketFinalValue - investmentAmount;
    const marketCashFlowComponent =
      (afterTaxDividendIncome + marketInterestTaxSavings - annualInterestCost) *
      investmentPeriod;
    const marketTotalReturn = marketNetGain + marketCashFlowComponent;

    // Generate yearly data
    const yearly: YearlyData[] = [];
    let reValue = investmentAmount;
    let marketValue = investmentAmount;
    let reCumulativeCashFlow = 0;
    let marketCumulativeCashFlow = 0;

    for (let year = 1; year <= investmentPeriod; year++) {
      // Real Estate growth
      reValue *= 1 + adjustedRealEstateAppreciation / 100;
      reCumulativeCashFlow += realEstateCashFlow;

      // Market growth
      marketValue *= 1 + netMarketReturn / 100;
      marketCumulativeCashFlow +=
        afterTaxDividendIncome + marketInterestTaxSavings - annualInterestCost;

      yearly.push({
        year,
        realEstateValue: Math.round(reValue),
        marketValue: Math.round(marketValue),
        realEstateTotal: Math.round(reValue + reCumulativeCashFlow),
        marketTotal: Math.round(marketValue + marketCumulativeCashFlow),
        realEstateCashFlow: Math.round(realEstateCashFlow),
        marketCashFlow: Math.round(
          afterTaxDividendIncome + marketInterestTaxSavings - annualInterestCost
        ),
      });
    }

    setYearlyData(yearly);

    setResults({
      realEstate: {
        finalValue: Math.round(realEstateFinalValue),
        totalReturn: Math.round(realEstateTotalReturn),
        annualizedReturn:
          Math.round(
            (Math.pow(
              realEstateTotalReturn / investmentAmount + 1,
              1 / investmentPeriod
            ) -
              1) *
              10000
          ) / 100,
        cashFlow: Math.round(realEstateCashFlow),
        netGain: Math.round(realEstateNetGain),
      },
      market: {
        finalValue: Math.round(marketFinalValue),
        totalReturn: Math.round(marketTotalReturn),
        annualizedReturn:
          Math.round(
            (Math.pow(
              marketTotalReturn / investmentAmount + 1,
              1 / investmentPeriod
            ) -
              1) *
              10000
          ) / 100,
        cashFlow: Math.round(marketCashFlowComponent / investmentPeriod),
        netGain: Math.round(marketNetGain),
      },
      breakdown: [
        {
          name: "Principal Growth",
          realEstate: Math.round(realEstateNetGain),
          market: Math.round(marketNetGain),
        },
        {
          name: "Cash Flow",
          realEstate: Math.round(realEstateCashFlow * investmentPeriod),
          market: Math.round(marketCashFlowComponent),
        },
        {
          name: "Tax Savings",
          realEstate: Math.round(taxDeductibleInterest * investmentPeriod),
          market: Math.round(marketInterestTaxSavings * investmentPeriod),
        },
      ],
    });
  }, [inputs]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const handleInputChange = (name: keyof InvestmentInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const handleScenarioChange = (scenario: StressTestScenario) => {
    setInputs((prev) => ({
      ...prev,
      stressTestScenario: scenario,
    }));
    setActiveScenario(scenario);
  };

  const renderInputSection = (title: string, category: "general" | "realEstate" | "financial") => {
    const categoryInputs = ALL_INPUTS.filter(input => input.category === category);
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <Icon 
            icon={
              category === "general" ? "mdi:settings" : 
              category === "realEstate" ? "mdi:home" : "mdi:chart-line"
            } 
            className="mr-2" 
          />
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryInputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
                {input.tooltip && (
                  <Icon
                    icon="mdi:information-outline"
                    className="ml-1 inline text-gray-400 cursor-help"
                  />
                )}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={inputs[input.name]}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  step={input.step || "0.1"}
                  min={input.min || "0"}
                  max={input.max}
                />
                {input.suffix && (
                  <span className="absolute right-3 top-2 text-gray-500">
                    {input.suffix}
                  </span>
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                {input.min && <span>Min: {input.min}{input.suffix}</span>}
                {input.max && <span>Max: {input.max}{input.suffix}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderScenarioButton = (scenario: ScenarioConfig) => {
    const isActive = activeScenario === scenario.value;
    const colorClasses = {
      green: isActive
        ? "border-green-500 bg-green-50 ring-2 ring-green-200"
        : "border-gray-200 hover:border-green-300 bg-white",
      red: isActive
        ? "border-red-500 bg-red-50 ring-2 ring-red-200"
        : "border-gray-200 hover:border-red-300 bg-white",
      orange: isActive
        ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
        : "border-gray-200 hover:border-orange-300 bg-white",
    };

    const textColors = {
      green: "text-green-700",
      red: "text-red-700",
      orange: "text-orange-700"
    };

    return (
      <button
        key={scenario.value}
        onClick={() => handleScenarioChange(scenario.value)}
        className={`p-4 rounded-lg border-2 transition-all text-left ${colorClasses[scenario.color]}`}
      >
        <div className="flex items-start space-x-3">
          <Icon
            icon={scenario.icon}
            className={`text-${scenario.color}-500 text-xl mt-1 flex-shrink-0`}
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{scenario.label}</div>
            <div className={`text-sm mt-1 ${textColors[scenario.color]}`}>
              {scenario.description}
            </div>
          </div>
          {isActive && (
            <Icon 
              icon="mdi:check-circle" 
              className={`text-${scenario.color}-500 text-lg flex-shrink-0`}
            />
          )}
        </div>
      </button>
    );
  };

  const renderMetricCard = (
    title: string,
    icon: string,
    borderColor: string,
    metrics: Metric[]
  ) => (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${borderColor} hover:shadow-lg transition-shadow`}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Icon icon={icon} className="mr-2" />
        {title}
      </h3>
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <span className="text-gray-600 flex items-center">
              <Icon icon={metric.icon} className="mr-2 text-gray-400" />
              {metric.label}
            </span>
            <span className="font-semibold text-gray-900 text-lg">
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const getWinningStrategy = () => {
    if (!results) return null;
    return results.realEstate.totalReturn > results.market.totalReturn ? "realEstate" : "market";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Icon icon="mdi:calculator" className="text-3xl text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Leveraged Investing Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compare leveraging for real estate vs. financial markets. Understand
            the true costs, benefits, and risks of each strategy.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Inputs Column */}
          <div className="xl:col-span-2 space-y-6">
            {/* Stress Test Selector */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Icon icon="mdi:weather-cloudy" className="mr-2 text-blue-500" />
                Market Scenario
              </h3>
              <p className="text-gray-600 mb-4">Select a market condition to see how it affects your investments:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SCENARIOS.map(renderScenarioButton)}
              </div>
            </div>

            {/* All Input Sections */}
            {renderInputSection("General Investment Parameters", "general")}
            {renderInputSection("Real Estate Investment", "realEstate")}
            {renderInputSection("Financial Markets Investment", "financial")}
          </div>

          {/* Results Column */}
          <div className="space-y-6">
            {results && (
              <>
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Icon icon="mdi:trophy" className="mr-2" />
                    Investment Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Winning Strategy:</span>
                      <span className="font-bold text-lg">
                        {getWinningStrategy() === "realEstate" ? "🏠 Real Estate" : "📈 Financial Markets"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Difference:</span>
                      <span className="font-bold">
                        ${Math.abs(results.realEstate.totalReturn - results.market.totalReturn).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Period:</span>
                      <span className="font-bold">{inputs.investmentPeriod} years</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="space-y-4">
                  {renderMetricCard(
                    "Real Estate Investment",
                    "mdi:home",
                    "border-blue-500",
                    [
                      {
                        label: "Final Value",
                        value: `$${results.realEstate.finalValue.toLocaleString()}`,
                        icon: "mdi:currency-usd",
                      },
                      {
                        label: "Total Return",
                        value: `$${results.realEstate.totalReturn.toLocaleString()}`,
                        icon: "mdi:trending-up",
                      },
                      {
                        label: "Annual Return",
                        value: `${results.realEstate.annualizedReturn}%`,
                        icon: "mdi:chart-line",
                      },
                      {
                        label: "Annual Cash Flow",
                        value: `$${results.realEstate.cashFlow.toLocaleString()}`,
                        icon: "mdi:cash",
                      },
                    ]
                  )}

                  {renderMetricCard(
                    "Financial Markets Investment",
                    "mdi:chart-bar",
                    "border-green-500",
                    [
                      {
                        label: "Final Value",
                        value: `$${results.market.finalValue.toLocaleString()}`,
                        icon: "mdi:currency-usd",
                      },
                      {
                        label: "Total Return",
                        value: `$${results.market.totalReturn.toLocaleString()}`,
                        icon: "mdi:trending-up",
                      },
                      {
                        label: "Annual Return",
                        value: `${results.market.annualizedReturn}%`,
                        icon: "mdi:chart-line",
                      },
                      {
                        label: "Annual Cash Flow",
                        value: `$${results.market.cashFlow.toLocaleString()}`,
                        icon: "mdi:cash",
                      },
                    ]
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Charts Section */}
        {results && (
          <div className="mt-8 space-y-8">
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Value Growth Over Time */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <Icon icon="mdi:chart-line" className="mr-2 text-blue-500" />
                  Portfolio Value Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        `$${value.toLocaleString()}`
                      }
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="realEstateValue"
                      stroke="#0088FE"
                      name="Real Estate"
                      strokeWidth={3}
                      dot={{ fill: '#0088FE', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="marketValue"
                      stroke="#00C49F"
                      name="Financial Markets"
                      strokeWidth={3}
                      dot={{ fill: '#00C49F', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Return Breakdown */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <Icon icon="mdi:chart-bar" className="mr-2 text-green-500" />
                  Return Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.breakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        `$${value.toLocaleString()}`
                      }
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="realEstate"
                      name="Real Estate"
                      fill="#0088FE"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="market"
                      name="Financial Markets"
                      fill="#00C49F"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Total Return Comparison */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Icon icon="mdi:scale-balance" className="mr-2 text-purple-500" />
                Total Return Comparison
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    {
                      name: "Real Estate",
                      value: results.realEstate.totalReturn,
                    },
                    {
                      name: "Financial Markets",
                      value: results.market.totalReturn,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="value" name="Total Return" radius={[4, 4, 0, 0]}>
                    <Cell fill="#0088FE" />
                    <Cell fill="#00C49F" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-900 flex items-center">
                <Icon icon="mdi:lightbulb-on" className="mr-2 text-yellow-500" />
                Key Insights & Considerations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-800 flex items-center">
                    <Icon icon="mdi:home" className="mr-2" />
                    Real Estate Advantages
                  </h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <Icon icon="mdi:check-circle" className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                      <span>Leverage amplifies returns in rising markets</span>
                    </li>
                    <li className="flex items-start">
                      <Icon icon="mdi:check-circle" className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                      <span>Tax benefits from mortgage interest deduction</span>
                    </li>
                    <li className="flex items-start">
                      <Icon icon="mdi:check-circle" className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                      <span>Rental income provides cash flow</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-800 flex items-center">
                    <Icon icon="mdi:chart-line" className="mr-2" />
                    Financial Markets Advantages
                  </h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <Icon icon="mdi:check-circle" className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                      <span>Higher liquidity and easier exit</span>
                    </li>
                    <li className="flex items-start">
                      <Icon icon="mdi:check-circle" className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                      <span>Instant diversification across assets</span>
                    </li>
                    <li className="flex items-start">
                      <Icon icon="mdi:check-circle" className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                      <span>Lower ongoing management requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeveragedInvestingCalculator;