import React, { useState, useEffect } from 'react';
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
  ResponsiveContainer
} from 'recharts';
import { Icon } from '@iconify/react';

// Define TypeScript interfaces
interface CalculatorInputs {
  startingAmount: number | '';
  grossReturn: number | '';
  advisorFee: number | '';
  taxRate: number | '';
  inflation: number | '';
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
  value: number | '';
  icon: string;
  min: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>): void => {
    e.currentTarget.blur();
  };

// Main component
const NetIncomeYieldCalculator: React.FC = () => {
  // Default values matching the example
  const [inputs, setInputs] = useState<CalculatorInputs>({
    startingAmount: 10000,
    grossReturn: 10,
    advisorFee: 1,
    taxRate: 25,
    inflation: 3
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Calculate results when inputs change
  useEffect(() => {
    // Check if all inputs have valid values
    const allInputsValid = Object.values(inputs).every(
      value => value !== '' && !isNaN(Number(value)) && Number(value) > 0
    );
    
    if (allInputsValid) {
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
      } catch (error) {
        console.error("Calculation error:", error);
        setResults(null);
        setIsCalculated(false);
      }
    } else {
      setResults(null);
      setIsCalculated(false);
    }
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Allow empty value or valid number
    if (value === '') {
      setInputs(prev => ({
        ...prev,
        [name]: ''
      }));
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setInputs(prev => ({
          ...prev,
          [name]: numValue
        }));
      }
    }
  };

  // Data for visualization
  const incomeDistributionData = results ? [
    { name: 'Net Income', value: parseFloat(results.netIncome) },
    { name: 'Taxes', value: parseFloat(results.taxes) },
    { name: 'Advisor Fees', value: parseFloat(results.advisorFeeCost) },
  ] : [];

  const comparisonData = results ? [
    { name: 'Gross Return', value: parseFloat(results.grossIncome) },
    { name: 'Net Return', value: parseFloat(results.netIncome) },
  ] : [];

  const COLORS = ['#10B981', '#EF4444', '#8B5CF6'];

  // Input configuration
  const inputConfigs: InputConfig[] = [
    {
      label: "Starting Amount",
      name: "startingAmount",
      value: inputs.startingAmount,
      icon: "mdi:cash",
      min: 1,
      step: 100,
      prefix: "$"
    },
    {
      label: "Gross Return (%)",
      name: "grossReturn",
      value: inputs.grossReturn,
      icon: "mdi:trending-up",
      min: 0,
      step: 0.1,
      suffix: "%"
    },
    {
      label: "Advisor Fee (%)",
      name: "advisorFee",
      value: inputs.advisorFee,
      icon: "mdi:account-cash",
      min: 0,
      step: 0.1,
      suffix: "%"
    },
    {
      label: "Tax Rate (%)",
      name: "taxRate",
      value: inputs.taxRate,
      icon: "mdi:bank",
      min: 0,
      step: 0.1,
      suffix: "%"
    },
    {
      label: "Inflation (%)",
      name: "inflation",
      value: inputs.inflation,
      icon: "mdi:chart-line",
      min: 0,
      step: 0.1,
      suffix: "%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Net Income Yield Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your investment returns after accounting for fees, taxes, and inflation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Icon icon="mdi:calculator" className="mr-2 text-indigo-600" />
              Investment Parameters
            </h2>

            <div className="space-y-6">
              {inputConfigs.map((input, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Icon icon={input.icon} className="mr-1 text-indigo-500" />
                    {input.label}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    {input.prefix && (
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{input.prefix}</span>
                      </div>
                    )}
                    <input
                      type="number"
                      name={input.name}
                      value={input.value}
                      onChange={handleInputChange}
                      onWheel={handleWheel}
                      min={input.min}
                      step={input.step}
                      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full ${input.prefix ? 'pl-7' : 'pl-4'} pr-12 py-3 sm:text-sm border-gray-300 rounded-md border`}
                      placeholder="Enter value"
                    />
                    {input.suffix && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{input.suffix}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 flex items-center">
                <Icon icon="mdi:information" className="mr-2" />
                How It Works
              </h3>
              <p className="text-sm text-blue-600 mt-2">
                This calculator determines your net investment yield after accounting for advisor fees, taxes, and inflation. 
                The real net yield shows your actual purchasing power increase.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Icon icon="mdi:chart-arc" className="mr-2 text-indigo-600" />
              Results
            </h2>

            {isCalculated && results ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">Nominal Net Yield</p>
                    <p className="text-2xl font-bold text-green-800">{results.nominalNetYield}%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700">Real Net Yield (Inflation Adjusted)</p>
                    <p className="text-2xl font-bold text-purple-800">{results.realNetYield}%</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Income Breakdown</h3>
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
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {incomeDistributionData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Gross vs Net Return</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisonData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} 
                        />
                        <Legend />
                        <Bar dataKey="value" fill="#4F46E5" name="Return Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Gross Income:</span>
                    <span className="font-semibold">${results.grossIncome}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Advisor Fees:</span>
                    <span className="font-semibold">${results.advisorFeeCost}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Taxable Income:</span>
                    <span className="font-semibold">${results.taxableIncome}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Taxes:</span>
                    <span className="font-semibold">${results.taxes}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-700 font-medium">Net Income:</span>
                    <span className="font-bold text-green-800">${results.netIncome}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-96">
                <Icon icon="mdi:calculator-variant" className="text-gray-300 text-6xl mb-4" />
                <p className="text-gray-500 text-center">
                  {Object.values(inputs).some(val => val === '') 
                    ? "Please complete all fields to see results" 
                    : "Enter your investment parameters to see results"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
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
    realNetYield: realNetYield.toFixed(2)
  };
}

export default NetIncomeYieldCalculator;