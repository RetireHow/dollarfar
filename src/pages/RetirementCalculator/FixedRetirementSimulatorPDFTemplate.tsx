/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
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

interface RetirementSummary {
  retirementAge: number;
  savingsAtRetirement: number;
  annualRetirementIncome: number;
  yearsOfRetirement: number;
  nestEggRequired: number;
  monthlySavingsNeeded: number;
  yearlySavingsNeeded: number;
  isOnTrack: boolean;
  totalProjectedSavings: number;
  additionalSavingsNeeded: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const FixedRetirementSimulatorPDFTemplate = ({
  params,
  results,
  retirementSummary,
}: {
  params: RetirementParams;
  results: YearlyResult[];
  retirementSummary: RetirementSummary | null;
}) => {
  const pdfWidth = 794;
  const pdfMargin = 15;

  // Prepare chart data with simplified structure for better PDF rendering
  const chartData = results.map((year) => ({
    age: year.age,
    savings: Math.round(year.endingBalance),
    withdrawal: Math.round(year.withdrawal),
    pension: Math.round(year.pension),
    desiredIncome: Math.round(year.desiredIncome),
    salary: Math.round(year.salary),
  }));

  // Filter retirement years for the income chart
  const retirementChartData = chartData.filter(
    (d) => d.age >= params.retirementAge
  );

  // Key metrics for retirement planning
  const retirementYear = results.find((r) => r.age === params.retirementAge);

  // Calculate sustainability metrics
  const withdrawalRateAtRetirement = retirementYear
    ? (retirementYear.withdrawal / retirementYear.endingBalance) * 100
    : 0;

  const yearsMoneyLasts = results.filter(
    (r) => r.endingBalance > 0 && r.age >= params.retirementAge
  ).length;
  const pensionCoverage = retirementYear
    ? (retirementYear.pension / retirementYear.desiredIncome) * 100
    : 0;

  // Risk assessment
  const getRiskLevel = () => {
    if (!retirementSummary) return "Unknown";

    if (withdrawalRateAtRetirement > 6) return "High Risk";
    if (withdrawalRateAtRetirement > 4) return "Moderate Risk";
    if (yearsMoneyLasts < params.lifeExpectancy - params.retirementAge)
      return "Sustainability Risk";
    return "Low Risk";
  };

  const riskLevel = getRiskLevel();

  // Action recommendations
  const getRecommendations = () => {
    const recommendations = [];

    if (!retirementSummary?.isOnTrack) {
      recommendations.push({
        icon: "💰",
        title: "Increase Savings",
        description: `Consider increasing your monthly savings by ${formatCurrency(
          retirementSummary?.monthlySavingsNeeded || 0
        )} to reach your retirement goal.`,
      });
    }

    if (withdrawalRateAtRetirement > 4) {
      recommendations.push({
        icon: "📉",
        title: "Reduce Withdrawal Rate",
        description:
          "Your planned withdrawal rate is above the recommended 4%. Consider reducing spending or working longer.",
      });
    }

    if (pensionCoverage < 50) {
      recommendations.push({
        icon: "🏛️",
        title: "Explore Additional Income",
        description:
          "Your pension covers less than half of your retirement income needs. Consider part-time work or annuities.",
      });
    }

    if (yearsMoneyLasts < params.lifeExpectancy - params.retirementAge) {
      recommendations.push({
        icon: "⏳",
        title: "Extend Retirement Timeline",
        description:
          "Your funds may not last through retirement. Consider working 2-3 more years or reducing retirement spending.",
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        icon: "✅",
        title: "Stay the Course",
        description:
          "Your retirement plan appears sustainable. Continue your current savings strategy and monitor annually.",
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  // Custom tick formatter for better PDF display
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(0)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <div
      className="pdf-template"
      style={{
        width: `${pdfWidth}px`,
        margin: "0 auto",
        padding: `${pdfMargin}px`,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "14px",
        color: "#2d3748",
        backgroundColor: "#fff",
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          paddingBottom: "20px",
          borderBottom: "2px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#0d9488",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px",
            }}
          >
            <div
              style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
            >
              RS
            </div>
          </div>
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                margin: "0",
                color: "#0d9488",
              }}
            >
              Retirement Planning Report
            </h1>
            <p
              style={{
                margin: "5px 0 0 0",
                color: "#718096",
                fontSize: "14px",
              }}
            >
              Comprehensive Analysis & Projections
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: "12px", color: "#718096" }}>
          <p style={{ margin: "0 0 5px 0", fontWeight: "600" }}>
            Generated on {moment().format("MMMM D, YYYY")}
          </p>
          <p style={{ margin: "0" }}>Retirement Simulator Analysis</p>
        </div>
      </header>

      {/* Executive Summary */}
      <div
        style={{
          backgroundColor: "#f0fdfa",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          borderLeft: "4px solid #0d9488",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 15px 0",
            color: "#0d9488",
          }}
        >
          📊 Executive Summary
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 10px 0",
              }}
            >
              Retirement Readiness
            </h3>
            <div
              style={{
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "8px",
                border: retirementSummary?.isOnTrack
                  ? "2px solid #10b981"
                  : "2px solid #f59e0b",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: retirementSummary?.isOnTrack ? "#10b981" : "#f59e0b",
                  marginBottom: "5px",
                }}
              >
                {retirementSummary?.isOnTrack
                  ? "✅ On Track"
                  : "⚠️ Needs Improvement"}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                {retirementSummary?.isOnTrack
                  ? "You're making good progress toward your retirement goals"
                  : "Additional savings needed to reach your target"}
              </div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 10px 0",
              }}
            >
              Risk Assessment
            </h3>
            <div
              style={{
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "8px",
                border: riskLevel.includes("High")
                  ? "2px solid #ef4444"
                  : riskLevel.includes("Moderate")
                  ? "2px solid #f59e0b"
                  : "2px solid #10b981",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: riskLevel.includes("High")
                    ? "#ef4444"
                    : riskLevel.includes("Moderate")
                    ? "#f59e0b"
                    : "#10b981",
                  marginBottom: "5px",
                }}
              >
                {riskLevel}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                {riskLevel.includes("High")
                  ? "Consider adjusting your plan"
                  : "Your plan appears sustainable"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Retirement Metrics */}
      <div style={{ marginBottom: "30px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 15px 0",
            color: "#2d3748",
          }}
        >
          🎯 Key Retirement Metrics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Retirement Age
            </div>
            <div
              style={{ fontSize: "18px", fontWeight: "700", color: "#0d9488" }}
            >
              {params.retirementAge}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Years Until Retirement
            </div>
            <div
              style={{ fontSize: "18px", fontWeight: "700", color: "#0d9488" }}
            >
              {params.retirementAge - params.currentAge}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Retirement Duration
            </div>
            <div
              style={{ fontSize: "18px", fontWeight: "700", color: "#0d9488" }}
            >
              {params.lifeExpectancy - params.retirementAge} years
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Target Retirement Income
            </div>
            <div
              style={{ fontSize: "18px", fontWeight: "700", color: "#0d9488" }}
            >
              {formatCurrency(retirementSummary?.annualRetirementIncome || 0)}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Savings at Retirement
            </div>
            <div
              style={{ fontSize: "18px", fontWeight: "700", color: "#0d9488" }}
            >
              {formatCurrency(retirementSummary?.savingsAtRetirement || 0)}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Monthly Gap
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: retirementSummary?.isOnTrack ? "#10b981" : "#ef4444",
              }}
            >
              {formatCurrency(retirementSummary?.monthlySavingsNeeded || 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Savings Growth Chart */}
      <div style={{ marginBottom: "30px", pageBreakInside: "avoid" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 15px 0",
            color: "#2d3748",
          }}
        >
          📈 Retirement Savings Projection
        </h2>

        <div
          style={{
            height: "300px",
            width: "100%",
            backgroundColor: "#f8fafc",
            padding: "15px",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="age"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                tickFormatter={formatYAxisTick}
                width={50}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  paddingTop: "10px",
                }}
              />
              <Bar
                dataKey="savings"
                stackId="a"
                fill="#0d9488"
                name="Savings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Retirement Income Analysis */}
      <div
        style={{
          marginBottom: "30px",
          marginTop: "250px",
          pageBreakInside: "avoid",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 15px 0",
            color: "#2d3748",
          }}
        >
          💰 Retirement Income Sustainability
        </h2>

        <div
          style={{
            height: "250px",
            width: "100%",
            backgroundColor: "#f8fafc",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={retirementChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="age"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                tickFormatter={formatYAxisTick}
                width={50}
              />
              <Tooltip
                formatter={(value: any, name: string) => {
                  const displayName =
                    name === "withdrawal"
                      ? "Yearly Spending"
                      : name === "pension"
                      ? "Pension Income"
                      : name;
                  return [formatCurrency(value), displayName];
                }}
                labelFormatter={(label) => `Age: ${label}`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "11px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  paddingTop: "10px",
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

        {/* Sustainability Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fef3c7",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#92400e",
                marginBottom: "5px",
              }}
            >
              Withdrawal Rate
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: withdrawalRateAtRetirement > 4 ? "#dc2626" : "#10b981",
              }}
            >
              {withdrawalRateAtRetirement.toFixed(1)}%
            </div>
            <div style={{ fontSize: "10px", color: "#92400e" }}>
              Target: 3-4%
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fef3c7",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#92400e",
                marginBottom: "5px",
              }}
            >
              Years Funds Last
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color:
                  yearsMoneyLasts >=
                  params.lifeExpectancy - params.retirementAge
                    ? "#10b981"
                    : "#dc2626",
              }}
            >
              {yearsMoneyLasts} years
            </div>
            <div style={{ fontSize: "10px", color: "#92400e" }}>
              Until age {params.lifeExpectancy}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fef3c7",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#92400e",
                marginBottom: "5px",
              }}
            >
              Pension Coverage
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: "700", color: "#8b5cf6" }}
            >
              {pensionCoverage.toFixed(0)}%
            </div>
            <div style={{ fontSize: "10px", color: "#92400e" }}>
              Of retirement income
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Projection Table (Key Years Only) */}
      <div style={{ marginBottom: "30px", pageBreakInside: "avoid" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 15px 0",
            color: "#2d3748",
          }}
        >
          📋 Key Year Projections
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "11px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0d9488", color: "white" }}>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #0d9488",
                  textAlign: "center",
                }}
              >
                Age
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #0d9488",
                  textAlign: "right",
                }}
              >
                Salary
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #0d9488",
                  textAlign: "right",
                }}
              >
                Savings
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #0d9488",
                  textAlign: "right",
                }}
              >
                Interest
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #0d9488",
                  textAlign: "right",
                }}
              >
                Retirement Income
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #0d9488",
                  textAlign: "right",
                }}
              >
                Pension
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #0d9488",
                  textAlign: "right",
                }}
              >
                End Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {results
              .filter(
                (_, index) =>
                  index % 5 === 0 || // Every 5 years
                  _.age === params.currentAge ||
                  _.age === params.retirementAge ||
                  _.age === params.lifeExpectancy ||
                  (_.age > params.retirementAge &&
                    (_.age - params.retirementAge) % 5 === 0)
              )
              .map((year, index) => (
                <tr
                  key={year.age}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f8fafc" : "white",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontWeight:
                        year.age === params.retirementAge ? "700" : "normal",
                      color:
                        year.age === params.retirementAge
                          ? "#0d9488"
                          : "inherit",
                    }}
                  >
                    {year.age}
                    {year.age === params.retirementAge && " 🎯"}
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {formatCurrency(year.salary)}
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {formatCurrency(year.savings)}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      color: "#10b981",
                    }}
                  >
                    {formatCurrency(year.interest)}
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {formatCurrency(year.desiredIncome)}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      color: "#8b5cf6",
                    }}
                  >
                    {formatCurrency(year.pension)}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontWeight: "600",
                      color: year.endingBalance < 0 ? "#ef4444" : "#0d9488",
                    }}
                  >
                    {formatCurrency(year.endingBalance)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Actionable Recommendations */}
      <div style={{ marginBottom: "30px", marginTop: "320px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 15px 0",
            color: "#2d3748",
          }}
        >
          💡 Recommended Actions
        </h2>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}
        >
          {recommendations.map((rec, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f8fafc",
                padding: "15px",
                borderRadius: "8px",
                borderLeft: "4px solid #0d9488",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <div style={{ fontSize: "18px" }}>{rec.icon}</div>
                <div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      margin: "0 0 5px 0",
                      color: "#0d9488",
                    }}
                  >
                    {rec.title}
                  </h3>
                  <p
                    style={{ margin: "0", fontSize: "12px", color: "#6b7280" }}
                  >
                    {rec.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assumptions & Input Parameters */}
      <div style={{ marginBottom: "30px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 15px 0",
            color: "#2d3748",
          }}
        >
          ⚙️ Your Input Parameters
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <strong>Current Age:</strong> {params.currentAge}
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <strong>Annual Income:</strong>{" "}
            {formatCurrency(params.annualIncome)}
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <strong>Current Savings:</strong>{" "}
            {formatCurrency(params.currentSavings)}
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <strong>Annual Savings:</strong>{" "}
            {formatCurrency(params.annualSavings)}
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <strong>Investment Return:</strong>{" "}
            {formatPercentage(params.investmentReturn)}
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <strong>Inflation Rate:</strong>{" "}
            {formatPercentage(params.inflationRate)}
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <strong>Income Replacement:</strong>{" "}
            {formatPercentage(params.incomeReplacementRate)}
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <strong>Annual Pension:</strong>{" "}
            {formatCurrency(params.annualPension)}
          </div>
        </div>
      </div>

      {/* Important Notes & Disclaimer */}
      <div
        style={{
          backgroundColor: "#fef2f2",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #fecaca",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "700",
            margin: "0 0 10px 0",
            color: "#dc2626",
          }}
        >
          📝 Important Notes
        </h3>
        <ul
          style={{
            margin: "0",
            paddingLeft: "15px",
            fontSize: "11px",
            color: "#6b7280",
          }}
        >
          <li>
            This projection assumes consistent investment returns and inflation
            rates
          </li>
          <li>Actual market performance will vary from these projections</li>
          <li>Review your plan annually and adjust for life changes</li>
          <li>
            Consider consulting with a financial advisor for personalized advice
          </li>
          <li>
            Withdrawal rates above 4% may increase the risk of outliving your
            savings
          </li>
        </ul>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "30px",
          paddingTop: "15px",
          borderTop: "1px solid #e2e8f0",
          fontSize: "10px",
          color: "#718096",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 5px 0" }}>
          Generated by Retirement Simulator •{" "}
          {moment().format("MMMM D, YYYY [at] h:mm A")}
        </p>
        <p style={{ margin: "0", fontStyle: "italic" }}>
          This report is for educational purposes. Past performance is not
          indicative of future results. Consult with qualified financial
          professionals before making investment decisions.
        </p>
      </footer>
    </div>
  );
};

