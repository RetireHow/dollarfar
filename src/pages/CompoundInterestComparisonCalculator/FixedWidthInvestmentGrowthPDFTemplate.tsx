/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const FixedWidthInvestmentGrowthPDFTemplate = ({
  investors,
  settings,
  results,
}: {
  investors: Investor[];
  settings: Settings;
  results: ResultRow[][];
}) => {
  // Fixed width for PDF (A4 paper size in pixels at 96dpi)
  const pdfWidth = 794; // ~8.27 inches (A4 width)
  const pdfMargin = 10; // Increased margin for better spacing

  // Calculate summary data for each investor
  const investorSummaries = investors.map((investor, idx) => {
    const finalResult = results[idx]?.find(
      (r) =>
        r.age ===
        (settings.retirementAge === ""
          ? 65
          : parseFloat(settings.retirementAge))
    );

    const totalInvested =
      results[idx]?.reduce((sum, row) => sum + row.invest, 0) || 0;
    const growthAmount = finalResult ? finalResult.value - totalInvested : 0;
    const growthPercentage =
      finalResult && totalInvested > 0
        ? ((finalResult.value - totalInvested) / totalInvested) * 100
        : 0;

    return {
      name: investor.name || `Investor ${idx + 1}`,
      totalInvested,
      finalValue: finalResult?.value || 0,
      growthAmount,
      growthPercentage,
      startAge: investor.startAge || "0",
      stopAge: investor.stopAge || "0",
      color: investor.color,
    };
  });

  // Get min and max age for the table
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

  const minAge = getMinAge();
  const maxAge = getMaxAge();

  const chartColors = ["#10b981", "#f59e0b", "#8b5cf6"];

  // Helper function to determine if a cell should have background color
  const shouldHighlightCell = (investorIndex: number, age: number): boolean => {
    const investor = investors[investorIndex];
    const startAge =
      investor.startAge === "" ? 0 : parseFloat(investor.startAge);
    const stopAge = investor.stopAge === "" ? 0 : parseFloat(investor.stopAge);
    return age >= startAge && age <= stopAge;
  };

  // Key milestones to highlight
  const milestoneAges = [25, 30, 35, 40, 45, 50, 55, 60, 65].filter(
    (age) => age <= maxAge
  );

  // Prepare data for the chart
  const prepareChartData = () => {
    if (results.length === 0) return [];

    const chartData = [];
    for (let age = minAge; age <= maxAge; age++) {
      const dataPoint: any = { age };
      investors.forEach((investor, idx) => {
        const result = results[idx]?.find((r) => r.age === age);
        if (result) {
          dataPoint[`investor${idx}Value`] = result.value;
          dataPoint[`investor${idx}Name`] =
            investor.name || `Investor ${idx + 1}`;
        } else {
          dataPoint[`investor${idx}Value`] = null;
          dataPoint[`investor${idx}Name`] =
            investor.name || `Investor ${idx + 1}`;
        }
      });
      chartData.push(dataPoint);
    }
    return chartData;
  };

  const chartData = prepareChartData();

  return (
    <div
      className="pdf-template"
      style={{
        width: `${pdfWidth}px`,
        margin: "0 auto",
        padding: `${pdfMargin}px`,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "16px", // Increased from 12px to 16px for better readability
        color: "#2d3748",
        backgroundColor: "#fff",
        lineHeight: 1.6, // Increased line height for better readability
      }}
    >
      {/* Header with branding */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px", // Increased margin
          paddingBottom: "25px", // Increased padding
          borderBottom: "3px solid #e2e8f0", // Thicker border for better separation
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "60px", // Increased size
              height: "60px", // Increased size
              backgroundColor: "#2b6777",
              borderRadius: "12px", // Slightly larger radius
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px", // Increased margin
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Enhanced shadow
            }}
          >
            <div
              style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}
            >
              DF
            </div>{" "}
            {/* Increased font size */}
          </div>
          <div>
            <h1
              style={{
                fontSize: "28px", // Increased from 24px
                fontWeight: "700",
                margin: "0",
                color: "#2b6777",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              Investment Comparison Report
            </h1>
            <p
              style={{
                margin: "8px 0 0 0", // Increased margin
                color: "#718096",
                fontSize: "18px", // Increased from 14px
                fontWeight: "500",
              }}
            >
              Compound Interest Scenario Analysis
            </p>
          </div>
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "16px", // Increased from 12px
            color: "#718096",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
            Generated on {moment().format("MMMM D, YYYY")}
          </p>
          <p style={{ margin: "0", fontSize: "14px" }}>
            {" "}
            {/* Increased from 11px */}
            dollarfar.com/investment-calculator
          </p>
        </div>
      </header>

      {/* Executive Summary */}
      <div
        style={{
          backgroundColor: "#f7fafc",
          padding: "25px", // Increased padding
          borderRadius: "12px",
          marginBottom: "40px", // Increased margin
          borderLeft: "5px solid #2b6777", // Thicker border
        }}
      >
        <h2
          style={{
            fontSize: "22px", // Increased from 18px
            fontWeight: "700",
            margin: "0 0 20px 0", // Increased margin
            color: "#2d3748",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px", // Increased size
              height: "32px", // Increased size
              backgroundColor: "#2b6777",
              color: "white",
              borderRadius: "8px", // Increased radius
              marginRight: "12px", // Increased margin
              fontSize: "18px", // Increased font size
            }}
          >
            📊
          </span>
          Executive Summary
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {" "}
          {/* Increased gap */}
          <div>
            <p
              style={{
                margin: "0 0 15px 0",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              Investment Parameters:
            </p>{" "}
            {/* Increased font size */}
            <ul
              style={{
                margin: "0",
                paddingLeft: "20px",
                fontSize: "16px",
                lineHeight: 1.8,
              }}
            >
              {" "}
              {/* Increased font size and line height */}
              <li>
                Annual Return: <strong>{settings.annualReturn || "0"}%</strong>
              </li>
              <li>
                Initial Investment:{" "}
                <strong>
                  {formatCurrency(
                    settings.initialInvestment === ""
                      ? 0
                      : parseFloat(settings.initialInvestment)
                  )}
                </strong>
              </li>
              <li>
                Annual Contribution:{" "}
                <strong>
                  {formatCurrency(
                    settings.annualContribution === ""
                      ? 0
                      : parseFloat(settings.annualContribution)
                  )}
                </strong>
              </li>
            </ul>
          </div>
          <div>
            <p
              style={{
                margin: "0 0 15px 0",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              Analysis Period:
            </p>{" "}
            {/* Increased font size */}
            <ul
              style={{
                margin: "0",
                paddingLeft: "20px",
                fontSize: "16px",
                lineHeight: 1.8,
              }}
            >
              {" "}
              {/* Increased font size and line height */}
              <li>
                Retirement Age:{" "}
                <strong>{settings.retirementAge || "65"}</strong>
              </li>
              <li>
                Compounding: <strong>{settings.compounding}</strong>
              </li>
              <li>
                Contribution Frequency:{" "}
                <strong>{settings.contributionFrequency}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Investor Comparison Cards */}
      <div style={{ marginBottom: "40px" }}>
        {" "}
        {/* Increased margin */}
        <h2
          style={{
            fontSize: "22px", // Increased from 18px
            fontWeight: "700",
            margin: "0 0 25px 0", // Increased margin
            color: "#2d3748",
            paddingBottom: "15px", // Increased padding
            borderBottom: "3px solid #e2e8f0", // Thicker border
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px", // Increased size
              height: "32px", // Increased size
              backgroundColor: "#2b6777",
              color: "white",
              borderRadius: "8px", // Increased radius
              marginRight: "12px", // Increased margin
              fontSize: "18px", // Increased font size
            }}
          >
            👥
          </span>
          Investor Comparison
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {" "}
          {/* Increased gap */}
          {investorSummaries.map((investor, index) => (
            <div
              key={index}
              style={{
                padding: "20px", // Increased padding
                borderRadius: "12px",
                backgroundColor: "#f8f9fa",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor:
                  index === 0 ? "#d1fae5" : index === 1 ? "#fef3c7" : "#f3e8ff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)", // Enhanced shadow
              }}
            >
              <h3
                style={{
                  fontSize: "18px", // Increased from 15px
                  fontWeight: "700",
                  margin: "0 0 15px 0", // Increased margin
                  color:
                    index === 0
                      ? chartColors[0]
                      : index === 1
                      ? chartColors[1]
                      : chartColors[2],
                  paddingBottom: "12px", // Increased padding
                  borderBottom: "2px solid #e2e8f0", // Thicker border
                }}
              >
                {investor.name}
              </h3>

              <div style={{ marginBottom: "15px", fontSize: "16px" }}>
                {" "}
                {/* Increased font size */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  {" "}
                  {/* Increased margin */}
                  <span style={{ color: "#718096" }}>Investment Period:</span>
                  <span style={{ fontWeight: "600" }}>
                    {investor.startAge} - {investor.stopAge}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  {" "}
                  {/* Increased margin */}
                  <span style={{ color: "#718096" }}>Total Invested:</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(investor.totalInvested)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  {" "}
                  {/* Increased margin */}
                  <span style={{ color: "#718096" }}>Final Value:</span>
                  <span style={{ fontWeight: "700", color: "#2b6777" }}>
                    {formatCurrency(investor.finalValue)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#edf2f7",
                  padding: "12px", // Increased padding
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "16px", // Increased from 12px
                }}
              >
                <div style={{ color: "#718096", marginBottom: "5px" }}>
                  Total Growth
                </div>{" "}
                {/* Increased margin */}
                <div
                  style={{
                    fontWeight: "800",
                    fontSize: "18px", // Added explicit font size
                    color:
                      investor.growthPercentage >= 0 ? "#38a169" : "#e53e3e",
                  }}
                >
                  {formatCurrency(investor.growthAmount)} (
                  {investor.growthPercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Growth Chart */}
      <div style={{ marginBottom: "40px", pageBreakInside: "avoid" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            margin: "0 0 25px 0",
            color: "#2d3748",
            paddingBottom: "15px",
            borderBottom: "3px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              backgroundColor: "#2b6777",
              color: "white",
              borderRadius: "8px",
              marginRight: "12px",
              fontSize: "18px",
            }}
          >
            📈
          </span>
          Investment Growth Comparison
        </h2>
        <div style={{ height: "200px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age"
                label={{
                  value: "Age",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis
                tickFormatter={(value) => `$${value / 1000}k`}
                label={{
                  value: "Value",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value, name) => {
                  const investorName = name.toString().replace(" Value", "");
                  return [`$${Number(value).toLocaleString()}`, investorName];
                }}
                labelFormatter={(value) => `Age: ${value}`}
              />
              <Legend />
              {investors.map((investor, idx) => (
                <Bar
                  key={idx}
                  dataKey={`investor${idx}Value`}
                  name={investor.name || `Investor ${idx + 1}`}
                  fill={chartColors[idx]}
                  stackId="a"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Milestones */}
      <div style={{ marginBottom: "40px", pageBreakInside: "avoid" }}>
        {" "}
        {/* Increased margin */}
        <h2
          style={{
            fontSize: "22px", // Increased from 18px
            fontWeight: "700",
            margin: "0 0 25px 0", // Increased margin
            color: "#2d3748",
            paddingBottom: "15px", // Increased padding
            borderBottom: "3px solid #e2e8f0", // Thicker border
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px", // Increased size
              height: "32px", // Increased size
              backgroundColor: "#2b6777",
              color: "white",
              borderRadius: "8px", // Increased radius
              marginRight: "12px", // Increased margin
              fontSize: "18px", // Increased font size
            }}
          >
            🎯
          </span>
          Key Investment Milestones
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "16px",
          }}
        >
          {" "}
          {/* Increased font size */}
          <thead>
            <tr>
              <th
                style={{
                  padding: "15px", // Increased padding
                  textAlign: "center",
                  backgroundColor: "#2b6777",
                  color: "white",
                  border: "2px solid #2b6777", // Thicker border
                  fontSize: "18px", // Increased from 13px
                }}
              >
                Age
              </th>
              {investors.map((investor, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: "15px", // Increased padding
                    textAlign: "right",
                    backgroundColor: "#2b6777",
                    color: "white",
                    border: "2px solid #2b6777", // Thicker border
                    fontSize: "18px", // Increased from 13px
                  }}
                >
                  {investor.name || `Investor ${idx + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {milestoneAges.map((age, ageIndex) => {
              return (
                <tr
                  key={age}
                  style={{
                    backgroundColor: ageIndex % 2 === 0 ? "#f7fafc" : "white",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 15px", // Increased padding
                      fontWeight: "700",
                      border: "2px solid #e2e8f0", // Thicker border
                      textAlign: "center",
                      fontSize: "16px", // Increased font size
                    }}
                  >
                    {age}
                  </td>
                  {investors.map((_, idx) => {
                    const result = results[idx]?.find((r) => r.age === age);
                    return (
                      <td
                        key={idx}
                        style={{
                          padding: "12px 15px", // Increased padding
                          border: "2px solid #e2e8f0", // Thicker border
                          textAlign: "right",
                          fontWeight: "600",
                          fontSize: "16px", // Increased font size
                        }}
                      >
                        {result ? formatCurrency(result.value) : "-"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detailed Projection Table */}
      <div style={{ marginBottom: "40px", pageBreakInside: "avoid" }}>
        {" "}
        {/* Increased margin */}
        <h2
          style={{
            fontSize: "22px", // Increased from 18px
            fontWeight: "700",
            margin: "0 0 25px 0", // Increased margin
            color: "#2d3748",
            paddingBottom: "15px", // Increased padding
            borderBottom: "3px solid #e2e8f0", // Thicker border
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px", // Increased size
              height: "32px", // Increased size
              backgroundColor: "#2b6777",
              color: "white",
              borderRadius: "8px", // Increased radius
              marginRight: "12px", // Increased margin
              fontSize: "18px", // Increased font size
            }}
          >
            📋
          </span>
          Detailed Year-by-Year Projection
        </h2>
        <div style={{ overflow: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            {" "}
            {/* Increased from 11px */}
            <thead>
              <tr>
                {investors.map((inv, idx) => (
                  <th
                    key={idx}
                    colSpan={3}
                    style={{
                      padding: "12px 8px", // Increased padding
                      textAlign: "center",
                      fontWeight: "700",
                      color: "white",
                      backgroundColor: chartColors[idx],
                      border: "2px solid #e2e8f0", // Thicker border
                      fontSize: "16px", // Increased from 12px
                    }}
                  >
                    {inv.name || `Investor ${idx + 1}`}
                  </th>
                ))}
              </tr>
              <tr style={{ backgroundColor: "#edf2f7" }}>
                {investors.map((_, idx) => (
                  <React.Fragment key={idx}>
                    <th
                      style={{
                        padding: "10px 8px",
                        border: "2px solid #e2e8f0",
                        fontWeight: "600",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {/* Increased padding and font size */}
                      Age
                    </th>
                    <th
                      style={{
                        padding: "10px 8px",
                        border: "2px solid #e2e8f0",
                        fontWeight: "600",
                        fontSize: "14px",
                        textAlign: "right",
                      }}
                    >
                      {" "}
                      {/* Increased padding and font size */}
                      Invested
                    </th>
                    <th
                      style={{
                        padding: "10px 8px",
                        border: "2px solid #e2e8f0",
                        fontWeight: "600",
                        fontSize: "14px",
                        textAlign: "right",
                      }}
                    >
                      {" "}
                      {/* Increased padding and font size */}
                      Value
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(
                { length: maxAge - minAge + 1 },
                (_, i) => i + minAge
              ).map((age) => (
                <tr key={age} style={{ borderBottom: "2px solid #e2e8f0" }}>
                  {" "}
                  {/* Thicker border */}
                  {investors.map((_, idx) => {
                    const row = results[idx]?.find((r) => r.age === age);
                    const isInvestmentPeriod = shouldHighlightCell(idx, age);
                    const bgColor = isInvestmentPeriod
                      ? `${chartColors[idx]}20`
                      : "transparent"; // 20 is for 12% opacity

                    return row ? (
                      <React.Fragment key={idx}>
                        <td
                          style={{
                            padding: "8px", // Increased padding
                            border: "2px solid #e2e8f0", // Thicker border
                            textAlign: "center",
                            backgroundColor: bgColor,
                            fontWeight: isInvestmentPeriod ? "600" : "normal",
                            fontSize: "14px", // Increased font size
                          }}
                        >
                          {row.age}
                        </td>
                        <td
                          style={{
                            padding: "8px", // Increased padding
                            border: "2px solid #e2e8f0", // Thicker border
                            textAlign: "right",
                            backgroundColor: bgColor,
                            fontSize: "14px", // Increased font size
                          }}
                        >
                          {row.invest > 0 ? formatCurrency(row.invest) : "-"}
                        </td>
                        <td
                          style={{
                            padding: "8px", // Increased padding
                            border: "2px solid #e2e8f0", // Thicker border
                            textAlign: "right",
                            fontWeight: "600",
                            backgroundColor: bgColor,
                            fontSize: "14px", // Increased font size
                          }}
                        >
                          {formatCurrency(row.value)}
                        </td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={idx}>
                        <td
                          style={{
                            padding: "8px",
                            border: "2px solid #e2e8f0",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          {/* Increased padding and font size */}
                          {age}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            border: "2px solid #e2e8f0",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          {/* Increased padding and font size */}-
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            border: "2px solid #e2e8f0",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          {/* Increased padding and font size */}-
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

      {/* Insights & Recommendations */}
      <div
        style={{
          backgroundColor: "#f0fff4",
          padding: "25px", // Increased padding
          borderRadius: "12px",
          marginBottom: "40px", // Increased margin
          borderLeft: "5px solid #38a169", // Thicker border
        }}
      >
        <h2
          style={{
            fontSize: "22px", // Increased from 18px
            fontWeight: "700",
            margin: "0 0 20px 0", // Increased margin
            color: "#2d3748",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px", // Increased size
              height: "32px", // Increased size
              backgroundColor: "#38a169",
              color: "white",
              borderRadius: "8px", // Increased radius
              marginRight: "12px", // Increased margin
              fontSize: "18px", // Increased font size
            }}
          >
            💡
          </span>
          Key Insights & Recommendations
        </h2>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}
        >
          {" "}
          {/* Increased gap */}
          <div
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            {" "}
            {/* Increased padding */}
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 10px 0",
                color: "#2b6777",
              }}
            >
              Starting Early Matters
            </h3>{" "}
            {/* Increased font size */}
            <p style={{ margin: "0", fontSize: "16px", lineHeight: 1.6 }}>
              {" "}
              {/* Increased font size and line height */}
              The investor who starts earliest typically achieves the highest
              final portfolio value, demonstrating the power of compound
              interest over time.
            </p>
          </div>
          <div
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            {" "}
            {/* Increased padding */}
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 10px 0",
                color: "#2b6777",
              }}
            >
              Consistent Contributions
            </h3>{" "}
            {/* Increased font size */}
            <p style={{ margin: "0", fontSize: "16px", lineHeight: 1.6 }}>
              {" "}
              {/* Increased font size and line height */}
              Regular contributions significantly impact long-term growth. Even
              small amounts invested consistently can lead to substantial wealth
              accumulation over time.
            </p>
          </div>
          <div
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            {" "}
            {/* Increased padding */}
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 10px 0",
                color: "#2b6777",
              }}
            >
              Next Steps
            </h3>{" "}
            {/* Increased font size */}
            <p style={{ margin: "0", fontSize: "16px", lineHeight: 1.6 }}>
              {" "}
              {/* Increased font size and line height */}
              Consider increasing contributions when possible, reviewing your
              investment strategy annually, and diversifying across different
              asset classes to manage risk.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "50px", // Increased margin
          paddingTop: "25px", // Increased padding
          borderTop: "3px solid #e2e8f0", // Thicker border
          fontSize: "16px", // Increased from 11px
          color: "#718096",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          {" "}
          {/* Increased margin */}
          <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
            For more financial tools and calculators, visit{" "}
            <strong>dollarfar.com</strong>
          </p>
          <p style={{ margin: "0", fontStyle: "italic" }}>
            This report was generated on{" "}
            {moment().format("MMMM D, YYYY [at] h:mm A")}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f7fafc",
            padding: "15px", // Increased padding
            borderRadius: "8px",
            fontSize: "16px", // Increased from 10px
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>Disclaimer:</p>{" "}
          {/* Increased margin */}
          <p style={{ margin: "0", fontStyle: "italic" }}>
            This document was generated by DollarFar's Investment Comparison
            Calculator. The information provided is for educational purposes
            only and should not be considered financial advice. Past performance
            is not indicative of future results. Please consult with a qualified
            financial advisor before making investment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};
