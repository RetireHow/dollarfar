import React, { useState, useEffect } from 'react';

export const MortgageCalculator = () => {
  // Input state
  const [inputs, setInputs] = useState({
    mortgageAmount: 100000,
    interestRate: 5,
    amortizationPeriod: 25,
    paymentFrequency: 'Monthly',
    term: 5,
    startWithPayment: 1,
    prepaymentAmount: 0,
    prepaymentFrequency: 'None'
  });

  // Results state
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Map UI frequency values to calculation function values
  const frequencyMap = {
    'Monthly': 'monthly',
    'Bi-Weekly': 'bi-weekly',
    'Accelerated Bi-Weekly': 'bi-weekly',
    'Weekly': 'weekly'
  };

  const prepaymentFrequencyMap = {
    'None': 'one-time',
    'Each year': 'each-year',
    'Each month': 'same-as-regular',
    'Each payment': 'same-as-regular'
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'mortgageAmount' || name === 'prepaymentAmount' 
        ? parseFloat(value.replace(/,/g, '')) || 0
        : parseFloat(value) || 0
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate mortgage payment (standard formula)
  const calculatePayment = (principal, rate, years, frequency) => {
    const paymentsPerYear = frequency === 'Monthly' ? 12 :
                          frequency === 'Bi-Weekly' ? 26 :
                          frequency === 'Weekly' ? 52 : 12;
    const periodicRate = rate / 100 / paymentsPerYear;
    const totalPayments = years * paymentsPerYear;
    
    // Handle accelerated bi-weekly (half of monthly payment)
    if (frequency === 'Accelerated Bi-Weekly') {
      const monthlyPayment = principal * 
        (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
        (Math.pow(1 + periodicRate, totalPayments) - 1);
      return monthlyPayment / 2;
    }
    
    return principal * 
      (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
      (Math.pow(1 + periodicRate, totalPayments) - 1);
  };

  // Calculate amortization schedule
  const calculateAmortization = () => {
    setLoading(true);
    setError(null);
    
    try {
      const {
        mortgageAmount,
        interestRate,
        amortizationPeriod,
        paymentFrequency,
        term,
        prepaymentAmount,
        prepaymentFrequency,
        startWithPayment
      } = inputs;

      // Calculate base payment amount
      const payment = calculatePayment(
        mortgageAmount,
        interestRate,
        amortizationPeriod,
        paymentFrequency
      );

      // Determine payment frequency details
      const paymentsPerYear = paymentFrequency === 'Monthly' ? 12 :
                            paymentFrequency === 'Bi-Weekly' ? 26 :
                            paymentFrequency === 'Weekly' ? 52 : 12;
      const termPayments = term * paymentsPerYear;
      const amortizationPayments = amortizationPeriod * paymentsPerYear;
      const periodicRate = interestRate / 100 / paymentsPerYear;

      // Initialize tracking variables
      let balance = mortgageAmount;
      let termPrincipal = 0;
      let termInterest = 0;
      let amortizationPrincipal = 0;
      let amortizationInterest = 0;
      let termPrepayment = 0;
      let amortizationPrepayment = 0;
      let prepaymentCount = 0;

      // Track prepayment schedule
      let nextPrepaymentYear = 1;
      let actualPayments = 0;

      // Calculate amortization with prepayments
      for (let i = 1; i <= amortizationPayments; i++) {
        if (balance <= 0) break;

        const interestPayment = balance * periodicRate;
        let principalPayment = payment - interestPayment;

        // Apply prepayments if applicable
        let currentPrepayment = 0;
        if (prepaymentAmount > 0 && prepaymentFrequency !== 'None') {
          const currentYear = Math.ceil(i / paymentsPerYear);
          const isPrepaymentDue = 
            (prepaymentFrequency === 'Each payment' && i >= startWithPayment) ||
            (prepaymentFrequency === 'Each month' && i % (paymentsPerYear / 12) === 0 && i >= startWithPayment) ||
            (prepaymentFrequency === 'Each year' && currentYear === nextPrepaymentYear && currentYear <= amortizationYears && i >= startWithPayment);

          if (isPrepaymentDue) {
            currentPrepayment = Math.min(prepaymentAmount, balance - principalPayment);
            principalPayment += currentPrepayment;
            prepaymentCount++;
            if (prepaymentFrequency === 'Each year') {
              nextPrepaymentYear++;
            }
          }
        }

        // Ensure we don't overpay
        principalPayment = Math.min(principalPayment, balance);
        
        // Update balances
        balance -= principalPayment;
        actualPayments++;
        
        // Track totals
        if (i <= termPayments) {
          termPrincipal += principalPayment;
          termInterest += interestPayment;
          termPrepayment += currentPrepayment;
        }
        amortizationPrincipal += principalPayment;
        amortizationInterest += interestPayment;
        amortizationPrepayment += currentPrepayment;
      }

      // Calculate time saved
      const actualAmortizationYears = actualPayments / paymentsPerYear;
      const yearsSaved = amortizationPeriod - actualAmortizationYears;
      const paymentsSaved = amortizationPayments - actualPayments;

      // Calculate interest savings vs no prepayment scenario
      const noPrepaymentInterest = calculatePayment(
        mortgageAmount,
        interestRate,
        amortizationPeriod,
        paymentFrequency
      ) * amortizationPayments - mortgageAmount;

      const interestSavings = noPrepaymentInterest - amortizationInterest;

      // Prepare results
      const result = {
        paymentAmount: payment,
        termPayments,
        amortizationPayments: actualPayments,
        termPrincipal,
        amortizationPrincipal,
        termInterest,
        amortizationInterest,
        termPrepayment,
        amortizationPrepayment,
        prepaymentCount,
        yearsSaved,
        paymentsSaved,
        interestSavings,
        totalTermCost: termPrincipal + termInterest,
        totalAmortizationCost: amortizationPrincipal + amortizationInterest
      };

      setResults(result);
    } catch (err) {
      setError('An error occurred during calculation. Please check your inputs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate on mount and when inputs change
  useEffect(() => {
    calculateAmortization();
  }, [inputs]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${parseFloat(value).toFixed(1)}%`;
  };

  // Render the results
  const renderResults = () => {
    if (loading) {
      return <div className="text-center py-8">Calculating...</div>;
    }

    if (error) {
      return <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>;
    }

    if (!results) return null;

    const {
      paymentAmount,
      termPayments,
      amortizationPayments,
      termPrincipal,
      amortizationPrincipal,
      termInterest,
      amortizationInterest,
      termPrepayment,
      amortizationPrepayment,
      yearsSaved,
      paymentsSaved,
      interestSavings,
      totalTermCost,
      totalAmortizationCost
    } = results;

    // Calculate visualization percentages
    const costPercentage = (totalTermCost / totalAmortizationCost * 100).toFixed(1);
    const principalPercentage = (termPrincipal / totalTermCost * 100).toFixed(1);
    const interestPercentage = (termInterest / totalTermCost * 100).toFixed(1);
    const prepaymentPercentage = (termPrepayment / totalTermCost * 100).toFixed(1);

    return (
      <>
        {/* Summary Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2 text-sm font-medium text-gray-500 uppercase">Category</th>
                <th className="text-right pb-2 text-sm font-medium text-gray-500 uppercase">Term</th>
                <th className="text-right pb-2 text-sm font-medium text-gray-500 uppercase">Amortization</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-sm text-gray-700">Number of Payments</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{termPayments}</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{amortizationPayments}</td>
              </tr>

              <tr className="bg-blue-50">
                <td className="py-2 text-sm text-gray-700">Mortgage Payment</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{formatCurrency(paymentAmount)}</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{formatCurrency(paymentAmount)}</td>
              </tr>

              <tr>
                <td className="py-2 text-sm text-gray-700">Prepayment</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{formatCurrency(termPrepayment)}</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{formatCurrency(amortizationPrepayment)}</td>
              </tr>

              <tr className="bg-blue-50">
                <td className="py-2 text-sm text-gray-700">Principal Payments</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{formatCurrency(termPrincipal)}</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{formatCurrency(amortizationPrincipal)}</td>
              </tr>

              <tr>
                <td className="py-2 text-sm text-gray-700">Interest Payments</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{formatCurrency(termInterest)}</td>
                <td className="py-2 text-right font-mono text-sm text-gray-900">{formatCurrency(amortizationInterest)}</td>
              </tr>

              <tr className="border-t border-gray-200 bg-teal-50">
                <td className="py-2 text-sm font-medium text-teal-800">Total Cost</td>
                <td className="py-2 text-right font-mono text-sm font-semibold text-teal-900">{formatCurrency(totalTermCost)}</td>
                <td className="py-2 text-right font-mono text-sm font-semibold text-teal-900">{formatCurrency(totalAmortizationCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Visual Comparison */}
        <div className="mt-8 space-y-2">
          <h3 className="text-md font-medium text-blue-900">Cost Comparison</h3>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{inputs.term}-year Term</span>
            <span>{yearsSaved.toFixed(1)} years saved</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-teal-400"
              style={{ width: `${costPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-blue-600">{costPercentage}% of total</span>
            <span className="text-teal-600">Full amortization</span>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="mt-8 space-y-2">
          <h3 className="text-md font-medium text-blue-900">Payment Breakdown</h3>
          <div className="h-32 sm:h-40 bg-gray-100 rounded-lg flex items-end">
            <div
              className="bg-blue-400 rounded-t"
              style={{ 
                height: `${principalPercentage}%`,
                width: '33.33%'
              }}
              title="Principal"
            ></div>
            <div
              className="bg-orange-400 rounded-t"
              style={{ 
                height: `${interestPercentage}%`,
                width: '33.33%'
              }}
              title="Interest"
            ></div>
            <div
              className="bg-teal-400 rounded-t"
              style={{ 
                height: `${prepaymentPercentage}%`,
                width: '33.33%'
              }}
              title="Prepayment"
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatPercentage(principalPercentage)} Principal</span>
            <span>{formatPercentage(interestPercentage)} Interest</span>
            <span>{formatPercentage(prepaymentPercentage)} Prepayment</span>
          </div>
        </div>

        {/* Savings Summary */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-md font-medium text-yellow-800 mb-2">Savings Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Interest Saved</p>
              <p className="font-mono text-lg text-yellow-700">
                {formatCurrency(interestSavings)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payments Saved</p>
              <p className="font-mono text-lg text-yellow-700">
                {paymentsSaved}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Mortgage Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your payments and visualize your mortgage journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-900 mb-6">
              Mortgage Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mortgage Amount */}
              <div className="space-y-1">
                <label htmlFor="mortgageAmount" className="block text-sm font-medium text-gray-700">
                  Mortgage Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    type="text"
                    id="mortgageAmount"
                    name="mortgageAmount"
                    value={inputs.mortgageAmount.toLocaleString()}
                    onChange={handleInputChange}
                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="300,000"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-1">
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="interestRate"
                    name="interestRate"
                    value={inputs.interestRate}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="30"
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="3.5"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                    %
                  </span>
                </div>
              </div>

              {/* Amortization Period */}
              <div className="space-y-1">
                <label htmlFor="amortizationPeriod" className="block text-sm font-medium text-gray-700">
                  Amortization Period
                </label>
                <select
                  id="amortizationPeriod"
                  name="amortizationPeriod"
                  value={inputs.amortizationPeriod}
                  onChange={handleSelectChange}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={25}>25 years</option>
                  <option value={20}>20 years</option>
                  <option value={15}>15 years</option>
                  <option value={10}>10 years</option>
                </select>
              </div>

              {/* Payment Frequency */}
              <div className="space-y-1">
                <label htmlFor="paymentFrequency" className="block text-sm font-medium text-gray-700">
                  Payment Frequency
                </label>
                <select
                  id="paymentFrequency"
                  name="paymentFrequency"
                  value={inputs.paymentFrequency}
                  onChange={handleSelectChange}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Monthly</option>
                  <option>Bi-Weekly</option>
                  <option>Accelerated Bi-Weekly</option>
                  <option>Weekly</option>
                </select>
              </div>

              {/* Term */}
              <div className="space-y-1">
                <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                  Term
                </label>
                <select
                  id="term"
                  name="term"
                  value={inputs.term}
                  onChange={handleSelectChange}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={5}>5 years</option>
                  <option value={4}>4 years</option>
                  <option value={3}>3 years</option>
                  <option value={2}>2 years</option>
                  <option value={1}>1 year</option>
                </select>
              </div>

              {/* Start With Payment */}
              <div className="space-y-1">
                <label htmlFor="startWithPayment" className="block text-sm font-medium text-gray-700">
                  Start With Payment
                </label>
                <input
                  type="number"
                  id="startWithPayment"
                  name="startWithPayment"
                  value={inputs.startWithPayment}
                  onChange={handleInputChange}
                  min="1"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1"
                />
              </div>
            </div>

            {/* Prepayment Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-blue-900 mb-4">
                Prepayment Options
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prepayment Amount */}
                <div className="space-y-1">
                  <label htmlFor="prepaymentAmount" className="block text-sm font-medium text-gray-700">
                    Prepayment Amount
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="prepaymentAmount"
                      name="prepaymentAmount"
                      value={inputs.prepaymentAmount}
                      onChange={handleInputChange}
                      min="0"
                      className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Prepayment Frequency */}
                <div className="space-y-1">
                  <label htmlFor="prepaymentFrequency" className="block text-sm font-medium text-gray-700">
                    Prepayment Frequency
                  </label>
                  <select
                    id="prepaymentFrequency"
                    name="prepaymentFrequency"
                    value={inputs.prepaymentFrequency}
                    onChange={handleSelectChange}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>None</option>
                    <option>Each year</option>
                    <option>Each month</option>
                    <option>Each payment</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="mt-8">
              <button
                onClick={calculateAmortization}
                disabled={loading}
                className={`w-full ${loading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'} text-white py-3 px-4 rounded-md font-medium shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
              >
                {loading ? 'Calculating...' : 'Calculate Mortgage'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-6">
                Calculation Summary
              </h2>
              {renderResults()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
