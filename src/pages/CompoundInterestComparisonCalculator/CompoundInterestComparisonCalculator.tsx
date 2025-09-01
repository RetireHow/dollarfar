/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { ConfigProvider, Select, theme as antdTheme } from "antd";
import CIRCTooltip from "../CIRC/CIRCTooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CIRCFrequencyOptions } from "../CIRC/CRICForm";
import ReactSlider from "react-slider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PageHero from "../../components/UI/PageHero";
import { assets } from "../../assets/assets";
import useTitle from "../../hooks/useTitle";

interface Investor {
  name: string;
  startAge: string;
  endAge: string;
}

interface SharedData {
  initialInvestment: string;
  contribution: string;
  contributionFrequency: string;
  annualInterestRate: string;
  compoundingFrequency: string;
}

interface CalculationResult {
  age: number;
  year: number;
  investment: number;
  value: number;
}

interface InvestorResults {
  investor: Investor;
  results: CalculationResult[];
  totalInvested: number;
  finalValue: number;
}

const data = {
  title: "Compound Interest Scenario/Comparison Calculator",
  description:
    "Compare investment timelines with this calculator. Visualize how starting ages affect compound interest growth through interactive charts and tables. Perfect for retirement planning scenarios.",
  image: assets.compoundInterestCalcIcon,
};

export default function CompoundInterestComparisonCalculator() {
  useTitle("Dollarfar | CIRC");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [investors, setInvestors] = useState<Investor[]>([
    {
      name: "Billy",
      startAge: "20",
      endAge: "65",
    },
    {
      name: "Susan",
      startAge: "30",
      endAge: "65",
    },
    {
      name: "Kim",
      startAge: "35",
      endAge: "65",
    },
  ]);

  const [sharedData, setSharedData] = useState<SharedData>({
    initialInvestment: "1000",
    contribution: "100",
    contributionFrequency: "12",
    annualInterestRate: "7",
    compoundingFrequency: "12",
  });

  const [results, setResults] = useState<InvestorResults[] | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const isDarkMode = document.documentElement.classList.contains("dark");

  // Pre-calculate on component mount with default values
  useEffect(() => {
    const defaultResults = investors.map((investor) =>
      calculateCompoundInterest(investor)
    );
    setResults(defaultResults);
  }, []);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate shared inputs
    if (
      !sharedData.initialInvestment ||
      parseFloat(sharedData.initialInvestment) < 0
    ) {
      newErrors.initialInvestment =
        "Initial investment must be a positive number";
    }

    if (sharedData.contribution && parseFloat(sharedData.contribution) < 0) {
      newErrors.contribution = "Contribution must be a positive number";
    }

    if (
      !sharedData.annualInterestRate ||
      parseFloat(sharedData.annualInterestRate) <= 0
    ) {
      newErrors.annualInterestRate = "Interest rate must be greater than 0";
    }

    // Validate investor inputs
    investors.forEach((investor, index) => {
      const startAge = parseInt(investor.startAge);
      const endAge = parseInt(investor.endAge);

      if (
        !investor.startAge ||
        isNaN(startAge) ||
        startAge < 18 ||
        startAge > 100
      ) {
        newErrors[`investor-${index}-startAge`] =
          "Start age must be between 18 and 100";
      }

      if (!investor.endAge || isNaN(endAge) || endAge < 18 || endAge > 100) {
        newErrors[`investor-${index}-endAge`] =
          "End age must be between 18 and 100";
      }

      if (!isNaN(startAge) && !isNaN(endAge) && startAge >= endAge) {
        newErrors[`investor-${index}-ageRange`] =
          "End age must be greater than start age";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInvestorChange = (
    index: number,
    field: keyof Investor,
    value: string
  ): void => {
    const updatedInvestors = [...investors];
    updatedInvestors[index] = {
      ...updatedInvestors[index],
      [field]: value,
    };
    setInvestors(updatedInvestors);

    // Clear relevant errors when user corrects the input
    if (errors[`investor-${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`investor-${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const handleSharedChange = (field: keyof SharedData, value: string): void => {
    setSharedData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear relevant errors when user corrects the input
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleClear = (): void => {
    setInvestors([
      {
        name: "Early Starter",
        startAge: "20",
        endAge: "65",
      },
      {
        name: "Late Bloomer",
        startAge: "30",
        endAge: "65",
      },
      {
        name: "Custom Investor",
        startAge: "35",
        endAge: "65",
      },
    ]);
    setSharedData({
      initialInvestment: "1000",
      contribution: "100",
      contributionFrequency: "12",
      annualInterestRate: "7",
      compoundingFrequency: "12",
    });
    setResults(null);
    setErrors({});
  };

  const calculateCompoundInterest = (investor: Investor): InvestorResults => {
    const initialInvestment = parseFloat(sharedData.initialInvestment) || 0;
    const contribution = parseFloat(sharedData.contribution) || 0;
    const annualInterestRate =
      parseFloat(sharedData.annualInterestRate) / 100 || 0;
    const startAge = parseInt(investor.startAge) || 0;
    const endAge = parseInt(investor.endAge) || 0;

    // Convert frequencies to numbers
    const contributionFrequency =
      parseInt(sharedData.contributionFrequency) || 1;
    const compoundingFrequency = parseInt(sharedData.compoundingFrequency) || 1;

    // Calculate periodic values
    const periodicRate = annualInterestRate / compoundingFrequency;
    const contributionPerCompoundingPeriod =
      contribution * (contributionFrequency / compoundingFrequency);

    let totalContribution = initialInvestment;
    let totalFutureValue = initialInvestment;
    const results: CalculationResult[] = [];

    // Add initial state
    results.push({
      age: startAge,
      year: 0,
      investment: totalContribution,
      value: totalFutureValue,
    });

    // Calculate for each year
    for (let age = startAge + 1, year = 1; age <= endAge; age++, year++) {
      // Calculate for each compounding period in the year
      for (let period = 1; period <= compoundingFrequency; period++) {
        // Apply interest to the existing balance
        totalFutureValue *= 1 + periodicRate;

        // Add contributions at the appropriate times
        totalFutureValue += contributionPerCompoundingPeriod;
      }

      // Update total contribution
      totalContribution += contribution * contributionFrequency;

      results.push({
        age,
        year,
        investment: totalContribution,
        value: totalFutureValue,
      });
    }

    return {
      investor,
      results,
      totalInvested: totalContribution,
      finalValue: totalFutureValue,
    };
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsCalculating(true);

    if (!validateInputs()) {
      setIsCalculating(false);
      return;
    }

    // Small delay to show the loading state
    setTimeout(() => {
      // Calculate results for each investor
      const investorResults = investors.map((investor) =>
        calculateCompoundInterest(investor)
      );
      setResults(investorResults);
      setIsCalculating(false);
    }, 500);
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>): void => {
    e.currentTarget.blur();
  };

  // Find the maximum age range to display in the table
  const getMaxAgeRange = () => {
    if (!results) return { minAge: 0, maxAge: 0 };

    let minAge = Infinity;
    let maxAge = -Infinity;

    results.forEach((investorResult) => {
      if (investorResult.results.length > 0) {
        minAge = Math.min(minAge, investorResult.results[0].age);
        maxAge = Math.max(
          maxAge,
          investorResult.results[investorResult.results.length - 1].age
        );
      }
    });

    return { minAge, maxAge };
  };

  const { minAge, maxAge } = getMaxAgeRange();

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for charts
  const getChartData = () => {
    if (!results) return [];

    // Find the min and max age across all investors
    let minAge = Infinity;
    let maxAge = -Infinity;

    results.forEach((investorResult) => {
      if (investorResult.results.length > 0) {
        minAge = Math.min(minAge, investorResult.results[0].age);
        maxAge = Math.max(
          maxAge,
          investorResult.results[investorResult.results.length - 1].age
        );
      }
    });

    const data: any[] = [];

    // Create data points for each age in the range
    for (let age = minAge; age <= maxAge; age++) {
      const dataPoint: any = { age };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      results.forEach((investorResult, _) => {
        // Find the result for this age, if it exists for this investor
        const resultForAge = investorResult.results.find((r) => r.age === age);

        if (resultForAge) {
          dataPoint[`${investorResult.investor.name} Value`] = Math.round(
            resultForAge.value
          );
        } else {
          // For ages outside this investor's range, set to null
          dataPoint[`${investorResult.investor.name} Value`] = null;
        }
      });

      data.push(dataPoint);
    }

    return data;
  };

  const chartData = getChartData();
  const colors = ["#0d9488", "#d97706", "#7c3aed", "#dc2626", "#0891b2"];

  return (
    <>
      <PageHero data={data} />
      <main className="p-2 sm:p-4">
        <ConfigProvider
          theme={{
            algorithm: isDarkMode
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
          }}
        >
          <div className="bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 max-w-7xl mx-auto border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text  mb-3">
                Compound Interest Scenario/Comparison Calculator
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                See how starting early vs. starting late impacts your financial
                future.
              </p>
            </div>
            <form className="md:mx-52" onSubmit={handleCalculate}>
              {/* Investor-specific section */}
              <section className="grid md:grid-cols-3 grid-cols-1 gap-5 border-[1px] border-gray-300 rounded-md p-5">
                {investors.map((investor, index) => (
                  <div
                    key={index}
                    className="space-y-5 border-[1px] border-gray-300 p-5 rounded-md"
                  >
                    {/* Investor Name */}
                    <div className="sm:col-span-2 md:col-span-1">
                      <div className="flex items-center mb-2">
                        <label
                          className="block text-sm font-bold text-gray-700 dark:text-gray-200"
                          htmlFor={`investor-name-${index}`}
                        >
                          Investor {index + 1}
                        </label>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icon
                            icon="mdi:account-outline"
                            className="text-gray-400"
                          />
                        </div>
                        <input
                          className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            errors[`investor-${index}-name`]
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          type="text"
                          id={`investor-name-${index}`}
                          placeholder="e.g., John Doe"
                          value={investor.name}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInvestorChange(index, "name", e.target.value)
                          }
                        />
                      </div>
                      {errors[`investor-${index}-name`] && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors[`investor-${index}-name`]}
                        </p>
                      )}
                    </div>

                    {/* Start Age */}
                    <div>
                      <div className="flex items-center mb-2">
                        <label
                          className="block text-sm font-bold text-gray-700 dark:text-gray-200"
                          htmlFor={`start-age-${index}`}
                        >
                          Start Age
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icon
                            icon="mdi:calendar-start"
                            className="text-gray-400"
                          />
                        </div>
                        <input
                          className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            errors[`investor-${index}-startAge`]
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          type="number"
                          id={`start-age-${index}`}
                          min="18"
                          max="100"
                          placeholder="25"
                          value={investor.startAge}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInvestorChange(
                              index,
                              "startAge",
                              e.target.value
                            )
                          }
                          onWheel={handleWheel}
                        />
                      </div>
                      {errors[`investor-${index}-startAge`] && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors[`investor-${index}-startAge`]}
                        </p>
                      )}
                    </div>

                    {/* End Age */}
                    <div>
                      <div className="flex items-center mb-2">
                        <label
                          className="block text-sm font-bold text-gray-700 dark:text-gray-200"
                          htmlFor={`end-age-${index}`}
                        >
                          End Age
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icon
                            icon="mdi:calendar-end"
                            className="text-gray-400"
                          />
                        </div>
                        <input
                          className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            errors[`investor-${index}-endAge`]
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          type="number"
                          id={`end-age-${index}`}
                          min="18"
                          max="100"
                          placeholder="65"
                          value={investor.endAge}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInvestorChange(
                              index,
                              "endAge",
                              e.target.value
                            )
                          }
                          onWheel={handleWheel}
                        />
                      </div>
                      {errors[`investor-${index}-endAge`] && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors[`investor-${index}-endAge`]}
                        </p>
                      )}
                      {errors[`investor-${index}-ageRange`] && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors[`investor-${index}-ageRange`]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </section>

              {/* Shared investment parameters section */}
              <section className="p-5 space-y-6 border-[1px] border-gray-300 rounded-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Initial Investment */}
                  <div>
                    <div className="flex items-center mb-2">
                      <label
                        className="block text-sm font-bold text-gray-700 dark:text-gray-200"
                        htmlFor="initial-investment"
                      >
                        Initial Investment
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <CIRCTooltip title="The starting amount you invest or deposit. This is the base amount on which interest will be calculated." />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <Icon icon="mdi:cash" />
                      </span>
                      <input
                        className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.initialInvestment
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        type="number"
                        id="initial-investment"
                        min="0"
                        step="100"
                        placeholder="0.00"
                        value={sharedData.initialInvestment}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleSharedChange(
                            "initialInvestment",
                            e.target.value
                          )
                        }
                        onWheel={handleWheel}
                      />
                    </div>
                    {errors.initialInvestment && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.initialInvestment}
                      </p>
                    )}
                  </div>

                  {/* Ongoing Contribution */}
                  <div>
                    <div className="flex items-center mb-2">
                      <label
                        className="block text-sm font-bold text-gray-700 dark:text-gray-200"
                        htmlFor="contribution-amount"
                      >
                        Regular Contribution
                      </label>
                      <CIRCTooltip title="The additional amount you plan to add to your investment periodically. This can help grow your savings over time." />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <Icon icon="mdi:currency-usd" />
                      </span>
                      <input
                        className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.contribution
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        type="number"
                        id="contribution-amount"
                        min="0"
                        step="10"
                        placeholder="0.00"
                        value={sharedData.contribution}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleSharedChange("contribution", e.target.value)
                        }
                        onWheel={handleWheel}
                      />
                    </div>
                    {errors.contribution && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.contribution}
                      </p>
                    )}
                  </div>

                  {/* Compounding Frequency */}
                  <div>
                    <div className="flex items-center mb-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                        Compounding Frequency
                      </label>
                      <CIRCTooltip title="The frequency at which interest is applied to your total balance (e.e., daily, monthly, quarterly, annually). More frequent compounding leads to faster growth." />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Icon icon="mdi:chart-arc" className="text-gray-400" />
                      </div>
                      <Select
                        style={{
                          height: 44,
                          border: errors.compoundingFrequency
                            ? "1px solid #ef4444"
                            : "1px solid #d1d5db",
                          borderRadius: "12px",
                          paddingLeft: "40px",
                        }}
                        className="w-full"
                        variant="borderless"
                        options={CIRCFrequencyOptions}
                        value={sharedData.compoundingFrequency}
                        onChange={(value: string) =>
                          handleSharedChange("compoundingFrequency", value)
                        }
                        suffixIcon={
                          <Icon
                            className="text-[1rem] text-gray-600 dark:text-gray-400"
                            icon="iconamoon:arrow-down-2"
                          />
                        }
                      />
                    </div>
                  </div>

                  {/* Contribution Frequency */}
                  <div>
                    <div className="flex items-center mb-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                        Contribution Frequency
                      </label>
                      <CIRCTooltip title="How often you will add the ongoing contribution to your investment (e.g., monthly, quarterly, annually)." />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Icon
                          icon="mdi:calendar-repeat"
                          className="text-gray-400"
                        />
                      </div>
                      <Select
                        style={{
                          height: 44,
                          border: errors.contributionFrequency
                            ? "1px solid #ef4444"
                            : "1px solid #d1d5db",
                          borderRadius: "12px",
                          paddingLeft: "40px",
                        }}
                        className="w-full"
                        variant="borderless"
                        options={CIRCFrequencyOptions}
                        value={sharedData.contributionFrequency}
                        onChange={(value: string) =>
                          handleSharedChange("contributionFrequency", value)
                        }
                        suffixIcon={
                          <Icon
                            className="text-[1rem] text-gray-600 dark:text-gray-400"
                            icon="iconamoon:arrow-down-2"
                          />
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div>
                    <div className="flex items-center mb-2">
                      <label
                        className="block text-sm font-bold text-gray-700 dark:text-gray-200"
                        htmlFor="interest-rate"
                      >
                        Annual Interest Rate
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <CIRCTooltip title="The percentage at which your investment grows annually. This is the return provided by your investment or savings account." />
                    </div>
                    <div className="w-full relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon icon="mdi:percent" className="text-gray-400" />
                      </div>
                      <input
                        className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.annualInterestRate
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        type="number"
                        id="interest-rate"
                        min="0"
                        max="50"
                        step="0.1"
                        placeholder="0%"
                        value={sharedData.annualInterestRate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleSharedChange(
                            "annualInterestRate",
                            e.target.value
                          )
                        }
                        onWheel={handleWheel}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="md:mb-2 opacity-0 md:block hidden">dfasfd</p>
                    <div className="w-full border border-gray-300 dark:border-gray-600 pt-5 pb-4 px-4 rounded-xl bg-white h-[45px] dark:bg-gray-700">
                      <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        thumbActiveClassName="active-thumb"
                        min={0}
                        max={20}
                        value={Number(sharedData.annualInterestRate) || 0}
                        onChange={(value: number) =>
                          handleSharedChange(
                            "annualInterestRate",
                            value.toString()
                          )
                        }
                      />
                    </div>
                  </div>
                  {/* {errors.annualInterestRate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.annualInterestRate}
                    </p>
                  )} */}
                </div>
              </section>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 text-sm bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all font-bold flex items-center justify-center dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 shadow-md"
                >
                  <Icon icon="mdi:refresh" className="mr-2 text-lg" />
                  Reset All
                </button>

                <button
                  type="submit"
                  disabled={isCalculating}
                  className="px-6 py-3 text-sm bg-black text-white rounded-xl transition-all font-bold flex items-center justify-center flex-1 disabled:opacity-70 disabled:cursor-not-allowed shadow-md transform hover:scale-105 duration-300"
                >
                  {isCalculating ? (
                    <>
                      <Icon
                        icon="mdi:loading"
                        className="animate-spin mr-2 text-lg"
                      />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:calculator" className="mr-2 text-lg" />
                      Compare Investments
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Results Section */}
            {results && (
              <>
                {/* Table */}
                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-center mb-6 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                    <Icon icon="mdi:table" className="mr-2 text-2xl" />
                    Investment Growth Over Time
                  </h3>

                  <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full bg-white dark:bg-gray-800">
                      <thead>
                        <tr className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-gray-800 dark:to-gray-900 text-white">
                          {results.map((investorResult, index) => (
                            <th
                              key={index}
                              colSpan={3}
                              className="px-6 py-4 text-center font-bold text-sm tracking-wider"
                              style={{
                                backgroundColor: `${colors[index]}22`,
                                borderLeft: `2px solid ${colors[index]}`,
                                borderRight: `2px solid ${colors[index]}`,
                              }}
                            >
                              <div className="flex items-center justify-center">
                                <div>
                                  <p>
                                    {investorResult.investor.name} is investing
                                    at Age {investorResult?.investor?.startAge}
                                  </p>
                                  <p>
                                    ( {sharedData?.annualInterestRate}% Annual
                                    Return )
                                  </p>
                                </div>
                              </div>
                            </th>
                          ))}
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                          {results.map((_, index) => (
                            <React.Fragment key={index}>
                              <th
                                className="px-6 py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-200 tracking-wider"
                                style={{
                                  backgroundColor: `${colors[index]}11`,
                                  borderLeft: `2px solid ${colors[index]}`,
                                }}
                              >
                                Age
                              </th>
                              <th
                                className="px-6 py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-200 tracking-wider"
                                style={{
                                  backgroundColor: `${colors[index]}11`,
                                }}
                              >
                                Invest
                              </th>
                              <th
                                className="px-6 py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-200 tracking-wider"
                                style={{
                                  backgroundColor: `${colors[index]}11`,
                                  borderRight: `2px solid ${colors[index]}`,
                                }}
                              >
                                Value
                              </th>
                            </React.Fragment>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {Array.from(
                          { length: maxAge - minAge + 1 },
                          (_, i) => minAge + i
                        ).map((age, rowIndex) => (
                          <tr
                            key={age}
                            className={
                              rowIndex % 2 === 0
                                ? "bg-gray-50 dark:bg-gray-700"
                                : "bg-white dark:bg-gray-800"
                            }
                          >
                            {results.map((investorResult, investorIndex) => {
                              const yearData = investorResult.results.find(
                                (r) => r.age === age
                              );

                              return (
                                <React.Fragment key={investorIndex}>
                                  {/* Age */}
                                  <td
                                    className="px-6 py-3 text-center text-sm font-medium"
                                    style={{
                                      backgroundColor: `${colors[investorIndex]}08`,
                                      borderLeft: `2px solid ${colors[investorIndex]}`,
                                    }}
                                  >
                                    {age}
                                  </td>

                                  {/* Invest */}
                                  <td
                                    className="px-6 py-3 text-center text-sm"
                                    style={{
                                      backgroundColor: `${colors[investorIndex]}08`,
                                    }}
                                  >
                                    {yearData
                                      ? formatCurrency(yearData.investment)
                                      : "-"}
                                  </td>

                                  {/* Value */}
                                  <td
                                    className="px-6 py-3 text-center text-sm"
                                    style={{
                                      backgroundColor: `${colors[investorIndex]}08`,
                                      borderRight: `2px solid ${colors[investorIndex]}`,
                                    }}
                                  >
                                    <div className="font-bold text-green-600 dark:text-green-400">
                                      {yearData
                                        ? formatCurrency(yearData.value)
                                        : "-"}
                                    </div>
                                  </td>
                                </React.Fragment>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Chart */}
                <div className="mt-10">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={chartData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={isDarkMode ? "#4B5563" : "#E5E7EB"}
                          />
                          <XAxis
                            dataKey="age"
                            stroke={isDarkMode ? "#D1D5DB" : "#4B5563"}
                            label={{
                              value: "Age",
                              position: "insideBottom",
                              offset: -5,
                              style: {
                                fill: isDarkMode ? "#D1D5DB" : "#4B5563",
                              },
                            }}
                          />
                          <YAxis
                            stroke={isDarkMode ? "#D1D5DB" : "#4B5563"}
                            tickFormatter={(value) => {
                              if (value >= 1000000)
                                return `$${(value / 1000000).toFixed(1)}M`;
                              if (value >= 1000)
                                return `$${(value / 1000).toFixed(0)}K`;
                              return `$${value}`;
                            }}
                            label={{
                              value: "Value",
                              angle: -90,
                              position: "insideLeft",
                              style: {
                                fill: isDarkMode ? "#D1D5DB" : "#4B5563",
                              },
                            }}
                          />
                          <Tooltip
                            formatter={(value, name) => {
                              const investorName = name
                                .toString()
                                .replace(" Value", "");
                              return [
                                `$${Number(value).toLocaleString()}`,
                                investorName,
                              ];
                            }}
                            labelFormatter={(value) => `Age: ${value}`}
                            contentStyle={{
                              backgroundColor: isDarkMode ? "#374151" : "#fff",
                              borderColor: isDarkMode ? "#4B5563" : "#E5E7EB",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Legend
                            verticalAlign="top"
                            height={36}
                            formatter={(value) => (
                              <span
                                style={{
                                  color: isDarkMode ? "#D1D5DB" : "#4B5563",
                                }}
                              >
                                {value}
                              </span>
                            )}
                          />
                          {results.map((investorResult, index) => (
                            <Line
                              key={index}
                              type="monotone"
                              dataKey={`${investorResult.investor.name} Value`}
                              name={investorResult.investor.name}
                              stroke={colors[index % colors.length]}
                              strokeWidth={3}
                              dot={{ r: 4 }}
                              activeDot={{ r: 8 }}
                              connectNulls
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Chart explanation */}
                    <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-sm text-teal-700 dark:text-teal-300">
                      <div className="flex items-start">
                        <Icon
                          icon="mdi:information-outline"
                          className="mr-2 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          This chart compares how each investor's portfolio
                          grows over their lifetime. The X-axis shows the
                          investor's age, making it easy to see how starting at
                          different ages affects the final outcome. Each line
                          represents a different investor's journey from their
                          start age to end age.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ConfigProvider>
      </main>
    </>
  );
}
