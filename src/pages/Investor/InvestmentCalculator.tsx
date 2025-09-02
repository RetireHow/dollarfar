import React, { useState } from "react";

interface Investor {
  name: string;
  startAge: string;
  stopAge: string;
  color: string;
}

interface Settings {
  initialInvestment: string;
  annualContribution: string;
  annualReturn: string;
  retirementAge: string;
  compounding: string;
  contributionFrequency: string;
}

interface ResultRow {
  age: number;
  invest: number;
  value: number;
}

export default function InvestmentCalculator() {
  // Default inputs with no initial values
  const [investors, setInvestors] = useState<Investor[]>([
    { name: "", startAge: "", stopAge: "", color: "bg-emerald-100" },
    { name: "", startAge: "", stopAge: "", color: "bg-amber-100" },
    { name: "", startAge: "", stopAge: "", color: "bg-teal-100" },
  ]);

  const [settings, setSettings] = useState<Settings>({
    initialInvestment: "",
    annualContribution: "",
    annualReturn: "",
    retirementAge: "65",
    compounding: "yearly",
    contributionFrequency: "yearly",
  });

  const [results, setResults] = useState<ResultRow[][]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Prevent input value change on scroll
  const preventScrollChange = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const handleInvestorChange = (
    index: number,
    field: keyof Investor,
    value: string
  ) => {
    const updated = [...investors];
    updated[index][field] = value;
    setInvestors(updated);
  };

  const handleSettingChange = (field: keyof Settings, value: string) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  // Reset all input fields
  const resetAllFields = () => {
    setInvestors([
      { name: "", startAge: "", stopAge: "", color: "bg-emerald-100" },
      { name: "", startAge: "", stopAge: "", color: "bg-amber-100" },
      { name: "", startAge: "", stopAge: "", color: "bg-teal-100" },
    ]);

    setSettings({
      initialInvestment: "",
      annualContribution: "",
      annualReturn: "",
      retirementAge: "",
      compounding: "yearly",
      contributionFrequency: "yearly",
    });

    setResults([]);
  };

  const calculateResults = (investor: Investor): ResultRow[] => {
    // Use 0 if field is empty string
    const initialInvestment =
      settings.initialInvestment === ""
        ? 0
        : parseFloat(settings.initialInvestment);
    const annualContribution =
      settings.annualContribution === ""
        ? 0
        : parseFloat(settings.annualContribution);
    const annualReturn =
      settings.annualReturn === "" ? 0 : parseFloat(settings.annualReturn);
    const retirementAge =
      settings.retirementAge === "" ? 65 : parseFloat(settings.retirementAge);
    const contributionFrequency = settings.contributionFrequency;

    let freq = 1; // yearly by default
    if (contributionFrequency === "monthly") freq = 12;
    if (contributionFrequency === "quarterly") freq = 4;

    const r = annualReturn / 100;
    const periodRate = r / freq;
    const contributionPerPeriod = annualContribution / freq;

    const rows: ResultRow[] = [];
    let value = initialInvestment;

    // Use 0 if investor age fields are empty
    const startAge =
      investor.startAge === "" ? 0 : parseFloat(investor.startAge);
    const stopAge = investor.stopAge === "" ? 0 : parseFloat(investor.stopAge);

    for (let age = startAge; age <= retirementAge; age++) {
      let invest = 0;
      for (let p = 1; p <= freq; p++) {
        if (age <= stopAge) {
          invest += contributionPerPeriod;
          value =
            value * (1 + periodRate) + contributionPerPeriod * (1 + periodRate);
        } else {
          value = value * (1 + periodRate);
        }
      }

      rows.push({
        age,
        invest: invest,
        value: value,
      });
    }

    return rows;
  };

  const calculateAllResults = () => {
    setIsCalculating(true);
    // Simulate calculation time for loading state
    setTimeout(() => {
      const allResults = investors.map((investor) =>
        calculateResults(investor)
      );
      setResults(allResults);
      setIsCalculating(false);
    }, 800);
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getMaxAge = (): number => {
    const retirementAge =
      settings.retirementAge === "" ? 65 : parseFloat(settings.retirementAge);
    const investorAges = investors.map((i) =>
      i.startAge === "" ? 0 : parseFloat(i.startAge)
    );
    return Math.max(...investorAges, retirementAge);
  };

  const getMinAge = (): number => {
    const investorAges = investors.map((i) =>
      i.startAge === "" ? 0 : parseFloat(i.startAge)
    );
    return Math.min(...investorAges);
  };

  // Helper function to determine if a cell should have background color
  const shouldHighlightCell = (investorIndex: number, age: number): boolean => {
    const investor = investors[investorIndex];
    const startAge =
      investor.startAge === "" ? 0 : parseFloat(investor.startAge);
    const stopAge = investor.stopAge === "" ? 0 : parseFloat(investor.stopAge);
    return age >= startAge && age <= stopAge;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Investment Growth Calculator
              </h1>
              <p className="opacity-90">
                Visualize how your investments grow over time with compound
                interest
              </p>
            </div>
            <div className="hidden md:block bg-white/10 p-3 rounded-full">
              <i className="fas fa-chart-line text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Investor Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investors.map((inv, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl shadow-md border-t-4 ${inv.color} border-emerald-400 transition-all hover:shadow-lg`}
              >
                <h2 className="font-bold text-lg mb-4 flex items-center">
                  <i className="fas fa-user-circle mr-2 text-emerald-600"></i>
                  Investor {idx + 1}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={inv.name}
                      onChange={(e) =>
                        handleInvestorChange(idx, "name", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Start Age
                      </label>
                      <input
                        type="number"
                        value={inv.startAge}
                        onChange={(e) =>
                          handleInvestorChange(idx, "startAge", e.target.value)
                        }
                        onWheel={preventScrollChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        placeholder="Start age"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Stop Age
                      </label>
                      <input
                        type="number"
                        value={inv.stopAge}
                        onChange={(e) =>
                          handleInvestorChange(idx, "stopAge", e.target.value)
                        }
                        onWheel={preventScrollChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        placeholder="Stop age"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shared Settings */}
          <div className="bg-gray-50 p-6 rounded-xl shadow border border-gray-200">
            {/* <h2 className="font-bold text-xl mb-6 flex items-center">
              <i className="fas fa-cog mr-2 text-emerald-600"></i>
              Investment Settings
            </h2> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Initial Investment
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={settings.initialInvestment}
                    onChange={(e) =>
                      handleSettingChange("initialInvestment", e.target.value)
                    }
                    onWheel={preventScrollChange}
                    className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Annual Contribution
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={settings.annualContribution}
                    onChange={(e) =>
                      handleSettingChange("annualContribution", e.target.value)
                    }
                    onWheel={preventScrollChange}
                    className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Annual Return (%)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                    %
                  </span>
                  <input
                    type="number"
                    value={settings.annualReturn}
                    onChange={(e) =>
                      handleSettingChange("annualReturn", e.target.value)
                    }
                    onWheel={preventScrollChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Retirement Age
                </label>
                <input
                  type="number"
                  value={settings.retirementAge}
                  onChange={(e) =>
                    handleSettingChange("retirementAge", e.target.value)
                  }
                  onWheel={preventScrollChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  placeholder="65"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Compounding Frequency
                </label>
                <select
                  value={settings.compounding}
                  onChange={(e) =>
                    handleSettingChange("compounding", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                >
                  <option value="yearly">Yearly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Contribution Frequency
                </label>
                <select
                  value={settings.contributionFrequency}
                  onChange={(e) =>
                    handleSettingChange("contributionFrequency", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                >
                  <option value="yearly">Yearly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={resetAllFields}
                className="px-4 py-2 rounded-lg flex items-center transition bg-gray-500 hover:bg-gray-600 text-white"
              >
                <i className="fas fa-redo mr-2"></i>
                Reset
              </button>
              <button
                onClick={calculateAllResults}
                disabled={isCalculating}
                className={`px-4 py-2 rounded-lg flex items-center transition ${
                  isCalculating
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700"
                } text-white`}
              >
                {isCalculating ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <h2 className="font-bold text-xl flex items-center">
                <i className="fas fa-table mr-2 text-emerald-600"></i>
                Investment Growth Projection
                {isCalculating && (
                  <span className="ml-2 text-sm font-normal text-emerald-600 flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-1 h-4 w-4 text-emerald-600"
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
                    Updating...
                  </span>
                )}
              </h2>
            </div>

            {isCalculating ? (
              <div className="p-12 flex justify-center items-center">
                <div className="text-center">
                  <svg
                    className="animate-spin mx-auto h-8 w-8 text-emerald-600"
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
                  <p className="mt-2 text-gray-600">Calculating results...</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      {investors.map((inv, idx) => (
                        <th
                          key={idx}
                          colSpan={3}
                          className="p-4 text-center font-bold text-gray-700 border-r last:border-r-0 border-l-4 first:border-l-0 border-l-gray-300"
                        >
                          <div className="flex items-center justify-center">
                            {inv.name ? (
                              <div>
                                <p>
                                  {inv.name} is Investing at Age {inv.startAge}
                                </p>
                                <p>
                                  ( {settings.annualReturn}% Annual Return )
                                </p>
                              </div>
                            ) : (
                              `Investor ${idx + 1} 's Investment`
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      {investors.map((_, idx) => (
                        <React.Fragment key={idx}>
                          <th className="p-2 border-r font-bold text-gray-600 border-l-4 first:border-l-0 border-l-gray-300">
                            Age
                          </th>
                          <th className="p-2 border-r font-bold text-gray-600">
                            Invested
                          </th>
                          <th className="p-2 border-r font-bold text-gray-600 last:border-r-0">
                            Value
                          </th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.length > 0 ? (
                      Array.from(
                        { length: getMaxAge() - getMinAge() + 1 },
                        (_, i) => i + getMinAge()
                      ).map((age) => (
                        <tr key={age} className="hover:bg-gray-50 transition">
                          {investors.map((inv, idx) => {
                            const row = results[idx]?.find(
                              (r) => r.age === age
                            );
                            const isInvestmentPeriod = shouldHighlightCell(
                              idx,
                              age
                            );
                            return row ? (
                              <React.Fragment key={idx}>
                                <td className="p-3 border-r font-medium border-l-4 first:border-l-0 border-l-gray-300 text-center">
                                  {row.age}
                                </td>
                                <td
                                  className={`p-3 border-r text-center ${
                                    isInvestmentPeriod
                                      ? `${inv.color} font-medium`
                                      : ""
                                  }`}
                                >
                                  {row.invest > 0
                                    ? formatCurrency(row.invest)
                                    : "-"}
                                </td>
                                <td className="p-3 border-r last:border-r-0 font-medium text-emerald-700 text-center">
                                  {formatCurrency(row.value)}
                                </td>
                              </React.Fragment>
                            ) : (
                              <React.Fragment key={idx}>
                                <td className="p-3 border-r border-l-4 first:border-l-0 border-l-gray-300 text-center">
                                  {age}
                                </td>
                                <td
                                  className={`p-3 border-r text-center ${
                                    shouldHighlightCell(idx, age)
                                      ? `${inv.color}`
                                      : ""
                                  }`}
                                >
                                  -
                                </td>
                                <td className="p-3 border-r last:border-r-0 text-center">
                                  -
                                </td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={investors.length * 3}
                          className="p-8 text-center text-gray-500"
                        >
                          <i className="fas fa-calculator text-3xl mb-3 text-emerald-400"></i>
                          <p>
                            Click "Calculate" to see your investment projections
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investors.map((inv, idx) => {
              const finalResult = results[idx]?.find(
                (r) =>
                  r.age ===
                  (settings.retirementAge === ""
                    ? 65
                    : parseFloat(settings.retirementAge))
              );
              const totalInvested =
                results[idx]?.reduce((sum, row) => sum + row.invest, 0) || 0;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-xl shadow-md border-t-4 ${inv.color} border-emerald-400`}
                >
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full ${inv.color.replace(
                        "bg-",
                        "bg-"
                      )} mr-2`}
                    ></span>
                    {inv.name || `Investor ${idx + 1}`}'s Summary
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Invested:</span>
                      <span className="font-medium">
                        {results.length > 0
                          ? formatCurrency(totalInvested)
                          : "-"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Final Value:</span>
                      <span className="font-medium text-emerald-600">
                        {finalResult ? formatCurrency(finalResult.value) : "-"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Period:</span>
                      <span className="font-medium">
                        {inv.startAge === "" ? "-" : inv.startAge} -{" "}
                        {inv.stopAge === "" ? "-" : inv.stopAge}
                      </span>
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth:</span>
                        <span className="font-medium text-emerald-600">
                          {finalResult && totalInvested > 0
                            ? `${Math.round(
                                ((finalResult.value - totalInvested) /
                                  totalInvested) *
                                  100
                              )}%`
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
